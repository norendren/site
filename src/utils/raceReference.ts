/**
 * Comprehensive race data for Athia character creation
 * Includes health tier bonuses, physical traits, and all racial perks with mechanical summaries
 */

// ===== MECHANICAL EFFECT TYPE DEFINITIONS =====

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
 * Effect that grants damage reduction
 */
export interface DamageReductionEffect {
  type: 'damageReduction';
  source: 'arcaneSpells' | 'physicalAttacks';
  value: 'characterLevel' | 'dexModifier'; // formula for DR
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
  // Optional: could add subcategories like 'immunity', 'advantage', 'special'
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
 * Union type for all possible perk effects
 */
export type PerkEffect =
  | DerivedStatEffect
  | TalentPointsEffect
  | HealthTierEffect
  | AttributeMaxModifierEffect
  | MovementEffect
  | TalentAdvantageEffect
  | DamageReductionEffect
  | ProficiencyEffect
  | AbilityEffect
  | CombatAdvantageEffect;

export interface RacialPerk {
  name: string;
  mechanicalSummary: string; // Concise description of mechanical effects
  effects: PerkEffect[]; // Typed mechanical effects for calculations
}

export interface RaceData {
  name: string;
  // Physical traits
  averageHeight: {
    male: string;
    female: string;
  };
  averageWeight: {
    male: string;
    female: string;
  };
  lifespan: number; // in years
  // Health tier bonuses
  fatigued: number;
  battered: number;
  injured: number;
  // Available racial perks (characters choose 2)
  perks: RacialPerk[];
}

export const RACE_DATA: Record<string, RaceData> = {
  Human: {
    name: 'Human',
    averageHeight: { male: "6'", female: "5'8\"" },
    averageWeight: { male: '215 lbs', female: '180 lbs' },
    lifespan: 60,
    fatigued: 1,
    battered: 1,
    injured: 1,
    perks: [
      {
        name: 'Adapted',
        mechanicalSummary: 'Gain 1 additional Ability from Class or General Abilities list',
        effects: [
          { type: 'ability', description: 'Gain 1 additional Ability from Class or General Abilities list' },
        ],
      },
      {
        name: 'Arcane Resilience',
        mechanicalSummary: 'Damage Reduction = Character Level against harmful Arcane Spells',
        effects: [
          { type: 'damageReduction', source: 'arcaneSpells', value: 'characterLevel' },
        ],
      },
      {
        name: 'Courageous',
        mechanicalSummary: '+1 to Daring',
        effects: [
          { type: 'derivedStat', stat: 'daring', value: 1 },
        ],
      },
      {
        name: 'Exceptional',
        mechanicalSummary: 'Maximum modifier for any one Attribute raised to +4',
        effects: [
          { type: 'ability', description: 'Choose one Attribute: maximum modifier raised to +4 (requires manual selection)' },
        ],
      },
      {
        name: 'Forceful',
        mechanicalSummary: '+1 Stamina per Level',
        effects: [
          { type: 'derivedStat', stat: 'stamina', value: 1, perLevel: true },
        ],
      },
      {
        name: 'Hunter',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs one specific Monster Family (chosen at creation)',
        effects: [
          { type: 'ability', description: 'Choose one Monster Family: Advantage on Hit Check and Damage vs that family' },
        ],
      },
      {
        name: 'Resilient',
        mechanicalSummary: '+1 Fatigued Health tier per Level',
        effects: [
          { type: 'healthTier', tier: 'fatigued', value: 1, perLevel: true },
        ],
      },
      {
        name: 'Sharp',
        mechanicalSummary: 'Start with +4 additional Talent points',
        effects: [
          { type: 'talentPoints', value: 4 },
        ],
      },
      {
        name: 'Shieldsman/Shieldmaiden',
        mechanicalSummary: 'Training with Shields',
        effects: [
          { type: 'proficiency', category: 'shield', items: ['All Shields'] },
        ],
      },
      {
        name: 'Spiritual',
        mechanicalSummary: '+2 to Favor',
        effects: [
          { type: 'derivedStat', stat: 'favor', value: 2 },
        ],
      },
      {
        name: 'Swordsman',
        mechanicalSummary: 'Proficiency with all Swords',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['All Swords'] },
        ],
      },
      {
        name: 'Urban',
        mechanicalSummary: 'Advantage on all Talent Checks in city environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in city environments' },
        ],
      },
    ],
  },

  Bantam: {
    name: 'Bantam',
    averageHeight: { male: "3'", female: "2'9\"" },
    averageWeight: { male: '45 lbs', female: '40 lbs' },
    lifespan: 80,
    fatigued: 2,
    battered: 1,
    injured: 0,
    perks: [
      {
        name: 'Ardent',
        mechanicalSummary: 'Advantage on Faith Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Faith' },
        ],
      },
      {
        name: 'Camouflage',
        mechanicalSummary: 'Advantage on Stealth Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Stealth' },
        ],
      },
      {
        name: 'Giant Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Savage family creatures',
        effects: [
          { type: 'combatAdvantage', targetType: 'Savage family creatures', effect: 'both' },
        ],
      },
      {
        name: 'Haggler',
        mechanicalSummary: 'Purchase Arms/Armor/Gear at 50% discount; sell used items at full price',
        effects: [
          { type: 'ability', description: 'Purchase Arms/Armor/Gear at 50% discount; sell used items at full price' },
        ],
      },
      {
        name: 'Lucky',
        mechanicalSummary: 'Bank 1 reroll on Critical Success; use for any roll (max 1 banked)',
        effects: [
          { type: 'ability', description: 'Bank 1 reroll on Critical Success; use for any roll (max 1 banked)' },
        ],
      },
      {
        name: 'Motivational',
        mechanicalSummary: 'Advantage on Charisma Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Charisma' },
        ],
      },
      {
        name: 'Nimble',
        mechanicalSummary: 'Maximum Dexterity modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'DEX', maxValue: 4 },
        ],
      },
      {
        name: 'Quick',
        mechanicalSummary: 'Damage Reduction from physical attacks = DEX modifier',
        effects: [
          { type: 'damageReduction', source: 'physicalAttacks', value: 'dexModifier' },
        ],
      },
      {
        name: 'Survivalist',
        mechanicalSummary: 'Advantage on all Talent Checks in tundra environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in tundra environments' },
        ],
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Bolas',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['Bolas'] },
        ],
      },
      {
        name: 'Underfoot',
        mechanicalSummary: 'Cause one Hit against you to miss, once per session',
        effects: [
          { type: 'ability', description: 'Cause one Hit against you to miss, once per session' },
        ],
      },
      {
        name: 'Wary',
        mechanicalSummary: 'Take an Action in Surprise round when Surprised',
        effects: [
          { type: 'ability', description: 'Take an Action in Surprise round when Surprised' },
        ],
      },
    ],
  },

  Dwarf: {
    name: 'Dwarf',
    averageHeight: { male: "4'6\"", female: "4'4\"" },
    averageWeight: { male: '195 lbs', female: '180 lbs' },
    lifespan: 80,
    fatigued: 0,
    battered: 2,
    injured: 1,
    perks: [
      {
        name: 'Acclimated',
        mechanicalSummary: 'Immune to hot/cold temperatures except Damage-inducing',
        effects: [
          { type: 'ability', description: 'Immune to hot/cold temperatures except Damage-inducing' },
        ],
      },
      {
        name: 'Dark-Born',
        mechanicalSummary: 'Natural night-vision; navigate in complete darkness',
        effects: [
          { type: 'ability', description: 'Natural night-vision; navigate in complete darkness' },
        ],
      },
      {
        name: 'Frontiersman',
        mechanicalSummary: 'Advantage on Survival Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Survival' },
        ],
      },
      {
        name: 'Hardy',
        mechanicalSummary: '+1 Injured Health tier per Level',
        effects: [
          { type: 'healthTier', tier: 'injured', value: 1, perLevel: true },
        ],
      },
      {
        name: 'Martial Training',
        mechanicalSummary: 'Proficiency with all Hammers',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['All Hammers'] },
        ],
      },
      {
        name: 'Ogre Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Logryn family creatures',
        effects: [
          { type: 'combatAdvantage', targetType: 'Logryn family creatures', effect: 'both' },
        ],
      },
      {
        name: 'Quick Recovery',
        mechanicalSummary: 'Advantage on Recuperation Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Recuperation' },
        ],
      },
      {
        name: 'Sound',
        mechanicalSummary: 'Maximum Constitution modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'CON', maxValue: 4 },
        ],
      },
      {
        name: 'Stout',
        mechanicalSummary: 'No penalties while Battered (still get Injured penalties)',
        effects: [
          { type: 'ability', description: 'No penalties while Battered (still get Injured penalties)' },
        ],
      },
      {
        name: 'Underworldly',
        mechanicalSummary: 'Advantage on all Talent Checks when underground',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks when underground' },
        ],
      },
      {
        name: 'Vigorous',
        mechanicalSummary: 'Regenerate 1 Stamina per round in combat',
        effects: [
          { type: 'ability', description: 'Regenerate 1 Stamina per round in combat' },
        ],
      },
      {
        name: 'Z-Catcher',
        mechanicalSummary: 'Advantage on Combat Rest Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Combat Rest' },
        ],
      },
    ],
  },

  Elf: {
    name: 'Elf',
    averageHeight: { male: "5'3\"", female: "5'3\"" },
    averageWeight: { male: '135 lbs', female: '115 lbs' },
    lifespan: 80,
    fatigued: 0,
    battered: 1,
    injured: 2,
    perks: [
      {
        name: 'Academian',
        mechanicalSummary: 'Advantage on Scholar Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Scholar' },
        ],
      },
      {
        name: 'Arcane Potency',
        mechanicalSummary: 'Start with +1 Mana',
        effects: [
          { type: 'derivedStat', stat: 'mana', value: 1 },
        ],
      },
      {
        name: 'Beast Hunter',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Beast family creatures',
        effects: [
          { type: 'combatAdvantage', targetType: 'Beast family creatures', effect: 'both' },
        ],
      },
      {
        name: 'Blasé',
        mechanicalSummary: 'Immune to all mind-affecting magic',
        effects: [
          { type: 'ability', description: 'Immune to all mind-affecting magic' },
        ],
      },
      {
        name: 'Bowman',
        mechanicalSummary: 'Trained with all Bows',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['All Bows'] },
        ],
      },
      {
        name: 'Brilliant',
        mechanicalSummary: 'Maximum Knowledge modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'KNO', maxValue: 4 },
        ],
      },
      {
        name: 'Detached',
        mechanicalSummary: 'Suffer 1 less Round of Disadvantage from Reactions in combat',
        effects: [
          { type: 'ability', description: 'Suffer 1 less Round of Disadvantage from Reactions in combat' },
        ],
      },
      {
        name: 'Elven Eyes',
        mechanicalSummary: 'Advantage on Notice Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Notice' },
        ],
      },
      {
        name: 'Immune to Disease',
        mechanicalSummary: 'Immune to natural diseases; cannot pass diseases to others',
        effects: [
          { type: 'ability', description: 'Immune to natural diseases; cannot pass diseases to others' },
        ],
      },
      {
        name: 'Staunch',
        mechanicalSummary: 'Immune to Drained State and its effects',
        effects: [
          { type: 'ability', description: 'Immune to Drained State and its effects' },
        ],
      },
      {
        name: 'Talented',
        mechanicalSummary: 'Advantage on Craft Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Craft' },
        ],
      },
      {
        name: 'Woodsman',
        mechanicalSummary: 'Advantage on all Talent Checks in forested environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in forested environments' },
        ],
      },
    ],
  },

  Ferox: {
    name: 'Ferox',
    averageHeight: { male: "7'6\"", female: "7'3\"" },
    averageWeight: { male: '270 lbs', female: '255 lbs' },
    lifespan: 50,
    fatigued: 0,
    battered: 0,
    injured: 3,
    perks: [
      {
        name: 'Active',
        mechanicalSummary: 'Advantage on Athletics Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Athletics' },
        ],
      },
      {
        name: 'Domesticator',
        mechanicalSummary: 'Advantage on Taming Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Taming' },
        ],
      },
      {
        name: 'Fast',
        mechanicalSummary: 'Base Movement of 30\' instead of 20\'',
        effects: [
          { type: 'movement', baseMovement: 30 },
        ],
      },
      {
        name: 'Naturalist',
        mechanicalSummary: 'Advantage on Hermetics Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Hermetics' },
        ],
      },
      {
        name: 'Never Lost',
        mechanicalSummary: 'Always know which direction is which',
        effects: [
          { type: 'ability', description: 'Always know which direction is which' },
        ],
      },
      {
        name: 'Past Life',
        mechanicalSummary: 'Once per session: roll Untrained Talent Check at Journeyman (+3)',
        effects: [
          { type: 'ability', description: 'Once per session: roll Untrained Talent Check at Journeyman (+3)' },
        ],
      },
      {
        name: 'Plainsman',
        mechanicalSummary: 'Advantage on all Talent Checks in plains environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in plains environments' },
        ],
      },
      {
        name: 'Spirit Totem',
        mechanicalSummary: 'Once per session: ask one question of spirit totem (GM provides helpful answer)',
        effects: [
          { type: 'ability', description: 'Once per session: ask one question of spirit totem (GM provides helpful answer)' },
        ],
      },
      {
        name: 'Strong',
        mechanicalSummary: 'Maximum Strength modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'STR', maxValue: 4 },
        ],
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Throwing Glaive',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['Throwing Glaive'] },
        ],
      },
      {
        name: 'Unhampered',
        mechanicalSummary: 'No Stamina penalties from negative CON modifier or armor restrictions',
        effects: [
          { type: 'ability', description: 'No Stamina penalties from negative CON modifier or armor restrictions' },
        ],
      },
      {
        name: 'Wing Clipper',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs creatures with Flight ability',
        effects: [
          { type: 'combatAdvantage', targetType: 'creatures with Flight ability', effect: 'both' },
        ],
      },
    ],
  },

  Goblin: {
    name: 'Goblin',
    averageHeight: { male: "3'9\"", female: "3'7\"" },
    averageWeight: { male: '75 lbs', female: '65 lbs' },
    lifespan: 40,
    fatigued: 3,
    battered: 0,
    injured: 0,
    perks: [
      {
        name: 'Arid King',
        mechanicalSummary: 'Advantage on all Talent Checks in arid environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in arid environments' },
        ],
      },
      {
        name: 'Aware',
        mechanicalSummary: 'Maximum Instincts modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'INS', maxValue: 4 },
        ],
      },
      {
        name: 'Boney Brow',
        mechanicalSummary: 'Immune to Stunned State',
        effects: [
          { type: 'ability', description: 'Immune to Stunned State' },
        ],
      },
      {
        name: 'Cast-Iron Stomach',
        mechanicalSummary: 'Gain sustenance from consuming any organic material',
        effects: [
          { type: 'ability', description: 'Gain sustenance from consuming any organic material' },
        ],
      },
      {
        name: 'Enduring',
        mechanicalSummary: 'Advantage on Endurance Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Endurance' },
        ],
      },
      {
        name: 'Fast',
        mechanicalSummary: 'Base Movement of 30\' instead of 20\'',
        effects: [
          { type: 'movement', baseMovement: 30 },
        ],
      },
      {
        name: 'Focused',
        mechanicalSummary: 'Advantage on Concentration Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Concentration' },
        ],
      },
      {
        name: 'Group Tactics',
        mechanicalSummary: '+1 on Hit Checks vs Targets already engaged with an opponent',
        effects: [
          { type: 'combatAdvantage', targetType: 'targets already engaged', effect: 'hitCheck', bonus: 1 },
        ],
      },
      {
        name: 'Nocturnal',
        mechanicalSummary: 'Natural night-vision; navigate in complete darkness',
        effects: [
          { type: 'ability', description: 'Natural night-vision; navigate in complete darkness' },
        ],
      },
      {
        name: 'Pickpocket',
        mechanicalSummary: 'Advantage on Thievery Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Thievery' },
        ],
      },
      {
        name: 'Scale-Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Reptilian family creatures',
        effects: [
          { type: 'combatAdvantage', targetType: 'Reptilian family creatures', effect: 'both' },
        ],
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Blowgun',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['Blowgun'] },
        ],
      },
    ],
  },

  Orc: {
    name: 'Orc',
    averageHeight: { male: "6'9\"", female: "6'5\"" },
    averageWeight: { male: '350 lbs', female: '275 lbs' },
    lifespan: 50,
    fatigued: 1,
    battered: 2,
    injured: 0,
    perks: [
      {
        name: 'Able-Bodied',
        mechanicalSummary: 'Advantage on Exertion Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Exertion' },
        ],
      },
      {
        name: 'Aquatic',
        mechanicalSummary: 'Advantage on Swimming Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Swimming' },
        ],
      },
      {
        name: 'Fearless',
        mechanicalSummary: 'Suffer 1 less Round of Disadvantage from Reactions in combat',
        effects: [
          { type: 'ability', description: 'Suffer 1 less Round of Disadvantage from Reactions in combat' },
        ],
      },
      {
        name: 'Ironclad',
        mechanicalSummary: 'Training in all armor types (Light, Medium, Heavy)',
        effects: [
          { type: 'proficiency', category: 'armor', items: ['Light', 'Medium', 'Heavy'] },
        ],
      },
      {
        name: 'Marsh Master',
        mechanicalSummary: 'Advantage on all Talent Checks in wetland environments',
        effects: [
          { type: 'ability', description: 'Advantage on all Talent Checks in wetland environments' },
        ],
      },
      {
        name: 'Resolved',
        mechanicalSummary: 'Advantage on Discipline Checks',
        effects: [
          { type: 'talentAdvantage', talent: 'Discipline' },
        ],
      },
      {
        name: 'Savage',
        mechanicalSummary: 'Roll one Damage roll at Advantage, once per Encounter',
        effects: [
          { type: 'ability', description: 'Roll one Damage roll at Advantage, once per Encounter' },
        ],
      },
      {
        name: 'Scale-Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Reptilian family creatures',
        effects: [
          { type: 'combatAdvantage', targetType: 'Reptilian family creatures', effect: 'both' },
        ],
      },
      {
        name: 'Scavenger',
        mechanicalSummary: 'Always scrounge up 1 meal per day for self',
        effects: [
          { type: 'ability', description: 'Always scrounge up 1 meal per day for self' },
        ],
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with all Axes',
        effects: [
          { type: 'proficiency', category: 'weapon', items: ['All Axes'] },
        ],
      },
      {
        name: 'Unshakable',
        mechanicalSummary: 'Maximum Valor modifier raised to +4',
        effects: [
          { type: 'attributeMaxModifier', attribute: 'VAL', maxValue: 4 },
        ],
      },
      {
        name: 'War-Cry',
        mechanicalSummary: 'For 1 Round: negate all Disadvantage from Reactions for allies within 20\'',
        effects: [
          { type: 'ability', description: 'For 1 Round: negate all Disadvantage from Reactions for allies within 20\'' },
        ],
      },
    ],
  },
};

