// --- WEATHER CONSTANTS ---
const WEATHER_TYPES = [
    { name: "☀️ Clear", morale: 2, water: 0, farmMod: 1.0 },
    { name: "☁️ Cloudy", morale: 0, water: 0, farmMod: 1.0 },
    { name: "🌦️ Drizzle", morale: -1, water: 1, farmMod: 1.2 },
    { name: "🌧️ Rain", morale: -2, water: 2, farmMod: 1.5 },
    { name: "⛈️ Heavy Rain", morale: -3, water: 3, farmMod: 2.0 },
    { name: "🔥 Hot", morale: -1, water: -1, farmMod: 0.8 },
    { name: "🏜️ Very Hot", morale: -2, water: -2, farmMod: 0.5 },
    { name: "💨 Windy", morale: 0, water: 0, farmMod: 1.0 }
];

// --- BUILDING CONFIGURATION ---
const LEVEL_COSTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const BUILDINGS = {
    livingQuarters: {
        name: "🏠 Living Quarters",
        level: 0,
        desc: [
            "Basic Sleeping Bags (Cap: 10)",
            "Improved Wooden Bunks (Cap: 15)",
            "Partitioned Dorms (Cap: 20)",
            "Comfortable Private Cubicles (Cap: 25)",
            "Spacious Luxury Suites (Cap: 30)",
            "Family Suites (Cap: 40)",
            "Executive Suites (Cap: 50)",
            "Luxury Apartments with Kitchenettes (Cap: 60)",
            "Apartments with Private Bathrooms & Living Areas (Cap: 70)",
            "Penthouse Suites with Balconies & Views (Cap: 80)"
        ]
    },
    farm: {
        name: "🌽 Farm",
        level: 0,
        desc: [
            "Simple Window Boxes (+2 Food)",
            "Basic Rooftop Garden (+4 Food)",
            "Improved Greenhouse (+6 Food)",
            "Automated Hydroponics (+8 Food)",
            "Advanced Aeroponic Vertical Farm (+10 Food)",
            "Expanded Greenhouse with Climate Control (+12 Food)",
            "Vertical Farm with Automated Irrigation (+15 Food)",
            "Crop Rotation & Pest Control System (+18 Food)",
            "Greenhouse with Artificial Lighting for Year-Round Growth (+20 Food)",
            "Aquaculture Integration (Fish & Plant Synergy) (+25 Food)"
        ]
    },
    waterColl: {
        name: "💧 Water Collection",
        level: 0,
        desc: [
            "Simple Roof Buckets (+2 Water)",
            "Larger Rain Barrels (+4 Water)",
            "Enhanced Dew Tarps (+6 Water)",
            "Efficient Gutter System with Filtration (+8 Water)",
            "Automated Water Collection System (+10 Water)",
            "Water Storage Tanks with UV Sterilization (+12 Water)",
            "Rainwater Harvesting System with Greywater Recycling (+15 Water)",
            "Deep Well & Pump System (+18 Water)",
            "Atmospheric Water Generator (AWG) (+20 Water)",
            "Comprehensive Water Purification & Distribution Network (+25 Water)"
        ]
    },
    recRoom: {
        name: "🎱 Rec Room",
        level: 0,
        desc: [
            "Deck of Cards (+1 Morale)",
            "Dart Board (+2 Morale)",
            "Basic Pool Table (+3 Morale)",
            "Projector Screen & Basic Seating (+4 Morale)",
            "Comfortable Lounge Area with Games (+5 Morale)",
            "Dedicated Game Room with Various Activities (+6 Morale)",
            "Multi-Purpose Recreational Space with Fitness Equipment (+7 Morale)",
            "Themed Recreation Room (e.g., Arcade, Sports Simulator) (+8 Morale)",
            "Full Bar & Arcade with Entertainment System (+9 Morale)",
            "Large Communal Gathering Space with Stage for Performances (+10 Morale)"
        ]
    },
    watchtower: {
        name: "🔭 Watchtower",
        level: 0,
        desc: [
            "Ladder to Roof (Risk -2%)",
            "Basic Binoculars (Risk -4%)",
            "Improved Observation Platform (Risk -6%)",
            "Enhanced Optics with Rangefinder (Risk -8%)",
            "Automated Surveillance System with Motion Detection (Risk -10%)",
            "Weatherproof Watchtower with Heated Interior (+-1% Risk)",
            "Multi-Level Watchtower with Dedicated Observation Posts (+-2% Risk)",
            "Drone Integration for Aerial Surveillance & Reporting (+-3% Risk)",
            "Advanced Sensor Array with Environmental Monitoring (+-4% Risk)",
            "Remote-Controlled Turret System (For Defense) (+-5% Risk)"
        ]
    },
    signage: {
        name: "📡 Signage & Radio",
        level: 0,
        desc: [
            "Simple Wall Spraypaint (Recruit +)",
            "Wooden Billboards with Basic Messages (Recruit ++)",
            "Handheld Ham Radio for Short-Range Communication (Recruit +++)",
            "Shortwave Radio Receiver with Signal Boosting (+ +++)",
            "Satellite Uplink Terminal for Global Communication (+ ++++)",
            "Automated Message Display System with Dynamic Updates (+ +++++)",
            "Public Address System with Amplification & Directional Speakers (++++++)",
            "Interactive Digital Signage with Real-Time Information (+++++++)",
            "Encrypted Communication System with Secure Data Transmission (++++++++)",
            "Dedicated Broadcast Studio for News & Announcements (++++++++)"
        ]
    },
    security: {
        name: "🛡️ Security",
        level: 0,
        desc: [
            "Basic Boarded Windows",
            "Reinforced Doors with Simple Locks",
            "Barbed Wire Fence Perimeter",
            "Motion-Activated Perimeter Alarm",
            "Manual Turret System (Limited Range)"
        ]
    }
};


