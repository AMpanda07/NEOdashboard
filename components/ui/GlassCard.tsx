import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <div
            className={twMerge(
                "glass-card rounded-xl p-6 text-white relative overflow-hidden",
                hoverEffect && "hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-glow/20 transition-all duration-300",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 pointer-events-auto">
                {children}
            </div>
        </div>
    );
}
