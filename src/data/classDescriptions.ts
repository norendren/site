/**
 * Class descriptions for the Athia RPG Character Generator
 * Provides educational content for new players
 */

export interface ClassDescription {
  name: string;
  shortDescription: string;
  longDescription: string;
  playstyle: string;
  strengths: string[];
  weaknesses: string[];
  idealFor: string;
  startingTalentPoints: number;
  icon: string;
}

export const CLASS_DESCRIPTIONS: Record<string, ClassDescription> = {
  Acolyte: {
    name: 'Acolyte',
    shortDescription: 'Divine spellcasters and healers devoted to their faith. Strong support role with healing magic.',
    longDescription: 'Acolytes are devoted servants of the divine, channeling the power of their gods to heal allies, protect the innocent, and smite evil. They combine spiritual devotion with practical combat skills, making them versatile party members who excel at keeping their companions alive while still contributing to battle.',
    playstyle: 'Support and healing focused with some offensive capabilities',
    strengths: [
      'Powerful healing abilities',
      'Divine magic for protection and buffs',
      'Good talent point progression (10 at level 1)',
      'Can wear medium armor',
    ],
    weaknesses: [
      'Lower offensive damage than martial classes',
      'Dependent on deity and faith choices',
      'Limited ranged combat options',
    ],
    idealFor: 'Players who enjoy supporting their team, strategic play, and have a strong character concept tied to faith or religion',
    startingTalentPoints: 10,
    icon: '🛐',
  },

  Mage: {
    name: 'Mage',
    shortDescription: 'Arcane spellcasters who wield powerful magic. High damage but fragile in direct combat.',
    longDescription: 'Mages are masters of the arcane arts, studying ancient tomes and practicing complex rituals to bend reality to their will. They command devastating offensive spells, can manipulate the battlefield with illusions and transmutations, and possess knowledge of magical lore. However, their focus on mental pursuits leaves them physically vulnerable.',
    playstyle: 'High burst damage from range, control and utility magic',
    strengths: [
      'Highest magical damage potential',
      'Wide variety of spell options',
      'Excellent crowd control abilities',
      'Strong at range',
    ],
    weaknesses: [
      'Very low health and defense',
      'Limited armor options',
      'Vulnerable in melee combat',
      'Glass cannon - high risk, high reward',
    ],
    idealFor: 'Players who enjoy powerful spellcasting, tactical positioning, and being the primary damage dealer from a safe distance',
    startingTalentPoints: 10,
    icon: '🔮',
  },

  Rogue: {
    name: 'Rogue',
    shortDescription: 'Stealthy, skillful characters who rely on cunning and agility. Masters of skills and precision strikes.',
    longDescription: 'Rogues are experts in stealth, subterfuge, and precision. They excel at skills more than any other class, can disable traps, pick locks, and strike from the shadows with devastating sneak attacks. Rogues thrive when they can use their environment and cunning to gain advantages, avoiding direct confrontation in favor of clever tactics.',
    playstyle: 'Stealth, skills, and precision damage from advantageous positions',
    strengths: [
      'Highest number of talent points (15 at level 1)',
      'Excellent at all skill-based challenges',
      'Powerful sneak attack damage',
      'Best at stealth and infiltration',
    ],
    weaknesses: [
      'Lower health than martial classes',
      'Dependent on positioning for maximum damage',
      'Limited options in direct combat',
      'Light armor only',
    ],
    idealFor: 'Players who enjoy skill challenges, stealth gameplay, and outsmarting enemies rather than overpowering them',
    startingTalentPoints: 15,
    icon: '🗡️',
  },

  Warrior: {
    name: 'Warrior',
    shortDescription: 'Martial combatants trained in weapons and armor. Tough, reliable damage dealers and defenders.',
    longDescription: 'Warriors are masters of martial combat, trained extensively in the use of weapons and armor. They form the backbone of any adventuring party, capable of dealing consistent damage, absorbing punishment, and protecting their allies. Warriors are versatile combatants who can adapt to many situations, whether charging into battle or holding the line against overwhelming odds.',
    playstyle: 'Direct melee combat, high durability, consistent damage',
    strengths: [
      'Highest health and durability',
      'Can wear all armor types',
      'Consistent reliable damage',
      'Multiple combat style options',
    ],
    weaknesses: [
      'Limited magical abilities',
      'Less versatile outside of combat',
      'Primarily melee-focused',
      'Fewer talent points than Rogue',
    ],
    idealFor: 'Players who enjoy straightforward combat, being the party tank, and reliable performance in battles',
    startingTalentPoints: 10,
    icon: '⚔️',
  },
};

/**
 * Get class description by name
 */
export function getClassDescription(className: string): ClassDescription | undefined {
  return CLASS_DESCRIPTIONS[className];
}

/**
 * Get just the short description for quick reference
 */
export function getClassShortDescription(className: string): string {
  const classInfo = CLASS_DESCRIPTIONS[className];
  return classInfo?.shortDescription || '';
}
