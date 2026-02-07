// --- Star Canvas Animation ---
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random()
    }));
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

// --- Navigation Logic ---
window.scrollToNews = () => document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
window.scrollToAuth = () => document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });

window.scrollToPortal = (type) => {
    const targetId = type === 'agent' ? 'portal-agent' : 'portal-researcher';
    const el = document.getElementById(targetId);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transform = "scale(1.05)";
        setTimeout(() => el.style.transform = "scale(1)", 500);
    }
};

window.toggleAppearance = () => {
    document.body.classList.toggle('hud-mode');
    const btnText = document.getElementById('appearanceLabel');
    if(document.body.classList.contains('hud-mode')) {
        btnText.innerText = "HUD Active";
        document.documentElement.style.setProperty('--accent-primary', '#00ff77');
    } else {
        btnText.innerText = "HUD Mode";
        document.documentElement.style.setProperty('--accent-primary', '#7b2cbf');
    }
};

// --- Auth Logic (Calls Server API) ---
window.handleAuth = async (e, role) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.querySelector('input[type="text"], input[type="email"]').value;
    const passKey = form.querySelector('input[type="password"]').value;
    const btn = form.querySelector('button');
    const originalText = btn.innerText;

    if(!identifier || !passKey) { alert("Credentials Missing"); return; }

    btn.innerText = "SERVER UPLINK...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, role, passKey })
        });
        
        const data = await response.json();

        if (data.success) {
            btn.innerText = "ACCESS GRANTED";
            btn.style.backgroundColor = "#10b981"; // Green
            
            // Store session
            localStorage.setItem('user_token', JSON.stringify(data.data));

            setTimeout(() => {
                btn.innerText = "REDIRECTING...";
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            throw new Error("Access Denied");
        }
    } catch (err) {
        console.error(err);
        btn.innerText = "CONNECTION FAILED";
        btn.style.backgroundColor = "#ef4444"; // Red
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = "";
            btn.style.opacity = "1";
        }, 2000);
    }
};

const spaceImages = [
    "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614726365723-49cfae968603?q=80&w=600&auto=format&fit=crop"
];

const mockData = [
    { id: "1", name: "(Astra-1)", is_potentially_hazardous_asteroid: true, estimated_diameter: { meters: { estimated_diameter_max: 820 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "87000" }, miss_distance: { kilometers: "650000" } }] },
    { id: "2", name: "(Lyra-7)", is_potentially_hazardous_asteroid: false, estimated_diameter: { meters: { estimated_diameter_max: 140 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "22000" }, miss_distance: { kilometers: "9800000" } }] },
    { id: "3", name: "(Orion-9)", is_potentially_hazardous_asteroid: true, estimated_diameter: { meters: { estimated_diameter_max: 540 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "66000" }, miss_distance: { kilometers: "2100000" } }] },
    { id: "4", name: "(Nova-4)", is_potentially_hazardous_asteroid: false, estimated_diameter: { meters: { estimated_diameter_max: 90 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "18000" }, miss_distance: { kilometers: "12000000" } }] },
    { id: "5", name: "(Vanguard-5)", is_potentially_hazardous_asteroid: true, estimated_diameter: { meters: { estimated_diameter_max: 310 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "54000" }, miss_distance: { kilometers: "4000000" } }] },
    { id: "6", name: "(Helix-3)", is_potentially_hazardous_asteroid: false, estimated_diameter: { meters: { estimated_diameter_max: 60 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "14000" }, miss_distance: { kilometers: "15000000" } }] }
];

function calculateRisk(diameter, speed, isHazard, distance) {
    let score = 0;
    score += (diameter / 500) * 2;
    score += (speed / 50000) * 1;
    if(isHazard) score += 4;
    if(distance < 1000000) score += 3;
    return Math.max(1, Math.min(Math.round(score), 10));
}

