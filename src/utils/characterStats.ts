/**
 * CHARACTER STATS CALCULATOR
 *
 * Central module for calculating all character statistics.
 * This is the single source of truth for character stats, aggregating bonuses from:
 * - Race base values and selected perks
 * - Class base values and level progression
 * - Attributes (CON, DEX, STR, etc.)
 * - Abilities (future)
 * - Equipment (future)
 */

import type { BasicCharacterData, TalentAllocation, AttributeAllocation } from './pdfFiller';
import {
  ATHIA_TALENTS,
  getTalentAttributeModifier,
  calculateTalentScore,
  getClassHealthBonuses,
  type TalentName,
} from './classReference';
import {
  getRaceHealthBonuses,
  getSelectedPerkEffects,
} from './raceReference';
import { calculateDerivedStats, type DerivedStats } from './derivedStats';
import {
  aggregateHealthTierBonuses,
  aggregateTalentBonuses,
  getTalentsWithAdvantage,
  getBaseMovement as getMovementFromEffects,
  aggregateProficiencies,
  getAttributeMaxModifiers,
  getAbilityDescriptions,
  type Effect,
} from './effects';
import { getSelectedAbilityEffects } from './abilities';

// ===== INTERFACES =====

/**
 * Complete character health statistics
 */
export interface CharacterHealth {
  fatigued: number;
  battered: number;
  injured: number;
}

/**
 * Single talent score with breakdown
 */
export interface TalentScore {
  name: TalentName;
  points: number; // Points invested (0-6)
  attributeModifier: number; // From associated attribute
  bonuses: number; // From abilities, perks, etc.
  hasAdvantage: boolean; // If this talent has advantage
  total: number; // Final score
}

/**
 * Complete character statistics
 */
export interface CharacterStats {
  // Health tier maximums
  health: CharacterHealth;

  // All 18 talent scores
  talents: TalentScore[];

  // Derived stats (Aspects)
  derivedStats: DerivedStats;

  // Movement speed
  movement: number;

  // Proficiencies
  proficiencies: {
    weapons: string[];
    armor: string[];
    shields: string[];
  };

  // Attribute max modifiers (e.g., +4 instead of +3)
  attributeMaxModifiers: Record<string, number>;

  // Special abilities (narrative/descriptive)
  abilities: string[];
}

// ===== HELPER FUNCTIONS =====

/**
 * Converts TalentAllocation[] to Map for quick lookup
 */
function createTalentMap(talents: TalentAllocation[]): Map<string, number> {
  const map = new Map<string, number>();
  talents.forEach(talent => {
    map.set(talent.name, talent.points);
  });
  return map;
}

/**
 * Converts AttributeAllocation[] to Map for quick lookup
 */
function createAttributeMap(attributes: AttributeAllocation[]): Map<string, number> {
  const map = new Map<string, number>();
  attributes.forEach(attr => {
    map.set(attr.name, attr.points);
  });
  return map;
}

/**
 * Gathers all effects from all sources (race perks, abilities, etc.)
 */
function getAllEffects(data: BasicCharacterData): Effect[] {
  const effects: Effect[] = [];

  // Get racial perk effects
  if (data.race && data.racialPerks && data.racialPerks.length > 0) {
    const perkEffects = getSelectedPerkEffects(data.race, data.racialPerks);
    effects.push(...perkEffects);
  }

  // Get ability effects
  if (data.abilities && data.abilities.length > 0) {
    const abilityEffects = getSelectedAbilityEffects(data.abilities);
    effects.push(...abilityEffects);
  }

  // TODO: Add equipment effects when equipment is implemented
  // if (data.equipment && data.equipment.length > 0) {
  //   const equipmentEffects = getSelectedEquipmentEffects(data.equipment);
  //   effects.push(...equipmentEffects);
  // }

  return effects;
}

// ===== MAIN CALCULATION FUNCTION =====

/**
 * Calculates all character statistics from character data
 * This is the main entry point for getting complete character stats
 *
 * @param data - Basic character data
 * @returns Complete character statistics
 */
