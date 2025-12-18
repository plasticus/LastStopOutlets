// --- STATE MANAGEMENT ---

const JOBS = {
    scavengeMall: { name: "🛒 Scavenge (Mall)", count: 0 },
    scavengeOut: { name: "🏙️ Scavenge (Outside)", count: 0 },
    hunt: { name: "🏹 Hunt", count: 0 },
    water: { name: "🪣 Collect Water", count: 0 },
    medical: { name: "⚕️ Medical Care", count: 0 },
    recruit: { name: "🤝 Recruit", count: 0 },
    rest: { name: "💤 Rest", count: 0 }
};

const RES_ICONS = {
    food: "🥩",
    water: "💧",
    medical: "💊",
    scrap: "⚙️",
    weapons: "🔫",
    survivors: "👥"
};

let state = {
    day: 1,
    resources: {
        food: 20,
        water: 20,
        medical: 5,
        scrap: 10,
        weapons: 0,
        morale: 50,
        survivors: 5
    },
    dayStartResources: {}, 
    injured: 0,
    weather: WEATHER_TYPES[0],
    gameOver: false,
    logQueue: [] 
};

// --- INITIALIZATION ---
window.onload = function() {
    if (typeof JOB_CONFIG === 'undefined') {
        alert("Error: config.js not loaded!");
        return;
    }
    state.dayStartResources = { ...state.resources };
    renderUI();
    
    log("Welcome to Last Stop Outlets. Five survivors have banded together in this abandoned strip mall.", "flavor");
    log("Assign them jobs to gather resources. Winter is coming. Good luck.", "flavor");
    
    startDay();
};

// --- CORE LOOPS ---

function startDay() {
    if (state.gameOver) return;

    state.dayStartResources = { ...state.resources };

    if (WEATHER_TYPES && WEATHER_TYPES.length > 0) {
        state.weather = WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];
    } else {
        state.weather = { name: "Unknown", morale: 0, water: 0, farmMod: 1.0 };
    }
    
    let effectStr = "";
    if (state.weather.morale !== 0) {
        effectStr = `(Morale ${state.weather.morale > 0 ? '+' : ''}${state.weather.morale})`;
    }
    log(`🌤️ Weather: ${state.weather.name} ${effectStr}`, "weather");

    if (typeof FLAVOR_TEXT !== 'undefined' && FLAVOR_TEXT.length > 0) {
        const moodText = FLAVOR_TEXT[Math.floor(Math.random() * FLAVOR_TEXT.length)];
        log(moodText, "flavor");
    }

    document.getElementById('end-day-btn').disabled = false;
    renderUI();

    if (state.day > 1 && state.day % 2 === 0) {
        triggerEvent();
    }
}

function endDay() {
    if (state.gameOver) return;

    // Prevent double clicking
    document.getElementById('end-day-btn').disabled = true;

    // 1. Check for Tower Defense
    if (GAME_SETTINGS.defenseDays.includes(state.day)) {
        DefenseGame.setup();
        return; // Pause here, wait for afterDefense()
    }

    // 2. Run Normal Logic safely
    runDayLogic();
}

