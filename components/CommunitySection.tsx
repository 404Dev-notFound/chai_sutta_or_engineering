'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    DiscordIcon,
    WhatsappIcon,
    InstagramIcon
} from './icons';
import { Link2 } from 'lucide-react';

const COMMUNITY_LINKS = [
    { id: 'discord', name: 'Discord', icon: DiscordIcon, href: '#discord' },
    { id: 'whatsapp', name: 'WhatsApp', icon: WhatsappIcon, href: '#whatsapp' },
    { id: 'instagram', name: 'Instagram', icon: InstagramIcon, href: '#instagram' },
    { id: 'soon1', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon2', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon3', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon4', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon5', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon6', name: 'Coming Soon', icon: Link2, href: '#' },
    { id: 'soon7', name: 'Coming Soon', icon: Link2, href: '#' },
];

export function CommunitySection() {
    const [activeBtn, setActiveBtn] = useState<string | null>(null);

    const handleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (id.startsWith('soon')) {
            setActiveBtn(id);
            setTimeout(() => setActiveBtn(null), 2000);
        }
    };

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto w-full border-t border-border/40">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Join the Cult.
                </h2>
                <p className="text-muted-foreground text-lg">
                    Connect with builders. No casuals allowed.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {COMMUNITY_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    const isSoon = link.id.startsWith('soon');
                    return (
                        <motion.a
                            key={link.id}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.id)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                            className={`
                group relative flex flex-col items-center justify-center p-8 
                rounded-2xl border border-border bg-card/50 backdrop-blur-sm
                transition-all duration-300 h-40 overflow-hidden
                ${isSoon ? 'opacity-60 cursor-default' : 'hover:bg-accent/50 cursor-pointer'}
              `}
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <Icon className={`w-8 h-8 mb-4 ${isSoon ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary transition-colors duration-300'}`} />

                                <div className="h-6 relative w-full flex justify-center items-center overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {activeBtn === link.id ? (
                                            <motion.span
                                                key="coming-soon"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                className="text-primary font-bold text-sm absolute whitespace-nowrap"
                                            >
                                                Coming Soon
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="name"
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className={`text-sm font-medium ${isSoon ? 'text-muted-foreground' : 'text-foreground'}`}
                                            >
                                                {link.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
}
