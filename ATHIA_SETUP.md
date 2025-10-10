# Athia Character Creator Setup

## What's Been Built

A barebones character creation tool for the Athia RPG system that allows users to:
1. Fill in basic character information (Name, Class, Race, House, Faith, Age)
2. Generate a filled PDF character sheet
3. Download the completed PDF

## Files Created

### Components
- **`src/components/CharacterCreator.tsx`** - Main form component
- **`src/components/CharacterCreator.css`** - Styling for the form

### Utilities
- **`src/utils/pdfFiller.ts`** - PDF manipulation logic using pdf-lib
- **`src/utils/pdfInspector.ts`** - Helper to inspect PDF field names
- **`src/utils/athiaConstants.ts`** - Constants for Classes, Races, Houses, Faiths

### Documentation
- **`src/assets/athia-quickstart.md`** - Character creation quick reference
- **`src/assets/athia-talents-reference.md`** - All 18 talents with mechanical impacts

### Pages
- **`src/pages/CharacterGenerator.tsx`** - Updated to use CharacterCreator
- **`src/pages/PDFInspector.tsx`** - Dev tool to inspect PDF fields

## How to Use

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the Character Generator:**
   Visit `/character-generator` in your browser

3. **Fill in the form:**
   - Character Name (required)
   - Class (required)
   - Race (required)
   - House (optional)
   - Faith (optional)
   - Age (optional)

4. **Generate PDF:**
   Click "Generate Character Sheet" to download a filled PDF

## Important: PDF Field Names

The PDF filling might not work immediately because we need to verify the exact field names in the PDF. Here's how:

### Step 1: Inspect the PDF Fields

Add the PDFInspector to your routes in `App.tsx`:

```tsx
import PDFInspector from './pages/PDFInspector'

// In Routes:
<Route path="/pdf-inspector" element={<PDFInspector />} />
```

Then visit `/pdf-inspector` and click the button. Check your browser console for the actual field names.

### Step 2: Update Field Mappings

In `src/utils/pdfFiller.ts`, update the `fieldMappings` object with the correct field names:

```typescript
const fieldMappings: Record<keyof BasicCharacterData, string> = {
  characterName: "actual_field_name_from_pdf",  // Update these
  class: 'actual_class_field_name',
  race: 'actual_race_field_name',
  house: 'actual_house_field_name',
  faith: 'actual_faith_field_name',
  age: 'actual_age_field_name',
};
```

## To-Do / Next Steps

### Immediate
1. ✅ Basic form with 6 fields
2. ✅ PDF filling infrastructure
3. ⚠️ Verify and fix PDF field names (see above)

### Future Enhancements
- [ ] Update CLASSES constant with full list from PDF
- [ ] Update RACES constant with full list from PDF
- [ ] Update HOUSES with actual campaign houses
- [ ] Update FAITHS with actual campaign gods/religions
- [ ] Add Level field
- [ ] Add Attributes section (CON, DEX, INS, KNO, STR, VAL)
- [ ] Add Racial Perks selection
- [ ] Add Abilities selection
- [ ] Add Talents point allocation
- [ ] Add Aspects calculation (Health, Defense, Daring, etc.)
- [ ] Add Equipment section
- [ ] Add Magic system (Arcane/Divine)
- [ ] Multi-step wizard UI for guided character creation
- [ ] Form validation based on attribute pools
- [ ] Auto-calculation of derived stats

## Troubleshooting

### PDF not filling correctly
- Use the PDF Inspector tool to verify field names
- Check browser console for errors
- Ensure the PDF at `/src/assets/pdfs/sheet.pdf` has form fields

### TypeScript errors
- Run `npm install` to ensure pdf-lib is installed
- Check that all imports are correct

### Styling issues
- Verify `CharacterCreator.css` is being imported
- Check for conflicting styles in `App.css`

## Notes

- The character sheet PDF must have fillable form fields
- If the PDF doesn't have form fields, you'll need to create a fillable version using Adobe Acrobat or similar tools
- The field names in the PDF must match exactly (case-sensitive) with the field mappings in `pdfFiller.ts`
