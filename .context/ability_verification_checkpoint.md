# Ability Verification & Correction Checkpoint

**Date:** 2025-10-21
**Status:** In Progress - Need to complete automated fix

---

## Critical Discovery

**101 out of 300 abilities (34%) have COMPLETELY INCORRECT descriptions.**

These are not minor errors or mix-ups - they are complete hallucinations from a previous AI session. The descriptions don't exist anywhere in the source PDFs.

### Examples of Hallucinated Descriptions:

| Ability | Hallucinated (WRONG) | Actual PDF (CORRECT) |
|---------|---------------------|----------------------|
| **Vesting Faith** | "+1 Defense when Favor ≥ half maximum" | "Spend Blessings to grant Stamina at rate of 2+Level per Blessing" |
| **Stalwart** | "DR = Level against physical Damage when Favor ≥ half" | "Spend Stamina to improve Faith Checks (1:1 ratio)" |
| **Holy Emanation I** | "Heal allies 1 Stamina per Round in Holy Aura" | "Enemies have Disadvantage on first Hit Check against you" |
| **Thaumaturge** | "Gain Mana as 1st Level Mage; Learn Spells" | "Infuse Divine capabilities into tinctures/potions (Hermetics Check + Favor)" |

**Impact:** This affects 7 out of 10 Acolyte abilities flagged with `hasMechanicalEffect: true`, making the mechanical implementation plan invalid until descriptions are corrected.

---

## Complete List of Mismatched Abilities (101 total)

### Acolyte (23 mismatches):
- Holy Emanation I ❌
- Holy Emanation II ❌
- Hospitaller ❌
- Improved Holy Aura ❌
- Indulgence ❌
- Martyr I ❌
- Martyr II ❌
- Miracle ❌
- Oathbinder ❌
- Pious ❌
- Relic Antiquarian ❌
- Reprisal ❌
- Rouse ❌
- Selfish God ❌
- Sense Enemy ❌
- Shared Favor ❌
- Sincere ❌
- Smite I ❌
- Soul Steal ❌
- Stalwart ❌ (MECHANICAL)
- Vesting Faith ❌ (MECHANICAL)
- Zealot I ❌
- Zealot II ❌

### Mage (22 mismatches):
- Master of Air, Master of Cosmos, Master of Earth, Master of Fire, Master of Water
- Memorized Spell, Multitasker, Mystic Leverage I, Personal Immunity, Powerful Magic
- Ravage I, Ravage II, Repeat Spell II, Rune Release, Runemaster I, Runemaster II
- Shorthand, Steady Runework, Sustained Arcana, Switch, Ritual Magic, Wild Mage

### Rogue (21 mismatches):
- Inspire Success, Jack of All Trades, Knockout Artist, Learn From Mistakes, My Weapon
- Obscure Knowledge, Performer, Poison Master, Purposeful, Precise I, Precise II
- Pugilist I, Pugilist II, Redirection I, Redirection II, Sharpshooter I, Sharpshooter II
- Steady Aim I, Steady Aim II, Tumbler, Willful Focus

### Warrior (17 mismatches):
- King's Code, Marksman, Mounted Assault, Mounted Combatant, Opportunist, Pelter
- Ruthless I, Sacrifice, Shield Fighter, Shield Mastery, Swift Reload, Thrill of Victory I
- Thrill of Victory II, Trample, Undying, Valiant, Weapon Master II

### General (18 mismatches):
- Light-Footed, Merciless, Mystical III, Nature's Blessing, Predisposed, Purebred
- Quick Healer, Reduced Sleep, Renowned, Robust, Shield Guard I, Shield Guard II
- Thick Skull, Tireless, Tough, Unremarkable, Untouchable, Wizened

---

## Verification Tools Created

### 1. **verify-all-abilities.sh**
- Comprehensive verification script
- Extracts all PDFs to text
- Runs TypeScript verification
- **Result:** 199/300 match (66%), 101 mismatch (34%)

### 2. **spot-check-ability.sh**
- Quick manual spot-checking
- Usage: `./scripts/spot-check-ability.sh "Ability Name" "search string"`

### 3. **extract-ability-from-pdf.sh**
- Extract single ability from PDFs
- Usage: `./scripts/extract-ability-from-pdf.sh "Ability Name"`

### 4. **parse-pdf-abilities.ts** ⭐ KEY TOOL
- **Automated PDF parser**
- Extracts all ability descriptions from PDFs
- Output: `scripts/parsed-abilities.json`
- **Result:** 309 entries extracted (includes 9 junk entries - table fragments)

---

## PDF Structure Analysis

✅ **PDFs are programmatically parseable!**

**Consistent Structure:**
```
Ability Name
Class[, Prerequisites]
Description paragraph...
[blank line or next ability]
```

**Files:**
- `ability_description_1.pdf` - ~29 abilities
- `ability_description_2.pdf` - ~62 abilities
- `ability_description_3.pdf` - ~67 abilities
- `ability_description_remaining.pdf` - ~151 abilities

