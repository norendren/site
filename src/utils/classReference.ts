/**
 * ATHIA CLASS REFERENCE
 * Condensed guide for character creation
 */

export interface ClassProgression {
  level: number;
  abilities: number;
  attributeBonus: number;
  health: {
    fatigued: number;
    battered: number;
    injured: number;
  };
  talentPoints: number;
  classSpecific: Record<string, number | string>;
}

/**
 * ACOLYTE - Divine Magic User
 *
 * Key Features:
 * - Divine Magic through Favor
 * - Bless ability (grants Advantage)
 * - Holy Aura (10' radius per level)
 * - Choose 2 Divine Influences at level 1
 *
 * Armor: Light, Medium, Shields
 * Weapons: All Common
 */
export const ACOLYTE_PROGRESSION: ClassProgression[] = [
  { level: 1, abilities: 2, attributeBonus: 0, health: { fatigued: 5, battered: 4, injured: 2 }, talentPoints: 10, classSpecific: { favor: 8, stamina: 3, bless: 1 } },
  { level: 2, abilities: 3, attributeBonus: 1, health: { fatigued: 10, battered: 8, injured: 3 }, talentPoints: 13, classSpecific: { favor: 10, stamina: 4, bless: 1 } },
  { level: 3, abilities: 4, attributeBonus: 1, health: { fatigued: 15, battered: 12, injured: 4 }, talentPoints: 16, classSpecific: { favor: 12, stamina: 5, bless: 2 } },
  { level: 4, abilities: 5, attributeBonus: 2, health: { fatigued: 20, battered: 16, injured: 5 }, talentPoints: 19, classSpecific: { favor: 14, stamina: 6, bless: 2 } },
  { level: 5, abilities: 6, attributeBonus: 2, health: { fatigued: 25, battered: 20, injured: 6 }, talentPoints: 22, classSpecific: { favor: 16, stamina: 7, bless: 3 } },
  { level: 6, abilities: 7, attributeBonus: 3, health: { fatigued: 30, battered: 24, injured: 7 }, talentPoints: 25, classSpecific: { favor: 18, stamina: 8, bless: 3 } },
  { level: 7, abilities: 8, attributeBonus: 3, health: { fatigued: 35, battered: 28, injured: 8 }, talentPoints: 28, classSpecific: { favor: 20, stamina: 9, bless: 4 } },
  { level: 8, abilities: 9, attributeBonus: 4, health: { fatigued: 40, battered: 32, injured: 9 }, talentPoints: 31, classSpecific: { favor: 22, stamina: 10, bless: 4 } },
  { level: 9, abilities: 10, attributeBonus: 4, health: { fatigued: 45, battered: 36, injured: 10 }, talentPoints: 34, classSpecific: { favor: 24, stamina: 11, bless: 5 } },
  { level: 10, abilities: 11, attributeBonus: 5, health: { fatigued: 50, battered: 40, injured: 11 }, talentPoints: 37, classSpecific: { favor: 26, stamina: 12, bless: 5 } },
];

/**
 * MAGE - Arcane Magic User
 *
 * Key Features:
 * - Arcane Magic through Mana & Aptitude
 * - 5 Arcane Arts: Air, Cosmos, Earth, Fire, Water
 * - Allocate Aptitude points to Arts
 * - Mana controls number of active Effects
 *
 * Armor: None
 * Weapons: Choose 1 Common weapon
 */
