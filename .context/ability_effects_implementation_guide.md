# Ability Effects Implementation Guide

## Overview

This guide documents the process of adding `effect` fields and `hasMechanicalEffect` flags to abilities in the abilities.ts file. This work was completed for **Acolyte** abilities and needs to be replicated for Mage, Rogue, Warrior, and General classes.

## Changes Made to Ability Interface

```typescript
export interface Ability {
  description?: string;
  effect?: string; // Human-readable summary of what the ability does mechanically
  prerequisiteClass?: string;
  prerequisiteAbilities?: string[];
  restrictions?: string;
  canTakeMultiple?: boolean;
  hasMechanicalEffect?: boolean; // True if this ability modifies character sheet stats/calculations
}
```

## Process for Each Class

### Step 1: Add Effect Fields

For each ability, add an `effect` field that provides a **concise, human-readable summary** of what the ability does. This should be action-oriented and include key mechanical details.

**Guidelines for writing effect fields:**
- Keep it concise (1-2 lines max)
- Use abbreviations: "1/Day", "1/Encounter", "DR" (Damage Reduction), etc.
- Include formulas where relevant: "DR = Level", "+1 Defense", etc.
- Use mathematical notation: "×2" for doubling, "≥" for greater than or equal
- List multiple effects with semicolons: "Effect 1; Effect 2; Effect 3"

**Examples from Acolyte:**

```typescript
// Simple action ability
"Anoint": {
  effect: "Can use Bless on objects to grant Advantage to the wielder's next Check with that item"
}

// Conditional bonus
"Vesting Faith": {
  effect: "+1 Defense when Favor ≥ half maximum"
}

// Resource modification
"Beneficent God": {
  effect: "+1 starting Bless; gain +1 Bless every level instead of every other level"
}

// Multiple daily powers
"Death Devotee": {
  effect: "1/Day each: Auto-succeed Strength Check; Double Holy Aura range for Death Intervention; Free 1-Favor Death Intervention"
}

// Trade-off ability
"Selfish God": {
  effect: "Lose 1 Influence (not Divination); Maximum Favor × 2"
}
```

### Step 2: Identify Mechanical Effects

Mark abilities with `hasMechanicalEffect: true` if they:

1. **Modify character sheet stats** (Defense, Stamina, Mana, etc.)
2. **Change resource counts** (Bless, Favor, Spell slots, etc.)
3. **Alter progression rates** (gain resources per level differently)
4. **Add or remove features** (Influences, weapon proficiencies, etc.)
5. **Grant conditional stat bonuses** (bonuses that depend on other stats)

**Do NOT mark as mechanical if they:**
- Provide situational advantages that aren't calculated on sheet (Advantage on specific checks)
- Grant abilities that are player-triggered (use Bless in new ways)
- Offer narrative/roleplay benefits (sense enemies, prayer powers)

### Step 3: Document Mechanical Abilities

Keep a list of abilities with `hasMechanicalEffect: true` for each class to guide character sheet calculation implementation.

## Acolyte Abilities with Mechanical Effects

| Ability | Effect Description | Modifies |
|---------|-------------------|----------|
| **Beneficent God** | +1 starting Bless; gain +1 Bless every level instead of every other level | Bless count, progression |
| **Greater God** | +1 Divine Influence access | Influences list |
| **Hospitaller** | Patient regains 2× Stamina when you help them Recuperate | Healing multiplier |
| **Improved Holy Aura** | Holy Aura range × 2 | Holy Aura range |
| **Indulgence** | Gain +1 temporary max Favor for every 3 Favor below maximum | Max Favor (temporary) |
| **Miracle** | +1 Divine Influence access (repeatable) | Influences list |
| **Selfish God** | Lose 1 Influence (not Divination); Maximum Favor × 2 | Influences list, Max Favor |
| **Stalwart** | DR = Level against physical Damage when Favor ≥ half maximum | Damage Reduction |
| **Thaumaturge** | Gain Mana as 1st Level Mage; Learn 1 Spell from chosen Arcane Art | Mana, Spells known |
| **Vesting Faith** | +1 Defense when Favor ≥ half maximum | Defense |

---

## Proposed MechanicalEffect Field Structure

For abilities marked with `hasMechanicalEffect: true`, we'll eventually need structured data to apply these modifications programmatically. Here's a proposed structure:

```typescript
interface AbilityModifier {
  type: 'stat' | 'resource' | 'derived' | 'conditional' | 'progression' | 'collection';
  target: string; // What stat/resource to modify
  operation: 'add' | 'multiply' | 'set' | 'formula';
  value: number | string; // Static value or formula
  condition?: string; // Optional condition (e.g., "favor >= maxFavor / 2")
}

export interface Ability {
  description?: string;
  effect?: string;
  prerequisiteClass?: string;
  prerequisiteAbilities?: string[];
  restrictions?: string;
  canTakeMultiple?: boolean;
  hasMechanicalEffect?: boolean;
  modifiers?: AbilityModifier[]; // To be added later
}
```

### Example Implementations

**Simple Stat Bonus:**
```typescript
"Vesting Faith": {
  effect: "+1 Defense when Favor ≥ half maximum",
  hasMechanicalEffect: true,
  modifiers: [{
    type: 'conditional',
    target: 'defense',
    operation: 'add',
    value: 1,
    condition: 'favor >= maxFavor / 2'
  }]
}
```

