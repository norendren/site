/**
 * ATHIA ABILITY SYSTEM
 *
 * Defines character abilities from class and general ability lists.
 * Abilities grant effects similar to racial perks but are gained through leveling.
 *
 * Categories:
 * - General Abilities: Available to all classes
 * - Acolyte Abilities: Divine magic and support
 * - Mage Abilities: Arcane magic and knowledge
 * - Rogue Abilities: Versatility and specialty
 * - Warrior Abilities: Combat prowess and tactics
 */

import type { Effect } from './effects';

export interface Ability {
  name: string;
  category: 'General' | 'Acolyte' | 'Mage' | 'Rogue' | 'Warrior';
  description: string; // Full description of the ability
  effects: Effect[]; // Mechanical effects
}

// ===== GENERAL ABILITIES =====
// Available to all classes

export const GENERAL_ABILITIES: Ability[] = [
  // TODO: Populate with actual general abilities from rulebook
  // Example template:
  // {
  //   name: 'Tough',
  //   category: 'General',
  //   description: 'You are especially resilient. Gain +1 to all health tiers per level.',
  //   effects: [
  //     { type: 'healthTier', tier: 'fatigued', value: 1, perLevel: true },
  //     { type: 'healthTier', tier: 'battered', value: 1, perLevel: true },
  //     { type: 'healthTier', tier: 'injured', value: 1, perLevel: true },
  //   ],
  // },
];

// ===== ACOLYTE ABILITIES =====
// Divine magic and support abilities

export const ACOLYTE_ABILITIES: Ability[] = [
  {
    name: 'Additional Bless',
    category: 'Acolyte',
    description: 'You can use Bless one additional time before requiring rest.',
    effects: [
      { type: 'classFeatureUses', feature: 'bless', value: 1 },
    ],
  },
  // TODO: Add more Acolyte abilities from rulebook
];

// ===== MAGE ABILITIES =====
// Arcane magic and knowledge abilities

export const MAGE_ABILITIES: Ability[] = [
  {
    name: 'Expanded Mana Pool',
    category: 'Mage',
    description: 'Your mana reserves are deeper than most. Gain +1 Mana.',
    effects: [
      { type: 'derivedStat', stat: 'mana', value: 1 },
    ],
  },
  // TODO: Add more Mage abilities from rulebook
];

// ===== ROGUE ABILITIES =====
// Versatility and specialty abilities

export const ROGUE_ABILITIES: Ability[] = [
  // TODO: Add Rogue abilities from rulebook
  // Rogues gain abilities through their Specialty system, not a separate ability list
];

// ===== WARRIOR ABILITIES =====
// Combat prowess and tactics abilities

export const WARRIOR_ABILITIES: Ability[] = [
  {
    name: 'Enduring Warrior',
    category: 'Warrior',
    description: 'Your stamina in battle is legendary. Gain +1 Stamina per level.',
    effects: [
      { type: 'derivedStat', stat: 'stamina', value: 1, perLevel: true },
    ],
  },
  // TODO: Add more Warrior abilities from rulebook
];

// ===== ABILITY DATABASE =====

export const ALL_ABILITIES = [
  ...GENERAL_ABILITIES,
  ...ACOLYTE_ABILITIES,
  ...MAGE_ABILITIES,
  ...ROGUE_ABILITIES,
  ...WARRIOR_ABILITIES,
];

// ===== UTILITY FUNCTIONS =====

/**
 * Gets all abilities for a specific class (includes general + class-specific)
 */
export function getAbilitiesForClass(className: string): Ability[] {
  const general = GENERAL_ABILITIES;

  switch (className) {
    case 'Acolyte':
      return [...general, ...ACOLYTE_ABILITIES];
    case 'Mage':
      return [...general, ...MAGE_ABILITIES];
    case 'Rogue':
      return [...general, ...ROGUE_ABILITIES];
    case 'Warrior':
      return [...general, ...WARRIOR_ABILITIES];
    default:
      return general;
  }
}

/**
 * Gets an ability by name from the full database
 */
export function getAbilityByName(abilityName: string): Ability | undefined {
  return ALL_ABILITIES.find(ability => ability.name === abilityName);
}

/**
 * Gets all effects from a list of selected ability names
 */
export function getSelectedAbilityEffects(selectedAbilityNames: string[]): Effect[] {
  const effects: Effect[] = [];

  for (const abilityName of selectedAbilityNames) {
    const ability = getAbilityByName(abilityName);
    if (ability) {
      effects.push(...ability.effects);
    }
  }

  return effects;
}

/**
 * Validates if a character can select a specific ability
 * (ensures class matches, no duplicates, meets requirements, etc.)
 */
export function canSelectAbility(
  abilityName: string,
  className: string,
  currentAbilities: string[]
): { valid: boolean; reason?: string } {
  const ability = getAbilityByName(abilityName);

  if (!ability) {
    return { valid: false, reason: 'Ability not found' };
  }

  // Check if already selected
  if (currentAbilities.includes(abilityName)) {
    return { valid: false, reason: 'Ability already selected' };
  }

  // Check class restriction
  if (ability.category !== 'General' && ability.category !== className) {
    return { valid: false, reason: `Ability is only available to ${ability.category} class` };
  }

  // TODO: Add more validation logic (prerequisites, level requirements, etc.)

  return { valid: true };
}