function runDayLogic() {
    try {
        resolveJobs();
        resolveBuildings(); // THIS WAS MISSING BEFORE!

        state.resources.morale += state.weather.morale;
        state.resources.water += state.weather.water;

        const foodCons = state.resources.survivors;
        const waterCons = state.resources.survivors;
        
        state.resources.food -= foodCons;
        state.resources.water -= waterCons;
        
        log(`📉 Consumed ${foodCons} Food, ${waterCons} Water.`, "neutral");

        checkDeaths();
        validateAssignments();

        let summaryParts = [];
        for (let key in state.resources) {
            let diff = state.resources[key] - state.dayStartResources[key];
            if (diff !== 0) {
                let sign = diff > 0 ? "+" : "";
                let capKey = key.charAt(0).toUpperCase() + key.slice(1);
                summaryParts.push(`${capKey} ${sign}${diff}`);
            }
        }

        log(`--- 🌙 End of Day ${state.day} ---`, "neutral"); 
        
        if (summaryParts.length > 0) {
            log(`📊 Day ${state.day} Summary: ${summaryParts.join(", ")}`, "neutral");
        } else {
            log(`📊 Day ${state.day} Summary: No changes.`, "neutral");
        }

        if (!state.gameOver) {
            if (state.day >= GAME_SETTINGS.maxDays) {
                state.gameOver = true;
                log(`🏆 DAY ${GAME_SETTINGS.maxDays} REACHED. SURVIVAL SUCCESSFUL.`, "good");
                triggerGameOver(true); 
            } else {
                state.day++;
                log(`📅 Day ${state.day} begins.`, "neutral");
                setTimeout(() => {
                    startDay();
                }, 1500); 
            }
        }

    } catch (err) {
        console.error("Game Loop Error:", err);
        log("⚠️ Critical Error in Day Processing. See Console.", "bad");
        // Ensure game doesn't hang
        document.getElementById('end-day-btn').disabled = false;
    } finally {
        renderUI();
    }
}

window.afterDefense = function() {
    if (!state.gameOver) {
        if (state.day >= GAME_SETTINGS.maxDays) {
            state.gameOver = true;
            log(`🏆 DAY ${GAME_SETTINGS.maxDays} REACHED. SURVIVAL SUCCESSFUL.`, "good");
            triggerGameOver(true); 
        } else {
            state.day++;
            log(`📅 Day ${state.day} begins.`, "neutral");
            setTimeout(() => {
                startDay();
            }, 1500); 
        }
    }
    renderUI();
};

// --- LOGIC HELPERS ---

function validateAssignments() {
    let assigned = Object.values(JOBS).reduce((a, b) => a + b.count, 0);
    if (state.injured > state.resources.survivors) state.injured = state.resources.survivors;
    
    let available = state.resources.survivors - state.injured;

    if (assigned > available) {
        let toRemove = assigned - available;
        log(`⚠️ Work force shortage. ${toRemove} survivor(s) pulled from duties.`, "bad");

        let safety = 0;
        while (toRemove > 0 && safety < 100) {
            let jobKeys = Object.keys(JOBS);
            for (let i = jobKeys.length - 1; i >= 0; i--) {
                let key = jobKeys[i];
                if (JOBS[key].count > 0) {
                    JOBS[key].count--;
                    toRemove--;
                    break; 
                }
            }
            safety++;
        }
    }
}

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInjuryChance(jobType) {
    let base = INJURY_CHANCE[jobType] || 0;
    let reduction = BUILDINGS.watchtower.level * 0.02;
    return Math.max(0, base - reduction);
}

function rollForInjury(jobKey, count) {
    let injuries = 0;
    let chance = getInjuryChance(jobKey);
    
    for(let i=0; i<count; i++) {
        if (Math.random() < chance) injuries++;
    }
    return injuries;
}

function calculateYield(jobConfig, count) {
    let yields = { food: 0, water: 0, scrap: 0, weapons: 0, medical: 0 };
    
    for(let i=0; i<count; i++) {
        if (jobConfig.minFood !== undefined) yields.food += getRand(jobConfig.minFood, jobConfig.maxFood);
        if (jobConfig.minWater !== undefined) yields.water += getRand(jobConfig.minWater, jobConfig.maxWater);
        if (jobConfig.minScrap !== undefined) yields.scrap += getRand(jobConfig.minScrap, jobConfig.maxScrap);
        if (jobConfig.minMedical !== undefined) yields.medical += getRand(jobConfig.minMedical, jobConfig.maxMedical);
        
        if (jobConfig.weaponChance !== undefined && Math.random() < jobConfig.weaponChance) {
            yields.weapons++;
        }
        if (jobConfig.medicalChance !== undefined && Math.random() < jobConfig.medicalChance) {
            yields.medical++;
        }
    }
    return yields;
}

