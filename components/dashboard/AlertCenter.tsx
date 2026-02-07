'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Bell, AlertCircle, Calendar, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface Alert {
    id: string;
    name: string;
    date: string;
    riskScore: number;
    level: 'CRITICAL' | 'WARNING' | 'MODERATE';
    distance: string;
}

export function AlertCenter() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch('/api/neos');
                if (res.ok) {
                    const data = await res.json();
                    const today = new Date().toISOString().split('T')[0];
                    const neos = data.near_earth_objects[today] || [];

                    const filtered = neos
                        .filter((n: any) => n.risk_score > 50)
                        .sort((a: any, b: any) => b.risk_score - a.risk_score)
                        .map((n: any) => ({
                            id: n.id,
                            name: n.name,
                            date: n.close_approach_data[0].close_approach_date_full,
                            riskScore: n.risk_score,
                            level: n.alert_level,
                            distance: `${parseFloat(n.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km`
                        }));

                    setAlerts(filtered);
                }
            } catch (err) {
                console.error('Failed to fetch alerts', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    if (loading || alerts.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 text-starlight mb-2">
                <Bell className="w-5 h-5 text-alert-red animate-bounce" />
                <h2 className="text-lg font-bold">Alert Center</h2>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <GlassCard
                        key={alert.id}
                        className={clsx(
                            "border-l-4 p-4",
                            alert.level === 'CRITICAL' ? "border-l-alert-red bg-alert-red/5" : "border-l-nebula-purple bg-nebula-purple/5"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-white flex items-center gap-2">
                                    {alert.name}
                                    <span className={clsx(
                                        "text-[10px] px-1.5 py-0.5 rounded font-black",
                                        alert.level === 'CRITICAL' ? "bg-alert-red text-white" : "bg-nebula-purple text-white"
                                    )}>
                                        {alert.level}
                                    </span>
                                </h4>
                                <div className="text-xs text-void-gray mt-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> {alert.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Info className="w-3 h-3" /> Distance: {alert.distance}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-shadow text-2xl font-black text-starlight">
                                    {alert.riskScore}
                                </div>
                                <div className="text-[10px] text-void-gray uppercase tracking-tighter">Risk Score</div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