export function calculateAllCharacterStats(data: BasicCharacterData): CharacterStats {
  // Parse level
  const level = parseInt(data.level) || 1;

  // Create attribute and talent maps
  const attributeMap = createAttributeMap(data.attributes || []);
  const talentMap = createTalentMap(data.talents || []);

  // Get all effects from all sources
  const allEffects = getAllEffects(data);

  // Get talents with advantage
  const talentsWithAdvantage = new Set(getTalentsWithAdvantage(allEffects));

  // Get talent bonuses from effects
  const talentBonusMap = aggregateTalentBonuses(allEffects);

  // Calculate health maximums
  const health = calculateHealth(data, level, allEffects);

  // Calculate all talent scores
  const talents = calculateAllTalentScores(
    talentMap,
    attributeMap,
    talentBonusMap,
    talentsWithAdvantage
  );

  // Calculate derived stats
  const calculatedDerivedStats = calculateDerivedStats(
    data.class,
    level,
    data.race,
    data.racialPerks || [],
    attributeMap,
    data.equipment?.armor || 'none'
  ).stats;

  // Apply manual overrides if they exist
  const derivedStats = {
    ...calculatedDerivedStats,
    ...(data.manualOverrides || {}),
  };

  // Get movement speed
  const movement = getMovementFromEffects(allEffects);

  // Get proficiencies
  const proficiencies = aggregateProficiencies(allEffects);

  // Get attribute max modifiers
  const attributeMaxModifiers = getAttributeMaxModifiers(allEffects);

  // Get special abilities
  const abilities = getAbilityDescriptions(allEffects);

  return {
    health,
    talents,
    derivedStats,
    movement,
    proficiencies,
    attributeMaxModifiers,
    abilities,
  };
}

// ===== SPECIFIC CALCULATION FUNCTIONS =====

/**
 * Calculates health tier maximums
 * Formula: Race Base + CON Modifier + Class Bonus + Perk Bonus
 */
function calculateHealth(
  data: BasicCharacterData,
  level: number,
  effects: Effect[]
): CharacterHealth {
  // Get race bonuses
  const raceHealthBonuses = getRaceHealthBonuses(data.race);
  if (!raceHealthBonuses) {
    console.warn(`No health bonuses found for race: ${data.race}`);
    return { fatigued: 0, battered: 0, injured: 0 };
  }

  // Get class bonuses
  const classHealthBonuses = getClassHealthBonuses(data.class, level);
  if (!classHealthBonuses) {
    console.warn(`No health bonuses found for class: ${data.class} at level ${level}`);
    return { fatigued: 0, battered: 0, injured: 0 };
  }

  // Get CON modifier from attributes
  const attributeMap = createAttributeMap(data.attributes || []);
  const conModifier = attributeMap.get('CON') ?? 0;

  // Get perk bonuses
  const perkHealthBonuses = aggregateHealthTierBonuses(effects, level);

  // Calculate maximums
  return {
    fatigued:
      raceHealthBonuses.fatigued +
      conModifier +
      classHealthBonuses.fatigued +
      perkHealthBonuses.fatigued,
    battered:
      raceHealthBonuses.battered +
      conModifier +
      classHealthBonuses.battered +
      perkHealthBonuses.battered,
    injured:
      raceHealthBonuses.injured +
      conModifier +
      classHealthBonuses.injured +
      perkHealthBonuses.injured,
  };
}

/**
 * Calculates scores for all 18 talents
 * Formula: Points + Attribute Modifier + Bonuses
 */
function calculateAllTalentScores(
  talentMap: Map<string, number>,
  attributeMap: Map<string, number>,
  bonusMap: Map<string, number>,
  talentsWithAdvantage: Set<string>
): TalentScore[] {
  return ATHIA_TALENTS.map(talentName => {
    // Get points invested (default 0 if not allocated)
    const points = talentMap.get(talentName) ?? 0;

    // Get attribute modifier
    const attributeModifier = getTalentAttributeModifier(talentName, attributeMap);

    // Get bonuses from effects (abilities, perks, etc.)
    const bonuses = bonusMap.get(talentName) ?? 0;

    // Check if talent has advantage
    const hasAdvantage = talentsWithAdvantage.has(talentName);

    // Calculate total score
    const total = calculateTalentScore(points, attributeModifier, bonuses, 0);

    return {
      name: talentName,
      points,
      attributeModifier,
      bonuses,
      hasAdvantage,
      total,
    };
  });
}

/**
 * Gets a specific talent score by name
 */
export function getTalentScore(
  stats: CharacterStats,
  talentName: TalentName
): TalentScore | undefined {
  return stats.talents.find(t => t.name === talentName);
}

/**
 * Gets all talents at a specific expertise level
 */
export function getTalentsByExpertise(
  stats: CharacterStats,
  minPoints: number,
  maxPoints: number
): TalentScore[] {
  return stats.talents.filter(t => t.points >= minPoints && t.points <= maxPoints);
}
