/**
 * Athia RPG System Constants
 * Based on Athia RPG Core Rulebook
 */

// Classes from the Athia RPG (Page 138)
export const CLASSES = [
  'Acolyte',
  'Mage',
  'Rogue',
  'Warrior',
] as const;

// Races from the Athia RPG (Page 116)
export const RACES = [
  'Human',
  'Bantam',
  'Dwarf',
  'Elf',
  'Ferox',
  'Goblin',
  'Orc',
] as const;

// The Great Houses of Athia (Page 39)
export const HOUSES = [
  'Asos',
  'Blayth',
  'Cerrak',
  'Draur',
  'Lloar',
  'Onin',
  'Thercer',
] as const;

// The True Gods of Athia (Page 62)
export const FAITHS = [
  'None',
  'Erebos',
  'Ilios',
  'Selene',
  'The Triad',
] as const;

export type Class = typeof CLASSES[number];
export type Race = typeof RACES[number];
export type House = typeof HOUSES[number];
export type Faith = typeof FAITHS[number];
