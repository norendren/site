import { PDFDocument, rgb } from 'pdf-lib';
import { TALENT_ATTRIBUTES } from './classReference';
import type { TalentName } from './classReference';
import { getRacePerks } from './raceReference';
import type {
  ArcaneAptitudeAllocation,
  RogueSpecialtySelection,
  WarriorStyleSelection,
} from './classSpecialties';
import {
  COMBAT_STYLE_DESCRIPTIONS,
  type CombatStyleTier,
  ROGUE_TALENT_BONUS_DESCRIPTIONS,
  ROGUE_TALENT_SPECIALTY_DESCRIPTION,
  ROGUE_TALENT_BONUSES,
} from './classSpecialties';
import { calculateAllCharacterStats, type CharacterStats } from './characterStats';
import { abilities } from '../data/abilities';

export interface TalentAllocation {
  name: string;
  points: number; // 0-6 points invested (1 point = 1 bubble)
}

export interface AttributeAllocation {
  name: string;
  points: number; // from -3 to +3
}

export interface BasicCharacterData {
  characterName: string;
  class: string;
  level: string;
  race: string;
  house: string;
  faith: string;
  age: string;
  racialPerks?: string[]; // Array of 2 selected racial perk names
  abilities?: string[]; // Array of selected ability names
  talents?: TalentAllocation[];
  attributes?: AttributeAllocation[];
  // Class-specific specialties
  arcaneAllocations?: ArcaneAptitudeAllocation[]; // Mage only
  rogueSpecialties?: RogueSpecialtySelection[]; // Rogue only
  warriorStyles?: WarriorStyleSelection[]; // Warrior only
  // Acolyte Bless is auto-calculated from level, no storage needed
  // Manual overrides for final review page (allows editing any value)
  manualOverrides?: {
    defense?: number;
    daring?: number;
    stamina?: number;
    mana?: number;
    favor?: number;
  };
}

// ===========================================
// PDF COORDINATE SYSTEM
// ===========================================
// The coordinate system has (0,0) at the bottom-left corner
// All Y values increase upward, X values increase rightward
//
// PDF LAYOUT (approximate):
//
//    0        100       200       300       400       500       600
//  ┌─────────────────────────────────────────────────────────────────┐
// 750│ [Name]          [Class]   [Level]                    [Health] │ TOP SECTION
// 700│ [Race] [House]  [Faith]   [Age]                      MaxValues│
//    │                                                                │
// 650│ CON: +0                               Daring: +0               │ ATTRIBUTES &
// 600│ DEX: +0                               Defense: 10              │ DERIVED STATS
// 550│ INS: +0                               Mana/Favor               │ (right side)
// 500│ KNO: +0                               Stamina                  │
// 450│ STR: +0                                                        │
// 400│ VAL: +0                                          [Talents]     │ TALENTS
//    │                                                  (18 rows)     │ (right side)
// 350│ [Racial Perks]                                   with bubbles  │ LEFT COLUMN
// 300│ Perk 1 name                                      & totals     │
// 250│ - description                                                  │
//    │ Perk 2 name                                                    │
// 200│ - description                                                  │
//    │                                                                │
// 150│ [Class Specialties]                                            │
// 100│ (Warriors/Rogues)                                              │
//  50│                                                                │
//   0└─────────────────────────────────────────────────────────────────┘
//
// ===========================================

// ===== TOP SECTION: Basic Character Info =====
interface FieldCoordinates {
  x: number;
  y: number;
  size?: number; // font size, defaults to 12
}

const FIELD_COORDINATES: Record<keyof Omit<BasicCharacterData, 'talents' | 'attributes' | 'racialPerks' | 'abilities' | 'arcaneAllocations' | 'rogueSpecialties' | 'warriorStyles' | 'manualOverrides'>, FieldCoordinates> = {
  characterName: { x: 52, y: 738, size: 14 },    // ✓ Verified
  class:         { x: 210, y: 738, size: 12 },
  level:         { x: 310, y: 738, size: 12 },
  race:          { x: 52, y: 703, size: 12 },
  house:         { x: 124, y: 703, size: 12 },
  faith:         { x: 195, y: 703, size: 12 },
  age:           { x: 280, y: 703, size: 12 },
};

// ===== LEFT COLUMN: Attributes =====
const ATTRIBUTE_START_Y = 645; // Starting Y position for first attribute (CON)
const ATTRIBUTE_Y_STEP = 28.25; // Vertical spacing between attributes
const ATTRIBUTE_ZERO_X = 120; // X position where the attribute value text is drawn
const ATTRIBUTE_NAMES = ['CON', 'DEX', 'INS', 'KNO', 'STR', 'VAL'] as const;

// ===== LEFT COLUMN: Racial Perks =====
const RACIAL_PERKS_START_X = 94; // X position for racial perk text (left side)
const RACIAL_PERKS_START_Y = 462; // Y position for first racial perk
const RACIAL_PERKS_LINE_HEIGHT = 14; // Space between perk name and description
const RACIAL_PERKS_PERK_SPACING = 36; // Space between perks

