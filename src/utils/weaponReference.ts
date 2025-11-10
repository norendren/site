/**
 * Athia RPG Weapon Reference Data
 * Source: Core Rulebook Arms Table
 */

export type WeaponSize = 'L' | 'M' | 'H'; // Light, Medium, Heavy
export type WeaponCategory = 'common' | 'martial' | 'specialty';

export interface Weapon {
  name: string;
  cost: number; // In silver (S)
  damage: string; // Dice notation (e.g., "1d6", "1d8") or flat bonus for bows (e.g., "+2")
  includesBaseStrength: boolean; // True if damage includes base strength damage (has "+" prefix)
  size: WeaponSize;
  range: string; // "-" for melee, or distance like "50'" or "100'"
  designations: string[]; // Special properties: Hurled, Crush, Ranged, Reload, Slow, Wieldy, etc.
  weight: number; // In pounds (lb.), 0 if not specified
  category: WeaponCategory;
  description?: string; // Optional detailed description
  flatBonus?: number; // Flat damage bonus (used by bows instead of dice)
  limit?: number; // STR modifier cap for base strength calculation (e.g., Bow with Limit 1)
  requirement?: number; // Minimum STR modifier required to wield (not enforced, just informational)
}

/**
 * Common Weapons
 * Available to all classes (unless class has restrictions)
 */
export const COMMON_WEAPONS: Record<string, Weapon> = {
  'Axe': {
    name: 'Axe',
    cost: 15,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: [],
    weight: 6,
    category: 'common',
    description: 'A standard one-handed axe for chopping and combat.',
  },
  'Axe, Hand': {
    name: 'Axe, Hand',
    cost: 2,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '50\'',
    designations: ['Hurled'],
    weight: 3,
    category: 'common',
    description: 'A light axe that can be thrown at enemies.',
  },
  'Club': {
    name: 'Club',
    cost: 0.1,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Crush'],
    weight: 3,
    category: 'common',
    description: 'A simple wooden club for bludgeoning.',
  },
  'Club, Heavy': {
    name: 'Club, Heavy',
    cost: 0.2,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: ['Crush'],
    weight: 8,
    category: 'common',
    description: 'A larger, heavier club that deals more damage.',
  },
  'Crossbow': {
    name: 'Crossbow',
    cost: 40,
    damage: '2d6',
    includesBaseStrength: false, // Crossbows do NOT include base strength
    size: 'M',
    range: '150\'',
    designations: ['Ranged', 'Reload (Str: 0)', 'Slow'],
    weight: 6,
    category: 'common',
    description: 'A mechanical ranged weapon that requires reloading.',
  },
  'Dagger': {
    name: 'Dagger',
    cost: 1,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '50\'',
    designations: ['Hurled'],
    weight: 1,
    category: 'common',
    description: 'A small blade useful for both melee and throwing.',
  },
  'Hammer': {
    name: 'Hammer',
    cost: 5,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Crush'],
    weight: 5,
    category: 'common',
    description: 'A warhammer for crushing blows.',
  },
  'Mace': {
    name: 'Mace',
    cost: 0.1,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Crush'],
    weight: 8,
    category: 'common',
    description: 'A spiked or flanged mace for crushing attacks.',
  },
  'Sling': {
    name: 'Sling',
    cost: 0.1,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '100\'',
    designations: ['Hurled'],
    weight: 0.5,
    category: 'common',
    description: 'A leather sling for hurling stones at range.',
  },
  'Spear': {
    name: 'Spear',
    cost: 1,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '100\'',
    designations: ['Hurled', 'Wieldy'],
    weight: 4,
    category: 'common',
    description: 'A versatile spear that can be used in melee or thrown.',
  },
  'Staff': {
    name: 'Staff',
    cost: 0.1,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Wieldy'],
    weight: 4,
    category: 'common',
    description: 'A wooden quarterstaff for defensive combat.',
  },
};

/**
 * Martial Weapons
 * Require martial weapon proficiency (usually restricted by class)
 */
export const MARTIAL_WEAPONS: Record<string, Weapon> = {
  'Axe, Heavy': {
    name: 'Axe, Heavy',
    cost: 40,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: [],
    weight: 12,
    category: 'martial',
    description: 'A heavy two-handed battle axe for devastating melee strikes.',
  },
  'Bow, Horn': {
    name: 'Bow, Horn',
    cost: 40,
    damage: '+4',
    includesBaseStrength: true,
    size: 'H',
    range: '400\'',
    designations: ['Ranged'],
    weight: 6,
    category: 'martial',
    description: 'A powerful composite horn bow requiring great strength.',
    flatBonus: 4,
    limit: 4,
    requirement: 2,
  },
  'Bow, Wood': {
    name: 'Bow, Wood',
    cost: 20,
    damage: '+2',
    includesBaseStrength: true,
    size: 'H',
    range: '200\'',
    designations: ['Ranged'],
    weight: 4,
    category: 'martial',
    description: 'A standard wooden longbow with moderate power.',
    flatBonus: 2,
    limit: 1,
  },
  'Crossbow, Heavy': {
    name: 'Crossbow, Heavy',
    cost: 60,
    damage: '2d10',
    includesBaseStrength: false, // Crossbows do NOT include base strength
    size: 'H',
    range: '300\'',
    designations: ['Penetrate', 'Ranged', 'Reload (Str: 3)', 'Very Slow'],
    weight: 8,
    category: 'martial',
    description: 'A massive crossbow with extreme stopping power but very slow reload.',
  },
  'Flail': {
    name: 'Flail',
    cost: 15,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Crush'],
    weight: 10,
    category: 'martial',
    description: 'A chain weapon with a heavy striking head.',
  },
  'Hammer, Heavy': {
    name: 'Hammer, Heavy',
    cost: 30,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: ['Crush'],
    weight: 12,
    category: 'martial',
    description: 'A massive two-handed warhammer for crushing blows.',
  },
  'Lance': {
    name: 'Lance',
    cost: 30,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: ['Lengthy'],
    weight: 10,
    category: 'martial',
    description: 'A long cavalry weapon with extended reach.',
  },
  'Mace, Heavy': {
    name: 'Mace, Heavy',
    cost: 30,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: ['Crush'],
    weight: 12,
    category: 'martial',
    description: 'A heavy two-handed mace for armor-crushing strikes.',
  },
  'Polearm': {
    name: 'Polearm',
    cost: 50,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: ['Lengthy'],
    weight: 10,
    category: 'martial',
    description: 'A versatile pole weapon with extended reach.',
  },
  'Rondel': {
    name: 'Rondel',
    cost: 8,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '-',
    designations: ['Penetrate'],
    weight: 1,
    category: 'martial',
    description: 'A thin piercing dagger designed to penetrate armor gaps.',
  },
  'Sword': {
    name: 'Sword',
    cost: 15,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: [],
    weight: 4,
    category: 'martial',
    description: 'A standard one-handed sword for versatile combat.',
  },
  'Sword, Heavy': {
    name: 'Sword, Heavy',
    cost: 50,
    damage: '1d8',
    includesBaseStrength: true,
    size: 'H',
    range: '-',
    designations: [],
    weight: 8,
    category: 'martial',
    description: 'A large two-handed sword for powerful strikes.',
  },
};