export const MAGE_PROGRESSION: ClassProgression[] = [
  { level: 1, abilities: 2, attributeBonus: 0, health: { fatigued: 3, battered: 6, injured: 2 }, talentPoints: 10, classSpecific: { mana: 3, aptitude: 5 } },
  { level: 2, abilities: 3, attributeBonus: 1, health: { fatigued: 6, battered: 12, injured: 3 }, talentPoints: 13, classSpecific: { mana: 4, aptitude: 7 } },
  { level: 3, abilities: 4, attributeBonus: 1, health: { fatigued: 9, battered: 18, injured: 4 }, talentPoints: 16, classSpecific: { mana: 4, aptitude: 9 } },
  { level: 4, abilities: 5, attributeBonus: 2, health: { fatigued: 12, battered: 24, injured: 5 }, talentPoints: 19, classSpecific: { mana: 4, aptitude: 11 } },
  { level: 5, abilities: 6, attributeBonus: 2, health: { fatigued: 15, battered: 30, injured: 6 }, talentPoints: 22, classSpecific: { mana: 4, aptitude: 13 } },
  { level: 6, abilities: 7, attributeBonus: 3, health: { fatigued: 18, battered: 36, injured: 7 }, talentPoints: 25, classSpecific: { mana: 5, aptitude: 15 } },
  { level: 7, abilities: 8, attributeBonus: 3, health: { fatigued: 21, battered: 42, injured: 8 }, talentPoints: 28, classSpecific: { mana: 5, aptitude: 17 } },
  { level: 8, abilities: 9, attributeBonus: 4, health: { fatigued: 24, battered: 48, injured: 9 }, talentPoints: 31, classSpecific: { mana: 5, aptitude: 19 } },
  { level: 9, abilities: 10, attributeBonus: 4, health: { fatigued: 27, battered: 54, injured: 10 }, talentPoints: 34, classSpecific: { mana: 5, aptitude: 21 } },
  { level: 10, abilities: 11, attributeBonus: 5, health: { fatigued: 30, battered: 60, injured: 11 }, talentPoints: 37, classSpecific: { mana: 6, aptitude: 23 } },
];

/**
 * ROGUE - Jack of All Trades
 *
 * Key Features:
 * - Hit Bonus (+1 per level)
 * - Specialty system (choose 2 at level 1, +1 at even levels)
 *   - Ability: Extra ability from any class
 *   - Arcane: Gain Mana & Aptitude for 1 Art
 *   - Divine: Gain Favor & 1 Influence
 *   - Talent: 3 Talent Bonuses (Ace, Certain, Easy, Golden, Swift)
 *   - Stamina: Gain +2 Stamina
 *
 * Armor: Light
 * Weapons: All Common
 */
export const ROGUE_PROGRESSION: ClassProgression[] = [
  { level: 1, abilities: 3, attributeBonus: 0, health: { fatigued: 4, battered: 5, injured: 2 }, talentPoints: 15, classSpecific: { hitBonus: 1, specialty: 2 } },
  { level: 2, abilities: 4, attributeBonus: 1, health: { fatigued: 8, battered: 10, injured: 3 }, talentPoints: 19, classSpecific: { hitBonus: 2, specialty: 3 } },
  { level: 3, abilities: 5, attributeBonus: 1, health: { fatigued: 12, battered: 15, injured: 4 }, talentPoints: 23, classSpecific: { hitBonus: 3, specialty: 3 } },
  { level: 4, abilities: 6, attributeBonus: 2, health: { fatigued: 16, battered: 20, injured: 5 }, talentPoints: 27, classSpecific: { hitBonus: 4, specialty: 4 } },
  { level: 5, abilities: 7, attributeBonus: 2, health: { fatigued: 20, battered: 25, injured: 6 }, talentPoints: 31, classSpecific: { hitBonus: 5, specialty: 4 } },
  { level: 6, abilities: 8, attributeBonus: 3, health: { fatigued: 24, battered: 30, injured: 7 }, talentPoints: 35, classSpecific: { hitBonus: 6, specialty: 5 } },
  { level: 7, abilities: 9, attributeBonus: 3, health: { fatigued: 28, battered: 35, injured: 8 }, talentPoints: 39, classSpecific: { hitBonus: 7, specialty: 5 } },
  { level: 8, abilities: 10, attributeBonus: 4, health: { fatigued: 32, battered: 40, injured: 9 }, talentPoints: 43, classSpecific: { hitBonus: 8, specialty: 6 } },
  { level: 9, abilities: 11, attributeBonus: 4, health: { fatigued: 36, battered: 45, injured: 10 }, talentPoints: 47, classSpecific: { hitBonus: 9, specialty: 6 } },
  { level: 10, abilities: 12, attributeBonus: 5, health: { fatigued: 40, battered: 50, injured: 11 }, talentPoints: 51, classSpecific: { hitBonus: 10, specialty: 7 } },
];