// ===== LEFT COLUMN: Class Specialties =====
// Warrior Combat Styles and Rogue Specialties
const CLASS_SPECIALTY_START_X = 92; // X position for class specialty text (aligned with racial perks)
const CLASS_SPECIALTY_START_Y = 440; // Y position for first class specialty
const CLASS_SPECIALTY_LINE_HEIGHT = 13; // Space between title and description within one specialty
const CLASS_SPECIALTY_SPACING = 38; // Space between different specialties (title to next title)
const CLASS_SPECIALTY_MAX_LINE_WIDTH = 225; // Maximum width for text wrapping (left column width)
const CLASS_SPECIALTY_LENGTH_THRESHOLD = 115; // Character threshold for printing full description

// ===== PAGE 1: Abilities =====
// Abilities go on the left column of page 1, below class specialties
const ABILITIES_START_X = 90; // X position for abilities section (aligned with perks/specialties)
const ABILITIES_START_Y = 370; // Y position for first ability (below class specialties)
const ABILITY_NAME_SIZE = 9; // Font size for ability names
const ABILITY_DESC_SIZE = 7; // Font size for ability descriptions
const ABILITY_SPACING = 16; // Space between ability name and description
const ABILITY_SLOT_HEIGHT = 38; // Total vertical space for each ability slot (name + description)
const ABILITY_MAX_LINE_WIDTH = 225; // Maximum width for text wrapping (left column width)
const ABILITY_LENGTH_THRESHOLD = 115; // Character threshold for printing full description

// ===== ABILITY REFERENCE SHEET (Additional Page) =====
const REF_SHEET_TITLE_X = 50; // X position for reference sheet title
const REF_SHEET_TITLE_Y = 750; // Y position for reference sheet title
const REF_SHEET_TITLE_SIZE = 18; // Font size for title
const REF_SHEET_CHAR_NAME_Y = 730; // Y position for character name on reference sheet
const REF_SHEET_CHAR_NAME_SIZE = 12; // Font size for character name
const REF_SHEET_ABILITY_START_X = 50; // X position for ability content
const REF_SHEET_ABILITY_START_Y = 700; // Y position for first ability
const REF_SHEET_ABILITY_NAME_SIZE = 11; // Font size for ability names
const REF_SHEET_ABILITY_DESC_SIZE = 9; // Font size for ability descriptions
const REF_SHEET_LINE_HEIGHT = 12; // Line height for description text
const REF_SHEET_ABILITY_SPACING = 20; // Space between abilities
const REF_SHEET_MAX_WIDTH = 500; // Maximum width for text
const REF_SHEET_BOTTOM_MARGIN = 50; // Minimum Y before starting new page

// ===== RIGHT COLUMN: Talents =====
const TALENT_START_Y = 372.5; // Starting Y position for first talent
const TALENT_Y_STEP = 14.125; // Vertical spacing between talents
const TALENT_STATIC_X = 484; // X position for talent bubble start
const TALENT_TOTAL_X = 440; // X position for talent total scores (before the bubbles)
const TALENT_TOTAL_Y_OFFSET = -4; // Vertical offset for talent totals (adjust if text appears too high/low)

// Talent bubble styling
const BUBBLE_RADIUS = 3;
const BUBBLE_HORIZONTAL_SPACING = 10.5; // Distance between bubbles

// ===== RIGHT COLUMN: Health =====
const HEALTH_MAX_X = 530; // X position for health maximum values
const HEALTH_FATIGUED_Y = 620; // Y position for Fatigued max
const HEALTH_BATTERED_Y = 592; // Y position for Battered max
const HEALTH_INJURED_Y = 565; // Y position for Injured max

// ===== RIGHT COLUMN: Derived Stats (Aspects) =====
const DERIVED_STATS_X = 355; // X position for derived stat values
const DARING_Y = 645; // Y position for Daring
const DEFENSE_Y = 615; // Y position for Defense
const FAVOR_Y = 594; // Y position for Favor (Acolytes only)
const MANA_Y = 565; // Y position for Mana (Mages only)
const STAMINA_Y = 507; // Y position for Stamina

// Define the exact order of talent names
const TALENT_NAMES = [
  'Athletics (STR)',
  'Charisma (VAL)',
  'Combat Rest (CON)',
  'Concentration (INS)',
  'Craft (DEX)',
  'Discipline (VAL)',
  'Endurance (CON)',
  'Exertion (STR)',
  'Faith (VAL)',
  'Hermetics (KNO)',
  'Notice (INS)',
  'Recuperation (CON)',
  'Scholar (KNO)',
  'Stealth (DEX)',
  'Survival (KNO)',
  'Swimming (STR)',
  'Taming (INS)',
  'Thievery (DEX)',
] as const;

// Assuming TalentBubbleCoordinates and Record are defined elsewhere
type TalentBubbleCoordinates = { x: number; y: number };

