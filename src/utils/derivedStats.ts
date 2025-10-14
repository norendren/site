/**
 * ATHIA DERIVED STATS CALCULATOR
 *
 * Calculates derived statistics (Aspects) from character attributes, class, and racial perks.
 *
 * Formulas (from Athia RPG Core Rulebook):
 * - Defense = Armor + DEX (limited by armor) + bonuses
 * - Daring = VAL + bonuses
 * - Stamina = Class base + CON + bonuses
 * - Mana = Class base + STR + bonuses (Arcane casters only)
 * - Favor = Class base + INS + bonuses (Divine casters only)
 */

import {
  ACOLYTE_PROGRESSION,
  MAGE_PROGRESSION,
  ROGUE_PROGRESSION,
  WARRIOR_PROGRESSION,
} from './classReference';
import { calculateDerivedStatBonuses } from './raceReference';

export interface DerivedStats {
  defense: number;
  daring: number;
  stamina: number;
  mana: number;
  favor: number;
}

export interface DerivedStatsBreakdown {
  defense: {
    base: number;
    dex: number;
    perkBonus: number;
    total: number;
  };
  daring: {
    val: number;
    perkBonus: number;
    total: number;
  };
  stamina: {
    classBase: number;
    con: number;
    perkBonus: number;
    total: number;
  };
  mana: {
    classBase: number;
    str: number;
    perkBonus: number;
    total: number;
  };
  favor: {
    classBase: number;
    ins: number;
    perkBonus: number;
    total: number;
  };
}

/**
 * Gets class-specific base values for derived stats from progression tables
 */
function getClassDerivedStatBases(className: string, level: number): {
  stamina: number;
  mana: number;
  favor: number;
} {
  if (level < 1 || level > 10) {
    return { stamina: 0, mana: 0, favor: 0 };
  }

  const progressions = {
    'Acolyte': ACOLYTE_PROGRESSION,
    'Mage': MAGE_PROGRESSION,
    'Rogue': ROGUE_PROGRESSION,
    'Warrior': WARRIOR_PROGRESSION,
  };

  const progression = progressions[className as keyof typeof progressions];
  if (!progression) {
    return { stamina: 0, mana: 0, favor: 0 };
  }

  const levelData = progression[level - 1];
  if (!levelData) {
    return { stamina: 0, mana: 0, favor: 0 };
  }

  return {
    stamina: (levelData.classSpecific.stamina as number) || 0,
    mana: (levelData.classSpecific.mana as number) || 0,
    favor: (levelData.classSpecific.favor as number) || 0,
  };
}

/**
 * Calculates all derived stats with full breakdown
 *
 * @param className - Character class (Acolyte, Mage, Rogue, Warrior)
 * @param level - Character level (1-10)
 * @param raceName - Character race (for perk bonuses)
 * @param selectedPerks - Array of selected racial perk names
 * @param attributes - Map of attribute names to their values (e.g., Map([['CON', 2], ['DEX', 1]]))
 * @returns Object with both simple totals and detailed breakdowns
 */
export function calculateDerivedStats(
  className: string,
  level: number,
  raceName: string,
  selectedPerks: string[],
  attributes: Map<string, number>
): { stats: DerivedStats; breakdown: DerivedStatsBreakdown } {
  // Get attribute modifiers
  const dex = attributes.get('DEX') || 0;
  const con = attributes.get('CON') || 0;
  const str = attributes.get('STR') || 0;
  const ins = attributes.get('INS') || 0;
  const val = attributes.get('VAL') || 0;

  // Get class base values
  const classBases = getClassDerivedStatBases(className, level);

  // Get racial perk bonuses
  const perkBonuses = selectedPerks && selectedPerks.length > 0
    ? calculateDerivedStatBonuses(raceName, selectedPerks, level)
    : { defense: 0, daring: 0, stamina: 0, mana: 0, favor: 0 };

  // Calculate Defense (for now, without armor: just DEX + bonuses)
  const defense = {
    base: 0, // Armor value (not implemented yet)
    dex: dex,
    perkBonus: perkBonuses.defense,
    total: dex + perkBonuses.defense,
  };

  // Calculate Daring (VAL + bonuses)
  const daring = {
    val: val,
    perkBonus: perkBonuses.daring,
    total: val + perkBonuses.daring,
  };

  // Calculate Stamina (Class base + CON + bonuses)
  const stamina = {
    classBase: classBases.stamina,
    con: con,
    perkBonus: perkBonuses.stamina,
    total: classBases.stamina + con + perkBonuses.stamina,
  };

  // Calculate Mana (Class base + STR + bonuses) - Mages only
  const mana = {
    classBase: classBases.mana,
    str: str,
    perkBonus: perkBonuses.mana,
    total: classBases.mana + str + perkBonuses.mana,
  };

  // Calculate Favor (Class base + INS + bonuses) - Acolytes only
  const favor = {
    classBase: classBases.favor,
    ins: ins,
    perkBonus: perkBonuses.favor,
    total: classBases.favor + ins + perkBonuses.favor,
  };

  return {
    stats: {
      defense: defense.total,
      daring: daring.total,
      stamina: stamina.total,
      mana: mana.total,
      favor: favor.total,
    },
    breakdown: {
      defense,
      daring,
      stamina,
      mana,
      favor,
    },
  };
}

/**
 * Checks if a class uses Mana (Arcane magic)
 */
export function usesMana(className: string): boolean {
  return className === 'Mage';
}

/**
 * Checks if a class uses Favor (Divine magic)
 */
export function usesFavor(className: string): boolean {
  return className === 'Acolyte';
}

/**
 * Gets the list of derived stats that are relevant for a given class
 * (e.g., Mages don't need Favor, Acolytes don't need Mana)
 */
export function getRelevantDerivedStats(className: string): string[] {
  const base = ['defense', 'daring', 'stamina'];

  if (usesMana(className)) {
    return [...base, 'mana'];
  }

  if (usesFavor(className)) {
    return [...base, 'favor'];
  }

  return base;
}
