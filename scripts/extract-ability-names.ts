import { abilities } from "../src/data/abilities";
import * as fs from "fs";

// Extract all ability names from the abilities data structure
const allAbilityNames: string[] = [];

Object.values(abilities).forEach((classAbilities) => {
  Object.keys(classAbilities).forEach((abilityName) => {
    allAbilityNames.push(abilityName);
  });
});

// Sort alphabetically to match PDF order
allAbilityNames.sort((a, b) => a.localeCompare(b));

console.log(`Total abilities found: ${allAbilityNames.length}`);
console.log("\nFirst 10 abilities:");
allAbilityNames.slice(0, 10).forEach((name, i) => {
  console.log(`${i + 1}. ${name}`);
});

console.log("\nLast 10 abilities:");
allAbilityNames.slice(-10).forEach((name, i) => {
  console.log(`${allAbilityNames.length - 9 + i}. ${name}`);
});

// Write to JSON for use by other scripts
fs.writeFileSync(
  "/home/dylan/dev/site/scripts/ability-names.json",
  JSON.stringify(allAbilityNames, null, 2)
);

console.log("\nWrote ability names to scripts/ability-names.json");
