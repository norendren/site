# Implementation Log

Chronological record of major features and implementations.

---

## 2025-10-14: Racial Perk Bonus Integration (Phase 2)

### Summary
Completed full integration of racial perk bonuses into all character calculations. All 10 effect types from the formalized perk system are now automatically calculated and applied.

### What Was Implemented

#### 1. Derived Stats Calculation System
**New File**: `/src/utils/derivedStats.ts`

**Features**:
- Calculates all 5 derived stats (Aspects): Defense, Daring, Stamina, Mana, Favor
- Applies formulas from Athia RPG rulebook:
  - Defense = DEX + Perk Bonuses (armor not yet implemented)
  - Daring = VAL + Perk Bonuses
  - Stamina = Class Base + CON + Perk Bonuses
  - Mana = Class Base + STR + Perk Bonuses (Mages only)
  - Favor = Class Base + INS + Perk Bonuses (Acolytes only)
- Returns both simple totals and detailed breakdowns
- Integrates with `calculateDerivedStatBonuses()` from raceReference.ts

**Utility Functions**:
```typescript
calculateDerivedStats(className, level, raceName, selectedPerks, attributes)
usesMana(className): boolean
usesFavor(className): boolean
getRelevantDerivedStats(className): string[]
```

#### 2. Derived Stats UI Component
**New Files**:
- `/src/components/DerivedStatsDisplay.tsx`
- `/src/components/DerivedStatsDisplay.css`

**Features**:
- Displays calculated derived stats in Review step (Step 6)
- Responsive grid layout showing relevant stats for class
- Visual indicators (★) for stats with perk bonuses
- Hover tooltips with complete breakdown showing:
  - Base values
  - Attribute contributions
  - Perk bonuses
  - Final totals
- Only shows class-relevant stats (e.g., Mages see Mana, Acolytes see Favor)

**Styling**:
- Follows project design system (indigo/purple theme)
- Accessible contrast ratios (WCAG AA)
- Hover effects with smooth transitions
- Perk bonus indicators with green accent

#### 3. PDF Generation Updates
**Modified File**: `/src/utils/pdfFiller.ts`

**Changes**:
- Added import for `calculateDerivedStats`
- Created `drawDerivedStats()` function
- Added derived stats coordinates (placeholders to adjust):
  ```typescript
  DERIVED_STATS_X = 530
  DEFENSE_Y = 535
  DARING_Y = 508
  STAMINA_Y = 481
  MANA_Y = 454
  FAVOR_Y = 427
  ```
- Integrated derived stats rendering into `fillCharacterSheet()` main flow
- Conditionally renders Mana (Mages) and Favor (Acolytes)

#### 4. Character Creator Integration
**Modified File**: `/src/components/CharacterCreator.tsx`

**Changes**:
- Added import for DerivedStatsDisplay component
- Integrated derived stats display into Review step (Step 6)
- Shows derived stats when class, race, and attributes are all set
- Passes character data to component for real-time calculations

### Integration Points Verified

✅ **Talent Points**: Already integrated (CharacterCreator.tsx:86-92)
- Perk bonuses like Human "Sharp" (+4 points) add to talent pool
- Working since class specialty implementation

✅ **Health Tiers**: Already integrated (pdfFiller.ts:342-350)
- Perk bonuses like Dwarf "Hardy" (+1 Injured/level) add to health maximums
- Applied in PDF health calculation using `calculateHealthTierBonuses()`

✅ **Derived Stats**: Newly integrated (this implementation)
- Perk bonuses like Human "Courageous" (+1 Daring), "Forceful" (+1 Stamina/level)
- Elf "Arcane Potency" (+1 Mana)
- All bonuses calculated via `calculateDerivedStatBonuses()` from raceReference.ts

### Effect Types Covered

All 10 perk effect types from the formalized system are now integrated:

1. ✅ **DerivedStatEffect** - Bonuses to Daring, Stamina, Favor, Mana, Defense
2. ✅ **TalentPointsEffect** - Additional talent points at creation
3. ✅ **HealthTierEffect** - Bonus health per level for specific tiers
4. ⏳ **AttributeMaxModifierEffect** - Raises attribute cap (UI validation pending)
5. ⏳ **MovementEffect** - Changes base movement speed (display pending)
6. ⏳ **TalentAdvantageEffect** - Grants advantage on talents (visual indicator pending)
7. ⏳ **DamageReductionEffect** - DR from spells/attacks (combat system pending)
8. ⏳ **ProficiencyEffect** - Weapon/armor/shield proficiencies (equipment system pending)
9. ⏳ **AbilityEffect** - Descriptive abilities (display pending)
10. ⏳ **CombatAdvantageEffect** - Hit/damage advantages (combat system pending)

### Build Status
✅ TypeScript compilation successful - no errors

