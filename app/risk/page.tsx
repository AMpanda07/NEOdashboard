'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RiskPage() {
    const [stats, setStats] = useState({ hazardous: 0, safe: 0, total: 0 });
    const [riskList, setRiskList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/neos');
                const data = await res.json();
                const today = new Date().toISOString().split('T')[0];
                const neos = data.near_earth_objects[today] || [];

                const hazardous = neos.filter((n: any) => n.is_potentially_hazardous_asteroid).length;
                const safe = neos.length - hazardous;

                setStats({ hazardous, safe, total: neos.length });

                const sorted = [...neos]
                    .sort((a, b) => b.estimated_diameter.meters.estimated_diameter_max - a.estimated_diameter.meters.estimated_diameter_max)
                    .slice(0, 10);

                setRiskList(sorted);
            } catch (err) {
                console.error("Failed to load risk data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex bg-deep-space min-h-screen justify-center items-center">
                <Loader2 className="w-12 h-12 text-cyan-glow animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white mb-12 drop-shadow-[0_0_20px_rgba(255,0,84,0.8)] text-center tracking-tighter transform -skew-x-6">
                RISK ANALYSIS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <GlassCard className="p-8 border-alert-red/50 bg-alert-red/10 shadow-[0_0_30px_rgba(255,0,84,0.2)]">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-alert-red/20 rounded-full">
                            <ShieldAlert className="w-10 h-10 text-alert-red" />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-wider">High Alert</h2>
                    </div>
                    <p className="text-starlight/80 text-lg mb-4 font-medium">
                        Potentially Hazardous Asteroids (PHAs) detected today.
                    </p>
                    <div className="text-6xl font-black text-alert-red drop-shadow-[0_0_10px_rgba(255,0,84,0.8)]">{stats.hazardous}</div>
                </GlassCard>

                <GlassCard className="p-8 border-gamora-green/50 bg-gamora-green/10 shadow-[0_0_30px_rgba(56,176,0,0.2)]">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-gamora-green/20 rounded-full">
                            <ShieldCheck className="w-10 h-10 text-gamora-green" />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-wider">Safe Zone</h2>
                    </div>
                    <p className="text-starlight/80 text-lg mb-4 font-medium">
                        Objects passing safely without impact risk today.
                    </p>
                    <div className="text-6xl font-black text-gamora-green drop-shadow-[0_0_10px_rgba(56,176,0,0.8)]">{stats.safe}</div>
                </GlassCard>
            </div>

            <GlassCard className="p-0 overflow-hidden border-nebula-purple/50">
                <div className="p-6 bg-nebula-purple/20 border-b border-nebula-purple/30">
                    <h3 className="text-2xl font-black text-star-lord-gold uppercase tracking-wider">Largest Objects Today</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-starlight">
                        <thead className="text-xs font-black uppercase bg-deep-space text-cyan-glow tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Object ID</th>
                                <th className="px-6 py-4">Hazard Status</th>
                                <th className="px-6 py-4">Velocity</th>
                                <th className="px-6 py-4">Diameter (Max)</th>
                                <th className="px-6 py-4">Close Approach</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-nebula-purple/20">
                            {riskList.map((neo: any) => (
                                <tr key={neo.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-white group-hover:text-cyan-glow transition-colors">{neo.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-black uppercase ${neo.is_potentially_hazardous_asteroid ? 'bg-alert-red/20 text-alert-red' : 'bg-gamora-green/20 text-gamora-green'}`}>
                                            {neo.is_potentially_hazardous_asteroid ? 'HAZARDOUS' : 'SAFE'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono">{parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString(undefined, { maximumFractionDigits: 0 })} km/h</td>
                                    <td className="px-6 py-4 font-mono">{Math.round(neo.estimated_diameter.meters.estimated_diameter_max)} m</td>
                                    <td className="px-6 py-4 font-mono text-star-lord-gold">{neo.close_approach_data[0].close_approach_date_full}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
