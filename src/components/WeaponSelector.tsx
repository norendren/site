import { useState, useMemo } from 'react';
import { getWeaponsByCategory, type WeaponCategory } from '../utils/weaponReference';
import './WeaponSelector.css';

interface WeaponSelectorProps {
  selectedWeapons: string[]; // Array of weapon names (max 2)
  onWeaponsChange: (weapons: string[]) => void;
}

export function WeaponSelector({
  selectedWeapons,
  onWeaponsChange,
}: WeaponSelectorProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedWeaponName, setSelectedWeaponName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<WeaponCategory>('common');

  // Get weapons for active category
  const availableWeapons = useMemo(() => {
    return getWeaponsByCategory(activeTab);
  }, [activeTab]);

  // Filter weapons based on search text
  const filteredWeapons = useMemo(() => {
    if (!searchText.trim()) {
      return availableWeapons;
    }

    const search = searchText.toLowerCase();
    return availableWeapons.filter((weapon) => {
      return (
        weapon.name.toLowerCase().includes(search) ||
        (weapon.description && weapon.description.toLowerCase().includes(search)) ||
        weapon.designations.some(d => d.toLowerCase().includes(search))
      );
    });
  }, [availableWeapons, searchText]);

  // Handle weapon selection/deselection
  const handleToggleWeapon = (weaponName: string) => {
    if (selectedWeapons.includes(weaponName)) {
      // Deselect
      onWeaponsChange(selectedWeapons.filter(name => name !== weaponName));
    } else {
      // Select (max 2 weapons)
      if (selectedWeapons.length < 2) {
        onWeaponsChange([...selectedWeapons, weaponName]);
      }
    }
  };

  // Get currently selected weapon details
  const selectedWeaponDetails = useMemo(() => {
    if (!selectedWeaponName) return null;
    return availableWeapons.find((weapon) => weapon.name === selectedWeaponName);
  }, [selectedWeaponName, availableWeapons]);

  const maxWeapons = 2;
  const showWarning = selectedWeapons.length >= maxWeapons;

  return (
    <div className="weapon-selector">
      {/* Tabs */}
      <div className="weapon-tabs">
        <button
          type="button"
          className={`weapon-tab ${activeTab === 'common' ? 'active' : ''}`}
          onClick={() => setActiveTab('common')}
        >
          Common Weapons
        </button>
        <button
          type="button"
          className={`weapon-tab ${activeTab === 'martial' ? 'active' : ''}`}
          onClick={() => setActiveTab('martial')}
        >
          Martial Weapons
        </button>
        <button
          type="button"
          className={`weapon-tab ${activeTab === 'specialty' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialty')}
        >
          Specialty Weapons
        </button>
      </div>

      {/* Search bar */}
      <div className="weapon-search">
        <input
          type="text"
          placeholder="Search weapons..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="weapon-search-input"
        />
      </div>

      {/* Warning if max weapons selected */}
      {showWarning && (
        <div className="weapon-warning">
          ⚠ You've selected {selectedWeapons.length} weapons (maximum). Deselect one to choose another.
        </div>
      )}

      {/* Two-column layout */}
      <div className="weapon-layout">
        {/* Left column: Weapon list */}
        <div className="weapon-list">
          <div className="weapon-list-header">
            <span>Available Weapons ({filteredWeapons.length})</span>
            <span className="selected-count">
              {selectedWeapons.length}/{maxWeapons} selected
            </span>
          </div>

          <div className="weapon-list-items">
            {filteredWeapons.map((weapon) => {
              const isSelected = selectedWeapons.includes(weapon.name);
              const isActive = selectedWeaponName === weapon.name;
              const canSelect = isSelected || selectedWeapons.length < maxWeapons;

              return (
                <div
                  key={weapon.name}
                  className={`weapon-item ${isActive ? 'active' : ''} ${!canSelect ? 'disabled' : ''}`}
                  onClick={() => setSelectedWeaponName(weapon.name)}
                >
                  <div className="weapon-item-label">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleWeapon(weapon.name)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={!canSelect && !isSelected}
                    />
                    <div className="weapon-item-content">
                      <div className="weapon-item-name">
                        {weapon.name}
                      </div>
                      <div className="weapon-item-meta">
                        {weapon.damage} • {weapon.size} • {weapon.cost} S • {weapon.weight} lb
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredWeapons.length === 0 && (
              <div className="weapon-list-empty">
                No weapons found matching "{searchText}"
              </div>
            )}
          </div>
        </div>

        {/* Right column: Weapon details */}
        <div className="weapon-details">
          {selectedWeaponDetails ? (
            <>
              <h3 className="weapon-details-name">
                {selectedWeaponDetails.name}
              </h3>

              {selectedWeaponDetails.description && (
                <div className="weapon-details-description">
                  {selectedWeaponDetails.description}
                </div>
              )}

              <div className="weapon-details-stats">
                <div className="weapon-stat-row">
                  <span className="weapon-stat-label">Damage:</span>
                  <span className="weapon-stat-value">
                    {selectedWeaponDetails.includesBaseStrength ? '+' : ''}
                    {selectedWeaponDetails.damage}
                    {selectedWeaponDetails.flatBonus !== undefined && (
                      <span className="weapon-stat-note"> (flat bonus to base STR damage)</span>
                    )}
                    {selectedWeaponDetails.includesBaseStrength && selectedWeaponDetails.flatBonus === undefined && (
                      <span className="weapon-stat-note"> (includes base STR damage)</span>
                    )}
                  </span>
                </div>

                {selectedWeaponDetails.limit !== undefined && (
                  <div className="weapon-stat-row">
                    <span className="weapon-stat-label">STR Limit:</span>
                    <span className="weapon-stat-value">
                      +{selectedWeaponDetails.limit}
                      <span className="weapon-stat-note"> (max STR modifier for base damage)</span>
                    </span>
                  </div>
                )}

                {selectedWeaponDetails.requirement !== undefined && (
                  <div className="weapon-stat-row">
                    <span className="weapon-stat-label">STR Requirement:</span>
                    <span className="weapon-stat-value">
                      +{selectedWeaponDetails.requirement}
                      <span className="weapon-stat-note"> (minimum STR to wield)</span>
                    </span>
                  </div>
                )}

                <div className="weapon-stat-row">
                  <span className="weapon-stat-label">Size:</span>
                  <span className="weapon-stat-value">
                    {selectedWeaponDetails.size === 'L' ? 'Light' : selectedWeaponDetails.size === 'M' ? 'Medium' : 'Heavy'}
                  </span>
                </div>

                <div className="weapon-stat-row">
                  <span className="weapon-stat-label">Range:</span>
                  <span className="weapon-stat-value">
                    {selectedWeaponDetails.range === '-' ? 'Melee' : selectedWeaponDetails.range}
                  </span>
                </div>

                <div className="weapon-stat-row">
                  <span className="weapon-stat-label">Cost:</span>
                  <span className="weapon-stat-value">{selectedWeaponDetails.cost} S</span>
                </div>

                <div className="weapon-stat-row">
                  <span className="weapon-stat-label">Weight:</span>
                  <span className="weapon-stat-value">{selectedWeaponDetails.weight} lb</span>
                </div>

                {selectedWeaponDetails.designations.length > 0 && (
                  <div className="weapon-stat-row">
                    <span className="weapon-stat-label">Properties:</span>
                    <span className="weapon-stat-value">
                      {selectedWeaponDetails.designations.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="weapon-details-placeholder">
              <p>Click a weapon to see its details</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected weapons summary */}
      {selectedWeapons.length > 0 && (
        <div className="weapon-summary">
          <h4>Selected Weapons ({selectedWeapons.length}/{maxWeapons}):</h4>
          <div className="weapon-summary-list">
            {selectedWeapons.map((weaponName) => (
              <div key={weaponName} className="weapon-summary-item">
                <span>{weaponName}</span>
                <button
                  type="button"
                  onClick={() => handleToggleWeapon(weaponName)}
                  className="weapon-remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
