import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Status, RiskLevel } from '../types';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color: 'purple' | 'blue' | 'green' | 'red' | 'orange';
}

export function StatCard({ label, value, trend, icon: Icon, color }: StatCardProps) {
  const colorMap = {
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20 shadow-purple-500/10',
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20 shadow-blue-500/10',
    green: 'from-green-500/20 to-green-600/5 text-green-400 border-green-500/20 shadow-green-500/10',
    red: 'from-red-500/20 to-red-600/5 text-red-400 border-red-500/20 shadow-red-500/10',
    orange: 'from-orange-500/20 to-orange-600/5 text-orange-400 border-orange-500/20 shadow-orange-500/10',
  };

  const ringColorMap = {
    purple: 'bg-purple-500/20 text-purple-400',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`glass-card p-6 bg-gradient-to-br ${colorMap[color]} shadow-xl`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${ringColorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-xs font-mono px-2 py-1 rounded-full ${ringColorMap[color]} border border-current/20`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-white/50 text-sm font-medium mb-1">{label}</h3>
      <div className="text-3xl font-display font-bold text-white tracking-tight">{value}</div>
    </motion.div>
  );
}

export function StatusPill({ status }: { status: Status }) {
  const styles = {
    'Ready': 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_12px_-3px_rgba(34,197,94,0.3)]',
    'Hardening': 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_12px_-3px_rgba(249,115,22,0.3)]',
    'In-Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_12px_-3px_rgba(59,130,246,0.3)]',
    'Blocked': 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_12px_-3px_rgba(239,68,68,0.3)]',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all ${styles[status]}`}>
      {status}
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const styles = {
    'Critical': 'text-red-500 bg-red-500/10 border-red-500/30',
    'High': 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    'Medium': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    'Low': 'text-green-500 bg-green-500/10 border-green-500/30',
    'None': 'text-white/20 bg-white/5 border-white/10',
  };

  if (level === 'None') return <span className="text-white/20">—</span>;

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${styles[level]}`}>
      {level.toUpperCase()}
    </span>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full bg-gradient-to-r ${
          progress === 100 ? 'from-green-500 to-emerald-400' :
          progress > 80 ? 'from-blue-500 to-indigo-400' :
          progress > 50 ? 'from-purple-500 to-pink-400' :
          'from-orange-500 to-red-400'
        } shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
      />
    </div>
  );
}
