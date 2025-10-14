import { useMemo } from 'react';
import { calculateDerivedStats, getRelevantDerivedStats } from '../utils/derivedStats';
import type { AttributeAllocation } from '../utils/pdfFiller';
import './DerivedStatsDisplay.css';

interface DerivedStatsDisplayProps {
  className: string;
  level: number;
  raceName: string;
  selectedPerks: string[];
  attributes: AttributeAllocation[];
}

/**
 * Displays calculated derived stats (Aspects) with tooltips showing the breakdown
 * Shows Defense, Daring, Stamina, and class-specific stats (Mana for Mages, Favor for Acolytes)
 */
export function DerivedStatsDisplay({
  className,
  level,
  raceName,
  selectedPerks,
  attributes,
}: DerivedStatsDisplayProps) {
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

  // Helper to format stat breakdown for tooltip
  const formatBreakdown = (statName: string): string => {
    switch (statName) {
      case 'defense':
        return `DEX: ${breakdown.defense.dex >= 0 ? '+' : ''}${breakdown.defense.dex}\n` +
               (breakdown.defense.perkBonus !== 0 ? `Perk Bonus: ${breakdown.defense.perkBonus >= 0 ? '+' : ''}${breakdown.defense.perkBonus}\n` : '') +
               `Total: ${breakdown.defense.total}`;
      case 'daring':
        return `VAL: ${breakdown.daring.val >= 0 ? '+' : ''}${breakdown.daring.val}\n` +
               (breakdown.daring.perkBonus !== 0 ? `Perk Bonus: ${breakdown.daring.perkBonus >= 0 ? '+' : ''}${breakdown.daring.perkBonus}\n` : '') +
               `Total: ${breakdown.daring.total}`;
      case 'stamina':
        return `Class Base: ${breakdown.stamina.classBase}\n` +
               `CON: ${breakdown.stamina.con >= 0 ? '+' : ''}${breakdown.stamina.con}\n` +
               (breakdown.stamina.perkBonus !== 0 ? `Perk Bonus: ${breakdown.stamina.perkBonus >= 0 ? '+' : ''}${breakdown.stamina.perkBonus}\n` : '') +
               `Total: ${breakdown.stamina.total}`;
      case 'mana':
        return `Class Base: ${breakdown.mana.classBase}\n` +
               `STR: ${breakdown.mana.str >= 0 ? '+' : ''}${breakdown.mana.str}\n` +
               (breakdown.mana.perkBonus !== 0 ? `Perk Bonus: ${breakdown.mana.perkBonus >= 0 ? '+' : ''}${breakdown.mana.perkBonus}\n` : '') +
               `Total: ${breakdown.mana.total}`;
      case 'favor':
        return `Class Base: ${breakdown.favor.classBase}\n` +
               `INS: ${breakdown.favor.ins >= 0 ? '+' : ''}${breakdown.favor.ins}\n` +
               (breakdown.favor.perkBonus !== 0 ? `Perk Bonus: ${breakdown.favor.perkBonus >= 0 ? '+' : ''}${breakdown.favor.perkBonus}\n` : '') +
               `Total: ${breakdown.favor.total}`;
      default:
        return '';
    }
  };

  // Helper to get stat display label
  const getStatLabel = (statName: string): string => {
    return statName.charAt(0).toUpperCase() + statName.slice(1);
  };

  // Helper to get stat value
  const getStatValue = (statName: string): number => {
    return stats[statName as keyof typeof stats];
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

  return (
    <div className="derived-stats-display">
      <h3>Derived Stats (Aspects)</h3>
      <div className="stats-grid">
        {relevantStats.map(statName => (
          <div
            key={statName}
            className={`stat-item ${hasPerkBonus(statName) ? 'has-perk-bonus' : ''}`}
            title={formatBreakdown(statName)}
          >
            <span className="stat-label">{getStatLabel(statName)}:</span>
            <span className="stat-value">{getStatValue(statName)}</span>
            {hasPerkBonus(statName) && (
              <span className="perk-indicator" title="Includes racial perk bonus">★</span>
            )}
          </div>
        ))}
      </div>
      <p className="stats-hint">Hover over a stat to see the breakdown</p>
    </div>
  );
}
