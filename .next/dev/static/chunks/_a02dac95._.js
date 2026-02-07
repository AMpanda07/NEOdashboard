(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/visualization/CesiumAsteroidVis.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CesiumAsteroidVis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// Planetary orbital data (semi-major axis in AU, eccentricity, inclination in degrees)
const PLANET_DATA = [
    {
        name: 'Mercury',
        a: 0.387,
        e: 0.206,
        i: 7.0,
        color: '#8C7853',
        size: 4879
    },
    {
        name: 'Venus',
        a: 0.723,
        e: 0.007,
        i: 3.4,
        color: '#FFC649',
        size: 12104
    },
    {
        name: 'Earth',
        a: 1.000,
        e: 0.017,
        i: 0.0,
        color: '#4A90E2',
        size: 12742
    },
    {
        name: 'Mars',
        a: 1.524,
        e: 0.093,
        i: 1.9,
        color: '#E27B58',
        size: 6779
    },
    {
        name: 'Jupiter',
        a: 5.203,
        e: 0.048,
        i: 1.3,
        color: '#C88B3A',
        size: 139820
    },
    {
        name: 'Saturn',
        a: 9.537,
        e: 0.054,
        i: 2.5,
        color: '#FAD5A5',
        size: 116460
    },
    {
        name: 'Uranus',
        a: 19.191,
        e: 0.047,
        i: 0.8,
        color: '#4FD0E7',
        size: 50724
    },
    {
        name: 'Neptune',
        a: 30.069,
        e: 0.009,
        i: 1.8,
        color: '#4166F5',
        size: 49244
    }
];
const AU_TO_METERS = 149597870700;
const SCALE_FACTOR = 0.00000001;
function CesiumAsteroidVis({ neos }) {
    _s();
    const cesiumContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const viewerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [speed, setSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [cesiumLoaded, setCesiumLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load Cesium script dynamically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CesiumAsteroidVis.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Check if already loaded
            if (window.Cesium) {
                setCesiumLoaded(true);
                return;
            }
            // Add CSS
            const link = document.createElement('link');
            link.href = 'https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Widgets/widgets.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            // Add script
            const script = document.createElement('script');
            script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Cesium.js';
            script.async = true;
            script.onload = ({
                "CesiumAsteroidVis.useEffect": ()=>setCesiumLoaded(true)
            })["CesiumAsteroidVis.useEffect"];
            script.onerror = ({
                "CesiumAsteroidVis.useEffect": ()=>setError('Failed to load 3D visualization library')
            })["CesiumAsteroidVis.useEffect"];
            document.head.appendChild(script);
            return ({
                "CesiumAsteroidVis.useEffect": ()=>{
                // Cleanup
                }
            })["CesiumAsteroidVis.useEffect"];
        }
    }["CesiumAsteroidVis.useEffect"], []);
    // Initialize Cesium viewer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CesiumAsteroidVis.useEffect": ()=>{
            if (!cesiumLoaded || !cesiumContainerRef.current) return;
            const Cesium = window.Cesium;
            if (!Cesium) return;
            try {
                // Set access token (demo token for basic use)
                Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjQ0NDdmZi03MWE2LTQxZDctOThmNy1jZjgzMWQzZTlkNTkiLCJpZCI6MjM5NzM3LCJpYXQiOjE3MjY0ODc1ODF9.Hn4AxQg7BSPBF_Xow0c69Cl8E9tZvI-gJcZ9V4vxnJ4';
                // Create viewer with minimal settings for reliability
                const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
                    sceneMode: Cesium.SceneMode.SCENE3D,
                    infoBox: true,
                    selectionIndicator: true,
                    baseLayerPicker: false,
                    geocoder: false,
                    homeButton: false,
                    sceneModePicker: false,
                    timeline: false,
                    navigationHelpButton: false,
                    animation: false,
                    skyAtmosphere: false,
                    shadows: false,
                    shouldAnimate: true
                });
                // Configure scene
                viewer.scene.globe.show = false;
                viewer.scene.backgroundColor = Cesium.Color.BLACK;
                viewer.scene.sun.show = false;
                viewer.scene.moon.show = false;
                viewerRef.current = viewer;
                // Add Sun (center)
                const sunSize = 30;
                viewer.entities.add({
                    name: 'Sun',
                    position: Cesium.Cartesian3.ZERO,
                    point: {
                        pixelSize: sunSize,
                        color: Cesium.Color.YELLOW,
                        outlineColor: Cesium.Color.ORANGE,
                        outlineWidth: 3
                    },
                    label: {
                        text: 'SUN',
                        font: 'bold 14px sans-serif',
                        fillColor: Cesium.Color.YELLOW,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2,
                        pixelOffset: new Cesium.Cartesian2(0, -40),
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0, 0, 0, 0.7)
                    }
                });
                // Add planets
                PLANET_DATA.forEach({
                    "CesiumAsteroidVis.useEffect": (planet, index)=>{
                        const orbitRadius = planet.a * 100; // Scale for visibility
                        const planetAngle = index * 45 * Math.PI / 180; // Spread planets
                        // Orbital path
                        const orbitPoints = [];
                        for(let i = 0; i <= 360; i += 5){
                            const angleRad = i * Math.PI / 180;
                            orbitPoints.push(new Cesium.Cartesian3(orbitRadius * Math.cos(angleRad), orbitRadius * Math.sin(angleRad), 0));
                        }
                        viewer.entities.add({
                            polyline: {
                                positions: orbitPoints,
                                width: 1,
                                material: new Cesium.Color.fromCssColorString(planet.color).withAlpha(0.3)
                            }
                        });
                        // Planet
                        const planetX = orbitRadius * Math.cos(planetAngle);
                        const planetY = orbitRadius * Math.sin(planetAngle);
                        const planetPixelSize = Math.max(6, Math.log10(planet.size) * 3);
                        viewer.entities.add({
                            name: planet.name,
                            position: new Cesium.Cartesian3(planetX, planetY, 0),
                            point: {
                                pixelSize: planetPixelSize,
                                color: Cesium.Color.fromCssColorString(planet.color)
                            },
                            label: {
                                text: planet.name.toUpperCase(),
                                font: '11px sans-serif',
                                fillColor: Cesium.Color.WHITE,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                outlineColor: Cesium.Color.BLACK,
                                outlineWidth: 2,
                                pixelOffset: new Cesium.Cartesian2(0, -15),
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0, 0, 0, 0.7),
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 2000)
                            },
                            description: `<div style="padding:10px;font-family:sans-serif;">
                        <h3>${planet.name}</h3>
                        <p>Distance from Sun: ${planet.a} AU</p>
                        <p>Diameter: ${planet.size.toLocaleString()} km</p>
                    </div>`
                        });
                    }
                }["CesiumAsteroidVis.useEffect"]);
                // Add asteroids
                neos.forEach({
                    "CesiumAsteroidVis.useEffect": (neo)=>{
                        const distanceAU = parseFloat(neo.close_approach_data[0]?.miss_distance.astronomical || "0.1");
                        const isHazardous = neo.is_potentially_hazardous_asteroid;
                        const diameter = neo.estimated_diameter.meters.estimated_diameter_max;
                        // Position in NEO belt (between Mars and Jupiter)
                        const neoRadius = 150 + distanceAU * 50; // Scale for visibility
                        const neoAngle = Math.random() * Math.PI * 2;
                        const neoZ = (Math.random() - 0.5) * 20;
                        const x = neoRadius * Math.cos(neoAngle);
                        const y = neoRadius * Math.sin(neoAngle);
                        viewer.entities.add({
                            name: neo.name.replace(/[()]/g, ''),
                            position: new Cesium.Cartesian3(x, y, neoZ),
                            point: {
                                pixelSize: Math.max(4, Math.log10(diameter) * 2),
                                color: isHazardous ? Cesium.Color.RED : Cesium.Color.CYAN,
                                outlineColor: isHazardous ? Cesium.Color.WHITE : Cesium.Color.TRANSPARENT,
                                outlineWidth: 1
                            },
                            label: {
                                text: neo.name.replace(/[()]/g, ''),
                                font: '10px sans-serif',
                                fillColor: isHazardous ? Cesium.Color.RED : Cesium.Color.CYAN,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                outlineColor: Cesium.Color.BLACK,
                                outlineWidth: 2,
                                pixelOffset: new Cesium.Cartesian2(10, 0),
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0, 0, 0, 0.8),
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 500)
                            },
                            description: `<div style="font-family:sans-serif;padding:10px;">
                        <h3>${neo.name}</h3>
                        <p><strong>Diameter:</strong> ${diameter.toFixed(1)} m</p>
                        <p><strong>Distance:</strong> ${parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
                        <p><strong>Velocity:</strong> ${parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
                        <p><strong>Status:</strong> ${isHazardous ? '⚠️ HAZARDOUS' : '✓ Safe'}</p>
                    </div>`
                        });
                    }
                }["CesiumAsteroidVis.useEffect"]);
                // Set initial camera view
                viewer.camera.setView({
                    destination: new Cesium.Cartesian3(0, -800, 400),
                    orientation: {
                        heading: 0,
                        pitch: Cesium.Math.toRadians(-45),
                        roll: 0
                    }
                });
                // Zoom to show all entities
                viewer.zoomTo(viewer.entities);
            } catch (err) {
                console.error('Cesium initialization error:', err);
                setError('Error initializing 3D view');
            }
            return ({
                "CesiumAsteroidVis.useEffect": ()=>{
                    if (viewerRef.current && !viewerRef.current.isDestroyed()) {
                        viewerRef.current.destroy();
                    }
                }
            })["CesiumAsteroidVis.useEffect"];
        }
    }["CesiumAsteroidVis.useEffect"], [
        cesiumLoaded,
        neos
    ]);
    // Handle playback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CesiumAsteroidVis.useEffect": ()=>{
            if (viewerRef.current?.clock) {
                viewerRef.current.clock.shouldAnimate = isPlaying;
                viewerRef.current.clock.multiplier = speed;
            }
        }
    }["CesiumAsteroidVis.useEffect"], [
        isPlaying,
        speed
    ]);
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center bg-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-alert-red text-xl font-bold mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 284,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/60",
                        children: "Please refresh the page to try again"
                    }, void 0, false, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 285,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                lineNumber: 283,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
            lineNumber: 282,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full bg-black",
        children: [
            !cesiumLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-black z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-cyan-glow border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                            lineNumber: 297,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-cyan-glow font-bold uppercase tracking-widest",
                            children: "Loading Solar System..."
                        }, void 0, false, {
                            fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                            lineNumber: 298,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                    lineNumber: 296,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                lineNumber: 295,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 z-30 bg-black/90 backdrop-blur-md p-5 rounded-xl border border-white/10 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-bold uppercase text-white tracking-wider",
                        children: "Controls"
                    }, void 0, false, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 305,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsPlaying(!isPlaying),
                                className: "px-4 py-2 bg-white text-black font-bold text-xs uppercase rounded hover:bg-gray-100 transition-colors",
                                children: isPlaying ? 'Pause' : 'Play'
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 308,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: speed,
                                onChange: (e)=>setSpeed(Number(e.target.value)),
                                className: "px-3 py-2 bg-white/10 text-white text-xs font-bold rounded border border-white/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: 1,
                                        children: "1x"
                                    }, void 0, false, {
                                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                        lineNumber: 320,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: 10,
                                        children: "10x"
                                    }, void 0, false, {
                                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                        lineNumber: 321,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: 100,
                                        children: "100x"
                                    }, void 0, false, {
                                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                        lineNumber: 322,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 315,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 307,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] text-white/50 uppercase tracking-wider space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "🖱️ Drag to rotate"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 327,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "🔍 Scroll to zoom"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 328,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "👆 Click object for info"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 329,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 326,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                lineNumber: 304,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 z-30 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-bold uppercase text-white tracking-wider mb-3",
                        children: "Legend"
                    }, void 0, false, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 335,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-yellow-400"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 337,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Sun"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 338,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 336,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-[#4A90E2]"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 341,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Planets"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 342,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 340,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-cyan-400"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 345,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Safe Asteroids"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 346,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 344,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-red-500"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 349,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Hazardous"
                            }, void 0, false, {
                                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                                lineNumber: 350,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                        lineNumber: 348,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                lineNumber: 334,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cesiumContainerRef,
                className: "w-full h-full",
                style: {
                    minHeight: '100vh'
                }
            }, void 0, false, {
                fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
                lineNumber: 355,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/visualization/CesiumAsteroidVis.tsx",
        lineNumber: 292,
        columnNumber: 9
    }, this);
}
_s(CesiumAsteroidVis, "bIc63RxFbsPmfD5jVuf5pdCd9pI=");
_c = CesiumAsteroidVis;
var _c;
__turbopack_context__.k.register(_c, "CesiumAsteroidVis");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/visualizer/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisualizerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$visualization$2f$CesiumAsteroidVis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/visualization/CesiumAsteroidVis.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function VisualizerPage() {
    _s();
    const [neos, setNeos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualizerPage.useEffect": ()=>{
            const fetchNeos = {
                "VisualizerPage.useEffect.fetchNeos": async ()=>{
                    try {
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/neos');
                        // NASA API structure: near_earth_objects is an object with date keys
                        // We need to flatten this to get a list of all asteroids
                        const rawData = res.data.near_earth_objects;
                        const flattened = Object.values(rawData).flat();
                        setNeos(flattened);
                    } catch (err) {
                        console.error("Failed to fetch NEOs", err);
                        setError("Failed to load trajectory data. Please check your connection and try again.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["VisualizerPage.useEffect.fetchNeos"];
            fetchNeos();
        }
    }["VisualizerPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "w-screen h-screen relative bg-black overflow-hidden flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "pointer-events-auto flex items-center group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-black/60 border border-white/10 rounded-full backdrop-blur-md group-hover:border-cyan-glow/50 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-6 h-6 text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/visualizer/page.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-black text-white tracking-widest uppercase mb-1 drop-shadow-md",
                                children: "Trajectory Engine"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 45,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-cyan-glow font-bold text-xs uppercase tracking-[0.2em]",
                                children: "Live Near-Earth Object Visualizer"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizer/page.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 left-8 z-20 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white w-64 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xs font-bold uppercase text-void-gray mb-3 tracking-wider",
                        children: "System Status"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-bold",
                                children: "Objects Tracked"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 58,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-cyan-glow font-mono",
                                children: neos.length
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 59,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px bg-white/10 my-2"
                    }, void 0, false, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-alert-red"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "Hazardous Object"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 63,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-[#a9a9a9]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "Non-Hazardous"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-[#4361ee]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "Earth"
                                    }, void 0, false, {
                                        fileName: "[project]/app/visualizer/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizer/page.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative z-10 w-full h-full",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center bg-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "w-12 h-12 text-cyan-glow animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 82,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-white text-sm uppercase tracking-widest absolute top-1/2 pt-10",
                                children: "Initializing Orbit..."
                            }, void 0, false, {
                                fileName: "[project]/app/visualizer/page.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center bg-black",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-12 h-12 text-alert-red mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/visualizer/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white text-lg font-bold",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/visualizer/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/visualizer/page.tsx",
                            lineNumber: 89,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 88,
                        columnNumber: 21
                    }, this),
                    !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$visualization$2f$CesiumAsteroidVis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        neos: neos
                    }, void 0, false, {
                        fileName: "[project]/app/visualizer/page.tsx",
                        lineNumber: 97,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/visualizer/page.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/visualizer/page.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_s(VisualizerPage, "x4D/il0JIVAtRjSSSl+YkHeZgrA=");
_c = VisualizerPage;
var _c;
__turbopack_context__.k.register(_c, "VisualizerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a02dac95._.js.map