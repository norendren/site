#!/usr/bin/env tsx

/**
 * Parse ability descriptions from PDF text files
 *
 * PDF Structure:
 * Ability Name
 * Class[, Prerequisites]
 * Description paragraph...
 * [blank line or next ability]
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

interface ParsedAbility {
  name: string;
  class: string;
  prerequisites?: string;
  description: string;
}

// Known class names
const CLASSES = ['Acolyte', 'Mage', 'Rogue', 'Warrior', 'General'];

// Parse a single PDF file
function parsePdf(pdfPath: string): ParsedAbility[] {
  console.log(`📄 Parsing: ${pdfPath}`);

  const text = execSync(`pdftotext "${pdfPath}" -`, { encoding: 'utf-8' });
  const lines = text.split('\n');

  const abilities: ParsedAbility[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines, page numbers, headers
    if (!line || /^\d+$/.test(line) || line === 'Abilities' || line === 'ATHIA –' || /^Page \d+/.test(line)) {
      i++;
      continue;
    }

    // Check if next line looks like a class/prerequisite line
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      const hasClassMarker = CLASSES.some(cls => nextLine.startsWith(cls));

      if (hasClassMarker) {
        // This is an ability name!
        const abilityName = line;
        const classLine = nextLine;

        // Parse class and prerequisites
        const classParts = classLine.split(',').map(s => s.trim());
        const abilityClass = classParts[0];
        const prerequisites = classParts.slice(1).join(', ');

        // Collect description lines until we hit the next ability or blank section
        const descriptionLines: string[] = [];
        i += 2; // Skip ability name and class line

        while (i < lines.length) {
          const descLine = lines[i].trim();

          // Stop conditions:
          // 1. Empty line followed by a potential ability name
          // 2. A line that looks like an ability name (next line is a class)
          // 3. Page number or section header
          if (!descLine) {
            // Check if next non-empty line is an ability
            let j = i + 1;
            while (j < lines.length && !lines[j].trim()) j++;
            if (j + 1 < lines.length) {
              const potentialName = lines[j].trim();
              const potentialClass = lines[j + 1].trim();
              if (CLASSES.some(cls => potentialClass.startsWith(cls))) {
                // Next section is an ability, stop here
                break;
              }
            }
            i++;
            continue;
          }

          if (/^\d+$/.test(descLine) || descLine === 'Abilities' || descLine === 'ATHIA –') {
            break;
          }

          // Check if this line starts a new ability
          if (i + 1 < lines.length) {
            const nextLineCheck = lines[i + 1].trim();
            if (CLASSES.some(cls => nextLineCheck.startsWith(cls))) {
              // This is the next ability name, stop
              break;
            }
          }

          descriptionLines.push(descLine);
          i++;
        }

        const description = descriptionLines.join(' ').trim();

        if (description) {
          abilities.push({
            name: abilityName,
            class: abilityClass,
            prerequisites: prerequisites || undefined,
            description
          });

          console.log(`  ✅ ${abilityName} (${description.substring(0, 50)}...)`);
        }

        continue;
      }
    }

    i++;
  }

  return abilities;
}

// Main
const pdfFiles = [
  './src/assets/pdfs/ability_description_1.pdf',
  './src/assets/pdfs/ability_description_2.pdf',
  './src/assets/pdfs/ability_description_3.pdf',
  './src/assets/pdfs/ability_description_remaining.pdf'
];

const allAbilities: ParsedAbility[] = [];

for (const pdf of pdfFiles) {
  const abilities = parsePdf(pdf);
  allAbilities.push(...abilities);
}

console.log(`\n📊 Total abilities parsed: ${allAbilities.length}`);

// Save to JSON for review
writeFileSync(
  './scripts/parsed-abilities.json',
  JSON.stringify(allAbilities, null, 2)
);

console.log(`\n💾 Saved to: ./scripts/parsed-abilities.json`);
console.log(`\n✅ You can now review this file to verify extraction quality`);