/**
 * Specialty Weapons
 * Unique weapons with special properties and situational uses
 */
export const SPECIALTY_WEAPONS: Record<string, Weapon> = {
  'Blowgun': {
    name: 'Blowgun',
    cost: 5,
    damage: '+1',
    includesBaseStrength: true,
    size: 'M',
    range: '50\'',
    designations: ['Hurled'],
    weight: 2,
    category: 'specialty',
    description: 'A hollow tube for firing poisoned darts.',
    flatBonus: 1,
  },
  'Bolas': {
    name: 'Bolas',
    cost: 8,
    damage: 'n/a',
    includesBaseStrength: false,
    size: 'L',
    range: '50\'',
    designations: ['Hurled', 'Immobilize'],
    weight: 2,
    category: 'specialty',
    description: 'Weighted cords that tangle and immobilize targets.',
  },
  'Chain Weapon': {
    name: 'Chain Weapon',
    cost: 20,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Immobilize', 'Lengthy', 'Trip'],
    weight: 10,
    category: 'specialty',
    description: 'A chain with weights or blades for controlling opponents.',
  },
  'Garrote': {
    name: 'Garrote',
    cost: 1,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '-',
    designations: ['Incapacitate'],
    weight: 0,
    category: 'specialty',
    description: 'A strangling cord for silent takedowns.',
  },
  'Glaive': {
    name: 'Glaive',
    cost: 15,
    damage: '1d6',
    includesBaseStrength: true,
    size: 'L',
    range: '100\'',
    designations: ['Hurled', 'Returns'],
    weight: 1,
    category: 'specialty',
    description: 'A throwing blade that returns to the wielder.',
  },
  'Lasso': {
    name: 'Lasso',
    cost: 1,
    damage: 'n/a',
    includesBaseStrength: false,
    size: 'M',
    range: '-',
    designations: ['Immobilize', 'Trip'],
    weight: 2,
    category: 'specialty',
    description: 'A looped rope for catching and restraining targets.',
  },
  'Net': {
    name: 'Net',
    cost: 3,
    damage: 'n/a',
    includesBaseStrength: false,
    size: 'M',
    range: '50\'',
    designations: ['Hurled', 'Immobilize'],
    weight: 6,
    category: 'specialty',
    description: 'A weighted net for entangling opponents.',
  },
  'Sap': {
    name: 'Sap',
    cost: 0.8,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'L',
    range: '-',
    designations: ['Concuss'],
    weight: 2,
    category: 'specialty',
    description: 'A small weighted club for knocking targets unconscious.',
  },
  'Whip': {
    name: 'Whip',
    cost: 3,
    damage: '1d4',
    includesBaseStrength: true,
    size: 'M',
    range: '-',
    designations: ['Immobilize', 'Lengthy', 'Trip'],
    weight: 2,
    category: 'specialty',
    description: 'A flexible leather whip for controlling and disarming foes.',
  },
};

/**
 * Get all weapons by category
 */
export function getWeaponsByCategory(category: WeaponCategory): Weapon[] {
  const weaponMap = {
    common: COMMON_WEAPONS,
    martial: MARTIAL_WEAPONS,
    specialty: SPECIALTY_WEAPONS,
  };

  return Object.values(weaponMap[category]).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get weapon by name (searches all categories)
 */
export function getWeaponByName(name: string): Weapon | undefined {
  const allWeapons = {
    ...COMMON_WEAPONS,
    ...MARTIAL_WEAPONS,
    ...SPECIALTY_WEAPONS,
  };

  return allWeapons[name];
}

/**
 * Calculate total weapon damage including base strength
 * @param weapon - The weapon being used
 * @param strModifier - Character's STR modifier
 * @returns Formatted damage string (e.g., "1d6+1d8" for base str + weapon)
 */
export function calculateWeaponDamage(weapon: Weapon, _strModifier: number): string {
  if (!weapon.includesBaseStrength) {
    return weapon.damage;
  }

  // Import from equipmentReference to get base damage
  // For now, we'll return a placeholder format
  return `Base STR + ${weapon.damage}`;
}
