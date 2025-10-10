import { PDFDocument, rgb } from 'pdf-lib';

export interface BasicCharacterData {
  characterName: string;
  class: string;
  race: string;
  house: string;
  faith: string;
  age: string;
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

const FIELD_COORDINATES: Record<keyof BasicCharacterData, FieldCoordinates> = {
  characterName: { x: 52, y: 738, size: 14 },    // ✓ Verified
  class:         { x: 210, y: 738, size: 12 },   
  race:          { x: 52, y: 703, size: 12 },   
  house:         { x: 124, y: 703, size: 12 },   
  faith:         { x: 195, y: 703, size: 12 },   
  age:           { x: 280, y: 703, size: 12 },  
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
      if (value && value.trim()) { // Only draw if there's a value
        const coords = FIELD_COORDINATES[key as keyof BasicCharacterData];
        firstPage.drawText(value, {
          x: coords.x,
          y: coords.y,
          size: coords.size || 12,
          font: font,
          color: rgb(0, 0, 0), // black text
        });
      }
    });
  } catch (error) {
    console.error('Error drawing text on PDF:', error);
    throw error;
  }

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
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