// --- GLOBAL GAME SETTINGS ---
const GAME_SETTINGS = {
    maxDays: 51,
    defenseDays: [10, 20, 30, 40, 50] 
};

// --- JOB RISKS ---
const INJURY_CHANCE = {
    scavengeMall: 0.10,
    scavengeOut: 0.25,
    hunt: 0.15,
    water: 0.05,
    recruit: 0.20,
    medical: 0.0,
    rest: 0.0
};

// --- JOB YIELDS ---
const JOB_CONFIG = {
    mall: { minFood: 0, maxFood: 1, minWater: 0, maxWater: 1, minScrap: 2, maxScrap: 4, weaponChance: 0.05 },
    outside: { minFood: 0, maxFood: 1, minWater: 0, maxWater: 1, minScrap: 3, maxScrap: 7, weaponChance: 0.2, medicalChance: 0.15 },
    hunt: { minFood: 3, maxFood: 8, minWater: 0, maxWater: 1 },
    waterPerJob: 3,
    baseRecruitChance: 0.20,
    recruitBonusPerLevel: 0.10, 
    moraleRest: 2,
    
    // MEDICAL & RECOVERY
    medicBaseChance: 0.25,      // 10% chance if Medic treats without supplies
    medicBonusChance: 0.90,     // 90% chance if Medic treats WITH supplies
    naturalRecoveryChance: 0.05,// 5% chance per day for ANY injured survivor to heal on their own
    unattendedDeathChance: 0.10 // 10% chance per day an injured person dies if NO MEDIC is working
};

// --- SCORING SYSTEM ---
const SCORE_CONFIG = {
    perSurvivor: 1000,   // Big bonus for keeping people alive
    perMorale: 10,       // Happiness matters
    perFood: 5,          // Hoarding supplies
    perWater: 5,
    perScrap: 2,
    perWeapon: 20,
    perMedical: 50,
    perBuildingLevel: 100, // Infrastructure value
    winBonus: 5000       // Bonus for actually reaching Day 51
};