import { Search, Bell, User, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  return (
    <nav className="h-20 glass-card border-x-0 border-t-0 rounded-none border-b-glass-border px-8 flex items-center justify-between sticky top-0 bg-graphite/40 backdrop-blur-md z-40">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <span>Enterprise</span>
          <span className="text-white/10">/</span>
          <span className="text-white/80 font-medium">Production Readiness</span>
        </div>
        
        <div className="relative w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-purple-500 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clusters, modules, or risks..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
             <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/30 font-mono">⌘</kbd>
             <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/30 font-mono">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 glass-card !bg-white/5 !rounded-xl text-xs font-mono text-white/40 border-none">
          <Calendar className="w-3.5 h-3.5" />
          <span>Launch: June 15, 2026</span>
        </div>

        <button className="relative p-2 text-white/50 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-graphite" />
        </button>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right">
            <p className="text-xs font-semibold text-white/90">Yasar Bro</p>
            <p className="text-[10px] text-white/30 uppercase font-mono tracking-wider">CTO / Lead</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 p-0.5 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
            <div className="w-full h-full rounded-[10px] overflow-hidden bg-graphite flex items-center justify-center">
              <User className="text-white/50 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
