'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Rocket, Home, Globe, Menu, User, LogOut, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();

    // Auto-dynamic navbar - change style on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled
                ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
                : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group relative">
                            <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-2.5 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-700 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform z-10">
                                <Rocket className="h-6 w-6 text-white" />
                            </div>
                            <span className="relative z-10 text-2xl font-black tracking-widest text-white drop-shadow-none">
                                ASTROCITY
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link
                            href="/"
                            className={clsx(
                                "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
                                pathname === '/'
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                            title="Home"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Link>

                        <Link
                            href="/visualizer"
                            className={clsx(
                                "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
                                pathname === '/visualizer'
                                    ? "bg-cyan-glow/20 text-cyan-glow"
                                    : "text-white/60 hover:text-cyan-glow hover:bg-cyan-glow/10"
                            )}
                            title="3D Solar System"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            3D View
                        </Link>

                        <div className="w-px h-6 bg-white/10 mx-2" />

                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="flex items-center px-4 py-2 rounded-md text-sm font-bold text-alert-red hover:bg-alert-red/10 transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center px-5 py-2 rounded-md text-sm font-bold bg-white text-black hover:bg-gray-100 transition-all"
                                title="Login"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 animate-fade-in-scale">
                    <div className="px-4 py-6 space-y-3">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-bold">Home</span>
                        </Link>
                        <Link
                            href="/visualizer"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-cyan-glow hover:bg-cyan-glow/10 rounded-lg transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="font-bold">3D Solar System</span>
                        </Link>

                        <div className="h-px bg-white/10 my-4" />

                        {session ? (
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 text-alert-red hover:bg-alert-red/10 rounded-lg transition-colors w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-bold">Logout</span>
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 bg-white text-black hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="font-bold">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
