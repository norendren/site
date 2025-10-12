import { useMemo } from 'react';
import type { AttributeAllocation } from '../utils/pdfFiller';
import './AttributeAllocator.css';

interface AttributeAllocatorProps {
  attributePool: number; // 0, 2, or 4
  allocatedAttributes: AttributeAllocation[];
  onAttributesChange: (attributes: AttributeAllocation[]) => void;
  onPoolChange: (pool: number) => void;
}

const ATTRIBUTE_NAMES = ['CON', 'DEX', 'INS', 'KNO', 'STR', 'VAL'] as const;
const ATTRIBUTE_FULL_NAMES: Record<typeof ATTRIBUTE_NAMES[number], string> = {
  CON: 'Constitution',
  DEX: 'Dexterity',
  INS: 'Instinct',
  KNO: 'Knowledge',
  STR: 'Strength',
  VAL: 'Valor',
};

const POOL_OPTIONS = [
  { value: 0, label: 'Commoners' },
  { value: 2, label: 'Young Heroes' },
  { value: 4, label: 'Heroes' },
];

export function AttributeAllocator({
  attributePool,
  allocatedAttributes,
  onAttributesChange,
  onPoolChange,
}: AttributeAllocatorProps) {
  // Calculate total spent points
  const totalAllocated = useMemo(() => {
    return allocatedAttributes.reduce((sum, attr) => sum + attr.points, 0);
  }, [allocatedAttributes]);

  const remaining = attributePool - totalAllocated;

  // Get current points for an attribute
  const getAttributePoints = (attrName: string): number => {
    const attr = allocatedAttributes.find(a => a.name === attrName);
    return attr?.points || 0;
  };

  // Set attribute points
  const setAttributePoints = (attrName: string, points: number) => {
    // Clamp between -3 and +3
    const clampedPoints = Math.max(-3, Math.min(3, points));

    const newAttributes = allocatedAttributes.filter(a => a.name !== attrName);

    // Always add the attribute even if 0 to maintain state
    newAttributes.push({ name: attrName, points: clampedPoints });

    onAttributesChange(newAttributes);
  };

  // Increment attribute (add 1 point)
  const incrementAttribute = (attrName: string) => {
    const currentPoints = getAttributePoints(attrName);

    // Can't go above +3
    if (currentPoints >= 3) return;

    // Check if we have points available
    if (remaining <= 0) return;

    setAttributePoints(attrName, currentPoints + 1);
  };

  // Decrement attribute (remove 1 point)
  const decrementAttribute = (attrName: string) => {
    const currentPoints = getAttributePoints(attrName);

    // Can't go below -3
    if (currentPoints <= -3) return;

    setAttributePoints(attrName, currentPoints - 1);
  };

  // Format the points display
  const formatPoints = (points: number): string => {
    if (points === 0) return '0';
    if (points > 0) return `+${points}`;
    return `${points}`;
  };

  return (
    <div className="attribute-allocator">
      <div className="attribute-header">
        <h3>Attributes</h3>
        <div className="pool-selector">
          <label htmlFor="attribute-pool">Campaign Type:</label>
          <select
            id="attribute-pool"
            value={attributePool}
            onChange={(e) => onPoolChange(Number(e.target.value))}
          >
            {POOL_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value > 0 ? `+${option.value}` : option.value})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="attribute-pool-display">
        <div className={`pool-status ${remaining < 0 ? 'over' : remaining > 0 ? 'under' : 'exact'}`}>
          <span className="remaining">{remaining}</span>
          <span className="separator">/</span>
          <span className="total">{attributePool}</span>
          <span className="label">Points Remaining</span>
        </div>
        {remaining !== 0 && (
          <div className="pool-warning">
            {remaining > 0 ? (
              <span className="warning-text">⚠ You have {remaining} unspent point{remaining !== 1 ? 's' : ''}</span>
            ) : (
              <span className="error-text">❌ You are over by {Math.abs(remaining)} point{Math.abs(remaining) !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}
      </div>

      <div className="attribute-list">
        {ATTRIBUTE_NAMES.map((attrName) => {
          const points = getAttributePoints(attrName);
          const canIncrement = points < 3 && remaining > 0;
          const canDecrement = points > -3;

          return (
            <div key={attrName} className="attribute-row">
              <div className="attribute-name">
                <span className="attr-abbrev">{attrName}</span>
                <span className="attr-full">{ATTRIBUTE_FULL_NAMES[attrName]}</span>
              </div>

              <div className="attribute-controls">
                <button
                  className="attr-btn decrement"
                  onClick={() => decrementAttribute(attrName)}
                  disabled={!canDecrement}
                  aria-label={`Decrease ${attrName}`}
                  title="Decrease attribute"
                >
                  −
                </button>

                <div className="attribute-value">
                  <span className={`value-display ${points > 0 ? 'positive' : points < 0 ? 'negative' : 'zero'}`}>
                    {formatPoints(points)}
                  </span>
                  <span className="range-hint">(-3 to +3)</span>
                </div>

                <button
                  className="attr-btn increment"
                  onClick={() => incrementAttribute(attrName)}
                  disabled={!canIncrement}
                  aria-label={`Increase ${attrName}`}
                  title="Increase attribute"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="attribute-help">
        <p>
          <strong>Note:</strong> Allocate your attribute points so the total equals your pool.
          Each attribute can range from -3 (far below average) to +3 (far above average).
        </p>
      </div>
    </div>
  );
}