function formatYieldString(yields) {
    let parts = [];
    if (yields.food > 0) parts.push(`${yields.food} Food`);
    if (yields.water > 0) parts.push(`${yields.water} Water`);
    if (yields.scrap > 0) parts.push(`${yields.scrap} Scrap`);
    if (yields.weapons > 0) parts.push(`${yields.weapons} Weapons`);
    if (yields.medical > 0) parts.push(`${yields.medical} Meds`);
    return parts.join(", ");
}

function resolveJobs() {
    const j = JOBS;
    const cfg = JOB_CONFIG; 
    let totalInjuries = 0;
    let injuryDetails = [];

    // 1. Scavenge Mall
    if(j.scavengeMall.count > 0) {
        let res = calculateYield(cfg.mall, j.scavengeMall.count);
        state.resources.food += res.food;
        state.resources.water += res.water;
        state.resources.scrap += res.scrap;
        state.resources.weapons += res.weapons;
        state.resources.medical += res.medical;

        if (res.food + res.water + res.scrap + res.weapons + res.medical > 0) {
            log(`🛒 Mall team found: ${formatYieldString(res)}.`, "good");
        }
        let inj = rollForInjury("scavengeMall", j.scavengeMall.count);
        if (inj > 0) {
            totalInjuries += inj;
            injuryDetails.push(`${inj} (Mall)`);
        }
    }

    // 2. Scavenge Outside
    if(j.scavengeOut.count > 0) {
        let res = calculateYield(cfg.outside, j.scavengeOut.count);
        state.resources.food += res.food;
        state.resources.water += res.water;
        state.resources.scrap += res.scrap;
        state.resources.weapons += res.weapons;
        state.resources.medical += res.medical;

        if (res.food + res.water + res.scrap + res.weapons + res.medical > 0) {
            log(`🏙️ Outside Scavengers found: ${formatYieldString(res)}.`, "good");
        }
        let inj = rollForInjury("scavengeOut", j.scavengeOut.count);
        if (inj > 0) {
            totalInjuries += inj;
            injuryDetails.push(`${inj} (Outside)`);
        }
    }

    // 3. Hunt
    if(j.hunt.count > 0) {
        let res = calculateYield(cfg.hunt, j.hunt.count);
        state.resources.food += res.food;
        state.resources.water += res.water;
        state.resources.scrap += res.scrap;
        state.resources.weapons += res.weapons;
        state.resources.medical += res.medical;

        if (res.food + res.water + res.scrap + res.weapons + res.medical > 0) {
            log(`🏹 Hunters brought back: ${formatYieldString(res)}.`, "good");
        }
        let inj = rollForInjury("hunt", j.hunt.count);
        if (inj > 0) {
            totalInjuries += inj;
            injuryDetails.push(`${inj} (Hunt)`);
        }
    }

    // 4. Water
    if(j.water.count > 0) {
        let w = j.water.count * cfg.waterPerJob;
        state.resources.water += w;
        log(`🪣 Collectors brought ${w} Water.`, "good");
        let inj = rollForInjury("water", j.water.count);
        if (inj > 0) {
            totalInjuries += inj;
            injuryDetails.push(`${inj} (Water)`);
        }
    }

    // 5. Recruit
    if (j.recruit.count > 0) {
        let inj = 0;
        let cap = 10 + (BUILDINGS.livingQuarters.level * 5); 
        let capHit = false;

        for(let i=0; i<j.recruit.count; i++) {
            if (state.resources.survivors >= cap) {
                capHit = true;
            } else {
                let chance = cfg.baseRecruitChance + (BUILDINGS.signage.level * cfg.recruitBonusPerLevel);
                if(Math.random() < chance) {
                    state.resources.survivors++;
                    log("👋 A survivor was recruited!", "good");
                }
            }
            inj += rollForInjury("recruit", 1);
        }
        
        if (capHit) {
            log("⚠️ Recruitment stalled: Living Quarters at capacity.", "neutral");
        }
        
        if (inj > 0) {
            totalInjuries += inj;
            injuryDetails.push(`${inj} (Recruit)`);
        }
    }

    // 6. Rest
    if(j.rest.count > 0) {
        state.resources.morale += (j.rest.count * cfg.moraleRest);
    }
    
    // 7. Medical
    if(j.medical.count > 0 && state.injured > 0) {
        let healedCount = 0;
        let healedWithMeds = 0;
        let failedCount = 0;

        for (let i = 0; i < j.medical.count; i++) {
            if (state.injured <= 0) break;

            let chance = cfg.medicBaseChance; 
            let usedMed = false;

            if (state.resources.medical > 0) {
                state.resources.medical--;
                chance = cfg.medicBonusChance;
                usedMed = true;
            }

            if (Math.random() < chance) {
                state.injured--;
                healedCount++;
                if (usedMed) healedWithMeds++;
            } else {
                failedCount++;
            }
        }

        if (healedCount > 0 || failedCount > 0) {
            let parts = [];
            if (healedCount > 0) parts.push(`${healedCount} Healed (${healedWithMeds} w/ Supplies)`);
            if (failedCount > 0) parts.push(`${failedCount} Failed`);
            
            let type = healedCount > 0 ? "good" : "bad";
            log(`⚕️ Medical Report: ${parts.join(", ")}.`, type);
        }
    } 
    // 8. Unattended
    else if (j.medical.count === 0 && state.injured > 0) {
        let diedFromNeglect = 0;
        let checkCount = state.injured;
        for (let i=0; i<checkCount; i++) {
            if (Math.random() < cfg.unattendedDeathChance) {
                diedFromNeglect++;
            }
        }

        if (diedFromNeglect > 0) {
            state.injured -= diedFromNeglect;
            state.resources.survivors -= diedFromNeglect;
            state.resources.morale -= (diedFromNeglect * 10);
            log(`💀 ${diedFromNeglect} injured survivor(s) died from lack of medical care.`, "bad");
        }
    }

    // 9. Natural Recovery
    if (state.injured > 0) {
        let naturalHealed = 0;
        let checkCount = state.injured;
        for (let i = 0; i < checkCount; i++) {
            if (Math.random() < cfg.naturalRecoveryChance) {
                state.injured--;
                naturalHealed++;
            }
        }
        
        if (naturalHealed > 0) {
            log(`🛌 ${naturalHealed} survivor(s) recovered naturally while resting.`, "good");
        }
    }

    // Apply New Injuries
    if (totalInjuries > 0) {
        state.injured += totalInjuries;
        state.resources.morale -= (totalInjuries * 2);
        
        log(`🚑 ${totalInjuries} injured on the job: ${injuryDetails.join(", ")}`, "bad");
    }
}

