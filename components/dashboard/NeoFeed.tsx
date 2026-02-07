'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { GlassCard } from '@/components/ui/GlassCard';
import { AlertTriangle, Info, Calendar, Maximize2, Gauge, Ruler, X, Filter, Radar, Rocket, Lock, Globe } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Neo {
    id: string;
    name: string;
    date: string;
    distanceVal: number; // raw value for sorting
    distance: string;
    velocityVal: number; // raw value for sorting
    velocity: string;
    diameterVal: number; // raw value for sorting
    diameter: string;
    isHazardous: boolean;
    absolute_magnitude: number;
}

export function NeoFeed() {
    const { data: session } = useSession();
    const router = useRouter();
    const [neos, setNeos] = useState<Neo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters & Sorting
    const [filterHazardous, setFilterHazardous] = useState(false);
    const [filterSize, setFilterSize] = useState<'all' | 'small' | 'medium' | 'large'>('all');
    const [sortBy, setSortBy] = useState<'diameter' | 'velocity' | 'distance' | 'date'>('diameter');

    // Details Modal
    const [selectedNeo, setSelectedNeo] = useState<Neo | null>(null);

    useEffect(() => {
        const fetchNeos = async () => {
            try {
                const res = await fetch('/api/neos');
                if (!res.ok) throw new Error('Failed to fetch NEO data');
                const data = await res.json();

                const today = new Date().toISOString().split('T')[0];
                const todayData = data.near_earth_objects[today] || [];

                const processed = todayData.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    date: item.close_approach_data[0].close_approach_date_full,
                    distanceVal: parseFloat(item.close_approach_data[0].miss_distance.kilometers),
                    distance: `${parseFloat(item.close_approach_data[0].miss_distance.kilometers).toLocaleString(undefined, { maximumFractionDigits: 0 })} km`,
                    velocityVal: parseFloat(item.close_approach_data[0].relative_velocity.kilometers_per_hour),
                    velocity: `${parseFloat(item.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString(undefined, { maximumFractionDigits: 0 })} km/h`,
                    diameterVal: item.estimated_diameter.meters.estimated_diameter_max,
                    diameter: `${Math.round(item.estimated_diameter.meters.estimated_diameter_max)}m`,
                    isHazardous: item.is_potentially_hazardous_asteroid,
                    absolute_magnitude: item.absolute_magnitude_h
                }));

                setNeos(processed);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNeos();
    }, []);

    const addToWatchlist = async (neo: Neo, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening modal
        if (!session) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch('/api/watchlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    asteroidId: neo.id,
                    asteroidName: neo.name,
                }),
            });

            if (res.ok) {
                alert(`Added ${neo.name} to watchlist!`);
            } else if (res.status === 409) {
                alert(`${neo.name} is already in your watchlist.`);
            } else {
                throw new Error('Failed to add');
            }
        } catch (error) {
            alert('Error adding to watchlist');
        }
    };

    const filteredAndSortedNeos = useMemo(() => {
        let result = [...neos];

        if (filterHazardous) {
            result = result.filter(n => n.isHazardous);
        }

        if (filterSize !== 'all') {
            result = result.filter(n => {
                if (filterSize === 'small') return n.diameterVal < 100;
                if (filterSize === 'medium') return n.diameterVal >= 100 && n.diameterVal < 500;
                if (filterSize === 'large') return n.diameterVal >= 500;
                return true;
            });
        }

        result.sort((a, b) => {
            if (sortBy === 'diameter') return b.diameterVal - a.diameterVal;
            if (sortBy === 'velocity') return b.velocityVal - a.velocityVal;
            if (sortBy === 'distance') return a.distanceVal - b.distanceVal; // closest first
            if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
            return 0;
        });

        return result;
    }, [neos, filterHazardous, filterSize, sortBy]); // Added filterSize to dependencies


    if (loading) {
        return (
            <div className="text-center py-20 text-cyan-glow animate-pulse">
                <p className="text-2xl font-black uppercase tracking-widest">Scanning Deep Space...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-alert-red bg-alert-red/10 rounded-xl border border-alert-red">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <p className="text-xl font-bold uppercase tracking-widest">Sensor Array Offline</p>
                <p className="text-sm mt-2 opacity-80">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 relative z-10">

            {/* Control Panel */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-deep-space/50 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg flex items-center gap-3">
                        <Radar className="w-8 h-8 text-cyan-glow" />
                        Live Feed
                    </h2>
                    <p className="text-cyan-glow font-bold text-xs uppercase tracking-[0.2em] mt-1 pl-1">
                        Monitoring {neos.length} Near-Earth Objects
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-30" />

                    <button
                        onClick={() => setFilterHazardous(!filterHazardous)}
                        className={clsx(
                            "px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center transition-all duration-300 border-l-2",
                            filterHazardous
                                ? "bg-alert-red/10 text-alert-red border-l-alert-red shadow-[0_0_10px_rgba(217,4,41,0.2)]"
                                : "bg-white/5 text-starlight border-l-transparent hover:bg-white/10"
                        )}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        {filterHazardous ? 'HAZARDOUS ONLY' : 'SHOW ALL'}
                    </button>

                    <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        <span className="text-xs text-void-gray uppercase font-bold mr-2 tracking-wider">Sort:</span>

                        {[
                            { id: 'diameter', label: 'SIZE', icon: Maximize2 },
                            { id: 'velocity', label: 'SPEED', icon: Gauge },
                            { id: 'distance', label: 'DIST', icon: Ruler },
                            { id: 'date', label: 'DATE', icon: Calendar },
                        ].map((opt) => {
                            const Icon = opt.icon;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setSortBy(opt.id as any)}
                                    className={clsx(
                                        "px-4 py-2 rounded text-xs font-bold transition-all border flex items-center gap-2 uppercase tracking-wide",
                                        sortBy === opt.id
                                            ? "bg-cyan-glow/10 border-cyan-glow text-cyan-glow border"
                                            : "bg-transparent border-transparent text-void-gray hover:text-white"
                                    )}
                                >
                                    <Icon className="w-3 h-3" />
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-white/5 w-fit">
                    <span className="text-[10px] text-void-gray uppercase font-bold px-2">Size:</span>
                    {(['all', 'small', 'medium', 'large'] as const).map((size) => (
                        <button
                            key={size}
                            onClick={() => setFilterSize(size)}
                            className={clsx(
                                "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all",
                                filterSize === size
                                    ? "bg-white/10 text-white"
                                    : "text-void-gray hover:text-white hover:bg-white/5"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar pointer-events-auto">
                {filteredAndSortedNeos.map((neo, index) => {
                    // Use the pre-processed values from the Neo interface
                    const isHazardous = neo.isHazardous;
                    const diameter = parseFloat(neo.diameterVal.toFixed(1));
                    const velocity = parseFloat(neo.velocityVal.toFixed(0)).toLocaleString();
                    const distance = parseFloat(neo.distanceVal.toFixed(0)).toLocaleString();
                    const date = neo.date;

                    // --- ACCESS CONTROL ---
                    // Blur details if not logged in
                    const isRestricted = !session?.user;

                    return (
                        <GlassCard
                            key={neo.id}
                            className={clsx(
                                "p-0 flex items-stretch transition-all duration-300 group hover:scale-[1.01] overflow-hidden relative",
                                isHazardous
                                    ? "border-l-4 border-l-alert-red bg-alert-red/5"
                                    : "border-l-4 border-l-cyan-glow bg-black/40"
                            )}
                        >

                            <div className="flex-1 p-5 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-black text-white tracking-wide group-hover:text-cyan-glow transition-colors">
                                            {neo.name.replace('(', '').replace(')', '')}
                                        </h3>
                                        {isHazardous && (
                                            <span className="px-2 py-0.5 bg-alert-red text-white text-[10px] font-black uppercase tracking-widest rounded animate-pulse">
                                                HAZARDOUS
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-starlight/70 font-mono">
                                        <div className="flex items-center gap-1.5" title="Diameter">
                                            <Maximize2 className="w-3 h-3 text-void-gray" />
                                            <span className="font-bold text-white">{diameter}m</span>
                                        </div>
                                        <div className="w-px h-3 bg-white/10" />
                                        <div className="flex items-center gap-1.5" title="Date">
                                            <Calendar className="w-3 h-3 text-void-gray" />
                                            <span>{date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={clsx(
                                    "grid grid-cols-2 gap-x-8 gap-y-2 text-right relative",
                                    isRestricted ? "blur-sm select-none opacity-50" : ""
                                )}>
                                    <div>
                                        <p className="text-[10px] text-void-gray uppercase font-bold tracking-wider mb-0.5">Velocity</p>
                                        <p className="text-lg font-bold text-white font-mono flex items-center justify-end gap-1">
                                            {velocity} <span className="text-xs text-void-gray">km/h</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-void-gray uppercase font-bold tracking-wider mb-0.5">Distance</p>
                                        <p className={clsx("text-lg font-bold font-mono flex items-center justify-end gap-1", isHazardous ? "text-alert-red" : "text-cyan-glow")}>
                                            {distance} <span className="text-xs text-void-gray">km</span>
                                        </p>
                                    </div>
                                </div>

                                {isRestricted && (
                                    <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center pointer-events-none">
                                        <div className="px-4 py-2 bg-black/90 border border-white/10 rounded backdrop-blur-md shadow-xl flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-alert-red" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-white">Login to View</span>
                                        </div>
                                    </div>
                                )}

                                <div className="hidden md:flex flex-col gap-2">
                                    <button
                                        onClick={() => setSelectedNeo(neo)}
                                        className="p-2 rounded-full border border-white/10 hover:bg-cyan-glow hover:text-black hover:border-cyan-glow transition-all"
                                        title="View Details"
                                    >
                                        <Info className="w-4 h-4" />
                                    </button>
                                    <Link
                                        href="/visualizer"
                                        className="p-2 rounded-full border border-white/10 hover:bg-star-lord-gold hover:text-black hover:border-star-lord-gold transition-all flex items-center justify-center"
                                        title="Visualize 3D"
                                    >
                                        <Globe className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
