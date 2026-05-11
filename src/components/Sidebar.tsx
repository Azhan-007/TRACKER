import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Terminal, 
  Settings, 
  BarChart3, 
  Layers, 
  AlertOctagon,
  Search,
  LogOut,
  AppWindow
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Layers, label: 'Modules', active: false },
  { icon: ShieldCheck, label: 'Security Audit', active: false },
  { icon: BarChart3, label: 'Performance', active: false },
  { icon: AlertOctagon, label: 'Risk Analysis', active: false },
  { icon: Terminal, label: 'Deployment Logs', active: false },
];

const secondaryItems = [
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Logout' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-card rounded-none border-y-0 border-l-0 border-r-glass-border flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
          <AppWindow className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl tracking-tight">SuffaCampus</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">v2.4.0 Engine</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 px-4 mb-4 font-mono font-medium">Main Control</div>
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              item.active 
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
            {item.active && (
              <motion.div 
                layoutId="active-pill"
                className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
            )}
          </motion.button>
        ))}
      </nav>

      <div className="px-4 py-8 space-y-2 border-t border-glass-border">
        {secondaryItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-300"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
        
        <div className="mt-8 p-4 glass-card !bg-white/5 border-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono text-white/60">System Online</span>
          </div>
          <p className="text-xs text-white/40 leading-relaxed">
            Local cluster running in production hardening mode.
          </p>
        </div>
      </div>
    </aside>
  );
}
