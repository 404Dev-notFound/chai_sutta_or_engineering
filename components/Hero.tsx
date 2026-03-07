'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPING_PHRASES = [
    "Welcome to the Engineer's World",
    "Chai Sutta Or Engineering",
    "Get Into Creative Mode"
];

const ROTATING_SUBTEXTS = [
    "skill gap..?",
    "lets fix it",
    "personalized roadmap chahiye!!!"
];

export function Hero() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [subtextIndex, setSubtextIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing effect logic
    useEffect(() => {
        const currentPhrase = TYPING_PHRASES[phraseIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && text === currentPhrase) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        } else {
            const nextDelay = isDeleting ? 30 : 70;
            timeout = setTimeout(() => {
                setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
            }, nextDelay);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex]);

    // Rotating subtext logic
    useEffect(() => {
        const interval = setInterval(() => {
            setSubtextIndex((prev) => (prev + 1) % ROTATING_SUBTEXTS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-20">
            <div className="h-24 md:h-32 mb-6 flex items-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-mono text-foreground font-mono">
                    {text}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                    />
                </h1>
            </div>

            <div className="h-12 mb-12 overflow-hidden relative w-full flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={subtextIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-xl md:text-2xl text-muted-foreground font-medium absolute"
                    >
                        {ROTATING_SUBTEXTS[subtextIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow"
                >
                    Start Engineering It...
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-lg border border-border hover:border-primary/50 transition-colors"
                >
                    explore
                </motion.button>
            </div>
        </section>
    );
}
