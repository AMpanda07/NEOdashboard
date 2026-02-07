"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// Types for asteroid data
type AsteroidData = {
    id: string;
    name: string;
    estimated_diameter: {
        meters: {
            estimated_diameter_max: number;
        };
    };
    close_approach_data: Array<{
        miss_distance: {
            kilometers: string;
            astronomical: string;
        };
        relative_velocity: {
            kilometers_per_hour: string;
        };
        close_approach_date_full: string;
    }>;
    is_potentially_hazardous_asteroid: boolean;
};

interface CesiumAsteroidVisProps {
    neos: AsteroidData[];
}

// Planetary orbital data (semi-major axis in AU, eccentricity, inclination in degrees)
const PLANET_DATA = [
    { name: 'Mercury', a: 0.387, e: 0.206, i: 7.0, color: '#8C7853', size: 4879 },
    { name: 'Venus', a: 0.723, e: 0.007, i: 3.4, color: '#FFC649', size: 12104 },
    { name: 'Earth', a: 1.000, e: 0.017, i: 0.0, color: '#4A90E2', size: 12742 },
    { name: 'Mars', a: 1.524, e: 0.093, i: 1.9, color: '#E27B58', size: 6779 },
    { name: 'Jupiter', a: 5.203, e: 0.048, i: 1.3, color: '#C88B3A', size: 139820 },
    { name: 'Saturn', a: 9.537, e: 0.054, i: 2.5, color: '#FAD5A5', size: 116460 },
    { name: 'Uranus', a: 19.191, e: 0.047, i: 0.8, color: '#4FD0E7', size: 50724 },
    { name: 'Neptune', a: 30.069, e: 0.009, i: 1.8, color: '#4166F5', size: 49244 }
];

const AU_TO_METERS = 149597870700;
const SCALE_FACTOR = 0.00000001;

export default function CesiumAsteroidVis({ neos }: CesiumAsteroidVisProps) {
    const cesiumContainerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [cesiumLoaded, setCesiumLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load Cesium script dynamically
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if already loaded
        if ((window as any).Cesium) {
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
        script.onload = () => setCesiumLoaded(true);
        script.onerror = () => setError('Failed to load 3D visualization library');
        document.head.appendChild(script);

        return () => {
            // Cleanup
        };
    }, []);

    // Initialize Cesium viewer
    useEffect(() => {
        if (!cesiumLoaded || !cesiumContainerRef.current) return;

        const Cesium = (window as any).Cesium;
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
            PLANET_DATA.forEach((planet, index) => {
                const orbitRadius = planet.a * 100; // Scale for visibility
                const planetAngle = (index * 45) * Math.PI / 180; // Spread planets

                // Orbital path
                const orbitPoints = [];
                for (let i = 0; i <= 360; i += 5) {
                    const angleRad = i * Math.PI / 180;
                    orbitPoints.push(new Cesium.Cartesian3(
                        orbitRadius * Math.cos(angleRad),
                        orbitRadius * Math.sin(angleRad),
                        0
                    ));
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
            });

            // Add asteroids
            neos.forEach((neo) => {
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
                        color: isHazardous
                            ? Cesium.Color.RED
                            : Cesium.Color.CYAN,
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
            });

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

        return () => {
            if (viewerRef.current && !viewerRef.current.isDestroyed()) {
                viewerRef.current.destroy();
            }
        };
    }, [cesiumLoaded, neos]);

    // Handle playback
    useEffect(() => {
        if (viewerRef.current?.clock) {
            viewerRef.current.clock.shouldAnimate = isPlaying;
            viewerRef.current.clock.multiplier = speed;
        }
    }, [isPlaying, speed]);

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="text-center p-8">
                    <p className="text-alert-red text-xl font-bold mb-4">{error}</p>
                    <p className="text-white/60">Please refresh the page to try again</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-black">
            {/* Loading state */}
            {!cesiumLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan-glow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-cyan-glow font-bold uppercase tracking-widest">Loading Solar System...</p>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="absolute top-4 right-4 z-30 bg-black/90 backdrop-blur-md p-5 rounded-xl border border-white/10 space-y-4">
                <h3 className="text-xs font-bold uppercase text-white tracking-wider">Controls</h3>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-white text-black font-bold text-xs uppercase rounded hover:bg-gray-100 transition-colors"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    <select
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="px-3 py-2 bg-white/10 text-white text-xs font-bold rounded border border-white/20"
                    >
                        <option value={1}>1x</option>
                        <option value={10}>10x</option>
                        <option value={100}>100x</option>
                    </select>
                </div>

                <div className="text-[10px] text-white/50 uppercase tracking-wider space-y-1">
                    <p>🖱️ Drag to rotate</p>
                    <p>🔍 Scroll to zoom</p>
                    <p>👆 Click object for info</p>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-30 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold uppercase text-white tracking-wider mb-3">Legend</h3>
                <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span>Sun</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-3 h-3 rounded-full bg-[#4A90E2]" />
                    <span>Planets</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span>Safe Asteroids</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Hazardous</span>
                </div>
            </div>

            {/* Cesium container */}
            <div
                ref={cesiumContainerRef}
                className="w-full h-full"
                style={{ minHeight: '100vh' }}
            />
        </div>
    );
}
