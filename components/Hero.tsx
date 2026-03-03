"use client";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-engineering/30 bg-engineering/10 text-engineering text-xs font-mono mb-6"
        >
          <ShieldCheck size={14} /> v1.0: THE EXECUTION ENGINE IS LIVE
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Stop Guessing Your Career. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-engineering to-chai">
            Start Engineering It.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-mono"
        >
          Knowledge-powered career intelligence for students. <br />
          Data-verified talent pipeline for recruiters.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-engineering text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-engineering/20 hover:scale-105 transition-transform">
            Get My Career Score <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 border border-slate-300 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            Hire Verified Talent
          </button>
        </motion.div>
      </div>
    </section>
  );
}