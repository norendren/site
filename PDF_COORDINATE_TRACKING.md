# PDF Coordinate Tracking

Use this document to track coordinates as you find them using the PDF Inspector tool.

## Page Dimensions
- Width: (click "Get PDF Dimensions" to find out)
- Height: (click "Get PDF Dimensions" to find out)

## Coordinate System
- Origin (0,0) is at the **bottom-left** corner
- X increases going right
- Y increases going up

## Field Positions

### Character Name
- **Status**: ✓ Verified
- **Position**: x: 52, y: 738
- **Font Size**: 14
- **Notes**: Perfect fit

### Class
- **Status**: ⚠ Need to find
- **Position**: x: ?, y: ?
- **Font Size**: 12
- **Notes**:

### Race
- **Status**: ⚠ Need to find
- **Position**: x: ?, y: ?
- **Font Size**: 12
- **Notes**:

### House
- **Status**: ⚠ Need to find
- **Position**: x: ?, y: ?
- **Font Size**: 12
- **Notes**:

### Faith
- **Status**: ⚠ Need to find
- **Position**: x: ?, y: ?
- **Font Size**: 12
- **Notes**:

### Age
- **Status**: ⚠ Need to find
- **Position**: x: ?, y: ?
- **Font Size**: 12
- **Notes**:

## Workflow

1. Open PDF Inspector: http://localhost:5173/pdf-inspector
2. For each field:
   - Enter the field name as test text (e.g., "Character Name")
   - Adjust X and Y coordinates
   - Click "Preview Test PDF"
   - Check position in the preview
   - Repeat until positioned correctly
3. Update this document with the coordinates
4. Copy coordinates to `src/utils/pdfFiller.ts`
5. Mark as ✓ Verified in both places

## Tips

- Start with a rough guess based on where you see the label on the PDF
- Adjust in increments of 5-10 pixels for faster iteration
- The red crosshairs show the exact anchor point of the text
- Text baseline is at the Y coordinate (text extends upward from Y)
- Remember to adjust font size if text doesn't fit

## Future Fields to Add

As you expand the character generator, add more fields here:
- [ ] Stats (Strength, Dexterity, etc.)
- [ ] HP/Max HP
- [ ] Skills
- [ ] Abilities
- [ ] Equipment
- [ ] Spells
