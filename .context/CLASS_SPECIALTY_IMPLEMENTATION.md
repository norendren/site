# Class Specialty System Implementation

**Date:** 2025-10-13
**Status:** In Progress - UI Complete, PDF Rendering Pending

---

## Overview

Implemented class-specific specialty systems for all 4 Athia classes:
- **Acolyte**: Bless value (auto-calculated, increases every odd level)
- **Mage**: Arcane Aptitude allocation (5 arts with point allocation)
- **Rogue**: Specialty selection system (choose from 5 types)
- **Warrior**: Combat Styles (5 styles with 3 tiers each)

---

## Files Created

### 1. `/src/utils/classSpecialties.ts`
Central data structures and utility functions for all class specialties.

**Key exports:**
```typescript
// Acolyte
export function calculateAcolyteBless(level: number): number

// Mage
export const ARCANE_ARTS = ['Air', 'Cosmos', 'Earth', 'Fire', 'Water']
export const ARCANE_ART_ATTRIBUTES: Record<ArcaneArt, string>
export function calculateMageAptitudePool(level: number): number
export function calculateArcaneArtScore(artPoints, attributeModifier, bonuses): number
export interface ArcaneAptitudeAllocation { art, points }

// Rogue
export const ROGUE_SPECIALTY_TYPES = ['Ability', 'Arcane', 'Divine', 'Talent', 'Stamina']
export const ROGUE_TALENT_BONUSES = ['Ace', 'Certain', 'Easy', 'Golden', 'Swift']
export function calculateRogueSpecialtyCount(level: number): number
export interface RogueSpecialtySelection { type, arcaneArt?, divineInfluence?, talentBonuses? }

// Warrior
export const WARRIOR_COMBAT_STYLES = ['Collaborative', 'Deliberate', 'Ferocious', 'Martial', 'Strategic']
export const COMBAT_STYLE_TIERS = ['Apprentice', 'Journeyman', 'Master']
export const COMBAT_STYLE_DESCRIPTIONS: Record<Style, Record<Tier, string>>
export function calculateWarriorStyleCount(level: number): number
export function getNextStyleTier(currentTier): CombatStyleTier | null
export interface WarriorStyleSelection { style, tier }
```

### 2. `/src/components/ClassSpecialtySelector.tsx`
Router component that displays the appropriate class-specific component based on character class.

### 3. `/src/components/AcolyteBlessDisplay.tsx`
Read-only display showing calculated Bless value with progression table.

**Features:**
- Large display card showing current Bless value
- Full progression table (levels 1-10)
- Current level highlighted
- Explanation of how Bless works

### 4. `/src/components/MageArcaneAllocator.tsx`
Interactive allocator for distributing Arcane Aptitude points across 5 arts.

**Features:**
- Pool display showing total/spent/remaining points
- Grid of 5 art cards (Air, Cosmos, Earth, Fire, Water)
- +/- buttons for point allocation
- Shows associated attribute for each art
- Prevents over-allocation
- Formula display: Score = Points + Attribute Modifier + Bonuses

### 5. `/src/components/RogueSpecialtiesSelector.tsx`
Interactive selector for choosing and configuring Rogue specialties.

**Features:**
- Add/remove specialty cards
- Type selector for each specialty (5 types)
- Dynamic configuration based on type:
  - **Arcane**: Dropdown to select art
  - **Divine**: Text input for influence
  - **Talent**: Info about available bonuses
  - **Ability/Stamina**: No additional config
- Tracks specialty count (2 at level 1, +1 every even level)

### 6. `/src/components/WarriorStylesSelector.tsx`
Interactive selector for choosing and upgrading Warrior Combat Styles.

**Features:**
- Expandable/collapsible style cards
- Style selector dropdown (5 styles)
- Tier progression (Apprentice → Journeyman → Master)
- Upgrade button to advance to next tier
- Full tier descriptions for each style
- Preview of all tiers when expanded
- Style count tracker (1 at level 1, +1 every odd level)

### 7. `/src/components/ClassSpecialty.css`
Comprehensive styling for all class specialty components.

**Styling includes:**
- Bless value cards with gradient backgrounds
- Progression tables with current level highlighting
- Aptitude pool displays
- Arcane art cards with hover effects
- Point allocation buttons
- Specialty cards with expandable sections
- Tier badges (Apprentice/Journeyman/Master)
- Add/remove buttons
- Error states

---

## Files Modified

### 1. `/src/utils/pdfFiller.ts`
- Added imports for class specialty types
- Updated `BasicCharacterData` interface to include:
  ```typescript
  arcaneAllocations?: ArcaneAptitudeAllocation[];
  rogueSpecialties?: RogueSpecialtySelection[];
  warriorStyles?: WarriorStyleSelection[];
  ```

### 2. `/src/components/CharacterCreator.tsx`
- Added imports for ClassSpecialtySelector and class specialty types
- Updated state initialization with class specialty arrays
- Added handler functions:
  - `handleArcaneAllocationsChange()`
  - `handleRogueSpecialtiesChange()`
  - `handleWarriorStylesChange()`
