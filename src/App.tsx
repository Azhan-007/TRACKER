import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Download, 
  Filter, 
  RotateCcw, 
  LayoutDashboard, 
  AlertOctagon, 
  Bug, 
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import Navbar from './components/Navbar';
import ModuleTable from './components/ModuleTable';
import { StatCard } from './components/Common';
import { INITIAL_MODULES } from './constants';
import { ModuleData } from './types';

export default function App() {
  const [modules, setModules] = useState<ModuleData[]>(INITIAL_MODULES);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(modules, null, 2));
    const downloadNode = document.createElement('a');
    downloadNode.setAttribute("href", dataStr);
    downloadNode.setAttribute("download", `suffacampus_audit_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadNode);
    downloadNode.click();
    downloadNode.remove();
  };

  const handleAddModule = () => {
    const newModule: ModuleData = {
      id: `MOD-${Math.floor(Math.random() * 10000)}`,
      name: `New Module ${modules.length + 1}`,
      readiness: 0,
      blockers: 0,
      bugs: 0,
      scalingRisk: 'High',
      performanceRisk: 'High',
      securityRisk: 'High',
      status: 'In-Progress',
      notes: ''
    };
    setModules([...modules, newModule]);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1000);
  };

  const stats = useMemo(() => {
    const total = modules.length;
    const ready = modules.filter(m => m.status === 'Ready').length;
    const totalBlockers = modules.reduce((acc, m) => acc + m.blockers, 0);
    const criticalRisks = modules.filter(m => m.scalingRisk === 'Critical' || m.securityRisk === 'Critical').length;
    const avgReadiness = Math.round(modules.reduce((acc, m) => acc + m.readiness, 0) / total);

    return {
      completion: avgReadiness,
      readyModules: ready,
      total,
      blockers: totalBlockers,
      criticalRisks,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }, [modules]);

  const handleUpdateModule = (id: string, updates: Partial<ModuleData>) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex bg-graphite text-white font-sans overflow-hidden">
      
      <main className="flex-1 min-h-screen flex flex-col relative w-full">
        {/* Background glow effects */}
        <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Dashboard Header */}
          <header className="flex justify-between items-end">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                  Engineering War Room
                </div>
                <div className="text-white/20 font-mono text-xs">•</div>
                <div className="text-white/40 font-mono text-xs font-medium">Last system sync: {stats.lastUpdated}</div>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-display font-bold tracking-tight text-white mb-2"
              >
                Production Readiness <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Tracker</span>
              </motion.h2>
              <p className="text-white/40 max-w-xl leading-relaxed text-sm">
                Real-time audit of SuffaCampus ERP modules. Track deployment blockers, security risks, and scaling bottlenecks before the general availability release.
              </p>
            </div>
            
            <div className="flex gap-4">
              <motion.button 
                onClick={handleExport}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 glass-card !bg-white/5 border-white/10 hover:border-white/20 text-sm font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Export Audit
              </motion.button>
              <motion.button 
                onClick={handleAddModule}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/20 border border-purple-400/20"
              >
                <Plus className="w-4 h-4" />
                Add Module
              </motion.button>
            </div>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Overall Readiness" 
              value={`${stats.completion}%`} 
              trend="+12% weekly" 
              icon={TrendingUp} 
              color="purple" 
            />
            <StatCard 
              label="Active Blockers" 
              value={stats.blockers} 
              trend="2 critical" 
              icon={AlertOctagon} 
              color="red" 
            />
            <StatCard 
              label="Open Bugs" 
              value={modules.reduce((acc, m) => acc + m.bugs, 0)} 
              trend="-5 resolved" 
              icon={Bug} 
              color="blue" 
            />
            <StatCard 
              label="Ready for Launch" 
              value={`${stats.readyModules}/${stats.total}`} 
              trend="Next sync: 2h" 
              icon={ShieldCheck} 
              color="green" 
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-2 glass-card !rounded-2xl border-white/10">
             <div className="flex items-center gap-2 px-4 h-full border-r border-white/10 pr-6">
                <Filter className="w-4 h-4 text-white/30" />
                <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-bold">Filters</span>
             </div>
             
             <div className="flex gap-2 flex-1">
                {['All', 'Ready', 'Hardening', 'In-Progress', 'Blocked'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      filterStatus === status 
                        ? 'bg-white/10 border-white/20 text-white shadow-lg' 
                        : 'bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
             </div>

             <div className="h-8 w-px bg-white/10 hidden sm:block mx-4" />

             <div className="flex gap-4 pr-4">
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-mono text-green-400 font-bold tracking-widest uppercase">System Online</span>
                   </div>
                </div>
                
                <button 
                  onClick={handleSync}
                  className="p-2.5 rounded-xl bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all"
                >
                  <RotateCcw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                </button>
             </div>
          </div>

          {/* Main Tracker Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ModuleTable 
              data={filteredModules} 
              onUpdate={handleUpdateModule}
            />
          </motion.div>

          <footer className="py-12 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-mono tracking-[0.2em] text-white/20">
             <div>SuffaCampus ERP • Deployment Engine v2.4</div>
             <div className="flex gap-8">
                <a href="#" className="hover:text-purple-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-purple-400 transition-colors">API Status</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Infrastructure</a>
             </div>
             <div>© 2026 Engineering Operations</div>
          </footer>
        </div>
      </main>
    </div>
  );
}
