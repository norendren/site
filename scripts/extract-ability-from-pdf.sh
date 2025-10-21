#!/bin/bash

# Helper script to extract a specific ability description from PDFs
# Usage: ./extract-ability-from-pdf.sh "Ability Name"

if [ $# -ne 1 ]; then
  echo "Usage: $0 \"Ability Name\""
  exit 1
fi

ABILITY_NAME="$1"
PDF_DIR="./src/assets/pdfs"

echo "🔍 Searching for: $ABILITY_NAME"
echo "=================================="
echo ""

for pdf in "$PDF_DIR"/ability_description_*.pdf; do
  echo "📄 Checking: $(basename "$pdf")"
  result=$(pdftotext "$pdf" - 2>/dev/null | grep -i "^${ABILITY_NAME}$" -A 10 | head -15)

  if [ ! -z "$result" ]; then
    echo "✅ FOUND!"
    echo ""
    echo "$result"
    echo ""
    echo "---"
    exit 0
  fi
done

echo "❌ Not found in any PDF"
exit 1
