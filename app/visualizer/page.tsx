"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import CesiumAsteroidVis from '@/components/visualization/CesiumAsteroidVis';
import axios from 'axios';

export default function VisualizerPage() {
    const [neos, setNeos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNeos = async () => {
            try {
                const res = await axios.get('/api/neos');
                // NASA API structure: near_earth_objects is an object with date keys
                // We need to flatten this to get a list of all asteroids
                const rawData = res.data.near_earth_objects;
                const flattened = Object.values(rawData).flat();
                setNeos(flattened as any);
            } catch (err) {
                console.error("Failed to fetch NEOs", err);
                setError("Failed to load trajectory data. Please check your connection and try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchNeos();
    }, []);

    return (
        <main className="w-screen h-screen relative bg-black overflow-hidden flex flex-col">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none">
                <Link href="/" className="pointer-events-auto flex items-center group">
                    <div className="p-3 bg-black/60 border border-white/10 rounded-full backdrop-blur-md group-hover:border-cyan-glow/50 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </div>
                </Link>

                <div className="text-right pointer-events-auto">
                    <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-1 drop-shadow-md">
                        Trajectory Engine
                    </h1>
                    <p className="text-cyan-glow font-bold text-xs uppercase tracking-[0.2em]">
                        Live Near-Earth Object Visualizer
                    </p>
                </div>
            </div>

            {/* Legend / Status Overlay */}
            <div className="absolute bottom-8 left-8 z-20 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white w-64 pointer-events-none">
                <h3 className="text-xs font-bold uppercase text-void-gray mb-3 tracking-wider">System Status</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">Objects Tracked</span>
                    <span className="text-cyan-glow font-mono">{neos.length}</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-alert-red" />
                        <span className="text-white/80">Hazardous Object</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#a9a9a9]" />
                        <span className="text-white/80">Non-Hazardous</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4361ee]" />
                        <span className="text-white/80">Earth</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative z-10 w-full h-full">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <Loader2 className="w-12 h-12 text-cyan-glow animate-spin" />
                        <p className="mt-4 text-white text-sm uppercase tracking-widest absolute top-1/2 pt-10">Initializing Orbit...</p>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-alert-red mx-auto mb-4" />
                            <p className="text-white text-lg font-bold">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <CesiumAsteroidVis neos={neos} />
                )}
            </div>
        </main>
    );
}
