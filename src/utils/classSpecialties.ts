/**
 * Class specialty data structures and utilities
 * Handles class-specific features: Acolyte Bless, Mage Arcane, Rogue Specialty, Warrior Combat Styles
 */

// ===== ACOLYTE - BLESS =====

/**
 * Calculates Acolyte Bless value based on level
 * Formula: Starts at 1, gains +1 every odd level (3, 5, 7, 9)
 */
export function calculateAcolyteBless(level: number): number {
  if (level < 1) return 1;

  // Level 1: 1, Level 2: 1, Level 3: 2, Level 4: 2, etc.
  // Formula: 1 + floor(level / 2)
  return 1 + Math.floor((level - 1) / 2);
}

// ===== MAGE - ARCANE APTITUDE =====

export const ARCANE_ARTS = ['Air', 'Cosmos', 'Earth', 'Fire', 'Water'] as const;
export type ArcaneArt = typeof ARCANE_ARTS[number];

export const ARCANE_ART_ATTRIBUTES: Record<ArcaneArt, string> = {
  Air: 'KNO',
  Cosmos: 'INS',
  Earth: 'CON',
  Fire: 'VAL',
  Water: 'DEX',
};

export interface ArcaneAptitudeAllocation {
  art: ArcaneArt;
  points: number;
}

/**
 * Calculates total Arcane Aptitude points available for Mage
 * Formula: 5 base + 2 per level
 */
export function calculateMageAptitudePool(level: number): number {
  return 5 + (2 * (level - 1));
}

/**
 * Calculates Arcane Art score including attribute modifier
 * Formula: Points + Attribute Modifier + Bonuses
 */
export function calculateArcaneArtScore(
  artPoints: number,
  attributeModifier: number,
  bonuses: number = 0
): number {
  return artPoints + attributeModifier + bonuses;
}

// ===== ROGUE - SPECIALTIES =====

export const ROGUE_SPECIALTY_TYPES = [
  'Ability',
  'Arcane',
  'Divine',
  'Talent',
  'Stamina',
] as const;
export type RogueSpecialtyType = typeof ROGUE_SPECIALTY_TYPES[number];

export const ROGUE_TALENT_BONUSES = [
  'Ace',
  'Certain',
  'Easy',
  'Golden',
  'Swift',
] as const;
export type RogueTalentBonus = typeof ROGUE_TALENT_BONUSES[number];

// Detailed descriptions for Rogue Talent Bonuses
export const ROGUE_TALENT_BONUS_DESCRIPTIONS: Record<RogueTalentBonus, string> = {
  Ace: "Choose a Talent for this Bonus to be applied. Reduce any Disadvantage you suffer with this Talent by one. For example, an Injured Rogue (at Disadvantage) with this Bonus applied to their Exertion Talent would make their Check without Disadvantage. That same Rogue making an Exertion Check at Double Disadvantage would only suffer Disadvantage on their Check.",
  Certain: "A Rogue with this Bonus applied to a Talent can use that Talent under favorable conditions to improve their likelihood of success. If they are not stressed or pressed for time, they can make their Talent Check at Advantage. If they have an hour or more to perform their Check, they can do so at Double Advantage.",
  Easy: "Checks from Talents with this Bonus applied are made at one Difficulty lower. For example, when asked to make an Average Difficulty Check from a Talent with this Bonus, make an Easy Difficulty Check instead. A Rogue with the Easy Bonus automatically succeeds on any Easy Difficulty Checks.",
  Golden: "When this Bonus is applied to a Talent, the Rogue may cancel any failure with this Talent as if it never happened. For example, if this Bonus is applied to the Athletics Talent, and the Rogue is attempting to jump a chasm, should they fail, they can choose to have not made the attempt, rather than failing in mid-air. Although this ability does allow one to change their action following their failure, it does not allow for \"second attempts\", thus you cannot use this Specialty to attempt the same Check again.",
  Swift: "Applying this Bonus to a Talent allows the Rogue to make a Talent Check for the designated Talent once per Encounter as a Free Action. For example, a Rogue with this Bonus applied to their Recuperation Talent could roll to recover Stamina as a Free Action in the same Round that they are attacking an enemy.",
};

