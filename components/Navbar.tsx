'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
    const { theme, setTheme } = useThemeStore();
    const [activeBtn, setActiveBtn] = useState<string | null>(null);

    const toggleTheme = () => {
        setTheme(theme === 'night' ? 'saas' : 'night');
    };

    const handleNavClick = (btnName: string) => {
        setActiveBtn(btnName);
        setTimeout(() => setActiveBtn(null), 2000);
    };

    const BounceText = ({ text, active }: { text: string; active: boolean }) => (
        <div className="relative overflow-hidden inline-flex">
            <AnimatePresence mode="wait">
                {active ? (
                    <motion.div
                        key="coming-soon"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-primary font-bold text-sm absolute inset-0 flex items-center justify-center whitespace-nowrap bg-background"
                    >
                        Coming Soon
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <motion.span
                animate={{ y: active ? -20 : 0, opacity: active ? 0 : 1 }}
                className="inline-block"
            >
                {text}
            </motion.span>
        </div>
    );

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xl tracking-tight text-primary">
                        &gt;_ CS.E
                    </span>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium">
                    {['About', 'Dashboard', 'Anonymous'].map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handleNavClick(btn)}
                            className="text-muted-foreground hover:text-foreground transition-colors relative"
                        >
                            <BounceText text={btn} active={activeBtn === btn} />
                        </button>
                    ))}

                    <button
                        onClick={() => handleNavClick('Login')}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                    >
                        <BounceText text="Login" active={activeBtn === 'Login'} />
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'night' || theme === 'hacker' || theme === 'premium' || theme === 'genz' ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
