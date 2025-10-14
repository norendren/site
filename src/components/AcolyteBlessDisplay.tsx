/**
 * AcolyteBlessDisplay - Shows the calculated Bless value for Acolytes
 * Bless is auto-calculated based on level (1 + floor((level-1)/2))
 * This is a read-only display component
 */

import { calculateAcolyteBless } from '../utils/classSpecialties';
import './ClassSpecialty.css';

interface AcolyteBlessDisplayProps {
  level: number;
}

export function AcolyteBlessDisplay({ level }: AcolyteBlessDisplayProps) {
  const blessValue = calculateAcolyteBless(level);

  return (
    <div className="class-specialty-container">
      <div className="specialty-header">
        <h3>Acolyte Bless</h3>
        <p className="specialty-description">
          Your divine connection grants you the power to Bless allies.
          Your Bless value increases as you grow in level and faith.
        </p>
      </div>

      <div className="bless-display">
        <div className="bless-value-card">
          <div className="bless-label">Current Bless Value</div>
          <div className="bless-value">{blessValue}</div>
          <div className="bless-subtext">Level {level} Acolyte</div>
        </div>

        <div className="bless-progression">
          <h4>Bless Progression</h4>
          <div className="progression-table">
            <div className="progression-row header">
              <span>Level</span>
              <span>Bless</span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => {
              const bless = calculateAcolyteBless(lvl);
              const isCurrent = lvl === level;
              return (
                <div
                  key={lvl}
                  className={`progression-row ${isCurrent ? 'current' : ''}`}
                >
                  <span>{lvl}</span>
                  <span>{bless}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="specialty-info">
        <h4>How Bless Works</h4>
        <ul>
          <li>Bless starts at <strong>1</strong> at 1st level</li>
          <li>Increases by <strong>+1 every odd level</strong> (3rd, 5th, 7th, 9th)</li>
          <li>At 10th level, your Bless value is <strong>{calculateAcolyteBless(10)}</strong></li>
          <li>This value will be displayed on your character sheet</li>
        </ul>
      </div>
    </div>
  );
}
