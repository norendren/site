/**
 * WarriorStylesSelector - Interactive selector for Warrior Combat Styles
 * Warriors start with 1 style and gain +1 every odd level
 * 5 styles (Collaborative, Deliberate, Ferocious, Martial, Strategic)
 * Each style has 3 tiers (Apprentice, Journeyman, Master)
 */

import { useState } from 'react';
import {
  calculateWarriorStyleCount,
  WARRIOR_COMBAT_STYLES,
  COMBAT_STYLE_TIERS,
  COMBAT_STYLE_DESCRIPTIONS,
  getNextStyleTier,
  type WarriorStyleSelection,
  type WarriorCombatStyle,
  type CombatStyleTier,
} from '../utils/classSpecialties';
import './ClassSpecialty.css';

interface WarriorStylesSelectorProps {
  level: number;
  styles: WarriorStyleSelection[];
  onChange: (styles: WarriorStyleSelection[]) => void;
}

export function WarriorStylesSelector({
  level,
  styles,
  onChange,
}: WarriorStylesSelectorProps) {
  const maxStyles = calculateWarriorStyleCount(level);
  const [expandedStyle, setExpandedStyle] = useState<number | null>(null);

  const addStyle = () => {
    if (styles.length >= maxStyles) return;

    const newStyle: WarriorStyleSelection = {
      style: 'Collaborative',
      tier: 'Apprentice',
    };
    onChange([...styles, newStyle]);
  };

  const removeStyle = (index: number) => {
    const newStyles = styles.filter((_, i) => i !== index);
    onChange(newStyles);
    if (expandedStyle === index) {
      setExpandedStyle(null);
    }
  };

  const updateStyle = (index: number, updates: Partial<WarriorStyleSelection>) => {
    const newStyles = [...styles];
    newStyles[index] = { ...newStyles[index], ...updates };
    onChange(newStyles);
  };

  const upgradeStyle = (index: number) => {
    const currentStyle = styles[index];
    const nextTier = getNextStyleTier(currentStyle.tier);
    if (nextTier) {
      updateStyle(index, { tier: nextTier });
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedStyle(expandedStyle === index ? null : index);
  };

  return (
    <div className="class-specialty-container">
      <div className="specialty-header">
        <h3>Warrior Combat Styles</h3>
        <p className="specialty-description">
          Warriors master different combat styles, each reflecting a unique approach to battle.
          As you advance, you can deepen your expertise in styles you've already learned or adopt new ones.
        </p>
      </div>

      <div className="specialty-count-display">
        <span className="count-label">Combat Styles Selected:</span>
        <span className={`count-value ${styles.length === maxStyles ? 'complete' : ''}`}>
          {styles.length} / {maxStyles}
        </span>
      </div>

      <div className="styles-list">
        {styles.map((styleSelection, index) => {
          const isExpanded = expandedStyle === index;
          const canUpgrade = styleSelection.tier !== 'Master';

          return (
            <div key={index} className={`style-card ${isExpanded ? 'expanded' : ''}`}>
              <div className="style-card-header" onClick={() => toggleExpanded(index)}>
                <div className="style-title">
                  <h4>{styleSelection.style}</h4>
                  <span className={`tier-badge tier-${styleSelection.tier.toLowerCase()}`}>
                    {styleSelection.tier}
                  </span>
                </div>
                <div className="style-actions">
                  <button
                    type="button"
                    className="expand-button"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="style-card-body">
                  <div className="style-selector">
                    <label htmlFor={`style-${index}`}>Combat Style:</label>
                    <select
                      id={`style-${index}`}
                      value={styleSelection.style}
                      onChange={(e) =>
                        updateStyle(index, {
                          style: e.target.value as WarriorCombatStyle,
                          tier: 'Apprentice', // Reset to Apprentice when changing style
                        })
                      }
                    >
                      {WARRIOR_COMBAT_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="tier-progression">
                    <h5>Current Tier Abilities:</h5>
                    <div className="tier-description">
                      {COMBAT_STYLE_DESCRIPTIONS[styleSelection.style][styleSelection.tier]}
                    </div>

                    {canUpgrade && (
                      <button
                        type="button"
                        className="upgrade-button"
                        onClick={() => upgradeStyle(index)}
                      >
                        Upgrade to {getNextStyleTier(styleSelection.tier)}
                      </button>
                    )}

                    {styleSelection.tier === 'Master' && (
                      <div className="mastery-badge">
                        ✓ Mastered
                      </div>
                    )}
                  </div>

                  <div className="all-tiers-preview">
                    <h5>All Tier Abilities:</h5>
                    {COMBAT_STYLE_TIERS.map((tier) => (
                      <div
                        key={tier}
                        className={`tier-preview ${tier === styleSelection.tier ? 'current-tier' : ''}`}
                      >
                        <strong>{tier}:</strong>{' '}
                        {COMBAT_STYLE_DESCRIPTIONS[styleSelection.style][tier]}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeStyle(index)}
                  >
                    Remove This Style
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {styles.length < maxStyles && (
        <button
          type="button"
          className="add-style-button"
          onClick={addStyle}
        >
          + Add Combat Style ({styles.length}/{maxStyles})
        </button>
      )}

      <div className="specialty-info">
        <h4>Combat Style System</h4>
        <ul>
          <li>You start with <strong>1</strong> combat style at 1st level</li>
          <li>Gain <strong>+1 style every odd level</strong> (3rd, 5th, 7th, 9th)</li>
          <li>Each selection can be a new style at <strong>Apprentice</strong> tier, or an upgrade to an existing style</li>
          <li>Styles progress through <strong>Apprentice → Journeyman → Master</strong></li>
          <li>At level {level}, you can have {maxStyles} style selections</li>
        </ul>

        <h4>Style Summaries</h4>
        <div className="style-summaries">
          <div><strong>Collaborative:</strong> Synergize with allies' critical hits and kills</div>
          <div><strong>Deliberate:</strong> Protect allies and maintain defense when surprised</div>
          <div><strong>Ferocious:</strong> Increase ally Daring, resist being outnumbered, regain Fatigue</div>
          <div><strong>Martial:</strong> Boost ally damage when fighting together</div>
          <div><strong>Strategic:</strong> Share Stamina and gain advantages in superior positions</div>
        </div>
      </div>
    </div>
  );
}