// List of all playable race names
export const PLAYABLE_RACES = Object.keys(RACE_DATA);

/**
 * Gets race data by name
 */
export function getRaceData(raceName: string): RaceData | undefined {
  return RACE_DATA[raceName];
}

/**
 * Gets health tier bonuses for a race
 */
export function getRaceHealthBonuses(raceName: string): { fatigued: number; battered: number; injured: number } | undefined {
  const race = RACE_DATA[raceName];
  if (!race) return undefined;

  return {
    fatigued: race.fatigued,
    battered: race.battered,
    injured: race.injured,
  };
}

/**
 * Gets all perks available to a race
 */
export function getRacePerks(raceName: string): RacialPerk[] {
  const race = RACE_DATA[raceName];
  return race?.perks || [];
}

// ===== PERK EFFECT CALCULATION UTILITIES =====

/**
 * Gets the perk object by name from a race
 */
export function getPerkByName(raceName: string, perkName: string): RacialPerk | undefined {
  const perks = getRacePerks(raceName);
  return perks.find(perk => perk.name === perkName);
}

/**
 * Gets all effects from a list of selected perk names
 */
export function getSelectedPerkEffects(raceName: string, selectedPerkNames: string[]): PerkEffect[] {
  const effects: PerkEffect[] = [];

  for (const perkName of selectedPerkNames) {
    const perk = getPerkByName(raceName, perkName);
    if (perk) {
      effects.push(...perk.effects);
    }
  }

  return effects;
}

