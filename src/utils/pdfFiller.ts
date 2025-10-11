import { PDFDocument, rgb } from 'pdf-lib';
import { TALENT_ATTRIBUTES } from './classReference';
import type { TalentName } from './classReference';

export interface TalentAllocation {
  name: string;
  points: number; // 0-6 points invested (1 point = 1 bubble)
}

export interface BasicCharacterData {
  characterName: string;
  class: string;
  level: string;
  race: string;
  house: string;
  faith: string;
  age: string;
  talents?: TalentAllocation[];
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

const FIELD_COORDINATES: Record<keyof Omit<BasicCharacterData, 'talents'>, FieldCoordinates> = {
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
      // Skip talents - they're handled separately
      if (key === 'talents') return;

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