/**
 * WARRIOR - Combat Specialist
 *
 * Key Features:
 * - Damage Bonus (+2 per level)
 * - Combat Styles (1 at level 1, +1 at odd levels)
 *   - Collaborative: Team synergy
 *   - Deliberate: Defensive support
 *   - Ferocious: Fearless aggression
 *   - Martial: Enemy elimination
 *   - Strategic: Tactical advantage
 * - High Stamina (5 + 4 per level)
 *
 * Armor: Light, Medium, Heavy, Shields
 * Weapons: All Common, All Martial
 */
export const WARRIOR_PROGRESSION: ClassProgression[] = [
  { level: 1, abilities: 2, attributeBonus: 0, health: { fatigued: 6, battered: 3, injured: 2 }, talentPoints: 10, classSpecific: { damageBonus: 2, combatStyles: 1, stamina: 5 } },
  { level: 2, abilities: 3, attributeBonus: 1, health: { fatigued: 12, battered: 6, injured: 3 }, talentPoints: 13, classSpecific: { damageBonus: 4, combatStyles: 1, stamina: 9 } },
  { level: 3, abilities: 4, attributeBonus: 1, health: { fatigued: 18, battered: 9, injured: 4 }, talentPoints: 16, classSpecific: { damageBonus: 6, combatStyles: 2, stamina: 13 } },
  { level: 4, abilities: 5, attributeBonus: 2, health: { fatigued: 24, battered: 12, injured: 5 }, talentPoints: 19, classSpecific: { damageBonus: 8, combatStyles: 2, stamina: 17 } },
  { level: 5, abilities: 6, attributeBonus: 2, health: { fatigued: 30, battered: 15, injured: 6 }, talentPoints: 22, classSpecific: { damageBonus: 10, combatStyles: 3, stamina: 21 } },
  { level: 6, abilities: 7, attributeBonus: 3, health: { fatigued: 36, battered: 18, injured: 7 }, talentPoints: 25, classSpecific: { damageBonus: 12, combatStyles: 3, stamina: 25 } },
  { level: 7, abilities: 8, attributeBonus: 3, health: { fatigued: 42, battered: 21, injured: 8 }, talentPoints: 28, classSpecific: { damageBonus: 14, combatStyles: 4, stamina: 29 } },
  { level: 8, abilities: 9, attributeBonus: 4, health: { fatigued: 48, battered: 24, injured: 9 }, talentPoints: 31, classSpecific: { damageBonus: 16, combatStyles: 4, stamina: 33 } },
  { level: 9, abilities: 10, attributeBonus: 4, health: { fatigued: 54, battered: 27, injured: 10 }, talentPoints: 34, classSpecific: { damageBonus: 18, combatStyles: 5, stamina: 37 } },
  { level: 10, abilities: 11, attributeBonus: 5, health: { fatigued: 60, battered: 30, injured: 11 }, talentPoints: 37, classSpecific: { damageBonus: 20, combatStyles: 5, stamina: 41 } },
];

/**
 * TALENT EXPERTISE LEVELS & COSTS
 *
 * Talents can be improved through expertise levels:
 * - Apprentice: Basic proficiency (1 point)
 * - Journeyman: Advanced skill (1 additional point, 2 total)
 * - Master: Expert mastery (1 additional point, 3 total)
 *
 * Note: Talent Points are also modified by Knowledge attribute
 */
export type TalentExpertise = 'none' | 'apprentice' | 'journeyman' | 'master';

export const TALENT_COSTS: Record<TalentExpertise, number> = {
  none: 0,
  apprentice: 1,
  journeyman: 2,
  master: 3,
};

/**
 * Common Talents (partial list - would need full talent section from rules)
 */
export const COMMON_TALENTS = [
  'Athletics',
  'Notice',
  'Stealth',
  'Survival',
  'Exertion',
  'Recuperation',
  'Lore',
  'Medicine',
  'Persuasion',
  'Deception',
  'Intimidation',
  'Performance',
] as const;

export type TalentName = typeof COMMON_TALENTS[number];
