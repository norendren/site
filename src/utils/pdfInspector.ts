import { PDFDocument } from 'pdf-lib';

/**
 * Utility to inspect PDF form fields
 * This helps identify the exact field names in the PDF
 */
export async function inspectPDFFields(pdfUrl: string): Promise<void> {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log('=== PDF Form Fields ===');
  fields.forEach(field => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${name} (${type})`);
  });
  console.log(`Total fields: ${fields.length}`);
}
