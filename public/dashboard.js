// --- Star Canvas (Reused) ---
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.1,
        opacity: Math.random() * 0.5 + 0.1
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

// --- App Logic ---
let rawData = [];
let currentFilter = {
    hazard: 'all',
    risk: 'all',
    minSize: 0,
    maxSpeed: 150000,
    maxDist: 20000000 // 20M km default
};

// Check Auth
const userToken = localStorage.getItem('user_token');
if (!userToken) {
    window.location.href = 'index.html';
} else {
    try {
        const userData = JSON.parse(userToken);
        document.getElementById('agentIdDisplay').innerText = userData.identifier || "Unknown";
    } catch(e) {
        console.error("Auth Parse Error");
    }
}

// Global Logout
window.logout = () => {
    localStorage.removeItem('user_token');
    window.location.href = 'index.html';
};

// Hazard Filter UI
window.setHazardFilter = (type) => {
    currentFilter.hazard = type;
    document.querySelectorAll('.filter-chip[data-group="hazard"]').forEach(btn => btn.classList.remove('active'));
    
    if(type === 'all') document.getElementById('btnAll').classList.add('active');
    if(type === 'safe') document.getElementById('btnSafe').classList.add('active');
    if(type === 'danger') document.getElementById('btnDanger').classList.add('active');
    
    applyFilters();
};

// Risk Filter UI
window.setRiskFilter = (tier) => {
    currentFilter.risk = tier;
    document.querySelectorAll('.filter-chip[data-group="risk"]').forEach(btn => btn.classList.remove('active'));

    if(tier === 'all') document.getElementById('btnRiskAll').classList.add('active');
    if(tier === 'low') document.getElementById('btnRiskLow').classList.add('active');
    if(tier === 'medium') document.getElementById('btnRiskMedium').classList.add('active');
    if(tier === 'high') document.getElementById('btnRiskHigh').classList.add('active');
    if(tier === 'critical') document.getElementById('btnRiskCritical').classList.add('active');

    applyFilters();
};

// Sliders Listeners
const rangeSize = document.getElementById('rangeSize');
const rangeSpeed = document.getElementById('rangeSpeed');
const rangeDist = document.getElementById('rangeDist');
const filterDate = document.getElementById('filterDate');

rangeSize.addEventListener('input', (e) => {
    currentFilter.minSize = parseInt(e.target.value);
    document.getElementById('valSize').innerText = `${currentFilter.minSize} m`;
    applyFilters();
});

rangeSpeed.addEventListener('input', (e) => {
    currentFilter.maxSpeed = parseInt(e.target.value);
    document.getElementById('valSpeed').innerText = `< ${parseInt(currentFilter.maxSpeed).toLocaleString()} km/h`;
    applyFilters();
});

rangeDist.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    currentFilter.maxDist = val * 1000000;
    document.getElementById('valDist').innerText = `< ${val}M km`;
    applyFilters();
});

filterDate.addEventListener('change', (e) => {
    fetchData(e.target.value);
});

// Calculate Risk (Reused from script.js)
function calculateRisk(diameter, speed, isHazard, distance) {
    let score = 0;
    score += (diameter / 500) * 2; 
    score += (speed / 50000) * 1;
    if(isHazard) score += 4;
    if(distance < 1000000) score += 3;
    return Math.max(1, Math.min(Math.round(score), 10));
}