// RESTORED FUNCTION
function resolveBuildings() {
    let mod = 1.0;
    if (state.weather && state.weather.farmMod !== undefined) {
        mod = state.weather.farmMod;
    }

    let farmFood = BUILDINGS.farm.level * 2 * mod;
    farmFood = Math.floor(farmFood);
    if(farmFood > 0) {
        state.resources.food += farmFood;
        log(`🌽 Farm produced ${farmFood} Food.`, "good");
    }
    
    let wCol = BUILDINGS.waterColl.level * 2;
    state.resources.water += wCol;

    if(BUILDINGS.recRoom && BUILDINGS.recRoom.level > 0) {
        let moraleBoost = BUILDINGS.recRoom.level * 1;
        state.resources.morale += moraleBoost;
        log(`🎱 Rec Room raised Morale by ${moraleBoost}.`, "good");
    }
}

function checkDeaths() {
    let deaths = 0;
    let desertions = 0;

    if (state.resources.food <= 0) deaths++;
    if (state.resources.water <= 0) deaths++;
    if (state.resources.food < 0) state.resources.food = 0;
    if (state.resources.water < 0) state.resources.water = 0;

    if (state.resources.morale <= 0) {
        desertions++;
        state.resources.morale = 0; 
    }

    if (deaths > 0) {
        state.resources.survivors -= deaths;
        state.resources.morale -= (10 * deaths);
        log(`💀 ${deaths} survivor(s) died from shortages.`, "bad");
    }

    if (desertions > 0) {
        state.resources.survivors -= desertions;
        state.resources.morale -= (5 * desertions);
        log(`🏃 ${desertions} survivor(s) deserted.`, "bad");
    }

    if (state.resources.survivors <= 0) {
        state.resources.survivors = 0;
        state.gameOver = true;
        log("☠️ COLONY COLLAPSED. GAME OVER.", "bad");
        triggerGameOver(false); 
    }
}

