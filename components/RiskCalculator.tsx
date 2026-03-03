"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function RiskCalculator() {
  const [risk, setRisk] = useState(0);

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 p-8 md:p-12 shadow-xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Are You Quietly Dropping Out?</h2>
            <p className="text-slate-500 mb-6 font-mono text-sm leading-relaxed">
              Not academic dropout. Career dropout. Skill stagnation and loss of direction are the real risks.
            </p>
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 block">Weekly Execution Hours</label>
                <input 
                  type="range" min="0" max="100" 
                  onChange={(e) => setRisk(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-chai" 
                />
              </div>
              <button className="w-full py-3 bg-slate-900 dark:bg-white dark:text-black font-bold rounded-md hover:opacity-90">
                Analyze My Trajectory
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-8 md:pt-0 md:pl-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={502.4} strokeDashoffset={502.4 - (502.4 * risk) / 100}
                  className={`${risk > 70 ? 'text-red-500' : risk > 40 ? 'text-yellow-500' : 'text-green-500'} transition-all duration-500`} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{100 - risk}%</span>
                <span className="text-[10px] uppercase font-mono font-bold opacity-50">Stability Score</span>
              </div>
            </div>
            {risk > 50 && (
              <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse">
                <AlertTriangle size={14} /> HIGH DRIFT DETECTED
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}