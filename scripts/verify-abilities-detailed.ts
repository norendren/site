#!/usr/bin/env tsx

/**
 * Detailed ability verification script
 * Checks every ability description against the source PDFs
 */

import { readFileSync } from 'fs';
import { abilities } from '../src/data/abilities';

interface VerificationResult {
  ability: string;
  class: string;
  status: 'match' | 'mismatch' | 'no_description';
  foundIn?: string;
  searchString?: string;
}

// Normalize text for comparison (remove extra whitespace, newlines)
function normalize(text: string): string {
  return text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract a unique verification substring from description
// Try multiple extraction strategies for better matching
function getVerificationStrings(description: string): string[] {
  const normalized = normalize(description);
  const strings: string[] = [];

  // Strategy 1: Middle 40 characters
  if (normalized.length > 50) {
    const start = Math.floor(normalized.length * 0.25);
    strings.push(normalized.substring(start, start + 40));
  }

  // Strategy 2: First 30 characters (after ability name typically)
  if (normalized.length > 30) {
    strings.push(normalized.substring(0, 30));
  }

  // Strategy 3: Last 30 characters
  if (normalized.length > 30) {
    strings.push(normalized.substring(normalized.length - 30));
  }

  // Strategy 4: Look for a sentence in the middle
  const sentences = normalized.split('. ');
  if (sentences.length > 1) {
    const middleSentence = sentences[Math.floor(sentences.length / 2)];
    if (middleSentence.length > 20) {
      strings.push(middleSentence.substring(0, 30));
    }
  }

  return strings;
}

function verifyAbilities(pdfTextPath: string) {
  const pdfText = readFileSync(pdfTextPath, 'utf-8');
  const normalizedPdf = normalize(pdfText);

  const results: VerificationResult[] = [];
  let totalChecked = 0;
  let totalMatches = 0;
  let totalMismatches = 0;
  let totalNoDescription = 0;

  // Check each class
  for (const [className, classAbilities] of Object.entries(abilities)) {
    console.log(`\n📋 Checking ${className.toUpperCase()} abilities...`);

    for (const [abilityName, abilityData] of Object.entries(classAbilities)) {
      if (!abilityData.description) {
        totalNoDescription++;
        results.push({
          ability: abilityName,
          class: className,
          status: 'no_description'
        });
        console.log(`  ⚠️  ${abilityName}: No description`);
        continue;
      }

      totalChecked++;
      const verificationStrings = getVerificationStrings(abilityData.description);
      let found = false;
      let matchedString = '';

      // Try each verification string
      for (const testString of verificationStrings) {
        if (normalizedPdf.includes(testString)) {
          found = true;
          matchedString = testString;
          break;
        }
      }

      if (found) {
        totalMatches++;
        results.push({
          ability: abilityName,
          class: className,
          status: 'match',
          foundIn: 'PDFs',
          searchString: matchedString
        });
        console.log(`  ✅ ${abilityName}`);
      } else {
        totalMismatches++;
        results.push({
          ability: abilityName,
          class: className,
          status: 'mismatch',
          searchString: verificationStrings[0]
        });
        console.log(`  ❌ ${abilityName}: MISMATCH`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total abilities with descriptions: ${totalChecked}`);
  console.log(`✅ Matches: ${totalMatches} (${Math.round(totalMatches/totalChecked*100)}%)`);
  console.log(`❌ Mismatches: ${totalMismatches} (${Math.round(totalMismatches/totalChecked*100)}%)`);
  console.log(`⚠️  No description: ${totalNoDescription}`);

  if (totalMismatches > 0) {
    console.log('\n' + '='.repeat(70));
    console.log('🚨 MISMATCHED ABILITIES DETAILS');
    console.log('='.repeat(70));

    const mismatches = results.filter(r => r.status === 'mismatch');

    // Group by class
    const byClass: Record<string, VerificationResult[]> = {};
    mismatches.forEach(m => {
      if (!byClass[m.class]) byClass[m.class] = [];
      byClass[m.class].push(m);
    });

    for (const [className, classResults] of Object.entries(byClass)) {
      console.log(`\n📌 ${className.toUpperCase()} (${classResults.length} mismatches):`);
      classResults.forEach(r => {
        console.log(`   - ${r.ability}`);
      });
    }

    console.log('\n💡 TIP: For each mismatched ability, search the PDFs manually:');
    console.log('   pdftotext <pdf-file> - | grep -i "<ability-name>" -A 5');

    process.exit(1);
  } else {
    console.log('\n🎉 All abilities verified successfully!');
    process.exit(0);
  }
}

// Main
const pdfTextPath = process.argv[2];
if (!pdfTextPath) {
  console.error('Usage: tsx verify-abilities-detailed.ts <combined-pdf-text-file>');
  process.exit(1);
}

verifyAbilities(pdfTextPath);