**Total Expected:** 300 abilities (per ability_titles.pdf)

---

## Parsed Data Quality

**File:** `/home/dylan/dev/site/scripts/parsed-abilities.json`

**Status:**
- ✅ 309 entries extracted
- ❌ 9 junk entries (sentence fragments that parser mistook for abilities)
- ✅ No duplicate ability names
- ✅ Spot-checks show accurate extraction:
  - Vesting Faith ✓
  - Holy Emanation I ✓
  - Stalwart ✓
  - Thaumaturge ✓

**Known Junk Entries (to be filtered):**
1. "Selecting this Ability allows you to immediately select an Ability from the"
2. "proper prayer and veneration, Lady Moon can bestow her boons upon the"
3. "proper prayer and veneration, the High Night can bestow his boons upon the"
4. "Purify: With dedicated and uninterrupted eight hours of prayer, the"
5. "cannot be used for any other purpose (for example, casting Spells) unless the"
6. "When brimming with their god's favor, some Acolytes become empowered. An"
7. "Stamina to succeed in hitting their target (when it would have otherwise cost the"
8. "may gain Advantage on any single roll. This Mana will remain invested until the"
9. "The effects of this Ability are cumulative with each successful casting. Once the"
10. "up) to your Damage. This Ability stacks upon itself, for example, a 5th level"
11. "counted as yours, and thus cannot be recouped until expended. If gifted to an"

---

## Recommended Fix Approach

### **AUTOMATED BATCH FIX** (High Confidence)

**Steps:**
1. ✅ Parse all PDFs → `parsed-abilities.json` (DONE)
2. ⏳ Filter out junk entries (entries with name.length > 30 chars)
3. ⏳ Match parsed abilities to existing code by ability name
4. ⏳ Replace descriptions for all 101 mismatches
5. ⏳ Preserve existing `effect` and `hasMechanicalEffect` fields
6. ⏳ Re-run verification to confirm 100% match

**Advantages:**
- Fast (can fix all 101 in one script run)
- Reliable (using source PDF text directly)
- Auditable (`parsed-abilities.json` available for review)

**Risk Mitigation:**
- Script will create backup before changes
- Preview 5-10 fixes before applying all
- Can be run incrementally (class by class)

---

## Current Ability Status

### Descriptions:
- ✅ 199/300 correct (66%)
- ❌ 101/300 hallucinated (34%)

### Effect Fields:
- ✅ 60/300 populated (Acolyte only)
- ⏳ 240/300 pending

### Mechanical Effect Flags:
- ✅ 10 Acolyte abilities marked
- ⚠️ **7 of 10 have incorrect descriptions** (must fix before implementing)

---

## Next Steps

### IMMEDIATE (Before mechanical implementation):
1. **Fix the 101 mismatched descriptions**
   - Use automated batch fix script
   - Verify against ability_titles.pdf for correct count (300)
   - Re-run verification → target 100% match

2. **Verify the 10 Acolyte mechanical abilities**
   - Re-read corrected descriptions
   - Update `effect` fields if needed
   - Confirm `hasMechanicalEffect` flags are still appropriate

### THEN (After data is correct):
3. **Design integration approach for ability effects**
4. **Implement mechanical ability functionality**

---

## Files Modified/Created

### Created:
- `/home/dylan/dev/site/scripts/verify-all-abilities.sh`
- `/home/dylan/dev/site/scripts/spot-check-ability.sh`
- `/home/dylan/dev/site/scripts/extract-ability-from-pdf.sh`
- `/home/dylan/dev/site/scripts/parse-pdf-abilities.ts`
- `/home/dylan/dev/site/scripts/verify-abilities-detailed.ts`
- `/home/dylan/dev/site/scripts/parsed-abilities.json` (309 entries)

### Modified:
- `/home/dylan/dev/site/src/data/abilities.ts` - Fixed Thaumaturge description (1/101)

### Documentation:
- This file: `.context/ability_verification_checkpoint.md`

---

## Questions to Resolve

1. **Ability count discrepancy:** Parser found 309 entries, expected 300
   - Need to verify against `ability_titles.pdf` canonical list
   - Filter out 9 known junk entries → 300 clean entries
   - Cross-reference to ensure all 300 are correct

2. **Effect field preservation:** Some mismatched abilities have `effect` fields
   - Should we preserve them if description changes?
   - Or regenerate `effect` fields from corrected descriptions?

3. **Mechanical ability re-evaluation:** After fixing descriptions
   - Do the 10 flagged Acolyte abilities still have mechanical effects?
   - Do we need to re-categorize which abilities are mechanical?

---

## Key Insight

**The hallucinations were systematic and plausible-sounding**, which is why they went undetected:
- Used correct game terminology (Favor, Bless, Holy Aura, Defense, DR)
- Followed proper formatting patterns
- Sounded mechanically reasonable
- But were completely fabricated

**This demonstrates the critical importance of verification against source documents.**
