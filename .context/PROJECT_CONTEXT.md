# Athia RPG Character Generator - Project Context

## Project Goal
Create a character creation tool for the Athia RPG that generates fully filled-out PDF character sheets and educates new players about the game system during character creation.

## Current Status: Phase 1 (Basic Fields + PDF Generation)

### What Works ✅
- Basic character form with 6 core fields (Name, Class, Race, House, Faith, Age)
- Level selection and talent point calculation per class (defaults to level 1)
- **Attribute allocation system** (6 attributes: CON, DEX, INS, KNO, STR, VAL)
  - Campaign pool selector (Commoners: 0, Young Heroes: 2, Heroes: 4)
  - Individual attribute adjustments from -3 to +3
  - Validation ensuring total equals selected pool
  - PDF text rendering for attribute values
- **Talent point allocation system** (18 talents with individual point tracking, 0-6 points per talent)
  - Talent score calculation: Points + Attribute Modifier + (future: Abilities + Racial Perks)
  - Real-time total display in UI with attribute breakdown
  - PDF rendering of talent totals
- **Race reference data system** (comprehensive data structure for all 7 playable races)
  - Physical traits (height, weight, lifespan)
  - Health tier bonuses (Fatigued, Battered, Injured)
  - All racial perks with concise mechanical summaries
  - **Racial perk selection UI** (choose 2 perks per character)
  - **Formalized mechanical effects system** with typed effect data structures
  - **Utility functions for calculating perk bonuses** (derived stats, health, talent points, etc.)
- **Health calculation system** (Fatigued, Battered, Injured maximums)
  - Formula: Health Max = Race Bonus + CON Modifier + Class Bonus (+ Perk Bonuses ready)
  - Automatic calculation and PDF rendering
  - Current values left blank for player tracking
- **Educational helper text system** (Layer 1: inline preview, Layer 2: detailed modal)
- PDF generation and download using pdf-lib
- PDF coordinate-based field filling (all basic fields mapped)
- PDF talent bubble rendering (6 bubbles per talent, arithmetic coordinate calculation)
- Class progression tracking using arithmetic progression (base + increment × (level - 1))

### What's In Progress 🚧
- **Ability Selection & Editable Summary Implementation** (see ABILITY_SELECTION_AND_EDITABLE_SUMMARY.md)
  - Phase 1: Ability selection UI with two-column browser (search + details)
    - Fuzzy search with Fuse.js
    - Prerequisite validation (visual indicators)
    - Soft warning for > 4 abilities (non-blocking)
    - Smart sorting: selected → available → locked
  - Phase 2: Fully editable review page
    - ALL fields editable (basic info, attributes, talents, derived stats)
    - Individual and "Reset All" buttons to restore calculated values
    - User notes for ability effects, equipment, and other adjustments
  - **Design Decision**: NOT automating ability benefit calculations
    - Abilities have complex, situational effects
    - Users manually adjust stats in editable review page
    - Provides flexibility and handles edge cases/house rules
- Printing of class specialties on PDF (warrior styles, etc.)
  - Consider truncation/shortening of ability descriptions, they might quickly get unweildy
- Implement equipment and related calculations

### Recently Completed ✨ (2025-10-14)
- **Integrated all racial perk bonuses into character calculations**
  - ✅ Talent point bonuses (e.g., Human "Sharp" +4 points) - working in talent pool
  - ✅ Health tier bonuses (e.g., Dwarf "Hardy" +1 Injured/level) - working in health calculation
  - ✅ Derived stat bonuses (e.g., Human "Courageous" +1 Daring) - working in new derived stats system
  - ✅ Created `derivedStats.ts` utility with formulas for Defense, Daring, Stamina, Mana, Favor
  - ✅ Added DerivedStatsDisplay component showing calculated stats with perk bonuses
  - ✅ Integrated derived stats into Review step and PDF generation
  - ✅ All bonuses now automatically calculated and applied throughout the system

### What's Next 📋
- **IMMEDIATE**: Implement ability selection UI (Phase 1)
  - Create AbilitySelector components
  - Add fuzzy search functionality
  - Integrate into character creator as step 6
- **IMMEDIATE**: Implement editable review page (Phase 2)
  - Create EditableField components
  - Make all review fields editable
  - Add user notes sections
