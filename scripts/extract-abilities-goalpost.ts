import * as fs from "fs";

// Load the ability names (sorted alphabetically)
const abilityNames: string[] = JSON.parse(
  fs.readFileSync("/home/dylan/dev/site/scripts/ability-names.json", "utf-8")
);

// Load the full PDF text
const fullText = fs.readFileSync(
  "/home/dylan/dev/site/scripts/ability_full.txt",
  "utf-8"
);

console.log(`Loaded ${abilityNames.length} ability names`);
console.log(`PDF text length: ${fullText.length} characters`);
console.log();

interface ExtractedAbility {
  name: string;
  rawText: string;
  class: string;
  prerequisites: string;
  description: string;
}

const extractedAbilities: ExtractedAbility[] = [];
const errors: string[] = [];

// Find the start of ability descriptions
// Looking for the first ability "Accurate I"
const firstAbilityIndex = fullText.indexOf("Accurate I\nRogue");
if (firstAbilityIndex === -1) {
  console.error("Could not find start of ability descriptions!");
  process.exit(1);
}

console.log(`Found start of ability descriptions at character ${firstAbilityIndex}`);
console.log();

// Extract each ability using the goalpost strategy
for (let i = 0; i < abilityNames.length; i++) {
  const currentAbility = abilityNames[i];
  const nextAbility = i < abilityNames.length - 1 ? abilityNames[i + 1] : null;

  try {
    // Find the current ability name in the text
    // We need to be careful to find it as a standalone line, not as part of another ability's prerequisites
    const searchPattern = new RegExp(`\n${escapeRegex(currentAbility)}\n`, "g");
    const matches = Array.from(fullText.matchAll(searchPattern));

    if (matches.length === 0) {
      errors.push(`❌ ${currentAbility}: Not found in PDF`);
      continue;
    }

    // Find the match that occurs after the start of ability descriptions
    const validMatches = matches.filter((m) => m.index! >= firstAbilityIndex);
    if (validMatches.length === 0) {
      errors.push(
        `❌ ${currentAbility}: Found in PDF but before ability descriptions section`
      );
      continue;
    }

    // Use the first valid match (should be the ability header)
    const startIndex = validMatches[0].index! + 1; // +1 to skip the leading newline

    // Find the end index (where the next ability starts, or end of text)
    let endIndex: number;
    if (nextAbility) {
      const nextPattern = new RegExp(`\n${escapeRegex(nextAbility)}\n`, "g");
      const nextMatches = Array.from(fullText.matchAll(nextPattern));
      const nextValidMatches = nextMatches.filter(
        (m) => m.index! > startIndex
      );

      if (nextValidMatches.length === 0) {
        errors.push(
          `❌ ${currentAbility}: Could not find end boundary (next ability: ${nextAbility})`
        );
        continue;
      }

      endIndex = nextValidMatches[0].index!;
    } else {
      // Last ability - extract to end of text
      endIndex = fullText.length;
    }

    // Extract the raw text
    const rawText = fullText.substring(startIndex, endIndex).trim();

    // Parse the ability structure
    // Expected format:
    // Ability Name
    // Class[, Prerequisites]
    // Description...

    const lines = rawText.split("\n");
    if (lines.length < 3) {
      errors.push(
        `⚠️ ${currentAbility}: Extracted text too short (${lines.length} lines)`
      );
      continue;
    }

    const name = lines[0].trim();
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

    // Verify the name matches
    if (name !== currentAbility) {
      errors.push(
        `⚠️ ${currentAbility}: Name mismatch - extracted "${name}"`
      );
    }

    extractedAbilities.push({
      name: currentAbility,
      rawText,
      class: abilityClass,
      prerequisites,
      description,
    });

    if ((i + 1) % 50 === 0) {
      console.log(`Processed ${i + 1}/${abilityNames.length} abilities...`);
    }
  } catch (error) {
    errors.push(`❌ ${currentAbility}: Exception - ${error}`);
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
  "/home/dylan/dev/site/scripts/extracted-abilities-goalpost.json",
  JSON.stringify(extractedAbilities, null, 2)
);

console.log(
  "Saved extracted abilities to scripts/extracted-abilities-goalpost.json"
);

// Show some examples
if (extractedAbilities.length > 0) {
  console.log();
  console.log("=== SAMPLE EXTRACTIONS ===");
  console.log();

  // Show first ability
  const first = extractedAbilities[0];
  console.log(`First ability: ${first.name}`);
  console.log(`Class: ${first.class}`);
  console.log(`Prerequisites: ${first.prerequisites || "(none)"}`);
  console.log(`Description: ${first.description.substring(0, 100)}...`);
  console.log();

  // Show a known problem ability: "Vesting Faith"
  const vestingFaith = extractedAbilities.find(
    (a) => a.name === "Vesting Faith"
  );
  if (vestingFaith) {
    console.log(`Sample: ${vestingFaith.name}`);
    console.log(`Class: ${vestingFaith.class}`);
    console.log(
      `Prerequisites: ${vestingFaith.prerequisites || "(none)"}`
    );
    console.log(`Description: ${vestingFaith.description}`);
  }
}

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
