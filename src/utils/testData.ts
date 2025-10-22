/**
 * Test Data Fixtures for Development
 *
 * Pre-configured character data for rapid UI testing
 * Use these to quickly populate forms and test PDF generation
 */

import type { BasicCharacterData } from './pdfFiller';
import type {
  ArcaneAptitudeAllocation,
  RogueSpecialtySelection,
  WarriorStyleSelection,
} from './classSpecialties';

// ===== Complete Test Characters =====

export const TEST_WARRIOR: BasicCharacterData = {
  characterName: 'Test Warrior',
  class: 'Warrior',
  level: '3',
  race: 'Human',
  house: 'Dragonhelm',
  faith: 'The Old Faith',
  age: '25',
  racialPerks: ['Versatile', 'Sharp'],
  talents: [
    { name: 'Athletics', points: 3 },
    { name: 'Endurance', points: 2 },
    { name: 'Combat Rest', points: 2 },
    { name: 'Exertion', points: 2 },
    { name: 'Notice', points: 2 },
  ],
  attributes: [
    { name: 'STR', points: 2 },
    { name: 'CON', points: 1 },
    { name: 'DEX', points: 0 },
    { name: 'VAL', points: 1 },
    { name: 'INS', points: 0 },
    { name: 'KNO', points: 0 },
  ],
  warriorStyles: [
    { style: 'Ferocious', tier: 'Journeyman' },
    { style: 'Martial', tier: 'Apprentice' },
  ] as WarriorStyleSelection[],
};

export const TEST_MAGE: BasicCharacterData = {
  characterName: 'Test Mage',
  class: 'Mage',
  level: '2',
  race: 'Elf',
  house: 'Thornveil',
  faith: 'The Old Faith',
  age: '120',
  racialPerks: ['Keen Senses', 'Uncanny'],
  talents: [
    { name: 'Hermetics', points: 4 },
    { name: 'Scholar', points: 3 },
    { name: 'Concentration', points: 2 },
    { name: 'Notice', points: 2 },
  ],
  attributes: [
    { name: 'KNO', points: 2 },
    { name: 'INS', points: 1 },
    { name: 'DEX', points: 0 },
    { name: 'CON', points: 0 },
    { name: 'STR', points: -1 },
    { name: 'VAL', points: 0 },
  ],
  arcaneAllocations: [
    { art: 'Fire', points: 4 },
    { art: 'Air', points: 3 },
    { art: 'Cosmos', points: 2 },
  ] as ArcaneAptitudeAllocation[],
};

export const TEST_ROGUE: BasicCharacterData = {
  characterName: 'Test Rogue',
  class: 'Rogue',
  level: '2',
  race: 'Human',
  house: 'Cerrak',
  faith: 'The New Faith',
  age: '30',
  racialPerks: ['Light-Footed', 'Sharp Senses'],
  talents: [
    { name: 'Stealth', points: 4 },
    { name: 'Thievery', points: 3 },
    { name: 'Notice', points: 3 },
    { name: 'Athletics', points: 2 },
  ],
  attributes: [
    { name: 'DEX', points: 2 },
    { name: 'INS', points: 1 },
    { name: 'VAL', points: 0 },
    { name: 'CON', points: 0 },
    { name: 'STR', points: 0 },
    { name: 'KNO', points: 0 },
  ],
  rogueSpecialties: [
    { type: 'Talent' },
    { type: 'Stamina' },
    { type: 'Arcane', arcaneArt: 'Air' },
  ] as RogueSpecialtySelection[],
};

export const TEST_ACOLYTE: BasicCharacterData = {
  characterName: 'Test Acolyte',
  class: 'Acolyte',
  level: '3',
  race: 'Dwarf',
  house: 'Ironforge',
  faith: 'The Old Faith',
  age: '75',
  racialPerks: ['Resilient', 'Keen Eye'],
  talents: [
    { name: 'Faith', points: 4 },
    { name: 'Endurance', points: 3 },
    { name: 'Discipline', points: 2 },
    { name: 'Notice', points: 2 },
  ],
  attributes: [
    { name: 'VAL', points: 2 },
    { name: 'CON', points: 1 },
    { name: 'INS', points: 1 },
    { name: 'DEX', points: 0 },
    { name: 'STR', points: 0 },
    { name: 'KNO', points: 0 },
  ],
};

// ===== Partial Test Data (for testing specific sections) =====

export const MINIMAL_CHARACTER: BasicCharacterData = {
  characterName: 'Quick Test',
  class: 'Warrior',
  level: '1',
  race: 'Human',
  house: 'Dragonhelm',
  faith: 'The Old Faith',
  age: '20',
  racialPerks: ['Versatile', 'Sharp'],
  talents: [],
  attributes: [],
};

// ===== Helper Functions =====

/**
 * Get test character by class name
 */
export function getTestCharacterByClass(className: string): BasicCharacterData {
  switch (className) {
    case 'Warrior':
      return TEST_WARRIOR;
    case 'Mage':
      return TEST_MAGE;
    case 'Rogue':
      return TEST_ROGUE;
    case 'Acolyte':
      return TEST_ACOLYTE;
    default:
      return MINIMAL_CHARACTER;
  }
}

/**
 * Get all test characters
 */
export function getAllTestCharacters(): Record<string, BasicCharacterData> {
  return {
    warrior: TEST_WARRIOR,
    mage: TEST_MAGE,
    rogue: TEST_ROGUE,
    acolyte: TEST_ACOLYTE,
    minimal: MINIMAL_CHARACTER,
  };
}
