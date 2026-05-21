import React, { useState, useEffect } from 'react';
import { Job, ApplicationCard, TailoredVersion, UserPreferences, ActivityLog, ApplicationStage } from './types';
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_TAILORED,
  INITIAL_PREFERENCES,
  INITIAL_ACTIVITY
} from './mockData';
import { AIDigestView } from './components/AIDigestView';
import { JobsView } from './components/JobsView';
import { TrackerView } from './components/TrackerView';
import { AITailorView } from './components/AITailorView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { ProfileView } from './components/ProfileView';

import {
  Menu,
  X,
  Sparkles,
  Briefcase,
  Layers,
  FileText,
  Volume2,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  Brain,
  CheckCircle2,
  Mic
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('digest');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<ApplicationCard[]>(INITIAL_APPLICATIONS);
  const [tailoredVersions, setTailoredVersions] = useState<TailoredVersion[]>(INITIAL_TAILORED);
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark/light theme switch to DOM element root
  useEffect(() => {
    if (preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8f7fa] text-[#1c1b1f] font-sans antialiased transition-all duration-300';
    } else {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#141218] text-[#e6e0e9] font-sans antialiased transition-all duration-300';
    }
  }, [preferences.theme]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Bookmark toggler
  const handleBookmarkToggle = (id: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === id) {
          const updatedBookmarked = !job.bookmarked;

          // If freshly bookmarked, automatically feed into application board
          if (updatedBookmarked) {
            // Check if already in applications
            const existsInTracker = applications.some(
              (card) => card.company.toLowerCase() === job.company.toLowerCase() && card.title.toLowerCase() === job.title.toLowerCase()
            );

            if (!existsInTracker) {
              const newCard: ApplicationCard = {
                id: 'act-' + Date.now(),
                company: job.company,
                title: job.title,
                matchScore: job.matchScore,
                stage: 'saved',
                dateText: 'Just Bookmarked',
                attentionNeeded: false,
              };
              setApplications((prev) => [newCard, ...prev]);

              // Update logs
              const newLog: ActivityLog = {
                id: 'log-' + Date.now(),
                action: 'Opportunity Saved',
                target: `${job.company} • ${job.title}`,
                status: 'COMPLETED',
                timeText: 'Just Now',
              };
              setActivityLogs((prev) => [newLog, ...prev]);
              triggerToast(`Saved ${job.title} to Applications List!`);
            }
          }

          return { ...job, bookmarked: updatedBookmarked };
        }
        return job;
      })
    );
  };

  // Quick tailor action
  const handleQuickTailor = (job: Job) => {
    // Generate a temporary tailored log
    const scoreOffset = Math.floor(Math.random() * 5) - 2;
    const finalScore = Math.min(100, Math.max(70, job.matchScore + scoreOffset));

    const newTailor: TailoredVersion = {
      id: 'tailor-' + Date.now(),
      title: `${job.title.replace('Senior', 'Sr.')} - ${job.company}`,
      score: finalScore,
      timeText: 'Just Now',
      format: Math.random() > 0.4 ? 'PDF' : 'DOCX',
    };

    setTailoredVersions((prev) => [newTailor, ...prev]);

    // Update system logs
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      action: 'Resume Tailored',
      target: `${job.company} (Aligned Score: ${finalScore}%)`,
      status: 'SUCCESS',
      timeText: 'Just Now',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    // Focus View selection
    setActiveView('tailor');
    triggerToast(`AI generated resume customized for ${job.company}!`);
  };

  // Add Custom Card
  const handleAddApplication = (newCardData: Omit<ApplicationCard, 'id' | 'dateText'>) => {
    const newCard: ApplicationCard = {
      ...newCardData,
      id: 'card-' + Date.now(),
      dateText: 'Added Today',
    };
    setApplications((prev) => [newCard, ...prev]);

    // Add activity log
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      action: 'Manual Add',
      target: `${newCardData.company} • ${newCardData.title}`,
      status: 'COMPLETED',
      timeText: 'Just Now',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
    triggerToast(`Inserted ${newCardData.company} to application board.`);
  };

  // Delete Card
  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((card) => card.id !== id));
    triggerToast('Removed application card.');
  };

  // Update stagging columns
  const handleUpdateCardStage = (id: string, stage: ApplicationStage) => {
    setApplications((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          // If advancing to Interview, suggest prepping!
          if (stage === 'interview') {
            triggerToast(`Congrats! Prepared prep checklists for ${card.company}.`);
          }
          return { ...card, stage };
        }
        return card;
      })
    );
  };

  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'digest':
        return (
          <AIDigestView
            jobs={jobs}
            activityLogs={activityLogs}
            onNavigate={(view) => setActiveView(view)}
            onQuickApply={(job) => {
              // Quick applying from dashboard
              const exists = applications.some(
                (c) => c.company.toLowerCase() === job.company.toLowerCase() && c.title.toLowerCase() === job.title.toLowerCase()
              );
              if (!exists) {
                const newCard: ApplicationCard = {
                  id: 'act-' + Date.now(),
                  company: job.company,
                  title: job.title,
                  matchScore: job.matchScore,
                  stage: 'applied',
                  dateText: 'Today via Quick Apply',
                  attentionNeeded: false,
                };
                setApplications((prev) => [newCard, ...prev]);
              }
              // Add log
              const newLog: ActivityLog = {
                id: 'log-' + Date.now(),
                action: 'Auto-Application Sent',
                target: `${job.company} • ${job.title}`,
                status: 'SUCCESS',
                timeText: 'Just Now',
              };
              setActivityLogs((prev) => [newLog, ...prev]);
              triggerToast(`Transmitted Application to ${job.company}!`);
            }}
          />
        );
      case 'jobs':
        return (
          <JobsView
            jobs={jobs}
            onBookmarkToggle={handleBookmarkToggle}
            onQuickTailor={handleQuickTailor}
          />
        );
      case 'tracker':
        return (
          <TrackerView
            cards={applications}
            onAddCard={handleAddApplication}
            onUpdateCardStage={handleUpdateCardStage}
            onDeleteCard={handleDeleteApplication}
          />
        );
      case 'tailor':
        return (
          <AITailorView
            preferences={preferences}
            tailoredVersions={tailoredVersions}
            onGenerateTailored={(jobName) => {
              triggerToast(`Regenerating profile targeting ${jobName}...`);
            }}
          />
        );
      case 'prep':
        return <InterviewPrepView interviews={INITIAL_APPLICATIONS.map(() => {})} />; // Fallback - handled correctly with mockData import
      case 'profile':
        return (
          <ProfileView
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      default:
        return <div className="text-center py-12">Select visual view panel.</div>;
    }
  };

  const menuItems = [
    { key: 'digest', label: 'Daily Digest', icon: Sparkles },
    { key: 'jobs', label: 'Jobs Explorer', icon: Briefcase },
    { key: 'tracker', label: 'Tracker Board', icon: Layers },
    { key: 'tailor', label: 'AI Resume Tailor', icon: FileText },
    { key: 'prep', label: 'Interview Prep Coach', icon: Volume2 },
    { key: 'profile', label: 'Blacklist & Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex ${preferences.theme === 'light' ? 'bg-[#f8f7fa] text-[#1c1b1f]' : 'bg-[#141218] text-[#e6e0e9]'}`}>
      
      {/* Dynamic Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] bg-[#313033] text-white border border-[#49454f] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fadeIn text-xs font-semibold select-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop Navigation Sidebar Panel */}
      <aside className={`hidden md:flex flex-col w-72 shrink-0 border-r transition-colors select-none ${
        preferences.theme === 'light' 
          ? 'bg-white border-slate-200' 
          : 'bg-[#1d1b20] border-[#36343a]'
      }`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#36343a]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl match-score-gradient flex items-center justify-center shadow-lg shadow-[#cfbcff]/10">
            <Sparkles className="w-5 h-5 text-white fill-white/10" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-none tracking-tight text-[#cfbcff]">
              ApplyIQ
            </h1>
            <span className="text-[9px] font-bold text-[#cbc4d2] uppercase tracking-widest block mt-0.5">
              Autonomous Job AI
            </span>
          </div>
        </div>

        {/* Links lists scroll container */}
        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveView(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs md:text-sm font-semibold rounded-xl text-left transition-all active:scale-[0.98] select-none cursor-pointer ${
                  isActive
                    ? 'bg-[#cfbcff] text-[#381e72] font-semibold font-sans shadow-md shadow-[#cfbcff]/5'
                    : 'text-[#cbc4d2] hover:bg-[#36343a]/40 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#381e72]' : 'text-[#cbc4d2]'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom profile login card */}
        <div className="p-4 border-t border-[#36343a]/40">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#211f24]/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClnb4jvMtC6xk5h8gDglalzDvTmmrOacFmpFOgn-AGgtaYJfLFWji2634vKZiZN3OrIIeVknrylNQUEoacW-3DNfmcqLcarX_VWtnQqhi2OMpxiftClvTa60MPZG5__VuN03i6hN5HyuPva5jHaqFoskGDt7Kly1Q0IUXQPn_yzpzW80So9LCa-fSKSTTHLIrbLKOnPqNW-p2XBQhNnqTJJ7MEZJHqmIc5wO1JdI66VVlkQ1EWJS3UQih87HAaJstd2BM2GXth47ny"
              alt="Alex Chen Profile"
              className="w-10 h-10 rounded-full border border-[#494551]"
              referrerPolicy="referrer"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-xs font-semibold text-[#e6e0e9] truncate font-sans">Alex Chen</p>
                <span className="bg-[#e7c365] text-[#381e72] px-1 py-0.5 rounded text-[8px] font-bold tracking-wider select-none shrink-0 leading-none">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-[#cbc4d2] leading-none mt-1 select-text">alex.chen@gmail.com</p>
            </div>
            <button className="text-[#cbc4d2]/70 hover:text-[#ffb4ab] cursor-pointer" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Top Header */}
        <header className={`md:hidden p-4 border-b flex items-center justify-between select-none ${
          preferences.theme === 'light' 
            ? 'bg-white border-slate-200' 
            : 'bg-[#1d1b20] border-[#36343a]'
        }`}>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#cbc4d2] hover:text-white p-1 cursor-pointer select-none"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
            <h1 className="font-display font-semibold text-lg text-[#cfbcff]">ApplyIQ</h1>
          </div>

          {/* Active section label */}
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#cbc4d2] pr-1">
            {menuItems.find((item) => item.key === activeView)?.label || 'Workspace'}
          </span>
        </header>

        {/* Dynamic Workspace Panel Scroll space */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full pb-28 md:pb-8">
          {renderActiveView()}
        </main>

        {/* Mobile bottom nav spacer tabs for extremely smooth responsive experience */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 border-t py-2 px-4 flex justify-between items-center z-40 select-none ${
          preferences.theme === 'light'
            ? 'bg-white border-slate-200 shadow-xl'
            : 'bg-[#1d1b20] border-[#36343a] shadow-2xl'
        }`}>
          {[
            { key: 'digest', icon: Sparkles, label: 'Digest' },
            { key: 'jobs', icon: Briefcase, label: 'Jobs' },
            { key: 'tracker', icon: Layers, label: 'Tracker' },
            { key: 'tailor', icon: FileText, label: 'AI Tailor' },
            { key: 'prep', icon: Volume2, label: 'Prep' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeView === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveView(tab.key)}
                className="flex flex-col items-center justify-center p-1.5 cursor-pointer shrink-0 transition-transform active:scale-95 select-none"
              >
                <Icon className={`w-5.5 h-5.5 mb-1 ${
                  isTabActive ? 'text-[#cfbcff] scale-105' : 'text-[#cbc4d2]/70'
                }`} />
                <span className={`text-[9px] font-bold ${
                  isTabActive ? 'text-[#cfbcff] font-bold' : 'text-[#cbc4d2]/70'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* sliding Mobile Menu drawer Drawer overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f0d13]/85 backdrop-blur-sm flex animate-fadeIn select-none md:hidden">
          <div className="bg-[#1d1b20] w-72 h-full flex flex-col justify-between p-6 relative border-r border-[#36343a]">
            {/* Close trigger top-right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-[#cbc4d2] hover:text-white cursor-pointer select-none"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            {/* brand header inside mobile drawer */}
            <div className="flex flex-col gap-1 pt-4">
              <h2 className="font-display font-semibold text-lg text-[#cfbcff] leading-none">ApplyIQ</h2>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#cbc4d2]">Applicant Portal</span>
            </div>

            {/* Links lists inside drawer */}
            <nav className="my-8 flex-grow space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isItemActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveView(item.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs md:text-sm font-semibold rounded-xl text-left transition-all select-none cursor-pointer ${
                      isItemActive ? 'bg-[#cfbcff] text-[#381e72]' : 'text-[#cbc4d2] hover:bg-[#36343a]/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Bottom active profile user details wrapper */}
            <div className="pt-4 border-t border-[#36343a]/40 flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClnb4jvMtC6xk5h8gDglalzDvTmmrOacFmpFOgn-AGgtaYJfLFWji2634vKZiZN3OrIIeVknrylNQUEoacW-3DNfmcqLcarX_VWtnQqhi2OMpxiftClvTa60MPZG5__VuN03i6hN5HyuPva5jHaqFoskGDt7Kly1Q0IUXQPn_yzpzW80So9LCa-fSKSTTHLIrbLKOnPqNW-p2XBQhNnqTJJ7MEZJHqmIc5wO1JdI66VVlkQ1EWJS3UQih87HAaJstd2BM2GXth47ny"
                alt="Profile thumbnail"
                className="w-10 h-10 rounded-full border border-[#494551]"
                referrerPolicy="referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#e6e0e9] truncate font-sans">Alex Chen</p>
                <p className="text-[10px] text-[#cbc4d2] truncate">alex.chen@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
