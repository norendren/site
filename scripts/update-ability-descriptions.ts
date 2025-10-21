import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface ExtractedAbility {
  codeName: string;
  class: string;
  prerequisites: string;
  description: string;
}

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the extracted abilities JSON
const extractedAbilities: ExtractedAbility[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'extracted-abilities-final.json'), 'utf-8')
);

// Read the abilities.ts file
const abilitiesPath = path.join(__dirname, '..', 'src', 'data', 'abilities.ts');
let abilitiesContent = fs.readFileSync(abilitiesPath, 'utf-8');

// Create a map for quick lookup: ability name -> description
const descriptionMap = new Map<string, string>();
extractedAbilities.forEach(ability => {
  descriptionMap.set(ability.codeName, ability.description);
});

console.log(`Found ${descriptionMap.size} abilities in the JSON file`);

let updatedCount = 0;
let notFoundCount = 0;

// For each ability in the map, find and replace its description in abilities.ts
descriptionMap.forEach((newDescription, abilityName) => {
  // Escape special regex characters in the ability name
  const escapedName = abilityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Match pattern: "AbilityName": { ... description: "...", ... }
  // This regex properly handles escaped quotes within the string
  const descriptionRegex = new RegExp(
    `("${escapedName}":\\s*\\{[^}]*?description:\\s*")((?:[^"\\\\]|\\\\.)*)(")`,'gs'
  );

  const match = abilitiesContent.match(descriptionRegex);

  // Check if we can find this ability
  if (match) {
    // Convert \n to spaces (single-line string, no formatting preserved)
    // Escape quotes and backslashes
    const escapedDescription = newDescription
      .replace(/\\n/g, ' ')          // Convert \n to spaces (single line)
      .replace(/\s+/g, ' ')           // Collapse multiple spaces
      .trim()                         // Remove leading/trailing spaces
      .replace(/\\/g, '\\\\')         // Escape backslashes
      .replace(/"/g, '\\"');          // Escape quotes

    // Replace with single-line string
    abilitiesContent = abilitiesContent.replace(
      descriptionRegex,
      `$1${escapedDescription}$3`
    );
    updatedCount++;
    console.log(`✓ Updated: ${abilityName}`);
  } else {
    notFoundCount++;
    console.log(`✗ Not found in abilities.ts: ${abilityName}`);
  }
});

// Write the updated content back to abilities.ts
fs.writeFileSync(abilitiesPath, abilitiesContent, 'utf-8');

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updatedCount} abilities`);
console.log(`Not found: ${notFoundCount} abilities`);
console.log(`\nFile updated: ${abilitiesPath}`);
