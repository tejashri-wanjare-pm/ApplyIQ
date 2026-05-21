import React, { useState } from 'react';
import { ActivityLog, Job } from '../types';
import { Sparkles, Calendar, Clock, AlertTriangle, TrendingUp, Brain, Send, Search, CheckCircle, ArrowRight } from 'lucide-react';

interface AIDigestViewProps {
  jobs: Job[];
  activityLogs: ActivityLog[];
  onNavigate: (view: string) => void;
  onQuickApply: (job: Job) => void;
}

export const AIDigestView: React.FC<AIDigestViewProps> = ({
  jobs,
  activityLogs,
  onNavigate,
  onQuickApply,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);

  // Filter 2 highest matched jobs for "New Matches" highlight
  const newMatches = [...jobs]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 2);

  const handleFreshSearch = () => {
    setIsSearching(true);
    setSearchProgress(10);
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSearching(false);
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[#cfbcff] text-xs font-bold tracking-widest uppercase mb-1 block">Autonomous Overview</span>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-[#e6e0e9]">
            Daily Digest
          </h2>
          <p className="text-[#cbc4d2] text-sm mt-1">
            Thursday, May 21, 2026 • Morning autonomous evaluation
          </p>
        </div>

        <button
          onClick={handleFreshSearch}
          disabled={isSearching}
          className={`px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 select-none active:scale-[0.98] transition-all cursor-pointer ${
            isSearching
              ? 'bg-[#36343a] text-[#cbc4d2] cursor-not-allowed'
              : 'bg-[#cfbcff] text-[#381e72] hover:brightness-110 shadow-lg shadow-[#cfbcff]/10'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
          {isSearching ? `Scanning Boards (${searchProgress}%)` : 'Run Fresh Search'}
        </button>
      </div>

      {/* Simulated Search Progress Bar */}
      {isSearching && (
        <div className="w-full bg-[#0f0d13] h-1.5 rounded-full overflow-hidden transition-all duration-300">
          <div
            className="match-score-gradient h-full transition-all duration-200"
            style={{ width: `${searchProgress}%` }}
          />
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: New Matches (Grid span 8) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#e6e0e9] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#cfbcff] fill-[#cfbcff]/10" />
              New Match Alignments
            </h3>
            <span className="text-xs bg-[#2b292f] text-[#cfbcff] border border-[#cfbcff]/10 px-3 py-1 rounded-full font-medium">
              3 High Matches Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newMatches.map((job) => (
              <div
                key={job.id}
                className="bg-[#211f24] hover:bg-[#2b292f] border border-[#494551] hover:border-[#cfbcff]/30 rounded-xl p-5 transition-all group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#cfbcff]/5 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none group-hover:scale-150 transition-all duration-500" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#36343a] flex items-center justify-center border border-[#494551] overflow-hidden whitespace-nowrap">
                      {job.logoUrl ? (
                        <img src={job.logoUrl} alt={job.company} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-[#cfbcff] font-bold text-sm">{job.company.substring(0, 2)}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-[#cfbcff] font-bold text-sm block">{job.matchScore}%</span>
                      <span className="text-[10px] text-[#cbc4d2] uppercase tracking-wider">Match Score</span>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-[#e6e0e9] group-hover:text-[#cfbcff] transition-colors line-clamp-1">
                    {job.title}
                  </h4>
                  <p className="text-xs text-[#cbc4d2] mb-4">
                    {job.company} • {job.location}
                  </p>

                  {/* Linear Match Bar */}
                  <div className="w-full bg-[#0f0d13] h-1.5 rounded-full overflow-hidden mb-4">
                    <div
                      className="match-score-gradient h-full rounded-full"
                      style={{ width: `${job.matchScore}%` }}
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {job.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#36343a] text-[#cbc4d2] border border-[#494551] text-[10px] uppercase font-semibold rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onQuickApply(job)}
                  className="w-full py-2 bg-[#4d4465]/30 hover:bg-[#6750a4] text-[#cfbcff] hover:text-white border border-[#cfbcff]/20 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-150 active:scale-[0.98]"
                >
                  Quick Apply
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => onNavigate('jobs')}
              className="text-[#cfbcff] hover:brightness-110 text-xs font-medium flex items-center gap-1 group transition-all"
            >
              View All New Jobs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Right Column: Key Alerts & Telemetry Insights (Span 4) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Action Required Panel */}
          <div className="bg-[#211f24] border border-[#494551] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#cfbcff] uppercase mb-4 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#e7c365]" />
                Action Items
              </h3>

              <div className="space-y-3">
                {/* Item 1 */}
                <div
                  onClick={() => onNavigate('tracker')}
                  className="flex gap-3 p-3 rounded-lg bg-[#2b292f]/40 hover:bg-[#2b292f] border-l-4 border-[#ffb4ab] transition-all cursor-pointer group"
                >
                  <Clock className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium text-[#e6e0e9] group-hover:text-[#cfbcff] transition-colors">
                      Nudge Stripe Recruiter
                    </h4>
                    <p className="text-[11px] text-[#cbc4d2] mt-0.5 leading-relaxed">
                      Staff Designer application has rested in 'Saved' for 5 days. Run candidate outreach.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div
                  onClick={() => onNavigate('prep')}
                  className="flex gap-3 p-3 rounded-lg bg-[#2b292f]/40 hover:bg-[#2b292f] border-l-4 border-[#e7c365] transition-all cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-[#e7c365] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium text-[#e6e0e9] group-hover:text-[#cfbcff] transition-colors">
                      Interview with Linear
                    </h4>
                    <p className="text-[11px] text-[#cbc4d2] mt-0.5 leading-relaxed">
                      Scheduled for Saturday morning (GMT+1). Recite recommended salary targets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('prep')}
              className="w-full mt-6 py-2.5 bg-[#4d4465] text-[#e0d2ff] hover:brightness-110 rounded-lg text-xs font-semibold transition-all duration-150 text-center uppercase"
            >
              Start Interview Prep
            </button>
          </div>

          {/* Market Intelligence Updates */}
          <div className="bg-[#211f24] border border-[#494551] rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-[#cbc4d2] uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#e7c365]" />
              Market Intelligence
            </h3>

            <div className="space-y-3">
              {/* Insight Card 1 */}
              <div className="bg-[#1d1b20] p-3 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#cbc4d2] uppercase font-bold">Salary Match index</span>
                  <span className="text-[#cfbcff] text-xs font-bold">14 New Roles</span>
                </div>
                <p className="text-xs text-[#e6e0e9] leading-relaxed">
                  Design positions in the <strong className="text-[#cfbcff] font-semibold">$180k+</strong> range surged by <span className="text-emerald-400 font-semibold">+12%</span> in your targeted sectors this week.
                </p>
              </div>

              {/* Insight Card 2 */}
              <div className="bg-[#1d1b20] p-3 rounded-lg border-t border-[#6750a4]/30 space-y-1">
                <span className="text-[10px] text-[#cbc4d2] uppercase font-bold block">Talent Keyword Shifts</span>
                <div className="flex items-start gap-2.5">
                  <Brain className="w-4 h-4 text-[#cfbcff] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#cbc4d2] leading-relaxed">
                    <strong className="text-[#e6e0e9] font-semibold">"AI Governance"</strong> mentions increased on 40% of newly published tech designer titles. Re-verify resume keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Lower Section: Recent Automated Actions */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-[#e6e0e9]">
          Recent System Operations
        </h3>

        <div className="bg-[#1d1b20] border border-[#494551] rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs text-[#e6e0e9] border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-[#2b292f] text-[#cbc4d2] border-b border-[#494551]">
                <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider">Executed Action</th>
                <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider">Target Domain</th>
                <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider">Transmission Status</th>
                <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-right">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#494551]/60">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#211f24] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-2.5 font-medium">
                    {log.action.includes('Apply') ? (
                      <Send className="w-3.5 h-3.5 text-[#cfbcff]" />
                    ) : log.action.includes('Referral') ? (
                      <Brain className="w-3.5 h-3.5 text-[#cdc0e9]" />
                    ) : (
                      <Search className="w-3.5 h-3.5 text-[#948e9c]" />
                    )}
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-[#cbc4d2]">{log.target}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : log.status === 'PENDING'
                          ? 'bg-[#e7c365]/10 text-[#e7c365]'
                          : 'bg-[#cbc4d2]/10 text-[#cbc4d2]'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[#cbc4d2]">{log.timeText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
