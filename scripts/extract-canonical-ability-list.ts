#!/usr/bin/env tsx

/**
 * Extract the canonical ordered list of 300 ability names from ability_titles.pdf
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

function extractAbilityNames(): string[] {
  console.log('📄 Extracting canonical ability list from ability_titles.pdf...\n');

  const text = execSync('pdftotext ./src/assets/pdfs/ability_titles.pdf -', { encoding: 'utf-8' });
  const lines = text.split('\n').map(l => l.trim());

  const abilities: string[] = [];

  // The PDF has ability tables with format:
  // Ability | Summary
  // Name    | Description

  // We need to extract ability names from the tables
  // Strategy: Look for lines that appear to be ability names
  // Skip: class headers, "Ability", "Summary", page numbers, etc.

  const skipPatterns = [
    /^$/,
    /^Page \d+/,
    /^ATHIA/,
    /^Abilities$/,
    /^Ability$/,
    /^Summary$/,
    /^Acolyte Abilities$/,
    /^Mage Abilities$/,
    /^Rogue Abilities$/,
    /^Warrior Abilities$/,
    /^General Abilities$/,
    /^Acolyte Abilities Table$/,
    /^Mage Abilities Table$/,
    /^Rogue Abilities Table$/,
    /^Warrior Abilities Table$/,
    /^General Abilities Table$/,
    /^Table$/,
    /^The following/,
    /^unique to/,
    /^players may/,
    /^You /,  // Skip summary lines
    /^Your /,
    /^Gain /,
    /^Choose /,
    /^Once /,
    /^Spend /,
    /^Each /,
    /^When /,
    /^As /,
    /^\d+$/,  // Skip page numbers
  ];

  let inAbilityTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines
    if (!line) continue;

    // Skip known non-ability patterns
    if (skipPatterns.some(pattern => pattern.test(line))) {
      continue;
    }

    // Check if this looks like an ability name
    // Ability names typically:
    // - Start with capital letter
    // - May have Roman numerals (I, II, III)
    // - May have "Of" or "For" in the middle
    // - Are relatively short (< 40 chars)
    // - Don't end with common sentence endings

    if (line.length > 0 &&
        line.length < 40 &&
        /^[A-Z]/.test(line) &&
        !line.endsWith('.') &&
        !line.endsWith(',') &&
        !line.includes('|')) {  // Skip table separators

      // Additional validation: next line shouldn't be another ability-like name
      // (helps filter out multi-line summaries)
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';

      // If next line looks like a summary (lowercase start or starts with common words)
      const looksLikeSummary = nextLine && (
        /^[a-z]/.test(nextLine) ||
        /^You |^Your |^Gain |^Choose |^Once |^Spend |^Each |^When |^As |^The |^By |^With |^No |^All |^Any /.test(nextLine)
      );

      // If current line doesn't look like a summary fragment
      const notSummary = !/^You |^Your |^Gain |^Choose |^Once |^Spend |^Each |^When |^As |^The |^By |^With |^rather than|^but |^and |^or /.test(line);

      if (notSummary && (looksLikeSummary || !nextLine)) {
        abilities.push(line);
        console.log(`  ✓ ${line}`);
      }
    }
  }

  console.log(`\n📊 Total abilities extracted: ${abilities.length}`);
  return abilities;
}

// Main
const abilities = extractAbilityNames();

// Save to file
writeFileSync(
  './scripts/canonical-abilities.json',
  JSON.stringify(abilities, null, 2)
);

console.log('\n💾 Saved to: ./scripts/canonical-abilities.json');

// Show stats
const byRomanNumeral = abilities.filter(a => / (I|II|III)$/.test(a));
console.log(`\nAbilities with Roman numerals: ${byRomanNumeral.length}`);
console.log(`Abilities without numerals: ${abilities.length - byRomanNumeral.length}`);
