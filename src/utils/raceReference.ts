/**
 * Comprehensive race data for Athia character creation
 * Includes health tier bonuses, physical traits, and all racial perks with mechanical summaries
 */

export interface RacialPerk {
  name: string;
  mechanicalSummary: string; // Concise description of mechanical effects
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
      },
      {
        name: 'Arcane Resilience',
        mechanicalSummary: 'Damage Reduction = Character Level against harmful Arcane Spells',
      },
      {
        name: 'Courageous',
        mechanicalSummary: '+1 to Daring',
      },
      {
        name: 'Exceptional',
        mechanicalSummary: 'Maximum modifier for any one Attribute raised to +4',
      },
      {
        name: 'Forceful',
        mechanicalSummary: '+1 Stamina per Level',
      },
      {
        name: 'Hunter',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs one specific Monster Family (chosen at creation)',
      },
      {
        name: 'Resilient',
        mechanicalSummary: '+1 Fatigued Health tier per Level',
      },
      {
        name: 'Sharp',
        mechanicalSummary: 'Start with +4 additional Talent points',
      },
      {
        name: 'Shieldsman/Shieldmaiden',
        mechanicalSummary: 'Training with Shields',
      },
      {
        name: 'Spiritual',
        mechanicalSummary: '+2 to Favor',
      },
      {
        name: 'Swordsman',
        mechanicalSummary: 'Proficiency with all Swords',
      },
      {
        name: 'Urban',
        mechanicalSummary: 'Advantage on all Talent Checks in city environments',
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
      },
      {
        name: 'Camouflage',
        mechanicalSummary: 'Advantage on Stealth Checks',
      },
      {
        name: 'Giant Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Savage family creatures',
      },
      {
        name: 'Haggler',
        mechanicalSummary: 'Purchase Arms/Armor/Gear at 50% discount; sell used items at full price',
      },
      {
        name: 'Lucky',
        mechanicalSummary: 'Bank 1 reroll on Critical Success; use for any roll (max 1 banked)',
      },
      {
        name: 'Motivational',
        mechanicalSummary: 'Advantage on Charisma Checks',
      },
      {
        name: 'Nimble',
        mechanicalSummary: 'Maximum Dexterity modifier raised to +4',
      },
      {
        name: 'Quick',
        mechanicalSummary: 'Damage Reduction from physical attacks = DEX modifier',
      },
      {
        name: 'Survivalist',
        mechanicalSummary: 'Advantage on all Talent Checks in tundra environments',
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Bolas',
      },
      {
        name: 'Underfoot',
        mechanicalSummary: 'Cause one Hit against you to miss, once per session',
      },
      {
        name: 'Wary',
        mechanicalSummary: 'Take an Action in Surprise round when Surprised',
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
      },
      {
        name: 'Dark-Born',
        mechanicalSummary: 'Natural night-vision; navigate in complete darkness',
      },
      {
        name: 'Frontiersman',
        mechanicalSummary: 'Advantage on Survival Checks',
      },
      {
        name: 'Hardy',
        mechanicalSummary: '+1 Injured Health tier per Level',
      },
      {
        name: 'Martial Training',
        mechanicalSummary: 'Proficiency with all Hammers',
      },
      {
        name: 'Ogre Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Logryn family creatures',
      },
      {
        name: 'Quick Recovery',
        mechanicalSummary: 'Advantage on Recuperation Checks',
      },
      {
        name: 'Sound',
        mechanicalSummary: 'Maximum Constitution modifier raised to +4',
      },
      {
        name: 'Stout',
        mechanicalSummary: 'No penalties while Battered (still get Injured penalties)',
      },
      {
        name: 'Underworldly',
        mechanicalSummary: 'Advantage on all Talent Checks when underground',
      },
      {
        name: 'Vigorous',
        mechanicalSummary: 'Regenerate 1 Stamina per round in combat',
      },
      {
        name: 'Z-Catcher',
        mechanicalSummary: 'Advantage on Combat Rest Checks',
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
      },
      {
        name: 'Arcane Potency',
        mechanicalSummary: 'Start with +1 Mana',
      },
      {
        name: 'Beast Hunter',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Beast family creatures',
      },
      {
        name: 'Blasé',
        mechanicalSummary: 'Immune to all mind-affecting magic',
      },
      {
        name: 'Bowman',
        mechanicalSummary: 'Trained with all Bows',
      },
      {
        name: 'Brilliant',
        mechanicalSummary: 'Maximum Knowledge modifier raised to +4',
      },
      {
        name: 'Detached',
        mechanicalSummary: 'Suffer 1 less Round of Disadvantage from Reactions in combat',
      },
      {
        name: 'Elven Eyes',
        mechanicalSummary: 'Advantage on Notice Checks',
      },
      {
        name: 'Immune to Disease',
        mechanicalSummary: 'Immune to natural diseases; cannot pass diseases to others',
      },
      {
        name: 'Staunch',
        mechanicalSummary: 'Immune to Drained State and its effects',
      },
      {
        name: 'Talented',
        mechanicalSummary: 'Advantage on Craft Checks',
      },
      {
        name: 'Woodsman',
        mechanicalSummary: 'Advantage on all Talent Checks in forested environments',
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
      },
      {
        name: 'Domesticator',
        mechanicalSummary: 'Advantage on Taming Checks',
      },
      {
        name: 'Fast',
        mechanicalSummary: 'Base Movement of 30\' instead of 20\'',
      },
      {
        name: 'Naturalist',
        mechanicalSummary: 'Advantage on Hermetics Checks',
      },
      {
        name: 'Never Lost',
        mechanicalSummary: 'Always know which direction is which',
      },
      {
        name: 'Past Life',
        mechanicalSummary: 'Once per session: roll Untrained Talent Check at Journeyman (+3)',
      },
      {
        name: 'Plainsman',
        mechanicalSummary: 'Advantage on all Talent Checks in plains environments',
      },
      {
        name: 'Spirit Totem',
        mechanicalSummary: 'Once per session: ask one question of spirit totem (GM provides helpful answer)',
      },
      {
        name: 'Strong',
        mechanicalSummary: 'Maximum Strength modifier raised to +4',
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Throwing Glaive',
      },
      {
        name: 'Unhampered',
        mechanicalSummary: 'No Stamina penalties from negative CON modifier or armor restrictions',
      },
      {
        name: 'Wing Clipper',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs creatures with Flight ability',
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
      },
      {
        name: 'Aware',
        mechanicalSummary: 'Maximum Instincts modifier raised to +4',
      },
      {
        name: 'Boney Brow',
        mechanicalSummary: 'Immune to Stunned State',
      },
      {
        name: 'Cast-Iron Stomach',
        mechanicalSummary: 'Gain sustenance from consuming any organic material',
      },
      {
        name: 'Enduring',
        mechanicalSummary: 'Advantage on Endurance Checks',
      },
      {
        name: 'Fast',
        mechanicalSummary: 'Base Movement of 30\' instead of 20\'',
      },
      {
        name: 'Focused',
        mechanicalSummary: 'Advantage on Concentration Checks',
      },
      {
        name: 'Group Tactics',
        mechanicalSummary: '+1 on Hit Checks vs Targets already engaged with an opponent',
      },
      {
        name: 'Nocturnal',
        mechanicalSummary: 'Natural night-vision; navigate in complete darkness',
      },
      {
        name: 'Pickpocket',
        mechanicalSummary: 'Advantage on Thievery Checks',
      },
      {
        name: 'Scale-Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Reptilian family creatures',
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with Blowgun',
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
      },
      {
        name: 'Aquatic',
        mechanicalSummary: 'Advantage on Swimming Checks',
      },
      {
        name: 'Fearless',
        mechanicalSummary: 'Suffer 1 less Round of Disadvantage from Reactions in combat',
      },
      {
        name: 'Ironclad',
        mechanicalSummary: 'Training in all armor types (Light, Medium, Heavy)',
      },
      {
        name: 'Marsh Master',
        mechanicalSummary: 'Advantage on all Talent Checks in wetland environments',
      },
      {
        name: 'Resolved',
        mechanicalSummary: 'Advantage on Discipline Checks',
      },
      {
        name: 'Savage',
        mechanicalSummary: 'Roll one Damage roll at Advantage, once per Encounter',
      },
      {
        name: 'Scale-Slayer',
        mechanicalSummary: 'Advantage on Hit Check and Damage vs Reptilian family creatures',
      },
      {
        name: 'Scavenger',
        mechanicalSummary: 'Always scrounge up 1 meal per day for self',
      },
      {
        name: 'Traditional',
        mechanicalSummary: 'Proficiency with all Axes',
      },
      {
        name: 'Unshakable',
        mechanicalSummary: 'Maximum Valor modifier raised to +4',
      },
      {
        name: 'War-Cry',
        mechanicalSummary: 'For 1 Round: negate all Disadvantage from Reactions for allies within 20\'',
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
