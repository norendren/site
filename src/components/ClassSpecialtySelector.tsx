/**
 * ClassSpecialtySelector - Routes to the appropriate class-specific specialty component
 * Shows different UI based on character class:
 * - Acolyte: Bless display (auto-calculated, read-only)
 * - Mage: Arcane Aptitude allocator (interactive)
 * - Rogue: Specialty selector (interactive)
 * - Warrior: Combat Style selector (interactive)
 */

import { AcolyteBlessDisplay } from './AcolyteBlessDisplay';
import { MageArcaneAllocator } from './MageArcaneAllocator';
import { RogueSpecialtiesSelector } from './RogueSpecialtiesSelector';
import { WarriorStylesSelector } from './WarriorStylesSelector';
import type {
  ArcaneAptitudeAllocation,
  RogueSpecialtySelection,
  WarriorStyleSelection,
} from '../utils/classSpecialties';

interface ClassSpecialtySelectorProps {
  className: string;
  level: number;
  // Mage-specific
  arcaneAllocations?: ArcaneAptitudeAllocation[];
  onArcaneChange?: (allocations: ArcaneAptitudeAllocation[]) => void;
  // Rogue-specific
  rogueSpecialties?: RogueSpecialtySelection[];
  onRogueSpecialtiesChange?: (specialties: RogueSpecialtySelection[]) => void;
  // Warrior-specific
  warriorStyles?: WarriorStyleSelection[];
  onWarriorStylesChange?: (styles: WarriorStyleSelection[]) => void;
}

export function ClassSpecialtySelector({
  className,
  level,
  arcaneAllocations = [],
  onArcaneChange,
  rogueSpecialties = [],
  onRogueSpecialtiesChange,
  warriorStyles = [],
  onWarriorStylesChange,
}: ClassSpecialtySelectorProps) {
  // Route to appropriate component based on class
  switch (className) {
    case 'Acolyte':
      return <AcolyteBlessDisplay level={level} />;

    case 'Mage':
      return (
        <MageArcaneAllocator
          level={level}
          allocations={arcaneAllocations}
          onChange={onArcaneChange || (() => {})}
        />
      );

    case 'Rogue':
      return (
        <RogueSpecialtiesSelector
          level={level}
          specialties={rogueSpecialties}
          onChange={onRogueSpecialtiesChange || (() => {})}
        />
      );

    case 'Warrior':
      return (
        <WarriorStylesSelector
          level={level}
          styles={warriorStyles}
          onChange={onWarriorStylesChange || (() => {})}
        />
      );

    default:
      return (
        <div className="class-specialty-error">
          <p>No class-specific specialties available for {className || 'this class'}.</p>
          <p className="help-text">Please select a valid class (Acolyte, Mage, Rogue, or Warrior).</p>
        </div>
      );
  }
}