/**
 * Calculates derived stat bonuses from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @param characterLevel - Character level (needed for perLevel calculations)
 * @returns Object with bonuses for each stat
 */
export function calculateDerivedStatBonuses(
  raceName: string,
  selectedPerkNames: string[],
  characterLevel: number
): {
  daring: number;
  stamina: number;
  favor: number;
  mana: number;
  defense: number;
} {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const bonuses = {
    daring: 0,
    stamina: 0,
    favor: 0,
    mana: 0,
    defense: 0,
  };

  for (const effect of effects) {
    if (effect.type === 'derivedStat') {
      const value = effect.perLevel ? effect.value * characterLevel : effect.value;
      bonuses[effect.stat] += value;
    }
  }

  return bonuses;
}

/**
 * Calculates health tier bonuses from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @param characterLevel - Character level (bonuses are per level)
 * @returns Object with bonuses for each health tier
 */
export function calculateHealthTierBonuses(
  raceName: string,
  selectedPerkNames: string[],
  characterLevel: number
): {
  fatigued: number;
  battered: number;
  injured: number;
} {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const bonuses = {
    fatigued: 0,
    battered: 0,
    injured: 0,
  };

  for (const effect of effects) {
    if (effect.type === 'healthTier') {
      bonuses[effect.tier] += effect.value * characterLevel;
    }
  }

  return bonuses;
}

