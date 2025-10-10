import { PDFDocument, rgb } from 'pdf-lib';

/**
 * Helper function to create a test PDF with text at specified coordinates
 * This helps you visualize where text will appear on the PDF
 */
export async function testCoordinates(
  pdfUrl: string,
  testText: string,
  x: number,
  y: number,
  fontSize: number = 12
): Promise<Uint8Array> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const font = await pdfDoc.embedFont('Helvetica');

  // Get page dimensions for reference
  const { width, height } = firstPage.getSize();
  console.log(`PDF Page Size: ${width} x ${height}`);
  console.log(`Drawing "${testText}" at (${x}, ${y}) with size ${fontSize}`);

  // Draw the test text in blue so it stands out
  firstPage.drawText(testText, {
    x,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 1), // blue for testing
  });

  // Draw crosshairs at the exact position for reference
  firstPage.drawLine({
    start: { x: x - 5, y },
    end: { x: x + 5, y },
    thickness: 0.5,
    color: rgb(1, 0, 0), // red crosshair
  });
  firstPage.drawLine({
    start: { x, y: y - 5 },
    end: { x, y: y + 5 },
    thickness: 0.5,
    color: rgb(1, 0, 0), // red crosshair
  });

  return await pdfDoc.save();
}

/**
 * Get the dimensions of the PDF
 */
export async function getPDFDimensions(pdfUrl: string): Promise<{ width: number; height: number }> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  return firstPage.getSize();
}
