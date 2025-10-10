import { PDFDocument, rgb } from 'pdf-lib';
import type { TalentExpertise } from './classReference';

export interface TalentAllocation {
  name: string;
  expertise: TalentExpertise;
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
const BUBBLE_RADIUS = 4;
const BUBBLE_HORIZONTAL_SPACING = 20; // Distance between bubbles (left-most to 2nd, 2nd to 3rd)

// Coordinate mappings for talent bubbles
// Each talent maps to the position of its FIRST (left-most) bubble
// The 2nd and 3rd bubbles are calculated automatically using BUBBLE_HORIZONTAL_SPACING
interface TalentBubbleCoordinates {
  x: number; // X position of the first bubble
  y: number; // Y position of all bubbles for this talent
}

const TALENT_BUBBLE_COORDINATES: Record<string, TalentBubbleCoordinates> = {
  // TODO: Replace these placeholder values with actual coordinates from your character sheet
  // Find the first bubble for each talent, then all others will be calculated automatically
  'Athletics':    { x: 100, y: 600 },
  'Notice':       { x: 100, y: 580 },
  'Stealth':      { x: 100, y: 560 },
  'Survival':     { x: 100, y: 540 },
  'Exertion':     { x: 100, y: 520 },
  'Recuperation': { x: 100, y: 500 },
  'Lore':         { x: 100, y: 480 },
  'Medicine':     { x: 100, y: 460 },
  'Persuasion':   { x: 100, y: 440 },
  'Deception':    { x: 100, y: 420 },
  'Intimidation': { x: 100, y: 400 },
  'Performance':  { x: 100, y: 380 },
};

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
 * Each talent has 3 bubbles: Apprentice, Journeyman, Master
 * Filled bubbles indicate the expertise level achieved
 *
 * The system works mathematically:
 * 1. Define the position of the FIRST bubble for each talent in TALENT_BUBBLE_COORDINATES
 * 2. The 2nd bubble is automatically placed at x + BUBBLE_HORIZONTAL_SPACING
 * 3. The 3rd bubble is automatically placed at x + (BUBBLE_HORIZONTAL_SPACING * 2)
 */
function drawTalentBubbles(page: any, talents: TalentAllocation[]): void {
  talents.forEach((talent) => {
    // Get the coordinates for this talent's first bubble
    const coords = TALENT_BUBBLE_COORDINATES[talent.name];

    if (!coords) {
      console.warn(`No bubble coordinates defined for talent: ${talent.name}`);
      return;
    }

    // Determine how many bubbles to fill based on expertise level
    const bubblesToFill = talent.expertise === 'apprentice' ? 1
                       : talent.expertise === 'journeyman' ? 2
                       : talent.expertise === 'master' ? 3
                       : 0;

    // Draw the 3 bubbles (Apprentice, Journeyman, Master)
    for (let bubbleIndex = 0; bubbleIndex < 3; bubbleIndex++) {
      // Calculate X position: first bubble + (spacing * bubble index)
      const x = coords.x + (bubbleIndex * BUBBLE_HORIZONTAL_SPACING);
      const y = coords.y;
      const filled = bubbleIndex < bubblesToFill;

      // Draw circle
      page.drawCircle({
        x: x,
        y: y,
        size: BUBBLE_RADIUS,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
        color: filled ? rgb(0, 0, 0) : undefined,
        opacity: filled ? 1 : 0,
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
