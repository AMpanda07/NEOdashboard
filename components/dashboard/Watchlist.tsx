'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Eye, Trash2, Loader2, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface WatchlistItem {
    _id: string;
    asteroidId: string;
    asteroidName: string;
    addedAt: string;
}

export function Watchlist() {
    const { data: session } = useSession();
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWatchlist = async () => {
        if (!session) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/watchlist');
            if (res.ok) {
                const data = await res.json();
                setWatchlist(data);
            }
        } catch (error) {
            console.error('Failed to fetch watchlist', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, [session]);

    const removeFromWatchlist = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/watchlist?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setWatchlist(prev => prev.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="w-6 h-6 text-cyan-glow animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <GlassCard className="p-6 text-center">
                <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-6 h-6 text-void-gray" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Track Asteroids</h3>
                    <p className="text-sm text-void-gray mt-2">Login to create your own watchlist and receive risk alerts.</p>
                </div>
                <Link
                    href="/login"
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-bold bg-white/10 text-cyan-glow hover:bg-white/20 transition-colors"
                >
                    Login to Watch
                </Link>
            </GlassCard>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-white tracking-wide">
                    Your Watchlist
                </h2>
                <span className="text-xs text-nebula-purple">
                    {watchlist.length} Tracking
                </span>
            </div>

            {watchlist.length === 0 ? (
                <GlassCard className="p-6 text-center text-void-gray">
                    <p className="text-sm">No asteroids in your watchlist.</p>
                    <p className="text-xs mt-1">Browse the feed to add candidates.</p>
                </GlassCard>
            ) : (
                <div className="space-y-2">
                    {watchlist.map((item) => (
                        <GlassCard key={item._id} className="p-3 flex items-center justify-between group hover:bg-white/5 transition-colors">
                            <div>
                                <div className="text-white font-bold">{item.asteroidName}</div>
                                <div className="text-xs text-void-gray">ID: {item.asteroidId}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => removeFromWatchlist(item._id, e)}
                                    className="p-1.5 hover:bg-alert-red/20 text-void-gray hover:text-alert-red rounded-full transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
}
