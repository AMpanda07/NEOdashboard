'use client';

import Link from 'next/link'
import { Rocket, Target, Globe, Shield, ChevronDown, ArrowRight, Lock } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { NeoFeed } from '@/components/dashboard/NeoFeed'
import { useSession } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen">
            {/* LANDING SECTION */}
            <section id="landing" className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
                {/* Hero Content */}
                <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in-scale">
                    {/* Logo/Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-cyan-glow/20 blur-2xl rounded-full animate-pulse-glow" />
                            <div className="relative p-6 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-2 border-cyan-glow/30 shadow-[0_0_30px_rgba(0,180,216,0.3)]">
                                <Rocket className="w-16 h-16 text-cyan-glow" />
                            </div>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">
                            ASTROCITY
                        </h1>

                        <p className="text-xl md:text-2xl text-cyan-glow font-bold uppercase tracking-[0.3em] animate-pulse-glow">
                            Planetary Defense System
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mt-8">
                        Real-time monitoring of Near-Earth Objects with advanced 3D visualization
                        and risk analysis powered by NASA satellite data.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
                        <GlassCard className="p-8 text-center hover:scale-105 transition-transform animate-slide-in-left">
                            <Target className="w-10 h-10 text-star-lord-gold mx-auto mb-4" />
                            <div className="text-4xl font-black text-white mb-2">15,000+</div>
                            <div className="text-sm text-void-gray uppercase tracking-wider">Tracked Objects</div>
                        </GlassCard>

                        <GlassCard className="p-8 text-center hover:scale-105 transition-transform animate-fade-in-scale">
                            <Globe className="w-10 h-10 text-cyan-glow mx-auto mb-4" />
                            <div className="text-4xl font-black text-white mb-2">Real-Time</div>
                            <div className="text-sm text-void-gray uppercase tracking-wider">Live Updates</div>
                        </GlassCard>

                        <GlassCard className="p-8 text-center hover:scale-105 transition-transform animate-slide-in-right">
                            <Shield className="w-10 h-10 text-alert-red mx-auto mb-4" />
                            <div className="text-4xl font-black text-white mb-2">24/7</div>
                            <div className="text-sm text-void-gray uppercase tracking-wider">Threat Detection</div>
                        </GlassCard>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
                        {session ? (
                            <a
                                href="#dashboard"
                                className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center gap-3 group"
                            >
                                Enter Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        ) : (
                            <Link
                                href="/login"
                                className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center gap-3 group"
                            >
                                <Lock className="w-5 h-5" />
                                Login to Access
                            </Link>
                        )}

                        <Link
                            href="/visualizer"
                            className="px-10 py-5 border-2 border-white/30 text-white font-bold uppercase tracking-widest rounded hover:border-star-lord-gold hover:text-star-lord-gold transition-all flex items-center gap-3"
                        >
                            <Globe className="w-5 h-5" />
                            3D Solar System
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator - only show if logged in */}
                {session && (
                    <a
                        href="#dashboard"
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-cyan-glow transition-colors cursor-pointer animate-float"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                        <ChevronDown className="w-6 h-6 animate-glow" />
                    </a>
                )}
            </section>

            {/* DASHBOARD SECTION - Only visible if logged in */}
            {session && (
                <section id="dashboard" className="min-h-screen py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="text-center animate-fade-in-scale">
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
                                Mission Control
                            </h2>
                            <p className="text-cyan-glow text-sm uppercase tracking-[0.3em] font-bold">
                                Live NEO Feed & Analysis
                            </p>
                        </div>

                        {/* NEO Feed Component */}
                        <NeoFeed />
                    </div>
                </section>
            )}
        </div>
    )
}
