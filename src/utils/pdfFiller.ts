import { PDFDocument, rgb } from 'pdf-lib';
import { TALENT_ATTRIBUTES, calculateTalentScore, getTalentAttributeModifier, getClassHealthBonuses } from './classReference';
import type { TalentName } from './classReference';
import { getRaceHealthBonuses, getRacePerks, calculateHealthTierBonuses } from './raceReference';
import type {
  ArcaneAptitudeAllocation,
  RogueSpecialtySelection,
  WarriorStyleSelection,
} from './classSpecialties';

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
  talents?: TalentAllocation[];
  attributes?: AttributeAllocation[];
  // Class-specific specialties
  arcaneAllocations?: ArcaneAptitudeAllocation[]; // Mage only
  rogueSpecialties?: RogueSpecialtySelection[]; // Rogue only
  warriorStyles?: WarriorStyleSelection[]; // Warrior only
  // Acolyte Bless is auto-calculated from level, no storage needed
}

// Coordinate mappings for where to place text on the PDF
// The coordinate system has (0,0) at the bottom-left corner
// Format: { x: horizontal position, y: vertical position, size: font size }
// ✓ = verified position, ⚠ = needs adjustment
interface FieldCoordinates {
  x: number;
  y: number;
  size?: number; // font size, defaults to 12
}

const FIELD_COORDINATES: Record<keyof Omit<BasicCharacterData, 'talents' | 'attributes' | 'racialPerks'>, FieldCoordinates> = {
  characterName: { x: 52, y: 738, size: 14 },    // ✓ Verified
  class:         { x: 210, y: 738, size: 12 },
  level:         { x: 310, y: 738, size: 12 },
  race:          { x: 52, y: 703, size: 12 },
  house:         { x: 124, y: 703, size: 12 },
  faith:         { x: 195, y: 703, size: 12 },
  age:           { x: 280, y: 703, size: 12 },
};

// Bubble sizing and spacing constants
const BUBBLE_RADIUS = 3;
const BUBBLE_HORIZONTAL_SPACING = 10.5; // Distance between bubbles (left-most to 2nd, 2nd to 3rd)

// Define the constants for the calculation
const TALENT_START_Y = 372.5;
const TALENT_Y_STEP = 14.125;
const TALENT_STATIC_X = 484;
const TALENT_TOTAL_X = 440; // X position for talent total scores (after the bubbles)
const TALENT_TOTAL_Y_OFFSET = -4; // Vertical offset for talent totals (adjust if text appears too high/low)

// Attribute text coordinates
// Each attribute value is drawn as text at a specific position
const ATTRIBUTE_START_Y = 645; // Starting Y position for first attribute (CON)
const ATTRIBUTE_Y_STEP = 28.25; // Vertical spacing between attributes
const ATTRIBUTE_ZERO_X = 120; // X position where the attribute value text is drawn

// Attribute names in order on the PDF
const ATTRIBUTE_NAMES = ['CON', 'DEX', 'INS', 'KNO', 'STR', 'VAL'] as const;

// Health tier maximum coordinates (top-right area of sheet)
// These are educated guesses - user will adjust if needed
const HEALTH_MAX_X = 530; // X position for health maximum values
const HEALTH_FATIGUED_Y = 620; // Y position for Fatigued max
const HEALTH_BATTERED_Y = 592; // Y position for Battered max
const HEALTH_INJURED_Y = 565; // Y position for Injured max

