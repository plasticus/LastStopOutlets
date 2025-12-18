const DefenseGame = {
    canvas: null,
    ctx: null,
    active: false,
    interval: null,
    
    // Game State
    wave: 1,
    baseMaxHP: 100,
    baseHP: 100,
    enemies: [],
    bullets: [],
    survivors: [], 
    spawnTimer: 0,
    waveActive: false,
    enemiesToSpawn: 0,
    
    // Mouse Tracking
    mouse: { x: 400, y: 250 }, // Default center
    
    // Config calculated from main game state
    damage: 1,
    fireRate: 60,
    critChance: 0,
    
    init: function() {
        this.canvas = document.getElementById('defense-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Track Mouse Movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Touch support for mobile (Simple tap to aim)
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Stop scrolling
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
        }, { passive: false });
    },

    setup: function() {
        // 1. Calculate Stats
        this.baseMaxHP = 100 + (BUILDINGS.security.level * 50);
        this.baseHP = this.baseMaxHP;

        let weaponBonus = state.resources.weapons * 0.5;
        this.damage = 2 + weaponBonus;

        this.critChance = BUILDINGS.watchtower.level * 0.05;

        let speedBonus = state.resources.morale * 0.5;
        this.fireRate = Math.max(15, 60 - speedBonus);

        // 2. Place Survivors (The Towers)
        this.survivors = [];
        let fighterCount = state.resources.survivors - state.injured;
        if (fighterCount < 1) fighterCount = 1; 

        let spacing = this.canvas.height / (fighterCount + 1);
        for(let i=1; i<=fighterCount; i++) {
            // 50% split: Even numbers = Manual, Odd = Auto
            let isManual = (i % 2 === 0);
            
            this.survivors.push({ 
                x: 40, 
                y: spacing * i, 
                cooldown: Math.random() * this.fireRate,
                mode: isManual ? 'manual' : 'auto' // Assign Mode
            });
        }

        // Reset Waves & Button
        this.wave = 1;
        this.enemies = [];
        this.bullets = [];
        
        let btn = document.getElementById('start-wave-btn');
        btn.classList.remove('hidden');
        btn.innerText = "START WAVE 1";
        
        document.getElementById('defense-overlay').classList.remove('hidden');
        this.updateUI();
        
        this.active = true;
        this.interval = requestAnimationFrame(() => this.loop());
    },

    startNextWave: function() {
        if (this.wave > 3) return;
        
        this.waveActive = true;
        document.getElementById('start-wave-btn').classList.add('hidden');
        
        // --- SWARM LOGIC ---
        // Base Count: 10, 20, 35
        let baseCount = 10 + ((this.wave - 1) * 10) + (this.wave === 3 ? 5 : 0);
        
        // Day Scaling: +0.8 enemies per day (Day 50 = +40 enemies)
        let hordeBonus = Math.floor(state.day * 0.8);
        
        this.enemiesToSpawn = baseCount + hordeBonus;
        
        // Spawn Rate: Speed up as game progresses
        this.spawnRate = Math.max(10, 70 - (this.wave * 15) - (state.day * 0.5)); 
    },

    loop: function() {
        if (!this.active) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.waveActive) {
            this.updateLogic();
        }
        
        this.draw();
        
        if (this.active) requestAnimationFrame(() => this.loop());
    },

    updateLogic: function() {
        // --- 1. Spawning ---
        if (this.enemiesToSpawn > 0) {
            this.spawnTimer++;
            if (this.spawnTimer >= this.spawnRate) {
                this.spawnEnemy();
                this.spawnTimer = 0;
            }
        } else if (this.enemies.length === 0) {
            this.endWave();
            return;
        }

        // --- 2. Survivors Shooting ---
        this.survivors.forEach(s => {
            if (s.cooldown > 0) s.cooldown--;
            
            let target = null;

            if (s.mode === 'manual') {
                target = { x: this.mouse.x, y: this.mouse.y };
            } else {
                let closest = null;
                let minDist = 9999;
                this.enemies.forEach(e => {
                    let dx = e.x - s.x;
                    let dy = e.y - s.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = e;
                    }
                });
                if (closest) target = { x: closest.x + 15, y: closest.y + 15 }; 
            }

            if (s.cooldown <= 0) {
                if (s.mode === 'manual' || (s.mode === 'auto' && this.enemies.length > 0)) {
                    this.fireBullet(s, target);
                    s.cooldown = this.fireRate;
                }
            }
        });

        // --- 3. Bullets Move & Hit ---
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.x += b.vx;
            b.y += b.vy;
            
            let hit = false;
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                let e = this.enemies[j];
                if (b.x > e.x && b.x < e.x + 30 && b.y > e.y && b.y < e.y + 30) {
                    this.hitEnemy(e, b.isCrit);
                    hit = true;
                    break; 
                }
            }
            
            if (hit || b.x > this.canvas.width || b.x < 0 || b.y > this.canvas.height || b.y < 0) {
                this.bullets.splice(i, 1);
            }
        }

        // --- 4. Enemies Move ---
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let e = this.enemies[i];
            e.x -= e.speed; 
            
            if (e.x <= 50) { 
                this.damageBase(10);
                this.enemies.splice(i, 1);
            }
        }
        
        this.updateUI();
    },

    spawnEnemy: function() {
        let hp = 4 + (this.wave * 2);
        let dayBonusSpeed = state.day * 0.02;
        let speed = 1.5 + (this.wave * 0.2) + dayBonusSpeed; 
        
        this.enemies.push({
            x: this.canvas.width, 
            y: Math.random() * (this.canvas.height - 40) + 20, 
            hp: hp,
            maxHp: hp,
            speed: speed
        });
        this.enemiesToSpawn--;
    },

    fireBullet: function(survivor, target) {
        let dx = target.x - survivor.x;
        let dy = target.y - survivor.y;
        let angle = Math.atan2(dy, dx);
        
        let speed = 12;

        this.bullets.push({
            x: survivor.x,
            y: survivor.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            isCrit: Math.random() < this.critChance,
            color: survivor.mode === 'manual' ? '#0984e3' : '#ffeaa7' 
        });
    },

    hitEnemy: function(enemy, isCrit) {
        let dmg = this.damage;
        if (isCrit) dmg *= 2;
        
        enemy.hp -= dmg;
        if (enemy.hp <= 0) {
            let idx = this.enemies.indexOf(enemy);
            if (idx > -1) this.enemies.splice(idx, 1);
        }
    },

    damageBase: function(amount) {
        this.baseHP -= amount;
        if (this.baseHP <= 0) {
            this.baseHP = 0;
            this.breach();
        }
    },

    breach: function() {
        state.injured++;
        this.baseHP = 50; 
        console.log("BREACH! Survivor Injured.");
        
        if (state.injured >= state.resources.survivors) {
            this.active = false;
            alert("The line has fallen. All survivors are injured.");
            state.gameOver = true;
            this.close();
            triggerGameOver(false);
        }
    },

    endWave: function() {
        this.waveActive = false;
        this.wave++;
        
        if (this.wave > 3) {
            this.victory();
        } else {
            let btn = document.getElementById('start-wave-btn');
            btn.classList.remove('hidden');
            btn.innerText = "START WAVE " + this.wave;
        }
    },

    victory: function() {
        this.active = false;
        let rewardScrap = (state.resources.survivors - state.injured) * 6;
        let rewardFood = (state.resources.survivors - state.injured) * 3;
        
        state.resources.scrap += rewardScrap;
        state.resources.food += rewardFood;
        
        alert(`DEFENSE SUCCESSFUL!\nLoot Secured:\n+${rewardScrap} Scrap\n+${rewardFood} Food`);
        
        log(`⚔️ Defense Successful. Found ${rewardScrap} Scrap, ${rewardFood} Food.`, "good");
        this.close();

        // --- BUG FIX: TRIGGER NEXT DAY ---
        if (window.afterDefense) {
            window.afterDefense();
        }
        // ---------------------------------
    },

    close: function() {
        document.getElementById('defense-overlay').classList.add('hidden');
        renderUI();
    },

    draw: function() {
        let ctx = this.ctx;
        
        ctx.fillStyle = "#2d3436";
        ctx.fillRect(0, 0, 60, this.canvas.height);
        
        ctx.strokeStyle = "#0984e3";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(60, 0);
        ctx.lineTo(60, this.canvas.height);
        ctx.stroke();

        this.survivors.forEach(s => {
            ctx.fillStyle = s.mode === 'manual' ? '#0984e3' : '#00b894';
            ctx.beginPath();
            ctx.arc(s.x, s.y, 12, 0, Math.PI * 2);
            ctx.fill();
            
            if (s.mode === 'manual') {
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

        this.enemies.forEach(e => {
            ctx.fillStyle = "#ff7675";
            ctx.fillRect(e.x, e.y, 30, 30);
            
            ctx.fillStyle = "red";
            ctx.fillRect(e.x, e.y - 6, 30, 4);
            ctx.fillStyle = "#00b894";
            ctx.fillRect(e.x, e.y - 6, 30 * (e.hp / e.maxHp), 4);
        });

        ctx.lineWidth = 3;
        this.bullets.forEach(b => {
            ctx.strokeStyle = b.color || '#ffeaa7';
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x - (b.vx * 1.5), b.y - (b.vy * 1.5)); 
            ctx.stroke();
            
            if (b.isCrit) {
                ctx.fillStyle = "white";
                ctx.fillRect(b.x, b.y, 4, 4);
            }
        });

        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.mouse.x - 10, this.mouse.y);
        ctx.lineTo(this.mouse.x + 10, this.mouse.y);
        ctx.moveTo(this.mouse.x, this.mouse.y - 10);
        ctx.lineTo(this.mouse.x, this.mouse.y + 10);
        ctx.stroke();
    },
    
    updateUI: function() {
        document.getElementById('wave-num').innerText = Math.min(this.wave, 3);
        let pct = Math.floor((this.baseHP / this.baseMaxHP) * 100);
        document.getElementById('wall-hp').innerText = Math.max(0, pct);
    }
};

window.addEventListener('load', () => DefenseGame.init());