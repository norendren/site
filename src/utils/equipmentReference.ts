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
