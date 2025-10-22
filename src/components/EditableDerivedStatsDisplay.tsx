import { useMemo } from 'react';
import { calculateDerivedStats, getRelevantDerivedStats } from '../utils/derivedStats';
import type { AttributeAllocation } from '../utils/pdfFiller';
import './EditableDerivedStatsDisplay.css';

interface EditableDerivedStatsDisplayProps {
  className: string;
  level: number;
  raceName: string;
  selectedPerks: string[];
  attributes: AttributeAllocation[];
  manualOverrides?: {
    defense?: number;
    daring?: number;
    stamina?: number;
    mana?: number;
    favor?: number;
  };
  onOverrideChange: (statName: string, value: number | undefined) => void;
}

/**
 * Editable version of DerivedStatsDisplay that allows manual overrides
 * Shows calculated value + breakdown, with editable input field
 */
export function EditableDerivedStatsDisplay({
  className,
  level,
  raceName,
  selectedPerks,
  attributes,
  manualOverrides = {},
  onOverrideChange,
}: EditableDerivedStatsDisplayProps) {
  // Convert attributes array to Map for calculation
  const attributeMap = useMemo(() => {
    const map = new Map<string, number>();
    attributes.forEach(attr => map.set(attr.name, attr.points));
    return map;
  }, [attributes]);

  // Calculate derived stats
  const { stats, breakdown } = useMemo(
    () => calculateDerivedStats(className, level, raceName, selectedPerks, attributeMap),
    [className, level, raceName, selectedPerks, attributeMap]
  );

  // Get relevant stats for this class
  const relevantStats = useMemo(() => getRelevantDerivedStats(className), [className]);

  // Helper to format stat breakdown for display
  const formatBreakdown = (statName: string): string => {
    switch (statName) {
      case 'defense':
        return `Base: DEX ${breakdown.defense.dex >= 0 ? '+' : ''}${breakdown.defense.dex}` +
               (breakdown.defense.perkBonus !== 0 ? ` + Perks ${breakdown.defense.perkBonus >= 0 ? '+' : ''}${breakdown.defense.perkBonus}` : '');
      case 'daring':
        return `Base: VAL ${breakdown.daring.val >= 0 ? '+' : ''}${breakdown.daring.val}` +
               (breakdown.daring.perkBonus !== 0 ? ` + Perks ${breakdown.daring.perkBonus >= 0 ? '+' : ''}${breakdown.daring.perkBonus}` : '');
      case 'stamina':
        return `Base: ${breakdown.stamina.classBase} + CON ${breakdown.stamina.con >= 0 ? '+' : ''}${breakdown.stamina.con}` +
               (breakdown.stamina.perkBonus !== 0 ? ` + Perks ${breakdown.stamina.perkBonus >= 0 ? '+' : ''}${breakdown.stamina.perkBonus}` : '');
      case 'mana':
        return `Base: ${breakdown.mana.classBase} + STR ${breakdown.mana.str >= 0 ? '+' : ''}${breakdown.mana.str}` +
               (breakdown.mana.perkBonus !== 0 ? ` + Perks ${breakdown.mana.perkBonus >= 0 ? '+' : ''}${breakdown.mana.perkBonus}` : '');
      case 'favor':
        return `Base: ${breakdown.favor.classBase} + INS ${breakdown.favor.ins >= 0 ? '+' : ''}${breakdown.favor.ins}` +
               (breakdown.favor.perkBonus !== 0 ? ` + Perks ${breakdown.favor.perkBonus >= 0 ? '+' : ''}${breakdown.favor.perkBonus}` : '');
      default:
        return '';
    }
  };

  // Helper to get stat display label
  const getStatLabel = (statName: string): string => {
    return statName.charAt(0).toUpperCase() + statName.slice(1);
  };

  // Helper to get stat value (use override if exists, otherwise calculated)
  const getStatValue = (statName: string): number => {
    const override = manualOverrides[statName as keyof typeof manualOverrides];
    return override ?? stats[statName as keyof typeof stats];
  };

  // Helper to get calculated value
  const getCalculatedValue = (statName: string): number => {
    return stats[statName as keyof typeof stats];
  };

  // Helper to check if value is manually overridden
  const isOverridden = (statName: string): boolean => {
    return manualOverrides[statName as keyof typeof manualOverrides] !== undefined;
  };

  // Helper to check if there's a perk bonus for this stat
  const hasPerkBonus = (statName: string): boolean => {
    switch (statName) {
      case 'defense':
        return breakdown.defense.perkBonus !== 0;
      case 'daring':
        return breakdown.daring.perkBonus !== 0;
      case 'stamina':
        return breakdown.stamina.perkBonus !== 0;
      case 'mana':
        return breakdown.mana.perkBonus !== 0;
      case 'favor':
        return breakdown.favor.perkBonus !== 0;
      default:
        return false;
    }
  };

  const handleInputChange = (statName: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (value === '' || isNaN(numValue)) {
      // Reset to calculated value if empty
      onOverrideChange(statName, undefined);
    } else {
      onOverrideChange(statName, numValue);
    }
  };

  return (
    <div className="editable-derived-stats-display">
      <h3>Derived Stats (Aspects)</h3>
      <div className="editable-stats-grid">
        {relevantStats.map(statName => (
          <div
            key={statName}
            className={`editable-stat-item ${hasPerkBonus(statName) ? 'has-perk-bonus' : ''} ${isOverridden(statName) ? 'is-overridden' : ''}`}
          >
            <div className="stat-header">
              <label htmlFor={`stat-${statName}`} className="stat-label">
                {getStatLabel(statName)}:
              </label>
              {hasPerkBonus(statName) && (
                <span className="perk-indicator" title="Includes racial perk bonus">★</span>
              )}
            </div>
            <input
              id={`stat-${statName}`}
              type="number"
              className="stat-input"
              value={getStatValue(statName)}
              onChange={(e) => handleInputChange(statName, e.target.value)}
              min={0}
            />
            <div className="stat-breakdown">
              {isOverridden(statName) ? (
                <span className="override-note">
                  Manual override (Auto: {getCalculatedValue(statName)})
                </span>
              ) : (
                <span className="auto-calc">
                  Auto: {formatBreakdown(statName)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="stats-hint">
        Values are auto-calculated. You can override any value manually to account for abilities.
      </p>
    </div>
  );
}
