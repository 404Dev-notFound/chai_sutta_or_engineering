import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RiskCalculator from "@/components/RiskCalculator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-white">
      <Navbar />
      <Hero />
      <RiskCalculator />
      
      {/* Feature Preview Section Placeholder */}
      <section className="py-20 max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-engineering mb-12">Core Intelligence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Skill Gap Heatmap', 'Career DNA Profile', 'Execution Roadmap'].map((feat) => (
            <div key={feat} className="p-8 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-engineering transition-colors text-left group">
              <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-900 mb-4 group-hover:bg-engineering/20 transition-colors" />
              <h4 className="font-bold mb-2">{feat}</h4>
              <p className="text-sm text-slate-500 font-mono">Real-time data visualization of your trajectory.</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}