/**
 * Calculates total bonus talent points from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Total bonus talent points
 */
export function calculateTalentPointBonus(
  raceName: string,
  selectedPerkNames: string[]
): number {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  let bonus = 0;

  for (const effect of effects) {
    if (effect.type === 'talentPoints') {
      bonus += effect.value;
    }
  }

  return bonus;
}

/**
 * Gets talents that have advantage from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Array of talent names that have advantage
 */
export function getTalentsWithAdvantage(
  raceName: string,
  selectedPerkNames: string[]
): string[] {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const talents: string[] = [];

  for (const effect of effects) {
    if (effect.type === 'talentAdvantage') {
      talents.push(effect.talent);
    }
  }

  return talents;
}

/**
 * Gets base movement from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Base movement in feet, or 20 (default) if no movement perk selected
 */
export function getBaseMovement(
  raceName: string,
  selectedPerkNames: string[]
): number {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);

  for (const effect of effects) {
    if (effect.type === 'movement') {
      return effect.baseMovement;
    }
  }

  return 20; // Default base movement
}

/**
 * Gets all proficiencies from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Object with arrays of weapon, armor, and shield proficiencies
 */
export function getProficiencies(
  raceName: string,
  selectedPerkNames: string[]
): {
  weapons: string[];
  armor: string[];
  shields: string[];
} {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const proficiencies = {
    weapons: [] as string[],
    armor: [] as string[],
    shields: [] as string[],
  };

  for (const effect of effects) {
    if (effect.type === 'proficiency') {
      if (effect.category === 'weapon') {
        proficiencies.weapons.push(...effect.items);
      } else if (effect.category === 'armor') {
        proficiencies.armor.push(...effect.items);
      } else if (effect.category === 'shield') {
        proficiencies.shields.push(...effect.items);
      }
    }
  }

  return proficiencies;
}

/**
 * Gets attribute max modifier overrides from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Object mapping attribute names to their max modifier (only includes overrides)
 */
export function getAttributeMaxModifiers(
  raceName: string,
  selectedPerkNames: string[]
): Record<string, number> {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const maxModifiers: Record<string, number> = {};

  for (const effect of effects) {
    if (effect.type === 'attributeMaxModifier') {
      maxModifiers[effect.attribute] = effect.maxValue;
    }
  }

  return maxModifiers;
}

/**
 * Gets descriptive abilities (non-numeric effects) from selected perks
 * @param raceName - The character's race
 * @param selectedPerkNames - Array of selected perk names
 * @returns Array of ability descriptions
 */
export function getAbilityDescriptions(
  raceName: string,
  selectedPerkNames: string[]
): string[] {
  const effects = getSelectedPerkEffects(raceName, selectedPerkNames);
  const abilities: string[] = [];

  for (const effect of effects) {
    if (effect.type === 'ability') {
      abilities.push(effect.description);
    }
  }

  return abilities;
}
