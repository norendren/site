import * as fs from "fs";

// Load the ability names (sorted alphabetically) from our code
const abilityNamesFromCode: string[] = JSON.parse(
  fs.readFileSync("/home/dylan/dev/site/scripts/ability-names.json", "utf-8")
);

// Load the name mapping (code name -> PDF name)
const nameMapping: Record<string, string> = JSON.parse(
  fs.readFileSync(
    "/home/dylan/dev/site/scripts/ability-name-mapping.json",
    "utf-8"
  )
);

// Load the full PDF text
const fullText = fs.readFileSync(
  "/home/dylan/dev/site/scripts/ability_full.txt",
  "utf-8"
);

console.log(`Loaded ${abilityNamesFromCode.length} ability names from code`);
console.log(`PDF text length: ${fullText.length} characters`);
console.log(`Name mappings: ${Object.keys(nameMapping).length}`);
console.log();

interface ExtractedAbility {
  codeName: string; // Name as it appears in abilities.ts
  pdfName: string; // Name as it appears in the PDF
  rawText: string;
  class: string;
  prerequisites: string;
  description: string;
}

const extractedAbilities: ExtractedAbility[] = [];
const errors: string[] = [];

// Find the start of ability descriptions section
// The first ability after the header is "Accurate I"
const firstAbilityPattern = /\nAccurate I\nRogue\n/;
const firstMatch = fullText.match(firstAbilityPattern);

if (!firstMatch || !firstMatch.index) {
  console.error("Could not find start of ability descriptions!");
  process.exit(1);
}

const abilityDescriptionsStart = firstMatch.index + 1; // +1 to skip leading newline
console.log(
  `Found start of ability descriptions at character ${abilityDescriptionsStart}`
);
console.log();

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Helper function to normalize apostrophes (both directions)
function normalizeApostrophes(str: string): string {
  // Replace typographic apostrophes with regular ones
  return str.replace(/['']/g, "'");
}

// Create a map of PDF names to code names for reverse lookup
const pdfNameToCodeName: Record<string, string> = {};
abilityNamesFromCode.forEach((codeName) => {
  const pdfName = nameMapping[codeName] || codeName;
  pdfNameToCodeName[pdfName] = codeName;
});

// Load PDF order (abilities in the order they appear in PDF)
const pdfOrder: Array<{ codeName: string; pdfName: string }> = JSON.parse(
  fs.readFileSync("/home/dylan/dev/site/scripts/pdf-ability-order.json", "utf-8")
);

// Extract each ability using the goalpost strategy
for (let i = 0; i < pdfOrder.length; i++) {
  const { codeName, pdfName } = pdfOrder[i];
  const nextPdfName = i < pdfOrder.length - 1 ? pdfOrder[i + 1].pdfName : null;

  try {
    // Search for the ability name as a line by itself
    // Pattern: newline + ability name + newline
    // Don't normalize - use exact PDF name from mapping
    const searchPattern = new RegExp(
      `\n${escapeRegex(pdfName)}\n`,
      "g"
    );
    const matches = Array.from(fullText.matchAll(searchPattern));

    if (matches.length === 0) {
      errors.push(`❌ ${codeName} (PDF: ${pdfName}): Not found in PDF`);
      continue;
    }

    // Find matches that occur in the ability descriptions section
    // Allow a small buffer (10 chars) to catch the first ability
    const validMatches = matches.filter(
      (m) => m.index! + pdfName.length >= abilityDescriptionsStart - 10
    );
    if (validMatches.length === 0) {
      errors.push(
        `❌ ${codeName} (PDF: ${pdfName}): Found but before ability descriptions section`
      );
      continue;
    }

    // Use the first valid match
    const startIndex = validMatches[0].index! + 1; // +1 to skip leading newline

    // Find the end index (where the next ability starts)
    let endIndex: number;
    if (nextPdfName) {
      const nextPattern = new RegExp(
        `\n${escapeRegex(nextPdfName)}\n`,
        "g"
      );
      const nextMatches = Array.from(fullText.matchAll(nextPattern));
      const nextValidMatches = nextMatches.filter(
        (m) => m.index! > startIndex
      );

      if (nextValidMatches.length === 0) {
        errors.push(
          `❌ ${codeName} (PDF: ${pdfName}): Could not find end boundary (next: ${nextPdfName})`
        );
        continue;
      }

      endIndex = nextValidMatches[0].index!;
    } else {
      // Last ability - extract to end
      endIndex = fullText.length;
    }

    // Extract the raw text (use original fullText to preserve exact characters)
    const rawText = fullText.substring(startIndex, endIndex).trim();

    // Parse the structure
    // Expected format:
    // Ability Name
    // Class[, Prerequisites]
    // Description...

    const lines = rawText.split("\n");
    if (lines.length < 3) {
      errors.push(
        `⚠️ ${codeName} (PDF: ${pdfName}): Text too short (${lines.length} lines)`
      );
      continue;
    }

    const extractedName = lines[0].trim();
    const classAndPrereqs = lines[1].trim();
    const description = lines.slice(2).join("\n").trim();

    // Parse class and prerequisites
    let abilityClass = "";
    let prerequisites = "";

    if (classAndPrereqs.includes(",")) {
      const parts = classAndPrereqs.split(",");
      abilityClass = parts[0].trim();
      prerequisites = parts.slice(1).join(",").trim();
    } else {
      abilityClass = classAndPrereqs;
    }

    extractedAbilities.push({
      codeName,
      pdfName,
      rawText,
      class: abilityClass,
      prerequisites,
      description,
    });

    if ((i + 1) % 50 === 0) {
      console.log(`Processed ${i + 1}/${pdfOrder.length} abilities...`);
    }
  } catch (error) {
    errors.push(`❌ ${codeName} (PDF: ${pdfName}): Exception - ${error}`);
  }
}

console.log();
console.log("=== EXTRACTION RESULTS ===");
console.log(`✅ Successfully extracted: ${extractedAbilities.length}/300`);
console.log(`❌ Errors: ${errors.length}`);
console.log();

if (errors.length > 0) {
  console.log("=== ERRORS ===");
  errors.forEach((err) => console.log(err));
  console.log();
}

// Save the extracted abilities
fs.writeFileSync(
  "/home/dylan/dev/site/scripts/extracted-abilities-final.json",
  JSON.stringify(extractedAbilities, null, 2)
);

console.log("Saved to scripts/extracted-abilities-final.json");

// Show verification samples
if (extractedAbilities.length > 0) {
  console.log();
  console.log("=== VERIFICATION SAMPLES ===");
  console.log();

  // Test the previously hallucinated abilities
  const testAbilities = [
    "Vesting Faith",
    "Stalwart",
    "Holy Emanation I",
    "Thaumaturge",
  ];

  testAbilities.forEach((name) => {
    const ability = extractedAbilities.find((a) => a.codeName === name);
    if (ability) {
      console.log(`✓ ${name}`);
      console.log(`  Class: ${ability.class}`);
      console.log(`  Prerequisites: ${ability.prerequisites || "(none)"}`);
      console.log(
        `  Description: ${ability.description.substring(0, 120)}...`
      );
      console.log();
    } else {
      console.log(`✗ ${name} - NOT FOUND`);
      console.log();
    }
  });
}

console.log(`Final count: ${extractedAbilities.length}/300 abilities extracted`);