**Resource Modification:**
```typescript
"Beneficent God": {
  effect: "+1 starting Bless; gain +1 Bless every level instead of every other level",
  hasMechanicalEffect: true,
  modifiers: [
    {
      type: 'resource',
      target: 'startingBless',
      operation: 'add',
      value: 1
    },
    {
      type: 'progression',
      target: 'blessPerLevel',
      operation: 'set',
      value: 1 // Instead of 0.5
    }
  ]
}
```

**Collection Modification:**
```typescript
"Greater God": {
  effect: "+1 Divine Influence access",
  hasMechanicalEffect: true,
  modifiers: [{
    type: 'collection',
    target: 'influences',
    operation: 'add',
    value: 1 // Adds to count, actual selection is player choice
  }]
}
```

**Multiplier:**
```typescript
"Improved Holy Aura": {
  effect: "Holy Aura range × 2",
  hasMechanicalEffect: true,
  modifiers: [{
    type: 'stat',
    target: 'holyAuraRange',
    operation: 'multiply',
    value: 2
  }]
}
```

**Complex Trade-off:**
```typescript
"Selfish God": {
  effect: "Lose 1 Influence (not Divination); Maximum Favor × 2",
  hasMechanicalEffect: true,
  modifiers: [
    {
      type: 'collection',
      target: 'influences',
      operation: 'add',
      value: -1 // Player must choose which to lose
    },
    {
      type: 'resource',
      target: 'maxFavor',
      operation: 'multiply',
      value: 2
    }
  ]
}
```

---

## Implementation Plan

### Phase 1: Add Effect Fields (Current Phase)
- ✅ Acolyte - COMPLETE (60/60 abilities)
- ⏳ Mage - TODO
- ⏳ Rogue - TODO
- ⏳ Warrior - TODO
- ⏳ General - TODO

### Phase 2: Character Sheet Integration (Future)
1. Create a utility function to parse abilities and extract modifiers
2. Build character stat calculator that applies ability modifiers
3. Handle conditional modifiers (check conditions before applying)
4. Handle progression modifiers (affect level-up calculations)
5. Handle collection modifiers (affect available choices)

### Phase 3: Add Structured Modifiers Field (Future)
Once character sheet calculation is working with the boolean flag, add the full `modifiers` field for more sophisticated calculation.

---

## Quick Reference: Effect Field Patterns

**Frequency indicators:**
- `1/Day:` - Once per day
- `1/Encounter:` - Once per encounter
- `1/Round:` - Once per round
- `1/Session:` - Once per session
- No prefix - Always active or at-will

**Conditional indicators:**
- `when X ≥ Y` - Active when condition is true
- `while X` - Continuous condition
- `When Downed:` - Triggered on specific state

**Resource modifications:**
- `+X [resource]` - Increases resource
- `[stat] × X` - Multiplies stat
- `DR = X` - Sets Damage Reduction to value
- `gain +X per level` - Affects progression

**Action types:**
- `(Action)` - Requires an Action
- `(Free Action)` - Requires a Free Action
- `(Maneuver)` - Requires a Maneuver
- No indicator - Not action-limited

---

## Notes for Future Classes

### Expected Mechanical Effect Categories by Class

**Mage:**
- Mana modifications
- Spell count/grimoire capacity
- Caster Level adjustments
- Arcane Aptitude bonuses
- Spell range/duration/damage modifiers
- Maintained spell limits

**Rogue:**
- Expertise level grants
- Sneak Attack damage modifications
- Movement speed bonuses
- Defense bonuses (light armor)
- Bless count (if multiclassing Acolyte themes)
- Critical hit modifications

**Warrior:**
- Stamina bonuses
- Hit bonuses
- Damage bonuses
- Defense bonuses (armor)
- Critical hit range modifications
- Weapon training grants

**General:**
- Attribute bonuses (Str, Dex, Con, etc.)
- Attribute maximum increases
- Training grants (weapon, armor, shields)
- Skill point bonuses
- Movement speed
- Starting resources (heirlooms, equipment)

---

## Workflow for Next Class

1. **Read** the abilities.ts file for the target class
2. **For each ability:**
   - Extract the key mechanical action/benefit from description
   - Write concise `effect` field (1-2 lines)
   - Determine if it modifies character sheet calculations
   - Add `hasMechanicalEffect: true` if it does
3. **Create a summary** list of abilities with mechanical effects
4. **Update** this guide with class-specific mechanical abilities

---

## Questions to Ask When Reviewing Abilities

1. **Does this modify a number on the character sheet?** (Defense, Stamina, Mana, etc.)
2. **Does this change how resources are counted or gained?** (Bless per level, max Favor, etc.)
3. **Does this grant access to new systems?** (Influences, weapon types, armor types, etc.)
4. **Does this conditionally modify stats?** ("+1 Defense when X", "DR when Y", etc.)
5. **Does this change progression?** (Gain resources at different rates per level)

If **YES** to any → `hasMechanicalEffect: true`

If it only provides:
- Narrative permissions (can do X)
- Situational advantages (Advantage on checks)
- Player-choice abilities (spend resource for effect)
- Triggered abilities (when X happens, do Y)

Then → No mechanical effect flag needed (just `effect` field)