function renderGrid(data) {
    const grid = document.getElementById('dashboardGrid');
    document.getElementById('resultCount').innerText = data.length;
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10 font-mono">No objects match current filter criteria.</div>`;
        return;
    }

    data.forEach(obj => {
        const diameter = Math.round(obj.estimated_diameter.meters.estimated_diameter_max);
        const velocity = Math.round(obj.close_approach_data[0].relative_velocity.kilometers_per_hour);
        const distance = Math.round(obj.close_approach_data[0].miss_distance.kilometers);
        const isHazard = obj.is_potentially_hazardous_asteroid;
        const riskScore = calculateRisk(diameter, velocity, isHazard, distance);

        let riskColor = "text-green-400";
        let borderColor = "border-white/10";
        if(riskScore > 4) riskColor = "text-yellow-400";
        if(riskScore > 7) { riskColor = "text-red-500"; borderColor = "border-red-500/50"; }

        // Determine image based on size/hazard roughly
        const imgIndex = (parseInt(obj.id) % 6) + 1; // simple hash for consistent image
        
        const card = `
            <div class="bg-white/5 border ${borderColor} rounded-xl overflow-hidden hover:scale-[1.02] transition duration-300 flex flex-col backdrop-blur-sm group">
                <div class="h-32 bg-black relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400&auto=format&fit=crop" 
                         class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500" 
                         style="filter: hue-rotate(${imgIndex * 40}deg)">
                    <div class="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-[9px] font-black uppercase tracking-widest ${riskColor}">
                        Risk Analysis: ${riskScore}/10
                    </div>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-xl font-black italic text-white">${obj.name.replace(/[()]/g, '')}</h4>
                        ${isHazard ? '<i class="fas fa-exclamation-triangle text-red-500" title="Hazardous"></i>' : '<i class="fas fa-check-circle text-green-500" title="Safe"></i>'}
                    </div>
                    
                    <div class="space-y-2 text-xs text-gray-400 font-mono flex-1">
                        <div class="flex justify-between">
                            <span>DIA:</span> <span class="text-white">${diameter} m</span>
                        </div>
                        <div class="flex justify-between">
                            <span>VEL:</span> <span class="text-white">${velocity.toLocaleString()} km/h</span>
                        </div>
                        <div class="flex justify-between">
                            <span>DST:</span> <span class="text-white">${(distance/1000000).toFixed(2)}M km</span>
                        </div>
                    </div>

                    <button class="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest transition">
                        View Trajectory
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function applyFilters() {
    const filtered = rawData.filter(obj => {
        const diameter = obj.estimated_diameter.meters.estimated_diameter_max;
        const velocity = parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour);
        const distance = parseFloat(obj.close_approach_data[0].miss_distance.kilometers);
        const isHazard = obj.is_potentially_hazardous_asteroid;
        const riskScore = calculateRisk(diameter, velocity, isHazard, distance);

        // Size Filter
        if (diameter < currentFilter.minSize) return false;

        // Speed Filter
        if (velocity > currentFilter.maxSpeed) return false;

        // Distance Filter
        if (distance > currentFilter.maxDist) return false;

        // Hazard Filter
        if (currentFilter.hazard === 'safe' && isHazard) return false;
        if (currentFilter.hazard === 'danger' && !isHazard) return false;

        // Risk Tier Filter
        if (currentFilter.risk === 'low' && riskScore > 3) return false;
        if (currentFilter.risk === 'medium' && (riskScore < 4 || riskScore > 6)) return false;
        if (currentFilter.risk === 'high' && (riskScore < 7 || riskScore > 8)) return false;
        if (currentFilter.risk === 'critical' && riskScore < 9) return false;

        return true;
    });

    renderGrid(filtered);
}

async function fetchData(dateStr) {
    const grid = document.getElementById('dashboardGrid');
    grid.innerHTML = `<div class="col-span-full py-20 text-center"><i class="fas fa-satellite fa-spin text-2xl text-purple-500"></i><p class="mt-2 text-xs uppercase tracking-widest text-gray-500">Retrieving Telemetry...</p></div>`;

    try {
        const res = await fetch(`/api/neo-feed?start_date=${dateStr}`);
        if (!res.ok) throw new Error("API_FAIL");
        const data = await res.json();
        rawData = data.near_earth_objects[dateStr] || [];
        applyFilters(); // Initial render with filters
    } catch (e) {
        console.warn("API Fail, using mock");
        // Mock data fallback from script.js logic, customized for dashboard
        rawData = [
            { id: "1", name: "(Mock 1)", is_potentially_hazardous_asteroid: true, estimated_diameter: { meters: { estimated_diameter_max: 300 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "45000" }, miss_distance: { kilometers: "5000000" } }] },
            { id: "2", name: "(Mock 2)", is_potentially_hazardous_asteroid: false, estimated_diameter: { meters: { estimated_diameter_max: 120 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "22000" }, miss_distance: { kilometers: "12000000" } }] },
            { id: "3", name: "(Mock 3)", is_potentially_hazardous_asteroid: true, estimated_diameter: { meters: { estimated_diameter_max: 800 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "89000" }, miss_distance: { kilometers: "500000" } }] },
            { id: "4", name: "(Mock 4)", is_potentially_hazardous_asteroid: false, estimated_diameter: { meters: { estimated_diameter_max: 50 } }, close_approach_data: [{ relative_velocity: { kilometers_per_hour: "15000" }, miss_distance: { kilometers: "1000000" } }] },
        ];
        applyFilters();
    }
}

// Init
window.addEventListener('load', () => {
    initStars();
    animateStars();
    
    // Set today's date in picker
    const today = new Date().toISOString().split('T')[0];
    filterDate.value = today;
    
    fetchData(today);
});
window.addEventListener('resize', initStars);
