#!/usr/bin/env tsx

/**
 * Verification script to check that ability descriptions match the source PDF
 *
 * Usage: npx tsx scripts/verify-abilities.ts
 *
 * This script:
 * 1. Reads all abilities from abilities.ts
 * 2. For each ability, extracts a unique substring (30-50 chars from middle of description)
 * 3. Searches the PDF text for that exact substring
 * 4. Reports any mismatches
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { abilities } from '../src/data/abilities';

// Convert PDF to text using pdftotext (must be installed)
function extractPdfText(pdfPath: string): string {
  try {
    // Use pdftotext to extract text from PDF
    const text = execSync(`pdftotext "${pdfPath}" -`, { encoding: 'utf-8' });
    return text;
  } catch (error) {
    console.error('Error extracting PDF text. Make sure pdftotext is installed (sudo apt install poppler-utils)');
    throw error;
  }
}

// Extract a verification substring from the middle of a description
// This avoids differences in ability names or trailing punctuation
function getVerificationSubstring(description: string): string {
  // Remove newlines and normalize spaces
  const normalized = description.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

  // Get a substring from roughly 20% to 70% of the description
  // This should be unique enough to identify the ability
  const start = Math.floor(normalized.length * 0.2);
  const end = Math.min(start + 50, Math.floor(normalized.length * 0.7));

  return normalized.substring(start, end);
}

// Main verification function
function verifyAbilities() {
  console.log('🔍 Verifying ability descriptions against PDF...\n');

  const pdfPath = './src/assets/pdfs/ability_description_remaining.pdf';
  const pdfText = extractPdfText(pdfPath);

  let totalChecked = 0;
  let totalMatches = 0;
  let totalMismatches = 0;
  const mismatches: Array<{ class: string; ability: string; substring: string }> = [];

  // Check each class
  for (const [className, classAbilities] of Object.entries(abilities)) {
    console.log(`\n📋 Checking ${className.toUpperCase()} abilities...`);

    for (const [abilityName, abilityData] of Object.entries(classAbilities)) {
      if (!abilityData.description) {
        console.log(`  ⚠️  ${abilityName}: No description`);
        continue;
      }

      totalChecked++;
      const verificationString = getVerificationSubstring(abilityData.description);

      if (pdfText.includes(verificationString)) {
        totalMatches++;
        console.log(`  ✅ ${abilityName}`);
      } else {
        totalMismatches++;
        mismatches.push({
          class: className,
          ability: abilityName,
          substring: verificationString
        });
        console.log(`  ❌ ${abilityName}: MISMATCH`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total abilities checked: ${totalChecked}`);
  console.log(`✅ Matches: ${totalMatches}`);
  console.log(`❌ Mismatches: ${totalMismatches}`);

  if (totalMismatches > 0) {
    console.log('\n🚨 MISMATCHED ABILITIES:\n');
    mismatches.forEach(({ class: cls, ability, substring }) => {
      console.log(`${cls}/${ability}:`);
      console.log(`  Expected substring: "${substring}"`);
      console.log('');
    });

    process.exit(1);
  } else {
    console.log('\n🎉 All abilities verified successfully!');
    process.exit(0);
  }
}

// Run verification
verifyAbilities();
