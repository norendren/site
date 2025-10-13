import { useState } from 'react';
import { getRacePerks } from '../utils/raceReference';
import type { RacialPerk } from '../utils/raceReference';
import './RacialPerksSelector.css';

interface RacialPerksSelectorProps {
  race: string;
  selectedPerks: string[];
  onPerksChange: (perks: string[]) => void;
}

export function RacialPerksSelector({ race, selectedPerks, onPerksChange }: RacialPerksSelectorProps) {
  const [expandedPerk, setExpandedPerk] = useState<string | null>(null);

  // Get available perks for the selected race
  const availablePerks = getRacePerks(race);

  // Toggle perk selection
  const togglePerk = (perkName: string) => {
    const isSelected = selectedPerks.includes(perkName);

    if (isSelected) {
      // Deselect
      onPerksChange(selectedPerks.filter(p => p !== perkName));
    } else {
      // Select (only if less than 2 selected)
      if (selectedPerks.length < 2) {
        onPerksChange([...selectedPerks, perkName]);
      }
    }
  };

  // Check if a perk is selected
  const isPerkSelected = (perkName: string): boolean => {
    return selectedPerks.includes(perkName);
  };

  // Toggle expanded perk details
  const toggleExpanded = (perkName: string) => {
    setExpandedPerk(expandedPerk === perkName ? null : perkName);
  };

  if (!race) {
    return (
      <div className="racial-perks-selector">
        <div className="warning-message">
          Please select a race in Step 1 to view available racial perks.
        </div>
      </div>
    );
  }

  if (availablePerks.length === 0) {
    return (
      <div className="racial-perks-selector">
        <div className="error-message">
          No racial perks found for race: {race}
        </div>
      </div>
    );
  }

  return (
    <div className="racial-perks-selector">
      <div className="perks-header">
        <h3>Available Racial Perks</h3>
        <div className="perks-counter">
          <span className={`selected-count ${selectedPerks.length === 2 ? 'complete' : ''}`}>
            {selectedPerks.length}
          </span>
          <span className="separator">/</span>
          <span className="total-count">2</span>
          <span className="label">Selected</span>
        </div>
      </div>

      <div className="perks-instruction">
        Select exactly 2 racial perks for your character. Click on a perk to select it.
      </div>

      <div className="perks-list">
        {availablePerks.map((perk: RacialPerk) => {
          const isSelected = isPerkSelected(perk.name);
          const isExpanded = expandedPerk === perk.name;
          const canSelect = selectedPerks.length < 2 || isSelected;

          return (
            <div
              key={perk.name}
              className={`perk-card ${isSelected ? 'selected' : ''} ${!canSelect ? 'disabled' : ''}`}
              onClick={() => canSelect && togglePerk(perk.name)}
            >
              <div className="perk-header">
                <div className="perk-checkbox">
                  {isSelected && <span className="checkmark">✓</span>}
                </div>
                <div className="perk-title">{perk.name}</div>
                <button
                  className="perk-expand-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(perk.name);
                  }}
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  {isExpanded ? '−' : '+'}
                </button>
              </div>

              <div className={`perk-summary ${isExpanded ? 'expanded' : ''}`}>
                {perk.mechanicalSummary}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPerks.length < 2 && (
        <div className="perks-warning">
          ⚠ You need to select {2 - selectedPerks.length} more perk{2 - selectedPerks.length === 1 ? '' : 's'}
        </div>
      )}
    </div>
  );
}
