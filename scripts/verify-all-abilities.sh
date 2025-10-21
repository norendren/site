#!/bin/bash

# Comprehensive ability verification script
# Checks all ability descriptions against all source PDFs

set -e

PDF_DIR="./src/assets/pdfs"
TEMP_DIR="/tmp/ability-verification"

mkdir -p "$TEMP_DIR"

echo "🔍 COMPREHENSIVE ABILITY VERIFICATION"
echo "========================================"
echo ""
echo "📄 Extracting PDF text..."

# Extract all PDFs to text
pdftotext "$PDF_DIR/ability_description_1.pdf" "$TEMP_DIR/pdf1.txt" 2>/dev/null || echo "Warning: Could not extract PDF 1"
pdftotext "$PDF_DIR/ability_description_2.pdf" "$TEMP_DIR/pdf2.txt" 2>/dev/null || echo "Warning: Could not extract PDF 2"
pdftotext "$PDF_DIR/ability_description_3.pdf" "$TEMP_DIR/pdf3.txt" 2>/dev/null || echo "Warning: Could not extract PDF 3"
pdftotext "$PDF_DIR/ability_description_remaining.pdf" "$TEMP_DIR/pdf_remaining.txt" 2>/dev/null || echo "Warning: Could not extract PDF remaining"

# Combine all PDF text
cat "$TEMP_DIR"/pdf*.txt > "$TEMP_DIR/all_pdfs.txt" 2>/dev/null

echo "✅ PDF text extracted"
echo ""
echo "📋 Checking abilities..."
echo ""

# Now run the TypeScript verification script
npx tsx scripts/verify-abilities-detailed.ts "$TEMP_DIR/all_pdfs.txt"

# Cleanup
rm -rf "$TEMP_DIR"
