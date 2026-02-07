import { NeoFeed } from '@/components/dashboard/NeoFeed';

export default function FeedPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-starlight via-cyan-glow to-nebula-purple mb-8">
                LIVE NEO FEED
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <NeoFeed />
                </div>
                <div className="space-y-6">
                    {/* Filters or Stats could go here */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-glow">Feed Stats</h3>
                        <div className="space-y-2 text-void-gray">
                            <div className="flex justify-between">
                                <span>Objects Today</span>
                                <span className="text-white">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Hazardous</span>
                                <span className="text-alert-red">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