- Extend helper text to races and talents
- Add base movement display and calculation (accounting for "Fast" perk)
- Add derived stat for Movement Speed
- Test PDF coordinate accuracy for all newly added fields

---

## Design System - Color Palette

**IMPORTANT**: Always reference this palette when adding new UI components or styling. All colors have been tested for WCAG AA accessibility (4.5:1 contrast ratio minimum).

### Primary Brand Colors
```css
/* Indigo/Purple Theme - Main brand colors */
--primary-500: #3949ab;      /* Primary actions, headings */
--primary-400: #5e35b1;      /* Gradients, accents */
--primary-300: #7986cb;      /* Borders, less prominent elements */
--primary-200: #9fa8da;      /* Hover states, muted actions */
--primary-100: #c5cae9;      /* Very light backgrounds */
--primary-50:  #e8eaf6;      /* Card backgrounds, sections */
```

### Text Colors (Light Mode)
```css
--text-primary:   #1a1a1a;   /* Body text, high emphasis */
--text-secondary: #2c2c2c;   /* Paragraphs, medium emphasis */
--text-tertiary:  #424242;   /* Labels, low emphasis */
--text-muted:     #616161;   /* Disabled, placeholder text */
```

### Text Colors (Dark Mode)
```css
--text-primary-dark:   #ffffff;   /* Body text, high emphasis */
--text-secondary-dark: #f5f5f5;   /* Paragraphs, medium emphasis */
--text-tertiary-dark:  #e0e0e0;   /* Labels, low emphasis */
--text-muted-dark:     #bdbdbd;   /* Disabled, placeholder text */
```

### Background Colors (Light Mode)
```css
--bg-base:     #ffffff;      /* Main background */
--bg-card:     #f5f5f5;      /* Card/panel backgrounds */
--bg-hover:    #fafafa;      /* Hover states */
--bg-border:   #e0e0e0;      /* Borders and dividers */
```

### Background Colors (Dark Mode)
```css
--bg-base-dark:    #1e1e1e;  /* Main background */
--bg-card-dark:    #2a2a2a;  /* Card/panel backgrounds */
--bg-hover-dark:   #333333;  /* Hover states */
--bg-border-dark:  #404040;  /* Borders and dividers */
```

### Semantic Colors - Success (Green)
```css
/* Light Mode */
--success-text:       #1b5e20;  /* Dark green text */
--success-bg:         #e8f5e9;  /* Very light green background */
--success-icon:       #2e7d32;  /* Medium green for icons */
--success-border:     #81c784;  /* Light green borders */

/* Dark Mode */
--success-text-dark:  #a5d6a7;  /* Light green text */
--success-bg-dark:    rgba(46, 125, 50, 0.3);  /* Semi-transparent green */
--success-icon-dark:  #81c784;  /* Lighter green for icons */
```

### Semantic Colors - Warning/Attention (Orange)
```css
/* Light Mode */
--warning-text:       #e65100;  /* Dark orange text */
--warning-bg:         #fff3e0;  /* Very light orange background */
--warning-icon:       #f57c00;  /* Medium orange for icons */
--warning-border:     #ffb74d;  /* Light orange borders */

/* Dark Mode */
--warning-text-dark:  #ffcc80;  /* Light orange text */
--warning-bg-dark:    rgba(245, 124, 0, 0.3);  /* Semi-transparent orange */
--warning-icon-dark:  #ffb74d;  /* Lighter orange for icons */
```

### Semantic Colors - Error (Red)
```css
/* Light Mode */
--error-text:         #c62828;  /* Dark red text */
--error-bg:           #ffebee;  /* Very light red background */
--error-icon:         #e53935;  /* Medium red for icons */

/* Dark Mode */
--error-text-dark:    #ef9a9a;  /* Light red text */
--error-bg-dark:      rgba(229, 57, 53, 0.3);  /* Semi-transparent red */
```

### Semantic Colors - Info (Blue)
```css
/* Light Mode */
--info-text:          #0d47a1;  /* Dark blue text */
--info-bg:            #e3f2fd;  /* Very light blue background */
--info-icon:          #1976d2;  /* Medium blue for icons */

/* Dark Mode */
--info-text-dark:     #90caf9;  /* Light blue text */
--info-bg-dark:       rgba(25, 118, 210, 0.3);  /* Semi-transparent blue */
```