// General description for Talent Specialty
export const ROGUE_TALENT_SPECIALTY_DESCRIPTION = "Each time a Rogue takes the Talent Specialty he has three (3) Talent Bonuses he can add to his character. Each bonus is applied to a single Talent, but any Talent can have more than one Bonus applied to it. Note: Any single Bonus can only be applied to any single Talent once. For example, if a Rogue were to apply one of his Specialties as a Talent Specialty, they could spend their three Talent Bonus picks by adding Ace to their Notice Talent and both Easy and Golden to their Stealth Talent. Unless otherwise stated, these Talent Specialties can only affect one Talent Check per Round.";

export interface RogueSpecialtySelection {
  type: RogueSpecialtyType;
  // For Arcane: which art (Air, Cosmos, etc.)
  arcaneArt?: ArcaneArt;
  // For Divine: which influence
  divineInfluence?: string;
  // For Talent: which bonuses applied to which talents
  talentBonuses?: Array<{ talent: string; bonus: RogueTalentBonus }>;
}

/**
 * Calculates number of Rogue Specialty selections available
 * Formula: 2 at level 1, +1 every even level
 */
export function calculateRogueSpecialtyCount(level: number): number {
  if (level < 1) return 2;

  // Level 1: 2, Level 2: 3, Level 3: 3, Level 4: 4, etc.
  // Formula: 2 + floor(level / 2)
  return 2 + Math.floor(level / 2);
}

// ===== WARRIOR - COMBAT STYLES =====

export const WARRIOR_COMBAT_STYLES = [
  'Collaborative',
  'Deliberate',
  'Ferocious',
  'Martial',
  'Strategic',
] as const;
export type WarriorCombatStyle = typeof WARRIOR_COMBAT_STYLES[number];

export const COMBAT_STYLE_TIERS = ['Apprentice', 'Journeyman', 'Master'] as const;
export type CombatStyleTier = typeof COMBAT_STYLE_TIERS[number];

export interface WarriorStyleSelection {
  style: WarriorCombatStyle;
  tier: CombatStyleTier;
}

// Combat Style descriptions
export const COMBAT_STYLE_DESCRIPTIONS: Record<WarriorCombatStyle, Record<CombatStyleTier, string>> = {
  Collaborative: {
    Apprentice: 'When an ally gets a critical result on their Hit Check against a target, your next Hit Check is automatically successful against that same target for the next Round.',
    Journeyman: 'When an ally slays a target near you, you regain your Level in Stamina.',
    Master: 'Gain a point of Stamina whenever you are successfully hit in combat.',
  },
  Deliberate: {
    Apprentice: 'When an ally is Battered, assist them in battle to add +1 to their Defense.',
    Journeyman: 'When Surprised, attacks made against you are not made at Advantage.',
    Master: 'Those fighting shoulder to shoulder with you gain Damage Reduction equal to half your Level.',
  },
  Ferocious: {
    Apprentice: 'Raise the Daring of an ally fighting alongside you by one (+1).',
    Journeyman: 'You cannot be Outnumbered, and treat being Overrun as being Outnumbered.',
    Master: 'Regain your Level, plus your Daring, in Fatigue with each enemy you kill.',
  },
  Martial: {
    Apprentice: 'Those fighting your same opponent reroll 1\'s on their Damage dice when attacking.',
    Journeyman: 'Those fighting shoulder to shoulder with you increase their total Damage done with each attack by your Level.',
    Master: 'Those fighting shoulder to shoulder with you do their maximum Damage when fighting your same opponent.',
  },
  Strategic: {
    Apprentice: 'You may spend your Stamina on anyone fighting alongside you.',
    Journeyman: 'When fighting from a superior position (e.g., a bottlenecked area, higher ground, on better terrain, etc.), Stamina costs are one less (to a minimum of 1).',
    Master: 'Those fighting your same target gain Advantage on their Hit Checks.',
  },
};

/**
 * Calculates number of Warrior Combat Style selections available
 * Formula: 1 at level 1, +1 every odd level
 */
export function calculateWarriorStyleCount(level: number): number {
  if (level < 1) return 1;

  // Level 1: 1, Level 2: 1, Level 3: 2, Level 4: 2, etc.
  // Formula: 1 + floor(level / 2)
  return 1 + Math.floor(level / 2);
}

/**
 * Validates if a style can be upgraded to the next tier
 */
export function canUpgradeStyle(currentTier: CombatStyleTier): boolean {
  return currentTier !== 'Master';
}

/**
 * Gets the next tier for a combat style
 */
export function getNextStyleTier(currentTier: CombatStyleTier): CombatStyleTier | null {
  if (currentTier === 'Apprentice') return 'Journeyman';
  if (currentTier === 'Journeyman') return 'Master';
  return null; // Master is max
}
