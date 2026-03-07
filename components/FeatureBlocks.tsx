'use client';

import { motion } from 'framer-motion';
import { Activity, Briefcase, UserX } from 'lucide-react';

const blocks = [
    {
        id: 'dropout',
        title: 'Dropout Risk',
        desc: 'Calculate your survival probability based on execution metrics.',
        icon: Activity,
        delay: 0,
    },
    {
        id: 'workspace',
        title: 'Micro Opportunity Workspace',
        desc: 'Bite-sized execution tasks. No 6-month unpaid internships.',
        icon: Briefcase,
        delay: 0.1,
    },
    {
        id: 'anonymous',
        title: 'Anonymous Section',
        desc: 'Speak truth to power. Safe, untraceable expression.',
        icon: UserX,
        delay: 0.2,
    }
];

export function FeatureBlocks() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blocks.map((block) => {
                    const Icon = block.icon;
                    return (
                        <motion.div
                            key={block.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: block.delay }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-8 rounded-2xl bg-card border border-border overflow-hidden cursor-pointer"
                        >
                            {/* Highlight background effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Border glow effect on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">
                                    {block.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed">
                                    {block.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
