'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
import { cn } from '@/lib/utils';
import { Terminal, Zap, Layers, Moon, Crown } from 'lucide-react';

const themes = [
    { id: 'hacker', name: 'Hacker Mode', icon: Terminal, desc: 'Terminal green', color: '#00ff41' },
    { id: 'genz', name: 'Gen-Z Rebel', icon: Zap, desc: 'Neon purple', color: '#8b5cf6' },
    { id: 'saas', name: 'Clean SaaS', icon: Layers, desc: 'Minimal white', color: '#2563eb' },
    { id: 'night', name: 'Night Creator', icon: Moon, desc: 'Deep blue', color: '#38bdf8' },
] as const;

export function ThemeSelector() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, hasSelectedTheme, setHasSelectedTheme } = useThemeStore();
    const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Setup initial DOM class
        const root = document.documentElement;
        root.className = theme === 'hacker' ? '' : `theme-${theme}`;
    }, [theme, mounted]);

    const handleSelect = (selectedTheme: typeof theme) => {
        setTheme(selectedTheme);
        setHasSelectedTheme(true);
    };

    const handleSkip = () => {
        setTheme('hacker');
        setHasSelectedTheme(true);
    };

    const previewTheme = (previewId: string) => {
        const root = document.documentElement;
        root.className = previewId === 'hacker' ? '' : `theme-${previewId}`;
        setHoveredTheme(previewId);
    };

    const resetPreview = () => {
        const root = document.documentElement;
        root.className = theme === 'hacker' ? '' : `theme-${theme}`;
        setHoveredTheme(null);
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {!hasSelectedTheme && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 text-white font-inter"
                >
                    <div className="max-w-4xl w-full flex flex-col items-center">
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-black mb-2 tracking-tight"
                        >
                            Choose Your Vibe.
                        </motion.h1>
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-lg md:text-xl mb-12"
                        >
                            Your environment shapes your execution.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
                            {themes.map((t, i) => {
                                const Icon = t.icon;
                                return (
                                    <motion.button
                                        key={t.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        onClick={() => handleSelect(t.id)}
                                        onMouseEnter={() => previewTheme(t.id)}
                                        onMouseLeave={resetPreview}
                                        className={cn(
                                            "group relative flex items-center p-6 bg-[#111] border border-[#333] rounded-xl overflow-hidden transition-all duration-300 hover:border-white/50",
                                            hoveredTheme === t.id ? "scale-105" : ""
                                        )}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                            style={{ backgroundColor: t.color }}
                                        />
                                        <Icon className="w-8 h-8 mr-4" style={{ color: t.color }} />
                                        <div className="text-left">
                                            <h3 className="font-bold text-lg">{t.name}</h3>
                                            <p className="text-sm text-gray-500">{t.desc}</p>
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            onClick={() => handleSelect('premium')}
                            onMouseEnter={() => previewTheme('premium')}
                            onMouseLeave={resetPreview}
                            className={cn(
                                "group relative flex items-center justify-center p-6 w-full max-w-2xl bg-[#0a0a0a] border border-[#d4af37]/30 rounded-xl overflow-hidden transition-all duration-500",
                                hoveredTheme === 'premium' ? "scale-[1.02] border-[#d4af37]" : ""
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <Crown className="w-8 h-8 mr-4 text-[#d4af37]" />
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-[#d4af37]">Premium Mode</h3>
                                <p className="text-sm text-gray-500">Matte black + gold. Executive feel.</p>
                            </div>
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            onClick={handleSkip}
                            className="mt-12 text-gray-500 hover:text-white transition-colors underline decoration-dashed underline-offset-4"
                        >
                            Skip (Default User Settings)
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