### Accent Colors
```css
--accent-purple:      #6a1b9a;  /* Secondary accent (light mode) */
--accent-purple-dark: #ce93d8;  /* Secondary accent (dark mode) */
```

### Usage Guidelines

**DO ✓**
- Use `--text-primary` (#1a1a1a) for important body text on light backgrounds
- Use solid backgrounds (#e8f5e9, #fff3e0) for semantic colored sections
- Test all custom colors with a contrast checker (aim for 4.5:1 minimum)
- Use gradients with `--primary-500` → `--primary-400` for buttons/emphasis
- Add `font-weight: 500-700` to improve readability on colored backgrounds

**DON'T ✗**
- Don't use rgba() with < 10% opacity for backgrounds with text (too low contrast)
- Don't use `#333` or `#666` (replace with `--text-primary/secondary/tertiary`)
- Don't create new purple/blue shades - use the existing primary palette
- Don't place dark text on dark backgrounds or light on light
- Avoid pure black (#000000) - use `--text-primary` (#1a1a1a) instead

### Common Patterns

**Card/Panel with Border:**
```css
background: #e8eaf6;  /* --primary-50 */
border: 1px solid #9fa8da;  /* --primary-300 */
color: #1a1a1a;  /* --text-primary */
```

**Clickable Link/Button:**
```css
color: #3949ab;  /* --primary-500 */
font-weight: 700;
```

**Gradient Background:**
```css
background: linear-gradient(135deg, #3949ab 0%, #5e35b1 100%);
color: white;  /* Always white on gradient */
```

**List Item with Semantic Color:**
```css
/* Success item */
background: #e8f5e9;
color: #1b5e20;
border-left: 4px solid #2e7d32;
```

---

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **PDF Manipulation**: pdf-lib
- **Styling**: CSS Modules

### Key Files Map
```
src/
├── components/
│   ├── CharacterCreator.tsx       # Main 7-step wizard component (updated from 6)
│   ├── CharacterCreator.css       # Form styling with grid layout
│   ├── TalentAllocator.tsx        # Talent point distribution UI (0-6 points per talent)
│   ├── TalentAllocator.css        # Talent bubble styling
│   ├── AttributeAllocator.tsx     # Attribute pool allocation UI
│   ├── RacialPerksSelector.tsx    # 2-perk selection with mechanical summaries
│   ├── RacialPerksSelector.css    # Perk card styling
│   ├── ClassSpecialtySelector.tsx # Router for class-specific components
│   ├── DerivedStatsDisplay.tsx    # Calculated stats display with perk bonuses
│   ├── DerivedStatsDisplay.css    # Derived stats styling
│   ├── AbilitySelector.tsx        # NEW: Main ability selection component (step 6)
│   ├── AbilitySelector.css        # NEW: Two-column layout styling
│   ├── AbilitySearchBar.tsx       # NEW: Search input with fuzzy search
│   ├── AbilityList.tsx            # NEW: Scrollable list of ability cards
│   ├── AbilityCard.tsx            # NEW: Individual ability card component
│   ├── AbilityDetailsPanel.tsx    # NEW: Right-side details panel
│   ├── EditableField.tsx          # NEW: Generic editable field component
│   ├── EditableField.css          # NEW: Editable field styling
│   ├── EditableStatField.tsx      # NEW: Editable derived stat with reset
│   ├── ClassInfoPreview.tsx       # Layer 1: Inline class summary on selection
│   ├── ClassInfoPreview.css       # Preview card styling
│   ├── ClassInfoPanel.tsx         # Layer 2: Detailed class modal
│   └── ClassInfoPanel.css         # Modal overlay styling
├── data/
│   ├── classDescriptions.ts       # Rich class data for educational helper text
│   └── abilities.ts               # Complete ability data for all classes
├── utils/
│   ├── pdfFiller.ts               # PDF generation logic with bubble rendering
│   ├── pdfInspector.ts            # Dev tool for finding PDF coordinates
│   ├── athiaConstants.ts          # Game data: CLASSES, RACES, HOUSES, FAITHS
│   ├── classReference.ts          # Class progression with arithmetic formulas
│   ├── raceReference.ts           # Comprehensive race data: traits, health bonuses, perks
│   ├── derivedStats.ts            # Derived stats calculator (Defense, Daring, Stamina, Mana, Favor)
│   └── classSpecialties.ts        # Class specialty systems (Bless, Arcane, Rogue, Warrior)
├── pages/
│   ├── CharacterGenerator.tsx     # Main page
│   └── PDFInspector.tsx           # Coordinate mapping tool
└── assets/
    ├── pdfs/
    │   ├── sheet.pdf              # Fillable character sheet
    │   └── chargen.pdf            # Character generation reference
    ├── athia-quickstart.md        # Quick reference rules
    └── athia-talents-reference.md # All 18 talents with mechanics
```

### Current Data Structure
```typescript
BasicCharacterData {
  characterName: string
  class: string          // Acolyte, Mage, Rogue, Warrior
  level: string          // Defaults to '1'
  race: string          // Human, Bantam, Dwarf, Elf, Ferox, Goblin, Orc
  house: string         // Asos, Blayth, Cerrak, Draur, Lloar, Onin, Thercer
  faith: string         // None, Erebos, Ilios, Selene, The Triad
  age: string
  attributes: AttributeAllocation[]  // 6 core attributes
  talents: TalentAllocation[]        // 18 talents with point allocation
  abilities?: string[]               // NEW: Selected ability names (step 6)
  derivedStats?: DerivedStats        // NEW: User-edited derived stats (override calculated)
  userNotes?: UserNotes              // NEW: Free-form notes (step 7)
}

AttributeAllocation {
  name: string          // CON, DEX, INS, KNO, STR, VAL
  points: number        // -3 to +3 modifier
}

TalentAllocation {
  name: string          // One of 18 talent names
  points: number        // 0-6 points invested (1 point = 1 bubble)
}

DerivedStats {
  defense?: number      // Override calculated defense
  daring?: number       // Override calculated daring
  stamina?: number      // Override calculated stamina
  mana?: number         // Override calculated mana (Mages)
  favor?: number        // Override calculated favor (Acolytes)
  blessCount?: number   // Override calculated bless count (Acolytes)
}

UserNotes {
  abilityNotes: string  // How abilities affect stats
  equipment: string     // Starting equipment
  otherNotes: string    // Any other notes
}
```

---

## Key Decisions Made

### PDF Filling Approach
**Decision**: Use coordinate-based text rendering instead of form field filling
**Why**: More control over positioning, font, and formatting. Form fields can be inconsistent.
**Trade-off**: Need to manually map all field coordinates (tracked in PDF_COORDINATE_TRACKING.md)

### Attribute System Architecture
**Decision**: Use pool-based allocation with individual modifiers (-3 to +3)
**Why**: Matches Athia RPG rules where GM decides campaign power level (Commoners/Young Heroes/Heroes)
**Formula**: `Total Attribute Pool = Base Pool (0/2/4) + Attribute Bonus from Level`
- Attribute bonus increases every 2 levels: 0, 1, 1, 2, 2, 3, 3, 4, 4, 5
- Level 1: +0, Level 2: +1, Level 3: +1, Level 4: +2, etc.
**Implementation**:
- `getAttributeBonus()` retrieves attribute bonus from class progression tables
- `totalAttributePool` calculated using useMemo (recomputes when class/level/base pool changes)
- `AttributeAllocator` component provides pool selector and individual attribute controls
- Real-time validation ensures sum equals calculated total pool
- All 6 attributes always rendered on PDF (defaulting to 0 if not set)
**Example**: Level 2 Young Heroes character has pool of 3 (2 base + 1 level bonus)
**Trade-off**: Requires validation logic to prevent over/under-allocation

### Talent System Architecture
**Decision**: Use point-based tracking (0-6 points per talent) instead of discrete expertise levels
**Why**: More granular control, direct mapping to bubbles (1 point = 1 bubble), simpler increment/decrement logic
**Implementation**: `TalentAllocation` interface uses `points: number` instead of `expertise: TalentExpertise`
**Trade-off**: Expertise labels (Apprentice/Journeyman/Master) derived from points rather than stored directly

**Decision**: Calculate total talent points using arithmetic progression
**Why**: Each class has different base and per-level progression (Acolyte: 10 + 3/lvl, Rogue: 15 + 4/lvl, etc.)
**Formula**: `base + (increment × (level - 1))`
**Implementation**: `generateProgression()` in `classReference.ts` uses arithmetic calculation instead of static tables

**Decision**: Calculate talent scores dynamically from multiple sources
**Why**: Athia RPG formula: Talent Score = Talent Points + Attribute Modifier + Abilities + Racial Perks
**Implementation**:
- `calculateTalentScore()` utility function in `classReference.ts`
- `getTalentAttributeModifier()` looks up associated attribute for each talent
- UI displays real-time totals with tooltip showing breakdown
- PDF renders formatted total scores (+/- sign)
**Current State**: Implements Points + Attribute Modifier (abilities and racial perks = 0 placeholder)
**Future**: Will add ability and racial bonuses when those systems are implemented

### Race Reference System Architecture
**Decision**: Create comprehensive managed data structure for all race information
**Why**: Avoid repeatedly consulting PDF, enable easy integration into character creator UI
**Implementation**:
- `raceReference.ts` contains complete data for all 7 playable races
- Each race includes: physical traits (height, weight, lifespan), health tier bonuses, all racial perks
- Racial perks have concise mechanical summaries for UI tooltips and display
- Type-safe interfaces with helper functions for querying race data
**Data Tracked**:
- **Health Tier Bonuses**: Fatigued/Battered/Injured modifiers per race (e.g., Human: +1/+1/+1, Ferox: +0/+0/+3)
- **Physical Traits**: Average height/weight (male/female), lifespan in years
- **Racial Perks**: All available perks (characters choose 2) with mechanical summaries
  - Example: "Advantage on Hit Check and Damage vs Savage family creatures"
  - Ready for integration into Perks section UI and talent score calculations
**Future Use**:
- Perks selection UI component (✓ IMPLEMENTED)
- Racial perk bonuses to talent scores (part of formula: Points + Attribute + Abilities + Racial Perks)
- Race comparison/educational tooltips

### Racial Perk Mechanical Effects System Architecture
**Decision**: Formalize perk effects using typed data structures instead of text-only descriptions
**Why**: Enable automatic calculation of bonuses, prevent errors, make effects queryable and type-safe
**Implementation**:
- Each `RacialPerk` includes an `effects` array of typed `PerkEffect` objects
- 10 effect types covering all mechanical impacts:
  1. **DerivedStatEffect**: Bonuses to daring, stamina, favor, mana, defense (flat or per-level)
  2. **TalentPointsEffect**: Additional talent points at character creation
  3. **HealthTierEffect**: Bonus health per level for specific tier
  4. **AttributeMaxModifierEffect**: Raises attribute cap from +3 to +4
  5. **MovementEffect**: Changes base movement speed (20' → 30')
  6. **TalentAdvantageEffect**: Grants advantage on specific talent checks
  7. **DamageReductionEffect**: DR from arcane spells or physical attacks
  8. **ProficiencyEffect**: Weapon, armor, or shield proficiencies
  9. **CombatAdvantageEffect**: Advantage on hit/damage vs specific targets
  10. **AbilityEffect**: Descriptive abilities (immunities, special mechanics)
- Utility functions for calculating bonuses:
  - `calculateDerivedStatBonuses()`: Total bonuses to all derived stats
  - `calculateHealthTierBonuses()`: Health tier bonuses from perks
  - `calculateTalentPointBonus()`: Bonus talent points (e.g., Human "Sharp" = +4)
  - `getTalentsWithAdvantage()`: List of talents with advantage
  - `getBaseMovement()`: Modified base movement speed
  - `getProficiencies()`: All weapon/armor/shield proficiencies
  - `getAttributeMaxModifiers()`: Attributes with raised caps
  - `getAbilityDescriptions()`: Descriptive special abilities
**Examples**:
- Human "Courageous": `{ type: 'derivedStat', stat: 'daring', value: 1 }`
- Human "Forceful": `{ type: 'derivedStat', stat: 'stamina', value: 1, perLevel: true }`
- Bantam "Nimble": `{ type: 'attributeMaxModifier', attribute: 'DEX', maxValue: 4 }`
- Dwarf "Hardy": `{ type: 'healthTier', tier: 'injured', value: 1, perLevel: true }`
**Benefits**:
- Type-safe: TypeScript catches errors at compile time
- Queryable: Easy to filter effects by type
- Testable: Pure functions make testing straightforward
- Scalable: Adding new effect types doesn't break existing code
- DRY: Calculation logic in one place, not scattered across components

### Health Calculation System Architecture
**Decision**: Calculate maximum health tier values from three sources (Race + CON + Class)
**Why**: Athia RPG health system uses three tiers (Fatigued, Battered, Injured) with bonuses from multiple sources
**Formula**: `Health Maximum = Race Bonus + CON Modifier + Class Bonus (by level)`
**Implementation**:
- `getClassHealthBonuses()` retrieves class health values from progression tables
- `getRaceHealthBonuses()` retrieves race health tier modifiers
- `drawHealthMaximums()` calculates and renders all three tier maximums on PDF
- Current health values left blank for player tracking during gameplay
**Example Calculation** (Level 1 Human Warrior with CON +2):
- Fatigued: +1 (Human) + 2 (CON) + 6 (Warrior) = 9
- Battered: +1 (Human) + 2 (CON) + 3 (Warrior) = 6
- Injured: +1 (Human) + 2 (CON) + 2 (Warrior) = 5
**PDF Coordinates**: Health maximums placed at x:500, y:710/685/660 (user will adjust as needed)

### State Management
**Decision**: Keep flat state structure for Phase 1, plan for nested structure later
**Why**: Simpler for basic fields, but will need derived stats later (see CHARACTER_DATA_ARCHITECTURE.md)
**Future**: Will expand to include calculated stats, racial bonuses, class features

### Educational UX (Current Work)
**Decision**: Multi-layer progressive disclosure system
**Why**: Balance between helping new players learn without overwhelming them
**Approach**:
  - Layer 1: Inline summary on selection
  - Layer 2: Detailed info panel/modal
  - (Future) Layer 3: Comparison mode

### Ability Selection & Manual Stat Adjustment Architecture
**Decision**: Do NOT automate ability benefit calculations; use manual adjustment in editable review page
**Why**: Ability effects are complex, situational, and varied:
- Many effects are conditional ("Advantage when...", "Once per day...")
- Some effects are narrative/descriptive ("Can speak to animals")
- Trying to automate all edge cases would be error-prone and time-consuming
- Manual adjustment provides flexibility for house rules and homebrew content
**Implementation**:
- **Ability Selection UI** (Step 6): Two-column browser with fuzzy search
  - Left column: Searchable list with visual status indicators (✓ selected, ⚠ restricted, 🔒 locked)
  - Right column: Detailed description panel
  - Fuzzy search using Fuse.js (searches names and descriptions)
  - Prerequisite validation with visual feedback
  - Soft warning for > 4 abilities (non-blocking)
  - Smart sorting: selected → available → locked
- **Editable Review Page** (Step 7): ALL fields are editable
  - Basic info: name, class, level, race, house, faith, age
  - Attributes: all 6 attributes (CON, DEX, INS, KNO, STR, VAL)
  - Talents: all 18 talent point allocations
  - Derived stats: Defense, Daring, Stamina, Mana, Favor, Bless count
  - User notes: Ability effects, equipment, other adjustments
  - Individual and "Reset All" buttons to restore calculated values
  - Override indicators show when values differ from calculated
  - NO validation on edited values (trust the user)
**Benefits**:
- Simpler implementation (no complex rule parsing)
- Handles all edge cases and unusual builds
- Supports house rules and GM variations
- User has final control and ownership
- Educational: forces users to understand their abilities
**Trade-off**: Users must manually calculate ability bonuses (acceptable for RPG audience)
**User Experience**:
1. User selects abilities in step 6 (sees full descriptions)
2. User proceeds to review (step 7)
3. Review shows calculated defaults for all stats
4. User manually adjusts stats to account for abilities
5. User adds notes about ability effects for reference
6. PDF generated with final (potentially edited) values

---

## Known Issues & Limitations

### PDF Coordinate Mapping is Tedious
- Only "Character Name" field verified so far (52, 738)
- Need to map: Class, Race, House, Faith, Age, and future fields
- Use PDFInspector tool at `/pdf-inspector` to find coordinates
- PDF origin is bottom-left (0,0), Y increases upward

### No Validation Rules Yet
- Need to add race/class restrictions (e.g., "Bantam can't be Warrior")
- No stat point pool validation
- No talent point overspending prevention (TalentAllocator handles this but need validation feedback)

### Static Game Data
- Classes, races, houses, faiths are hardcoded in `athiaConstants.ts`
- Based on Athia RPG Core Rulebook page numbers (documented in ATHIA_RACES_CLASSES.md)
- Will need rich data (descriptions, abilities, bonuses) for helper text and auto-calculation

---

## Game Content Reference

### Classes (Page 138)
- **Acolyte** (Page 142): Divine spellcasters and healers
- **Mage** (Page 145): Arcane magic wielders
- **Rogue** (Page 147): Stealth and skill specialists
- **Warrior** (Page 150): Martial combat experts

### Races (Page 116)
- **Human** (Page 117): Standard, versatile
- **Bantam** (Page 120): Small, agile
- **Dwarf** (Page 123): Sturdy, resilient
- **Elf** (Page 126): Graceful, magical affinity
- **Ferox** (Page 129): Bestial, fierce
- **Goblin** (Page 132): Cunning, resourceful
- **Orc** (Page 135): Powerful, tribal

### Talent System
18 core talents that characters allocate points to (in rulebook order):
1. Athletics (STR)
2. Charisma (VAL)
3. Combat Rest (CON)
4. Concentration (INS)
5. Craft (DEX)
6. Discipline (VAL)
7. Endurance (CON)
8. Exertion (STR)
9. Faith (VAL)
10. Hermetics (KNO)
11. Notice (INS)
12. Recuperation (CON)
13. Scholar (KNO)
14. Stealth (DEX)
15. Survival (KNO)
16. Swimming (STR)
17. Taming (INS)
18. Thievery (DEX)

**Point-Based System:**
- Each talent can have 0-6 points invested
- 1 point = 1 filled bubble on character sheet
- Expertise levels derived from points:
  - 0 points: Untrained (disadvantage on checks)
  - 1-2 points: Apprentice
  - 3-5 points: Journeyman (never worse than double disadvantage)
  - 6 points: Master (never at disadvantage)
- **Character Creation Limit**: Maximum 3 points per talent at creation (Journeyman)
- Master level (6 points) only achievable through advancement

**Talent Points by Class:**
Each class gets different talent points per level (tracked in classReference.ts):
- Acolyte: 10 base + 3 per level
- Mage: 10 base + 3 per level
- Rogue: 15 base + 4 per level
- Warrior: 10 base + 3 per level

---

## Development Workflow

### Starting Development
```bash
npm run dev
# Visit http://localhost:5173/character-generator
```

### Finding PDF Coordinates
1. Visit `/pdf-inspector`
2. Enter test text and adjust X/Y coordinates
3. Preview until positioned correctly
4. Update `PDF_COORDINATE_TRACKING.md` and `pdfFiller.ts`

### Adding New Features
1. Update this file (PROJECT_CONTEXT.md) with decisions made
2. Implement feature
3. Update relevant documentation files
4. Test PDF generation end-to-end

---

## Future Roadmap

### Phase 2: Derived Stats & Calculations
- Create race/class data files with bonuses and abilities
- Add stat allocation UI (CON, DEX, INS, KNO, STR, VAL)
- Calculate derived stats (Health, Defense, Daring, etc.)
- Display calculated values in UI before PDF generation

### Phase 3: Advanced Features
- Multi-step wizard UI for guided creation
- Equipment selection and tracking
- Magic system (Arcane/Divine spells)
- Character export/import (save progress)
- Validation and error handling
- Responsive design for mobile

### Phase 4: Polish
- Comparison mode for classes/races
- Tooltips and contextual help throughout
- Example character templates
- Print-friendly view
- Dark mode

---

## Notes & Pain Points

- **PDF coordinate mapping is tedious** - Consider automating or creating better tooling
- **Game data is scattered** - Need centralized data files for rich content (descriptions, mechanics)
- **No backend** - Everything is client-side. Future consideration: save characters to cloud?
- **PDF must have correct dimensions** - Current sheet.pdf uses bottom-left origin coordinate system

---

*Last Updated: 2025-10-21*
*Current Focus: Ability selection and editable summary implementation planned. See ABILITY_SELECTION_AND_EDITABLE_SUMMARY.md for comprehensive design doc. Two-phase approach: (1) Ability selector with fuzzy search and prerequisite validation, (2) Fully editable review page with manual stat adjustment. Key decision: NOT automating ability benefit calculations due to complexity; users manually adjust stats in final review. 7-step wizard: Basic Info → Perks → Class → Attributes → Talents → Abilities → Review (editable).*
