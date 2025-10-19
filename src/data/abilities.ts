export interface Ability {
  description?: string;
  effect?: string;
  prerequisiteClass?: string;
  prerequisiteAbilities?: string[];
  restrictions?: string;
  canTakeMultiple?: boolean;
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
    },
    "Beneficent God": {
      prerequisiteClass: "Acolyte",
      description: "Your god is always there to assist those around you. You begin the game with one additional (+1) Bless (for a total of 2) and gain an additional Bless every level (rather than every other).",
    },
    "Bred For Battle": {
      prerequisiteClass: "Acolyte",
      description: "Selecting this Ability allows you to immediately select an Ability from the Warrior's list of Abilities. For example, selecting the Bred For Battle Ability and choosing the Warrior's Born In Armor Ability would give you the Ability: Bred for Battle: Born in Armor as a single Ability choice.",
    },
    "Child of the Moon": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Moon as to Selene herself. With proper prayer and veneration, Lady Moon can bestow her boons upon the Acolyte:\n• Admonition: With but an hour of prayer the Acolyte becomes aware of anyone seeking to do them harm while they rest. This watch lasts throughout the Acolyte's rest and will stir them from slumber should they be asleep.\n• Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte.\n• Quiet: For every hour of prayer the Acolyte gains four hours of absolute silence. Nothing the Acolyte does makes a sound unless they choose to make a sound.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Night": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Night as to Erebos himself. With proper prayer and veneration, the High Night can bestow his boons upon the Acolyte:\n• Adumbration: For every hour of prayer the Acolyte gains four hours of shadowed obscurity. The Acolyte appears as if engulfed in wispy shadows and is considered in hiding unless they make noise or otherwise make their presence known. All Stealth Talent Checks to hide are made at Advantage.\n• Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area.\n• Omen: Following an hour of prayer to the High Night, the Acolyte can peer up into the stars above to see omens of events, people, or places as determined by the GM.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Sun": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Sun as to Illios himself. With proper prayer and veneration, Lord Sun can bestow his boons upon the Acolyte:\n• Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte's Holy Aura, as far off as the light of the sun may reach.\n• Clement: With an hour of prayer the Acolyte can cause the immediate area of his Holy Aura to become mild and pleasant. Snow will melt, dampness will evaporate, winds will calm, and heat waves will cool - but only in the area where the prayer was conducted. This Clemency lasts until the Acolyte steps out of the Clement area.\n• Purify: With dedicated and uninterrupted eight hours of prayer, the Acolyte can purge impurities from their system. When the Acolyte begins their prayer, the effects of toxins, poisons, and disease immediately cease. Should they complete their prayer undisturbed, any toxins, poisons, or disease within their system is immediately cleansed. Otherwise, if interrupted or disturbed, the effects of the toxins, poisons, or disease continue from that point forward.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Triad": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is a connection to each of the gods. With proper prayer and veneration, the Triad can bestow their boons upon the Acolyte:\n• Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte's Holy Aura, as far off as the light of the sun may reach.\n• Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte.\n• Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Chosen Vessel I": {
      prerequisiteClass: "Acolyte",
      description: "You can use others as your divine conduit to enact Interventions. Once per Day choose any target in your line of sight to be the center of your Holy Aura.",
    },
    "Chosen Vessel II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Chosen Vessel I"],
      description: "As Chosen Vessel I, but your Chosen Vessel may be any individual you know. Note: It is up to the GM as to whether an individual is considered known to the Acolyte.",
    },
    "Coalesce": {
      prerequisiteClass: "Acolyte",
      description: "You can combine the Influences of your god into greater and greater Divine Interventions. You possess the ability to enact Divine Interventions that combine Effects from all Influences you have access to.",
    },
    "Conviction": {
      prerequisiteClass: "Acolyte",
      description: "Your faith against fear is an inspiration to others. You may use a Bless as a Free Action to allow anyone in your Holy Aura to use your Daring as their own for the duration of the Encounter.",
    },
    "Create Relic": {
      prerequisiteClass: "Acolyte",
      description: "You are one of the few individuals capable of creating powerful magical items. You can create a Sacred Relic as described in the Magic Items section.",
    },
    "Crusader": {
      prerequisiteClass: "Acolyte",
      description: "You are the fist of your god, able to turn divine will into victory on the battlefield. Once per Encounter you may spend Favor, up to your Level, to gain temporary Stamina. For every point of Favor spent you gain 3 points of Stamina. Any unspent, temporary Stamina is lost at the end of the Encounter. Use of this Ability is considered a Free Action.",
    },
    "Curse": {
      prerequisiteClass: "Acolyte",
      description: "Some gods strive only to help others; yours has a more practical outlook on life. Your Blessings may be used to Disadvantage a Target. The Target of your Curse will make their next Check at Disadvantage.",
    },
    "Death Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Death you have found yourself granted with extraordinary powers. The following powers are granted to a Death Devotee:\n• Once per day a Death Devotee may automatically succeed on any one Strength-related Check.\n• Once per day a Death Devotee may double (x2) the range of their Holy Aura for a Death Influence-related Divine Intervention.\n• Once per day a Death Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Death with a cost of 1 Favor for free.",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Disciple of Erebos": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Erebos"],
      description: "Erebos offers you even more for being worthy of his Blessings. Your Blessings may also be used to double the result of your recipient's next Damage roll.",
    },
    "Disciple of Ilios": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Ilios"],
      description: "Ilios offers you even more for being worthy of his Blessings. Your Blessings may also be used to make Opponents roll their next Hit Checks against the recipient at Disadvantage for the Round.",
    },
    "Disciple of Selene": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of Selene"],
      description: "Selene offers you even more for being worthy of her Blessings. Your Blessings may also be used to grant Damage Reduction to the recipient equal to twice your Level for the Round.",
    },
    "Disciple of the Triad": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Follower of the Triad"],
      description: "The Triad offers you even more for being worthy of their Blessings. Your Blessings may be used to grant a Defense bonus to the recipient equal to your Level. This bonus lasts until the next successful Hit Check is made against the recipient.",
    },
    "Divination Devotee": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Access to the Divine Influence of Divination"],
      description: "As a devoted adherent to the Divine Influence of Divination you have found yourself granted with extraordinary powers. The following powers are granted to a Divination Devotee:\n• Once per day a Divination Devotee may automatically succeed on any one Knowledge-related Check.\n• Once per day a Divination Devotee may double (x2) the range of their Holy Aura for a Divination Influence-related Divine Intervention.\n• Once per day a Divination Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Divination with a cost of 1 Favor for free.",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Divine Grace": {
      prerequisiteClass: "Acolyte",
      description: "You are a protected servant of the gods when in their good graces. When maintaining at least half of your Favor, you are immune to arcane, mind affecting Effects (Chaos, Charm, Shape Memory, Suggestion, etc.). The GM has final say on what Effects do or do not affect you.",
    },
    "Divine Protection I": {
      prerequisiteClass: "Acolyte",
      description: "Your god protects all those who side with you in battle. As an Action, you can give a number of your allies, equal to your level, a +1 Defense for the duration of the encounter. This ability may be used one time per day.",
    },
    "Divine Protection II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Divine Protection I"],
      description: "As Divine Protection I, but rather than bestowing a +1 Defense to your allies you now bestow a Defense bonus of +2. This ability may be used one time per day.",
    },
    "Ear Of The Gods": {
      prerequisiteClass: "Acolyte",
      description: "The simplest of requests are instantly granted by your god. With this Ability you can enact one Divine Intervention as a Free Action, once per Encounter.",
    },
    "Enliven": {
      prerequisiteClass: "Acolyte",
      description: "Your faith is invigorating. You can cause those within your Holy Aura to regain Stamina during an Encounter. This Ability is activated with a single Action, then continues throughout the remainder of the Encounter. Recipients regain Stamina at a rate based upon your level (see the Enliven Table).",
    },
    "Exalt": {
      prerequisiteClass: "Acolyte",
      description: "You can ask the Divine for just a bit more when it comes to Blessing those around you. By expending two (2) Blessings, you may grant an individual an automatic Success on their next Check.",
    },
    "Faith Abounding": {
      prerequisiteClass: "Acolyte",
      description: "When brimming with their god's favor, some Acolytes become empowered. An Acolyte with this Ability gains one of the following powers as associated with their faith, so long as their Favor is at or within one-half their Level (round up) of maximum. For example, a 5th level Acolyte with a maximum Favor of 16, must posess 13 or more Favor to gain one of the benefits below:\n\nFaith Abounding Table\n\nFaith | Power\nErebos | Gain Advantage on all Talent Checks\nIllios | No Disadvantage as a result of Reactions in combat\nSelene | Gain Damage Reduction equal to their Level\nTriad | Are Immune to all States",
    },
    "Glorious Finish": {
      prerequisiteClass: "Acolyte",
      description: "Unbeknownst to your enemies, the ire of your God becomes evident in your most desperate hour. When Downed, all allies within your Holy Aura receive an immediate Bless (this is a free Bless and does not come from the number of Bless the Acolyte has available to them), and have all negative States removed (as decided by the GM).",
    },
    "Greater God": {
      prerequisiteClass: "Acolyte",
      description: "Your god sees great things in you. As such they have granted you access to one additional Influence for use in enacting Divine Interventions.",
    },
    "Holy Emanation I": {},
    "Holy Emanation II": {},
    "Hospitaller": {},
    "Improved Holy Aura": {},
    "Indulgence": { canTakeMultiple: true },
    "Inspiration": {},
    "Life Devotee": {},
    "Martyr I": {},
    "Martyr II": {},
    "Miracle": { canTakeMultiple: true },
    "Nature Devotee": {},
    "Oathbinder": {},
    "Pious": {},
    "Protection Devotee": {},
    "Rapture Devotee": {},
    "Relic Antiquarian": {},
    "Reprisal": {},
    "Rouse": {},
    "Selfish God": {},
    "Sense Enemy": {},
    "Shared Favor": {},
    "Sincere": {},
    "Smite I": {},
    "Smite II": {},
    "Soul Steal": {},
    "Stalwart": {},
    "Thaumaturge": {},
    "Venerable Spirit": {},
    "Vesting Faith": {},
    "Zealot I": {},
    "Zealot II": {},
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
    "Master of Air": {},
    "Master of Cosmos": {},
    "Master of Earth": {},
    "Master of Fire": {},
    "Master of Water": {},
    "Memorized Spell": {},
    "Multitasker": { canTakeMultiple: true },
    "Mystic Leverage I": {},
    "Mystic Leverage II": {},
    "Personal Immunity": {},
    "Powerful Magic": {},
    "Ravage I": {},
    "Ravage II": {},
    "Repeat Spell I": {},
    "Repeat Spell II": {},
    "Rune Release": {},
    "Runemaster I": {},
    "Runemaster II": {},
    "Shorthand": {},
    "Steady Runework": {},
    "Sustained Arcana": {},
    "Switch": {},
    "Ritual Magic": {},
    "Wild Mage": {},
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
    "Inspire Success": {},
    "Jack of All Trades": {},
    "Knockout Artist": {},
    "Learn From Mistakes": {},
    "My Weapon": {},
    "Obscure Knowledge": {},
    "Performer": {},
    "Poison Master": {},
    "Purposeful": {},
    "Precise I": {},
    "Precise II": {},
    "Pugilist I": {},
    "Pugilist II": {},
    "Ready And Waiting": {},
    "Redirection I": {},
    "Redirection II": {},
    "Sharpshooter I": {},
    "Sharpshooter II": {},
    "Steady Aim I": {},
    "Steady Aim II": {},
    "Stunning Strike": {},
    "Tumbler": {},
    "Willful Focus": {},
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
    "Improved Critical I": {},
    "Improved Critical II": {},
    "King's Code": {},
    "Maniacal": {},
    "Marksman": {},
    "Mounted Archer": {},
    "Mounted Assault": {},
    "Mounted Combatant": {},
    "Opportunist": {},
    "Pelter": {},
    "Quick Draw": {},
    "Roar": {},
    "Ruthless I": {},
    "Ruthless II": {},
    "Sacrifice": {},
    "Shield Fighter": {},
    "Shield Mastery": {},
    "Slam": {},
    "Swift Reload": {},
    "Taunt": {},
    "Thrill of Victory I": {},
    "Thrill of Victory II": {},
    "Trample": {},
    "Undying": {},
    "Utilitarian": {},
    "Valiant": {},
    "Weapon Master I": {},
    "Weapon Master II": {},
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
    "Intuitive Aim": {},
    "Light Armor Training": {},
    "Light-Footed": {},
    "Martial Weapon Training": {},
    "Medium Armor Training": {},
    "Merciless": {},
    "Mercurial": {},
    "Mighty": {},
    "Mystical I": {},
    "Mystical II": {},
    "Mystical III": {},
    "Nature's Blessing": {},
    "Poison Immunity": {},
    "Predisposed": {},
    "Purebred": {},
    "Qualified": {},
    "Quick Healer": {},
    "Reduced Sleep": {},
    "Renowned": {},
    "Robust": {},
    "Runecrafter": {},
    "Shield Training": {},
    "Shield Guard I": {},
    "Shield Guard II": {},
    "Skilled": { canTakeMultiple: true },
    "Specialty Weapon Training": {},
    "Sure-Footed": {},
    "Thick Skull": {},
    "Tireless": {},
    "Tough": {},
    "Unbreakable": {},
    "Unremarkable": {},
    "Untouchable": {},
    "Wizened": {},
  },
};
