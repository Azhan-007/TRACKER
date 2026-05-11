export type Status = 'Ready' | 'Hardening' | 'In-Progress' | 'Blocked';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical' | 'None';

export interface ModuleData {
  id: string;
  name: string;
  readiness: number; // 0-100
  blockers: number;
  bugs: number;
  scalingRisk: RiskLevel;
  performanceRisk: RiskLevel;
  securityRisk: RiskLevel;
  status: Status;
  notes: string;
}

export interface DashboardStats {
  overallCompletion: number;
  totalBlockers: number;
  criticalRisks: number;
  lastUpdated: string;
}
