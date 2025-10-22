import { ARMOR_TYPES, calculateShieldDR } from '../utils/equipmentReference';
import './ArmorSelector.css';

interface ArmorSelectorProps {
  selectedArmor: 'none' | 'light' | 'medium' | 'heavy';
  hasShield: boolean;
  characterLevel: number;
  onArmorChange: (armorType: 'none' | 'light' | 'medium' | 'heavy') => void;
  onShieldChange: (hasShield: boolean) => void;
}

export default function ArmorSelector({
  selectedArmor,
  hasShield,
  characterLevel,
  onArmorChange,
  onShieldChange,
}: ArmorSelectorProps) {
  const armorTypes: Array<'none' | 'light' | 'medium' | 'heavy'> = ['none', 'light', 'medium', 'heavy'];

  return (
    <div className="armor-selector">
      <h3>Select Armor</h3>
      <p className="armor-instructions">
        Choose your armor type. Heavier armor provides more defense but limits your DEX bonus and reduces stamina.
      </p>

      <div className="armor-table-container">
        <table className="armor-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Defense</th>
              <th>Max Dex</th>
              <th>Stamina Mod</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {armorTypes.map((type) => {
              const armor = ARMOR_TYPES[type];
              return (
                <tr
                  key={type}
                  className={selectedArmor === type ? 'selected-row' : ''}
                  onClick={() => onArmorChange(type)}
                >
                  <td>
                    <input
                      type="radio"
                      name="armor"
                      value={type}
                      checked={selectedArmor === type}
                      onChange={() => onArmorChange(type)}
                      className="armor-radio"
                    />
                  </td>
                  <td className="armor-type-label">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </td>
                  <td>{armor.cost > 0 ? `${armor.cost} S` : '—'}</td>
                  <td className="defense-value">{armor.defense}</td>
                  <td>{armor.maxDex !== null ? `+${armor.maxDex}` : 'No limit'}</td>
                  <td className={armor.staminaModifier < 0 ? 'negative-value' : ''}>
                    {armor.staminaModifier === 0 ? '—' : armor.staminaModifier}
                  </td>
                  <td>{armor.weight > 0 ? `${armor.weight} lb` : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="shield-section">
        <h3>Shield</h3>
        <label className="shield-checkbox-label">
          <input
            type="checkbox"
            checked={hasShield}
            onChange={(e) => onShieldChange(e.target.checked)}
            className="shield-checkbox"
          />
          <span className="shield-label-text">Equip Shield (10 S, 15 lb)</span>
        </label>

        {hasShield && (
          <div className="shield-info">
            <p className="shield-dr">
              <strong>Damage Reduction:</strong> {calculateShieldDR(characterLevel)} (equals character level)
            </p>
            <p className="shield-note">
              Shields provide damage reduction but do not add to Defense value.
            </p>
          </div>
        )}
      </div>

      <div className="equipment-summary">
        <h4>Current Equipment Summary</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Armor:</span>
            <span className="summary-value">
              {selectedArmor.charAt(0).toUpperCase() + selectedArmor.slice(1)}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Base Defense:</span>
            <span className="summary-value">{ARMOR_TYPES[selectedArmor].defense}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Shield:</span>
            <span className="summary-value">{hasShield ? 'Yes' : 'No'}</span>
          </div>
          {hasShield && (
            <div className="summary-item">
              <span className="summary-label">DR:</span>
              <span className="summary-value">{calculateShieldDR(characterLevel)}</span>
            </div>
          )}
          <div className="summary-item">
            <span className="summary-label">Total Weight:</span>
            <span className="summary-value">
              {ARMOR_TYPES[selectedArmor].weight + (hasShield ? 15 : 0)} lb
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Cost:</span>
            <span className="summary-value">
              {ARMOR_TYPES[selectedArmor].cost + (hasShield ? 10 : 0)} S
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
