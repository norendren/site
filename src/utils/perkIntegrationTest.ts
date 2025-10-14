/**
 * Integration test for racial perk bonuses
 * Verifies that perk effects are correctly applied to character calculations
 */

import { calculateTalentPointBonus, calculateHealthTierBonuses } from './raceReference';

console.log('=== Testing Racial Perk Integration ===\n');

// Test 1: Human "Sharp" perk should give +4 talent points
console.log('Test 1: Human with "Sharp" perk');
const humanSharpBonus = calculateTalentPointBonus('Human', ['Sharp', 'Courageous']);
console.log(`Expected: 4 talent points`);
console.log(`Actual: ${humanSharpBonus} talent points`);
console.log(`Result: ${humanSharpBonus === 4 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test 2: Human without "Sharp" should give 0 bonus talent points
console.log('Test 2: Human without "Sharp" perk');
const humanNoSharpBonus = calculateTalentPointBonus('Human', ['Courageous', 'Resilient']);
console.log(`Expected: 0 talent points`);
console.log(`Actual: ${humanNoSharpBonus} talent points`);
console.log(`Result: ${humanNoSharpBonus === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test 3: Dwarf "Hardy" perk should give +1 Injured health per level
console.log('Test 3: Dwarf Level 5 with "Hardy" perk');
const dwarfHardyBonus = calculateHealthTierBonuses('Dwarf', ['Hardy', 'Sound'], 5);
console.log(`Expected: { fatigued: 0, battered: 0, injured: 5 }`);
console.log(`Actual: ${JSON.stringify(dwarfHardyBonus)}`);
console.log(`Result: ${dwarfHardyBonus.injured === 5 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test 4: Human "Resilient" perk should give +1 Fatigued health per level
console.log('Test 4: Human Level 3 with "Resilient" perk');
const humanResilientBonus = calculateHealthTierBonuses('Human', ['Resilient', 'Courageous'], 3);
console.log(`Expected: { fatigued: 3, battered: 0, injured: 0 }`);
console.log(`Actual: ${JSON.stringify(humanResilientBonus)}`);
console.log(`Result: ${humanResilientBonus.fatigued === 3 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test 5: Human with both "Resilient" and "Sharp" at Level 10
console.log('Test 5: Human Level 10 with "Resilient" and "Sharp"');
const humanCombinedTalent = calculateTalentPointBonus('Human', ['Resilient', 'Sharp']);
const humanCombinedHealth = calculateHealthTierBonuses('Human', ['Resilient', 'Sharp'], 10);
console.log(`Expected talent bonus: 4 (from Sharp)`);
console.log(`Actual talent bonus: ${humanCombinedTalent}`);
console.log(`Expected health bonus: { fatigued: 10, battered: 0, injured: 0 } (from Resilient)`);
console.log(`Actual health bonus: ${JSON.stringify(humanCombinedHealth)}`);
console.log(`Result: ${humanCombinedTalent === 4 && humanCombinedHealth.fatigued === 10 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test 6: Race with no health/talent perks
console.log('Test 6: Bantam with perks that don\'t affect health or talents');
const bantamBonuses = calculateTalentPointBonus('Bantam', ['Camouflage', 'Nimble']);
const bantamHealthBonuses = calculateHealthTierBonuses('Bantam', ['Camouflage', 'Nimble'], 5);
console.log(`Expected talent bonus: 0`);
console.log(`Actual talent bonus: ${bantamBonuses}`);
console.log(`Expected health bonus: { fatigued: 0, battered: 0, injured: 0 }`);
console.log(`Actual health bonus: ${JSON.stringify(bantamHealthBonuses)}`);
console.log(`Result: ${bantamBonuses === 0 && bantamHealthBonuses.fatigued === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

console.log('=== Integration Test Complete ===');

// Summary
const tests = [
  humanSharpBonus === 4,
  humanNoSharpBonus === 0,
  dwarfHardyBonus.injured === 5,
  humanResilientBonus.fatigued === 3,
  humanCombinedTalent === 4 && humanCombinedHealth.fatigued === 10,
  bantamBonuses === 0 && bantamHealthBonuses.fatigued === 0,
];

const passed = tests.filter(t => t).length;
const total = tests.length;

console.log(`\nSummary: ${passed}/${total} tests passed`);

if (passed === total) {
  console.log('✓ All integration tests PASSED!');
  process.exit(0);
} else {
  console.log('✗ Some tests FAILED!');
  process.exit(1);
}
