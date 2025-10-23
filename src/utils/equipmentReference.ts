/**
 * Athia RPG Equipment Reference Data
 * Source: Core Rulebook Armor Table
 */

export interface ArmorType {
  type: 'none' | 'light' | 'medium' | 'heavy';
  cost: number; // In silver (S)
  defense: number;
  maxDex: number | null; // Maximum DEX modifier that can apply to defense (null = unlimited)
  staminaModifier: number; // Applied to calculated stamina (negative values reduce stamina)
  weight: number; // In pounds (lb)
}

export const ARMOR_TYPES: Record<string, ArmorType> = {
  none: {
    type: 'none',
    cost: 0,
    defense: 9,
    maxDex: null, // No limit
    staminaModifier: 0,
    weight: 0,
  },
  light: {
    type: 'light',
    cost: 30,
    defense: 12,
    maxDex: 3,
    staminaModifier: -1,
    weight: 15,
  },
  medium: {
    type: 'medium',
    cost: 50,
    defense: 15,
    maxDex: 2,
    staminaModifier: -2,
    weight: 30,
  },
  heavy: {
    type: 'heavy',
    cost: 200,
    defense: 18,
    maxDex: 1,
    staminaModifier: -3,
    weight: 50,
  },
};

export interface ShieldData {
  cost: number;
  damageReductionFormula: string; // "Character Level"
  weight: number;
}

export const SHIELD: ShieldData = {
  cost: 10,
  damageReductionFormula: 'Character Level',
  weight: 15,
};

/**
 * Get armor data by type
 */
export function getArmorData(armorType: 'none' | 'light' | 'medium' | 'heavy'): ArmorType {
  return ARMOR_TYPES[armorType];
}

/**
 * Calculate damage reduction from shield
 * @param characterLevel Current character level
 * @returns DR value (equals level)
 */
export function calculateShieldDR(characterLevel: number): number {
  return characterLevel;
}

/**
 * Calculate effective DEX modifier for defense based on armor restrictions
 * @param dexModifier Character's DEX modifier
 * @param armorType Type of armor worn
 * @returns Capped DEX modifier that applies to defense
 */
export function getEffectiveDexForDefense(
  dexModifier: number,
  armorType: 'none' | 'light' | 'medium' | 'heavy'
): number {
  const armor = getArmorData(armorType);

  // If no max dex limit, return full DEX modifier
  if (armor.maxDex === null) {
    return dexModifier;
  }

  // Return whichever is lower: actual DEX or armor's max allowed
  return Math.min(dexModifier, armor.maxDex);
}

// ===========================================
// WEAPON & DAMAGE SYSTEM
// ===========================================

/**
 * Base Strength Damage Table
 * Every character can cause damage unarmed based on their Strength modifier
 * Source: Core Rulebook Combat Section
 */
export const BASE_STRENGTH_DAMAGE_TABLE: Record<number, string> = {
  '-3': '1',
  '-2': '1d2',
  '-1': '1d3',
  '0': '1d4',
  '1': '1d6',
  '2': '1d8',
  '3': '1d10',
  '4': '1d12',
};

/**
 * Attack Type Damage Calculation Rules
 * Source: Core Rulebook Combat Section - Damage Calculations Table
 */
export interface DamageCalculationRule {
  attackType: 'melee' | 'ranged-bow' | 'ranged-crossbow' | 'hurled' | 'magic';
  formula: string;
  includesBaseStrength: boolean;
  description: string;
}

export const DAMAGE_CALCULATION_RULES: DamageCalculationRule[] = [
  {
    attackType: 'melee',
    formula: 'Base Strength Damage + Weapon + Class Bonuses + Abilities',
    includesBaseStrength: true,
    description: 'Melee attacks include your base strength damage',
  },
  {
    attackType: 'ranged-bow',
    formula: 'Base Strength Damage + Weapon + Class Bonuses + Abilities',
    includesBaseStrength: true,
    description: 'Bow attacks include your base strength damage',
  },
  {
    attackType: 'ranged-crossbow',
    formula: 'Weapon + Class Bonuses + Abilities',
    includesBaseStrength: false,
    description: 'Crossbow attacks do NOT include base strength damage',
  },
  {
    attackType: 'hurled',
    formula: 'Base Strength Damage + Weapon + Class Bonuses + Abilities',
    includesBaseStrength: true,
    description: 'Thrown/hurled attacks include your base strength damage',
  },
  {
    attackType: 'magic',
    formula: 'Determined by Spell or Divine Intervention Effect',
    includesBaseStrength: false,
    description: 'Magic attacks are determined by the spell itself',
  },
];

/**
 * Get base strength damage die based on STR modifier
 * @param strModifier Character's STR attribute modifier (-3 to +4)
 * @returns Damage die notation (e.g., "1d6", "1d10")
 */
export function getBaseStrengthDamage(strModifier: number): string {
  // Clamp to valid range
  const clampedModifier = Math.max(-3, Math.min(4, strModifier));
  return BASE_STRENGTH_DAMAGE_TABLE[clampedModifier];
}

/**
 * Get damage calculation rule for a specific attack type
 * @param attackType Type of attack (melee, ranged-bow, etc.)
 * @returns Damage calculation rule
 */
export function getDamageCalculationRule(
  attackType: 'melee' | 'ranged-bow' | 'ranged-crossbow' | 'hurled' | 'magic'
): DamageCalculationRule {
  const rule = DAMAGE_CALCULATION_RULES.find((r) => r.attackType === attackType);
  if (!rule) {
    throw new Error(`Unknown attack type: ${attackType}`);
  }
  return rule;
}

/**
 * Get class-specific hit bonus (Rogue only)
 * Rogues get +1 hit bonus at level 1, increasing by +1 per level
 * Source: Class Reference - Rogue progression table
 *
 * @param className Character's class
 * @param level Character level
 * @returns Hit bonus (0 for non-Rogues)
 */
export function getClassHitBonus(className: string, level: number): number {
  if (className === 'Rogue') {
    // Rogue: base 1, +1 per level
    return 1 + (level - 1);
  }
  return 0;
}

/**
 * Get class-specific damage bonus (Warrior only)
 * Warriors get +2 damage bonus at level 1, increasing by +2 per level
 * Source: Class Reference - Warrior progression table
 *
 * @param className Character's class
 * @param level Character level
 * @returns Damage bonus (0 for non-Warriors)
 */
export function getClassDamageBonus(className: string, level: number): number {
  if (className === 'Warrior') {
    // Warrior: base 2, +2 per level
    return 2 + (2 * (level - 1));
  }
  return 0;
}
