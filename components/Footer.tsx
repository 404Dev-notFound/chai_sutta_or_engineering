export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
          <div className="font-bold text-xl mb-4">CS.E</div>
          <p className="text-slate-500 text-sm max-w-xs font-mono">
            The execution-first career platform for modern engineers. Build proof, not just resumes.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm">Product</h4>
          <ul className="text-slate-500 text-sm space-y-2 font-mono">
            <li>Career DNA</li>
            <li>Risk Engine</li>
            <li>Roadmaps</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm">Legal</h4>
          <ul className="text-slate-500 text-sm space-y-2 font-mono">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-slate-100 dark:border-slate-900 pt-8 gap-4">
        <p className="text-xs text-slate-400 font-mono">© 2024 CS.E Platform. All rights reserved.</p>
        <p className="text-xs font-bold tracking-widest uppercase">
          Made with <span className="text-red-500">❤️</span> in India
        </p>
      </div>
    </footer>
  );
}