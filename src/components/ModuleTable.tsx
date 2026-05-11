import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Bug, 
  Shield, 
  Trash2,
  ArrowUpDown
} from 'lucide-react';
import { ModuleData } from '../types';
import { StatusPill, RiskBadge, ProgressBar } from './Common';

interface TableProps {
  data: ModuleData[];
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
  onDelete: (id: string) => void;
}

export default function ModuleTable({ data, onUpdate, onDelete }: TableProps) {
  const [sortField, setSortField] = useState<keyof ModuleData>('readiness');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (field: keyof ModuleData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="glass-card overflow-hidden border-none shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/10">
              <th className="px-6 py-4 border-r border-white/5 whitespace-nowrap">
                <button onClick={() => handleSort('name')} className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                  Module Name <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 border-r border-white/5 min-w-[200px]">
                <button onClick={() => handleSort('readiness')} className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                  Production Readiness <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 border-r border-white/5">
                 <button onClick={() => handleSort('blockers')} className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                  Blockers <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 border-r border-white/5">
                 <button onClick={() => handleSort('bugs')} className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                  Bugs <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 border-r border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Risk Analysis (S/P/S)</span>
              </th>
              <th className="px-6 py-4 border-r border-white/5 whitespace-nowrap">
                <button onClick={() => handleSort('status')} className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40 hover:text-white transition-colors">
                  Launch Status <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {sortedData.map((module) => (
              <React.Fragment key={module.id}>
                <tr 
                  className={`table-row-hover group cursor-pointer ${expandedId === module.id ? 'bg-white/[0.03]' : ''}`}
                  onClick={() => setExpandedId(expandedId === module.id ? null : module.id)}
                >
                  <td className="px-6 py-5 border-r border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${module.status === 'Blocked' ? 'bg-red-500/10' : 'bg-white/5'}`}>
                        {expandedId === module.id ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                      </div>
                      <span className="font-semibold text-sm tracking-tight group-hover:text-purple-400 transition-colors uppercase">{module.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/5">
                    <div className="flex flex-col gap-2">
                       <div className="flex justify-between items-center text-[10px] font-mono">
                         <span className="text-white/40 tracking-tighter uppercase">Confidence Level</span>
                         <span className="text-white font-bold">{module.readiness}%</span>
                       </div>
                       <ProgressBar progress={module.readiness} />
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition-all ${
                        module.blockers > 0 ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-white/20 border-white/10'
                      }`}>
                        {module.blockers}
                      </div>
                      {module.blockers > 0 && <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
                    </div>
                  </td>
                   <td className="px-6 py-5 border-r border-white/5">
                     <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition-all ${
                        module.bugs > 0 ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-white/5 text-white/20 border-white/10'
                      }`}>
                        {module.bugs}
                      </div>
                      {module.bugs > 0 && <Bug className="w-3.5 h-3.5 text-orange-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1.5">
                        <RiskBadge level={module.scalingRisk} />
                        <RiskBadge level={module.performanceRisk} />
                        <RiskBadge level={module.securityRisk} />
                      </div>
                      <div className="flex flex-col gap-1.5 text-[8px] uppercase font-mono text-white/30 tracking-tight leading-none pt-1">
                        <span>Scaling</span>
                        <span>Perf</span>
                        <span>Sec</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-r border-white/5">
                    <StatusPill status={module.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                       <button 
                         onClick={(e) => { e.stopPropagation(); onDelete(module.id); }}
                         className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20"
                         title="Delete Module"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
                <AnimatePresence>
                   {expandedId === module.id && (
                     <motion.tr
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       className="bg-white/[0.02]"
                     >
                       <td colSpan={7} className="px-12 py-6 border-b border-white/5">
                         <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-purple-400">
                               <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                               Engineering Workflow Notes
                             </div>
                             <textarea 
                               value={module.notes || "No specific engineering notes recorded for this sync cycle. Awaiting module owner update."}
                               onChange={(e) => onUpdate(module.id, { notes: e.target.value })}
                               className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white/70 h-32 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                               onClick={(e) => e.stopPropagation()}
                             />
                             
                             <div className="pt-4 space-y-3">
                               <div className="flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-green-400">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                 Production Checklist
                               </div>
                               <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { label: 'Unit Tests', checked: module.readiness > 70 },
                                    { label: 'Security Scan', checked: module.securityRisk === 'Low' || module.securityRisk === 'None' },
                                    { label: 'Load Testing', checked: module.readiness > 85 },
                                    { label: 'Doc Update', checked: true }
                                  ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                                       <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${item.checked ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'border-white/20'}`}>
                                          {item.checked && <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]" />}
                                       </div>
                                       <span className="text-xs text-white/60 font-medium">{item.label}</span>
                                    </div>
                                  ))}
                               </div>
                             </div>
                           </div>
                           <div className="space-y-6">
                              <div className="flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-blue-400">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                               Compliance & Security
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                                 <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-white/40">
                                   <Shield className="w-3 h-3" />
                                   ISO Audit
                                 </div>
                                 <div className="text-sm font-semibold selection:bg-green-500/30">PASSED: V-3.1</div>
                               </div>
                               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                                 <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-white/40">
                                   <AlertTriangle className="w-3 h-3" />
                                   P1 Priority
                                 </div>
                                 <div className="text-sm font-semibold select-none">{module.blockers > 0 ? "ACTION REQUIRED" : "SAFE"}</div>
                               </div>
                             </div>
                             <div className="flex gap-3 pt-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onUpdate(module.id, { status: 'Ready', readiness: 100 }); }}
                                  className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] uppercase font-mono font-bold tracking-widest hover:bg-green-500/20 transition-all"
                                >
                                  Approve Module
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onUpdate(module.id, { status: 'Hardening' }); }}
                                  className="flex-1 py-2 rounded-lg bg-white/5 text-white/40 border border-white/10 text-[10px] uppercase font-mono font-bold tracking-widest hover:bg-white/10 transition-all"
                                >
                                  Request Audit
                                </button>
                             </div>
                           </div>
                         </div>
                       </td>
                     </motion.tr>
                   )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