// Racial perks coordinates (placeholder - adjust as needed)
const RACIAL_PERKS_START_X = 94; // X position for racial perk text (left side)
const RACIAL_PERKS_START_Y = 462; // Y position for first racial perk
const RACIAL_PERKS_LINE_HEIGHT = 14; // Space between perk name and description
const RACIAL_PERKS_PERK_SPACING = 36; // Space between perks

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
  // Load the existing PDF
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page (character sheets are typically one page)
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

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

    // Draw talent total scores (always draw for all talents)
    drawTalentTotals(firstPage, characterData.talents || [], characterData.attributes || [], font);

    // Draw attribute values as text (always draw all 6 attributes, defaulting to 0)
    drawAttributeValues(firstPage, characterData.attributes || [], font);

    // Draw health tier maximums (Fatigued, Battered, Injured)
    if (characterData.class && characterData.race) {
      drawHealthMaximums(firstPage, characterData, font);
    }

    // Draw racial perks if selected
    if (characterData.racialPerks && characterData.racialPerks.length > 0 && characterData.race) {
      drawRacialPerks(firstPage, characterData, font);
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
 * For each talent, calculates: Talent Points + Attribute Modifier + Abilities + Racial Perks
 * Currently only includes Talent Points + Attribute Modifier (abilities and racial perks not yet implemented)
 *
 * The system works as follows:
 * 1. Each talent has a fixed Y position based on its index in TALENT_NAMES
 * 2. All totals are drawn at the same X position (TALENT_TOTAL_X)
 * 3. Values are formatted with +/- sign
 */
function drawTalentTotals(
  page: any,
  talents: TalentAllocation[],
  attributes: AttributeAllocation[],
  font: any
): void {
  // Create maps for quick lookup
  const talentMap = new Map<string, number>();
  talents.forEach(talent => {
    talentMap.set(talent.name, talent.points);
  });

  const attributeMap = new Map<string, number>();
  attributes.forEach(attr => {
    attributeMap.set(attr.name, attr.points);
  });

  // Draw total for each talent in the list
  TALENT_NAMES.forEach((fullTalentKey, index) => {
    // Extract talent name (e.g., "Athletics" from "Athletics (STR)")
    const talentName = fullTalentKey.split(' (')[0] as TalentName;

    // Get talent points
    const talentPoints = talentMap.get(talentName) ?? 0;

    // Get attribute modifier
    const attributeModifier = getTalentAttributeModifier(talentName, attributeMap);

    // Calculate total score (abilities and racial perks are 0 for now)
    const totalScore = calculateTalentScore(talentPoints, attributeModifier, 0, 0);

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
 * Calculates and draws maximum health values for each tier
 * Formula: Health Max = Race Bonus + CON Modifier + Class Bonus + Perk Bonus
 *
 * @param page - PDF page to draw on
 * @param characterData - Character data including class, race, level, and attributes
 * @param font - Font to use for rendering
 */
function drawHealthMaximums(
  page: any,
  characterData: BasicCharacterData,
  font: any
): void {
  // Get race bonuses
  const raceHealthBonuses = getRaceHealthBonuses(characterData.race);
  if (!raceHealthBonuses) {
    console.warn(`No health bonuses found for race: ${characterData.race}`);
    return;
  }

  // Get class bonuses
  const level = parseInt(characterData.level) || 1;
  const classHealthBonuses = getClassHealthBonuses(characterData.class, level);
  if (!classHealthBonuses) {
    console.warn(`No health bonuses found for class: ${characterData.class} at level ${level}`);
    return;
  }

  // Get CON modifier from attributes
  const attributeMap = new Map<string, number>();
  (characterData.attributes || []).forEach(attr => {
    attributeMap.set(attr.name, attr.points);
  });
  const conModifier = attributeMap.get('CON') ?? 0;

  // Get perk bonuses (e.g., Dwarf "Hardy" = +1 Injured per level, Human "Resilient" = +1 Fatigued per level)
  const perkHealthBonuses = characterData.racialPerks && characterData.racialPerks.length > 0
    ? calculateHealthTierBonuses(characterData.race, characterData.racialPerks, level)
    : { fatigued: 0, battered: 0, injured: 0 };

  // Calculate maximums (now includes perk bonuses)
  const fatigued = raceHealthBonuses.fatigued + conModifier + classHealthBonuses.fatigued + perkHealthBonuses.fatigued;
  const battered = raceHealthBonuses.battered + conModifier + classHealthBonuses.battered + perkHealthBonuses.battered;
  const injured = raceHealthBonuses.injured + conModifier + classHealthBonuses.injured + perkHealthBonuses.injured;

  // Draw Fatigued max
  page.drawText(fatigued.toString(), {
    x: HEALTH_MAX_X,
    y: HEALTH_FATIGUED_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Battered max
  page.drawText(battered.toString(), {
    x: HEALTH_MAX_X,
    y: HEALTH_BATTERED_Y,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw Injured max
  page.drawText(injured.toString(), {
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