- Updated wizard to 6 steps (was 5):
  1. Basic Info
  2. Racial Perks
  3. **Class Specialty** (NEW)
  4. Attributes
  5. Talents
  6. Review
- Updated progress indicator to show 6 steps
- Updated validation to include step 3
- Added step 3 rendering with ClassSpecialtySelector component

---

## Formulas & Mechanics

### Acolyte - Bless
```
Bless = 1 + floor((level - 1) / 2)

Level 1: 1
Level 2: 1
Level 3: 2
Level 4: 2
Level 5: 3
...
```

### Mage - Arcane Aptitude
```
Total Pool = 5 + (2 × (level - 1))

Level 1: 5 points
Level 2: 7 points
Level 3: 9 points
...

Art Score = Points + Attribute Modifier + Bonuses
```

**Art → Attribute Mapping:**
- Air → KNO
- Cosmos → INS
- Earth → CON
- Fire → VAL
- Water → DEX

### Rogue - Specialties
```
Count = 2 + floor(level / 2)

Level 1: 2
Level 2: 3
Level 3: 3
Level 4: 4
...
```

**Specialty Types:**
- **Ability**: +1 to Ability Checks
- **Arcane**: Gain proficiency in one Arcane Art
- **Divine**: Gain access to one Divine Influence
- **Talent**: Apply bonuses (Ace, Certain, Easy, Golden, Swift) to Talents
- **Stamina**: +2 to Stamina pool

### Warrior - Combat Styles
```
Count = 1 + floor(level / 2)

Level 1: 1
Level 2: 1
Level 3: 2
Level 4: 2
Level 5: 3
...
```

**Styles:**
- Collaborative
- Deliberate
- Ferocious
- Martial
- Strategic

**Tiers:**
- Apprentice → Journeyman → Master

Each style has unique abilities at each tier (stored in `COMBAT_STYLE_DESCRIPTIONS`).

---

## Data Flow

1. **User navigates to Step 3** (Class Specialty)
2. **CharacterCreator** renders `ClassSpecialtySelector` with character class and level
3. **ClassSpecialtySelector** routes to appropriate component:
   - Acolyte → `AcolyteBlessDisplay`
   - Mage → `MageArcaneAllocator`
   - Rogue → `RogueSpecialtiesSelector`
   - Warrior → `WarriorStylesSelector`
4. **User makes selections** in the class-specific component
5. **Component calls onChange handler** with updated data
6. **CharacterCreator updates state** (arcaneAllocations, rogueSpecialties, or warriorStyles)
7. **Data persists** through navigation and is included in final character data

---

## Pending Work

### PDF Rendering (Not Yet Implemented)
Need to add functions to `pdfFiller.ts` to render class specialties on the PDF:

1. **Acolyte Bless**
   - Draw Bless value at specific coordinate
   - Auto-calculate from level

2. **Mage Arcane Aptitude**
   - Draw 5 art names
   - Draw points allocated to each art
   - Calculate and draw final scores (with attribute modifiers)

3. **Rogue Specialties**
   - Draw list of selected specialties
   - Draw specialty type for each
   - Draw configuration (art name, influence, etc.)

4. **Warrior Combat Styles**
   - Draw list of selected styles
   - Draw tier for each style
   - Possibly draw tier descriptions

### Testing
- Manual testing of all 4 class specialty UIs
- Verify point allocation prevents over-spending (Mage)
- Verify specialty/style counts match level (Rogue/Warrior)
- Test all specialty type configurations (Rogue)
- Test style tier progression (Warrior)
- Verify data persistence across wizard steps
- Test PDF generation with class specialties

---

## Type Safety

All class specialty data is fully typed:
```typescript
type ArcaneArt = 'Air' | 'Cosmos' | 'Earth' | 'Fire' | 'Water';
type RogueSpecialtyType = 'Ability' | 'Arcane' | 'Divine' | 'Talent' | 'Stamina';
type RogueTalentBonus = 'Ace' | 'Certain' | 'Easy' | 'Golden' | 'Swift';
type WarriorCombatStyle = 'Collaborative' | 'Deliberate' | 'Ferocious' | 'Martial' | 'Strategic';
type CombatStyleTier = 'Apprentice' | 'Journeyman' | 'Master';
```

Interfaces use discriminated unions where appropriate (e.g., RogueSpecialtySelection with optional fields based on type).

---

## UI/UX Highlights

- **Consistent design language** across all 4 components
- **Visual feedback** for current selections
- **Point tracking** prevents errors (Mage aptitude)
- **Progressive disclosure** (Warrior styles expand for details)
- **Contextual help** text explaining mechanics
- **Responsive layouts** work on different screen sizes
- **Accessible** buttons and form controls with proper labels

---

## Next Steps

1. ✅ Complete CharacterCreator integration (DONE)
2. ⏳ Add PDF rendering functions for class specialties (IN PROGRESS)
3. ⏳ Test all class specialty implementations
4. Add coordinate mappings for class specialty PDF fields
5. Test PDF generation with all classes
6. Consider adding review section display for class specialties (step 6)

---

*Implementation started: 2025-10-13*
*UI Components completed: 2025-10-13*
*Last updated: 2025-10-13*
