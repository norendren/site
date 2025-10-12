/**
 * ATHIA CLASS REFERENCE
 * Arithmetic progression system for character advancement
 */

export interface ClassProgressionData {
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
 * Base configuration for arithmetic progression
 */
interface ProgressionConfig {
  baseTalentPoints: number;
  talentPointsPerLevel: number;
  baseHealth: {
    fatigued: number;
    battered: number;
    injured: number;
  };
  healthPerLevel: {
    fatigued: number;
    battered: number;
    injured: number;
  };
  classSpecificBase: Record<string, number | string>;
  classSpecificPerLevel: Record<string, number>;
}

/**
 * Calculate value using arithmetic progression
 * Formula: baseValue + (increment * (level - 1))
 */
function calculateProgression(base: number, perLevel: number, level: number): number {
  return base + (perLevel * (level - 1));
}

/**
 * Generate progression table for a class using arithmetic progression
 */
function generateProgression(config: ProgressionConfig, maxLevel: number = 10): ClassProgressionData[] {
  const progression: ClassProgressionData[] = [];

  for (let level = 1; level <= maxLevel; level++) {
    const data: ClassProgressionData = {
      level,
      // Abilities: 2 at level 1, +1 per level
      abilities: calculateProgression(2, 1, level),
      // Attribute Bonus: every 2 levels (0, 1, 1, 2, 2, 3, 3, 4, 4, 5)
      attributeBonus: Math.floor(level / 2),
      health: {
        fatigued: calculateProgression(config.baseHealth.fatigued, config.healthPerLevel.fatigued, level),
        battered: calculateProgression(config.baseHealth.battered, config.healthPerLevel.battered, level),
        injured: calculateProgression(config.baseHealth.injured, config.healthPerLevel.injured, level),
      },
      talentPoints: calculateProgression(config.baseTalentPoints, config.talentPointsPerLevel, level),
      classSpecific: {}
    };

    // Calculate class-specific progressions
    for (const [key, baseValue] of Object.entries(config.classSpecificBase)) {
      if (typeof baseValue === 'number' && key in config.classSpecificPerLevel) {
        data.classSpecific[key] = calculateProgression(
          baseValue,
          config.classSpecificPerLevel[key],
          level
        );
      } else {
        data.classSpecific[key] = baseValue;
      }
    }

    progression.push(data);
  }

  return progression;
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
 *
 * Starting Values:
 * - Talent Points: 10 (+3 per level)
 * - Health: Fatigued 5 (+5/lvl), Battered 4 (+4/lvl), Injured 2 (+1/lvl)
 * - Favor: 8 (+2 per level)
 * - Stamina: 3 (+1 per level)
 */
const ACOLYTE_CONFIG: ProgressionConfig = {
  baseTalentPoints: 10,
  talentPointsPerLevel: 3,
  baseHealth: { fatigued: 5, battered: 4, injured: 2 },
  healthPerLevel: { fatigued: 5, battered: 4, injured: 1 },
  classSpecificBase: { favor: 8, stamina: 3, bless: 1 },
  classSpecificPerLevel: { favor: 2, stamina: 1 }
};

export const ACOLYTE_PROGRESSION = generateProgression(ACOLYTE_CONFIG);

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
 *
 * Starting Values:
 * - Talent Points: 10 (+3 per level)
 * - Health: Fatigued 3 (+3/lvl), Battered 6 (+6/lvl), Injured 2 (+1/lvl)
 * - Mana: 3 (+0 per level, occasional bumps)
 * - Aptitude: 5 (+2 per level)
 */
const MAGE_CONFIG: ProgressionConfig = {
  baseTalentPoints: 10,
  talentPointsPerLevel: 3,
  baseHealth: { fatigued: 3, battered: 6, injured: 2 },
  healthPerLevel: { fatigued: 3, battered: 6, injured: 1 },
  classSpecificBase: { mana: 3, aptitude: 5 },
  classSpecificPerLevel: { aptitude: 2, mana: 0 } // Mana increases irregularly
};

export const MAGE_PROGRESSION = generateProgression(MAGE_CONFIG);

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
 *
 * Starting Values:
 * - Talent Points: 15 (+4 per level)
 * - Health: Fatigued 4 (+4/lvl), Battered 5 (+5/lvl), Injured 2 (+1/lvl)
 * - Hit Bonus: 1 (+1 per level)
 * - Specialty: 2 (+1 every other level)
 */
const ROGUE_CONFIG: ProgressionConfig = {
  baseTalentPoints: 15,
  talentPointsPerLevel: 4,
  baseHealth: { fatigued: 4, battered: 5, injured: 2 },
  healthPerLevel: { fatigued: 4, battered: 5, injured: 1 },
  classSpecificBase: { hitBonus: 1, specialty: 2 },
  classSpecificPerLevel: { hitBonus: 1, specialty: 0 } // Specialty increases irregularly
};

export const ROGUE_PROGRESSION = generateProgression(ROGUE_CONFIG);

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
 * - High Stamina
 *
 * Armor: Light, Medium, Heavy, Shields
 * Weapons: All Common, All Martial
 *
 * Starting Values:
 * - Talent Points: 10 (+3 per level)
 * - Health: Fatigued 6 (+6/lvl), Battered 3 (+3/lvl), Injured 2 (+1/lvl)
 * - Damage Bonus: 2 (+2 per level)
 * - Stamina: 5 (+4 per level)
 * - Combat Styles: 1 (+1 at odd levels)
 */
const WARRIOR_CONFIG: ProgressionConfig = {
  baseTalentPoints: 10,
  talentPointsPerLevel: 3,
  baseHealth: { fatigued: 6, battered: 3, injured: 2 },
  healthPerLevel: { fatigued: 6, battered: 3, injured: 1 },
  classSpecificBase: { damageBonus: 2, combatStyles: 1, stamina: 5 },
  classSpecificPerLevel: { damageBonus: 2, stamina: 4, combatStyles: 0 } // Combat styles increase irregularly
};

export const WARRIOR_PROGRESSION = generateProgression(WARRIOR_CONFIG);

/**
 * Helper function to get talent points for a specific class and level
 */
export function getTalentPoints(className: string, level: number): number {
  if (level < 1 || level > 10) return 0;

  const progressions: Record<string, ClassProgressionData[]> = {
    'Acolyte': ACOLYTE_PROGRESSION,
    'Mage': MAGE_PROGRESSION,
    'Rogue': ROGUE_PROGRESSION,
    'Warrior': WARRIOR_PROGRESSION,
  };

  const progression = progressions[className];
  if (!progression) return 0;

  return progression[level - 1]?.talentPoints || 0;
}

/**
 * Helper function to get health tier bonuses for a specific class and level
 * @param className - Name of the class (Acolyte, Mage, Rogue, Warrior)
 * @param level - Character level (1-10)
 * @returns Health tier bonuses or undefined if class not found
 */
export function getClassHealthBonuses(
  className: string,
  level: number
): { fatigued: number; battered: number; injured: number } | undefined {
  if (level < 1 || level > 10) return undefined;

  const progressions: Record<string, ClassProgressionData[]> = {
    'Acolyte': ACOLYTE_PROGRESSION,
    'Mage': MAGE_PROGRESSION,
    'Rogue': ROGUE_PROGRESSION,
    'Warrior': WARRIOR_PROGRESSION,
  };

  const progression = progressions[className];
  if (!progression) return undefined;

  return progression[level - 1]?.health;
}

/**
 * Helper function to get attribute bonus for a specific class and level
 * Attribute bonus increases every 2 levels (0, 1, 1, 2, 2, 3, 3, 4, 4, 5)
 * @param className - Name of the class (Acolyte, Mage, Rogue, Warrior)
 * @param level - Character level (1-10)
 * @returns Attribute bonus or 0 if class not found
 */
export function getAttributeBonus(className: string, level: number): number {
  if (!className || level < 1 || level > 10) return 0;

  const progressions: Record<string, ClassProgressionData[]> = {
    'Acolyte': ACOLYTE_PROGRESSION,
    'Mage': MAGE_PROGRESSION,
    'Rogue': ROGUE_PROGRESSION,
    'Warrior': WARRIOR_PROGRESSION,
  };

  const progression = progressions[className];
  if (!progression) return 0;

  return progression[level - 1]?.attributeBonus || 0;
}

/**
 * TALENT EXPERTISE LEVELS & COSTS
 *
 * Talents can be improved through expertise levels by spending Talent Points:
 * - Untrained (0 points): Checks made at Disadvantage
 * - Apprentice (1-2 points): Standard checks, 2 bubbles on sheet (A A)
 * - Journeyman (3-5 points): Never worse than Double Disadvantage, 3 bubbles (J J J)
 * - Master (6 points): Checks never at Disadvantage, 1 bubble (M)
 *
 * Character Sheet Notation: Each talent has 6 bubbles + 1 empty (A A J J J M 0)
 *
 * IMPORTANT: At character creation, maximum initial investment is 3 points (Journeyman level).
 * Master level can only be achieved through advancement.
 *
 * Total Talent Points = Class Base + Knowledge Modifier
 *
 * Note: Every point spent adds to Talent Score = Points + Attribute Modifier
 */
export type TalentExpertise = 'untrained' | 'apprentice' | 'journeyman' | 'master';

export const TALENT_COSTS: Record<TalentExpertise, number> = {
  untrained: 0,
  apprentice: 1,  // 1-2 points total
  journeyman: 3,  // 3-5 points total
  master: 6,      // 6 points total (not available at character creation)
};

export const MAX_TALENT_AT_CREATION = 3; // Journeyman is max at character creation

/**
 * All 18 Talents in Athia (in rulebook order)
 * Format: "TalentName (Attribute)"
 */
export const ATHIA_TALENTS = [
  'Athletics',      // STR
  'Charisma',       // VAL
  'Combat Rest',    // CON
  'Concentration',  // INS
  'Craft',          // DEX
  'Discipline',     // VAL
  'Endurance',      // CON
  'Exertion',       // STR
  'Faith',          // VAL
  'Hermetics',      // KNO
  'Notice',         // INS
  'Recuperation',   // CON
  'Scholar',        // KNO
  'Stealth',        // DEX
  'Survival',       // KNO
  'Swimming',       // STR
  'Taming',         // INS
  'Thievery',       // DEX
] as const;

export type TalentName = typeof ATHIA_TALENTS[number];

/**
 * Talent attribute associations
 */
export const TALENT_ATTRIBUTES: Record<TalentName, string> = {
  'Athletics': 'STR',
  'Charisma': 'VAL',
  'Combat Rest': 'CON',
  'Concentration': 'INS',
  'Craft': 'DEX',
  'Discipline': 'VAL',
  'Endurance': 'CON',
  'Exertion': 'STR',
  'Faith': 'VAL',
  'Hermetics': 'KNO',
  'Notice': 'INS',
  'Recuperation': 'CON',
  'Scholar': 'KNO',
  'Stealth': 'DEX',
  'Survival': 'KNO',
  'Swimming': 'STR',
  'Taming': 'INS',
  'Thievery': 'DEX',
};

/**
 * Calculate the total talent score
 * Formula: Talent Score = Talent Points + Attribute Modifier + Abilities + Racial Perks
 *
 * @param talentPoints - Number of points invested in the talent (0-6)
 * @param attributeModifier - The modifier from the associated attribute (-3 to +3)
 * @param abilityBonus - Bonus from class abilities (default 0, for future implementation)
 * @param racialBonus - Bonus from racial perks (default 0, for future implementation)
 * @returns The total talent score
 */
export function calculateTalentScore(
  talentPoints: number,
  attributeModifier: number,
  abilityBonus: number = 0,
  racialBonus: number = 0
): number {
  return talentPoints + attributeModifier + abilityBonus + racialBonus;
}

/**
 * Get the attribute modifier for a specific talent
 * @param talentName - The name of the talent
 * @param attributes - Map of attribute names to their values
 * @returns The attribute modifier for this talent
 */
export function getTalentAttributeModifier(
  talentName: TalentName,
  attributes: Map<string, number>
): number {
  const attrName = TALENT_ATTRIBUTES[talentName];
  return attributes.get(attrName) ?? 0;
}
