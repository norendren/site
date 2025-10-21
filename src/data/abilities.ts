export interface Ability {
  description?: string;
  effect?: string; // Human-readable summary of what the ability does mechanically
  prerequisiteClass?: string;
  prerequisiteAbilities?: string[];
  restrictions?: string;
  canTakeMultiple?: boolean;
  hasMechanicalEffect?: boolean; // True if this ability modifies character sheet stats/calculations
}

export interface AbilitiesByClass {
  acolyte: Record<string, Ability>;
  mage: Record<string, Ability>;
  rogue: Record<string, Ability>;
  warrior: Record<string, Ability>;
  general: Record<string, Ability>;
}

export const abilities: AbilitiesByClass = {
  acolyte: {
    "Anoint": {
      prerequisiteClass: "Acolyte",
      description: "Your Blessings are not confined to the living. With this Ability the Acolyte may bestow their Bless upon an object, allowing its wielder to gain Advantage on their next Check with the item. This Ability could be used on a weapon to grant Advantage on its next Hit check, or on a healer's kit to grant Advantage on the user's next Hermetics Check.",
      effect: "Can use Bless on objects to grant Advantage to the wielder's next Check with that item",
    },
    "Beneficent God": {
      prerequisiteClass: "Acolyte",
      description: "Your god is always there to assist those around you. You begin the game with one additional (+1) Bless (for a total of 2) and gain an additional Bless every level (rather than every other).",
      effect: "+1 starting Bless; gain +1 Bless every level instead of every other level",
      hasMechanicalEffect: true,
    },
    "Bred For Battle": {
      prerequisiteClass: "Acolyte",
      description: "Selecting this Ability allows you to immediately select an Ability from the Warrior's list of Abilities. For example, selecting the Bred For Battle Ability and choosing the Warrior's Born In Armor Ability would give you the Ability: Bred for Battle: Born in Armor as a single Ability choice.",
      effect: "Gain one Warrior Ability of your choice",
    },
    "Child of the Moon": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Moon as to Selene herself. With proper prayer and veneration, Lady Moon can bestow her boons upon the Acolyte:\n• Admonition: With but an hour of prayer the Acolyte becomes aware of anyone seeking to do them harm while they rest. This watch lasts throughout the Acolyte's rest and will stir them from slumber should they be asleep.\n• Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte.\n• Quiet: For every hour of prayer the Acolyte gains four hours of absolute silence. Nothing the Acolyte does makes a sound unless they choose to make a sound.",
      effect: "Prayer grants: Admonition (sense harm during rest), Inner Peace (4hr Rest), Quiet (silent for 4hrs per 1hr prayer)",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Night": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Night as to Erebos himself. With proper prayer and veneration, the High Night can bestow his boons upon the Acolyte:\n• Adumbration: For every hour of prayer the Acolyte gains four hours of shadowed obscurity. The Acolyte appears as if engulfed in wispy shadows and is considered in hiding unless they make noise or otherwise make their presence known. All Stealth Talent Checks to hide are made at Advantage.\n• Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area.\n• Omen: Following an hour of prayer to the High Night, the Acolyte can peer up into the stars above to see omens of events, people, or places as determined by the GM.",
      effect: "Prayer grants: Adumbration (shadowy hiding w/ Advantage for 4hrs), Spiritglow (see spirits for 4hrs), Omen (divine visions)",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Sun": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Sun as to Illios himself. With proper prayer and veneration, Lord Sun can bestow his boons upon the Acolyte:\n• Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte's Holy Aura, as far off as the light of the sun may reach.\n• Clement: With an hour of prayer the Acolyte can cause the immediate area of his Holy Aura to become mild and pleasant. Snow will melt, dampness will evaporate, winds will calm, and heat waves will cool - but only in the area where the prayer was conducted. This Clemency lasts until the Acolyte steps out of the Clement area.\n• Purify: With dedicated and uninterrupted eight hours of prayer, the Acolyte can purge impurities from their system. When the Acolyte begins their prayer, the effects of toxins, poisons, and disease immediately cease. Should they complete their prayer undisturbed, any toxins, poisons, or disease within their system is immediately cleansed. Otherwise, if interrupted or disturbed, the effects of the toxins, poisons, or disease continue from that point forward.",
      effect: "Prayer grants: Beacon (cast sunlight), Clement (mild weather in Holy Aura), Purify (8hr prayer cleanses toxins/disease)",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Triad": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is a connection to each of the gods. With proper prayer and veneration, the Triad can bestow their boons upon the Acolyte:\n• Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte's Holy Aura, as far off as the light of the sun may reach.\n• Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte.\n• Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area.",
      effect: "Prayer grants: Beacon (cast sunlight), Inner Peace (4hr Rest), Spiritglow (see spirits for 4hrs)",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Chosen Vessel I": {
      prerequisiteClass: "Acolyte",
      description: "You can use others as your divine conduit to enact Interventions. Once per Day choose any target in your line of sight to be the center of your Holy Aura.",
      effect: "1/Day: Choose visible target as center of Holy Aura",
    },
    "Chosen Vessel II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Chosen Vessel I"],
      description: "As Chosen Vessel I, but your Chosen Vessel may be any individual you know. Note: It is up to the GM as to whether an individual is considered known to the Acolyte.",
      effect: "1/Day: Choose any known individual as center of Holy Aura (no line of sight required)",
    },
    "Coalesce": {
      prerequisiteClass: "Acolyte",
      description: "You can combine the Influences of your god into greater and greater Divine Interventions. You possess the ability to enact Divine Interventions that combine Effects from all Influences you have access to.",
      effect: "Can combine Effects from multiple Influences into single Divine Intervention",
    },
    "Conviction": {
      prerequisiteClass: "Acolyte",
      description: "Your faith against fear is an inspiration to others. You may use a Bless as a Free Action to allow anyone in your Holy Aura to use your Daring as their own for the duration of the Encounter.",
      effect: "Use Bless (Free Action) to share your Daring with all in Holy Aura for the Encounter",
    },
    "Create Relic": {
      prerequisiteClass: "Acolyte",
      description: "You are one of the few individuals capable of creating powerful magical items. You can create a Sacred Relic as described in the Magic Items section.",
      effect: "Can craft Sacred Relics",
    },
    "Crusader": {
      prerequisiteClass: "Acolyte",
      description: "You are the fist of your god, able to turn divine will into victory on the battlefield. Once per Encounter you may spend Favor, up to your Level, to gain temporary Stamina. For every point of Favor spent you gain 3 points of Stamina. Any unspent, temporary Stamina is lost at the end of the Encounter. Use of this Ability is considered a Free Action.",
      effect: "1/Encounter: Spend Favor (up to Level) to gain 3 temporary Stamina per Favor spent (Free Action)",
    },
    "Curse": {
      prerequisiteClass: "Acolyte",
      description: "Some gods strive only to help others; yours has a more practical outlook on life. Your Blessings may be used to Disadvantage a Target. The Target of your Curse will make their next Check at Disadvantage.",
      effect: "Can use Bless to curse a target with Disadvantage on their next Check",
    },
    "Death Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Death you have found yourself granted with extraordinary powers. The following powers are granted to a Death Devotee:\n• Once per day a Death Devotee may automatically succeed on any one Strength-related Check.\n• Once per day a Death Devotee may double (x2) the range of their Holy Aura for a Death Influence-related Divine Intervention.\n• Once per day a Death Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Death with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Strength Check; Double Holy Aura range for Death Intervention; Free 1-Favor Death Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Disciple of Erebos": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Erebos"],
      description: "Erebos offers you even more for being worthy of his Blessings. Your Blessings may also be used to double the result of your recipient's next Damage roll.",
      effect: "Bless can double recipient's next Damage roll",
    },
    "Disciple of Ilios": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Ilios"],
      description: "Ilios offers you even more for being worthy of his Blessings. Your Blessings may also be used to make Opponents roll their next Hit Checks against the recipient at Disadvantage for the Round.",
      effect: "Bless makes opponents attack recipient at Disadvantage for the Round",
    },
    "Disciple of Selene": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Selene"],
      description: "Selene offers you even more for being worthy of her Blessings. Your Blessings may also be used to grant Damage Reduction to the recipient equal to twice your Level for the Round.",
      effect: "Bless grants Damage Reduction = 2 × Level for the Round",
    },
    "Disciple of the Triad": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of the Triad"],
      description: "The Triad offers you even more for being worthy of their Blessings. Your Blessings may be used to grant a Defense bonus to the recipient equal to your Level. This bonus lasts until the next successful Hit Check is made against the recipient.",
      effect: "Bless grants Defense = Level until next successful hit",
    },
    "Divination Devotee": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Access to the Divine Influence of Divination"],
      description: "As a devoted adherent to the Divine Influence of Divination you have found yourself granted with extraordinary powers. The following powers are granted to a Divination Devotee:\n• Once per day a Divination Devotee may automatically succeed on any one Knowledge-related Check.\n• Once per day a Divination Devotee may double (x2) the range of their Holy Aura for a Divination Influence-related Divine Intervention.\n• Once per day a Divination Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Divination with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Knowledge Check; Double Holy Aura range for Divination Intervention; Free 1-Favor Divination Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Divine Grace": {
      prerequisiteClass: "Acolyte",
      description: "You are a protected servant of the gods when in their good graces. When maintaining at least half of your Favor, you are immune to arcane, mind affecting Effects (Chaos, Charm, Shape Memory, Suggestion, etc.). The GM has final say on what Effects do or do not affect you.",
      effect: "Immune to arcane mind-affecting Effects when Favor ≥ half maximum",
    },
    "Divine Protection I": {
      prerequisiteClass: "Acolyte",
      description: "Your god protects all those who side with you in battle. As an Action, you can give a number of your allies, equal to your level, a +1 Defense for the duration of the encounter. This ability may be used one time per day.",
      effect: "1/Day: Grant +1 Defense to Level allies for the Encounter (Action)",
    },
    "Divine Protection II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Divine Protection I"],
      description: "As Divine Protection I, but rather than bestowing a +1 Defense to your allies you now bestow a Defense bonus of +2. This ability may be used one time per day.",
      effect: "1/Day: Grant +2 Defense to Level allies for the Encounter (Action)",
    },
    "Ear Of The Gods": {
      prerequisiteClass: "Acolyte",
      description: "The simplest of requests are instantly granted by your god. With this Ability you can enact one Divine Intervention as a Free Action, once per Encounter.",
      effect: "1/Encounter: Enact Divine Intervention as Free Action",
    },
    "Enliven": {
      prerequisiteClass: "Acolyte",
      description: "Your faith is invigorating. You can cause those within your Holy Aura to regain Stamina during an Encounter. This Ability is activated with a single Action, then continues throughout the remainder of the Encounter. Recipients regain Stamina at a rate based upon your level (see the Enliven Table).",
      effect: "Action: Allies in Holy Aura regain Stamina each Round for rest of Encounter (rate based on Level)",
    },
    "Exalt": {
      prerequisiteClass: "Acolyte",
      description: "You can ask the Divine for just a bit more when it comes to Blessing those around you. By expending two (2) Blessings, you may grant an individual an automatic Success on their next Check.",
      effect: "Spend 2 Bless to grant auto-success on next Check",
    },
    "Faith Abounding": {
      prerequisiteClass: "Acolyte",
      description: "When brimming with their god's favor, some Acolytes become empowered. An Acolyte with this Ability gains one of the following powers as associated with their faith, so long as their Favor is at or within one-half their Level (round up) of maximum. For example, a 5th level Acolyte with a maximum Favor of 16, must posess 13 or more Favor to gain one of the benefits below:\n\nFaith Abounding Table\n\nFaith | Power\nErebos | Gain Advantage on all Talent Checks\nIllios | No Disadvantage as a result of Reactions in combat\nSelene | Gain Damage Reduction equal to their Level\nTriad | Are Immune to all States",
      effect: "When Favor is high: Erebos (Advantage on Talents), Ilios (No combat Reaction Disadvantage), Selene (DR = Level), Triad (Immune to States)",
    },
    "Glorious Finish": {
      prerequisiteClass: "Acolyte",
      description: "Unbeknownst to your enemies, the ire of your God becomes evident in your most desperate hour. When Downed, all allies within your Holy Aura receive an immediate Bless (this is a free Bless and does not come from the number of Bless the Acolyte has available to them), and have all negative States removed (as decided by the GM).",
      effect: "When Downed: All allies in Holy Aura get free Bless and negative States removed",
    },
    "Greater God": {
      prerequisiteClass: "Acolyte",
      description: "Your god sees great things in you. As such they have granted you access to one additional Influence for use in enacting Divine Interventions.",
      effect: "+1 Divine Influence access",
      hasMechanicalEffect: true,
    },
    "Holy Emanation I": {
      prerequisiteClass: "Acolyte",
      description: "Your deity's power emanates from you, healing those in your Holy Aura. All allies within your Holy Aura recover one (1) point of Stamina at the beginning of each Round (before Initiative is rolled). This Ability may be used once per Encounter and lasts for a number of Rounds equal to your level.",
      effect: "1/Encounter: Allies in Holy Aura recover 1 Stamina per Round for Level Rounds",
    },
    "Holy Emanation II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Holy Emanation I"],
      description: "As Holy Emanation I, but allies now recover two (2) points of Stamina per Round.",
      effect: "1/Encounter: Allies in Holy Aura recover 2 Stamina per Round for Level Rounds",
    },
    "Hospitaller": {
      prerequisiteClass: "Acolyte",
      description: "All of your healing efforts are far more effective. Your Patient regains twice the Stamina when you use an Action to help them Recuperate.",
      effect: "Patient regains 2× Stamina when you help them Recuperate",
      hasMechanicalEffect: true,
    },
    "Improved Holy Aura": {
      prerequisiteClass: "Acolyte",
      description: "The range of your Divine connection has expanded. Your Holy Aura's range is twice its normal range.",
      effect: "Holy Aura range × 2",
      hasMechanicalEffect: true,
    },
    "Indulgence": {
      prerequisiteClass: "Acolyte",
      description: "When their god is pleased with them, an Acolyte with this Ability finds their Maximum Favor increasing. For every three (3) points of Favor the Acolyte is below their maximum, they gain one (+1) Favor. This additional Favor is removed after a single enactment of a Divine Intervention. For example, an Acolyte with a maximum of 17 Favor and a current Favor of 16 would find their maximum temporarily increased to 18.",
      effect: "Gain +1 temporary max Favor for every 3 Favor below maximum (removed after one Divine Intervention)",
      hasMechanicalEffect: true,
      canTakeMultiple: true,
    },
    "Inspiration": {
      prerequisiteClass: "Acolyte",
      description: "The blessings of your god are truly beneficial to those that receive them. Your Blessings may be used to bestow a Bonus of one (+1) to any Check made by the recipient. This Bonus lasts for a number of Checks equal to your Level.",
      effect: "Bless grants +1 to recipient's next Level Checks",
    },
    "Life Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Life you have found yourself granted with extraordinary powers. The following powers are granted to a Life Devotee:\n• Once per day a Life Devotee may automatically succeed on any one Constitution-related Check.\n• Once per day a Life Devotee may double (x2) the range of their Holy Aura for a Life Influence-related Divine Intervention.\n• Once per day a Life Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Life with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Constitution Check; Double Holy Aura range for Life Intervention; Free 1-Favor Life Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Martyr I": {
      prerequisiteClass: "Acolyte",
      description: "Your loyalty to your cause knows no bounds. Once per Encounter you may choose to take the Damage in place of another in your Holy Aura. You take one-half (+1/2) of the Damage that would have been bestowed on the original Target.",
      effect: "1/Encounter: Take half Damage for ally in Holy Aura",
    },
    "Martyr II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Martyr I"],
      description: "As Martyr I, but you now take the same amount of Damage that your Target was to receive, rather than one-half (+1/2).",
      effect: "1/Encounter: Take full Damage for ally in Holy Aura",
    },
    "Miracle": {
      prerequisiteClass: "Acolyte",
      description: "Your god is truly generous and allows you a veritable cornucopia of power to draw from. Choose an additional Divine Influence. You may now enact Divine Interventions from that Influence. For each time you select this Ability, you may select a new Influence.",
      effect: "+1 Divine Influence access (repeatable)",
      hasMechanicalEffect: true,
      canTakeMultiple: true,
    },
    "Nature Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Nature you have found yourself granted with extraordinary powers. The following powers are granted to a Nature Devotee:\n• Once per day a Nature Devotee may automatically succeed on any one Dexterity-related Check.\n• Once per day a Nature Devotee may double (x2) the range of their Holy Aura for a Nature Influence-related Divine Intervention.\n• Once per day a Nature Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Nature with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Dexterity Check; Double Holy Aura range for Nature Intervention; Free 1-Favor Nature Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Oathbinder": {
      prerequisiteClass: "Acolyte",
      description: "Your god's powers can be used to bind others in contracts that cannot be broken. You may enact a binding between individuals swearing an oath to one another. The specifics of the oath should be written down and signed by both parties. In signing the oath both parties are bound to it, and should one break the oath the offending party suffers consequences brought on by the GM. Note: Should the offending party complete the terms of the oath following its breaking, the consequences brought upon the oath breaker are removed. The GM should be consulted as to what can or cannot be asked for in an oath, ensuring the Oathbinder Ability does not become abused.",
      effect: "Can bind divine oaths between individuals (oath-breakers suffer GM-determined consequences)",
    },
    "Pious": {
      prerequisiteClass: "Acolyte",
      description: "Your faith in your god makes you an inspiration to those who would fight alongside you. Once per Encounter you can use a Bless as a Free Action on every ally in your Holy Aura. This Free Action takes place at the same time as one's Free Maneuver.",
      effect: "1/Encounter: Bless all allies in Holy Aura as Free Action",
    },
    "Protection Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Protection you have found yourself granted with extraordinary powers. The following powers are granted to a Protection Devotee:\n• Once per day a Protection Devotee may automatically succeed on any one Valor-related Check.\n• Once per day a Protection Devotee may double (x2) the range of their Holy Aura for a Protection Influence-related Divine Intervention.\n• Once per day a Protection Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Protection with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Valor Check; Double Holy Aura range for Protection Intervention; Free 1-Favor Protection Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Rapture Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Rapture you have found yourself granted with extraordinary powers. The following powers are granted to a Rapture Devotee:\n• Once per day a Rapture Devotee may automatically succeed on any one Instincts-related Check.\n• Once per day a Rapture Devotee may double (x2) the range of their Holy Aura for a Rapture Influence-related Divine Intervention.\n• Once per day a Rapture Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Rapture with a cost of 1 Favor for free.",
      effect: "1/Day each: Auto-succeed Instincts Check; Double Holy Aura range for Rapture Intervention; Free 1-Favor Rapture Intervention",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Relic Antiquarian": {
      prerequisiteClass: "Acolyte",
      description: "You are a collector of the Sacred Relics of old and of your time. You begin the game with a Minor Sacred Relic (see the Magic Items section for further details on Sacred Relics). Should you lose this Relic it takes 1d6 weeks to acquire a new one. Note: A Relic Antiquarian can only possess a single Sacred Relic at a time unless they possess the Create Relic Ability.",
      effect: "Start with Minor Sacred Relic (1d6 weeks to replace if lost)",
    },
    "Reprisal": {
      prerequisiteClass: "Acolyte",
      description: "Your god is wrathful towards those who would defy you or your companions. Once per Encounter, when an ally within your Holy Aura is successfully Hit you may use a Bless to cause the attacker to take Damage equal to the Damage the attacker inflicted upon your ally.",
      effect: "1/Encounter: Use Bless to reflect Damage back to attacker when ally in Holy Aura is hit",
    },
    "Rouse": {
      prerequisiteClass: "Acolyte",
      description: "The power of your god can bring the recently fallen back to consciousness. You can bring someone who has recently become Downed back to consciousness with 1 point of Stamina. You may bring Downed individuals back to consciousness once per Encounter.",
      effect: "1/Encounter: Revive Downed ally to 1 Stamina",
    },
    "Selfish God": {
      prerequisiteClass: "Acolyte",
      description: "Your god expects your full devotion, and in return you are granted exceptional boons. You lose access to one Influence your god has offered you (this Influence cannot be Divination). However, in return, the maximum Favor you may possess is doubled.",
      effect: "Lose 1 Influence (not Divination); Maximum Favor × 2",
      hasMechanicalEffect: true,
    },
    "Sense Enemy": {
      prerequisiteClass: "Acolyte",
      description: "Your god reveals the malicious and dangerous to you. You can sense the presence of those who would wish to do you or your companions harm. This works much like sensing magic, in that you can sense direction but not specifics. For example, the Acolyte could sense the presence of an enemy in a building or in a direction but not which individual is the enemy, nor could you sense an enemy from miles away. This Ability is limited to roughly your line of sight.",
      effect: "Sense direction of hostile creatures within line of sight",
    },
    "Shared Favor": {
      prerequisiteClass: "Acolyte",
      description: "When you share the blessings of your god it can be transformative. You can bestow one (+1) Favor to another individual. This exchange of power can be initiated once per day.",
      effect: "1/Day: Give +1 Favor to another individual",
    },
    "Sincere": {
      prerequisiteClass: "Acolyte",
      description: "Your prayers are meaningful and heartfelt, which your god recognizes. The time for prayer to regain your Favor is halved. Note: You do not regain more Favor, you simply regain it in half the time.",
      effect: "Prayer time to regain Favor is halved",
    },
    "Smite I": {
      prerequisiteClass: "Acolyte",
      description: "Your strikes are empowered by your god. Your weapon is wreathed in Divine power. You may add your level to any Damage roll you make once per Encounter.",
      effect: "1/Encounter: Add Level to one Damage roll",
    },
    "Smite II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Smite I"],
      description: "As Smite I, but rather than adding your level to your Damage once per Encounter you can now add your level to your Damage once per Round for the duration of the Encounter.",
      effect: "1/Round: Add Level to one Damage roll (for entire Encounter)",
    },
    "Soul Steal": {
      prerequisiteClass: "Acolyte",
      description: "Your god has shown you a way to steal the very essence of those you strike down. When you deliver a killing blow to a sentient being you steal a portion of their soul's essence and immediately gain a point (+1) of Favor.",
      effect: "Gain +1 Favor when delivering killing blow to sentient beings",
    },
    "Stalwart": {
      prerequisiteClass: "Acolyte",
      description: "Your faith is your shield. While maintaining at least half your Favor, you possess Damage Reduction against all physical Damage equal to your Level.",
      effect: "DR = Level against physical Damage when Favor ≥ half maximum",
      hasMechanicalEffect: true,
    },
    "Thaumaturge": {
      prerequisiteClass: "Acolyte",
      description: "You have a knack for infusing your Divine capabilities into simple tinctures, powders, or balms. With a successful Average (12) Hermetics Check and the expenditure of the appropriate amount of Favor, you can imbue a potion, salve, oil, or the like with a specific Divine Effect. This Effect will only affect the item or individual that applies the oil, drinks the potion, etc. This Favor is considered expended the moment the tincture is created but can be replaced with an appropriate amount of prayer.",
      effect: "Create Divine tinctures/potions with Average (12) Hermetics Check + Favor expenditure",
    },
    "Venerable Spirit": {
      prerequisiteClass: "Acolyte",
      description: "Your god protects you from those who would seek to do you harm with magic. Once per Encounter you can cancel, dodge, or otherwise nullify a single Divine Intervention from affecting you.",
      effect: "1/Encounter: Nullify one Divine Intervention targeting you",
    },
    "Vesting Faith": {
      prerequisiteClass: "Acolyte",
      description: "Your faith protects you. When you have at least half of your Favor, your Defense receives a +1 bonus.",
      effect: "+1 Defense when Favor ≥ half maximum",
      hasMechanicalEffect: true,
    },
    "Zealot I": {
      prerequisiteClass: "Acolyte",
      description: "Your fanatical belief in your god can be utterly terrifying. On a successful Valor Check you Frighten your Target for a number of Rounds equal to your level. This Ability may be used once per Day.",
      effect: "1/Day: Frighten target for Level Rounds (requires successful Valor Check)",
    },
    "Zealot II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Zealot I"],
      description: "As Zealot I, but you no longer need to succeed on a Valor Check to Frighten your Target.",
      effect: "1/Day: Frighten target for Level Rounds (no Check required)",
    },
  },

  mage: {
    "Active Caster": {
      prerequisiteClass: "Mage",
      description: "You are accustomed to being very active during your casting of Arcane magic. Any Concentration Checks you need to make due to your own Actions are done so at Advantage. Note: You do not gain that Advantage when the actions of others cause you to make a Concentration Check (such as when you are struck in combat).",
    },
    "Amalgamate I": {
      prerequisiteClass: "Mage",
      description: "No Art is meant to be static, and you have the skills to combine Arcane powers to great effect. Choose two Arcane Arts. You can cast Spells that combine Spell Effects from these two Arts.",
    },
    "Amalgamate II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Amalgamate I"],
      description: "As Amalgamate I, but you now can cast Spells that combine the Spell Effects from any Arts you know.",
    },
    "Arcane Sensitive": {
      prerequisiteClass: "Mage",
      description: "You've always had a knack for sensing Arcane powers. You automatically (no roll necessary) know when you are in the presence of Arcane Magic and what the Focus of another Arcane Caster's Spell is. You also make your Scholar Checks at Advantage to determine how to activate a Runework item (see Runework in the Magic section for further details). Additionally, you automatically know the Art any Caster is using when casting Arcane magic. Finally, you can instantly identify Enchanted Items just by touching them.",
    },
    "Artificer": {
      prerequisiteClass: "Mage",
      description: "Items of Arcane magic are longer lived in your possession. The number of uses an Enchanted Item or a Runework item has is doubled while in your hands. Note: This Ability does not double the number of uses the Enchanted Item or piece of Runework may have, rather that the Mage effectively only uses half a use per activation of the item.",
    },
    "Augment Summoning": {
      prerequisiteClass: "Mage",
      description: "You summon exceptionally powerful creatures. Any creature summoned by you is effectively one Challenge Level greater (+1).",
    },
    "Auto-Arcana": {
      prerequisiteClass: "Mage",
      description: "You have made one of your Spells nearly second nature. Choose one Spell in your Grimoire. You may attempt to cast this Spell as a Free Action once per Encounter.",
    },
    "Avatar of Air": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Air you have been empowered with the following capabilities:\n• You can move at your normal rate of speed hovering just inches over the ground. This does not preclude you from falling, nor taking damage from a fall, but does mean you can traverse uneven ground (water, lava, etc.) simply by gliding over it.\n• You gain a bonus to your Defense of +1 versus any ranged missile attack (arrows, bolts, spears, sing stones, etc.).\n• You are impervious to the winds or magically created wind attacks.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a Character.",
    },
    "Avatar of Cosmos": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of the Cosmos you have been empowered with the following capabilities:\n• With a connection to an incredible Arcane power, you no longer find yourself needing to sleep.\n• By meditating you can connect your physical self with the infinity of the universe, allowing you to better recover from wounds faster. Once per day you may heal two points (2) of Injuries with four hours of meditation.\n• You can make a cosmic connection to one of your material items, allowing them to slip through space and time. Only one connection may exist at a time, but once it is made you can summon that item to you at any time, instantly, as a Free Action.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Earth": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Earth you have been empowered with the following capabilities:\n• Like the ageless rock of the land, you no longer age yourself. You are not immortal, just no longer able to age.\n• You gain a bonus to your Defense of +1 versus any melee attack (weapons, fists, etc.).\n• So long as your feet are on land you are impervious to being moved or given the Prone State (see States for further information).",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Fire": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Fire you have been empowered with the following capabilities:\n• You can see the heat in all things, and as such gain a sort of thermal vision that can allow you to see heat signatures at any time of day. You therefore no longer suffer Disadvantage in the dark when confronting a creature who generates their own body heat.\n• You gain a bonus to any Hit check of +1.\n• You are impervious to any extremes of heat or cold.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Water": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Water you have been empowered with the following capabilities:\n• You can move at your normal Speed through water, and are unaffected by currents, pressure, or other aspects of water. Water no longer obstructs your vision, and you can see clearly underwater, penetrate the thickest of fogs, or pierce the driving rain.\n• You no longer suffer from hunger or thirst, sated by the endless Arcane powers of water's life.\n• You can breathe water and remain indefinitely underwater.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Battle Mage I": {
      prerequisiteClass: "Mage",
      description: "Your magic thrives in battle. If you are successful with a Hit Check in combat, you gain Advantage on your next Aptitude Check for the following Round.",
    },
    "Battle Mage II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Battle Mage I"],
      description: "As Battle Mage I but you now gain Advantage on all Aptitude Checks for the remainder of the Encounter.",
    },
    "Blood Magic": {
      prerequisiteClass: "Mage",
      description: "By giving up a portion of your own health and welfare you can make casting Spells easier. For each 5 points of Damage you take you can lower the Difficulty of the Spell you are attempting to Cast by one point (-1), to a maximum of three points (-3).",
    },
    "Bolstered Magic": {
      prerequisiteClass: "Mage",
      description: "By tying up additional Mana during an Encounter, the Caster can create more powerful Effects from their Spells. Only one Bolster can be applied per Encounter, and once chosen, lasts for the duration of the Encounter. By tying up one (1) Mana the Caster may choose one the following benefits to their Spell Effects for the duration of the Encounter:\n• Chances of Spells spreading (Acid, Electricity, Flame, Geyser, etc.) are increased by one (+1). For example, a one in four chance would become a two in four chance.\n• Increase any Damage Resistance bonus by ½ Caster Level.\n• Increase any Defense bonus by one (+1).\n• Increase any movement bonus by +25%.\n• Increase any size bonus by +25%.\n• Reroll any 1's when determining a Spell's Damage.\n• Transfer a Concentration Duration Spell to another Focus in range as an Action.",
    },
    "Combat Casting": {
      prerequisiteClass: "Mage",
      description: "Maintaining your concentration in the thralls of battle is your specialty. Concentration Checks provoked due to the Caster being successfully Hit are made at one Difficulty Class easier (to a minimum of Easy). For example, if in the first Round of combat the Caster is hit, the Caster will need to make an Easy Concentration Check (this Check is not reduced below Easy). The second Round the caster is Hit again, they will need to make another Easy Concentration Check (this Check would normally be Average but is now reduced to Easy). If Hit again in the third Round, the caster will need to make a Concentration Check against an Average Difficulty (this Check would normally be Difficult but is now reduced to Average).",
    },
    "Combat Conduit": {
      prerequisiteClass: "Mage",
      description: "Offering up your own personal energy gives you a much-needed edge when attempting to pull off powerful Spells and Effects in battle. You may spend Stamina to increase the total of your Arcane Aptitude Checks while in combat.",
    },
    "Communal Casting": {
      prerequisiteClass: "Mage",
      description: "You may Cooperate (as per Cooperation for Talent Checks) with another Arcane Caster on any Spell they are attempting to Cast, provided you have at least one point of Aptitude in the Art or Arts contained in their Spell. You are limited to the maximum Spell difficulty of the lower Caster Level between you and whomever you are assisting and use their Spell Difficulty for your Aptitude Check. If the Spell requires more than one Mana to maintain, you may split the Mana cost with them, with an odd amount of Mana going to whomever you're assisting. The maximum Spell difficulty for whomever you are assisting is raised by one (+1) for each character with Communal Casting assisting the initial Caster.",
    },
    "Continuance I": {
      prerequisiteClass: "Mage",
      description: "Your ability to keep your magic going comes easier to you. Reduce the cost of your Spell's Duration by two (-2).",
    },
    "Continuance II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Continuance I"],
      description: "As Continuance I, but in addition you may freely adjust the Duration of your Spells in your grimoire from Instant to Concentration, or vice versa, without it becoming a Spontaneous Spell. Spell Durations switched require a corresponding adjustment to the difficulty of the Spell.",
    },
    "Covert Magic": {
      prerequisiteClass: "Mage",
      description: "Your Arcane powers have never been overt. Your magic requires no words, no actions, and even your Effects are unseen (if you so choose). Note: Although the Effects of your magic may be unseen, the results of the Effect are apparent to everyone.",
    },
    "Determined": {
      prerequisiteClass: "Mage",
      description: "You are firmly resolved to succeed at a given spell, and do not let your first failure dissuade you from trying the same spell again. When casting a Spell, if you miss your Aptitude Check by one or two, you may attempt to cast that same Spell again without needing to change your circumstances (refer to the Failure and Additional Attempts section of the Core Mechanics). For example, if you need to roll a 12 or better on your Aptitude Check and roll a 10 or 11, you may try again without changing your circumstances using this Ability.",
    },
    "Distill Resonance": {
      prerequisiteClass: "Mage",
      description: "You are capable of drawing raw power out of the Resonance Crystals you find. You may syphon the Power Points out of a Resonance Crystal as a Free Action to lower the Difficulty of an Aptitude Check by a value equal to your Level. Thus, a 3rd Level Mage could syphon 3 Power Points (their maximum, by Level) from a Minute Resonance Crystal to lower the Difficulty of their Aptitude Check by 3 (thus leaving 13 Power Points remaining in the Resonance Crystal).",
    },
    "Dynamism": {
      prerequisiteClass: "Mage",
      description: "For some Mages, when all goes well, it goes very well. Dynamic Mages gain added benefits from their critically successful castings. When selecting this Ability, choose one of the Dynamic Types from the Dynamism Table. The type chosen should be noted with the Ability. For example, Dynamism: Incendiary. When a Critical result is rolled on an Aptitude Check, the Mage with this Ability may choose to ignore the bonus given by Dynamism.\n\nDynamism Table\n\nDynamism Type | Added Bonus on Critical\nFar-Reaching | Affect one additional Focus per level of the Mage\nIncendiary | Add 1d4 Damage to the result per Level of the Mage\nLongstanding | Duration (Rounds) extended by the Level of the Mage\nVitalized | Automatically successful on their next Check",
    },
    "Eldritch Arcana": {
      prerequisiteClass: "Mage",
      description: "You can tap into the most puissant powers by opening conduits into the Arcane forces of Athia. In selecting this Ability, you may choose to tie one or more Mana points, at will, into the mightiest of Arcane forces. This Mana is invested and cannot be used for any other purpose (for example, casting Spells) unless the Mage takes an Action to reclaim their invested Mana. Choose one of the following capabilities:\n• Adamant: By dedicating a point (1) of Mana the Mage gains a point of Damage Resistance against all physical attacks equal to one-half their Level (round up). By dedicating four (4) points of Mana the Mage increases that Damage Resistance against all physical attacks (i.e., non-Arcane and non-Divine attacks) equal to their Level.\n• Adroit: By dedicating two points (2) of Mana the Mage may lower the Difficulty of any Spell they attempt to cast by one (-1 Spell Difficulty). By dedicating five points (5) the mage may lower the Difficulty of any Spell they attempt to cast by two (-2 Spell Difficulty).\n• Ensconced: By dedicating a point (1) of Mana the Mage gains a point of Damage Resistance against all Arcane attacks equal to one-half their Level (round up). By dedicating three (3) points of Mana the Mage increases that Damage Resistance against all Arcane attacks equal to their Level.\n• Magnitude: By dedicating three points (3) of Mana the Mage gains +1 to any Attribute they select. By dedicating four points (4) the mage gains +1 to any Attribute they select and may take that Attribute beyond their maximum. It takes an Action for the Mage to apply this bonus to a different Attribute.\n• Portend: By dedicating a point (1) of Mana the Mage no longer suffers Disadvantage on any Talent Checks. By dedicating three points (3) of Mana, the Mage is considered to have an Apprentice level of Expertise in each Talent.\n• Retaliative: By dedicating two points (2) of Mana the Mage may add an additional 1d4 Damage to any Spell they cast. By dedicating five points (5) of Mana the Mage may increase their Damage die used in any spell by one (D6's become D8's, D8's become D10's, etc.).\nNote: In selecting this Ability, the specific capability of the Eldritch Arcana should be noted with the Ability. For example, Eldritch Arcana: Intrepid, or Intrepid Eldritch Arcana. Despite the number of capabilities of this Ability, Eldritch Arcana may only be taken as an Ability once. Additionally, the effects of the Eldritch Arcana do not stack. For Example, a Mage who spends 4 Mana on their Magnitude Eldritch Arcana power gains a +1 to their Attribute (even beyond its maximum), not a +2.",
    },
    "Enchanter": {
      prerequisiteClass: "Mage",
      description: "You have a knack for empowering mundane items with your Arcane magic. You can create Enchanted Items as described in the Magic Items section.",
    },
    "Exact Magic I": {
      prerequisiteClass: "Mage",
      description: "Your ability to strike your foes with your magic comes easier to you. Reduce the cost of your Spell's Each Additional Focuses by one (-1), thus reducing Each Additional Focus' Difficulty Increase from +3 to +2.",
    },
    "Exact Magic II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Exact Magic I"],
      description: "As Exact Magic I, but you may now freely adjust the Focus of the Spells in your Grimoire (less or more Focuses, or less or more Focus Radius) without it becoming a Spontaneous Spell. Spell Focuses altered require a corresponding adjustment to the difficulty of the Spell.",
    },
    "Extension I": {
      prerequisiteClass: "Mage",
      description: "Your ability to reach out with your magic is easier. Reduce the cost of your Spell's Range by two (-2).",
    },
    "Extension II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Extension II"],
      description: "As Extension I, but in addition you may freely adjust the Range of your Spells in your Grimoire (further or closer) without it becoming a Spontaneous Spell. Spell Ranges altered require a corresponding adjustment to the difficulty of the Spell.",
    },
    "Fast Cast": {
      prerequisiteClass: "Mage",
      description: "Once per Encounter you can cast a Spell in place of your Maneuver at a +2 Difficulty.",
    },
    "Gather Energy": {
      prerequisiteClass: "Mage",
      description: "By spending time collecting the Arcane powers for your magic you can cast Spells more effectively. For every 15 minutes your Character gathers their power, your Spell Difficulty decreases by one (-1), to a maximum decrease of four (-4).",
    },
    "Glyphs": {
      prerequisiteClass: "Mage",
      description: "You can set magical traps to kill your enemies. By tracing arcane symbols onto a floor, wall, door, or object you can empower it to go off the moment the Glyph is disturbed. The Mage spends one Round per Mana they wish to invest into their Glyph. Mana can be invested into a Glyph in the following ways:\n• Focus: The Glyph will only affect the first sentient being that triggers it. By empowering it with additional Mana the Focus can be doubled (as per the Focus Spell Element).\n• Damage: Each point of Mana invested does 1D8 per Caster Level.\nThe Glyph remains until either triggered by someone, or the Mage takes an Action to retrieve their invested Mana, thus destroying the Glyph. Note: The Glyph is virtually invisible, only noticeable with a successful Notice Check at Extreme (18) Difficulty. As an Example, a 2nd Level Mage looking to invest 3 Mana can create a Glyph that will do 4D8 Damage with a doubled Focus radius.",
    },
    "Harm": {
      prerequisiteClass: "Mage",
      description: "You've a knack for adding a bit of damage to your magic. You can choose to add or remove Damage when casting a Spell from your Grimoire without it being a Spontaneous Spell. Damage added or removed requires a corresponding adjustment to the difficulty of the Spell.",
    },
    "Hasty Recharge": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Somehow, you have perfected the art of recharging your Runework as quickly as possible. You now recharge your Runework at a rate of twenty minutes per Effect recharged.",
    },
    "Master of Air": {
      prerequisiteClass: "Mage",
      description: "Air is your preferred Art. You gain two (+2) Arcane Aptitude towards all Spells utilizing the Art of Air.",
    },
    "Master of Cosmos": {
      prerequisiteClass: "Mage",
      description: "Cosmos is your preferred Art. You gain two (+2) Arcane Aptitude towards all Spells utilizing the Art of Cosmos.",
    },
    "Master of Earth": {
      prerequisiteClass: "Mage",
      description: "Earth is your preferred Art. You gain two (+2) Arcane Aptitude towards all Spells utilizing the Art of Earth.",
    },
    "Master of Fire": {
      prerequisiteClass: "Mage",
      description: "Fire is your preferred Art. You gain two (+2) Arcane Aptitude towards all Spells utilizing the Art of Fire.",
    },
    "Master of Water": {
      prerequisiteClass: "Mage",
      description: "Water is your preferred Art. You gain two (+2) Arcane Aptitude towards all Spells utilizing the Art of Water.",
    },
    "Memorized Spell": {
      prerequisiteClass: "Mage",
      description: "Through repeated use and study, you have committed a Spell to memory. Choose any Spell from your Grimoire. You no longer need to reference your Grimoire to cast this Spell, and you may do so from memory. Note: You may have up to three Memorized Spells at any given time. Every time you gain a level you may remove one Spell from your memory and add another in its place.",
    },
    "Multitasker": {
      prerequisiteClass: "Mage",
      description: "Your ability to maintain multiple active Spells at once is laudable. You may maintain an additional Spell's Duration beyond your normal limit (Caster Level divided by 2). Each time you take this Ability it increases the number of Spells you can maintain by one (+1).",
      canTakeMultiple: true,
    },
    "Mystic Leverage I": {
      prerequisiteClass: "Mage",
      description: "When casting magic you are capable of calling upon even deeper reserves of Arcane energy to ensure you succeed. You can spend one (1) Favor to roll your Aptitude Check at Advantage. This Ability may only be used once per day.",
    },
    "Mystic Leverage II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Mystic Leverage I"],
      description: "As Mystic Leverage I, but rather than rolling at Advantage when spending Favor, you can spend two (2) Favor to automatically succeed on your Aptitude Check. This Ability may only be used once per day.",
    },
    "Personal Immunity": {
      prerequisiteClass: "Mage",
      description: "As a side effect of working with your magic you have become immune to your own Arcane powers. Your Spells never affect you unless you explicitly choose to be affected by them.",
    },
    "Powerful Magic": {
      prerequisiteClass: "Mage",
      description: "You've a knack for adding a bit more power to your magic. When casting a Spell from your Grimoire you may increase your Spell Difficulty by three (+3) to have the Spell treated as if your Caster Level was one higher (+1). This Ability will affect the Damage dice and any other Level-based bonuses pertaining to the Spell.",
    },
    "Ravage I": {
      prerequisiteClass: "Mage",
      description: "Once per Encounter you can tap into incredible reserves of Arcane power. By dedicating two (2) Mana to a Spell as you cast it, you can reroll any 1's and 2's on the Spell's Damage dice. This can only be done on Spells that do Damage.",
    },
    "Ravage II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Ravage I"],
      description: "As Ravage I, but you can now reroll any 1's, 2's, or 3's on the Spell's Damage dice.",
    },
    "Repeat Spell I": {
      prerequisiteClass: "Mage",
      description: "When you succeed on an Aptitude Check to cast a Spell, you can forgo the Effects of that Spell to instead \"hold\" the Spell for the next Round. This allows you to cast the same Spell again in the next Round without needing to make another Aptitude Check. The Spell is automatically cast successfully in the next Round, and you dedicate the normal cost of Mana to maintain it. This Ability may only be used once per Encounter.",
    },
    "Repeat Spell II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Repeat Spell I"],
      description: "As Repeat Spell I, but you can now \"hold\" the Spell for up to three (3) additional Rounds. Each Round the Spell is held, you must dedicate the normal cost of Mana to maintain it. If at any point you do not have enough Mana to maintain the Spell, it is lost.",
    },
    "Rune Release": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Your knowledge of runework is such that you can forcefully discharge the Arcane energy from a piece of Runework, causing the Runework to explode in a concussive blast. This causes all those in a 10' radius to take 1d6 Damage per Power Point remaining in the Runework. The Runework item is destroyed in the process.",
    },
    "Runemaster I": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Your skill with Runework is exceptional. You can create Runework items as if you were one level higher than your current level.",
    },
    "Runemaster II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runemaster I"],
      description: "As Runemaster I, but you can now create Runework items as if you were two levels higher than your current level.",
    },
    "Shorthand": {
      prerequisiteClass: "Mage",
      description: "You have developed a unique shorthand for your Grimoire, allowing you to record Spells in far less space than normal. Your Grimoire can hold twice as many Spells as it normally would.",
    },
    "Steady Runework": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Your Runework is more resilient than most. All Runework you create has double the normal number of uses before needing to be recharged.",
    },
    "Sustained Arcana": {
      prerequisiteClass: "Mage",
      description: "You have mastered the art of maintaining your magic. You can maintain the Duration of your Spells with only half the normal Mana cost (round up).",
    },
    "Switch": {
      prerequisiteClass: "Mage",
      description: "You can switch the Focus of one of your active Spells as a Free Action once per Round. The new Focus must be within Range of the original Focus.",
    },
    "Ritual Magic": {
      prerequisiteClass: "Mage",
      description: "You have studied the ancient art of Ritual Magic, allowing you to cast Spells beyond your normal capabilities. You may cast any Spell from your Grimoire as a Ritual, taking one hour per Spell Difficulty. During this hour you must be relatively undisturbed and focused on the Ritual. At the end of the Ritual, you automatically succeed in casting the Spell without needing to make an Aptitude Check and without expending any Mana. Note: Ritual Magic cannot be used for Spells with an Instant Duration.",
    },
    "Wild Mage": {
      prerequisiteClass: "Mage",
      description: "You have an innate connection to the chaotic nature of Arcane magic. When you roll a natural 20 on an Aptitude Check, you may choose to have the Spell's Effect doubled (duration, damage, range, etc., as appropriate). However, when you roll a natural 1 on an Aptitude Check, the GM may introduce a chaotic magical effect as appropriate to the situation.",
    },
  },

  rogue: {
    "Accurate I": {
      prerequisiteClass: "Rogue",
      description: "Each Stamina you spend to increase your Hit Check increases your result by two (+2) instead of the usual one (+1).",
    },
    "Accurate II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Accurate I"],
      description: "The Stamina cost to roll a Hit Check at Advantage, or to reroll a missed Hit Check costs you two (2) Stamina. Additionally, the Stamina cost to automatically score a successful Hit on a Target is only five (5) Stamina.",
    },
    "Ambusher": {
      prerequisiteClass: "Rogue",
      description: "As a guerrilla fighter you know the sorts of places your enemies may hide. You may take two Actions in any Round in which you have Surprised your enemies (instead of the usual one Action). Any Checks stemming from these two Actions are made at Advantage, as per the Surprise rules described in the Combat section.",
    },
    "Arcane Mark": {
      prerequisiteClass: "Rogue",
      description: "You've discovered a cunning use for your Mana. By investing one (1) point of your available Mana you can place an Arcane Mark upon a Target. This mark must be created by touching your Target, but once done you always have a sense of the Target's direction and distance from you. You can remove this Arcane Mark at any time, as a Free Action, and return that invested Mana to your pool.",
    },
    "Assassin I": {
      prerequisiteClass: "Rogue",
      description: "Your most precise strikes are your most deadly. Your successful Critical Hit does +40 Damage rather than the normal +20 Damage.",
    },
    "Assassin II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Assassin I"],
      description: "When you score a Critical Hit on a surprised or otherwise unsuspecting Target, you kill them instantly. Targets with Health Tiers are reduced to the Downed Tier.",
    },
    "Backstabber I": {
      prerequisiteClass: "Rogue",
      description: "You take advantage of your unsuspecting foes. You automatically Hit (no need to roll your Hit Check) and do maximum Damage (no need to roll Damage) against any surprised or unsuspecting Target.",
    },
    "Backstabber II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Backstabber I"],
      description: "As Backstabber I, but your attack is considered a Critical Success (+20 Damage) along with your maximum Damage against any surprised or unsuspecting Target.",
    },
    "Bladesman I": {
      prerequisiteClass: "Rogue",
      description: "A blade in your hand brings grievous wounds to your enemies. Any successful Hit you land with a bladed weapon bestows Bleed: 1 to your Target (the Bleed State is furthered described in the Combat section). This effect will stack with each subsequent hit on any Target you have previously hit. For example, a second hit on an already hit Target would have its Bleeding State elevated to Bleed: 2.",
    },
    "Bladesman II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Bladesman I"],
      description: "As Bladesman I, but rather than doing 1 point of Bleeding to the Target the degree of the Bleeding State bestowed is based upon the Level of the Character possessing this Ability as shown in the Bladesman Bleed Table. This effect will stack with each subsequent hit on any Target you have previously hit. Therefore, a 5th Level Character would bestow Bleed: 3 on a successful Hit against a Target. If that same Target is hit again, their Bleeding State would increase to Bleed: 6.",
    },
    "Block": {
      prerequisiteClass: "Rogue",
      description: "You have the skill to use your weapon against incoming attacks. As a Maneuver you can block an incoming attack, offering you Damage Reduction equal to one-half your Level (Round up).",
    },
    "Bonecrusher": {
      prerequisiteClass: "Rogue",
      description: "Your Critical Hits fracture or break the bones of your enemies. A successful Critical Hit results in your Target having more difficulty pushing their attack. Your Target suffers Disadvantage on any further Hit Checks unless healed. When used against an opponent with health tiers, in addition to whatever Damage you bestow upon them with the success of your Critical Hit, you also do a point of Damage directly to their Injured Tier.",
    },
    "Calculated Exposure I": {
      prerequisiteClass: "Rogue",
      description: "Choosing to forgo cumbersome armor, you remain light on your feet and are better able to avoid incoming attacks. Your Defense is increased by two (+2) when you are out of armor.",
    },
    "Calculated Exposure II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Calculated Exposure I"],
      description: "As Calculated Exposure I, but rather than your Defense being increased by two (+2), your Defense is increased by four (+4) when you are out of armor.",
    },
    "Charmed": {
      prerequisiteClass: "Rogue",
      description: "You never roll any Check at a penalty greater than Disadvantage. For example, if your Character finds themselves under a Double or Triple Disadvantage penalty, you simply roll your Check at Disadvantage.",
    },
    "Cheat Death": {
      prerequisiteClass: "Rogue",
      description: "When your character dies this Ability comes into action. You are immediately returned to Down, still vulnerable to death, but avoid the loss of your Character. This Ability may be used once per Encounter.",
    },
    "Controlled Fall I": {
      prerequisiteClass: "Rogue",
      description: "You take half Damage from any fall so long as you are within reach of a wall, tree, or some other means of slowing yourself.",
    },
    "Controlled Fall II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Controlled Fall I"],
      description: "As Controlled Fall I, but you take no Damage from the fall.",
    },
    "Dangerous": {
      prerequisiteClass: "Rogue",
      description: "When you are good, you are dangerous. Any time you score a Critical on a Hit Check you automatically do the maximum amount of Damage you possibly can.",
    },
    "Divine Luck": {
      prerequisiteClass: "Rogue",
      description: "Not only do you possess the Gods' favor, but they are proactively looking out for you. You may spend one (1) Favor to reroll any one die. You must accept the result of the second roll.",
    },
    "Dodge I": {
      prerequisiteClass: "Rogue",
      description: "One on one you are difficult to hit. You gain a Defense bonus of one (+1) against any single Target. This Target needs to be selected at the beginning of each turn.",
    },
    "Dodge II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Dodge I"],
      description: "As Dodge I, but your Defense bonus now increases to (+2).",
    },
    "Embolden I": {
      prerequisiteClass: "Rogue",
      description: "Your words in battle are inspiring. As a Free Action you can inspire a Hit bonus to an ally equal to your Level on their next Hit Check, once per Encounter.",
    },
    "Embolden II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Embolden I"],
      description: "As Embolden I, but you can now grant your Hit bonus to all allies within earshot.",
    },
    "Enemy Observance": {
      prerequisiteClass: "Rogue",
      description: "You can discern weakness in your enemies. Their actions and techniques give you precious insight into their capabilities and injuries. As an Action you can know the amount of Health your enemies have remaining and any Special Abilities they possess. Finally, in the case of an enemy with Aspects, you are also aware of each of their Aspects.",
    },
    "Evade Arcane": {
      prerequisiteClass: "Rogue",
      description: "Your metaphysical connection to the Arcane world is intermittent. Once per Encounter you can cancel, dodge, or otherwise nullify a single Arcane Spell from affecting you.",
    },
    "Fleet": {
      prerequisiteClass: "Rogue",
      description: "You are exceptionally fast. Increase your Base Move by +10' per turn.",
    },
    "Focused Fighting": {
      prerequisiteClass: "Rogue",
      description: "The longer you square off with your opponent the more you become aware of how to counter their fighting style. If all your Attacks are made against the same Target, each subsequent Round you find it easier to connect with them. Beginning with the second Round their Defense lowers by one (-1). Each following Round that you remain solely focused on this Target their Defense continues to lower by one. For example, if focused on the same Target for a fourth Round, their Defense would be lowered by three (-3). The Target's Defense is only lowered for you.",
    },
    "Force Strike I": {
      prerequisiteClass: "Rogue",
      description: "You can focus and release your inner energy as a ranged attack on your enemies. Force Strike does Damage equal to your Base Strength Damage and has a Range of 10' per level. Your Force Strike is considered a weapon for the purposes of applying other Abilities.",
    },
    "Force Strike II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Force Strike I"],
      description: "As Force Strike I, but you now do Damage equal to your Base Strength plus your Level.",
    },
    "Fortuitous I": {
      prerequisiteClass: "Rogue",
      description: "You are incredibly lucky. You may reroll any natural one (1) you roll on any die.",
    },
    "Fortuitous II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Fortuitous I"],
      description: "Sometimes it is better to be lucky than good. Your natural 1's on any Check are also considered Critical Successes.",
    },
    "Hamstring": {
      prerequisiteClass: "Rogue",
      description: "Once per Encounter you can make an attack focused on impeding, slowing, or otherwise forcing your opponent to become less effective in their defense. Your Target's Defense is reduced by half your level following your successful attack (round up). This penalty lasts until the target is healed but does not stack with each successful attack.",
    },
    "Hard Target I": {
      prerequisiteClass: "Rogue",
      description: "You've always been a difficult opponent. As a Free Action you can choose to avoid any one Attack made against you in a Round. This Ability may be used once per Encounter.",
    },
    "Hard Target II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Hard Target I"],
      description: "As a Maneuver, you can make the second Attack made against you in a Round miss. Note: Although you may make a second attack against you in a Round miss, third, fourth, or other additional Attacks made against you will still hit.",
    },
    "Harrier I": {
      prerequisiteClass: "Rogue",
      description: "You are an expert of taking advantage of a surprise attack. You gain Double Advantage for the Surprise round, rather than just Advantage on any Check you make. Additionally, you gain Advantage on your second Round of Checks against your surprised Enemy.",
    },
    "Harrier II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Harrier I"],
      description: "As Harrier I, but rather than gaining Advantage on your second Round of Checks you now gain Advantage on your Checks against your surprised enemy for the remainder of the Encounter.",
    },
    "Inspire Success": {
      prerequisiteClass: "Rogue",
      description: "Your success in battle inspires your allies. Whenever you score a Critical Hit, all allies within 30' gain a bonus of one (+1) to their next Hit Check.",
    },
    "Jack of All Trades": {
      prerequisiteClass: "Rogue",
      description: "You've dabbled in all manner of Talents. For any Talent Check you are asked to make where you possess no Expertise, you are considered to have Novice Expertise.",
    },
    "Knockout Artist": {
      prerequisiteClass: "Rogue",
      description: "You are exceptionally skilled at rendering your enemies unconscious. Once per Encounter you may make a Called Shot to render your Target unconscious rather than kill them. This Called Shot is at a -4 to Hit. If successful, your Target is knocked unconscious and will remain so for a number of hours equal to the Damage you would have inflicted.",
    },
    "Learn From Mistakes": {
      prerequisiteClass: "Rogue",
      description: "Every failure is a lesson learned. When you fail a Talent Check, you gain Advantage on the next Talent Check you make using the same Talent.",
    },
    "My Weapon": {
      prerequisiteClass: "Rogue",
      description: "You have a signature weapon that you have used for years. Choose one specific weapon (not a weapon type). You gain a Hit bonus of two (+2) when using that specific weapon. Should you lose this weapon, it takes 1d6 weeks to find a suitable replacement.",
    },
    "Obscure Knowledge": {
      prerequisiteClass: "Rogue",
      description: "You have picked up all manner of esoteric knowledge in your travels. Once per Session you may automatically succeed on any single Knowledge Talent Check.",
    },
    "Performer": {
      prerequisiteClass: "Rogue",
      description: "You are an exceptional performer. You gain Expertise in the Performance Talent at the Apprentice level. If you already possess Apprentice Expertise, you instead gain Journeyman Expertise. If you already possess Journeyman Expertise, you instead gain Expert Expertise.",
    },
    "Poison Master": {
      prerequisiteClass: "Rogue",
      description: "You are well-versed in the use of poisons. You can identify any poison by taste, smell, or sight. Additionally, you can apply poison to a weapon as a Free Action, and you are immune to accidental poisoning from your own poisons.",
    },
    "Purposeful": {
      prerequisiteClass: "Rogue",
      description: "When you set your mind to something, you see it through. Once per Session you may reroll any failed Check.",
    },
    "Precise I": {
      prerequisiteClass: "Rogue",
      description: "Your strikes are exceptionally accurate. Once per Encounter you may make an attack that automatically hits your Target (no Hit Check required). You still roll for Damage as normal.",
    },
    "Precise II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Precise I"],
      description: "As Precise I, but your attack now automatically hits and does maximum Damage.",
    },
    "Pugilist I": {
      prerequisiteClass: "Rogue",
      description: "Your unarmed strikes are devastating. Your unarmed Damage is increased to 1d6 + Strength Modifier.",
    },
    "Pugilist II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Pugilist I"],
      description: "As Pugilist I, but your unarmed Damage is now increased to 1d8 + Strength Modifier.",
    },
    "Ready And Waiting": {
      prerequisiteClass: "Rogue",
      description: "You are always prepared for danger. You automatically succeed on all Surprise Checks and can never be Surprised.",
    },
    "Redirection I": {
      prerequisiteClass: "Rogue",
      description: "Once per Encounter, when an opponent misses you with a melee attack, you can redirect their attack to another Target within reach of the attacker. The attacker must reroll their Hit Check against the new Target.",
    },
    "Redirection II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Redirection I"],
      description: "As Redirection I, but rather than once per Encounter you may now use this Ability once per Round.",
    },
    "Sharpshooter I": {
      prerequisiteClass: "Rogue",
      description: "You are exceptionally skilled with ranged weapons. You ignore the first Range increment penalty when using ranged weapons. For example, if using a weapon with a Range of 30', you can fire at Targets up to 60' away without penalty.",
    },
    "Sharpshooter II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Sharpshooter I"],
      description: "As Sharpshooter I, but you now ignore the first two Range increment penalties when using ranged weapons.",
    },
    "Steady Aim I": {
      prerequisiteClass: "Rogue",
      description: "You have mastered the art of taking your time with ranged attacks. If you do not move in a Round, you gain a bonus of two (+2) to your Hit Check with ranged weapons.",
    },
    "Steady Aim II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Steady Aim I"],
      description: "As Steady Aim I, but rather than a +2 bonus you now gain Advantage on your Hit Check with ranged weapons when you do not move.",
    },
    "Stunning Strike": {
      prerequisiteClass: "Rogue",
      description: "Once per Encounter you can make an attack designed to stun your opponent. On a successful Hit, your Target must make an Average (12) Endurance Check or be Stunned for one Round. While Stunned, the Target cannot take any Actions or Maneuvers.",
    },
    "Tumbler": {
      prerequisiteClass: "Rogue",
      description: "You are exceptionally skilled at acrobatic maneuvers. You gain Expertise in the Acrobatics Talent at the Apprentice level. If you already possess Apprentice Expertise, you instead gain Journeyman Expertise. If you already possess Journeyman Expertise, you instead gain Expert Expertise.",
    },
    "Willful Focus": {
      prerequisiteClass: "Rogue",
      description: "You can push yourself beyond your normal limits through sheer force of will. Once per Day you may spend Favor to increase the result of any single Check by the amount of Favor spent.",
    },
  },

  warrior: {
    "Armor Adept": {
      prerequisiteClass: "Warrior",
      description: "You know how to get the most out of your armor. Your armor's Defense Value is increased by one (+1).",
    },
    "Back-Strike": {
      prerequisiteClass: "Warrior",
      description: "You are very opportunistic when fighting with a balanced weapon. When using a weapon with the Wieldy Designation you can make one additional attack as a Free Action once per Encounter. This Attack has a weapon Damage of +1d6.",
    },
    "Battle Thrall": {
      prerequisiteClass: "Warrior",
      description: "You thrive in a target rich environment. Whenever you are Outnumbered or Overrun (see States in the Combat Section) you ignore all penalties due to being Outnumbered or Overrun and gain Advantage on all Hit Checks.",
    },
    "Blades Of Death": {
      prerequisiteClass: "Warrior",
      description: "Your ability to hurl the glaive at great speeds allows it to slice completely through your enemies. Any weapon with the Returns Designation returns to you even if it hits a Target.",
    },
    "Blind Fighting": {
      prerequisiteClass: "Warrior",
      description: "You have trained without your sense of sight. You no longer suffer Disadvantage while fighting in darkness, or with your vision impaired.",
    },
    "Born In Armor": {
      prerequisiteClass: "Warrior",
      description: "You are rarely without your armor. Your Stamina penalties for wearing armor are reduced to zero (0).",
    },
    "Bounce Back": {
      prerequisiteClass: "Warrior",
      description: "If given just a moment, you're able to rebound in combat. Once per encounter, if you have not been targeted in a Round (no attacks attempted upon you), you recover 1d4 plus your Level in Stamina.",
    },
    "Brutal I": {
      prerequisiteClass: "Warrior",
      description: "You are a vicious opponent. You add your Level to all Damage rolls made. Note: This bonus is applied in addition to a Warrior's normal Damage bonus for his Class and is not applied to Arcane or Divine Damage.",
    },
    "Brutal II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Brutal I"],
      description: "In your hands, weapons are far deadlier. You gain additional abilities depending on the Size of the weapon you are using. See the Brutal II Table for details.",
    },
    "Calculated Attack": {
      prerequisiteClass: "Warrior",
      description: "You are adept at making your attacks count. Once per Encounter your Stamina costs to improve Damage are halved (round up).",
    },
    "Chosen Enemy I": {
      prerequisiteClass: "Warrior",
      description: "You have always had to deal with a great enemy. Choose a creature Family; you gain a Hit bonus of one (+1) against any creature of that Family.",
    },
    "Chosen Enemy II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Chosen Enemy I"],
      description: "As Chosen Enemy I, but rather than the +1 Hit bonus you now gain Advantage on any Hit Checks against your chosen enemy Family.",
    },
    "Combat Facing": {
      prerequisiteClass: "Warrior",
      description: "You fight in such a way as to minimize being surrounded. A maximum of two opponents may engage you at once in melee. Note: Characters with this Ability may be engaged by any number of Ranged or Hurled attacks.",
    },
    "Combat Prowess": {
      prerequisiteClass: "Warrior",
      description: "You are quick to recover from your fear. Regardless of your Reaction to a given Encounter, you only suffer a maximum of one (1) Round of Disadvantage.",
    },
    "Conditioned": {
      prerequisiteClass: "Warrior",
      description: "You recover in battle faster than most. On a successful Recuperation Check you gain an additional number of Stamina equal to your Level (not to exceed your maximum Stamina). On a failed Recuperation Check you regain ½ your Level (rounded down).",
    },
    "Counter Strike I": {
      prerequisiteClass: "Warrior",
      description: "You capitalize on your opponent's mistakes. When an opponent misses you on a Hit Check, they take one (1) point of Damage as you make them pay for their error.",
    },
    "Counter Strike II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Counter Strike I"],
      description: "As Counter Strike I, but now your opponent takes Damage equal to your Level.",
    },
    "Crowning Blow": {
      prerequisiteClass: "Warrior",
      description: "The weak and weary are no match for you in battle. Any Target you have struck whose remaining Health is equal to or less than your Level is immediately slain by a powerful display of your physical prowess.",
    },
    "Deathblow": {
      prerequisiteClass: "Warrior",
      description: "Your strikes are incredibly skilled and calculated, and when best delivered can bring instant death to your enemies. When you roll a Critical success on a Hit Check your enemy must succeed in an Easy (9) Endurance Check or be instantly killed. This Ability is only enacted when the Warrior themselves has rolled the Critical, no other ability or Effect can bestow the Critical upon them.",
    },
    "Defensive Mobility": {
      prerequisiteClass: "Warrior",
      description: "Armor only slows you down. When Unarmored you add both your Dexterity and Constitution Modifier to your Defense.",
    },
    "Deflect Incoming": {
      prerequisiteClass: "Warrior",
      description: "Arrows have rained down upon you before. You can use your weapon or shield to cause any one successful incoming Ranged or Hurled attack to miss once per Round.",
    },
    "Devastating Critical I": {
      prerequisiteClass: "Warrior",
      description: "Your greatest of blows are especially deadly. Your Critical Hits do additional Damage equal to your current Stamina. Note: Current Stamina is the number of Stamina the character possesses when the Critical Hit is rolled.",
    },
    "Devastating Critical II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Devastating Critical I"],
      description: "Your greatest of blows are absolutely debilitating. As Devastating Critical I, but rather than your Critical Hits doing additional Damage equal to your current Stamina you now do Damage equal to twice (x2) your current Stamina. Note: Current Stamina is the number of Stamina the character possesses when the Critical Hit is rolled.",
    },
    "Favorite Weapon I": {
      prerequisiteClass: "Warrior",
      description: "Like all warriors you have a favorite weapon. Choose one weapon. You gain a Hit bonus of one (+1) when using that type of weapon.",
    },
    "Favorite Weapon II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Favorite Weapon I"],
      description: "As Favored Weapon I, but you now receive a Hit bonus of two (+2) when using that type of weapon.",
    },
    "Favorite Weapon III": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Favorite Weapon II"],
      description: "As Favored Weapon II, but you now receive a Hit bonus of three (+3) when using that type of weapon.",
    },
    "Fend Off": {
      prerequisiteClass: "Warrior",
      description: "You have a knack for staving off your attackers. You gain a one-point (+1) bonus to your Defense against all enemies when using a weapon with the Lengthy designation.",
    },
    "Guardsmanship I": {
      prerequisiteClass: "Warrior",
      description: "You are adept at protecting those around you. You must fight alongside a chosen ally to use this ability. Choose one ally fighting next to you and one enemy Target per Encounter. All Hit Checks and Damage rolls against your ally from the Target are made at Disadvantage.",
    },
    "Guardsmanship II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Guardsmanship I"],
      description: "As Guardsmanship I, but all Hit Checks and Damage rolls against your designated ally are at Disadvantage from all enemies.",
    },
    "Here and Gone": {
      prerequisiteClass: "Warrior",
      description: "Your greatest asset while mounted is your speed. You may Move both before and after a mounted attack, rather than one or the other.",
    },
    "Hold the Line I": {
      prerequisiteClass: "Warrior",
      description: "You are harder to deal with when you've planted yourself. As a maneuver you may increase your Defense by one (+1) so long as you do not move. Should you move your Defense returns to its normal Score.",
    },
    "Hold the Line II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Hold the Line I"],
      description: "As Hold the Line I, but rather than your Defense increasing by one (+1) your Defense now increases by three (+3) until you move.",
    },
    "Improved Critical I": {
      prerequisiteClass: "Warrior",
      description: "You score a Critical Hit on a natural roll of 19 or 20.",
    },
    "Improved Critical II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Improved Critical I"],
      description: "As Improved Critical I, but you now score a Critical Hit on a natural roll of 18, 19, or 20.",
    },
    "King's Code": {
      prerequisiteClass: "Warrior",
      description: "You live by a strict code of honor and conduct. When following your code, you gain a bonus of one (+1) to all Checks. When you violate your code, you suffer Disadvantage on all Checks until you atone for your transgression (as determined by the GM).",
    },
    "Maniacal": {
      prerequisiteClass: "Warrior",
      description: "When you are Injured you become a terrifying force on the battlefield. While at half Stamina or less, you gain Advantage on all Hit Checks.",
    },
    "Marksman": {
      prerequisiteClass: "Warrior",
      description: "You are exceptionally skilled with ranged weapons. You gain a Hit bonus of two (+2) with all ranged weapons.",
    },
    "Mounted Archer": {
      prerequisiteClass: "Warrior",
      description: "You have trained extensively to use ranged weapons while mounted. You no longer suffer Disadvantage when making ranged attacks while mounted.",
    },
    "Mounted Assault": {
      prerequisiteClass: "Warrior",
      description: "You add your mount's Strength Modifier to your Damage when making a mounted charge attack.",
    },
    "Mounted Combatant": {
      prerequisiteClass: "Warrior",
      description: "You and your mount fight as one. While mounted, you gain a bonus of one (+1) to your Defense and your mount gains a bonus of two (+2) to its Defense.",
    },
    "Opportunist": {
      prerequisiteClass: "Warrior",
      description: "You are always looking for an opening in combat. When an enemy within reach moves, you may make a single attack against them as a Free Action. This Ability may only be used once per Round.",
    },
    "Pelter": {
      prerequisiteClass: "Warrior",
      description: "You are skilled at using thrown weapons. You gain a Hit bonus of two (+2) with all hurled weapons.",
    },
    "Quick Draw": {
      prerequisiteClass: "Warrior",
      description: "You can draw and attack with a weapon as a single Action. Additionally, you gain Advantage on all Initiative Checks.",
    },
    "Roar": {
      prerequisiteClass: "Warrior",
      description: "Your battle cry is terrifying to behold. Once per Encounter, as a Free Action, you can let out a mighty roar. All enemies within 30' must make a Difficult (15) Valor Check or suffer Disadvantage on their next Check.",
    },
    "Ruthless I": {
      prerequisiteClass: "Warrior",
      description: "You show no mercy to wounded foes. You gain a Hit bonus of two (+2) against any Target that is at half Stamina or less.",
    },
    "Ruthless II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Ruthless I"],
      description: "As Ruthless I, but rather than a +2 Hit bonus you now gain Advantage on all Hit Checks against Targets at half Stamina or less.",
    },
    "Sacrifice": {
      prerequisiteClass: "Warrior",
      description: "You would lay down your life for your companions. Once per Day you may take the Damage in place of an ally within 10'. You take the full amount of Damage that would have been dealt to your ally.",
    },
    "Shield Fighter": {
      prerequisiteClass: "Warrior",
      description: "You have mastered using your shield as a weapon. Your shield does 1d6 + Strength Modifier Damage when used as a weapon, and you can make shield attacks without suffering any penalties.",
    },
    "Shield Mastery": {
      prerequisiteClass: "Warrior",
      description: "You are exceptionally skilled with shields. The Defense bonus granted by your shield is increased by one (+1).",
    },
    "Slam": {
      prerequisiteClass: "Warrior",
      description: "Once per Encounter you can make a powerful charging attack. If you move at least 20' in a straight line before attacking, you may make a Strength Check opposed by your Target's Strength or Dexterity (Target's choice). If you succeed, your Target is knocked Prone and takes your normal Damage. If you fail, your attack misses.",
    },
    "Swift Reload": {
      prerequisiteClass: "Warrior",
      description: "You can reload any weapon as a Free Action rather than as an Action.",
    },
    "Taunt": {
      prerequisiteClass: "Warrior",
      description: "You can goad your enemies into attacking you. As a Free Action, make a Valor Check opposed by your Target's Valor. If you succeed, your Target must attack you on their next turn. This Ability may be used once per Encounter.",
    },
    "Thrill of Victory I": {
      prerequisiteClass: "Warrior",
      description: "Victory in battle invigorates you. When you reduce an enemy to 0 Stamina or less, you regain Stamina equal to your Level.",
    },
    "Thrill of Victory II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Thrill of Victory I"],
      description: "As Thrill of Victory I, but you now regain Stamina equal to twice your Level.",
    },
    "Trample": {
      prerequisiteClass: "Warrior",
      description: "While mounted, you can ride down your enemies. When you successfully hit with a mounted charge attack, your Target must make a Difficult (15) Strength or Dexterity Check (Target's choice) or be knocked Prone.",
    },
    "Undying": {
      prerequisiteClass: "Warrior",
      description: "You refuse to give up, even in the face of death. When you would be reduced to 0 Stamina or less, you may make a Difficult (15) Endurance Check. If you succeed, you are instead reduced to 1 Stamina. This Ability may be used once per Day.",
    },
    "Utilitarian": {
      prerequisiteClass: "Warrior",
      description: "You can use any weapon effectively. You are considered trained in all weapons, even those outside your normal training.",
    },
    "Valiant": {
      prerequisiteClass: "Warrior",
      description: "Your courage inspires those around you. All allies within 30' of you gain a bonus of one (+1) to their Valor Checks.",
    },
    "Weapon Master I": {
      prerequisiteClass: "Warrior",
      description: "You have mastered the use of all weapons. You gain a Hit bonus of one (+1) with all weapons.",
    },
    "Weapon Master II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Weapon Master I"],
      description: "As Weapon Master I, but your Hit bonus with all weapons is now increased to two (+2).",
    },
  },

  general: {
    "Ambidextrous": {
      description: "You can use either hand equally. What you can do with one, you can do with the other. Additionally, your Stamina costs to make Off-Hand Attacks with Light or Medium weapons are reduced by one (-1).",
    },
    "Arcane Conduit": {
      description: "You have a great knack for tapping into the Arcane aether. You gain one (+1) additional Mana. Note: This Ability does not grant any benefits to one's Arcane Aptitude.",
    },
    "Arcane Prowess": {
      description: "Your understanding of Arcane magic is better than most. You gain two (+2) additional Arcane Aptitude. Note: This Ability does not grant any benefit to a Character's Mana.",
    },
    "Battle Tested": {
      description: "You have faced death on more occasions than you can count. You gain one (+1) additional Daring.",
    },
    "Blessed I": {
      description: "You possess the ability to enact Divine Interventions. You gain two (2) Favor plus any Instincts Modifier you may possess. You may pick any Divine Intervention Effect from any Divine Influence. You are limited in enacting only that one Divine Intervention Effect. Your Holy Aura is 5' radius per level as opposed to the normal 10' radius per level for an Acolyte. Additionally, your Caster Level is considered 1 level less than your character level (to a minimum of 1). Finally, you recover your Favor through Prayer just as any Character with Favor would (see Prayer for further information).",
      restrictions: "Non-Acolyte, Non-Rogue",
    },
    "Blessed II": {
      prerequisiteAbilities: ["Blessed I"],
      description: "As Blessed I, but you now gain two (+2) additional Divine Intervention Effects from the same Influence as Blessed I (for a total of 3). You also gain an additional two (+2) Favor.",
    },
    "Blessed III": {
      prerequisiteAbilities: ["Blessed II"],
      description: "As Blessed II, but you now have access to all the Effects from your chosen Divine Influence. You also gain an additional two (+2) Favor.",
    },
    "Companion I": {
      description: "You have earned the trust of a traveling companion. This companion might be a noble mount, a befriended animal, or another member of your race. Your companion is assumed to be loyal friend and looks out for you in every way possible. This companion is equal to a Challenge Level 1 creature (which you may design yourself). Should your companion be slain or released it would take you another 1d6 weeks to find another worthy companion. Note: Should your chosen companion be an animal, you automatically succeed in all Easy Taming Checks with your companion. Additionally, the Health of the Companion should be broken down into Health Tiers with the following formula: ½ Health becoming their Fatigue Tier, ¼ Health becoming their Battered Tier, and ¼ Health becoming their Injured Tier.",
    },
    "Companion II": {
      prerequisiteAbilities: ["Companion I"],
      description: "As Companion I, but your companion is now equal to a creature with a Challenge Level of half your Level (round up). Note: Should your chosen companion be an animal, you automatically succeed in all Average Taming Checks with your companion.",
    },
    "Companion III": {
      prerequisiteAbilities: ["Companion II"],
      description: "As Companion II, but your companion is now equal to a creature with a Challenge Level equal to your Level. Note: Should your chosen companion be an animal, you automatically succeed in all Difficult Taming Checks with them.",
    },
    "Composed": {
      description: "You are always calm, cool, and collected. When you are Surprised attackers do not gain Advantage on their Checks against you, and you can take an Action or a Maneuver in a Surprise Round.",
    },
    "Common Weapon Training": {
      description: "You've managed to get some hands-on time with the most basic of weapons. You are now considered trained in all Common weapons. Note: All Acolytes, Rogues, and Warriors already possess this level of Training.",
    },
    "Connections": {
      description: "You've made a great number of friends and acquaintances, and always seem to know just who to ask to get what you need. Finding someone that can sell stolen goods or arrange travel, finding a place to stay, or finding unique equipment always seems well within your capability.",
    },
    "Cross-Trained": {
      description: "Selecting this Ability allows you to immediately select an Ability from any other Class's list of Abilities. For example, selecting the Cross-Trained Ability and choosing the Warrior's Born In Armor Ability would give you the Ability: Cross-Trained: Born in Armor as a single Ability choice.",
    },
    "Disease Resistant": {
      description: "You have a highly developed immune system. You are immune to all forms of disease.",
    },
    "Eidetic Memory": {
      description: "You have always possessed a powerful memory. You can recall everything you have personally experienced in life. Books you've read, conversations you've had, or even things you've seen can all be summoned forth from your memory.",
    },
    "Fated": {
      description: "Characters with this Ability roll three d20's. These dice are set aside and kept through a session. Each die may be used in place of rolling a Check, and each die must be used through the course of the session. If a die is unused by the end of the session, this Ability may not be used in the next game session (though it may again in the session following).",
    },
    "Fortunate": {
      description: "You live a very charmed life. Rather than roll, one time per Session, you may automatically succeed at any one single Check.",
    },
    "Full Defense": {
      description: "You are adept at forgoing any aggressive action to ensure your opponents have an exceedingly difficult time hitting you in combat. As an Action, you may increase your Defense by four (+4). This Action happens in the Round you declare it and does not wait to go into effect following the End of Round Report.",
    },
    "Gallant": {
      description: "You have always been able to captivate, motivate, or impress others. You gain a bonus of +1 to your Valor Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Graced": {
      description: "You possess your god's divine sanction. Gain two (+2) additional Favor.",
    },
    "Grandmaster": {
      prerequisiteAbilities: ["a Talent at Mastery Expertise"],
      description: "You have studied, practiced, and honed your talents to legendary levels. This Ability is applied to a Talent you have at Master Expertise. You now have the Grandmaster level of Expertise for that Talent, granting you a bonus of +9 for any Checks with that Talent.",
    },
    "Hardened": {
      description: "You pride yourself on your conditioning and hardiness. Your body has always seen you through the worst the world has to offer. You gain a bonus of +1 to your Constitution Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Heavy Armor Training": {
      prerequisiteAbilities: ["Medium Armor Training"],
      description: "You have had training in the greatest of armors. You are considered trained in Heavy Armor. Note: All Warriors already possess this level of training.",
    },
    "Heirloom": {
      description: "Something has been gifted to you that has been passed down for generations. You may choose any single (1) piece of equipment, Runework, or Minor/Minute Magic Item without cost for your Character. Your GM has final say as to what is an acceptable item for this Ability.",
    },
    "High Tolerance": {
      description: "You can drink anyone under the table. With this Ability your character never suffers any adverse effects from consuming alcohol or other narcotics. You do not suffer Disadvantage on Hit Checks, do not have your Speed reduced by half, and do not suffer Disadvantage on Physical Talent Checks due to the Inebriated State. However, you do retain any positive effects of the Inebriated State (immune to Fear, enemies at Disadvantage for Damage).",
    },
    "Intuitive Aim": {
      description: "You have an uncanny ability to hit Targets without relying on sight. You do not suffer Disadvantage when making ranged attacks against Targets you cannot see clearly (due to darkness, fog, etc.).",
    },
    "Light Armor Training": {
      description: "You have had training in light armor. You are considered trained in Light Armor. Note: All Acolytes, Rogues, and Warriors already possess this level of training.",
    },
    "Light-Footed": {
      description: "You are exceptionally nimble on your feet. Increase your Base Move by +5' per turn.",
    },
    "Martial Weapon Training": {
      prerequisiteAbilities: ["Common Weapon Training"],
      description: "You have trained with more advanced weapons. You are considered trained in all Martial weapons. Note: All Warriors already possess this level of training.",
    },
    "Medium Armor Training": {
      prerequisiteAbilities: ["Light Armor Training"],
      description: "You have had training in medium armor. You are considered trained in Medium Armor. Note: All Warriors already possess this level of training.",
    },
    "Merciless": {
      description: "You show no mercy when delivering the killing blow. When you reduce an enemy to 0 Stamina or less, you may immediately make a single attack against another enemy within reach or range as a Free Action.",
    },
    "Mercurial": {
      description: "You are exceptionally quick and light on your feet. You gain a bonus of +1 to your Dexterity Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Mighty": {
      description: "You are exceptionally strong. You gain a bonus of +1 to your Strength Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Mystical I": {
      description: "You possess the ability to cast Arcane magic. You gain Mana equal to a 1st Level Mage and may learn and cast Spells (using Arcane Aptitude, the same as a Mage). Choose a single Arcane Art. You may only learn Spells from this Art. Your Caster Level is equal to your character Level. Note: You must possess this Ability before you can take Mystical II.",
      restrictions: "Non-Mage, Non-Rogue",
    },
    "Mystical II": {
      prerequisiteAbilities: ["Mystical I"],
      description: "As Mystical I, but you now gain additional Mana equal to a 1st Level Mage and may choose a second Arcane Art from which to learn Spells. Note: You must possess this Ability before you can take Mystical III.",
    },
    "Mystical III": {
      prerequisiteAbilities: ["Mystical II"],
      description: "As Mystical II, but you now gain additional Mana equal to a 1st Level Mage and may choose a third Arcane Art from which to learn Spells.",
    },
    "Nature's Blessing": {
      description: "You have a natural affinity with animals and plants. You gain Advantage on all Checks related to interacting with animals or navigating natural environments.",
    },
    "Poison Immunity": {
      description: "You are immune to all forms of poison. Poisons have no effect on you whatsoever.",
    },
    "Predisposed": {
      description: "You have a natural aptitude for learning. You gain an additional Skill Point to spend on Talents at character creation and each time you gain a level.",
    },
    "Purebred": {
      description: "Your bloodline is pure and strong. Choose one of your racial Attributes (Strength, Dexterity, Constitution, Instincts, or Valor). That Attribute's maximum is increased by one (+1).",
    },
    "Qualified": {
      description: "You are exceptionally well-educated. You gain a bonus of +1 to your Instincts Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Quick Healer": {
      description: "Your body heals remarkably quickly. You regain an additional point of Stamina whenever you successfully Recuperate or Rest.",
    },
    "Reduced Sleep": {
      description: "You require less sleep than most. You only need four hours of sleep to gain the benefits of a full Rest.",
    },
    "Renowned": {
      description: "You have built a reputation that precedes you. You gain Advantage on all Checks related to your reputation (Persuasion, Intimidation, etc.). The GM has final say on which Checks qualify.",
    },
    "Robust": {
      description: "You have incredible endurance and stamina. You gain additional maximum Stamina equal to your Level. Note: This bonus increases as you gain levels.",
    },
    "Runecrafter": {
      description: "You have learned the ancient art of Runecrafting. You can create Runework items as described in the Magic Items section.",
    },
    "Shield Training": {
      description: "You have trained with shields. You are considered trained in using shields. Note: All Warriors already possess this training.",
    },
    "Shield Guard I": {
      prerequisiteAbilities: ["Shield Training"],
      description: "You can use your shield to protect those around you. As a Maneuver, you can grant an adjacent ally a Defense bonus equal to your shield's Defense bonus until the start of your next turn.",
    },
    "Shield Guard II": {
      prerequisiteAbilities: ["Shield Guard I"],
      description: "As Shield Guard I, but you can now protect up to two adjacent allies with a single Maneuver.",
    },
    "Skilled": {
      description: "You have honed your skills beyond those of ordinary people. You gain two (+2) additional Skill Points to spend on Talents. This Ability may be taken multiple times.",
      canTakeMultiple: true,
    },
    "Specialty Weapon Training": {
      prerequisiteAbilities: ["Martial Weapon Training"],
      description: "You have trained with the most exotic and rare weapons. You are considered trained in all Specialty weapons.",
    },
    "Sure-Footed": {
      description: "You have exceptional balance and coordination. You automatically succeed on all Checks to avoid being knocked Prone, and you can move at full speed across difficult terrain.",
    },
    "Thick Skull": {
      description: "You are remarkably resistant to head trauma. You are immune to being Dazed or Stunned from physical attacks.",
    },
    "Tireless": {
      description: "You have exceptional endurance. You can travel twice as far in a day without suffering from exhaustion, and you ignore the first level of exhaustion penalties.",
    },
    "Tough": {
      description: "You are incredibly resilient. You gain a permanent bonus of one (+1) to your Defense.",
    },
    "Unbreakable": {
      description: "Your will is iron and your resolve unshakable. You are immune to all mind-affecting Effects (Charm, Fear, Compulsion, etc.). The GM has final say on what Effects do or do not affect you.",
    },
    "Unremarkable": {
      description: "You have a forgettable face and presence. You gain Advantage on all Checks to blend into crowds, avoid detection, or be forgotten. People have difficulty remembering specific details about you.",
    },
    "Untouchable": {
      description: "You are exceptionally difficult to hit. Once per Encounter, when you would be hit by an attack, you can choose to have that attack miss instead.",
    },
    "Wizened": {
      description: "Your years have granted you great wisdom and insight. You gain two (+2) additional Skill Points that must be spent on Knowledge Talents.",
    },
  },
};
