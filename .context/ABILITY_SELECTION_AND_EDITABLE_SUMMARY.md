# Ability Selection & Editable Summary Implementation Guide

*Created: 2025-10-21*

## Overview

This document outlines the design and implementation plan for two major character creator features:
1. **Ability Selection UI**: A user-friendly interface for browsing and selecting character abilities
2. **Editable Summary Fields**: Making the final review page fully editable for user adjustments

## Core Philosophy

**No Automation of Ability Benefits**: We deliberately do NOT automatically calculate the effects of abilities. Instead, we provide excellent UI/UX for ability selection and viewing, then allow users to manually adjust their final stats in the review page to account for ability bonuses.

**Rationale**:
- Ability effects are complex and varied (some are situational, some are narrative)
- Many abilities have effects that can't be easily quantified (e.g., "gain advantage in specific situations")
- Trying to automate would be error-prone and time-consuming
- Manual adjustment gives users flexibility and ownership

---

## PART 1: Ability Selection UI

### Design Decision: Two-Column Interactive Browser

**Layout Choice**: Two-column layout with search
- **Left column**: Searchable/filterable list of abilities
- **Right column**: Detailed description panel
- **NO category filters** (user requested simplicity)
- **YES soft warning** for selecting too many abilities

**Visual Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│                     Select Your Abilities                    │
├──────────────────────────┬──────────────────────────────────┤
│ LEFT: Ability Browser    │ RIGHT: Details Panel             │
│                          │                                  │
│ [🔍 Search abilities...] │ ┌──────────────────────────────┐ │
│                          │ │ ABILITY NAME                 │ │
│ Selected: 3 abilities    │ │                              │ │
│ ⚠ Typical: 2-4 abilities │ │ Full description text here   │ │
│                          │ │ with formatting...           │ │
│ ┌──────────────────────┐ │ │                              │ │
│ │ ✓ Anoint         [✓]│ │ │ Prerequisites:               │ │
│ │   Bless objects...   │ │ │ • Acolyte class              │ │
│ └──────────────────────┘ │ │                              │ │
│ ┌──────────────────────┐ │ │ Can take multiple: Yes       │ │
│ │ ⚠ Beneficent God [○]│ │ │                              │ │
│ │   +1 Bless/level     │ │ │ [✓ SELECT THIS ABILITY]      │ │
│ └──────────────────────┘ │ └──────────────────────────────┘ │
│ ┌──────────────────────┐ │                                  │
│ │ 🔒 Chosen Vessel II  │ │ Note: Remember to manually       │
│ │   Requires: CV I     │ │ adjust stats in review step!     │
│ └──────────────────────┘ │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

### Features & Functionality

**Left Column: Ability Browser**
- **Fuzzy search bar** using Fuse.js
  - Searches ability names and descriptions
  - Updates list in real-time as user types
  - Clears with X button
- **Status counter**: "Selected: X abilities"
- **Soft warning**: "⚠ Typical: 2-4 abilities" (adjustable threshold)
- **Ability cards** showing:
  - Ability name (bold)
  - 1-line truncated description preview
  - **Visual status indicators:**
    - ✅ Green checkmark = Selected
    - ⚠️ Yellow warning = Restrictions apply (can still select)
    - 🔒 Grey lock = Prerequisites not met (disabled)
    - ⭐ Star badge = Can take multiple times
  - Quick checkbox for selection
- **Smart sorting:**
  1. Selected abilities (at top)
  2. Available abilities (alphabetical)
  3. Locked/unavailable abilities (at bottom)
- **Scroll virtualization** (if needed for performance with 100+ abilities)

**Right Column: Details Panel**
- Shows full information when ability is clicked/focused
- **Empty state**: "Select an ability to view details"
- **Populated state:**
  - Ability name (large, prominent header)
  - Complete description (well-formatted, preserve line breaks)
  - **Prerequisites section:**
    - List of prerequisites with checkmarks showing which are met
    - Class requirements
    - Ability requirements
  - **Restrictions** (if applicable, highlighted)
  - **Can take multiple times** badge (if applicable)
  - **Large action button:**
    - "✓ SELECT THIS ABILITY" (primary button, if not selected)
    - "✓ SELECTED" (success state, if selected)
    - "🔒 PREREQUISITES NOT MET" (disabled, if locked)

**Soft Warning System**:
- **Threshold**: Warn if more than 4 abilities selected
- **Visual**:
  - Orange warning banner below counter
  - "⚠ You've selected X abilities. Most characters have 2-4 abilities at character creation."
  - Non-blocking - user can proceed
- **Rationale**: Guide new players without restricting experienced users

**Additional UX Polish**:
- **No hard validation** on ability count (user freedom)
- **Keyboard navigation:**
  - Tab through ability cards
  - Enter/Space to select
  - Arrow keys to navigate list
