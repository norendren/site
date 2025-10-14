/**
 * RogueSpecialtiesSelector - Interactive selector for Rogue Specialties
 * Rogues start with 2 specialties and gain +1 every even level
 * 5 specialty types: Ability, Arcane, Divine, Talent, Stamina
 */

import { useState } from 'react';
import {
  calculateRogueSpecialtyCount,
  ROGUE_SPECIALTY_TYPES,
  ROGUE_TALENT_BONUSES,
  ARCANE_ARTS,
  type RogueSpecialtySelection,
  type RogueSpecialtyType,
  type ArcaneArt,
} from '../utils/classSpecialties';
import './ClassSpecialty.css';

interface RogueSpecialtiesSelectorProps {
  level: number;
  specialties: RogueSpecialtySelection[];
  onChange: (specialties: RogueSpecialtySelection[]) => void;
}

export function RogueSpecialtiesSelector({
  level,
  specialties,
  onChange,
}: RogueSpecialtiesSelectorProps) {
  const maxSpecialties = calculateRogueSpecialtyCount(level);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addSpecialty = () => {
    if (specialties.length >= maxSpecialties) return;

    const newSpecialty: RogueSpecialtySelection = {
      type: 'Ability',
    };
    onChange([...specialties, newSpecialty]);
    setEditingIndex(specialties.length);
  };

  const removeSpecialty = (index: number) => {
    const newSpecialties = specialties.filter((_, i) => i !== index);
    onChange(newSpecialties);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const updateSpecialty = (index: number, updates: Partial<RogueSpecialtySelection>) => {
    const newSpecialties = [...specialties];
    newSpecialties[index] = { ...newSpecialties[index], ...updates };
    onChange(newSpecialties);
  };

  const getSpecialtyTypeDescription = (type: RogueSpecialtyType): string => {
    switch (type) {
      case 'Ability':
        return 'Gain +1 to Ability Checks';
      case 'Arcane':
        return 'Choose an Arcane Art to specialize in';
      case 'Divine':
        return 'Choose a Divine Influence to channel';
      case 'Talent':
        return 'Apply bonuses to specific Talents';
      case 'Stamina':
        return 'Gain +2 Stamina';
      default:
        return '';
    }
  };

  return (
    <div className="class-specialty-container">
      <div className="specialty-header">
        <h3>Rogue Specialties</h3>
        <p className="specialty-description">
          Rogues are masters of adaptation, gaining specialties that enhance their versatility.
          Choose your specialties to define your unique skillset.
        </p>
      </div>

      <div className="specialty-count-display">
        <span className="count-label">Specialties Selected:</span>
        <span className={`count-value ${specialties.length === maxSpecialties ? 'complete' : ''}`}>
          {specialties.length} / {maxSpecialties}
        </span>
      </div>

      <div className="specialties-list">
        {specialties.map((specialty, index) => (
          <div key={index} className="specialty-card">
            <div className="specialty-card-header">
              <h4>Specialty {index + 1}</h4>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeSpecialty(index)}
                aria-label="Remove specialty"
              >
                ✕
              </button>
            </div>

            <div className="specialty-type-selector">
              <label htmlFor={`specialty-type-${index}`}>Type:</label>
              <select
                id={`specialty-type-${index}`}
                value={specialty.type}
                onChange={(e) => {
                  const newType = e.target.value as RogueSpecialtyType;
                  // Reset specialty-specific fields when changing type
                  updateSpecialty(index, {
                    type: newType,
                    arcaneArt: undefined,
                    divineInfluence: undefined,
                    talentBonuses: undefined,
                  });
                }}
              >
                {ROGUE_SPECIALTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="specialty-description-text">
              {getSpecialtyTypeDescription(specialty.type)}
            </div>

            {/* Arcane-specific configuration */}
            {specialty.type === 'Arcane' && (
              <div className="specialty-config">
                <label htmlFor={`arcane-art-${index}`}>Choose Arcane Art:</label>
                <select
                  id={`arcane-art-${index}`}
                  value={specialty.arcaneArt || ''}
                  onChange={(e) =>
                    updateSpecialty(index, { arcaneArt: e.target.value as ArcaneArt })
                  }
                >
                  <option value="">Select an art...</option>
                  {ARCANE_ARTS.map((art) => (
                    <option key={art} value={art}>
                      {art}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Divine-specific configuration */}
            {specialty.type === 'Divine' && (
              <div className="specialty-config">
                <label htmlFor={`divine-influence-${index}`}>Choose Divine Influence:</label>
                <input
                  type="text"
                  id={`divine-influence-${index}`}
                  value={specialty.divineInfluence || ''}
                  onChange={(e) =>
                    updateSpecialty(index, { divineInfluence: e.target.value })
                  }
                  placeholder="e.g., War, Nature, Trickery..."
                />
              </div>
            )}

            {/* Talent-specific configuration */}
            {specialty.type === 'Talent' && (
              <div className="specialty-config">
                <p className="config-note">
                  Apply bonuses to your talents (configure in detail during gameplay)
                </p>
                <div className="talent-bonus-info">
                  <strong>Available bonuses:</strong>
                  <ul>
                    {ROGUE_TALENT_BONUSES.map((bonus) => (
                      <li key={bonus}>{bonus}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {specialties.length < maxSpecialties && (
        <button
          type="button"
          className="add-specialty-button"
          onClick={addSpecialty}
        >
          + Add Specialty ({specialties.length}/{maxSpecialties})
        </button>
      )}

      <div className="specialty-info">
        <h4>Specialty Types</h4>
        <ul>
          <li><strong>Ability:</strong> +1 bonus to all Ability Checks</li>
          <li><strong>Arcane:</strong> Gain proficiency in one Arcane Art</li>
          <li><strong>Divine:</strong> Gain access to one Divine Influence</li>
          <li><strong>Talent:</strong> Apply special bonuses (Ace, Certain, Easy, Golden, Swift) to Talents</li>
          <li><strong>Stamina:</strong> +2 to your Stamina pool</li>
        </ul>
        <p className="help-text">
          You start with {calculateRogueSpecialtyCount(1)} specialties and gain another every even level.
          At level {level}, you can have {maxSpecialties} specialties.
        </p>
      </div>
    </div>
  );
}