function renderAsteroids(list) {
    const grid = document.getElementById('neoGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    list.forEach((obj, idx) => {
        const diameter = Math.round(obj.estimated_diameter.meters.estimated_diameter_max);
        const velocity = Math.round(obj.close_approach_data[0].relative_velocity.kilometers_per_hour);
        const distance = Math.round(obj.close_approach_data[0].miss_distance.kilometers);
        const isHazard = obj.is_potentially_hazardous_asteroid;
        const riskScore = calculateRisk(diameter, velocity, isHazard, distance);
        
        let riskColor = "text-green-400";
        let borderColor = "border-white/10";
        if(riskScore > 4) riskColor = "text-yellow-400";
        if(riskScore > 7) { riskColor = "text-red-500"; borderColor = "border-red-500/50"; }

        const cardHtml = `
            <div class="glass-card group ${borderColor}">
                <div class="relative h-48 overflow-hidden">
                    <img src="${spaceImages[idx % spaceImages.length]}" class="neo-img" alt="Asteroid Visual">
                    <div class="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/20">
                        <span class="text-[10px] uppercase font-bold tracking-widest ${riskColor}">Risk Index: ${riskScore}/10</span>
                    </div>
                    <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                        <h3 class="text-2xl font-black italic uppercase leading-none text-white">${obj.name.replace(/[()]/g, '')}</h3>
                    </div>
                </div>
                
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div class="space-y-4">
                        <div class="flex justify-between items-center pb-2 border-b border-white/5">
                            <span class="text-[10px] text-gray-500 uppercase tracking-widest"><i class="fas fa-ruler-combined mr-2"></i>Diameter</span>
                            <span class="font-mono text-sm font-bold text-gray-300">${diameter} m</span>
                        </div>
                        <div class="flex justify-between items-center pb-2 border-b border-white/5">
                            <span class="text-[10px] text-gray-500 uppercase tracking-widest"><i class="fas fa-tachometer-alt mr-2"></i>Velocity</span>
                            <span class="font-mono text-sm font-bold text-gray-300">${velocity.toLocaleString()} km/h</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] text-gray-500 uppercase tracking-widest"><i class="fas fa-crosshairs mr-2"></i>Miss Distance</span>
                            <span class="font-mono text-sm font-bold text-white">${(distance/1000000).toFixed(2)}M km</span>
                        </div>
                        <div class="mt-4">
                            <div class="flex justify-between text-[9px] uppercase font-bold mb-1 text-gray-400">
                                <span>Threat Analysis</span>
                                <span>Level ${riskScore}</span>
                            </div>
                            <div class="risk-meter-bg">
                                <div class="risk-meter-fill ${riskScore > 7 ? 'bg-red-500' : (riskScore > 3 ? 'bg-yellow-400' : 'bg-green-500')}" style="width: ${riskScore * 10}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

async function initData() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) dateDisplay.innerText = dateStr;

    try {
        const res = await fetch(`/api/neo-feed?start_date=${dateStr}`);
        
        if (!res.ok) throw new Error("API_FAIL");
        const data = await res.json();
        const todayObjects = data.near_earth_objects[dateStr] || [];
        
        if(todayObjects.length === 0) throw new Error("NO_OBJECTS");
        todayObjects.sort((a,b) => parseFloat(a.close_approach_data[0].miss_distance.kilometers) - parseFloat(b.close_approach_data[0].miss_distance.kilometers));
        renderAsteroids(todayObjects.slice(0, 6));
    } catch (error) {
        console.warn("NASA API Unavailable (CORS/Rate Limit). Switching to Simulation Mode.");
        const badge = document.getElementById('statusBadge');
        if (badge) {
            badge.querySelector('span.text-xs').innerText = "Simulated Data Feed";
            badge.querySelector('span.bg-green-500').classList.remove('bg-green-500');
            badge.querySelector('span.bg-green-500').classList.add('bg-yellow-500');
        }
        renderAsteroids(mockData);
    }
}

window.addEventListener('load', () => {
    initStars();
    animateStars();
    initData();
});
window.addEventListener('resize', initStars);
