/**
 * UNIFIED EFFECT SYSTEM
 *
 * This module defines a type-safe effect system for character bonuses.
 * Effects can come from multiple sources: racial perks, class abilities, equipment, etc.
 * All effects use the same type structure for consistent calculation.
 */

// ===== EFFECT TYPE DEFINITIONS =====

/**
 * Effect that modifies a derived stat (Daring, Stamina, Favor, Mana, etc.)
 */
export interface DerivedStatEffect {
  type: 'derivedStat';
  stat: 'daring' | 'stamina' | 'favor' | 'mana' | 'defense';
  value: number; // flat bonus
  perLevel?: boolean; // if true, multiply by character level
}

/**
 * Effect that grants additional talent points at creation
 */
export interface TalentPointsEffect {
  type: 'talentPoints';
  value: number;
}

/**
 * Effect that modifies health tier maximums
 */
export interface HealthTierEffect {
  type: 'healthTier';
  tier: 'fatigued' | 'battered' | 'injured';
  value: number; // bonus per level
  perLevel: true; // always per level for health tiers
}

/**
 * Effect that raises the maximum modifier for an attribute
 */
export interface AttributeMaxModifierEffect {
  type: 'attributeMaxModifier';
  attribute: 'STR' | 'DEX' | 'CON' | 'INS' | 'KNO' | 'VAL';
  maxValue: number; // typically 4 (standard is 3)
}

/**
 * Effect that changes base movement speed
 */
export interface MovementEffect {
  type: 'movement';
  baseMovement: number; // in feet, typically 30 (standard is 20)
}

/**
 * Effect that grants advantage on a specific talent check
 */
export interface TalentAdvantageEffect {
  type: 'talentAdvantage';
  talent: string; // talent name (e.g., 'Stealth', 'Athletics')
}

/**
 * Effect that modifies a specific talent score
 */
export interface TalentBonusEffect {
  type: 'talentBonus';
  talent: string; // talent name (e.g., 'Athletics', 'Notice')
  value: number; // flat bonus to talent score
}

/**
 * Effect that grants damage reduction
 */
export interface DamageReductionEffect {
  type: 'damageReduction';
  source: 'arcaneSpells' | 'physicalAttacks' | 'all';
  value: 'characterLevel' | 'dexModifier' | number; // formula or flat value
}

/**
 * Effect that grants weapon/armor proficiency
 */
export interface ProficiencyEffect {
  type: 'proficiency';
  category: 'weapon' | 'armor' | 'shield';
  items: string[]; // e.g., ['All Swords'] or ['Light', 'Medium', 'Heavy']
}

/**
 * Effect that grants a special ability (non-numeric, descriptive)
 */
export interface AbilityEffect {
  type: 'ability';
  description: string;
}

/**
 * Effect that grants advantage on hit checks or damage
 */
export interface CombatAdvantageEffect {
  type: 'combatAdvantage';
  targetType: string; // e.g., 'Savage family creatures', 'engaged targets'
  effect: 'hitCheck' | 'damage' | 'both';
  bonus?: number; // optional flat bonus (e.g., +1 to hit checks)
}

/**
 * Effect that modifies number of uses for a class feature
 */
export interface ClassFeatureUsesEffect {
  type: 'classFeatureUses';
  feature: 'bless' | 'mana' | 'favor' | 'stamina'; // class-specific features
  value: number; // additional uses
}

/**
 * Union type for all possible effects
 */
export type Effect =
  | DerivedStatEffect
  | TalentPointsEffect
  | HealthTierEffect
  | AttributeMaxModifierEffect
  | MovementEffect
  | TalentAdvantageEffect
  | TalentBonusEffect
  | DamageReductionEffect
  | ProficiencyEffect
  | AbilityEffect
  | CombatAdvantageEffect
  | ClassFeatureUsesEffect;

// ===== EFFECT SOURCE DEFINITIONS =====

/**
 * Represents a feature that grants effects (perk, ability, equipment, etc.)
 */
export interface EffectSource {
  name: string;
  description: string;
  effects: Effect[];
}

// ===== EFFECT AGGREGATION UTILITIES =====

/**
 * Filters effects by type
 */
export function getEffectsByType<T extends Effect['type']>(
  effects: Effect[],
  type: T
): Extract<Effect, { type: T }>[] {
  return effects.filter(e => e.type === type) as Extract<Effect, { type: T }>[];
}

/**
 * Calculates derived stat bonuses from a list of effects
 */
