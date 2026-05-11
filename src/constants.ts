import { ModuleData } from './types';

export const MODULE_NAMES = [
  "Authentication & Sessions",
  "Student Management",
  "Teacher Management",
  "Attendance",
  "Classes & Sections",
  "Fees & Payments",
  "Library",
  "Results / Exams",
  "Timetable",
  "Assignments",
  "Events",
  "Notifications",
  "Dashboard & Analytics",
  "Reports & Exports",
  "Parent Portal",
  "Question Bank",
  "Subscriptions & Billing",
  "School Management",
  "Settings & Branding",
  "Audit Logs",
  "Search",
  "User & Role Management",
  "File Uploads / Storage",
  "Carousel",
  "API Keys",
  "Data Privacy / GDPR",
  "Webhooks",
  "Activity Feed"
];

const generateInitialData = (): ModuleData[] => {
  return MODULE_NAMES.map((name, index) => {
    // Generate some deterministic but realistic looking data
    const readiness = index % 5 === 0 ? 100 : Math.floor(Math.random() * 40) + 60;
    const blockers = index % 7 === 0 ? Math.floor(Math.random() * 3) + 1 : 0;
    const bugs = Math.floor(Math.random() * 5);
    
    let status: ModuleData['status'] = 'In-Progress';
    if (readiness === 100 && blockers === 0) status = 'Ready';
    else if (blockers > 0) status = 'Blocked';
    else if (readiness > 85) status = 'Hardening';

    const levels: ModuleData['scalingRisk'][] = ['Low', 'Medium', 'High', 'Critical', 'None'];
    
    return {
      id: `mod-${index}`,
      name,
      readiness,
      blockers,
      bugs,
      scalingRisk: levels[Math.floor(Math.random() * 3)], // Mostly low/med/high
      performanceRisk: levels[Math.floor(Math.random() * 3)],
      securityRisk: levels[Math.floor(Math.random() * 2)], // Focus on low/med
      status,
      notes: index % 4 === 0 ? "Initial audit completed. Performance metrics within bounds." : ""
    };
  });
};

export const INITIAL_MODULES = generateInitialData();
