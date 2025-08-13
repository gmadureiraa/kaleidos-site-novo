"use client";

/**
 * @author: @dorian_baffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
    title?: string;
    backTitle?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
    onStartNow?: () => void;
    frontBgGradient?: string;
    frontBorderColor?: string;
    backBgGradient?: string;
    backBorderColor?: string;
    onDark?: boolean;
}

export default function CardFlip({
    title = "Design Systems",
    backTitle,
    subtitle = "Explore the fundamentals",
    description = "Dive deep into the world of modern UI/UX design.",
    features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
    onStartNow,
    frontBgGradient = "from-zinc-100 to-white",
    frontBorderColor = "border-zinc-200",
    // backBgGradient = "from-zinc-900 to-black",
    backBorderColor = "border-zinc-800",
    onDark = false,
}: CardFlipProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleStartNow = () => {
        if (onStartNow) {
            onStartNow();
        }
    };

    return (
        <div
            className="relative w-full max-w-[280px] h-[320px] group [perspective:2000px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={cn(
                    "relative w-full h-full",
                    "[transform-style:preserve-3d]",
                    "transition-all duration-700",
                    isFlipped
                        ? "[transform:rotateY(180deg)]"
                        : "[transform:rotateY(0deg)]"
                )}
            >
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(0deg)]",
                        "overflow-hidden rounded-2xl",
                        onDark ? "bg-black" : "bg-white",
                        onDark ? "border-transparent" : `border ${frontBorderColor}`,
                        "shadow-sm dark:shadow-lg",
                        "transition-all duration-700",
                        "group-hover:shadow-lg dark:group-hover:shadow-xl",
                        isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className={cn("relative h-full overflow-hidden", onDark ? "bg-black" : "bg-white") }>
                        <div className="absolute inset-0 flex items-start justify-center pt-24">
                            <div className="relative w-[200px] h-[100px] flex items-center justify-center">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "absolute w-[50px] h-[50px]",
                                            "rounded-[140px]",
                                            "animate-[scale_3s_linear_infinite]",
                                            "opacity-0",
                                            "group-hover:animate-[scale_2s_linear_infinite]"
                                        )}
                                        style={{
                                            animationDelay: `${i * 0.3}s`,
                                            background: `linear-gradient(135deg, ${frontBgGradient.includes('red') ? '#ef4444' : 
                                                                                   frontBgGradient.includes('blue') ? '#3b82f6' : 
                                                                                   frontBgGradient.includes('yellow') ? '#eab308' : 
                                                                                   frontBgGradient.includes('pink') ? '#ec4899' : 
                                                                                   frontBgGradient.includes('emerald') ? '#10b981' : 
                                                                                   frontBgGradient.includes('cyan') ? '#06b6d4' : '#f97316'}, 
                                                                                   ${frontBgGradient.includes('red') ? '#db2777' : 
                                                                                   frontBgGradient.includes('blue') ? '#4f46e5' : 
                                                                                   frontBgGradient.includes('yellow') ? '#ea580c' : 
                                                                                   frontBgGradient.includes('pink') ? '#be185d' : 
                                                                                   frontBgGradient.includes('emerald') ? '#059669' : 
                                                                                   frontBgGradient.includes('cyan') ? '#0891b2' : '#dc2626'})`,
                                            boxShadow: `0 0 50px ${frontBgGradient.includes('red') ? 'rgba(239, 68, 68, 0.5)' : 
                                                           frontBgGradient.includes('blue') ? 'rgba(59, 130, 246, 0.5)' : 
                                                           frontBgGradient.includes('yellow') ? 'rgba(234, 179, 8, 0.5)' : 
                                                           frontBgGradient.includes('pink') ? 'rgba(236, 72, 153, 0.5)' : 
                                                           frontBgGradient.includes('emerald') ? 'rgba(16, 185, 129, 0.5)' : 
                                                           frontBgGradient.includes('cyan') ? 'rgba(6, 182, 212, 0.5)' : 'rgba(249, 115, 22, 0.5)'}`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="space-y-1.5">
                                <h3 className={cn("text-lg font-semibold leading-snug tracking-tighter transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px]", onDark ? "text-white" : "text-zinc-900") }>
                                    {title}
                                </h3>
                                <p className={cn("text-sm line-clamp-2 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px] delay-[50ms]", onDark ? "text-zinc-300" : "text-zinc-600") }>
                                    {subtitle}
                                </p>
                            </div>
                            <div className="relative group/icon">
                                <div
                                    className={cn(
                                        "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                                        "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent"
                                    )}
                                />
                                <Repeat2 className="relative z-10 w-4 h-4 text-orange-500 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                        "p-6 rounded-2xl",
                        onDark ? "bg-black" : "bg-white",
                        onDark ? "border-transparent" : `border ${backBorderColor}`,
                        "shadow-xs dark:shadow-lg",
                        "flex flex-col",
                        "transition-all duration-700",
                        "group-hover:shadow-lg dark:group-hover:shadow-xl",
                        !isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <h3 className={cn("text-lg font-semibold leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]", onDark ? "text-white" : "text-zinc-900") }>
                                {backTitle ?? title}
                            </h3>
                            <p className={cn("text-sm tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] line-clamp-2", onDark ? "text-zinc-300" : "text-zinc-600") }>
                                {description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div
                                    key={feature}
                                    className={cn("flex items-center gap-2 text-sm transition-all duration-500", onDark ? "text-zinc-300" : "text-zinc-700")}
                                    style={{
                                        transform: isFlipped
                                            ? "translateX(0)"
                                            : "translateX(-10px)",
                                        opacity: isFlipped ? 1 : 0,
                                        transitionDelay: `${
                                            index * 100 + 200
                                        }ms`,
                                    }}
                                >
                                    <ArrowRight className="w-3 h-3 text-orange-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <div
                            onClick={handleStartNow}
                            className={cn(
                                "group/start relative",
                                "flex items-center justify-between",
                                "p-3 -m-3 rounded-xl",
                                "transition-all duration-300",
                                "bg-gradient-to-r from-zinc-100 via-zinc-100 to-zinc-100",
                                "dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800",
                                "hover:from-orange-500/10 hover:from-0% hover:via-orange-500/5 hover:via-100% hover:to-transparent hover:to-100%",
                                "dark:hover:from-orange-500/20 dark:hover:from-0% dark:hover:via-orange-500/10 dark:hover:via-100% dark:hover:to-transparent dark:hover:to-100%",
                                "hover:scale-[1.02] hover:cursor-pointer"
                            )}
                        >
                            <span className={cn("text-sm font-medium transition-colors duration-300 group-hover/start:text-orange-600 dark:group-hover/start:text-orange-400", onDark ? "text-white" : "text-zinc-900") }>
                                Começar Agora
                            </span>
                            <div className="relative group/icon">
                                <div
                                    className={cn(
                                        "absolute inset-[-6px] rounded-lg transition-all duration-300",
                                        "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
                                        "opacity-0 group-hover/start:opacity-100 scale-90 group-hover/start:scale-100"
                                    )}
                                />
                                <ArrowRight className="relative z-10 w-4 h-4 text-orange-500 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scale {
                    0% {
                        transform: scale(2);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(0px, -5px) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(0px, 5px) scale(0.1);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
