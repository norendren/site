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
  fontSize: number = 12,
  pageNumber: number = 1
): Promise<Uint8Array> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const targetPage = pages[pageNumber - 1]; // Convert to 0-indexed
  const font = await pdfDoc.embedFont('Helvetica');

  // Get page dimensions for reference
  const { width, height } = targetPage.getSize();
  console.log(`PDF Page ${pageNumber} Size: ${width} x ${height}`);
  console.log(`Drawing "${testText}" at (${x}, ${y}) with size ${fontSize}`);

  // Draw the test text in blue so it stands out
  targetPage.drawText(testText, {
    x,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 1), // blue for testing
  });

  // Draw crosshairs at the exact position for reference
  targetPage.drawLine({
    start: { x: x - 5, y },
    end: { x: x + 5, y },
    thickness: 0.5,
    color: rgb(1, 0, 0), // red crosshair
  });
  targetPage.drawLine({
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
export async function getPDFDimensions(pdfUrl: string, pageNumber: number = 1): Promise<{ width: number; height: number }> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const targetPage = pages[pageNumber - 1]; // Convert to 0-indexed
  return targetPage.getSize();
}

/**
 * Helper function to test bubble coordinates on the PDF
 * Draws bubbles with specified parameters to help find correct positions
 */
export async function testBubbleCoordinates(
  pdfUrl: string,
  x: number,
  y: number,
  bubbleRadius: number = 4,
  horizontalSpacing: number = 20,
  bubblesToFill: number = 3,
  pageNumber: number = 1
): Promise<Uint8Array> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const targetPage = pages[pageNumber - 1]; // Convert to 0-indexed

  console.log(`Drawing ${bubblesToFill} bubbles at (${x}, ${y}) with radius ${bubbleRadius} and spacing ${horizontalSpacing} on page ${pageNumber}`);

  // Draw 3 bubbles (showing talent expertise: Apprentice, Journeyman, Master)
  for (let i = 0; i < 3; i++) {
    const bubbleX = x + (i * horizontalSpacing);
    const filled = i < bubblesToFill;

    // Draw circle
    targetPage.drawCircle({
      x: bubbleX,
      y: y,
      size: bubbleRadius,
      borderColor: rgb(0, 0, 1), // Blue border for testing
      borderWidth: 1,
      color: filled ? rgb(0, 0, 1) : undefined, // Blue fill for filled bubbles
      opacity: filled ? 0.6 : 0, // Semi-transparent so you can see overlap
    });

    // Draw crosshairs at center of each bubble
    targetPage.drawLine({
      start: { x: bubbleX - 3, y },
      end: { x: bubbleX + 3, y },
      thickness: 0.5,
      color: rgb(1, 0, 0), // Red crosshair
    });
    targetPage.drawLine({
      start: { x: bubbleX, y: y - 3 },
      end: { x: bubbleX, y: y + 3 },
      thickness: 0.5,
      color: rgb(1, 0, 0), // Red crosshair
    });

    // Label each bubble
    const label = i === 0 ? 'A' : i === 1 ? 'J' : 'M';
    targetPage.drawText(label, {
      x: bubbleX - 2,
      y: y + bubbleRadius + 5,
      size: 8,
      color: rgb(1, 0, 0), // Red label
    });
  }

  // Draw coordinate label
  targetPage.drawText(`(${x}, ${y}) r=${bubbleRadius} sp=${horizontalSpacing}`, {
    x: x,
    y: y - bubbleRadius - 15,
    size: 8,
    color: rgb(1, 0, 0),
  });

  return await pdfDoc.save();
}
