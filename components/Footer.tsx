'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOTER_LINKS = [
    'Terms', 'Privacy', 'Security', 'Status', 'Community', 'Docs', 'Contact'
];

export function Footer() {
    const [activeLink, setActiveLink] = useState<string | null>(null);

    const handleLinkClick = (e: React.MouseEvent, link: string) => {
        e.preventDefault();
        setActiveLink(link);
        setTimeout(() => setActiveLink(null), 2000);
    };

    return (
        <footer className="w-full border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex flex-col items-center justify-center text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-8xl font-black text-foreground max-w-5xl leading-tight tracking-tighter"
                    >
                        Degree won't build your career.
                        <br />
                        <span className="text-primary">Your execution will.</span>
                    </motion.h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-sm font-medium z-10 relative">
                    <p className="text-muted-foreground mb-6 md:mb-0">
                        © 2026 CS.E
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {FOOTER_LINKS.map((link) => (
                            <a
                                key={link}
                                href="#"
                                onClick={(e) => handleLinkClick(e, link)}
                                className="text-muted-foreground hover:text-foreground transition-colors overflow-hidden relative h-6 flex items-center"
                            >
                                <AnimatePresence mode="wait">
                                    {activeLink === link ? (
                                        <motion.span
                                            key="coming-soon"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="text-primary font-bold absolute whitespace-nowrap"
                                        >
                                            Coming Soon
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="text"
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {link}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
