/**
 * Example usage of racial perk mechanical effect calculations
 * This file demonstrates how to use the perk calculation utilities
 */

import {
  calculateDerivedStatBonuses,
  calculateHealthTierBonuses,
  calculateTalentPointBonus,
  getTalentsWithAdvantage,
  getBaseMovement,
  getProficiencies,
  getAttributeMaxModifiers,
  getAbilityDescriptions,
} from './raceReference';

// Example 1: Human with "Courageous" and "Sharp" perks
console.log('=== Example 1: Human Level 3 with Courageous + Sharp ===');
const humanPerks = ['Courageous', 'Sharp'];
const humanLevel = 3;

const derivedStats = calculateDerivedStatBonuses('Human', humanPerks, humanLevel);
console.log('Derived Stat Bonuses:', derivedStats);
// Expected: { daring: 1, stamina: 0, favor: 0, mana: 0, defense: 0 }

const talentBonus = calculateTalentPointBonus('Human', humanPerks);
console.log('Talent Point Bonus:', talentBonus);
// Expected: 4

// Example 2: Dwarf with "Hardy" and "Sound" perks
console.log('\n=== Example 2: Dwarf Level 5 with Hardy + Sound ===');
const dwarfPerks = ['Hardy', 'Sound'];
const dwarfLevel = 5;

const healthBonuses = calculateHealthTierBonuses('Dwarf', dwarfPerks, dwarfLevel);
console.log('Health Tier Bonuses:', healthBonuses);
// Expected: { fatigued: 0, battered: 0, injured: 5 } (Hardy gives +1 per level)

const attrMaxModifiers = getAttributeMaxModifiers('Dwarf', dwarfPerks);
console.log('Attribute Max Modifiers:', attrMaxModifiers);
// Expected: { CON: 4 }

// Example 3: Bantam with "Camouflage" and "Nimble" perks
console.log('\n=== Example 3: Bantam with Camouflage + Nimble ===');
const bantamPerks = ['Camouflage', 'Nimble'];

const talentsWithAdv = getTalentsWithAdvantage('Bantam', bantamPerks);
console.log('Talents with Advantage:', talentsWithAdv);
// Expected: ['Stealth']

const bantamAttrMax = getAttributeMaxModifiers('Bantam', bantamPerks);
console.log('Attribute Max Modifiers:', bantamAttrMax);
// Expected: { DEX: 4 }

// Example 4: Ferox with "Fast" and "Traditional" perks
console.log('\n=== Example 4: Ferox with Fast + Traditional ===');
const feroxPerks = ['Fast', 'Traditional'];

const movement = getBaseMovement('Ferox', feroxPerks);
console.log('Base Movement:', movement);
// Expected: 30

const proficiencies = getProficiencies('Ferox', feroxPerks);
console.log('Proficiencies:', proficiencies);
// Expected: { weapons: ['Throwing Glaive'], armor: [], shields: [] }

// Example 5: Elf with "Arcane Potency" and "Immune to Disease"
console.log('\n=== Example 5: Elf Level 1 with Arcane Potency + Immune to Disease ===');
const elfPerks = ['Arcane Potency', 'Immune to Disease'];
const elfLevel = 1;

const elfStats = calculateDerivedStatBonuses('Elf', elfPerks, elfLevel);
console.log('Derived Stat Bonuses:', elfStats);
// Expected: { daring: 0, stamina: 0, favor: 0, mana: 1, defense: 0 }

const abilities = getAbilityDescriptions('Elf', elfPerks);
console.log('Special Abilities:', abilities);
// Expected: ['Immune to natural diseases; cannot pass diseases to others']

// Example 6: Human with "Forceful" (per-level bonus)
console.log('\n=== Example 6: Human Level 10 with Forceful ===');
const humanForcefulPerks = ['Forceful'];
const highLevel = 10;

const forcefulStats = calculateDerivedStatBonuses('Human', humanForcefulPerks, highLevel);
console.log('Derived Stat Bonuses:', forcefulStats);
// Expected: { daring: 0, stamina: 10, favor: 0, mana: 0, defense: 0 } (1 per level * 10)

console.log('\n=== All examples completed! ===');