function calculateScore(isWin) {
    const s = state.resources;
    const b = BUILDINGS;
    const c = SCORE_CONFIG;

    let total = 0;
    let breakdown = [];

    // 1. Survivors
    let survScore = s.survivors * c.perSurvivor;
    total += survScore;
    breakdown.push(`Survivors (${s.survivors}): +${survScore}`);

    // 2. Morale
    let morScore = Math.floor(s.morale * c.perMorale);
    total += morScore;
    breakdown.push(`Morale (${Math.floor(s.morale)}): +${morScore}`);

    // 3. Resources
    let resScore = 
        (s.food * c.perFood) + 
        (s.water * c.perWater) + 
        (s.scrap * c.perScrap) + 
        (s.weapons * c.perWeapon) + 
        (s.medical * c.perMedical);
    total += resScore;
    breakdown.push(`Resources: +${resScore}`);

    // 4. Buildings
    let buildLevels = 0;
    for(let key in b) {
        buildLevels += b[key].level;
    }
    let buildScore = buildLevels * c.perBuildingLevel;
    total += buildScore;
    breakdown.push(`Infrastructure (Lvl ${buildLevels}): +${buildScore}`);

    // 5. Win Bonus
    if(isWin) {
        total += c.winBonus;
        breakdown.push(`VICTORY BONUS: +${c.winBonus}`);
    }

    return { total, breakdown };
}

function triggerGameOver(isWin) {
    let scoreData = calculateScore(isWin);
    
    log("==================================", "neutral");
    log(`🏁 FINAL SCORE: ${scoreData.total.toLocaleString()}`, "good");
    scoreData.breakdown.forEach(line => log(line, "neutral"));
    log("==================================", "neutral");

    const modal = document.getElementById('event-modal');
    document.getElementById('event-title').innerText = isWin ? "🏆 YOU SURVIVED!" : "☠️ COLONY COLLAPSED";
    document.getElementById('event-title').style.color = isWin ? "#00b894" : "#ff7675";

    let desc = isWin 
        ? "Reinforcements have arrived." 
        : `Everyone is gone. You survived for ${state.day} days.`;
    
    document.getElementById('event-desc').innerText = desc + `\n\nFinal Score: ${scoreData.total.toLocaleString()}`;
    
    const choicesDiv = document.getElementById('event-choices');
    choicesDiv.innerHTML = '';

    const btnReview = document.createElement('button');
    btnReview.innerText = "Review Board";
    btnReview.style.background = "#636e72";
    btnReview.onclick = () => {
        modal.classList.add('hidden');
        const endBtn = document.getElementById('end-day-btn');
        endBtn.innerText = "PLAY AGAIN";
        endBtn.disabled = false;
        endBtn.onclick = () => window.location.reload();
        endBtn.style.background = "#0984e3";
    };
    choicesDiv.appendChild(btnReview);

    const btnRestart = document.createElement('button');
    btnRestart.innerText = "Play Again (Reload)";
    btnRestart.onclick = () => window.location.reload();
    choicesDiv.appendChild(btnRestart);

    modal.classList.remove('hidden');
    renderUI();
}

