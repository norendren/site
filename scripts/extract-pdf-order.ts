import * as fs from "fs";

// Load ability names from code
const abilityNamesFromCode: string[] = JSON.parse(
  fs.readFileSync("/home/dylan/dev/site/scripts/ability-names.json", "utf-8")
);

// Load name mapping
const nameMapping: Record<string, string> = JSON.parse(
  fs.readFileSync(
    "/home/dylan/dev/site/scripts/ability-name-mapping.json",
    "utf-8"
  )
);

// Create PDF names set for lookup
const pdfNamesSet = new Set(
  abilityNamesFromCode.map((name) => nameMapping[name] || name)
);

// Load PDF text
const fullText = fs.readFileSync(
  "/home/dylan/dev/site/scripts/ability_full.txt",
  "utf-8"
);

// Find start of ability descriptions
const firstAbilityPattern = /\nAccurate I\nRogue\n/;
const firstMatch = fullText.match(firstAbilityPattern);
if (!firstMatch || !firstMatch.index) {
  console.error("Could not find start!");
  process.exit(1);
}

const startPos = firstMatch.index + 1;

// Scan through the PDF and find abilities in order
const lines = fullText.substring(startPos).split("\n");
const orderedAbilities: { pdfName: string; lineNum: number }[] = [];
let lineNum = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (pdfNamesSet.has(trimmed)) {
    orderedAbilities.push({ pdfName: trimmed, lineNum });
  }
  lineNum++;
}

console.log(`Found ${orderedAbilities.length} abilities in PDF order`);

// Create reverse mapping (PDF name -> code name)
const pdfToCode: Record<string, string> = {};
abilityNamesFromCode.forEach((codeName) => {
  const pdfName = nameMapping[codeName] || codeName;
  pdfToCode[pdfName] = codeName;
});

// Output the order with both names
const orderedWithCodeNames = orderedAbilities.map((a) => ({
  codeName: pdfToCode[a.pdfName],
  pdfName: a.pdfName,
}));

fs.writeFileSync(
  "/home/dylan/dev/site/scripts/pdf-ability-order.json",
  JSON.stringify(orderedWithCodeNames, null, 2)
);

console.log("Wrote PDF order to scripts/pdf-ability-order.json");

// Show the problem abilities
console.log("\nProblematic orderings:");
const problemPairs = [
  ["Exact Magic II", "Exalt"],
  ["Poison Immunity", "Poison Master"],
  ["Sharpshooter II", "Shield Fighter"],
];

problemPairs.forEach(([first, second]) => {
  const firstIdx = orderedWithCodeNames.findIndex((a) => a.codeName === first);
  const secondIdx = orderedWithCodeNames.findIndex(
    (a) => a.codeName === second
  );
  console.log(
    `  ${first} (pos ${firstIdx}) vs ${second} (pos ${secondIdx}) - ${secondIdx < firstIdx ? "REVERSED" : "OK"}`
  );
});