- **Responsive:** Stack columns on mobile (list above, details below)
- **Smooth animations** for selection state changes
- **Persistent search** (doesn't clear on selection)

### Technical Implementation

**File Structure**:
```
src/components/
├── AbilitySelector.tsx              # Main container, manages state
├── AbilitySelector.css              # Styling for two-column layout
├── AbilitySearchBar.tsx             # Search input component
├── AbilityList.tsx                  # Left column, list of abilities
│   └── AbilityCard.tsx              # Individual ability card
└── AbilityDetailsPanel.tsx          # Right column, detailed view
```

**Data Structure** (already exists in pdfFiller.ts):
```typescript
interface BasicCharacterData {
  // ... existing fields
  abilities?: string[];  // Array of selected ability names
}
```

**Internal State Management**:
```typescript
// In AbilitySelector.tsx
interface AbilitySelectionState {
  selectedAbilityName: string | null;  // Which ability is being viewed in details
  selectedAbilities: Set<string>;      // Which abilities user has chosen
  searchQuery: string;                 // Current search input
}

// Props interface
interface AbilitySelectorProps {
  characterClass: string;              // Current character class
  selectedAbilities: string[];         // From parent state
  onAbilitiesChange: (abilities: string[]) => void;  // Update parent
}
```

**Prerequisite Validation Logic**:
```typescript
function canSelectAbility(
  abilityName: string,
  ability: Ability,
  characterClass: string,
  selectedAbilities: Set<string>
): { canSelect: boolean; reason?: string } {
  // Check class requirement
  if (ability.prerequisiteClass && ability.prerequisiteClass !== characterClass) {
    return {
      canSelect: false,
      reason: `Requires ${ability.prerequisiteClass} class`
    };
  }

  // Check prerequisite abilities
  if (ability.prerequisiteAbilities && ability.prerequisiteAbilities.length > 0) {
    const missingPrereqs = ability.prerequisiteAbilities.filter(
      prereq => !selectedAbilities.has(prereq)
    );
    if (missingPrereqs.length > 0) {
      return {
        canSelect: false,
        reason: `Requires: ${missingPrereqs.join(', ')}`
      };
    }
  }

  return { canSelect: true };
}
```

**Fuzzy Search Implementation**:
```typescript
import Fuse from 'fuse.js';

// Initialize Fuse.js with abilities array
const fuse = new Fuse(abilitiesArray, {
  keys: [
    { name: 'name', weight: 0.7 },      // Ability name more important
    { name: 'description', weight: 0.3 } // Description less important
  ],
  threshold: 0.3,  // Adjust sensitivity (0 = exact, 1 = match anything)
  includeScore: true,
  minMatchCharLength: 2,
});

// Search function
const searchResults = searchQuery.trim().length >= 2
  ? fuse.search(searchQuery).map(result => result.item)
  : abilitiesArray;
```

**Ability Filtering & Sorting**:
```typescript
function sortAbilities(
  abilities: Array<{ name: string; ability: Ability }>,
  selectedAbilities: Set<string>,
  characterClass: string
): Array<{ name: string; ability: Ability; status: 'selected' | 'available' | 'locked' }> {

  return abilities
    .map(item => {
      const { canSelect } = canSelectAbility(
        item.name,
        item.ability,
        characterClass,
        selectedAbilities
      );

      let status: 'selected' | 'available' | 'locked';
      if (selectedAbilities.has(item.name)) {
        status = 'selected';
      } else if (canSelect) {
        status = 'available';
      } else {
        status = 'locked';
      }

      return { ...item, status };
    })
    .sort((a, b) => {
      // Sort by status first
      const statusOrder = { selected: 0, available: 1, locked: 2 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      // Then alphabetically
      return a.name.localeCompare(b.name);
    });
}
```

### Integration with Character Creator

**Step Flow Update** (7 steps total):
1. Basic Info
2. Racial Perks
3. Class Specialties
4. Attributes
5. Talents
6. **Abilities** ← NEW STEP
7. Review & Generate ← Moved to step 7 (now editable)

**Add to CharacterCreator.tsx**:
```typescript
// Update wizard progress (change from 6 steps to 7)
const TOTAL_STEPS = 7;

// Update validateStep function (add case 6)
case 6:
  // Optional: Add soft validation for ability selection
  // For now, always return true (no blocking validation)
  return true;

// Update renderStepContent function (add case 6)
case 6:
  return (
    <div className="step-content">
      <h2>Select Abilities</h2>
      <p className="step-description">
        Choose abilities that define your character's unique capabilities.
        You'll be able to manually adjust stats in the final review to account
        for ability bonuses.
      </p>

      {characterData.class ? (
        <AbilitySelector
          characterClass={characterData.class}
          selectedAbilities={characterData.abilities || []}
          onAbilitiesChange={(abilities) =>
            setCharacterData(prev => ({ ...prev, abilities }))
          }
        />
      ) : (
        <div className="warning-message">
          Please complete Step 1 (Basic Information) to select abilities.
        </div>
      )}
    </div>
  );

// Update case 7 (Review, now includes editable fields - see Part 2)
```

**Update Progress Indicator** (in CharacterCreator.tsx):
```tsx
{/* Add step 6 for Abilities */}
<div className="progress-line"></div>
<div
  className={`progress-step ${currentStep >= 6 ? 'active' : ''} ${currentStep > 6 ? 'completed' : ''} ${canNavigateToStep(6) ? 'clickable' : ''}`}
  onClick={() => handleStepClick(6)}
>
  <div className="progress-circle">6</div>
  <div className="progress-label">Abilities</div>
</div>

{/* Update Review step to 7 */}
<div className="progress-line"></div>
<div
  className={`progress-step ${currentStep >= 7 ? 'active' : ''} ${canNavigateToStep(7) ? 'clickable' : ''}`}
  onClick={() => handleStepClick(7)}
>
  <div className="progress-circle">7</div>
  <div className="progress-label">Review</div>
</div>
```

### Styling (matching existing CSS)

**Color Palette** (from PROJECT_CONTEXT.md):
```css
/* Use existing project colors */
--primary-500: #3949ab;      /* Primary actions, ability card borders */
--primary-50:  #e8eaf6;      /* Ability card backgrounds */
--success-bg:  #e8f5e9;      /* Selected ability cards */
--success-icon: #2e7d32;     /* Checkmark icon */
--warning-bg:  #fff3e0;      /* Warning banner, restricted abilities */
--warning-icon: #f57c00;     /* Warning icon */
--text-primary: #1a1a1a;     /* Body text */
--text-muted:  #616161;      /* Placeholder text */
--bg-border:   #e0e0e0;      /* Card borders */
```

**Component Styling Pattern**:
```css
/* AbilitySelector.css - Two-column layout */
.ability-selector {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  min-height: 500px;
}

/* Left column: List */
.ability-browser {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ability-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Ability card - matches existing form styling */
.ability-card {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #e8eaf6;  /* --primary-50 */
  cursor: pointer;
  transition: all 0.2s;
}

.ability-card:hover {
  border-color: #3949ab;  /* --primary-500 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ability-card.selected {
  border-color: #2e7d32;  /* --success-icon */
  background: #e8f5e9;    /* --success-bg */
}

.ability-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f5f5f5;
}

/* Right column: Details panel */
.ability-details-panel {
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
}

.ability-details-empty {
  color: #616161;  /* --text-muted */
  text-align: center;
  padding: 3rem 1rem;
}

/* Soft warning banner */
.ability-count-warning {
  padding: 0.75rem 1rem;
  background: #fff3e0;  /* --warning-bg */
  color: #e65100;       /* --warning-text */
  border-left: 4px solid #f57c00;  /* --warning-icon */
  border-radius: 4px;
  font-size: 0.9rem;
}
```

**Responsive Behavior**:
```css
@media (max-width: 768px) {
  .ability-selector {
    grid-template-columns: 1fr;
  }

  /* Stack: list above, details below */
  .ability-browser {
    order: 1;
  }

  .ability-details-panel {
    order: 2;
    position: sticky;
    bottom: 0;
    max-height: 300px;
    overflow-y: auto;
  }
}
```

---

## PART 2: Editable Summary Fields

### Design Decision: Fully Editable Review Page

**Philosophy**: Transform the final Review step from a **read-only summary** into an **editable approval screen** where users can make final adjustments before PDF generation.

**User Request Decisions**:
- ✅ Make ALL fields editable (including name, age, level, etc.)
- ✅ Preserve original/calculated values with reset button
- ✅ NO validation on edited values (trust the user)
- ✅ Match existing CSS styling

### What Gets Edited?

**ALL Fields Are Editable**:

1. **Basic Info**:
   - Character Name (text input)
   - Class (dropdown - can change)
   - Level (number input)
   - Race (dropdown - can change)
   - House (dropdown)
   - Faith (dropdown)
   - Age (number input)

2. **Derived Stats**:
   - Defense (number input)
   - Daring (number input)
   - Stamina (number input)
   - Mana (number input, Mages only)
   - Favor (number input, Acolytes only)
   - Bless Count (number input, Acolytes only)

3. **Attributes** (CON, DEX, INS, KNO, STR, VAL):
   - Each attribute value editable

4. **Talents**:
   - Each talent point allocation editable

5. **New Free-Form Text Fields**:
   - **Ability Effects Notes** (textarea): Track ability bonuses manually
   - **Equipment** (textarea): Starting equipment
   - **Other Notes** (textarea): Any other adjustments or reminders

### Visual Design

**Editable Field Pattern**:
```
┌────────────────────────────────────────┐
│ Defense: [12] 📝                        │
│          ↑                              │
│      Editable input field               │
│      Shows calculated value initially   │
│      Blue border on focus               │
└────────────────────────────────────────┘

After user edits:
┌────────────────────────────────────────┐
│ Stamina: [45] 📝                        │
│          (Original: 42) [↻ Reset]       │
│          ↑                              │
│      Shows when user overrides          │
│      Click Reset to restore original    │
└────────────────────────────────────────┘
```

**Full Review Screen Layout**:
```
┌─── Review & Finalize Character ──────────────────────┐
│                                                       │
│ ✏️ All fields below are editable. Adjust as needed   │
│    to account for abilities and other bonuses.       │
│                                                       │
│ ═══ Basic Information ═══                            │
│ Name:  [Thorin Ironforge              ] 📝           │
│ Class: [Warrior              ▼] 📝                   │
│ Level: [5 ] 📝                                        │
│ Race:  [Human                ▼] 📝                   │
│ House: [Draur                ▼] 📝                   │
│ Faith: [Ilios                ▼] 📝                   │
│ Age:   [28] 📝                                        │
│                                                       │
│ ═══ Attributes ═══                                   │
│ CON: [+2] 📝    DEX: [+1] 📝    INS: [+0] 📝          │
│ KNO: [-1] 📝    STR: [+3] 📝    VAL: [+2] 📝          │
│                                                       │
│ ═══ Racial Perks ═══                                 │
│ • Sharp (+4 Talent Points)                           │
│ • Hardy (+5 Stamina)                                 │
│                                                       │
│ ═══ Selected Abilities ═══                           │
│ • Born in Armor                                      │
│ • Weapon Mastery                                     │
│ • Hold the Line                                      │
│                                                       │
│ ═══ Derived Stats (Aspects) ═══                      │
│ Defense:  [12] 📝                                     │
│ Daring:   [8 ] 📝                                     │
│ Stamina:  [45] 📝    (Original: 42) [↻ Reset]        │
│           ↑ User added +3 from ability               │
│ Favor:    [14] 📝                                     │
│                                                       │
│ ═══ Talents (18 total) ═══                           │
│ Athletics:     [3] 📝    Charisma:      [2] 📝       │
│ Combat Rest:   [2] 📝    Concentration: [0] 📝       │
│ [... all 18 talents editable ...]                    │
│                                                       │
│ ═══ Ability Effects & Manual Adjustments ═══         │
│ ┌───────────────────────────────────────────────┐   │
│ │ Born in Armor: +1 Defense (already added)     │   │
│ │ Weapon Mastery: +2 damage with swords         │   │
│ │ Hold the Line: Special ability (see rulebook) │   │
│ │ Hardy perk: +5 Stamina (already calculated)   │   │
│ │                                                │   │
│ └───────────────────────────────────────────────┘   │
│                                                       │
│ ═══ Starting Equipment ═══                           │
│ ┌───────────────────────────────────────────────┐   │
│ │ - Longsword (1d12 damage)                      │   │
│ │ - Chain mail armor                             │   │
│ │ - Shield (+1 Defense)                          │   │
│ │ - Backpack with rations and rope               │   │
│ └───────────────────────────────────────────────┘   │
│                                                       │
│ ═══ Other Notes ═══                                  │
│ ┌───────────────────────────────────────────────┐   │
│ │ Remember to discuss background with GM         │   │
│ │                                                │   │
│ └───────────────────────────────────────────────┘   │
│                                                       │
│  [↻ Reset All to Calculated Values]                  │
│                                                       │
│                [⬅ Back]  [Generate PDF →]             │
└───────────────────────────────────────────────────────┘
```

### Technical Implementation

**State Management**:
```typescript
// Add to CharacterCreator.tsx state
interface EditableCharacterData extends BasicCharacterData {
  // Original calculated values (preserved for reset functionality)
  calculatedStats?: {
    defense: number;
    daring: number;
    stamina: number;
    mana?: number;     // Mages only
    favor?: number;    // Acolytes only
    blessCount?: number; // Acolytes only
  };

  // User-entered notes
  userNotes?: {
    abilityNotes: string;    // How abilities affect stats
    equipment: string;        // Starting equipment
    otherNotes: string;       // Any other notes
  };

  // Track which fields have been manually overridden
  overriddenFields?: Set<string>;
}
```

**Editable Field Component**:
```typescript
// src/components/EditableField.tsx
interface EditableFieldProps {
  label: string;
  value: string | number;
  originalValue?: string | number;
  type?: 'text' | 'number' | 'select';
  options?: string[];  // For select fields
  onChange: (value: string | number) => void;
  onReset?: () => void;
}

export function EditableField({
  label,
  value,
  originalValue,
  type = 'text',
  options,
  onChange,
  onReset
}: EditableFieldProps) {
  const isOverridden = originalValue !== undefined && value !== originalValue;

  return (
    <div className="editable-field">
      <label>{label}:</label>

      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={isOverridden ? 'overridden' : ''}
        >
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(
            type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
          )}
          className={isOverridden ? 'overridden' : ''}
        />
      )}

      <span className="edit-indicator" title="This field is editable">📝</span>

      {isOverridden && onReset && (
        <div className="override-info">
          <span className="original-note">
            (Original: {originalValue})
          </span>
          <button
            className="reset-button"
            onClick={onReset}
            title="Reset to original value"
          >
            ↻ Reset
          </button>
        </div>
      )}
    </div>
  );
}
```

**Editable Stat Field Component** (for derived stats):
```typescript
// src/components/EditableStatField.tsx
interface EditableStatFieldProps {
  label: string;
  value: number;
  calculatedValue: number;
  onChange: (value: number) => void;
  onReset: () => void;
}

export function EditableStatField({
  label,
  value,
  calculatedValue,
  onChange,
  onReset
}: EditableStatFieldProps) {
  const isOverridden = value !== calculatedValue;

  return (
    <div className="editable-stat-field">
      <label>{label}:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className={isOverridden ? 'overridden' : ''}
      />
      <span className="edit-indicator">📝</span>

      {isOverridden && (
        <div className="override-info">
          <span className="calculated-note">
            (Calculated: {calculatedValue})
          </span>
          <button
            className="reset-button"
            onClick={onReset}
            title="Reset to calculated value"
          >
            ↻ Reset
          </button>
        </div>
      )}
    </div>
  );
}
```

**Update Review Step (Step 7)**:
```typescript
// In CharacterCreator.tsx, case 7 (Review)
case 7:
  // Calculate all stats fresh (for "original" values)
  const calculatedStats = useMemo(() => {
    const { stats } = calculateDerivedStats(
      characterData.class,
      parseInt(characterData.level) || 1,
      characterData.race,
      characterData.racialPerks || [],
      attributeMap
    );
    return stats;
  }, [characterData.class, characterData.level, characterData.race,
      characterData.racialPerks, characterData.attributes]);

  return (
    <div className="step-content">
      <h2>Review & Finalize Character</h2>
      <div className="info-banner">
        ✏️ All fields below are editable. Adjust as needed to account for
        abilities and other bonuses.
      </div>

      <div className="review-section editable-review">
        <h3>Basic Information</h3>
        <div className="editable-fields-grid">
          <EditableField
            label="Name"
            value={characterData.characterName}
            type="text"
            onChange={(val) => handleInputChange('characterName', val as string)}
          />
          <EditableField
            label="Class"
            value={characterData.class}
            type="select"
            options={CLASSES}
            onChange={(val) => handleInputChange('class', val as string)}
          />
          {/* ... all other basic fields ... */}
        </div>

        <h3>Attributes</h3>
        <div className="editable-fields-grid">
          {ATTRIBUTE_NAMES.map(attrName => {
            const attr = characterData.attributes?.find(a => a.name === attrName);
            return (
              <EditableField
                key={attrName}
                label={attrName}
                value={attr?.points || 0}
                type="number"
                onChange={(val) => {
                  // Update attribute in attributes array
                  const newAttrs = [...(characterData.attributes || [])];
                  const idx = newAttrs.findIndex(a => a.name === attrName);
                  if (idx >= 0) {
                    newAttrs[idx] = { name: attrName, points: val as number };
                  } else {
                    newAttrs.push({ name: attrName, points: val as number });
                  }
                  handleAttributesChange(newAttrs);
                }}
              />
            );
          })}
        </div>

        <h3>Derived Stats (Aspects)</h3>
        <div className="editable-stats-grid">
          <EditableStatField
            label="Defense"
            value={characterData.derivedStats?.defense ?? calculatedStats.defense}
            calculatedValue={calculatedStats.defense}
            onChange={(val) =>
              setCharacterData(prev => ({
                ...prev,
                derivedStats: { ...prev.derivedStats, defense: val }
              }))
            }
            onReset={() =>
              setCharacterData(prev => ({
                ...prev,
                derivedStats: { ...prev.derivedStats, defense: calculatedStats.defense }
              }))
            }
          />
          {/* ... all other derived stats ... */}
        </div>

        <h3>Ability Effects & Manual Adjustments</h3>
        <textarea
          value={characterData.userNotes?.abilityNotes || ''}
          onChange={(e) =>
            setCharacterData(prev => ({
              ...prev,
              userNotes: {
                ...prev.userNotes,
                abilityNotes: e.target.value
              }
            }))
          }
          placeholder="Track ability effects here (e.g., 'Born in Armor: +1 Defense')"
          rows={6}
        />

        {/* ... Equipment and Other Notes sections ... */}

        <button
          className="reset-all-button"
          onClick={resetAllToCalculated}
        >
          ↻ Reset All to Calculated Values
        </button>
      </div>
    </div>
  );
```

**Reset Functionality**:
```typescript
// In CharacterCreator.tsx
const resetAllToCalculated = () => {
  // Reset derived stats
  setCharacterData(prev => ({
    ...prev,
    derivedStats: undefined,  // Will fall back to calculated
  }));

  // Optionally: reset attributes, talents, etc.
  // Or just reset overridden fields
};
```

**PDF Generation with Editable Values**:
```typescript
// In pdfFiller.ts, update fillCharacterSheet()
export async function fillCharacterSheet(
  pdfPath: string,
  data: BasicCharacterData
): Promise<Uint8Array> {
  // ... existing code ...

  // Use edited values if present, otherwise calculated values
  const finalStats = {
    defense: data.derivedStats?.defense ?? calculatedStats.defense,
    daring: data.derivedStats?.daring ?? calculatedStats.daring,
    stamina: data.derivedStats?.stamina ?? calculatedStats.stamina,
    mana: data.derivedStats?.mana ?? calculatedStats.mana,
    favor: data.derivedStats?.favor ?? calculatedStats.favor,
  };

  // Draw stats on PDF
  drawText(page, finalStats.defense.toString(), { x: 500, y: 600 });
  // ... etc

  // Optionally: Add a note to PDF if values were manually adjusted
  if (data.derivedStats) {
    drawText(page, '* Stats manually adjusted', {
      x: 50, y: 50, size: 8
    });
  }

  // Add user notes to PDF if present
  if (data.userNotes?.abilityNotes) {
    // Find a section on the PDF for notes
    drawText(page, data.userNotes.abilityNotes, {
      x: 50, y: 250, size: 8, maxWidth: 250
    });
  }

  // ... rest of PDF generation
}
```

### Styling (matching existing CSS)

**Editable Fields Styling**:
```css
/* EditableField.css */
.editable-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.editable-field:hover {
  background-color: #fafafa;  /* --bg-hover */
}

.editable-field label {
  font-weight: 600;
  color: #424242;  /* --text-tertiary */
  min-width: 120px;
}

.editable-field input,
.editable-field select {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;  /* --bg-border */
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.editable-field input:focus,
.editable-field select:focus {
  outline: none;
  border-color: #3949ab;  /* --primary-500 */
}

/* Highlight overridden fields */
.editable-field input.overridden,
.editable-field select.overridden {
  border-color: #f57c00;  /* --warning-icon */
  background-color: #fff3e0;  /* --warning-bg */
}

.edit-indicator {
  color: #616161;  /* --text-muted */
  font-size: 0.875rem;
}

.override-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #616161;  /* --text-muted */
}

.reset-button {
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;  /* --bg-card */
  border: 1px solid #e0e0e0;  /* --bg-border */
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.reset-button:hover {
  background: #e0e0e0;
  border-color: #bdbdbd;
}

/* Grid layout for editable fields */
.editable-fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.editable-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Info banner at top of review */
.info-banner {
  padding: 1rem;
  background: #e3f2fd;  /* --info-bg */
  color: #0d47a1;  /* --info-text */
  border-left: 4px solid #1976d2;  /* --info-icon */
  border-radius: 4px;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

/* Reset all button */
.reset-all-button {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.reset-all-button:hover {
  background: #e0e0e0;
  border-color: #bdbdbd;
}

/* Textarea for notes */
.editable-review textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.2s;
}

.editable-review textarea:focus {
  outline: none;
  border-color: #3949ab;
}

.editable-review textarea::placeholder {
  color: #616161;  /* --text-muted */
}
```

**Responsive Behavior**:
```css
@media (max-width: 768px) {
  .editable-fields-grid {
    grid-template-columns: 1fr;
  }

  .editable-stats-grid {
    grid-template-columns: 1fr;
  }

  .editable-field {
    flex-direction: column;
    align-items: flex-start;
  }

  .editable-field label {
    min-width: auto;
  }

  .override-info {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## Implementation Roadmap

### Phase 1: Ability Selection (Estimated: 4-6 hours)

**Step 1.1**: Setup & Data Preparation (30 min)
- ✅ Verify abilities data structure in `abilities.ts`
- ✅ Install Fuse.js: `npm install fuse.js`
- ✅ Create component file structure

**Step 1.2**: Core Components (2 hours)
- ✅ Create `AbilitySelector.tsx` (main container with state)
- ✅ Create `AbilitySearchBar.tsx` (search input)
- ✅ Create `AbilityList.tsx` (left column)
- ✅ Create `AbilityCard.tsx` (individual ability card)
- ✅ Create `AbilityDetailsPanel.tsx` (right column)

**Step 1.3**: Functionality (1.5 hours)
- ✅ Implement fuzzy search with Fuse.js
- ✅ Implement prerequisite validation logic
- ✅ Implement ability sorting (selected → available → locked)
- ✅ Add soft warning for too many abilities (threshold: 4)
- ✅ Wire up selection/deselection handlers

**Step 1.4**: Integration (1 hour)
- ✅ Add abilities step to CharacterCreator (step 6)
- ✅ Update progress indicator (7 steps total)
- ✅ Update validation logic
- ✅ Update Review step to show selected abilities

**Step 1.5**: Styling & Polish (1-2 hours)
- ✅ Apply CSS matching project design system
- ✅ Add animations and transitions
- ✅ Test responsive layout
- ✅ Keyboard navigation
- ✅ Accessibility (ARIA labels, focus management)

**Step 1.6**: Testing (30 min)
- ✅ Test ability selection flow for all classes
- ✅ Test prerequisite validation
- ✅ Test search functionality
- ✅ Test soft warning display
- ✅ Test integration with PDF generation

---

### Phase 2: Editable Summary (Estimated: 3-4 hours)

**Step 2.1**: Component Creation (1 hour)
- ✅ Create `EditableField.tsx` (generic editable field)
- ✅ Create `EditableStatField.tsx` (for derived stats with calc value)
- ✅ Add state management for overrides and notes

**Step 2.2**: Update Review Step (1.5 hours)
- ✅ Convert all basic info fields to EditableField
- ✅ Convert all attributes to editable
- ✅ Convert all talents to editable
- ✅ Convert all derived stats to EditableStatField
- ✅ Add text areas for notes (ability effects, equipment, other)

**Step 2.3**: Reset Functionality (30 min)
- ✅ Implement individual field reset buttons
- ✅ Implement "Reset All" button
- ✅ Preserve original calculated values

**Step 2.4**: PDF Integration (30 min)
- ✅ Update `fillCharacterSheet()` to use edited values
- ✅ Add user notes to PDF (if space available)
- ✅ Optionally add indicator if values were manually adjusted

**Step 2.5**: Styling & Polish (1 hour)
- ✅ Apply CSS matching project design system
- ✅ Style override indicators (orange border, warning colors)
- ✅ Style reset buttons
- ✅ Test responsive layout
- ✅ Accessibility

**Step 2.6**: Testing (30 min)
- ✅ Test all fields are editable
- ✅ Test reset functionality (individual and all)
- ✅ Test edited values carry through to PDF
- ✅ Test notes appear on PDF
- ✅ End-to-end character creation with edits

---

### Phase 3: Integration & Polish (Estimated: 2-3 hours)

**Step 3.1**: End-to-End Testing (1 hour)
- ✅ Create test characters for all classes
- ✅ Test full workflow: Basic → Abilities → Review → PDF
- ✅ Verify abilities display in review
- ✅ Verify edited stats appear correctly in PDF
- ✅ Test edge cases (no abilities selected, many abilities, etc.)

**Step 3.2**: UX Improvements (1 hour)
- ✅ Add helpful tooltips throughout
- ✅ Add instructional text where needed
- ✅ Improve error messages (if any)
- ✅ Add loading states (if needed)

**Step 3.3**: Performance & Accessibility (1 hour)
- ✅ Optimize ability list rendering (memo/virtualization if needed)
- ✅ Test keyboard navigation throughout
- ✅ Add ARIA labels for screen readers
- ✅ Test with browser accessibility tools
- ✅ Ensure all interactive elements are focusable

---

## Total Estimated Time: 9-13 hours

**Breakdown**:
- Phase 1 (Ability Selection): 4-6 hours
- Phase 2 (Editable Summary): 3-4 hours
- Phase 3 (Integration & Polish): 2-3 hours

---

## Key Decisions Summary

### Ability Selection
- ✅ **Two-column layout** (list + details panel)
- ✅ **Fuzzy search** using Fuse.js (no category filters)
- ✅ **Soft warning** for > 4 abilities (non-blocking)
- ✅ **Prerequisite validation** (visual indicators, disabled if not met)
- ✅ **Smart sorting** (selected → available → locked)
- ✅ **Abilities on PDF**: Yes, print selected ability names
- ✅ **Abilities in Review**: Yes, show full list with descriptions

### Editable Summary
- ✅ **All fields editable** (basic info, attributes, talents, derived stats)
- ✅ **No validation** on edited values (trust user)
- ✅ **Preserve originals** with reset buttons (individual + reset all)
- ✅ **Override indicators** (orange border, "Original: X" text)
- ✅ **User notes** (ability effects, equipment, other notes)
- ✅ **Notes on PDF**: Add to PDF if space available

### Technical
- ✅ **7-step wizard** (added Abilities as step 6, Review moved to 7)
- ✅ **State management**: Extend BasicCharacterData with abilities array
- ✅ **Styling**: Match existing CSS color palette and patterns
- ✅ **Responsive**: Mobile-friendly layouts (stack columns)
- ✅ **Accessibility**: Keyboard nav, ARIA labels, focus management

---

## Files to Create/Modify

### New Files (Phase 1):
```
src/components/AbilitySelector.tsx
src/components/AbilitySelector.css
src/components/AbilitySearchBar.tsx
src/components/AbilityList.tsx
src/components/AbilityCard.tsx
src/components/AbilityDetailsPanel.tsx
```

### New Files (Phase 2):
```
src/components/EditableField.tsx
src/components/EditableField.css
src/components/EditableStatField.tsx
```

### Modified Files:
```
src/components/CharacterCreator.tsx    # Add step 6, update step 7
src/components/CharacterCreator.css     # Update for 7 steps
src/utils/pdfFiller.ts                  # Handle abilities and edited values
src/data/abilities.ts                   # Verify structure (already exists)
package.json                            # Add fuse.js dependency
```

---

## Future Enhancements (Post-MVP)

### Ability Selection
- [ ] Category filters (if user requests later)
- [ ] Ability comparison mode (side-by-side)
- [ ] Recommended abilities for class/build
- [ ] Ability prerequisites tree visualization
- [ ] Save/load ability presets

### Editable Summary
- [ ] Calculation helper (show formulas on hover)
- [ ] Undo/redo for edits
- [ ] Export notes separately (text file)
- [ ] Validation warnings (optional, non-blocking)
- [ ] Change tracking (show what was modified)

### Integration
- [ ] Save character data to localStorage
- [ ] Export/import character JSON
- [ ] Print preview before PDF generation
- [ ] Multiple PDF templates
- [ ] Character versioning (track changes over time)

---

## Testing Checklist

### Ability Selection
- [ ] Search finds abilities by name
- [ ] Search finds abilities by description text
- [ ] Prerequisites correctly disable abilities
- [ ] Soft warning appears at 5+ abilities
- [ ] Selection persists when navigating back/forward
- [ ] Details panel updates on ability click
- [ ] Keyboard navigation works (Tab, Enter, Arrows)
- [ ] Responsive layout works on mobile
- [ ] All class abilities are available
- [ ] Selected abilities appear in Review step

### Editable Summary
- [ ] All basic info fields are editable
- [ ] All attributes are editable
- [ ] All talents are editable
- [ ] All derived stats are editable
- [ ] Reset buttons restore original values
- [ ] Reset All button works
- [ ] Override indicators appear correctly
- [ ] Notes text areas save content
- [ ] Edited values appear in generated PDF
- [ ] Notes appear in generated PDF
- [ ] Responsive layout works on mobile

### Integration
- [ ] Full character creation flow (1→7) works
- [ ] Navigation between steps preserves data
- [ ] PDF generates with all data (original + edited)
- [ ] Dev mode works with new steps
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All links and buttons work
- [ ] Accessibility tools pass (no critical issues)

---

## Notes & Considerations

### Why No Automated Ability Calculations?
Ability effects in Athia RPG are complex and situational:
- Some grant conditional bonuses ("Advantage when...")
- Some modify specific scenarios ("Once per day...")
- Some are purely narrative ("Can speak to animals")
- Some combine multiple effects
- Automating would require extensive rule parsing and edge case handling
- Manual adjustment is simpler, more flexible, and less error-prone

### Why Make Everything Editable?
- **User freedom**: Power users can customize as needed
- **Simplicity**: Uniform UX (everything editable, no special cases)
- **Flexibility**: Handles house rules and GM variations
- **Trust**: We calculated defaults, but user has final say
- **Edge cases**: Handles unusual builds or homebrew content

### Why Soft Warning Instead of Hard Limit?
- Different campaigns have different power levels
- Higher level characters may legitimately have more abilities
- House rules may allow more/fewer abilities
- New players get guidance, experienced players have freedom
- Non-blocking preserves user agency

---

*Last Updated: 2025-10-21*
*Status: Ready for implementation*
*Estimated Completion: 9-13 hours total work*
