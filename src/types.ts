export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Hybrid' | 'Remote' | 'On-site';
  matchScore: number;
  sourceName: string; // e.g., LinkedIn, Indeed, Company Site
  sourceIcon: string; // lucide icon name matching
  logoUrl: string;
  salaryRange: string;
  tags: string[];
  bookmarked?: boolean;
}

export type ApplicationStage = 'saved' | 'applied' | 'screening' | 'interview';

export interface ApplicationCard {
  id: string;
  company: string;
  title: string;
  matchScore: number;
  stage: ApplicationStage;
  dateText: string;
  attentionNeeded?: boolean;
  notes?: string;
  stageDetails?: string; // e.g. "Phase 3: Final" or "Google Meet"
}

export interface TailoredVersion {
  id: string;
  title: string;
  score: number;
  timeText: string;
  format: 'PDF' | 'DOCX';
}

export interface InterviewEvent {
  id: string;
  company: string;
  title: string;
  dateText: string;
  logoUrl: string;
  type: string; // "Google Meet" etc.
  statusText: string; // "In 2 Days"
  matchScore: number;
  focusAreas: string;
  salaryMinMax: string;
  cultureDescription: string;
  recentNews: string[];
  imageUri: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
  checklist: {
    id: string;
    text: string;
    checked: boolean;
  }[];
}

export interface UserPreferences {
  targetRoles: string;
  targetLocations: string;
  minSalary: string;
  language: string;
  blockedCompanies: string[];
  excludedKeywords: string[];
  emailReport: boolean;
  pushNotifications: boolean;
  deliveryTime: string;
  theme: 'dark' | 'light';
  masterResumeName: string;
  masterResumeUpdated: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'PENDING' | 'COMPLETED';
  timeText: string;
}
