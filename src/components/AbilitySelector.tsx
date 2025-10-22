import { useState, useMemo } from 'react';
import { abilities, type Ability } from '../data/abilities';
import './AbilitySelector.css';

interface AbilitySelectorProps {
  className: string;
  level: number;
  selectedAbilities: string[];
  onAbilitiesChange: (abilities: string[]) => void;
}

export function AbilitySelector({
  className,
  level,
  selectedAbilities,
  onAbilitiesChange,
}: AbilitySelectorProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedAbilityName, setSelectedAbilityName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'class' | 'general'>('class');

  // Get class abilities
  const classAbilities = useMemo(() => {
    const classKey = className.toLowerCase() as keyof typeof abilities;
    const classAbilitiesData = abilities[classKey] || {};

    const list: Array<{ name: string; ability: Ability }> = [];
    Object.entries(classAbilitiesData).forEach(([name, ability]) => {
      list.push({ name, ability });
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [className]);

  // Get general abilities
  const generalAbilities = useMemo(() => {
    const generalAbilitiesData = abilities.general || {};

    const list: Array<{ name: string; ability: Ability }> = [];
    Object.entries(generalAbilitiesData).forEach(([name, ability]) => {
      list.push({ name, ability });
    });

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Get abilities based on active tab
  const availableAbilities = useMemo(() => {
    return activeTab === 'class' ? classAbilities : generalAbilities;
  }, [activeTab, classAbilities, generalAbilities]);

  // Filter abilities based on search text
  const filteredAbilities = useMemo(() => {
    if (!searchText.trim()) {
      return availableAbilities;
    }

    const search = searchText.toLowerCase();
    return availableAbilities.filter(({ name, ability }) => {
      return (
        name.toLowerCase().includes(search) ||
        (ability.description && ability.description.toLowerCase().includes(search))
      );
    });
  }, [availableAbilities, searchText]);

  // Check if an ability's prerequisites are met
  const checkPrerequisites = (ability: Ability): { met: boolean; reason?: string } => {
    // Check class prerequisite
    if (ability.prerequisiteClass && ability.prerequisiteClass !== className) {
      return { met: false, reason: `Requires ${ability.prerequisiteClass} class` };
    }

    // Check ability prerequisites
    if (ability.prerequisiteAbilities && ability.prerequisiteAbilities.length > 0) {
      const missingPrereqs = ability.prerequisiteAbilities.filter(
        prereq => !selectedAbilities.includes(prereq)
      );
      if (missingPrereqs.length > 0) {
        return {
          met: false,
          reason: `Requires: ${missingPrereqs.join(', ')}`,
        };
      }
    }

    return { met: true };
  };

  // Handle ability selection
  const handleToggleAbility = (abilityName: string) => {
    if (selectedAbilities.includes(abilityName)) {
      // Deselect
      onAbilitiesChange(selectedAbilities.filter(name => name !== abilityName));
    } else {
      // Select
      onAbilitiesChange([...selectedAbilities, abilityName]);
    }
  };

  // Calculate recommended max abilities based on level
  const recommendedMaxAbilities = Math.max(2, Math.floor(level / 2) + 1);
  const showWarning = selectedAbilities.length > recommendedMaxAbilities;

  // Get currently selected ability details
  const selectedAbilityDetails = useMemo(() => {
    if (!selectedAbilityName) return null;

    const found = availableAbilities.find(({ name }) => name === selectedAbilityName);
    return found || null;
  }, [selectedAbilityName, availableAbilities]);

  return (
    <div className="ability-selector">
      {/* Tabs */}
      <div className="ability-tabs">
        <button
          type="button"
          className={`ability-tab ${activeTab === 'class' ? 'active' : ''}`}
          onClick={() => setActiveTab('class')}
        >
          {className} Abilities
        </button>
        <button
          type="button"
          className={`ability-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General Abilities
        </button>
      </div>

      {/* Search bar */}
      <div className="ability-search">
        <input
          type="text"
          placeholder="Search abilities..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="ability-search-input"
        />
      </div>

      {/* Warning if too many abilities selected */}
      {showWarning && (
        <div className="ability-warning">
          ⚠ You've selected {selectedAbilities.length} abilities. Most characters have{' '}
          {recommendedMaxAbilities} or fewer abilities at level {level}.
        </div>
      )}

      {/* Two-column layout */}
      <div className="ability-layout">
        {/* Left column: Ability list */}
        <div className="ability-list">
          <div className="ability-list-header">
            <span>Available Abilities ({filteredAbilities.length})</span>
            <span className="selected-count">
              {selectedAbilities.length} selected
            </span>
          </div>

          <div className="ability-list-items">
            {filteredAbilities.map(({ name, ability }) => {
              const isSelected = selectedAbilities.includes(name);
              const prereqCheck = checkPrerequisites(ability);
              const isActive = selectedAbilityName === name;

              return (
                <div
                  key={name}
                  className={`ability-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedAbilityName(name)}
                >
                  <div className="ability-item-label">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleAbility(name)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="ability-item-content">
                      <div className="ability-item-name">
                        {name}
                      </div>
                      {!prereqCheck.met && (
                        <div className="ability-prereq-warning">
                          ⚠ {prereqCheck.reason}
                        </div>
                      )}
                      {ability.restrictions && (
                        <div className="ability-restriction">
                          ⚠ {ability.restrictions}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredAbilities.length === 0 && (
              <div className="ability-list-empty">
                No abilities found matching "{searchText}"
              </div>
            )}
          </div>
        </div>

        {/* Right column: Ability details */}
        <div className="ability-details">
          {selectedAbilityDetails ? (
            <>
              <h3 className="ability-details-name">
                {selectedAbilityDetails.name}
              </h3>

              {selectedAbilityDetails.ability.description && (
                <div className="ability-details-description">
                  {selectedAbilityDetails.ability.description}
                </div>
              )}

              {selectedAbilityDetails.ability.prerequisiteClass && (
                <div className="ability-details-meta">
                  <strong>Requires Class:</strong> {selectedAbilityDetails.ability.prerequisiteClass}
                </div>
              )}

              {selectedAbilityDetails.ability.prerequisiteAbilities &&
                selectedAbilityDetails.ability.prerequisiteAbilities.length > 0 && (
                  <div className="ability-details-meta">
                    <strong>Requires Abilities:</strong>{' '}
                    {selectedAbilityDetails.ability.prerequisiteAbilities.join(', ')}
                  </div>
                )}

              {selectedAbilityDetails.ability.restrictions && (
                <div className="ability-details-restriction">
                  <strong>⚠ Restriction:</strong> {selectedAbilityDetails.ability.restrictions}
                </div>
              )}

              {selectedAbilityDetails.ability.canTakeMultiple && (
                <div className="ability-details-note">
                  ✓ This ability can be taken multiple times
                </div>
              )}
            </>
          ) : (
            <div className="ability-details-placeholder">
              <p>Click an ability to see its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
