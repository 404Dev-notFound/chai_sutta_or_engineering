'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRIFT_PHRASES = [
    "let's Drift, boys 🤟",
    "Dropout kare 🫡",
    "side-hustle kare 😉",
    "game khelne aajao dosto 🤨"
];

export function DriftSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % DRIFT_PHRASES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-4 w-full flex justify-center items-center bg-secondary/30">
            <div className="h-20 w-full max-w-4xl relative flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={index}
                        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-foreground tracking-tight absolute"
                    >
                        {DRIFT_PHRASES[index]}
                    </motion.h2>
                </AnimatePresence>
            </div>
        </section>
    );
}