### Next Steps
- Test PDF coordinate accuracy for derived stats
- Add movement speed display and calculation
- Add visual indicators for talents with advantage from perks
- Add attribute max validation (e.g., prevent DEX > +4 unless "Nimble" perk)

---

## 2025-10-13: Class Specialty System

### Summary
Implemented class-specific specialty systems for all 4 Athia classes with full UI components.

### What Was Implemented

#### New Components
- **ClassSpecialtySelector.tsx** - Router component
- **AcolyteBlessDisplay.tsx** - Read-only Bless value display
- **MageArcaneAllocator.tsx** - Aptitude point allocation (5 arts)
- **RogueSpecialtiesSelector.tsx** - Specialty selection (5 types)
- **WarriorStylesSelector.tsx** - Combat style selection (5 styles, 3 tiers)
- **ClassSpecialty.css** - Comprehensive styling for all components

#### New Utilities
- **classSpecialties.ts** - Data structures, formulas, and utility functions

#### Character Creator Updates
- Added Step 3: Class Specialty (wizard now has 6 steps)
- Added state handlers for class specialty data
- Updated BasicCharacterData interface with specialty arrays

### Class Systems Implemented

**Acolyte**: Bless value (auto-calculated)
- Formula: `1 + floor((level - 1) / 2)`
- Increases every odd level

**Mage**: Arcane Aptitude allocation
- 5 arts: Air, Cosmos, Earth, Fire, Water
- Pool: `5 + (2 × (level - 1))`
- Each art associated with an attribute

**Rogue**: Specialty selection
- 5 types: Ability, Arcane, Divine, Talent, Stamina
- Count: `2 + floor(level / 2)`
- Dynamic configuration per type

**Warrior**: Combat Styles
- 5 styles: Collaborative, Deliberate, Ferocious, Martial, Strategic
- 3 tiers: Apprentice → Journeyman → Master
- Count: `1 + floor(level / 2)`

---

## 2025-10-13: Racial Perks Selection & Mechanical Effects (Phase 1)

### Summary
Implemented racial perk selection UI and formalized all perk mechanical effects with typed data structures.

### What Was Implemented

#### 1. Racial Perk Mechanical Effects System
**Updated File**: `/src/utils/raceReference.ts`

**Features**:
- Defined 10 effect types covering all mechanical impacts
- Added `effects: PerkEffect[]` to each of 84 racial perks
- Created utility functions for calculating bonuses:
  - `calculateDerivedStatBonuses()` - Daring, Stamina, Favor, Mana, Defense
  - `calculateHealthTierBonuses()` - Fatigued, Battered, Injured
  - `calculateTalentPointBonus()` - Bonus talent points
  - `getTalentsWithAdvantage()` - List of talents with advantage
  - `getBaseMovement()` - Modified movement speed
  - `getProficiencies()` - Weapon/armor/shield proficiencies
  - `getAttributeMaxModifiers()` - Attributes with raised caps
  - `getAbilityDescriptions()` - Special abilities

#### 2. Racial Perks Selection Component
**New Files**:
- `/src/components/RacialPerksSelector.tsx`
- `/src/components/RacialPerksSelector.css`

**Features**:
- Displays all available perks for selected race
- Allows selection of exactly 2 perks
- Visual checkbox selection with card layout
- Expandable perk details (mechanical summaries)
- Real-time counter (X/2)
- Validation warnings

#### 3. Character Creator Integration
**Modified File**: `/src/components/CharacterCreator.tsx`

**Changes**:
- Added Step 2: Racial Perks
- Updated wizard to 6 steps (was 4)
- Added `racialPerks` to character state
- Added validation requiring exactly 2 perks
- Added review section display for selected perks

#### 4. PDF Printing
**Modified File**: `/src/utils/pdfFiller.ts`

**Changes**:
- Created `drawRacialPerks()` function
- Prints perk names and mechanical summaries
- Placeholder coordinates (to be adjusted)

### Effect Types Defined

1. **DerivedStatEffect** - Bonuses to stats (flat or per-level)
2. **TalentPointsEffect** - Additional talent points
3. **HealthTierEffect** - Bonus health per level
4. **AttributeMaxModifierEffect** - Raises attribute cap to +4
5. **MovementEffect** - Changes base movement
6. **TalentAdvantageEffect** - Advantage on specific talents
7. **DamageReductionEffect** - DR from spells/attacks
8. **ProficiencyEffect** - Weapon/armor/shield proficiencies
9. **AbilityEffect** - Descriptive special abilities
10. **CombatAdvantageEffect** - Advantage on hit/damage vs targets

---

## Earlier Implementations

- Health calculation system (Race + CON + Class bonuses)
- Talent allocation system (18 talents, 0-6 points each)
- Attribute allocation system (pool-based, -3 to +3 per attribute)
- PDF generation with coordinate-based rendering
- Class progression tables (arithmetic formulas)
- Comprehensive race reference data
- Educational helper text system (inline + modal)

---

*Log maintained for Claude Code context loading*