// Build the final constant using .reduce() to calculate the Y coordinate
const TALENT_BUBBLE_COORDINATES: Record<typeof TALENT_NAMES[number], TalentBubbleCoordinates> =
  TALENT_NAMES.reduce((acc, name, index) => {
    // The y value is calculated by subtracting the step * the index from the start Y
    // Index starts at 0 for 'Athletics (STR)'
    const y = TALENT_START_Y - (index * TALENT_Y_STEP);

    acc[name] = {
      x: TALENT_STATIC_X,
      y: y,
    };
    return acc;
  }, {} as Record<typeof TALENT_NAMES[number], TalentBubbleCoordinates>);


/**
 * Fills the Athia character sheet PDF with basic character information
 * Since the PDF has no form fields, this draws text at specific coordinates
 * @param pdfUrl - URL to the blank character sheet PDF
 * @param characterData - Basic character information to fill
 * @returns Uint8Array of the filled PDF
 */
export async function fillCharacterSheet(
  pdfUrl: string,
  characterData: BasicCharacterData
): Promise<Uint8Array> {
  // Calculate all character stats once upfront
  const characterStats = calculateAllCharacterStats(characterData);

  // Load the existing PDF
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page (character sheets are typically one page)
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const secondPage = pages[1];

  // Embed a standard font
  const font = await pdfDoc.embedFont('Helvetica');

  // Draw each field at its specified coordinates
  try {
    Object.entries(characterData).forEach(([key, value]) => {
      // Skip talents and attributes - they're handled separately
      if (key === 'talents' || key === 'attributes') return;

      if (typeof value === 'string' && value.trim()) { // Only draw if there's a value
        const coords = FIELD_COORDINATES[key as keyof typeof FIELD_COORDINATES];
        if (coords) {
          firstPage.drawText(value, {
            x: coords.x,
            y: coords.y,
            size: coords.size || 12,
            font: font,
            color: rgb(0, 0, 0), // black text
          });
        }
      }
    });

    // Draw talent bubbles if talents are provided
    if (characterData.talents && characterData.talents.length > 0) {
      drawTalentBubbles(firstPage, characterData.talents);
    }

    // Draw talent total scores (now uses pre-computed stats)
    drawTalentTotals(firstPage, characterStats, font);

    // Draw attribute values as text (always draw all 6 attributes, defaulting to 0)
    drawAttributeValues(firstPage, characterData.attributes || [], font);

    // Draw health tier maximums (now uses pre-computed stats)
    if (characterData.class && characterData.race) {
      drawHealthMaximums(firstPage, characterStats, font);
    }

    // Draw racial perks if selected
    if (characterData.racialPerks && characterData.racialPerks.length > 0 && characterData.race) {
      drawRacialPerks(firstPage, characterData, font);
    }

    // Draw derived stats (now uses pre-computed stats)
    if (characterData.class && characterData.race && characterData.attributes && characterData.attributes.length > 0) {
      drawDerivedStats(firstPage, characterData.class, characterStats, font);
    }

    // Draw class specialties (Warrior Combat Styles and Rogue Specialties)
    if (characterData.class === 'Warrior' && characterData.warriorStyles && characterData.warriorStyles.length > 0) {
      drawWarriorStyles(secondPage, characterData.warriorStyles, font);
    } else if (characterData.class === 'Rogue' && characterData.rogueSpecialties && characterData.rogueSpecialties.length > 0) {
      drawRogueSpecialties(secondPage, characterData.rogueSpecialties, font);
    }

    // Draw abilities on page 1 (left column, below class specialties/racial perks)
    if (characterData.abilities && characterData.abilities.length > 0) {
      drawAbilities(firstPage, characterData.abilities, font);
    }

    // Draw reference sheet (additional page with all class specialties and abilities in full)
    const hasAbilities = characterData.abilities && characterData.abilities.length > 0;
    const hasWarriorStyles = characterData.class === 'Warrior' && characterData.warriorStyles && characterData.warriorStyles.length > 0;
    const hasRogueSpecialties = characterData.class === 'Rogue' && characterData.rogueSpecialties && characterData.rogueSpecialties.length > 0;

    if (hasAbilities || hasWarriorStyles || hasRogueSpecialties) {
      drawReferenceSheet(pdfDoc, characterData, font);
    }
  } catch (error) {
    console.error('Error drawing text on PDF:', error);
    throw error;
  }

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Draws filled circles (bubbles) on the PDF for talent allocations
 * Each talent has 6 bubbles: 1-2 (Apprentice), 3-5 (Journeyman), 6 (Master)
 * Each point invested = 1 filled bubble
 *
 * The system works mathematically:
 * 1. Define the position of the FIRST bubble for each talent in TALENT_BUBBLE_COORDINATES
 * 2. Each subsequent bubble is placed at x + BUBBLE_HORIZONTAL_SPACING
 */
function drawTalentBubbles(page: any, talents: TalentAllocation[]): void {
  talents.forEach((talent) => {
    // Build the full talent key (e.g., "Athletics (STR)")
    const attribute = TALENT_ATTRIBUTES[talent.name as TalentName];
    const fullTalentKey = `${talent.name} (${attribute})` as typeof TALENT_NAMES[number];

    // Get the coordinates for this talent's first bubble
    const coords = TALENT_BUBBLE_COORDINATES[fullTalentKey];

    if (!coords) {
      console.warn(`No bubble coordinates defined for talent: ${talent.name} (${attribute})`);
      return;
    }

    // Only draw filled bubbles (don't draw empty outline bubbles)
    const bubblesToFill = Math.min(talent.points, 6); // Cap at 6 bubbles

    for (let bubbleIndex = 0; bubbleIndex < bubblesToFill; bubbleIndex++) {
      // Calculate X position: first bubble + (spacing * bubble index)
      const x = coords.x + (bubbleIndex * BUBBLE_HORIZONTAL_SPACING);
      const y = coords.y;

      // Draw filled circle (no empty outlines)
      page.drawCircle({
        x: x,
        y: y,
        size: BUBBLE_RADIUS,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
        color: rgb(0, 0, 0),
        opacity: 1,
      });
    }
  });
}

/**
 * Draws talent total scores as text on the PDF
 * Uses pre-computed talent scores from CharacterStats
 *
 * The system works as follows:
 * 1. Each talent has a fixed Y position based on its index in TALENT_NAMES
 * 2. All totals are drawn at the same X position (TALENT_TOTAL_X)
 * 3. Values are formatted with +/- sign
 */
function drawTalentTotals(
  page: any,
  characterStats: CharacterStats,
  font: any
): void {
  // Create a map of talent scores for quick lookup
  const talentScoreMap = new Map<string, number>();
  characterStats.talents.forEach(talent => {
    talentScoreMap.set(talent.name, talent.total);
  });

  // Draw total for each talent in the list
  TALENT_NAMES.forEach((fullTalentKey, index) => {
    // Extract talent name (e.g., "Athletics" from "Athletics (STR)")
    const talentName = fullTalentKey.split(' (')[0] as TalentName;

    // Get the pre-computed total score
    const totalScore = talentScoreMap.get(talentName) ?? 0;

    // Calculate Y position based on talent index, applying the vertical offset
    const y = TALENT_START_Y - (index * TALENT_Y_STEP) + TALENT_TOTAL_Y_OFFSET;

    // Format the score with sign
    const scoreText = totalScore >= 0 ? `+${totalScore}` : `${totalScore}`;

    // Draw the total score
    page.drawText(scoreText, {
      x: TALENT_TOTAL_X,
      y: y,
      size: 10,
      font: font,
      color: rgb(0, 0, 0),
    });
  });
}

/**
 * Draws maximum health values for each tier using pre-computed stats
 *
 * @param page - PDF page to draw on
 * @param characterStats - Pre-computed character statistics
 * @param font - Font to use for rendering
 */
function drawHealthMaximums(
  page: any,
  characterStats: CharacterStats,
  font: any
): void {
  // Draw Fatigued max
  page.drawText(characterStats.health.fatigued.toString(), {
    x: HEALTH_MAX_X,
    y: HEALTH_FATIGUED_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Battered max
  page.drawText(characterStats.health.battered.toString(), {
    x: HEALTH_MAX_X,
    y: HEALTH_BATTERED_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Injured max
  page.drawText(characterStats.health.injured.toString(), {
    x: HEALTH_MAX_X,
    y: HEALTH_INJURED_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });
}

/**
 * Draws attribute values as text on the PDF
 * Each attribute displays its numeric value (-3 to +3)
 * Positive values are prefixed with "+" (e.g., "+2")
 * Zero is displayed as "0"
 * Negative values display with their minus sign (e.g., "-1")
 *
 * The system works as follows:
 * 1. Each attribute has a fixed Y position based on its index in ATTRIBUTE_NAMES
 * 2. All values are drawn at the same X position (ATTRIBUTE_ZERO_X)
 * 3. Font size is 12pt by default
 * 4. All 6 attributes are always drawn, defaulting to 0 if not specified
 */
function drawAttributeValues(page: any, attributes: AttributeAllocation[], font: any): void {
  // Create a map of attribute values for quick lookup
  const attributeMap = new Map<string, number>();
  attributes.forEach(attr => {
    attributeMap.set(attr.name, attr.points);
  });

  // Draw all 6 attributes, using 0 as default if not specified
  ATTRIBUTE_NAMES.forEach((attrName, attrIndex) => {
    // Get the value from the map, or default to 0
    const points = attributeMap.get(attrName) ?? 0;

    // Calculate Y position based on attribute index
    const y = ATTRIBUTE_START_Y - (attrIndex * ATTRIBUTE_Y_STEP);

    // Format the attribute value with sign
    let valueText: string;
    if (points > 0) {
      valueText = `+${points}`;
    } else if (points === 0) {
      valueText = "0";
    } else {
      valueText = `${points}`; // Negative sign is already included
    }

    // Draw the text
    page.drawText(valueText, {
      x: ATTRIBUTE_ZERO_X,
      y: y,
      size: 16,
      font: font,
      bold: true,
      color: rgb(0, 0, 0),
    });
  });
}

/**
 * Draws racial perks on the PDF
 * Shows the perk name and its mechanical summary for each selected perk
 *
 * @param page - PDF page to draw on
 * @param characterData - Character data including race and selected perks
 * @param font - Font to use for rendering
 */
function drawRacialPerks(
  page: any,
  characterData: BasicCharacterData,
  font: any
): void {
  // Get all available perks for this race
  const availablePerks = getRacePerks(characterData.race);

  if (!availablePerks || availablePerks.length === 0) {
    console.warn(`No perks found for race: ${characterData.race}`);
    return;
  }

  // Get the full perk details for selected perks
  const selectedPerkDetails = (characterData.racialPerks || [])
    .map(perkName => availablePerks.find(p => p.name === perkName))
    .filter(Boolean); // Remove any undefined values

  // Draw each perk
  selectedPerkDetails.forEach((perk, index) => {
    if (!perk) return;

    // Calculate Y position for this perk
    const yPosition = RACIAL_PERKS_START_Y - (index * RACIAL_PERKS_PERK_SPACING);

    // Draw perk name (bold/larger)
    page.drawText(perk.name, {
      x: RACIAL_PERKS_START_X,
      y: yPosition,
      size: 10,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Draw mechanical summary (smaller, indented slightly)
    page.drawText(perk.mechanicalSummary, {
      x: RACIAL_PERKS_START_X + 10,
      y: yPosition - RACIAL_PERKS_LINE_HEIGHT,
      size: 8,
      font: font,
      color: rgb(0.2, 0.2, 0.2),
    });
  });
}

/**
 * Draws derived stats (Aspects) on the PDF using pre-computed stats
 * Displays Defense, Daring, Stamina, and class-specific stats (Mana/Favor)
 *
 * @param page - PDF page to draw on
 * @param className - Character class (for determining which stats to show)
 * @param characterStats - Pre-computed character statistics
 * @param font - Font to use for rendering
 */
function drawDerivedStats(
  page: any,
  className: string,
  characterStats: CharacterStats,
  font: any
): void {
  const stats = characterStats.derivedStats;

  // Draw Defense
  page.drawText(stats.defense.toString(), {
    x: DERIVED_STATS_X,
    y: DEFENSE_Y,
    size: 14,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Daring
  page.drawText(stats.daring.toString(), {
    x: DERIVED_STATS_X,
    y: DARING_Y,
    size: 14,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Stamina
  page.drawText(stats.stamina.toString(), {
    x: DERIVED_STATS_X,
    y: STAMINA_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Mana (Mages only)
  if (className === 'Mage' && stats.mana > 0) {
    page.drawText(stats.mana.toString(), {
      x: DERIVED_STATS_X,
      y: MANA_Y,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  // Draw Favor (Acolytes only)
  if (className === 'Acolyte' && stats.favor > 0) {
    page.drawText(stats.favor.toString(), {
      x: DERIVED_STATS_X,
      y: FAVOR_Y,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  }
}

/**
 * Draws Warrior Combat Styles on the PDF
 * Each style is expanded into separate entries for each tier the warrior has achieved
 * For example, "Collaborative - Journeyman" prints as TWO entries:
 *   1. "Collaborative (Apprentice)" with Apprentice description
 *   2. "Collaborative (Journeyman)" with Journeyman description
 *
 * Descriptions longer than the threshold will show "See reference sheet"
 *
 * @param page - PDF page to draw on
 * @param warriorStyles - Array of warrior style selections
 * @param font - Font to use for rendering
 * @returns The number of entries drawn (for coordinate tracking)
 */
function drawWarriorStyles(
  page: any,
  warriorStyles: WarriorStyleSelection[],
  font: any
): number {
  let entryIndex = 0; // Track how many entries we've drawn

  warriorStyles.forEach((styleSelection) => {
    // Determine which tiers to print (all tiers up to and including current tier)
    const tiersToPrint: CombatStyleTier[] = [];

    // Add tiers in order
    tiersToPrint.push('Apprentice');
    if (styleSelection.tier === 'Journeyman' || styleSelection.tier === 'Master') {
      tiersToPrint.push('Journeyman');
    }
    if (styleSelection.tier === 'Master') {
      tiersToPrint.push('Master');
    }

    // Draw each tier as a separate entry
    tiersToPrint.forEach((tier) => {
      const yPosition = CLASS_SPECIALTY_START_Y - (entryIndex * CLASS_SPECIALTY_SPACING);

      // Draw title: "Style Name (Tier)"
      const title = `${styleSelection.style} (${tier})`;
      page.drawText(title, {
        x: CLASS_SPECIALTY_START_X,
        y: yPosition,
        size: 9,
        font: font,
        color: rgb(0, 0, 0),
      });

      // Get description and determine what to print
      const description = COMBAT_STYLE_DESCRIPTIONS[styleSelection.style][tier];
      const textToPrint = description.length > CLASS_SPECIALTY_LENGTH_THRESHOLD
        ? 'See reference sheet'
        : description;

      // Wrap and draw description
      const lines = wrapText(textToPrint, CLASS_SPECIALTY_MAX_LINE_WIDTH, font, 6);
      let descriptionY = yPosition - CLASS_SPECIALTY_LINE_HEIGHT;

      lines.forEach((line) => {
        page.drawText(line, {
          x: CLASS_SPECIALTY_START_X,
          y: descriptionY,
          size: 6,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });
        descriptionY -= 8; // Line height for wrapped text
      });

      entryIndex++;
    });
  });

  return entryIndex; // Return number of entries drawn
}

/**
 * Draws Rogue Specialties on the PDF
 * Each specialty shows its type and description
 *
 * Descriptions longer than the threshold will show "See reference sheet"
 *
 * @param page - PDF page to draw on
 * @param rogueSpecialties - Array of rogue specialty selections
 * @param font - Font to use for rendering
 * @param startEntryIndex - Starting index for positioning (allows stacking with other abilities)
 * @returns The number of entries drawn (for coordinate tracking)
 */
function drawRogueSpecialties(
  page: any,
  rogueSpecialties: RogueSpecialtySelection[],
  font: any,
  startEntryIndex: number = 0
): number {
  let entryIndex = startEntryIndex;

  rogueSpecialties.forEach((specialty) => {
    const yPosition = CLASS_SPECIALTY_START_Y - (entryIndex * CLASS_SPECIALTY_SPACING);

    // Build title based on specialty type
    let title: string = specialty.type;
    let description = '';

    switch (specialty.type) {
      case 'Ability':
        description = '+1 to Ability Checks';
        break;
      case 'Arcane':
        if (specialty.arcaneArt) {
          title = `Arcane: ${specialty.arcaneArt}`;
          description = `Proficiency in ${specialty.arcaneArt} arcane art`;
        } else {
          description = 'Choose an Arcane Art';
        }
        break;
      case 'Divine':
        if (specialty.divineInfluence) {
          title = `Divine: ${specialty.divineInfluence}`;
          description = `Access to ${specialty.divineInfluence} divine influence`;
        } else {
          description = 'Choose a Divine Influence';
        }
        break;
      case 'Talent':
        description = ROGUE_TALENT_SPECIALTY_DESCRIPTION; // Will trigger "See reference sheet" due to length
        break;
      case 'Stamina':
        description = '+2 Stamina';
        break;
    }

    // Draw title
    page.drawText(title, {
      x: CLASS_SPECIALTY_START_X,
      y: yPosition,
      size: 9,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Determine what to print based on description length
    const textToPrint = description.length > CLASS_SPECIALTY_LENGTH_THRESHOLD
      ? 'See reference sheet'
      : description;

    // Wrap and draw description
    const lines = wrapText(textToPrint, CLASS_SPECIALTY_MAX_LINE_WIDTH, font, 7);
    let descriptionY = yPosition - CLASS_SPECIALTY_LINE_HEIGHT;

    lines.forEach((line) => {
      page.drawText(line, {
        x: CLASS_SPECIALTY_START_X + 10,
        y: descriptionY,
        size: 7,
        font: font,
        color: rgb(0.2, 0.2, 0.2),
      });
      descriptionY -= 9; // Line height for wrapped text
    });

    entryIndex++;
  });

  return entryIndex - startEntryIndex; // Return number of entries drawn
}

/**
 * Helper function to get ability description from abilities data
 * @param abilityName - Name of the ability to look up
 * @returns The ability description or undefined if not found
 */
function getAbilityDescription(abilityName: string): string | undefined {
  // Search through all class ability lists
  for (const classAbilities of Object.values(abilities)) {
    if (classAbilities[abilityName]) {
      return classAbilities[abilityName].description;
    }
  }
  return undefined;
}

/**
 * Helper function to wrap text to fit within a maximum width
 * Simple word-wrapping: splits on spaces and breaks when line would exceed max width
 * @param text - Text to wrap
 * @param maxWidth - Maximum width in points
 * @param font - Font to use for measuring
 * @param fontSize - Font size
 * @returns Array of text lines
 */
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth > maxWidth && currentLine) {
      // Line would be too long, push current line and start new one
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Draws character abilities on page 1 of the PDF
 * - Abilities ≤115 characters: Print full description
 * - Abilities >115 characters: Print "See reference sheet"
 *
 * Each ability occupies a fixed slot on the PDF, with the next ability name
 * positioned at a fixed interval regardless of description length.
 *
 * @param page - PDF page to draw on (page 1)
 * @param abilityNames - Array of ability names selected by character
 * @param font - Font to use for rendering
 */
function drawAbilities(
  page: any,
  abilityNames: string[],
  font: any
): void {
  abilityNames.forEach((abilityName, index) => {
    // Calculate fixed Y position for this ability name based on index
    // Each ability gets a fixed slot, regardless of description length
    const abilityNameY = ABILITIES_START_Y - (index * ABILITY_SLOT_HEIGHT);

    const description = getAbilityDescription(abilityName);

    if (!description) {
      console.warn(`No description found for ability: ${abilityName}`);
      return;
    }

    // Draw ability name at fixed position
    page.drawText(abilityName, {
      x: ABILITIES_START_X,
      y: abilityNameY,
      size: ABILITY_NAME_SIZE,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Description starts below the ability name
    let descriptionY = abilityNameY - ABILITY_SPACING;

    // Determine what to print based on description length
    const textToPrint = description.length > ABILITY_LENGTH_THRESHOLD
      ? 'See reference sheet'
      : description;

    // Wrap and draw description or reference note
    const lines = wrapText(textToPrint, ABILITY_MAX_LINE_WIDTH, font, ABILITY_DESC_SIZE);

    lines.forEach((line) => {
      page.drawText(line, {
        x: ABILITIES_START_X,
        y: descriptionY,
        size: ABILITY_DESC_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
      descriptionY -= ABILITY_DESC_SIZE + 2; // Line height + small gap
    });

    // Note: Next ability name position is calculated independently based on index,
    // not affected by how many description lines were drawn
  });
}

/**
 * Creates a Reference Sheet with class specialties and abilities printed in full
 * Automatically adds additional pages as needed
 *
 * @param pdfDoc - PDF document to add pages to
 * @param characterData - Character data including specialties and abilities
 * @param font - Font to use for rendering
 */
function drawReferenceSheet(
  pdfDoc: any,
  characterData: BasicCharacterData,
  font: any
): void {
  // Add a new page for the reference sheet
  let currentPage = pdfDoc.addPage();
  let currentY = REF_SHEET_ABILITY_START_Y;

  // Draw title on first page
  currentPage.drawText('Reference Sheet', {
    x: REF_SHEET_TITLE_X,
    y: REF_SHEET_TITLE_Y,
    size: REF_SHEET_TITLE_SIZE,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw character name
  currentPage.drawText(`Character: ${characterData.characterName || 'Unknown Character'}`, {
    x: REF_SHEET_TITLE_X,
    y: REF_SHEET_CHAR_NAME_Y,
    size: REF_SHEET_CHAR_NAME_SIZE,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Helper function to check if we need a new page
  const checkNewPage = (estimatedHeight: number) => {
    if (currentY - estimatedHeight < REF_SHEET_BOTTOM_MARGIN) {
      currentPage = pdfDoc.addPage();
      currentY = REF_SHEET_ABILITY_START_Y + 50;
    }
  };

  // Draw Warrior Combat Styles (if present)
  if (characterData.class === 'Warrior' && characterData.warriorStyles && characterData.warriorStyles.length > 0) {
    // Section header
    checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + 60);
    currentPage.drawText('Combat Styles', {
      x: REF_SHEET_ABILITY_START_X,
      y: currentY,
      size: REF_SHEET_ABILITY_NAME_SIZE + 2,
      font: font,
      color: rgb(0, 0, 0),
    });
    currentY -= REF_SHEET_ABILITY_SPACING + 5;

    characterData.warriorStyles.forEach((styleSelection) => {
      // Determine which tiers to print
      const tiersToPrint: CombatStyleTier[] = ['Apprentice'];
      if (styleSelection.tier === 'Journeyman' || styleSelection.tier === 'Master') {
        tiersToPrint.push('Journeyman');
      }
      if (styleSelection.tier === 'Master') {
        tiersToPrint.push('Master');
      }

      // Print each tier
      tiersToPrint.forEach((tier) => {
        const description = COMBAT_STYLE_DESCRIPTIONS[styleSelection.style][tier];
        checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + (REF_SHEET_LINE_HEIGHT * 3));

        // Draw style name
        const title = `${styleSelection.style} (${tier})`;
        currentPage.drawText(title, {
          x: REF_SHEET_ABILITY_START_X,
          y: currentY,
          size: REF_SHEET_ABILITY_NAME_SIZE,
          font: font,
          color: rgb(0, 0, 0),
        });
        currentY -= REF_SHEET_ABILITY_SPACING;

        // Wrap and draw description
        const lines = wrapText(description, REF_SHEET_MAX_WIDTH, font, REF_SHEET_ABILITY_DESC_SIZE);
        lines.forEach((line) => {
          checkNewPage(REF_SHEET_LINE_HEIGHT);
          currentPage.drawText(line, {
            x: REF_SHEET_ABILITY_START_X + 10,
            y: currentY,
            size: REF_SHEET_ABILITY_DESC_SIZE,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });
          currentY -= REF_SHEET_LINE_HEIGHT;
        });
        currentY -= REF_SHEET_ABILITY_SPACING;
      });
    });
  }

  // Draw Rogue Specialties (if present)
  if (characterData.class === 'Rogue' && characterData.rogueSpecialties && characterData.rogueSpecialties.length > 0) {
    // Section header
    checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + 60);
    currentPage.drawText('Rogue Specialties', {
      x: REF_SHEET_ABILITY_START_X,
      y: currentY,
      size: REF_SHEET_ABILITY_NAME_SIZE + 2,
      font: font,
      color: rgb(0, 0, 0),
    });
    currentY -= REF_SHEET_ABILITY_SPACING + 5;

    characterData.rogueSpecialties.forEach((specialty) => {
      // Build title and description
      let title: string = specialty.type;
      let description = '';
      let isTalentSpecialty = false;

      switch (specialty.type) {
        case 'Ability':
          description = '+1 to Ability Checks';
          break;
        case 'Arcane':
          if (specialty.arcaneArt) {
            title = `Arcane: ${specialty.arcaneArt}`;
            description = `Proficiency in ${specialty.arcaneArt} arcane art`;
          } else {
            description = 'Choose an Arcane Art';
          }
          break;
        case 'Divine':
          if (specialty.divineInfluence) {
            title = `Divine: ${specialty.divineInfluence}`;
            description = `Access to ${specialty.divineInfluence} divine influence`;
          } else {
            description = 'Choose a Divine Influence';
          }
          break;
        case 'Talent':
          isTalentSpecialty = true;
          description = ROGUE_TALENT_SPECIALTY_DESCRIPTION;
          break;
        case 'Stamina':
          description = '+2 Stamina';
          break;
      }

      checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + (REF_SHEET_LINE_HEIGHT * 4));

      // Draw specialty title
      currentPage.drawText(title, {
        x: REF_SHEET_ABILITY_START_X,
        y: currentY,
        size: REF_SHEET_ABILITY_NAME_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
      currentY -= REF_SHEET_ABILITY_SPACING;

      // Wrap and draw description
      const lines = wrapText(description, REF_SHEET_MAX_WIDTH, font, REF_SHEET_ABILITY_DESC_SIZE);
      lines.forEach((line) => {
        checkNewPage(REF_SHEET_LINE_HEIGHT);
        currentPage.drawText(line, {
          x: REF_SHEET_ABILITY_START_X + 10,
          y: currentY,
          size: REF_SHEET_ABILITY_DESC_SIZE,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });
        currentY -= REF_SHEET_LINE_HEIGHT;
      });
      currentY -= REF_SHEET_ABILITY_SPACING;

      // If this is a Talent specialty, print all available talent bonuses
      if (isTalentSpecialty) {
        currentY -= 5; // Extra spacing before bonus list

        ROGUE_TALENT_BONUSES.forEach((bonusName) => {
          const bonusDescription = ROGUE_TALENT_BONUS_DESCRIPTIONS[bonusName];

          checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + (REF_SHEET_LINE_HEIGHT * 3));

          // Draw bonus name (bullet point style)
          currentPage.drawText(`• ${bonusName}`, {
            x: REF_SHEET_ABILITY_START_X + 15,
            y: currentY,
            size: REF_SHEET_ABILITY_NAME_SIZE - 1,
            font: font,
            color: rgb(0, 0, 0),
          });
          currentY -= REF_SHEET_LINE_HEIGHT + 3;

          // Wrap and draw bonus description
          const bonusLines = wrapText(bonusDescription, REF_SHEET_MAX_WIDTH - 30, font, REF_SHEET_ABILITY_DESC_SIZE);
          bonusLines.forEach((line) => {
            checkNewPage(REF_SHEET_LINE_HEIGHT);
            currentPage.drawText(line, {
              x: REF_SHEET_ABILITY_START_X + 25,
              y: currentY,
              size: REF_SHEET_ABILITY_DESC_SIZE,
              font: font,
              color: rgb(0.2, 0.2, 0.2),
            });
            currentY -= REF_SHEET_LINE_HEIGHT;
          });
          currentY -= 8; // Spacing between bonuses
        });

        currentY -= REF_SHEET_ABILITY_SPACING;
      }
    });
  }

  // Draw Abilities section header (if present)
  if (characterData.abilities && characterData.abilities.length > 0) {
    checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + 60);
    currentPage.drawText('Abilities', {
      x: REF_SHEET_ABILITY_START_X,
      y: currentY,
      size: REF_SHEET_ABILITY_NAME_SIZE + 2,
      font: font,
      color: rgb(0, 0, 0),
    });
    currentY -= REF_SHEET_ABILITY_SPACING + 5;

    // Draw each ability with full description
    characterData.abilities.forEach((abilityName) => {
      const description = getAbilityDescription(abilityName);

      if (!description) {
        console.warn(`No description found for ability: ${abilityName}`);
        return;
      }

      // Check if we need a new page
      checkNewPage(REF_SHEET_ABILITY_NAME_SIZE + REF_SHEET_ABILITY_SPACING + (REF_SHEET_LINE_HEIGHT * 3));

      // Draw ability name
      currentPage.drawText(abilityName, {
        x: REF_SHEET_ABILITY_START_X,
        y: currentY,
        size: REF_SHEET_ABILITY_NAME_SIZE,
        font: font,
        color: rgb(0, 0, 0),
      });
      currentY -= REF_SHEET_ABILITY_SPACING;

      // Wrap and draw description
      const lines = wrapText(description, REF_SHEET_MAX_WIDTH, font, REF_SHEET_ABILITY_DESC_SIZE);
      lines.forEach((line) => {
        checkNewPage(REF_SHEET_LINE_HEIGHT);
        currentPage.drawText(line, {
          x: REF_SHEET_ABILITY_START_X + 10,
          y: currentY,
          size: REF_SHEET_ABILITY_DESC_SIZE,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });
        currentY -= REF_SHEET_LINE_HEIGHT;
      });
      currentY -= REF_SHEET_ABILITY_SPACING;
    });
  }
}

/**
 * Downloads a filled PDF to the user's computer
 * @param pdfBytes - The PDF file as Uint8Array
 * @param filename - Name for the downloaded file
 */
export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'character-sheet.pdf'): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