function triggerEvent() {
    let stage = "early";
    if (state.day >= 9) stage = "mid";
    if (state.day >= 19) stage = "late";

    const possibleEvents = EVENT_DB.filter(e => e.stage === stage);
    if (possibleEvents.length === 0) return; 

    const event = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];

    const modal = document.getElementById('event-modal');
    document.getElementById('event-title').innerText = "⚠️ " + event.title;
    document.getElementById('event-title').style.color = ""; // Reset color
    document.getElementById('event-desc').innerText = event.description;
    
    const choicesDiv = document.getElementById('event-choices');
    choicesDiv.innerHTML = '';

    event.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        
        let canAfford = true;
        
        // --- FIX: "Do Nothing" is ALWAYS enabled ---
        if (choice.text.toLowerCase().includes("do nothing")) {
            canAfford = true;
        } else {
            for (let key in choice.effect) {
                if (key === 'morale' || key === 'survivors') continue;

                if (choice.effect[key] < 0) {
                    let cost = Math.abs(choice.effect[key]);
                    if (state.resources[key] < cost) {
                        canAfford = false;
                    }
                }
            }
        }

        if (!canAfford) {
            btn.disabled = true;
            btn.innerText += " (Missing Resources)";
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        } else {
            btn.onclick = () => {
                applyEventEffect(choice.effect, choice.text, event.title);
                modal.classList.add('hidden');
            };
        }
        
        choicesDiv.appendChild(btn);
    });

    modal.classList.remove('hidden');
}

function applyEventEffect(effect, choiceText, eventTitle) {
    let summary = [];

    for (let key in effect) {
        if(state.resources.hasOwnProperty(key)) {
            state.resources[key] += effect[key];
            if (state.resources[key] < 0) state.resources[key] = 0;

            let sign = effect[key] > 0 ? "+" : "";
            let capKey = key.charAt(0).toUpperCase() + key.slice(1);
            summary.push(`${sign}${effect[key]} ${capKey}`);
        }
    }
    
    let resultStr = summary.length > 0 ? `(Result: ${summary.join(', ')})` : "(No effect)";
    log(`Event - ${eventTitle}, Choice: ${choiceText} ${resultStr}`, "neutral");
    
    renderUI();
}

function log(msg, type) {
    state.logQueue.push({ msg, type });
    processLogQueue();
}

let isProcessingLog = false;
function processLogQueue() {
    if (isProcessingLog || state.logQueue.length === 0) return;

    isProcessingLog = true;
    const item = state.logQueue.shift();
    
    const logPanel = document.getElementById('log-output');
    const div = document.createElement('div');
    div.className = `log-line log-${item.type}`;
    div.innerText = item.msg; 
    
    logPanel.prepend(div);
    logPanel.scrollTop = 0;

    setTimeout(() => {
        isProcessingLog = false;
        processLogQueue();
    }, 500); 
}

function getMoraleEmoji(val) {
    if (val >= 75) return "🤩";
    if (val >= 50) return "🙂";
    if (val >= 25) return "😐";
    if (val > 0) return "😨";
    return "💀";
}

