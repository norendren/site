#!/usr/bin/env tsx

/**
 * DEMONSTRATION: Prove that goalpost approach will find all 300 abilities
 *
 * Strategy:
 * 1. Use existing abilities.ts as canonical list (names are correct, descriptions may be wrong)
 * 2. Concatenate all description PDFs
 * 3. For each of 300 abilities, try to find it using goalpost approach
 * 4. Report success rate
 */

import { execSync } from 'child_process';
import { abilities } from '../src/data/abilities';

// Extract all ability names from abilities.ts
function getCanonicalAbilityList(): string[] {
  const allAbilities: string[] = [];

  for (const [className, classAbilities] of Object.entries(abilities)) {
    for (const abilityName of Object.keys(classAbilities)) {
      allAbilities.push(abilityName);
    }
  }

  return allAbilities;
}

// Concatenate all description PDFs into one text blob
function concatenateDescriptionPDFs(): string {
  console.log('📄 Concatenating description PDFs...');

  const pdfs = [
    './src/assets/pdfs/ability_description_1.pdf',
    './src/assets/pdfs/ability_description_2.pdf',
    './src/assets/pdfs/ability_description_3.pdf',
    './src/assets/pdfs/ability_description_remaining.pdf'
  ];

  let combined = '';

  for (const pdf of pdfs) {
    console.log(`  - ${pdf}`);
    const text = execSync(`pdftotext "${pdf}" -`, { encoding: 'utf-8' });
    combined += text + '\n\n';
  }

  console.log(`✅ Combined text length: ${combined.length} characters\n`);
  return combined;
}

// Try to find an ability name in the text (case-insensitive, flexible whitespace)
function findAbilityPosition(text: string, abilityName: string): number {
  // First try exact match
  const exactMatch = text.indexOf('\n' + abilityName + '\n');
  if (exactMatch !== -1) {
    return exactMatch + 1; // Return position after newline
  }

  // Try case-insensitive with regex
  const pattern = new RegExp(`^${abilityName}$`, 'mi');
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i].trim())) {
      // Calculate character position
      const position = lines.slice(0, i).join('\n').length + (i > 0 ? 1 : 0);
      return position;
    }
  }

  return -1;
}

// Main demonstration
function demonstrateGoalpostApproach() {
  console.log('🎯 GOALPOST APPROACH DEMONSTRATION');
  console.log('=' .repeat(60));
  console.log();

  // Step 1: Get canonical list
  const canonicalAbilities = getCanonicalAbilityList();
  console.log(`📋 Canonical ability list: ${canonicalAbilities.length} abilities`);
  console.log();

  // Step 2: Concatenate PDFs
  const allText = concatenateDescriptionPDFs();

  // Step 3: Test goalpost approach
  console.log('🔍 Testing goalpost extraction...\n');

  const found: string[] = [];
  const notFound: string[] = [];
  const ambiguous: Array<{name: string, reason: string}> = [];

  for (let i = 0; i < canonicalAbilities.length; i++) {
    const currentName = canonicalAbilities[i];
    const nextName = i + 1 < canonicalAbilities.length ? canonicalAbilities[i + 1] : null;

    const startPos = findAbilityPosition(allText, currentName);

    if (startPos === -1) {
      notFound.push(currentName);
      console.log(`  ❌ ${currentName} - NOT FOUND`);
      continue;
    }

    if (nextName) {
      const endPos = findAbilityPosition(allText, nextName);

      if (endPos === -1) {
        // Next ability not found, but current is - this is OK for now
        found.push(currentName);
        console.log(`  ✅ ${currentName} (next ability "${nextName}" not found - will use EOF)`);
      } else if (endPos <= startPos) {
        // Sanity check: end should be after start
        ambiguous.push({
          name: currentName,
          reason: `End position (${endPos}) <= start position (${startPos})`
        });
        console.log(`  ⚠️  ${currentName} - AMBIGUOUS (positions out of order)`);
      } else {
        const extractedLength = endPos - startPos;
        found.push(currentName);
        console.log(`  ✅ ${currentName} (${extractedLength} chars until "${nextName}")`);
      }
    } else {
      // Last ability - use EOF as endpoint
      const extractedLength = allText.length - startPos;
      found.push(currentName);
      console.log(`  ✅ ${currentName} (${extractedLength} chars until EOF)`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DEMONSTRATION RESULTS');
  console.log('='.repeat(60));
  console.log(`Total abilities in canonical list: ${canonicalAbilities.length}`);
  console.log(`✅ Found: ${found.length} (${Math.round(found.length/canonicalAbilities.length*100)}%)`);
  console.log(`❌ Not found: ${notFound.length}`);
  console.log(`⚠️  Ambiguous: ${ambiguous.length}`);
  console.log();

  if (notFound.length > 0) {
    console.log('❌ ABILITIES NOT FOUND:');
    notFound.forEach(name => console.log(`   - ${name}`));
    console.log();
  }

  if (ambiguous.length > 0) {
    console.log('⚠️  AMBIGUOUS ABILITIES:');
    ambiguous.forEach(({name, reason}) => console.log(`   - ${name}: ${reason}`));
    console.log();
  }

  if (found.length === canonicalAbilities.length) {
    console.log('🎉 SUCCESS! All 300 abilities can be found using goalpost approach!');
    console.log('✅ Ready to implement full goalpost extraction.');
    return true;
  } else {
    console.log('⚠️  Some abilities could not be found. Need to investigate:');
    console.log('   1. Are the ability names slightly different in PDFs?');
    console.log('   2. Are some abilities missing from description PDFs?');
    console.log('   3. Do we need more flexible name matching?');
    return false;
  }
}

// Run demonstration
const success = demonstrateGoalpostApproach();
process.exit(success ? 0 : 1);
