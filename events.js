const EVENT_DB = [
    // --- EARLY GAME ---
    {
        "id": "E_EARLY_01",
        "stage": "early",
        "title": "Lost Child",
        "description": "A frightened child wanders into the lot alone, asking for help and a place to sleep.",
        "choices": [
            { "text": "Take them in and feed them", "effect": { "food": -2, "morale": 4, "survivors": 1 } },
            { "text": "Give them supplies and directions away", "effect": { "food": -1, "morale": 1 } },
            { "text": "Turn them away", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "E_EARLY_02",
        "stage": "early",
        "title": "Mysterious Crate",
        "description": "A sealed shipping crate sits behind a storefront, dented and banded shut.",
        "choices": [
            { "text": "Pry it open carefully", "effect": { "scrap": 2, "food": 1 } },
            { "text": "Smash it open fast", "effect": { "scrap": 3, "injured": 1, "morale": -1 } },
            { "text": "Leave it alone", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_03",
        "stage": "early",
        "title": "Old Mall Map",
        "description": "A faded directory map is found with handwritten notes in the margins.",
        "choices": [
            { "text": "Follow the notes to a marked spot", "effect": { "scrap": 2 } },
            { "text": "Post it publicly for everyone to see", "effect": { "morale": 2 } },
            { "text": "Ignore it", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_04",
        "stage": "early",
        "title": "Stray Dog",
        "description": "A thin dog lingers near the lot, watching the colony but keeping distance.",
        "choices": [
            { "text": "Offer food and let it stay nearby", "effect": { "food": -1, "morale": 3 } },
            { "text": "Try to shoo it away", "effect": { "morale": -2 } },
            { "text": "Set aside scraps and keep distance", "effect": { "morale": 1 } }
        ]
    },
    {
        "id": "E_EARLY_05",
        "stage": "early",
        "title": "Abandoned Campfire",
        "description": "Fresh ashes and footprints suggest someone camped nearby very recently.",
        "choices": [
            { "text": "Send a small party to investigate", "effect": { "scrap": 1, "morale": 1 } },
            { "text": "Fortify and stay quiet", "effect": { "scrap": -1, "morale": 2 } },
            { "text": "Ignore it and continue work", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_06",
        "stage": "early",
        "title": "Broken Storefront Alarm",
        "description": "An old security alarm suddenly blares from a darkened outlet, echoing across the lot.",
        "choices": [
            { "text": "Shut it off immediately", "effect": { "morale": 1 } },
            { "text": "Loot while it’s blaring", "effect": { "scrap": 2, "morale": -2 } },
            { "text": "Avoid the area for now", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_07",
        "stage": "early",
        "title": "Collapsed Awning",
        "description": "A rusted awning collapses near the walkway, barely missing someone.",
        "choices": [
            { "text": "Salvage it for materials", "effect": { "scrap": 2 } },
            { "text": "Clear it safely and move on", "effect": { "morale": 1 } },
            { "text": "Argue about blame and waste the day", "effect": { "morale": -2 } }
        ]
    },
    {
        "id": "E_EARLY_08",
        "stage": "early",
        "title": "Unmarked Van",
        "description": "An unlocked delivery van sits behind a closed store, untouched and silent.",
        "choices": [
            { "text": "Search it methodically", "effect": { "food": 1, "water": 1 } },
            { "text": "Strip it for parts", "effect": { "scrap": 3 } },
            { "text": "Leave it alone—feels wrong", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_09",
        "stage": "early",
        "title": "Raccoon Raid",
        "description": "Overnight, raccoons have been prying into unsecured food bins and leaving a mess.",
        "choices": [
            { "text": "Secure the bins and clean up", "effect": { "scrap": -1, "morale": 1 } },
            { "text": "Chase them off aggressively", "effect": { "morale": -2 } },
            { "text": "Leave it for now and accept losses", "effect": { "food": -1, "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_10",
        "stage": "early",
        "title": "Geese on the Lot",
        "description": "A flock of geese has claimed a section of the parking lot and hisses at anyone who approaches.",
        "choices": [
            { "text": "Route around them and stay calm", "effect": { "morale": 1 } },
            { "text": "Drive them off with noise and thrown debris", "effect": { "injured": 1, "morale": -1 } },
            { "text": "Offer them scraps to move them along", "effect": { "food": -1, "morale": 2 } }
        ]
    },
    {
        "id": "E_EARLY_11",
        "stage": "early",
        "title": "Venomous Snake in Storage",
        "description": "A venomous snake is discovered coiled in a warm supply crate near sleeping areas.",
        "choices": [
            { "text": "Carefully trap and relocate it", "effect": { "morale": 2 } },
            { "text": "Kill it to be safe", "effect": { "morale": -2 } },
            { "text": "Panic and scatter the supplies", "effect": { "injured": 1, "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_12",
        "stage": "early",
        "title": "Deer at Dusk",
        "description": "A deer wanders into the lot at sunset, grazing near the storefronts.",
        "choices": [
            { "text": "Hunt it for meat", "effect": { "food": 3, "morale": -2 } },
            { "text": "Try to guide it away quietly", "effect": { "morale": 2 } },
            { "text": "Leave it alone and watch it pass", "effect": { "morale": 1 } }
        ]
    },
    {
        "id": "E_EARLY_13",
        "stage": "early",
        "title": "Bees in the Signage",
        "description": "Bees have built a hive inside a hollow store sign near a common walkway.",
        "choices": [
            { "text": "Relocate the hive carefully", "effect": { "morale": 2 } },
            { "text": "Smoke them out and remove it", "effect": { "injured": 1, "morale": -1 } },
            { "text": "Avoid the area and post warnings", "effect": { "morale": 1 } }
        ]
    },
    {
        "id": "E_EARLY_14",
        "stage": "early",
        "title": "The Old Woman with a Cart",
        "description": "An elderly woman pushes a shopping cart of mixed goods, quietly asking if anyone wants to trade.",
        "choices": [
            { "text": "Trade fairly and kindly", "effect": { "food": -1, "water": -1, "scrap": 1, "morale": 3 } },
            { "text": "Haggle hard for advantage", "effect": { "scrap": 2, "morale": -2 } },
            { "text": "Decline and let her pass", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "E_EARLY_15",
        "stage": "early",
        "title": "Retired Couple’s Trade Stop",
        "description": "An older couple waves from a parked sedan, offering to trade before moving on.",
        "choices": [
            { "text": "Trade and ask for advice", "effect": { "food": -1, "scrap": 1, "morale": 2 } },
            { "text": "Trade quickly and send them off", "effect": { "scrap": 2, "morale": -1 } },
            { "text": "Refuse to trade at all", "effect": { "morale": -2 } }
        ]
    },
    {
        "id": "E_EARLY_16",
        "stage": "early",
        "title": "Silent Teen Trader",
        "description": "A teenage girl waits near a storefront with a handwritten sign listing what she’ll trade for.",
        "choices": [
            { "text": "Offer a fair trade and a meal", "effect": { "food": -1, "medical": 1, "morale": 2 } },
            { "text": "Trade only and keep distance", "effect": { "medical": 1, "morale": -1 } },
            { "text": "Refuse and chase her off", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "E_EARLY_17",
        "stage": "early",
        "title": "Argument Over Rations",
        "description": "Two survivors get into a shouting match over how food is being distributed.",
        "choices": [
            { "text": "Publicly set clear ration rules", "effect": { "morale": 2 } },
            { "text": "Side with one person to end it quickly", "effect": { "morale": -2 } },
            { "text": "Ignore it and let it burn out", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "E_EARLY_18",
        "stage": "early",
        "title": "Tool Theft Accusation",
        "description": "A survivor claims someone stole their scavenging tools during the night.",
        "choices": [
            { "text": "Investigate and return tools if found", "effect": { "morale": 2 } },
            { "text": "Replace the tools from supplies", "effect": { "scrap": -1, "morale": 1 } },
            { "text": "Dismiss it as drama", "effect": { "morale": -2 } }
        ]
    },
    {
        "id": "E_EARLY_19",
        "stage": "early",
        "title": "Refusal to Work",
        "description": "One survivor openly refuses their assignment, saying it’s unfair and pointless.",
        "choices": [
            { "text": "Reassign tasks and de-escalate", "effect": { "morale": 1 } },
            { "text": "Make an example and threaten punishment", "effect": { "morale": -3 } },
            { "text": "Let them rest today to cool off", "effect": { "morale": 2, "food": -1, "water": -1 } }
        ]
    },
    {
        "id": "E_EARLY_20",
        "stage": "early",
        "title": "Sleeping Space Dispute",
        "description": "Tensions rise after someone rearranges sleeping areas without asking.",
        "choices": [
            { "text": "Create a shared sleeping plan", "effect": { "morale": 2 } },
            { "text": "Force everyone back to the old arrangement", "effect": { "morale": -1 } },
            { "text": "Let people fight it out on their own", "effect": { "injured": 1, "morale": -2 } }
        ]
    },
    {
        "id": "E_EARLY_21",
        "stage": "early",
        "title": "Favoritism Claim",
        "description": "A small group accuses leadership of giving better jobs to certain people.",
        "choices": [
            { "text": "Hold a quick public vote on assignments", "effect": { "morale": 2 } },
            { "text": "Ignore them and continue as-is", "effect": { "morale": -2 } },
            { "text": "Offer small concessions to quiet them", "effect": { "food": -1, "morale": 1 } }
        ]
    },

    // --- MID GAME ---
    {
        "id": "M_MID_01",
        "stage": "mid",
        "title": "Coyote Pack Near the Lot",
        "description": "Coyotes have started circling the outer stores at night, drawn by food waste and noise.",
        "choices": [
            { "text": "Reinforce perimeter and remove food waste", "effect": { "scrap": -2, "morale": 2 } },
            { "text": "Set bait away from the lot", "effect": { "food": -2, "morale": 1 } },
            { "text": "Ignore them and hope they move on", "effect": { "injured": 1, "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_02",
        "stage": "mid",
        "title": "Aggressive Buck",
        "description": "A large buck has become territorial near the lot and has already charged two people.",
        "choices": [
            { "text": "Build barriers to block its access", "effect": { "scrap": -2, "morale": 1 } },
            { "text": "Hunt it for meat", "effect": { "food": 4, "morale": -3 } },
            { "text": "Try to scare it off", "effect": { "injured": 1, "morale": -2 } }
        ]
    },
    {
        "id": "M_MID_03",
        "stage": "mid",
        "title": "Loose Ram from a Nearby Farm",
        "description": "A full-grown ram repeatedly charges anyone working near the outer stores.",
        "choices": [
            { "text": "Build a temporary pen", "effect": { "scrap": -3, "morale": 2 } },
            { "text": "Lure it away with food", "effect": { "food": -2, "morale": 1 } },
            { "text": "Drive it off forcefully", "effect": { "injured": 1, "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_04",
        "stage": "mid",
        "title": "Child Bitten During Cleanup",
        "description": "A child is bitten while helping clear debris and needs immediate medical attention to survive.",
        "choices": [
            { "text": "Use medical supplies right away", "effect": { "medical": -1, "morale": 3 } },
            { "text": "Improvise treatment and hope", "effect": { "injured": 1, "morale": -2 } },
            { "text": "Do nothing—supplies are too scarce", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "M_MID_05",
        "stage": "mid",
        "title": "Friendly Young Goat",
        "description": "A young goat wanders into the lot, calm and trusting, following people around as if it’s already decided to stay.",
        "choices": [
            { "text": "Keep it and care for it", "effect": { "food": -1, "morale": 4 } },
            { "text": "Slaughter it for meat", "effect": { "food": 3, "morale": -5 } },
            { "text": "Chase it away before people get attached", "effect": { "morale": -2 } }
        ]
    },
    {
        "id": "M_MID_06",
        "stage": "mid",
        "title": "Footsteps on the Roof",
        "description": "Heavy footsteps are heard pacing across the rooftops long after everyone should be asleep.",
        "choices": [
            { "text": "Post night watches", "effect": { "morale": 1, "water": -1 } },
            { "text": "Fire warning shots", "effect": { "weapons": -1, "morale": -1 } },
            { "text": "Do nothing and try to sleep", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_07",
        "stage": "mid",
        "title": "Distant Screaming",
        "description": "Screaming echoes from somewhere beyond the parking lot, fading before anyone can locate it.",
        "choices": [
            { "text": "Send a scouting party at dawn", "effect": { "scrap": 1, "morale": -1 } },
            { "text": "Barricade and stay alert", "effect": { "scrap": -1, "morale": 1 } },
            { "text": "Pretend it didn’t happen", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_08",
        "stage": "mid",
        "title": "Gunshot in the Dark",
        "description": "A single gunshot rings out nearby, followed by complete silence.",
        "choices": [
            { "text": "Organize armed patrols", "effect": { "weapons": -1, "morale": 1 } },
            { "text": "Lock down and conserve ammo", "effect": { "morale": -1 } },
            { "text": "Argue about what it meant", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_09",
        "stage": "mid",
        "title": "Car Alarm That Won’t Stop",
        "description": "An old car alarm blares for hours before finally dying on its own.",
        "choices": [
            { "text": "Disable it with tools", "effect": { "scrap": -1, "morale": 2 } },
            { "text": "Destroy the car to stop it", "effect": { "scrap": -2, "morale": -1 } },
            { "text": "Let it run until it dies", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_10",
        "stage": "mid",
        "title": "Birthday Without Candles",
        "description": "Survivors quietly organize a birthday using scavenged treats and half-remembered songs.",
        "choices": [
            { "text": "Let the celebration happen", "effect": { "food": -2, "morale": 5 } },
            { "text": "Keep it brief and controlled", "effect": { "morale": 2 } },
            { "text": "Shut it down as wasteful", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_11",
        "stage": "mid",
        "title": "Food Poisoning",
        "description": "Several people wake up violently ill after eating from the same batch of stored food.",
        "choices": [
            { "text": "Use medical supplies and discard food", "effect": { "medical": -1, "food": -2, "morale": 2 } },
            { "text": "Force rest and ration water", "effect": { "water": -2, "morale": -1 } },
            { "text": "Ignore it and push through work", "effect": { "injured": 2, "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_12",
        "stage": "mid",
        "title": "Broken Jaw Fight",
        "description": "Two survivors get into a late-night fight, leaving one with a badly broken jaw.",
        "choices": [
            { "text": "Provide medical care and mediation", "effect": { "medical": -1, "injured": 1, "morale": 1 } },
            { "text": "Punish both publicly", "effect": { "morale": -3 } },
            { "text": "Ignore it to avoid escalation", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_13",
        "stage": "mid",
        "title": "Nightmares Spread",
        "description": "One person’s screaming nightmare wakes half the camp, and no one sleeps well after.",
        "choices": [
            { "text": "Assign rest shifts and check-ins", "effect": { "water": -1, "morale": 1 } },
            { "text": "Dismiss it as stress", "effect": { "morale": -2 } },
            { "text": "Mock it and move on", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_14",
        "stage": "mid",
        "title": "Quiet Anniversary",
        "description": "One survivor marks the anniversary of a loss, withdrawing from work for the day.",
        "choices": [
            { "text": "Give them the day off", "effect": { "food": -1, "morale": 2 } },
            { "text": "Offer quiet support but keep schedule", "effect": { "morale": 1 } },
            { "text": "Demand they keep working", "effect": { "morale": -3 } }
        ]
    },
    {
        "id": "M_MID_15",
        "stage": "mid",
        "title": "Exhaustion Collapse",
        "description": "A survivor collapses from exhaustion during routine work and has to be carried back.",
        "choices": [
            { "text": "Assign rest and recovery", "effect": { "food": -1, "morale": 2 } },
            { "text": "Use stimulants and push on", "effect": { "injured": 1, "morale": -2 } },
            { "text": "Call it weakness and move on", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_16",
        "stage": "mid",
        "title": "Hoarded Snacks Discovered",
        "description": "A small stash of food is found hidden in someone’s sleeping area.",
        "choices": [
            { "text": "Redistribute food and forgive", "effect": { "food": 1, "morale": 2 } },
            { "text": "Publicly shame the hoarder", "effect": { "morale": -3 } },
            { "text": "Confiscate and punish quietly", "effect": { "morale": -1 } }
        ]
    },
    {
        "id": "M_MID_17",
        "stage": "mid",
        "title": "Panic Attack (Morning)",
        "description": "A survivor suffers a panic attack at morning roll call and can’t function.",
        "choices": [
            { "text": "Assign medical and rest support", "effect": { "medical": -1, "injured": 1, "morale": 1 } },
            { "text": "Let them sit out without help", "effect": { "morale": -2 } },
            { "text": "Accuse them of faking", "effect": { "morale": -4 } }
        ]
    },
    {
        "id": "M_MID_18",
        "stage": "mid",
        "title": "Unplanned Celebration",
        "description": "Someone convinces a few others to cook a real meal, burning through supplies for a moment of normalcy.",
        "choices": [
            { "text": "Allow it fully", "effect": { "food": -3, "morale": 5 } },
            { "text": "Scale it back", "effect": { "food": -1, "morale": 2 } },
            { "text": "Shut it down immediately", "effect": { "morale": -5 } }
        ]
    },

    // --- LATE GAME ---
    {
        "id": "L_LATE_01",
        "stage": "late",
        "title": "Loose Bull in the Lot",
        "description": "A massive bull breaks free from a nearby farm and rampages through the parking lot, destroying barriers and vehicles.",
        "choices": [
            { "text": "Use weapons to put it down", "effect": { "food": 10, "weapons": -3, "morale": -2 } },
            { "text": "Build barricades and wait it out", "effect": { "scrap": -3, "injured": 1, "morale": -1 } },
            { "text": "Do nothing and hope it leaves", "effect": { "injured": 3, "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_02",
        "stage": "late",
        "title": "Pack of Wolves",
        "description": "Wolves are spotted hunting together near the outer stores, testing the colony’s defenses over several nights.",
        "choices": [
            { "text": "Arm night patrols", "effect": { "weapons": -1, "morale": 1 } },
            { "text": "Fortify perimeter fencing", "effect": { "scrap": -2, "morale": 1 } },
            { "text": "Ignore the threat", "effect": { "injured": 2, "morale": -4 } }
        ]
    },
    {
        "id": "L_LATE_03",
        "stage": "late",
        "title": "Venomous Spider Bite",
        "description": "A survivor is bitten by a venomous spider while clearing storage and rapidly worsens without treatment.",
        "choices": [
            { "text": "Use antivenom immediately", "effect": { "medical": -1, "morale": 1 } },
            { "text": "Attempt improvised care", "effect": { "injured": 1, "morale": -2 } },
            { "text": "Withhold treatment", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "L_LATE_04",
        "stage": "late",
        "title": "Stampede at Dusk",
        "description": "A panicked herd of deer crashes through the lot, flattening structures and injuring anyone caught outside.",
        "choices": [
            { "text": "Sacrifice stores to divert them", "effect": { "scrap": -3, "morale": -1 } },
            { "text": "Use weapons to scare them off", "effect": { "weapons": -1, "morale": -2 } },
            { "text": "Fail to respond in time", "effect": { "injured": 4, "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_05",
        "stage": "late",
        "title": "Bear Sightings",
        "description": "Tracks and torn dumpsters suggest a large bear has begun scavenging dangerously close to the colony.",
        "choices": [
            { "text": "Fire warning shots", "effect": { "weapons": -1, "morale": 1 } },
            { "text": "Reinforce food storage", "effect": { "scrap": -2, "morale": 1 } },
            { "text": "Ignore signs", "effect": { "injured": 2, "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_06",
        "stage": "late",
        "title": "Contaminated Water Source",
        "description": "A foul smell and discoloration are discovered in the water supply after several people fall ill.",
        "choices": [
            { "text": "Purge and clean system", "effect": { "water": -3, "scrap": -2, "morale": 1 } },
            { "text": "Ration water tightly", "effect": { "water": -2, "morale": -2 } },
            { "text": "Continue using it", "effect": { "injured": 3, "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_07",
        "stage": "late",
        "title": "Flu Wave",
        "description": "A harsh flu tears through the colony, leaving many survivors weak, feverish, and unable to work.",
        "choices": [
            { "text": "Distribute medicine and rest", "effect": { "medical": -2, "morale": 2 } },
            { "text": "Force reduced work schedules", "effect": { "morale": -2 } },
            { "text": "Ignore and push productivity", "effect": { "injured": 3, "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_08",
        "stage": "late",
        "title": "Infected Wound",
        "description": "A minor untreated injury turns septic, forcing an urgent decision about aggressive treatment.",
        "choices": [
            { "text": "Aggressive treatment", "effect": { "medical": -1, "morale": 1 } },
            { "text": "Delay care to conserve supplies", "effect": { "injured": 1, "morale": -2 } },
            { "text": "Refuse treatment", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "L_LATE_09",
        "stage": "late",
        "title": "Norovirus Outbreak",
        "description": "Rapid-onset vomiting and diarrhea spread through shared sleeping areas after a communal meal.",
        "choices": [
            { "text": "Isolate sick and discard food", "effect": { "food": -3, "morale": -1 } },
            { "text": "Use medicine to manage symptoms", "effect": { "medical": -1, "morale": 1 } },
            { "text": "Ignore containment", "effect": { "injured": 4, "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_10",
        "stage": "late",
        "title": "Severe Respiratory Infection",
        "description": "A persistent cough and breathing trouble spread among survivors sleeping near enclosed storefronts.",
        "choices": [
            { "text": "Assign medical care and rest", "effect": { "medical": -2, "morale": 1 } },
            { "text": "Move sleeping areas outdoors", "effect": { "scrap": -1, "morale": -1 } },
            { "text": "Do nothing", "effect": { "injured": 3, "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_11",
        "stage": "late",
        "title": "Public Accusation (Sabotaged Generator)",
        "description": "A survivor is accused of intentionally damaging the generator after being reassigned from night watch, and multiple witnesses demand a public judgment.",
        "choices": [
            { "text": "Hold public trial", "effect": { "morale": -1 } },
            { "text": "Punish accused immediately", "effect": { "morale": -4 } },
            { "text": "Refuse judgment", "effect": { "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_12",
        "stage": "late",
        "title": "Theft with a Reason (Hidden Family)",
        "description": "A survivor admits to stealing food and water to keep a spouse and child hidden in an abandoned store nearby.",
        "choices": [
            { "text": "Allow family to join", "effect": { "survivors": 2, "food": -2, "water": -2, "morale": 2 } },
            { "text": "Exile the survivor", "effect": { "survivors": -1, "morale": -5 } },
            { "text": "Confiscate supplies only", "effect": { "food": 2, "morale": -3 } }
        ]
    },
    {
        "id": "L_LATE_13",
        "stage": "late",
        "title": "Assault During Patrol (Facial Injuries)",
        "description": "During a nighttime patrol argument, one survivor strikes another with a flashlight, leaving them bleeding and in need of stitches.",
        "choices": [
            { "text": "Provide medical care", "effect": { "medical": -1, "morale": 1 } },
            { "text": "Punish attacker harshly", "effect": { "morale": -4 } },
            { "text": "Ignore incident", "effect": { "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_14",
        "stage": "late",
        "title": "False Testimony (Wrongly Punished)",
        "description": "Evidence emerges that a past punishment may have been based on a lie.",
        "choices": [
            { "text": "Publicly admit mistake", "effect": { "morale": -2 } },
            { "text": "Quietly compensate victim", "effect": { "food": -1, "morale": -1 } },
            { "text": "Deny wrongdoing", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_15",
        "stage": "late",
        "title": "Demand for Exile (Chronic Disruptor)",
        "description": "Several survivors demand the exile of someone who repeatedly ignores assignments, incites arguments, and undermines leadership meetings.",
        "choices": [
            { "text": "Exile them", "effect": { "survivors": -1, "morale": -3 } },
            { "text": "Keep them under watch", "effect": { "scrap": -1, "morale": -1 } },
            { "text": "Refuse demands", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_16",
        "stage": "late",
        "title": "Infected Isolation",
        "description": "A survivor with a worsening infection asks to be isolated outside the main shelter to protect others.",
        "choices": [
            { "text": "Honor their request", "effect": { "survivors": -1, "morale": -6 } },
            { "text": "Force them to stay", "effect": { "injured": 2, "morale": -5 } },
            { "text": "Use medical care instead", "effect": { "medical": -2, "morale": -2 } }
        ]
    },
    {
        "id": "L_LATE_17",
        "stage": "late",
        "title": "Insulin Run",
        "description": "A diabetic survivor will die within days without insulin rumored to be stored at a distant pharmacy, but the trip is extremely dangerous.",
        "choices": [
            { "text": "Send armed team", "effect": { "weapons": -1, "food": -2, "morale": 3 } },
            { "text": "Send unarmed volunteers", "effect": { "injured": 2, "morale": -3 } },
            { "text": "Do nothing", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "L_LATE_18",
        "stage": "late",
        "title": "Psychotic Break",
        "description": "A survivor experiencing severe hallucinations becomes increasingly paranoid and violent, refusing medical help.",
        "choices": [
            { "text": "Use weapons to restrain", "effect": { "weapons": -1, "morale": -1 } },
            { "text": "Attempt medical sedation", "effect": { "medical": -1, "morale": -2 } },
            { "text": "Ignore warning signs", "effect": { "injured": 3, "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_19",
        "stage": "late",
        "title": "Sick Pet",
        "description": "A longtime companion animal is gravely ill, and treating it would consume medical supplies needed for people.",
        "choices": [
            { "text": "Treat the pet", "effect": { "medical": -1, "morale": 3 } },
            { "text": "Put it down humanely", "effect": { "morale": -4 } },
            { "text": "Let it suffer", "effect": { "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_20",
        "stage": "late",
        "title": "Lost Child Search",
        "description": "A child goes missing overnight, and organizing a search will halt essential work and put others at risk.",
        "choices": [
            { "text": "Organize search", "effect": { "food": -2, "morale": -1 } },
            { "text": "Delay until morning", "effect": { "morale": -3 } },
            { "text": "Call off search", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "L_LATE_21",
        "stage": "late",
        "title": "The Doomed Patient",
        "description": "A survivor is critically injured and unlikely to survive even with treatment, but using supplies on them means others will go without.",
        "choices": [
            { "text": "Use supplies anyway", "effect": { "survivors": -1, "medical": -2, "morale": 1 } },
            { "text": "Provide comfort only", "effect": { "survivors": -1, "morale": -3 } },
            { "text": "Abandon care", "effect": { "survivors": -1, "morale": -10 } }
        ]
    },
    {
        "id": "L_LATE_22",
        "stage": "late",
        "title": "Refusal of Care",
        "description": "A survivor suffering from deep depression refuses food, water, and treatment.",
        "choices": [
            { "text": "Force intervention", "effect": { "medical": -1, "morale": -2 } },
            { "text": "Respect their choice", "effect": { "survivors": -1, "morale": -10 } },
            { "text": "Ignore and hope", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_23",
        "stage": "late",
        "title": "Mercy Request",
        "description": "A terminally ill survivor asks someone to help them die before their condition worsens and resources are wasted.",
        "choices": [
            { "text": "Grant request", "effect": { "survivors": -1, "morale": -6 } },
            { "text": "Refuse and provide care", "effect": { "medical": -1, "morale": -3 } },
            { "text": "Avoid decision", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_24",
        "stage": "late",
        "title": "Controlled Execution",
        "description": "Guards demand permission to execute a violent captive.",
        "choices": [
            { "text": "Authorize execution", "effect": { "weapons": -1, "morale": -5 } },
            { "text": "Refuse execution", "effect": { "morale": -6 } },
            { "text": "Release captive", "effect": { "morale": -8 } }
        ]
    },
    {
        "id": "L_LATE_25",
        "stage": "late",
        "title": "Armed Deterrence",
        "description": "An approaching group ignores warnings, and only a visible show of force will convince them to back off.",
        "choices": [
            { "text": "Fire warning shots", "effect": { "weapons": -1, "morale": 1 } },
            { "text": "Negotiate without arms", "effect": { "morale": -3 } },
            { "text": "Do nothing", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_26",
        "stage": "late",
        "title": "Clearing the Squatters",
        "description": "Noises inside a sealed storefront suggest squatters near your supplies.",
        "choices": [
            { "text": "Clear with weapons", "effect": { "weapons": -1, "morale": -2 } },
            { "text": "Clear unarmed", "effect": { "injured": 2, "morale": -4 } },
            { "text": "Leave them", "effect": { "morale": -5 } }
        ]
    },
    {
        "id": "L_LATE_27",
        "stage": "late",
        "title": "Stopping a Breakdown",
        "description": "A survivor loses control during a breakdown and threatens others.",
        "choices": [
            { "text": "Use armed restraint", "effect": { "weapons": -1, "morale": -1 } },
            { "text": "Attempt de-escalation", "effect": { "injured": 1, "morale": -3 } },
            { "text": "Ignore escalation", "effect": { "injured": 3, "morale": -6 } }
        ]
    },
    {
        "id": "L_LATE_28",
        "stage": "late",
        "title": "Final Warning Patrol",
        "description": "A dangerous night patrol will only go if leadership authorizes lethal force on sight.",
        "choices": [
            { "text": "Authorize lethal force", "effect": { "weapons": -1, "morale": -2 } },
            { "text": "Restrict force", "effect": { "injured": 2, "morale": -3 } },
            { "text": "Cancel patrol", "effect": { "morale": -6 } }
        ]
    },

    // --- RAIDERS ---
    {
        "id": "R_E_01",
        "stage": "early",
        "title": "Raiders Marked the Lot",
        "description": "Fresh graffiti symbols appear on the loading docks overnight.",
        "choices": [
            { "text": "Paint over the markings", "effect": { "morale": 2, "scrap": -1 } },
            { "text": "Leave them visible", "effect": { "morale": -3 } },
            { "text": "Add guards to the area", "effect": { "weapons": -1, "morale": 1 } }
        ]
    },
    {
        "id": "R_E_02",
        "stage": "early",
        "title": "Scouts Report Armed Shadows",
        "description": "Scouts claim they saw armed figures watching the mall from a distance.",
        "choices": [
            { "text": "Recall all scouts", "effect": { "morale": -1, "outsideScavengeNext": -1 } },
            { "text": "Double watch rotations", "effect": { "morale": -2, "injured": 1 } },
            { "text": "Ignore the report", "effect": {} }
        ]
    },
    {
        "id": "R_E_03",
        "stage": "early",
        "title": "Symbols in the Parking Rows",
        "description": "Strange symbols are found carved into light posts near the far lot.",
        "choices": [
            { "text": "Remove the posts", "effect": { "scrap": 2, "morale": -1 } },
            { "text": "Study the symbols", "effect": { "raiderIntel": 1 } },
            { "text": "Do nothing", "effect": { "morale": -2 } }
        ]
    },
    {
        "id": "R_E_04",
        "stage": "early",
        "title": "Rumors Spread Quickly",
        "description": "Some survivors believe raiders are nearby; others say it’s paranoia.",
        "choices": [
            { "text": "Hold a meeting", "effect": { "morale": 2, "productivityNext": -1 } },
            { "text": "Crack down on rumors", "effect": { "morale": -3 } },
            { "text": "Let it pass", "effect": {} }
        ]
    },
    {
        "id": "R_E_05",
        "stage": "early",
        "title": "Weapons Inventory Questioned",
        "description": "People ask if the colony has enough weapons to defend itself.",
        "choices": [
            { "text": "Reveal inventory", "effect": { "morale": 1, "security": -1 } },
            { "text": "Hide the numbers", "effect": { "security": 1, "morale": -2 } },
            { "text": "Begin weapon training", "effect": { "weapons": -1, "morale": 1 } }
        ]
    },
    {
        "id": "R_E_06",
        "stage": "early",
        "title": "Strange Tracks Found",
        "description": "Large boot prints are found near the tree line.",
        "choices": [
            { "text": "Send scouts to follow", "effect": { "injured": 1 } },
            { "text": "Mark the area as off-limits", "effect": { "morale": -1 } },
            { "text": "Ignore them", "effect": {} }
        ]
    },
    {
        "id": "R_E_07",
        "stage": "early",
        "title": "Abandoned Campfire",
        "description": "An old campfire is found not far from the mall.",
        "choices": [
            { "text": "Salvage supplies", "effect": { "food": 1, "scrap": 1 } },
            { "text": "Burn the site", "effect": {} },
            { "text": "Post guards", "effect": { "weapons": -1 } }
        ]
    },
    {
        "id": "R_E_08",
        "stage": "early",
        "title": "Conflicting Reports",
        "description": "Two scouts give wildly different accounts of what they saw.",
        "choices": [
            { "text": "Side with the cautious scout", "effect": { "morale": -1, "security": 1 } },
            { "text": "Side with the optimistic scout", "effect": { "morale": 1, "security": -1 } },
            { "text": "Dismiss both", "effect": {} }
        ]
    },
    {
        "id": "R_E_09",
        "stage": "early",
        "title": "Night Watch Fatigue",
        "description": "Night guards report hearing voices that vanish by morning.",
        "choices": [
            { "text": "Increase night patrols", "effect": { "injured": 1, "security": 1 } },
            { "text": "Reduce patrols", "effect": { "morale": 1, "security": -1 } },
            { "text": "Maintain status quo", "effect": {} }
        ]
    },
    {
        "id": "R_M_01",
        "stage": "mid",
        "title": "Armed Negotiators",
        "description": "An armed group approaches openly and asks to talk, making it clear they are not asking permission to be there.",
        "choices": [
            { "text": "Meet them with weapons visible", "effect": { "weapons": -1, "raiderDisposition": -1 } },
            { "text": "Meet them unarmed", "effect": { "morale": 2, "raiderDisposition": 1 } },
            { "text": "Refuse to meet", "effect": { "morale": -3, "futureRaidRisk": 1 } }
        ]
    }
];
