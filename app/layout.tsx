import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'ASTROCITY | Planetary Defense',
    description: 'Real-time Near-Earth Object monitoring and risk analysis.',
}

import { Navbar } from '@/components/layout/Navbar'

import Providers from './providers';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={clsx(inter.className, "text-white min-h-screen relative overflow-x-hidden")}>
                <Providers>
                    <div className="fixed inset-0 z-0 pointer-events-none" style={{ pointerEvents: 'none' }}>
                        <div className="stars" />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-deep-space/30 to-deep-space/80" />
                    </div>
                    <Navbar />
                    <main className="relative z-10 flex flex-col min-h-screen pt-16 pointer-events-auto">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}