export function aggregateDerivedStatBonuses(
  effects: Effect[],
  characterLevel: number
): {
  daring: number;
  stamina: number;
  favor: number;
  mana: number;
  defense: number;
} {
  const bonuses = {
    daring: 0,
    stamina: 0,
    favor: 0,
    mana: 0,
    defense: 0,
  };

  const derivedStatEffects = getEffectsByType(effects, 'derivedStat');

  for (const effect of derivedStatEffects) {
    const value = effect.perLevel ? effect.value * characterLevel : effect.value;
    bonuses[effect.stat] += value;
  }

  return bonuses;
}

/**
 * Calculates health tier bonuses from a list of effects
 */
export function aggregateHealthTierBonuses(
  effects: Effect[],
  characterLevel: number
): {
  fatigued: number;
  battered: number;
  injured: number;
} {
  const bonuses = {
    fatigued: 0,
    battered: 0,
    injured: 0,
  };

  const healthEffects = getEffectsByType(effects, 'healthTier');

  for (const effect of healthEffects) {
    bonuses[effect.tier] += effect.value * characterLevel;
  }

  return bonuses;
}

/**
 * Calculates total talent point bonus from effects
 */
export function aggregateTalentPointBonus(effects: Effect[]): number {
  const talentPointEffects = getEffectsByType(effects, 'talentPoints');
  return talentPointEffects.reduce((sum, effect) => sum + effect.value, 0);
}

/**
 * Gets all talents that have advantage from effects
 */
export function getTalentsWithAdvantage(effects: Effect[]): string[] {
  const advantageEffects = getEffectsByType(effects, 'talentAdvantage');
  return advantageEffects.map(e => e.talent);
}

/**
 * Gets talent bonuses from effects
 */
export function aggregateTalentBonuses(effects: Effect[]): Map<string, number> {
  const bonuses = new Map<string, number>();
  const talentBonusEffects = getEffectsByType(effects, 'talentBonus');

  for (const effect of talentBonusEffects) {
    const currentBonus = bonuses.get(effect.talent) || 0;
    bonuses.set(effect.talent, currentBonus + effect.value);
  }

  return bonuses;
}

/**
 * Gets base movement from effects (returns default 20 if no movement effect)
 */
export function getBaseMovement(effects: Effect[]): number {
  const movementEffects = getEffectsByType(effects, 'movement');

  if (movementEffects.length > 0) {
    // Take the highest movement speed if multiple effects
    return Math.max(...movementEffects.map(e => e.baseMovement));
  }

  return 20; // Default base movement
}

/**
 * Gets all proficiencies from effects
 */
export function aggregateProficiencies(effects: Effect[]): {
  weapons: string[];
  armor: string[];
  shields: string[];
} {
  const proficiencies = {
    weapons: [] as string[],
    armor: [] as string[],
    shields: [] as string[],
  };

  const proficiencyEffects = getEffectsByType(effects, 'proficiency');

  for (const effect of proficiencyEffects) {
    if (effect.category === 'weapon') {
      proficiencies.weapons.push(...effect.items);
    } else if (effect.category === 'armor') {
      proficiencies.armor.push(...effect.items);
    } else if (effect.category === 'shield') {
      proficiencies.shields.push(...effect.items);
    }
  }

  return proficiencies;
}

/**
 * Gets attribute max modifier overrides from effects
 */
export function getAttributeMaxModifiers(effects: Effect[]): Record<string, number> {
  const maxModifiers: Record<string, number> = {};
  const attributeMaxEffects = getEffectsByType(effects, 'attributeMaxModifier');

  for (const effect of attributeMaxEffects) {
    maxModifiers[effect.attribute] = effect.maxValue;
  }

  return maxModifiers;
}

/**
 * Gets descriptive abilities (non-numeric effects) from effects
 */
export function getAbilityDescriptions(effects: Effect[]): string[] {
  const abilityEffects = getEffectsByType(effects, 'ability');
  return abilityEffects.map(e => e.description);
}

/**
 * Gets class feature use bonuses from effects
 */
export function aggregateClassFeatureUses(effects: Effect[]): Map<string, number> {
  const bonuses = new Map<string, number>();
  const featureEffects = getEffectsByType(effects, 'classFeatureUses');

  for (const effect of featureEffects) {
    const currentBonus = bonuses.get(effect.feature) || 0;
    bonuses.set(effect.feature, currentBonus + effect.value);
  }

  return bonuses;
}