function renderUI() {
    document.getElementById('day-display').innerText = `📅 Day ${state.day}`;
    document.getElementById('weather-display').innerText = state.weather.name;

    const resDiv = document.getElementById('resource-bar');
    resDiv.innerHTML = '';
    
    for(let [key, val] of Object.entries(state.resources)) {
        let icon = RES_ICONS[key];
        if (key === 'morale') icon = getMoraleEmoji(val);
        if (!icon && key === 'morale') icon = "😐";

        // FIX: Display ONLY the number for survivors (cap hidden)
        let displayVal = val;
        
        resDiv.innerHTML += `
            <div class="res-card">
                <span>${icon || ''} ${displayVal}</span>
                <label>${key}</label>
            </div>
        `;
    }

    resDiv.innerHTML += `
        <div class="res-card" style="border: 1px solid #ff7675;">
            <span style="color:#ff7675">🚑 ${state.injured}</span>
            <label style="color:#ff7675">INJURED</label>
        </div>
    `;

    const buildDiv = document.getElementById('building-list');
    buildDiv.innerHTML = '';
    for(let [key, b] of Object.entries(BUILDINGS)) {
        let costIndex = b.level;
        let currentCost = LEVEL_COSTS[costIndex] || 100;

        const canAfford = state.resources.scrap >= currentCost;
        
        let descText = "";
        if (b.level === 0) {
            descText = "Not Constructed";
        } else if (Array.isArray(b.desc)) {
            let descIndex = b.level - 1;
            if (descIndex >= b.desc.length) descIndex = b.desc.length - 1;
            descText = b.desc[descIndex];
        } else {
            descText = b.desc;
        }

        buildDiv.innerHTML += `
            <div class="list-item">
                <div>
                    <strong>${b.name} <span style="color:#6c5ce7">(Lvl ${b.level})</span></strong><br>
                    <small style="color:#888">${descText}</small>
                </div>
                <button ${canAfford ? '' : 'disabled'} onclick="upgradeBuilding('${key}')">
                    🔼 (${currentCost} ⚙️)
                </button>
            </div>
        `;
    }

    const jobDiv = document.getElementById('job-list');
    jobDiv.innerHTML = '';
    let assignedTotal = Object.values(JOBS).reduce((a, b) => a + b.count, 0);
    const unassigned = state.resources.survivors - state.injured - assignedTotal;
    
    const unassignedSpan = document.getElementById('unassigned-count');
    unassignedSpan.innerText = unassigned;
    unassignedSpan.style.color = unassigned > 0 ? '#00b894' : (unassigned === 0 ? '#666' : 'red');
    
    const endDayBtn = document.getElementById('end-day-btn');
    if (state.gameOver) {
        // Handled by modal
    } else if (unassigned < 0) {
        endDayBtn.disabled = true;
        endDayBtn.innerText = "OVER ASSIGNED!";
        endDayBtn.style.background = "#555";
    } else {
         endDayBtn.disabled = false;
         endDayBtn.innerText = "END DAY";
         endDayBtn.style.background = ""; 
    }

    for(let [key, j] of Object.entries(JOBS)) {
        jobDiv.innerHTML += `
            <div class="list-item">
                <span>${j.name}</span>
                <div class="control-group">
                    <button onclick="assignJob('${key}', -1)">-</button>
                    <span>${j.count}</span>
                    <button onclick="assignJob('${key}', 1)">+</button>
                </div>
            </div>
        `;
    }
}

// --- ACTIONS ---

window.assignJob = function(jobKey, amount) {
    if (state.gameOver) return;
    
    const job = JOBS[jobKey];
    let assignedTotal = Object.values(JOBS).reduce((a, b) => a + b.count, 0);
    const unassigned = state.resources.survivors - state.injured - assignedTotal;

    if (amount > 0 && unassigned > 0) {
        job.count++;
    } else if (amount < 0 && job.count > 0) {
        job.count--;
    }
    renderUI();
};

window.upgradeBuilding = function(key) {
    if (state.gameOver) return;
    
    const b = BUILDINGS[key];
    let costIndex = b.level;
    let currentCost = LEVEL_COSTS[costIndex] || 100;

    if (state.resources.scrap >= currentCost) {
        state.resources.scrap -= currentCost;
        b.level++;
        log(`🔨 Upgraded ${b.name} to Level ${b.level}`, "good");
        renderUI();
    }
};