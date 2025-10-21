#!/bin/bash

# Spot-check a specific ability description against the PDF
# Usage: ./scripts/spot-check-ability.sh "ability name" "search string from description"

if [ $# -ne 2 ]; then
  echo "Usage: $0 <ability-name> <search-string>"
  echo ""
  echo "Example:"
  echo "  $0 Thaumaturge 'studied the power of magic for quite some time'"
  exit 1
fi

ABILITY_NAME="$1"
SEARCH_STRING="$2"
PDF_PATH="./src/assets/pdfs/ability_description_remaining.pdf"

echo "🔍 Checking if PDF contains: \"$SEARCH_STRING\""
echo ""

# Extract PDF text and search
if pdftotext "$PDF_PATH" - 2>/dev/null | grep -F "$SEARCH_STRING" > /dev/null; then
  echo "✅ FOUND in PDF for ability: $ABILITY_NAME"
  echo ""
  echo "Context from PDF:"
  pdftotext "$PDF_PATH" - 2>/dev/null | grep -F -B1 -A1 "$SEARCH_STRING"
  exit 0
else
  echo "❌ NOT FOUND in PDF for ability: $ABILITY_NAME"
  echo ""
  echo "This could mean:"
  echo "  1. The description in abilities.ts doesn't match the PDF"
  echo "  2. The search string has typos or formatting differences"
  exit 1
fi
