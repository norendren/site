# Character Generator Architecture

## Current vs. Recommended State Structure

### Current (Simple - what we have now)
```typescript
{
  characterName: string,
  class: string,
  race: string,
  house: string,
  faith: string,
  age: string
}
```

### Recommended (With Derived Stats)
```typescript
{
  // User-entered basic info
  basic: {
    characterName: string,
    class: string,
    race: string,
    house: string,
    faith: string,
    age: string
  },

  // Calculated/derived values based on selections
  stats: {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  },

  // Racial bonuses applied
  racialTraits: {
    bonuses: { stat: string, value: number }[],
    abilities: string[]
  },

  // Class features
  classFeatures: {
    hitDice: string,
    abilities: string[],
    proficiencies: string[]
  }
}
```

## When to Calculate Derived Values

### Option 1: Calculate on Selection (Recommended)
- When user selects a race → immediately calculate racial bonuses
- When user selects a class → immediately calculate class features
- Display these in the UI so user sees their complete character
- Store everything in state
- Generate PDF from complete state

**Pros:**
- User sees their character build in real-time
- Can preview full character before generating PDF
- All data is in one place
- Easy to validate (e.g., "Bantam can't be Warrior")

**Cons:**
- More complex state management
- Need to define race/class rules

### Option 2: Calculate Only on PDF Generation
- Keep only basic selections in state
- Calculate everything when "Generate PDF" is clicked
- Apply all bonuses/features during PDF generation

**Pros:**
- Simpler state
- Less UI to build

**Cons:**
- User doesn't see derived stats until after download
- Can't preview or validate
- Makes testing harder

## Recommended Approach

**Phase 1 (Now - Basic Fields)**
- Keep current simple state
- Just fill basic info fields on PDF
- Get coordinates working for basic fields

**Phase 2 (Add Stat Calculations)**
1. Create race/class definition files:
   ```typescript
   // src/data/races.ts
   export const RACE_DATA = {
     Bantam: {
       statBonuses: { dexterity: +2, strength: -2 },
       abilities: ["Small Size", "Lucky"],
       // etc.
     },
     // ...
   }
   ```

2. Expand state to include calculated values
3. Add `useEffect` hooks to recalculate when race/class changes
4. Display derived stats in the UI
5. Add those fields to PDF generation

**Phase 3 (Full Character Sheet)**
- Add manual stat allocation
- Add equipment, spells, etc.
- Complete character sheet UI
- Full PDF generation

## Example Implementation (Phase 2)

```typescript
// In CharacterCreator component
const [characterData, setCharacterData] = useState({
  basic: { ... },
  stats: { str: 10, dex: 10, ... },
  derived: { ... }
});

// Recalculate when race changes
useEffect(() => {
  if (characterData.basic.race) {
    const raceData = RACE_DATA[characterData.basic.race];
    const newStats = applyRacialBonuses(characterData.stats, raceData.bonuses);
    setCharacterData(prev => ({
      ...prev,
      stats: newStats,
      derived: { ...prev.derived, racialTraits: raceData.abilities }
    }));
  }
}, [characterData.basic.race]);
```

## Decision Point

**For now, your current approach is fine for basic fields!**

When you're ready to add derived stats:
1. Create data files for race/class rules
2. Expand the state structure
3. Add calculation logic
4. Update PDF generation to include new fields

You can do this incrementally - start with just racial stat bonuses, then add class features, etc.
