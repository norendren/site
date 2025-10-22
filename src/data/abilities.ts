export interface Ability {
  description?: string;
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
      description: "Your Blessings are not confined to the living. With this Ability the Acolyte may bestow their Bless upon an object, allowing its wielder to gain Advantage on their next Check with the item. This Ability could be used on a weapon to grant Advantage on its next Hit check, or on a healer’s kit to grant Advantage on the user’s next Hermetics Check."
    },
    "Beneficent God": {
      prerequisiteClass: "Acolyte",
      description: "Your god is always there to assist those around you. You begin the game with one additional (+1) Bless (for a total of 2) and gain an additional Bless every level (rather than every other).",
    },
    "Bred For Battle": {
      prerequisiteClass: "Acolyte",
      description: "Selecting this Ability allows you to immediately select an Ability from the Warrior’s list of Abilities. For example, selecting the Bred For Battle Ability and choosing the Warrior’s Born In Armor Ability would give you the Ability: Bred for Battle: Born in Armor as a single Ability choice.",
    },
    "Child of the Moon": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Moon as to Selene herself. With proper prayer and veneration, Lady Moon can bestow her boons upon the Acolyte: • 176 Admonition: With but an hour of prayer the Acolyte becomes aware of anyone seeking to do them harm while they rest. This watch lasts Abilities throughout the Acolyte’s rest and will stir them from slumber should they be asleep. • Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte. • Quiet: For every hour of prayer the Acolyte gains four hours of absolute silence. Nothing the Acolyte does makes a sound unless they choose to make a sound. Note: Only one “Child of…” Ability may be taken at a time.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Night": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Night as to Erebos himself. With proper prayer and veneration, the High Night can bestow his boons upon the Acolyte: • Adumbration: For every hour of prayer the Acolyte gains four hours of shadowed obscurity. The Acolyte appears as if engulfed in wispy shadows and is considered in hiding unless they make noise or otherwise make their presence known. All Stealth Talent Checks to hide are made at Advantage. • Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area. • Omen: Following an hour of prayer to the High Night, the Acolyte can peer up into the stars above to see omens of events, people, or places as determined by the GM. Note: Only one “Child of…” Ability may be taken at a time.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Sun": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is as much to the Sun as to Illios himself. With proper prayer and veneration, Lord Sun can bestow his boons upon the Acolyte: • • Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte’s Holy Aura, as far off as the light of the sun may reach. Clement: With an hour of prayer the Acolyte can cause the immediate area of his Holy Aura to become mild and pleasant. Snow will melt, dampness will evaporate, winds will calm, and heat waves will cool - but only in the area where the prayer was conducted. This Clemency lasts until the Acolyte steps out of the Clement area. 177 ATHIA – • Purify: With dedicated and uninterrupted eight hours of prayer, the Acolyte can purge impurities from their system. When the Acolyte begins their prayer, the effects of toxins, poisons, and disease immediately cease. Should they complete their prayer undisturbed, any toxins, poisons, or disease within their system is immediately cleansed. Otherwise, if interrupted or disturbed, the effects of the toxins, poisons, or disease continue from that point forward. Note: Only one “Child of…” Ability may be taken at a time.",
      restrictions: "Only one \"Child of…\" Ability may be taken at a time.",
    },
    "Child of the Triad": {
      prerequisiteClass: "Acolyte",
      description: "Your connection to the Divine is a connection to each of the gods. With proper prayer and veneration, the Triad can bestow their boons upon the Acolyte: • Beacon: While the Acolyte prays, a ray of light can be cast forth as bright as the sun. The intended target of the Beacon is basked in light as grand as the size of the Acolyte’s Holy Aura, as far off as the light of the sun may reach. • Inner Peace: Four hours of meditative prayer bestows a worthwhile Rest upon the Acolyte. • Spiritglow: For every hour of prayer the Acolyte gains four hours to see the spirits of Athia. This ability does not allow the Acolyte to see in the dark per se, but rather allows them to see the glow of spirits surrounding them. This allows them to see their surroundings because of the ambient glow of spirits in the area. Note: Only one “Child of…” Ability may be taken at a time.",
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
      description: "As a devoted adherent to the Divine Influence of Death you have found yourself granted with extraordinary powers. The following powers are granted to a Death Devotee: • Once per day a Death Devotee may automatically succeed on any one Strength-related Check. • Once per day a Death Devotee may double (x2) the range of their Holy Aura for a Death Influence-related Divine Intervention. • Once per day a Death Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Death with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time.",
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
      description: "As a devoted adherent to the Divine Influence of Divination you have found yourself granted with extraordinary powers. The following powers are granted to a Divination Devotee: • Once per day a Divination Devotee may automatically succeed on any one Knowledge-related Check. • Once per day a Divination Devotee may double (x2) the range of their Holy Aura for a Divination Influence-related Divine Intervention. • Once per day a Divination Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Divination with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time.",
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
      description: "As Divine Protection I, but rather than bestowing a +1 Defense to your allies you now bestow a Defense bonus of +2. This ability may be used one time per day. 185 ATHIA –",
    },
    "Ear Of The Gods": {
      prerequisiteClass: "Acolyte",
      description: "The simplest of requests are instantly granted by your god. With this Ability you can enact one Divine Intervention as a Free Action, once per Encounter.",
    },
    "Enliven": {
      prerequisiteClass: "Acolyte",
      description: "Acolyte Stamina Regained Level Your faith is invigorating. You can per Round cause those within your Holy Aura 1-2 1 to regain Stamina during an 3-4 2 Encounter. This Ability is activated 5-6 3 with a single Action, then continues 7+ 4 throughout the remainder of the Encounter. Recipients regain Stamina at a rate based upon your level (see the Enliven Table).",
    },
    "Exalt": {
      prerequisiteClass: "Acolyte",
      description: "You can ask the Divine for just a bit more when it comes to Blessing those around you. By expending two (2) Blessings, you may grant an individual an automatic Success on their next Check.",
    },
    "Faith Abounding": {
      prerequisiteClass: "Acolyte",
      description: "When brimming with their god’s favor, some Acolytes become empowered. An Acolyte with this Ability gains one of the following powers as associated with their faith, so long as their Favor is at or within one-half their Level (round up) of maximum. For example, a 5th level Acolyte with a maximum Favor of 16, must posess 13 or more Favor to gain one of the benefits below: Faith Abounding Table Faith Erebos Illios Selene Triad Power Gain Advantage on all Talent Checks No Disadvantage as a result of Reactions in combat Gain Damage Reduction equal to their Level Are Immune to all States",
    },
    "Glorious Finish": {
      prerequisiteClass: "Acolyte",
      description: "Unbeknownst to your enemies, the ire of your God becomes evident in your most desperate hour. When Downed, all allies within your Holy Aura receive an immediate Bless (this is a free Bless and does not come from the number of Bless the Acolyte has available to them), and have all negative States removed (as decided by the GM). 191 ATHIA –",
    },
    "Greater God": {
      prerequisiteClass: "Acolyte",
      description: "Your god sees great things in you. As such they have granted you access to one additional Influence for use in enacting Divine Interventions.",
    },
    "Holy Emanation I": {
      prerequisiteClass: "Acolyte",
      description: "Your god makes you fearsome in battle. The first Hit Check attempted by an enemy against you in an Encounter is done so at Disadvantage.",
    },
    "Holy Emanation II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Holy Emanation I"],
      description: "Fear of lashing out against a representative of the Divine cowers your opponent's blows. In addition to your enemies having Disadvantage on their first attempts at a Hit Check against you, all their Damage rolls against you are done so at Disadvantage.",
    },
    "Hospitaller": {
      prerequisiteClass: "Acolyte",
      description: "Your powers are always at their best when aiding others. You roll any healing die at Advantage.",
    },
    "Improved Holy Aura": {
      prerequisiteClass: "Acolyte",
      description: "Your god has made your powers far reaching. The radius of your Holy Aura is increased by 50%. Therefore, a Fifth Level Acolyte would have a Holy Aura of 75’ instead of 50’.",
    },
    "Indulgence": {
      prerequisiteClass: "Acolyte",
      description: "Your greatest moments make the heavens proud, earning you great boons in times of need. When you score a Critical Success add a point to this Ability. Spend this point to automatically succeed (though not a Critical success) on any one Check. Only one point may be banked with this Ability at a time. This Ability may be taken multiple times to increase the number of successes one may bank by one.",
      canTakeMultiple: true,
    },
    "Inspiration": {
      prerequisiteClass: "Acolyte",
      description: "No one is better at encouraging those around them to fight on than you. By spending an Action, you can remove any negative Combat Reactions due to Fear from those within your Holy Aura for the Round. 195 ATHIA –",
    },
    "Life Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Life you have found yourself granted with extraordinary powers. The following powers are granted to a Life Devotee: 197 ATHIA – • Once per day a Life Devotee may automatically succeed on any one Constitution-related Check. • Once per day a Life Devotee may double (x2) the range of their Holy Aura for a Life Influence-related Divine Intervention. • Once per day a Life Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Life with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time.",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Martyr I": {
      prerequisiteClass: "Acolyte",
      description: "Sometimes you must sacrifice yourself for others. When an ally fighting alongside you is wounded, you may choose to take the Damage from that attack yourself. Martyr may be used once per encounter.",
    },
    "Martyr II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Martyr I"],
      description: "As Martyr I, but any time an ally fighting alongside you is wounded, you may choose to take the Damage from that attack yourself. You are no longer limited in the number of times you may use this Ability in an encounter.",
    },
    "Miracle": {
      prerequisiteClass: "Acolyte",
      description: "You can enact a divine miracle. This may be anything conceivable devised by you with the consent of the GM, such as turning an entire land fertile or returning a character to life. This Ability once used is lost, but when called upon the god(s) will attempt to do all the character asks of them. Note: This Ability may be taken multiple times.",
      canTakeMultiple: true,
    },
    "Nature Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Nature you have found yourself granted with extraordinary powers. The following powers are granted to a Nature Devotee: • Once per day a Nature Devotee may automatically succeed on any one Instincts-related Check. • Once per day a Nature Devotee may double (x2) the range of their Holy Aura for a Nature Influence-related Divine Intervention. • Once per day a Nature Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Nature with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time.",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Oathbinder": {
      prerequisiteClass: "Acolyte",
      description: "You can bind people to sworn oaths. Oaths are agreed upon terms between two or more people and may include the Acolyte themselves. Once the terms have been agreed upon, a punishment must also be agreed upon. The Acolyte can then bind the oath, obligating everyone to their word. Should any party fail in delivering upon the oath’s terms, they then suffer the penalties agreed upon, delivered by the hands of the gods themselves. Note: Oath punishments will be settled by the GM and should be as close to the agreed upon punishments as possible.",
    },
    "Pious": {
      prerequisiteClass: "Acolyte",
      description: "Your heartfelt appeal to the Gods is exceedingly compelling. You gain one (+1) additional Favor with each successful Prayer.",
    },
    "Protection Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Protection you have found yourself granted with extraordinary powers. The following powers are granted to a Protection Devotee: • Once per day a Protection Devotee may automatically succeed on any one Valor-related Check. • Once per day a Protection Devotee may double (x2) the range of their Holy Aura for a Protection Influence-related Divine Intervention. • Once per day a Protection Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Protection with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time.",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Rapture Devotee": {
      prerequisiteClass: "Acolyte",
      description: "As a devoted adherent to the Divine Influence of Rapture you have found yourself granted with extraordinary powers. The following powers are granted to a Rapture Devotee: • Once per day a Rapture Devotee may automatically succeed on any one Dexterity-related Check. • Once per day a Rapture Devotee may double (x2) the range of their Holy Aura for a Rapture Influence-related Divine Intervention. • Once per day a Rapture Devotee may enact (as a Free Action) a Divine Intervention from the Influence of Rapture with a cost of 1 Favor for free. Note: Only one “...Devotee” Ability may be taken at a time. 205 ATHIA –",
      restrictions: "Only one \"...Devotee\" Ability may be taken at a time.",
    },
    "Relic Antiquarian": {
      prerequisiteClass: "Acolyte",
      description: "You have always had a metaphysical connection to the Relics of the Divine. You can detect the presence and the faith of a Sacred Relic while it is within your Holy Aura. Having done so, should the Relic be of an Old Faith, you can convert a Sacred Relic to your faith (see Magic Items for more details) and therefore be able to use it yourself. Finally, having successfully converted a Sacred Relic, or found a relic of your faith, you can then use that icon as a font of Favor. Sacred Relics have a pool of Favor to draw from equal to the following breakdown: 206 Abilities • Minute – 5 Favor • Minor Relic – 10 Favor • Moderate Relic – 20 Favor • Major Relic – 30 Favor • Epic Relic – 50 Favor Note: Once a Sacred Relic is drained of its Favor it reverts to an otherwise mundane (although possibly valuable) object.",
    },
    "Reprisal": {
      prerequisiteClass: "Acolyte",
      description: "Not all Acolytes resort to violence, but those who act in the name of their gods bring with them a divine vengeance. This Ability allows an Acolyte to add their Valor Score to their Hit Checks and Damage results.",
    },
    "Rouse": {
      prerequisiteClass: "Acolyte",
      description: "Through prayer, motivational cheers, or encouraging words you can spur those around you to fight through their wounds. By spending your Action during your turn to Rouse those around you, all those within your Holy Aura can fight without suffering from their wound penalties for that Round. This Ability may be used again and again so long as the Acolyte spends their Action Rousing their comrades.",
    },
    "Selfish God": {
      prerequisiteClass: "Acolyte",
      description: "Your God looks out for you as well. You may bestow your Blessings upon yourself.",
    },
    "Sense Enemy": {
      prerequisiteClass: "Acolyte",
      description: "You can detect the presence of those who would seek to do you harm if they are within your Holy Aura. Note: Knowing of the presence of these individuals does not mean you know precisely where they are located (should your target be hidden or invisible).",
    },
    "Shared Favor": {
      prerequisiteClass: "Acolyte",
      description: "You can gift your Favor to others. As an Action, you can grant up to your Level in Favor to any single individual within your Holy Aura. This gifted Favor is still counted as yours, and thus cannot be recouped until expended. If gifted to an Acolyte, they can expend it as if it were their own. Additionally, it can take their maximum Favor above its normal limit. If gifted to a non-Acolyte, it can be cast as 209 ATHIA – though they were a Rogue (Caster level is considered one less, and their Holy Aura is 5’ radius per Level).",
    },
    "Sincere": {
      prerequisiteClass: "Acolyte",
      description: "Even the Gods themselves cannot deny your genuine appeals. You gain one Favor following any failed Prayer attempt.",
    },
    "Smite I": {
      prerequisiteClass: "Acolyte",
      description: "Your god guides your hand in combat against your enemies. Once per Encounter you may add your current Favor to a Hit Check. If this Hit is successful, you may then add your current Favor to your Damage. Note: This Ability does not cost you your Favor to use.",
    },
    "Smite II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Smite I"],
      description: "As Smite I, but you may now add your maximum Favor to your Hit once per Encounter, regardless of your current Favor. If the Hit is successful, you may then add your maximum Favor to your Damage. 211 ATHIA –",
    },
    "Soul Steal": {
      prerequisiteClass: "Acolyte",
      description: "When passing from one world to the next there is an energy that exists. Although this energy is usually missed, you can tap into it with great effect. Following the Round in which something dies, you may, as a Free Action, select one soul to steal. Regardless of the number of individuals slain in a Round, the Soul Stealer may only choose one soul to steal. Select one power from the list below to define what type of Soul Steal power you possess: • Fortify: You steal the energy from the release of the departed’s soul to grant all you select within your Holy Aura an amount of Fatigue equal to one-half the Challenge Level or Level of the deceased (round up). This gained Fatigue cannot take a Character beyond their normal Fatigue maximum. • Glorify: You steal the energy from the release of the departed’s soul to grant any one individual within your Holy Aura one point (+1) of Favor. This gained Favor cannot take a Character beyond their normal Favor maximum. • Vivify: You steal the energy from the release of the departed’s soul to grant any one individual within your Holy Aura an amount of temporary Stamina equal to the Challenge Level or Level of the deceased. These temporary Stamina dissipate at the end of the Encounter. In selecting this Ability, the specific capability of the Soul Steal should be noted with the Ability. For example, Soul Steal: Glorify. Despite the number of capabilities within this Ability, Soul Steal may only be taken as an Ability once.",
    },
    "Stalwart": {
      prerequisiteClass: "Acolyte",
      description: "You have a dedicated sense of will when it comes to enacting Divine Interventions in combat. You may spend your Stamina to improve upon your Faith Checks. This is done in the same manner as spending Stamina to improve a Hit Check, by spending one Stamina point to improve a Faith Check result by one point.",
    },
    "Thaumaturge": {
      prerequisiteClass: "Acolyte",
      description: "You have a knack for infusing your Divine capabilities into simple tinctures, powders, or balms. With a successful Average (12) Hermetics Check and the expenditure of the appropriate amount of Favor, you can imbue a potion, salve, oil, or the like with a specific Divine Effect. This Effect will only affect the item or individual that applies the oil, drinks the potion, etc. This Favor is considered expended the moment the tincture is created but can be replaced with an appropriate amount of prayer.",
    },
    "Venerable Spirit": {
      prerequisiteClass: "Acolyte",
      description: "Your very essence is nearly otherworldly, leaving you with an almost supernatural spirit. As a result, you will not rise as a member of the Sick when you pass from this world to the next. Likewise, you are impervious to having another spirit Reincarnated into your body. In fact, your spirit is so different from those of the people around you that you can walk among the Sick with a Successful Faith Check at Average (12) Difficulty (treating it much like a successful Stealth Check).",
    },
    "Vesting Faith": {
      prerequisiteClass: "Acolyte",
      description: "Turning to their faith in times of need, an Acolyte can grant hidden reserves of strength. Vesting Faith allows the Acolyte to spend their Blessings to bestow Stamina. Stamina is granted at a rate of 2 plus the Acolyte’s Level points per Blessing. This Stamina remains with the Target until used.",
    },
    "Zealot I": {
      prerequisiteClass: "Acolyte",
      description: "Your conviction to the will of the Gods is unwavering. You always succeed on your initial Faith Checks for your Divine Interventions. All subsequent Faith Checks are made normally.",
    },
    "Zealot II": {
      prerequisiteClass: "Acolyte",
      prerequisiteAbilities: ["Zealot I"],
      description: "As Zealot I, but now you succeed on your first two Faith Checks for your Divine Interventions. Again, all subsequent Faith Checks are made normally. 217",
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
      description: "You’ve always had a knack for sensing Arcane powers. You automatically (no roll necessary) know when you are in the presence of Arcane Magic and what the Focus of another Arcane Caster’s Spell is. You also make your Scholar Checks at Advantage to determine how to activate a Runework item (see Runework in the Magic section for further details). Additionally, you automatically know the Art any Caster is using when casting Arcane magic. Finally, you can instantly identify Enchanted Items just by touching them.",
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
      description: "As an exemplar of the Arcane powers of Air you have been empowered with the following capabilities: • You can move at your normal rate of speed hovering just inches over the ground. This does not preclude you from falling, nor taking damage from a fall, but does mean you can traverse uneven ground (water, lava, etc.) simply by gliding over it. • You gain a bonus to your Defense of +1 versus any ranged missile attack (arrows, bolts, spears, sing stones, etc.). • You are impervious to the winds or magically created wind attacks. Note: Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a Character.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a Character.",
    },
    "Avatar of Cosmos": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of the Cosmos you have been empowered with the following capabilities: • With a connection to an incredible Arcane power, you no longer find yourself needing to sleep. • By meditating you can connect your physical self with the infinity of the universe, allowing you to better recover from wounds faster. Once per day you may heal two points (2) of Injuries with four hours of meditation. • You can make a cosmic connection to one of your material items, allowing them to slip through space and time. Only one connection may exist at a time, but once it is made you can summon that item to you at any time, instantly, as a Free Action. Note: Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Earth": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Earth you have been empowered with the following capabilities: • Like the ageless rock of the land, you no longer age yourself. You are not immortal, just no longer able to age. • You gain a bonus to your Defense of +1 versus any melee attack (weapons, fists, etc.). • So long as your feet are on land you are impervious to being moved or given the Prone State (see States for further information). Note: Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Fire": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Fire you have been empowered with the following capabilities: • You can see the heat in all things, and as such gain a sort of thermal vision that can allow you to see heat signatures at any time of day. You therefore no longer suffer Disadvantage in the dark when confronting a creature who generates their own body heat. • You gain a bonus to any Hit check of +1. • You are impervious to any extremes of heat or cold. Note: Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character. 171 ATHIA –",
      restrictions: "Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
    },
    "Avatar of Water": {
      prerequisiteClass: "Mage",
      description: "As an exemplar of the Arcane powers of Water you have been empowered with the following capabilities: • You can move at your normal Speed through water, and are unaffected by currents, pressure, or other aspects of water. Water no longer obstructs your vision, and you can see clearly underwater, penetrate the thickest of fogs, or pierce the driving rain. • You no longer suffer from hunger or thirst, sated by the endless Arcane powers of water’s life. • You can breathe water and remain indefinitely underwater. Note: Only one Avatar Ability (Avatar of Air, Cosmos, Earth, Fire, or Water) may be taken by a character.",
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
      description: "By tying up additional Mana during an Encounter, the Caster can create more powerful Effects from their Spells. Only one Bolster can be applied per Encounter, and once chosen, lasts for the duration of the Encounter. By tying up one (1) Mana the Caster may choose one the following benefits to their Spell Effects for the duration of the Encounter: • • • 174 Chances of Spells spreading (Acid, Electricity, Flame, Geyser, etc.) are increased by one (+1). For example, a one in four chance would become a two in four chance. Increase any Damage Resistance bonus by ½ Caster Level. Increase any Defense bonus by one (+1). Abilities • • • • Increase any movement bonus by +25%. Increase any size bonus by +25%. Reroll any 1’s when determining a Spell’s Damage. Transfer a Concentration Duration Spell to another Focus in range as an Action.",
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
      description: "You may Cooperate (as per Cooperation for Talent Checks) with another Arcane Caster on any Spell they are attempting to Cast, provided you have at least one 179 ATHIA – point of Aptitude in the Art or Arts contained in their Spell. You are limited to the maximum Spell difficulty of the lower Caster Level between you and whomever you are assisting and use their Spell Difficulty for your Aptitude Check. If the Spell requires more than one Mana to maintain, you may split the Mana cost with them, with an odd amount of Mana going to whomever you’re assisting. The maximum Spell difficulty for whomever you are assisting is raised by one (+1) for each character with Communal Casting assisting the initial Caster.",
    },
    "Continuance I": {
      prerequisiteClass: "Mage",
      description: "Your ability to keep your magic going comes easier to you. Reduce the cost of your Spell’s Duration by two (-2).",
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
      description: "You are firmly resolved to succeed at a given spell, and do not let your first failure dissuade you from trying the same spell again. When casting a Spell, if you miss your Aptitude Check by one or two, you may attempt to cast that same Spell again without needing to change your circumstances (refer to the Failure and Additional Attempts section of the Core Mechanics). For example, if you need to roll a 12 or better on your Aptitude Check and roll a 10 or 11, you may try again without changing your circumstances using this Ability. 183 ATHIA –",
    },
    "Distill Resonance": {
      prerequisiteClass: "Mage",
      description: "You are capable of drawing raw power out of the Resonance Crystals you find. You may syphon the Power Points out of a Resonance Crystal as a Free Action to 184 Abilities lower the Difficulty of an Aptitude Check by a value equal to your Level. Thus, a 3rd Level Mage could syphon 3 Power Points (their maximum, by Level) from a Minute Resonance Crystal to lower the Difficulty of their Aptitude Check by 3 (thus leaving 13 Power Points remaining in the Resonance Crystal).",
    },
    "Dynamism": {
      prerequisiteClass: "Mage",
      description: "For some Mages, when all goes well, it goes very well. Dynamic Mages gain added benefits from their critically successful castings. When selecting this Ability, choose one of the Dynamic Types from the Dynamism Table. The type chosen should be noted with the Ability. For example, Dynamism: Incendiary. When a Critical result is rolled on an Aptitude Check, the Mage with this Ability may choose to ignore the bonus given by Dynamism. Dynamism Table Dynamism Type Far-Reaching Incendiary Longstanding Vitalized Added Bonus on Critical Affect one additional Focus per level of the Mage Add 1d4 Damage to the result per Level of the Mage Duration (Rounds) extended by the Level of the Mage Automatically successful on their next Check",
    },
    "Eldritch Arcana": {
      prerequisiteClass: "Mage",
      description: "You can tap into the most puissant powers by opening conduits into the Arcane forces of Athia. In selecting this Ability, you may choose to tie one or more Mana points, at will, into the mightiest of Arcane forces. This Mana is invested and cannot be used for any other purpose (for example, casting Spells) unless the Mage takes an Action to reclaim their invested Mana. Choose one of the following capabilities: 186 Abilities • Adamant: By dedicating a point (1) of Mana the Mage gains a point of Damage Resistance against all physical attacks equal to one-half their Level (round up). By dedicating four (4) points of Mana the Mage increases that Damage Resistance against all physical attacks (i.e., nonArcane and non-Divine attacks) equal to their Level. • Adroit: By dedicating two points (2) of Mana the Mage may lower the Difficulty of any Spell they attempt to cast by one (-1 Spell Difficulty). By dedicating five points (5) the mage may lower the Difficulty of any Spell they attempt to cast by two (-2 Spell Difficulty). • Ensconced: By dedicating a point (1) of Mana the Mage gains a point of Damage Resistance against all Arcane attacks equal to one-half their Level (round up). By dedicating three (3) points of Mana the Mage increases that Damage Resistance against all Arcane attacks equal to their Level. • Magnitude: By dedicating three points (3) of Mana the Mage gains +1 to any Attribute they select. By dedicating four points (4) the mage gains +1 to any Attribute they select and may take that Attribute beyond their maximum. It takes an Action for the Mage to apply this bonus to a different Attribute. • Portend: By dedicating a point (1) of Mana the Mage no longer suffers Disadvantage on any Talent Checks. By dedicating three points (3) of Mana, the Mage is considered to have an Apprentice level of Expertise in each Talent. • Retaliative: By dedicating two points (2) of Mana the Mage may add an additional 1d4 Damage to any Spell they cast. By dedicating five points (5) of Mana the Mage may increase their Damage die used in any spell by one (D6’s become D8’s, D8’s become D10’s, etc.). Note: In selecting this Ability, the specific capability of the Eldritch Arcana should be noted with the Ability. For example, Eldritch Arcana: Intrepid, or Intrepid Eldritch Arcana. Despite the number of capabilities of this Ability, Eldritch Arcana may only be taken as an Ability once. Additionally, the effects of the Eldritch Arcana do not stack. For Example, a Mage who spends 4 Mana on their Magnitude Eldritch Arcana power gains a +1 to their Attribute (even beyond its maximum), not a +2.",
    },
    "Enchanter": {
      prerequisiteClass: "Mage",
      description: "You have a knack for empowering mundane items with your Arcane magic. You can create Enchanted Items as described in the Magic Items section.",
    },
    "Exact Magic I": {
      prerequisiteClass: "Mage",
      description: "Your ability to strike your foes with your magic comes easier to you. Reduce the cost of your Spell’s Each Additional Focuses by one (-1), thus reducing Each Additional Focus’ Difficulty Increase from +3 to +2.",
    },
    "Exact Magic II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Exact Magic I"],
      description: "As Exact Magic I, but you may now freely adjust the Focus of the Spells in your Grimoire (less or more Focuses, or less or more Focus Radius) without it 188 Abilities becoming a Spontaneous Spell. Spell Focuses altered require a corresponding adjustment to the difficulty of the Spell.",
    },
    "Extension I": {
      prerequisiteClass: "Mage",
      description: "Your ability to reach out with your magic is easier. Reduce the cost of your Spell’s Range by two (-2).",
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
      description: "You can set magical traps to kill your enemies. By tracing arcane symbols onto a floor, wall, door, or object you can empower it to go off the moment the Glyph is disturbed. The Mage spends one Round per Mana they wish to invest into their Glyph. Mana can be invested into a Glyph in the following ways: • Focus: The Glyph will only affect the first sentient being that triggers it. By empowering it with additional Mana the Focus can be doubled (as per the Focus Spell Element). • Damage: Each point of Mana invested does 1D8 per Caster Level. The Glyph remains until either triggered by someone, or the Mage takes an Action to retrieve their invested Mana, thus destroying the Glyph. Note: The Glyph is virtually invisible, only noticeable with a successful Notice Check at Extreme (18) Difficulty. As an Example, a 2nd Level Mage looking to invest 3 Mana can create a Glyph that will do 4D8 Damage with a doubled Focus radius.",
    },
    "Harm": {
      prerequisiteClass: "Mage",
      description: "You’ve a knack for adding a bit of damage to your magic. You can choose to add or remove Damage when casting a Spell from your Grimoire without it being a Spontaneous Spell. Damage added or removed requires a corresponding adjustment to the difficulty of the Spell.",
    },
    "Hasty Recharge": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Somehow, you have perfected the art of recharging your Runework as quickly as possible. You now recharge your Runework at a rate of twenty minutes per Effect recharged.",
    },
    "Master of Air": {
      prerequisiteClass: "Mage",
      description: "You are adept at the Arcane Art of Air. Any Spell you design that is composed exclusively with Air Effects has its Difficulty to cast reduced by one (-1).",
    },
    "Master of Cosmos": {
      prerequisiteClass: "Mage",
      description: "You are adept at the Arcane Art of Cosmos. Any Spell you design that is composed exclusively with Cosmos Effects has its Difficulty to cast reduced by one (-1).",
    },
    "Master of Earth": {
      prerequisiteClass: "Mage",
      description: "You are adept at the Arcane Art of Earth. Any Spell you design that is composed exclusively with Earth Effects has its Difficulty to cast reduced by one (-1).",
    },
    "Master of Fire": {
      prerequisiteClass: "Mage",
      description: "You are adept at the Arcane Art of Fire. Any Spell you design that is composed exclusively with Fire Effects has its Difficulty to cast reduced by one (-1).",
    },
    "Master of Water": {
      prerequisiteClass: "Mage",
      description: "You are adept at the Arcane Art of Water. Any Spell you design that is composed exclusively with Water Effects has its Difficulty to cast reduced by one (-1).",
    },
    "Memorized Spell": {
      prerequisiteClass: "Mage",
      description: "You have one Spell per positive Knowledge Modifier etched in your Memory. For example, a Mage with a Knowledge Modifier of +2 would have 2 Spells memorized. Mages with a zero or negative Knowledge Modifier gain no benefit from this Ability. You do not need your Grimoire to cast these memorized spells, and do not consider them as being Spontaneous Spells. 199 ATHIA –",
    },
    "Multitasker": {
      prerequisiteClass: "Mage",
      description: "You have a flair for maintaining numerous magical spells at once. You have one additional point (+1) of Mana. Note: This Ability may be taken multiple times.",
      canTakeMultiple: true,
    },
    "Mystic Leverage I": {
      prerequisiteClass: "Mage",
      description: "Tapping into Arcane energy grants measurable power, but at a cost. Mystic Leverage allows the mage to invest a portion of their Mana to gain advantage on a given task. By temporarily investing a point of the Mage’s available Mana they may gain Advantage on any single roll. This Mana will remain invested until the Mage rolls a Critical Success on any Check. Any number of Mana may be invested in this manner however a Critical Success on any Check only returns a single point at a time.",
    },
    "Mystic Leverage II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Mystic Leverage I"],
      description: "As Mystic Leverage I, but you may now also regain your invested Mana at a rate of 1 point per Worthwhile Rest.",
    },
    "Personal Immunity": {
      prerequisiteClass: "Mage",
      description: "You have always been able to resist your own magic. At any time, you can choose to be immune to your own Arcane Spells.",
    },
    "Powerful Magic": {
      prerequisiteClass: "Mage",
      description: "Your magic seems to affect even the hardiest of beings with ease. Your magic ignores all Damage Reduction, as well as Arcane Immunities the Target of your Spell may possess. 203 ATHIA –",
    },
    "Ravage I": {
      prerequisiteClass: "Mage",
      description: "Your Spells are particularly brutal. You add your Level to any Damage your Spell inflicts.",
    },
    "Ravage II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Ravage I"],
      description: "You have an uncanny lethality with your magic. You roll any spell Damage at Advantage. Note: Ravage I and Ravage II’s Abilities stack, allowing a Mage to roll their Damage at Advantage and add their Level to their Spell’s Damage.",
    },
    "Repeat Spell I": {
      prerequisiteClass: "Mage",
      description: "You are quick to adjust your magic to increase the probabilities of its success. Any time you cast a Spell successfully, if you attempt to cast that same spell again in the following Round the Difficulty to Cast that Spell is lowered by one (-1). Note: The effects of this Ability are cumulative with each successful casting. Once the Mage fails to cast the spell, the Difficulty for that Spell returns to normal. Likewise, should it be more than a Round between castings of the Spell the Difficulty for the Spell also returns to normal.",
    },
    "Repeat Spell II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Repeat Spell I"],
      description: "As Repeat Spell I, but the Mage no longer must be successful in casting the Spell to gain the benefits of its Difficulty decreasing by one (-1). Note: Should it be more than a Round between castings of the Spell the Difficulty for the Spell still returns to normal.",
    },
    "Rune Release": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "As a Free Action you can release your allocated Mana in a Runework without activating the Runework itself. The Runework is then considered to be no longer powered by Mana.",
    },
    "Runemaster I": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "You are adept at empowering your Runework. All efforts to imbue your Runework have their Difficulties reduced by one (-1).",
    },
    "Runemaster II": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runemaster I"],
      description: "As Runemaster I, but rather than reducing the Difficulties to imbue Runework by one (-1), you now reduce that Difficulty by two (-2). Additionally, when investing 208 Abilities Mana into Runework for additional uses, each point of Mana provides two additional uses.",
    },
    "Shorthand": {
      prerequisiteClass: "Mage",
      description: "You have a very condensed cypher all your own and can make a record that only you can decipher. Anyone else reading your Shorthand must make a Difficult Scholar Check to read it. Your Spells take up two less pages (each) to a minimum of one page in your Grimoire, and it takes you half the time to write a Spell.",
    },
    "Steady Runework": {
      prerequisiteClass: "Mage",
      prerequisiteAbilities: ["Runecrafter"],
      description: "Your Runework is exceedingly noteworthy, lasting, and capable. Any Runework you create that contains a Spell with a Concentration Duration succeeds on any Easy or Average Concentration Check (rather than just Easy Concentration Checks).",
    },
    "Sustained Arcana": {
      prerequisiteClass: "Mage",
      description: "Instead of sleeping, you can enter a meditative state, allowing you to maintain a Spell requiring one Mana while you gain a Worthwhile Rest.",
    },
    "Switch": {
      prerequisiteClass: "Mage",
      description: "With a bit of effort, you can change the focal point of your Spells. While maintaining a Concentration Duration Spell, as an Action, you can switch the Focus of that maintained Spell. Since this is an Action, this will elicit a Concentration Check at the next appropriate Difficulty (for this and any other maintained Spells the caster is concentrating on).",
    },
    "Ritual Magic": {
      prerequisiteClass: "Mage",
      description: "By drawing out Arcane circles of power, drawing runes on people or objects, burning incense, collecting blood of the sacrificed, or any number of other solemn and ceremonious acts, you can tie the ley lines of Arcane power to your ritual 207 ATHIA – rather than yourself. The Mage begins by casting a Spell of their choosing, and for every point of Mana invested in that Spell, the Caster must conduct their rite for four hours. Once complete, the Mana for the Spell no longer needs to be maintained by the Mage. Only one Spell can be cast with a Ritual at a time.",
    },
    "Wild Mage": {
      prerequisiteClass: "Mage",
      description: "You were born to create magic on a whim. Your Spontaneous Magic costs are reduced by two (-2).",
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
      description: "You’ve discovered a cunning use for your Mana. By investing one (1) point of your available Mana you can place an Arcane Mark upon a Target. This mark must be created by touching your Target, but once done you always have a sense of the Target’s direction and distance from you. You can remove this Arcane Mark at any time, as a Free Action, and return that invested Mana to your pool.",
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
      description: "Bladesman Bleed Table As Bladesman I, but rather than Level Bleed Damage doing 1 point of Bleeding to the 1-4 2 Target the degree of the Bleeding State bestowed is based upon the 5-7 3 Level of the Character possessing 8-10 4 this Ability as shown in the Bladesman Bleed Table. This effect will stack with each subsequent hit on any Target you have previously hit. Therefore, a 5th Level Character would bestow Bleed: 3 on a successful Hit against a Target. If that same Target is hit again, their Bleeding State would increase to Bleed: 6.",
    },
    "Block": {
      prerequisiteClass: "Rogue",
      description: "You have the skill to use your weapon against incoming attacks. As a Maneuver you can block an incoming attack, offering you Damage Reduction equal to onehalf your Level (Round up).",
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
      description: "Not only do you possess the Gods’ favor, but they are proactively looking out for you. You may spend one (1) Favor to reroll any one die. You must accept the result of the second roll.",
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
      description: "As Embolden I, but you can now grant your Hit bonus to all allies within earshot. 187 ATHIA –",
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
      description: "You are exceptionally fast. Increase your Base Move by +10’ per turn.",
    },
    "Focused Fighting": {
      prerequisiteClass: "Rogue",
      description: "The longer you square off with your opponent the more you become aware of how to counter their fighting style. If all your Attacks are made against the same Target, each subsequent Round you find it easier to connect with them. Beginning with the second Round their Defense lowers by one (-1). Each following Round that you remain solely focused on this Target their Defense continues to lower by one. For example, if focused on the same Target for a fourth Round, their Defense would be lowered by three (-3). The Target’s Defense is only lowered for you.",
    },
    "Force Strike I": {
      prerequisiteClass: "Rogue",
      description: "You can focus and release your inner energy as a ranged attack on your enemies. Force Strike does Damage equal to your Base Strength Damage and has a Range of 10’ per level. Your Force Strike is considered a weapon for the purposes of applying other Abilities.",
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
      description: "Sometimes it is better to be lucky than good. Your natural 1’s on any Check are also considered Critical Successes.",
    },
    "Hamstring": {
      prerequisiteClass: "Rogue",
      description: "Once per Encounter you can make an attack focused on impeding, slowing, or otherwise forcing your opponent to become less effective in their defense. Your Target’s Defense is reduced by half your level following your successful attack (round up). This penalty lasts until the target is healed but does not stack with each successful attack.",
    },
    "Hard Target I": {
      prerequisiteClass: "Rogue",
      description: "You’ve always been a difficult opponent. As a Free Action you can choose to avoid any one Attack made against you in a Round. This Ability may be used once per Encounter.",
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
      description: "As Harrier I, but rather than gaining Advantage on your second Round of Checks you now gain Advantage on your Checks against your surprised enemy for the remainder of the Encounter. 193 ATHIA –",
    },
    "Inspire Success": {
      prerequisiteClass: "Rogue",
      description: "Encouraging words are your specialty. As a Free Action you can inspire a nearby ally to grant them Advantage on their next Talent Check, once per Day.",
    },
    "Jack of All Trades": {
      prerequisiteClass: "Rogue",
      description: "It is true, you do know a little about everything. You can make any Untrained Talent Check without suffering Disadvantage.",
    },
    "Knockout Artist": {
      prerequisiteClass: "Rogue",
      description: "You have become rather skilled at landing blows in just the right places to take your opponents down. You consider yourself two Levels higher than you are when expending Stamina to attempt to bestow the Unconscious State to an opponent. For Example, a Level 4 Rogue attempting to spend Stamina to bestow the Unconscious State to a Fomor (Challenge Level 5) would pay 10 Stamina instead of 11, as they would consider themselves Level 6 with the Knockout Artist Ability.",
    },
    "Learn From Mistakes": {
      prerequisiteClass: "Rogue",
      description: "Sometimes failures can provide a great deal of insight. Once per Day you may make a second attempt immediately following any Failed Check without needing to await changes to the situation, environment, or the passing of adequate time. In addition, you gain a bonus of +2 on your second attempt.",
    },
    "My Weapon": {
      prerequisiteClass: "Rogue",
      description: "When wielding a chosen weapon your character possesses, Stamina costs are reduced by one (-1), to a minimum of 1. Thus, if a Rogue needed a result of 18 to hit a creature and has a score of 15, the Rogue would only need to expend 2 Stamina to succeed in hitting their target (when it would have otherwise cost the Rogue 3 Stamina to increase their Hit check by 3 points). Should your character lose their weapon of choice, they will need two weeks with a replacement to regain the use of this ability for their new weapon.",
    },
    "Obscure Knowledge": {
      prerequisiteClass: "Rogue",
      description: "You have an uncanny knack for pulling information out of the blue. You can make a Knowledge Check (Difficulty to be determined by the GM) to recall a worthwhile, and perhaps surprising piece of information that pertains to your character’s current situation.",
    },
    "Performer": {
      prerequisiteClass: "Rogue",
      description: "If you have an opportunity to play or act before others, you gain Advantage on any Charisma, Discipline, or Faith Checks for the duration of the scene/encounter. Additionally, while performing, you have drawn the attention of those around you such that anyone else in the scene/encounter gains Advantage on any Stealth or Thievery Checks.",
    },
    "Poison Master": {
      prerequisiteClass: "Rogue",
      description: "Your use of toxins is unmatched. Your poisons do twice (x2) as much Damage per round to your Targets.",
    },
    "Purposeful": {
      prerequisiteClass: "Rogue",
      description: "You have always stuck to your goals in life, and that focus has granted you wonderful benefits. You gain one additional Rogue Specialty.",
    },
    "Precise I": {
      prerequisiteClass: "Rogue",
      description: "Your most precise attacks are your most deadly. If you are successful with a Hit Check against your target and beat their Defense by five (5) or more (before any Stamina expenditures), you deal maximum Damage for the weapon (no need to roll Damage, for example a medium weapon would do 6 instead of 1d6) against the Target.",
    },
    "Precise II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Precise I"],
      description: "As Precise I, but you also gain Advantage in the next Round on your next Hit Check made against the same target.",
    },
    "Pugilist I": {
      prerequisiteClass: "Rogue",
      description: "You can use your body as a weapon. Your limbs are considered light weapons and gain weapon Damage of +1d4.",
    },
    "Pugilist II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Pugilist I"],
      description: "As Pugilist I, but Damage from your limbs is now +1d6 instead of the previous +1d4.",
    },
    "Ready And Waiting": {
      prerequisiteClass: "Rogue",
      description: "With a little head’s up and preparation, you can have a surprise ready. You may perform any single Action as a Free Action once per Day.",
    },
    "Redirection I": {
      prerequisiteClass: "Rogue",
      description: "By using your enemy's strength, power, and momentum against them you can see that their efforts to harm you come at a cost. Once per Round, when successfully attacked, impart your Level in Damage to your opponent. This Redirection does not reduce the amount of Damage you take.",
    },
    "Redirection II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Redirection I"],
      description: "As Redirection I, but you may either impart your Level in Damage to your Opponent or do half the Damage you take from their attack back to them, whichever is greater. This Redirection does not reduce the amount of Damage you take.",
    },
    "Sharpshooter I": {
      prerequisiteClass: "Rogue",
      description: "Under the right circumstances, you can place your shots preciously where you want them. Your Hit Checks with a Ranged or Hurled weapon against stationary Targets are made at Advantage.",
    },
    "Sharpshooter II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Sharpshooter I"],
      description: "Your shots with any Ranged or Hurled weapon automatically hit any object (not living Targets) within Range. For example, you can shoot the rope your friend is hanging from, shoot a lantern on a table to burst it into flame, or shoot the rigging on a boat to drop the sail.",
    },
    "Steady Aim I": {
      prerequisiteClass: "Rogue",
      description: "You aim small and miss small. You no longer suffer Disadvantage with Ranged or Hurled weapons when firing at a Target engaged in melee.",
    },
    "Steady Aim II": {
      prerequisiteClass: "Rogue",
      prerequisiteAbilities: ["Steady Aim I"],
      description: "Each Round you spend aiming with a Ranged weapon you increase your Critical range by 2. For example, with a round of aiming you would roll a Critical result on a roll of 18, 19, or 20. With two rounds of aiming, your threshold for a Critical would be 16+ (16, 17, 18, 19, & 20). You can aim for a number of rounds equal to your level.",
    },
    "Stunning Strike": {
      prerequisiteClass: "Rogue",
      description: "You can make a melee attack to Stun your opponent. Once per Encounter, if you make a successful attack against an opponent, you give them the Stunned State (see States in the Combat section for further information).",
    },
    "Tumbler": {
      prerequisiteClass: "Rogue",
      description: "You have developed a skill for getting around your enemies. As a Maneuver you may attempt an Athletics Check against a Difficulty equal to the Defense of your Target. This Athletics Check is considered a Free Action, and part of your Maneuver. If successful, you dive, roll, or dash around them. If you use your subsequent Action to perform an Attack against the Target, you make your Hit Check at Advantage.",
    },
    "Willful Focus": {
      prerequisiteClass: "Rogue",
      description: "When the chips are down you have always been able to come through. Once per day you can spend any Stamina you possess to increase the result of a Talent Check by the number of Stamina spent.",
    },
  },

  warrior: {
    "Armor Adept": {
      prerequisiteClass: "Warrior",
      description: "You know how to get the most out of your armor. Your armor’s Defense Value is increased by one (+1). 169 ATHIA –",
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
      description: "If given just a moment, you’re able to rebound in combat. Once per encounter, if you have not been targeted in a Round (no attacks attempted upon you), you recover 1d4 plus your Level in Stamina.",
    },
    "Brutal I": {
      prerequisiteClass: "Warrior",
      description: "You are a vicious opponent. You add your Level to all Damage rolls made. Note: This bonus is applied in addition to a Warrior’s normal Damage bonus for his Class and is not applied to Arcane or Divine Damage.",
    },
    "Brutal II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Brutal I"],
      description: "In your hands, weapons are far deadlier. You gain additional abilities depending on the Size of the weapon you are using. See the Brutal II Table for details. 175 ATHIA – Brutal II Table Weapon Size Light Medium Heavy Brutal II Advantage Gain one additional attack with your Light weapon per Round Your weapon does +3d6 Damage instead of the usual +1d6 Your Targets must make an Easy (9) Endurance Check or be knocked Prone with each attack.",
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
      description: "You recover in battle faster than most. On a successful Recuperation Check you gain an additional number of Stamina equal to your Level (not to exceed your 180 Abilities maximum Stamina). On a failed Recuperation Check you regain ½ your Level (rounded down).",
    },
    "Counter Strike I": {
      prerequisiteClass: "Warrior",
      description: "You capitalize on your opponent’s mistakes. When an opponent misses you on a Hit Check, they take one (1) point of Damage as you make them pay for their error.",
    },
    "Counter Strike II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Counter Strike I"],
      description: "As Counter Strike I, but now your opponent takes Damage equal to your Level. 181 ATHIA –",
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
      description: "You are harder to deal with when you’ve planted yourself. As a maneuver you may increase your Defense by one (+1) so long as you do not move. Should you move your Defense returns to its normal Score.",
    },
    "Hold the Line II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Hold the Line I"],
      description: "As Hold the Line I, but rather than your Defense increasing by one (+1) your Defense now increases by three (+3) until you move.",
    },
    "Improved Critical I": {
      prerequisiteClass: "Warrior",
      description: "Your skill at precision is legendary. You score a Critical Hit on a 19 and 20.",
    },
    "Improved Critical II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Improved Critical I"],
      description: "As Improved Critical I, but you score a Critical Hit on an 18, 19 or 20.",
    },
    "King's Code": {
      prerequisiteClass: "Warrior",
      description: "You strive to hold yourself to the ideals of your land's Great King. Each of the progenitors of the Great Houses had defining characteristics that have since become a code of Four Great Pillars. Those codes for each of the Great King’s are listed below. Any Warrior that takes the King’s Code endeavors to hold to their Great King’s Four Great Pillars. In doing so, they gain two distinct benefits. First, they gain the benefit of Advantage on all Checks during social interactions with members of their Code’s corresponding House. Additionally, once per Encounter, as a Free Action, the Warrior can negate or otherwise ignore the effects of an Enemy’s Special Ability for that Round. The following is a list of the King’s Code for each of the Great Kings: King’s Code Table House (King) 196 Code Asos • Knowledge is power • Be vigilant • Help those seeking to help themselves • Pass on what you have learned Cerrak • Your word is your worth • Never tolerate failures and cheats • Reveal your assets last • Respect those above you Blayth • Serve the True Gods • Maintain integrity • Exercise compassion Abilities House (King) Code • Always preserve your loyalties Draur • Reason over emotion • Always have a plan • Protect those you serve • Pleasure only when void of responsibility Lloar • Victory above all • Be underestimated • Own your responsibility • Never give in to apathy Thercer • Serve • Aid those in need • Do your duty • Speak the truth Onin • Foremost is family • Don’t let words get in the way of action • Survive to fight on • Strength in war, wisdom in peace",
    },
    "Maniacal": {
      prerequisiteClass: "Warrior",
      description: "You are fueled by the taste of battle; the worse things get the greater your capability. The first time you take Damage in an Encounter you immediately gain two bonus Stamina (+2). When you first enter your Battered Tier, you gain five bonus Stamina (+5). When you first enter the Injured Tier, you gain ten bonus Stamina (+10). If unspent, this bonus Stamina is lost at the end of the Encounter. Additionally, if healed in battle you cannot regain these bonuses as they are only applied the first time you enter a Health Tier.",
    },
    "Marksman": {
      prerequisiteClass: "Warrior",
      description: "You always hit your target. Each round you spend aiming, you gain a bonus of one (+1) to your next Hit Check (up to a three turn/+3 maximum).",
    },
    "Mounted Archer": {
      prerequisiteClass: "Warrior",
      description: "Firing from the back of a moving beast is something you have trained extensively at. You suffer no penalties for making ranged attacks from the back of a mount.",
    },
    "Mounted Assault": {
      prerequisiteClass: "Warrior",
      description: "You have the knack of using your mount’s momentum to deliver the most devastating of blows. You do double (x2) Damage from your mount.",
    },
    "Mounted Combatant": {
      prerequisiteClass: "Warrior",
      description: "You can always position your mount out of harm’s way. With a successful Difficult (15) Taming Talent Check you can negate any successful attack against your mount. This Check is made as a Free Action.",
    },
    "Opportunist": {
      prerequisiteClass: "Warrior",
      description: "You are skilled at turning anything into a weapon. Your Improvised Weapons do full Damage rather than reduced Damage, and any Ability that applies to an unspecified weapon applies to your Improvised Weapon.",
    },
    "Pelter": {
      prerequisiteClass: "Warrior",
      description: "Your throws are incredible, and always on target. Weapons with the Hurled Designation have a base range of 100’ in your hands. Additionally, you gain Advantage on Hit Checks when throwing any Hurled weapon at Targets within 20’.",
    },
    "Quick Draw": {
      prerequisiteClass: "Warrior",
      description: "You are fast on the draw. You can draw and ready a weapon as a Free Action, and if armed when Surprised, may act in any Surprise Round.",
    },
    "Roar": {
      prerequisiteClass: "Warrior",
      description: "With a harrowing scream you cower or surprise your opponent just long enough for you and your Allies to gain Advantage on their Hit Checks for the round. Roar is considered a Free Action. This Ability may only be used once per Encounter.",
    },
    "Ruthless I": {
      prerequisiteClass: "Warrior",
      description: "Your consecutive hits on a Target become more and more lethal. When you successfully Hit a Target for a consecutive time you add half your Level (round up) to your Damage. This Ability stacks upon itself, for example, a 5th level Warrior with this Ability hitting a Target for the second time would do +3 Damage. Hitting the target for a third time would do +6 Damage, etc. Should at any time you miss your Target, you must start the process over.",
    },
    "Ruthless II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Ruthless I"],
      description: "As Ruthless I, but rather than doing half your Level in additional Damage, you now do your Level in additional Damage. This Ability stacks upon itself, for example, a 5th level Warrior with this Ability hitting a Target for the second time would do +5 Damage. Hitting the target for a third time would do +10 Damage, etc. Should at any point you miss your Target, you must start the process over.",
    },
    "Sacrifice": {
      prerequisiteClass: "Warrior",
      description: "By spending less effort looking after your own welfare you can better expend that energy on your enemies. You may lower your Defense for an Encounter to gain additional Stamina. Each point of Defense you lower grants you 3 temporary Stamina. Note: This temporary Stamina may increase your overall Stamina beyond its maximum. This Ability may be used multiple times in an Encounter.",
    },
    "Shield Fighter": {
      prerequisiteClass: "Warrior",
      description: "You have always trained that a shield is as much a weapon as it is a means to stop them. Your shield has a base Damage of +1d6 and is considered a Light weapon for your off-hand.",
    },
    "Shield Mastery": {
      prerequisiteClass: "Warrior",
      description: "No one knows how to better use a shield than you. Rather than a shield offering a Damage Reduction (DR) equal to the level of the wielder, a shield in your hand offers a Damage Reduction score of 2+ your level.",
    },
    "Slam": {
      prerequisiteClass: "Warrior",
      description: "With a concussive strike on the ceiling, floor, or even one’s shield you can stun your opponents. Once per Encounter you may take an Action to slam a weapon with the Crush Designation into the ground, wall, etc. to bestow the Stunned State to all within a 10’ radius. Note: This Ability affects all within the 10’ radius save for the character enacting this Ability.",
    },
    "Swift Reload": {
      prerequisiteClass: "Warrior",
      description: "You have a talent for keeping your crossbow bolts flying. You can expend a Maneuver in place of one of your Actions to reload a crossbow. The following is a breakdown of the Swift Reload Ability as it pertains to each crossbow type: Swift Reload Table Crossbow Type Crossbow Heavy Crossbow Regular Reload 1 Action 2 Actions With Swift Reload 1 Maneuver 1 Action & 1 Maneuver 213 ATHIA –",
    },
    "Taunt": {
      prerequisiteClass: "Warrior",
      description: "You have a knack for getting attention in battle. Once per Encounter, as a Free Action, you force your Target to face off against you for the remainder of the Encounter. This Ability works so long as your Target can engage you.",
    },
    "Thrill of Victory I": {
      prerequisiteClass: "Warrior",
      description: "You feel a rush every time one of your enemies is slain. You regain expended Stamina equal to one-half your Level (round down) every time you kill an enemy. Note: you cannot gain more than your maximum Stamina with this Ability.",
    },
    "Thrill of Victory II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Thrill of Victory I"],
      description: "As Thrill Of Victory I, but rather than regaining Stamina equal to one-half your Level, you now regain Stamina equal to your Level every time you kill an enemy. Note: You cannot gain more than your maximum Stamina with this Ability.",
    },
    "Trample": {
      prerequisiteClass: "Warrior",
      description: "You use your mount as a weapon. If you make a successful attack against an opponent while mounted you do Damage as normal, but your mount rolls for Damage to the Target as well. The Target is also knocked Prone.",
    },
    "Undying": {
      prerequisiteClass: "Warrior",
      description: "You are nearly impossible to put down. Whenever successful on a Fighting On When Down (see the Endurance Talent) Check, you immediately recover one (1) point of Injury. Additionally, for the first Round you are back on your feet, you do not suffer Disadvantage for being Injured. With the Undying Ability it is possible, each time you are knocked into Down, to make this Fighting On When Down Check to keep going and going.",
    },
    "Utilitarian": {
      prerequisiteClass: "Warrior",
      description: "Some weapons provide you more to work with than others. Any weapon you use with the lengthy Designation is considered to have the Wieldy Designation as well.",
    },
    "Valiant": {
      prerequisiteClass: "Warrior",
      description: "Your courage in combat is your greatest shield. As a Free Action, you can reduce the damage you take from a single attack by half. You can do this a number of times per day equal to your Daring.",
    },
    "Weapon Master I": {
      prerequisiteClass: "Warrior",
      description: "Your preference has led you to mastery over a collection of weapons. Choose a type of weapon (blades, axes, bows, etc.). You now reroll any natural 1 result on all Damage with that weapon type.",
    },
    "Weapon Master II": {
      prerequisiteClass: "Warrior",
      prerequisiteAbilities: ["Weapon Master I"],
      description: "As Weapon Master I, but you now reroll any natural 1 or 2 results on all Damage with that weapon type.",
    },
  },

  general: {
    "Ambidextrous": {
      description: "You can use either hand equally. What you can do with one, you can do with the other. Additionally, your Stamina costs to make Off-Hand Attacks with Light or Medium weapons are reduced by one (-1).",
    },
    "Arcane Conduit": {
      description: "You have a great knack for tapping into the Arcane aether. You gain one (+1) additional Mana. Note: This Ability does not grant any benefits to one’s Arcane Aptitude.",
    },
    "Arcane Prowess": {
      description: "Your understanding of Arcane magic is better than most. You gain two (+2) additional Arcane Aptitude. Note: This Ability does not grant any benefit to a Character’s Mana.",
    },
    "Battle Tested": {
      description: "You have faced death on more occasions than you can count. You gain one (+1) additional Daring.",
    },
    "Blessed I": {
      description: "You possess the ability to enact Divine Interventions. You gain two (2) Favor plus any Instincts Modifier you may possess. You may pick any Divine Intervention Effect from any Divine Influence. You are limited in enacting only that one Divine Intervention Effect. Your Holy Aura is 5’ radius per level as opposed to the normal 10’ radius per level for an Acolyte. Additionally, your Caster Level is considered 1 173 ATHIA – level less than your character level (to a minimum of 1). Finally, you recover your Favor through Prayer just as any Character with Favor would (see Prayer for further information).",
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
      description: "You’ve managed to get some hands-on time with the most basic of weapons. You are now considered trained in all Common weapons. Note: All Acolytes, Rogues, and Warriors already possess this level of Training.",
    },
    "Connections": {
      description: "You’ve made a great number of friends and acquaintances, and always seem to know just who to ask to get what you need. Finding someone that can sell stolen goods or arrange travel, finding a place to stay, or finding unique equipment always seems well within your capability.",
    },
    "Cross-Trained": {
      description: "Selecting this Ability allows you to immediately select an Ability from any other Class’s list of Abilities. For example, selecting the Cross-Trained Ability and choosing the Warrior’s Born In Armor Ability would give you the Ability: CrossTrained: Born in Armor as a single Ability choice.",
    },
    "Disease Resistant": {
      description: "You have a highly developed immune system. You are immune to all forms of disease.",
    },
    "Eidetic Memory": {
      description: "You have always possessed a powerful memory. You can recall everything you have personally experienced in life. Books you’ve read, conversations you’ve had, or even things you’ve seen can all be summoned forth from your memory.",
    },
    "Fated": {
      description: "Characters with this Ability roll three d20’s. These dice are set aside and kept through a session. Each die may be used in place of rolling a Check, and each die must be used through the course of the session. If a die is unused by the end of the session, this Ability may not be used in the next game session (though it may again in the session following). 189 ATHIA –",
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
      description: "You possess your god’s divine sanction. Gain two (+2) additional Favor.",
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
      description: "Rather than relying on raw motor skills to put arrows or bolts on target, you instead rely on instinct to place your shots. Choose any one Ranged weapon. You may substitute your Instincts Modifier for your Dexterity Modifier when making a Hit Check with that weapon.",
    },
    "Light Armor Training": {
      description: "You have trained in the simplest of armors. You are considered trained in Light Armor. Note: All Acolytes, Rogues, and Warriors already possess this level of training.",
    },
    "Light-Footed": {
      description: "You have a very light step. By chance or skill, you do not set off traps simply by stepping or passing over them.",
    },
    "Martial Weapon Training": {
      prerequisiteAbilities: ["Common Weapon Training"],
      description: "You are trained in the weapons of war. You are now considered trained in all Martial weapons. Note: All Warriors already possess this level of training.",
    },
    "Medium Armor Training": {
      prerequisiteAbilities: ["Light Armor Training"],
      description: "You have had training in some of the more capable armors. You are considered trained in Medium Armor. Note: All Acolytes and Warriors already possess this level of training.",
    },
    "Merciless": {
      description: "When you catch your enemies off guard it is to devastating effect. When you score a Critical Hit, you do an additional 1D20 Damage.",
    },
    "Mercurial": {
      description: "You have a light touch, a light foot, and fine motor skills. You have always been able to keep your legs under you and your hands steady. You gain a bonus of +1 to your Dexterity Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Mighty": {
      description: "You are powerful, capable, and have pulled through the toughest of circumstances on raw strength alone. Your might has always made right. You gain a bonus of +1 to your Strength Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Mystical I": {
      description: "You possess the ability to cast Arcane Spells. You gain one (1) Mana, and one (1) point of Arcane Aptitude. You may pick any Arcane Effect from any Arcane Art. You are limited in casting only that one Arcane Art Effect. The first time this Ability is selected you gain a bonus to your Mana equal to your Strength Modifier. Lastly, your Caster Level is considered 1 level less than your character level (to a minimum of 1).",
      restrictions: "Non-Mage, Non-Rogue",
    },
    "Mystical II": {
      prerequisiteAbilities: ["Mystical I"],
      description: "As Mystical I, but you now gain two (+2) additional Arcane Effects from the same Arcane Art as Mystical I (for a total of 3). You also gain an additional one (+1) Arcane Aptitude. 201 ATHIA –",
    },
    "Mystical III": {
      prerequisiteAbilities: ["Mystical II"],
      description: "As Mystical II, but you now have access to all the Effects from your chosen Arcane Art. You also gain an additional one (+1) Arcane Aptitude, and one (+1) additional Mana.",
    },
    "Nature's Blessing": {
      description: "The animals of Athia see you as one of their own. All creatures of the Beast Family consider you non-threatening but if otherwise provoked will still defend themselves, their families, and their territories.",
    },
    "Poison Immunity": {
      description: "Your system can break down venoms and toxins at an alarming rate. You automatically succeed on any Endurance Checks to overcome poison.",
    },
    "Predisposed": {
      description: "You are always aware of the things going on around you and have always trusted your gut. Your inclinations have been honed over many years and experiences. You gain a bonus of +1 to your Instincts Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
    "Purebred": {
      description: "Selecting this Ability allows you to immediately select an additional Racial Perk from your Character’s Race. For example, selecting the Purebred Ability and choosing the Dwarf’s Dark-Born Perk would give you the Ability Purebred: DarkBorn as a single Ability choice.",
    },
    "Qualified": {
      description: "You have had a rather exclusive bit of weapons training. You may pick any one weapon from any weapon category. You are considered trained with that one weapon.",
    },
    "Quick Healer": {
      description: "You have always recovered quickly from your wounds. You heal an additional +1d4 Injuries with each Worthwhile Rest, and you gain twice the healing effect from any magical means of healing.",
    },
    "Reduced Sleep": {
      description: "You have always been able to get a good night’s sleep faster than average. You only need four (4) hours of sleep for a Worthwhile Rest rather than the usual eight (8) hours sleep.",
    },
    "Renowned": {
      description: "You are one of station, have descended from a heroic or noble line, or perhaps simply hail from money. By name or position those around you seek to aid you in whatever fashion they can. Food and lodging, supplies, information, aid and assistance, and even finances equal to ten (10) silver septems per Level are unobjectionable. You begin the game with 50 extra silver septems and have a stipend of 1 silver septem per day.",
    },
    "Robust": {
      description: "You have far more in the tank than most. Gain one (+1) Stamina per Level.",
    },
    "Runecrafter": {
      description: "You know the ancient art of runecarving. You may create Runework to imbue your magic into various items. See Runework in the Magic section for further details.",
    },
    "Shield Training": {
      description: "You have spent some time behind a shield. You are considered trained with shields. Note: All Acolytes and Warriors already possess this level of training.",
    },
    "Shield Guard I": {
      prerequisiteAbilities: ["Shield Training"],
      description: "With effort you can bury the better part of your exposed body behind your shield to withstand nearly any attack. You may cancel your Action to cancel any one successful Attack made against you in a Round.",
    },
    "Shield Guard II": {
      prerequisiteAbilities: ["Shield Guard I"],
      description: "Your shield use is so skilled your opponents have a difficult time connecting with you in battle. When using a shield your Stamina Defense Modifiers are as follows: Shield Guard II Defense Modifiers Stamina Cost 1 5 10 Effect Decrease the amount of Damage received by two (2) points Cancel a single physical Attack made against you in a Round Cancel all physical Attacks made against you in a Round",
    },
    "Skilled": {
      description: "One way or another you have managed to learn a bit more than those around you. Gain four (4) additional Talent Points. Note: This Ability may be taken multiple times.",
      canTakeMultiple: true,
    },
    "Specialty Weapon Training": {
      prerequisiteAbilities: ["Martial Weapon Training"],
      description: "You have had some training with more exotic weapons. You are now considered trained in all Specialty weapons.",
    },
    "Sure-Footed": {
      description: "Once you have rooted yourself to the ground you are unshakable. You cannot be given the Lame or Prone State.",
    },
    "Thick Skull": {
      description: "You are extremely hard-headed. You are immune to the Stunned State or attempts to knock you Unconscious. Additionally, once per Encounter, as an Action, you can headbutt an enemy to give them the Stunned State.",
    },
    "Tireless": {
      description: "You do not get tired in battle. Gain one (+1) additional Fatigued point per Level.",
    },
    "Tough": {
      description: "You are not injured easily. Gain one (+1) additional Battered point per Level.",
    },
    "Unbreakable": {
      description: "Despite your enemy’s best efforts, you cannot be killed easily. Characters with this Ability gain one (+1) additional Injured point per Level.",
    },
    "Unremarkable": {
      description: "You have a rather non-descript face, are very common looking, or are otherwise unassuming. Using this to your advantage, you are often overlooked and rarely remembered. You are easily lost in a crowd and details of your description are often vague at best.",
    },
    "Untouchable": {
      description: "Be it a sixth sense for danger, a knack for dodging out of the way, or perhaps even a very tough hide you are less subject to acts of violence. With this Ability your Defense increases by one (+1). 215 ATHIA –",
    },
    "Wizened": {
      description: "You have a constant thirst for learning and are one who truly believes that knowledge is power. Your mind is your greatest asset. You gain a bonus of +1 to your Knowledge Attribute. This bonus cannot raise your Attribute beyond its maximum.",
    },
  },
};
