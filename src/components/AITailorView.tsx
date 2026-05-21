import React, { useState } from 'react';
import { TailoredVersion, UserPreferences } from '../types';
import { Code, FileText, Check, Edit, Sparkles, Download, ArrowUpRight, HelpCircle, Eye, Settings, RefreshCw, Layers } from 'lucide-react';

interface AITailorViewProps {
  preferences: UserPreferences;
  tailoredVersions: TailoredVersion[];
  onGenerateTailored: (jobName: string) => void;
}

export const AITailorView: React.FC<AITailorViewProps> = ({
  preferences,
  tailoredVersions,
  onGenerateTailored,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'cover'>('resume');
  const [selectedJobDraft, setSelectedJobDraft] = useState('Senior Product Designer @ Stripe');
  const [aiBulletAccepted, setAiBulletAccepted] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [customCoverPrompt, setCustomCoverPrompt] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const draftsList = [
    'Senior Product Designer @ Stripe',
    'UX Engineer @ Vercel',
    'Product Lead @ OpenAI',
  ];

  const handleSimulateRegen = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setAiBulletAccepted(true);
    }, 1200);
  };

  const copyToClipboard = () => {
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Sub Tabs Toggle Nav */}
      <div className="flex items-center gap-1.5 bg-[#1d1b20] p-1 rounded-full w-fit">
        <button
          onClick={() => setActiveSubTab('resume')}
          className={`px-8 py-2 rounded-full font-sans text-xs font-semibold select-none cursor-pointer transition-all ${
            activeSubTab === 'resume'
              ? 'bg-[#cfbcff] text-[#381e72]'
              : 'text-[#cbc4d2] hover:bg-[#2b292f]'
          }`}
        >
          Resume
        </button>
        <button
          onClick={() => setActiveSubTab('cover')}
          className={`px-8 py-2 rounded-full font-sans text-xs font-semibold select-none cursor-pointer transition-all ${
            activeSubTab === 'cover'
              ? 'bg-[#cfbcff] text-[#381e72]'
              : 'text-[#cbc4d2] hover:bg-[#2b292f]'
          }`}
        >
          Cover Letter
        </button>
      </div>

      {/* Main Header */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-semibold tracking-tight text-[#e6e0e9]">
              {activeSubTab === 'resume' ? 'Tailor Your Resume' : 'Draft Cover Letter'}
            </h2>
            <p className="text-[#cbc4d2] text-sm mt-1 max-w-2xl">
              {activeSubTab === 'resume'
                ? 'Leverage AI to re-align your professional experience with specific job descriptions in seconds.'
                : 'Create highly aligned cover letters built around your master resume content and specific employer demands.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group min-w-[200px]">
              <select
                value={selectedJobDraft}
                onChange={(e) => setSelectedJobDraft(e.target.value)}
                className="appearance-none w-full bg-[#2b292f] border border-[#494551] text-[#e6e0e9] rounded-xl px-4 py-2.5 pr-10 hover:border-[#cfbcff] focus:outline-none text-xs font-semibold cursor-pointer"
              >
                {draftsList.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSimulateRegen}
              disabled={isRegenerating}
              className="bg-[#cfbcff] text-[#381e72] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all px-5 py-2.5 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 select-none cursor-pointer"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Master & Tailored Versions Index (span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Master Resume Upload details section */}
          <div className="bg-[#211f24] border border-[#494551] rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#cfbcff]/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold tracking-widest text-[#cbc4d2] uppercase">
                Active Source Document
              </h3>
              <Edit className="w-4 h-4 text-[#cfbcff] cursor-pointer hover:rotate-12 transition-transform" />
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-[#0f0d13] rounded-lg border border-[#494551]/60">
              <div className="bg-[#6750a4]/30 p-2.5 rounded-lg shrink-0">
                <FileText className="w-5 h-5 text-[#cfbcff]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#e6e0e9] truncate">
                  {preferences.masterResumeName}
                </p>
                <p className="text-[10px] text-[#cbc4d2] uppercase font-bold tracking-tighter mt-1">
                  Uploaded 2 days ago
                </p>
              </div>
            </div>
          </div>

          {/* Historical versions */}
          <div className="bg-[#211f24] border border-[#494551] rounded-xl p-5 flex flex-col justify-between flex-grow min-h-[300px]">
            <div>
              <h3 className="text-[11px] font-bold tracking-widest text-[#cbc4d2] uppercase mb-4">
                Tailored Versions List
              </h3>

              <div className="space-y-2">
                {tailoredVersions.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#1d1b20] hover:bg-[#2b292f] border border-transparent hover:border-[#494551] rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-[#e6e0e9] truncate pr-2">
                        {item.title}
                      </span>
                      <span className="text-[9px] bg-[#6750a4]/40 text-[#cfbcff] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                        {item.score}% Match
                      </span>
                    </div>
                    <p className="text-[10px] text-[#cbc4d2] uppercase tracking-wide mt-1.5 font-semibold">
                      {item.timeText} • {item.format}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 text-xs text-[#cfbcff] hover:brightness-110 py-2.5 border border-[#cfbcff]/20 hover:bg-[#cfbcff]/5 transition-all text-center rounded-lg font-semibold cursor-pointer">
              View Document Vault history
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Editor Pane (span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeSubTab === 'resume' ? (
            /* Resume Preview Canvas */
            <div className="bg-[#211f24] border border-[#494551] rounded-xl flex flex-col overflow-hidden min-h-[600px]">
              {/* Box Topbar controller */}
              <div className="flex items-center justify-between p-4 border-b border-[#494551] bg-[#1d1b20]">
                <div className="flex items-center gap-3.5">
                  <h3 className="text-xs font-bold text-[#e6e0e9]">
                    Draft: {selectedJobDraft}
                  </h3>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#cfbcff]/15 text-[#cfbcff] rounded text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 fill-[#cfbcff]/15" />
                    AI Optimized
                  </div>
                </div>

                <div className="flex items-center gap-1.5 justify-end">
                  <button className="p-1.5 hover:bg-[#36343a] text-[#cbc4d2] rounded transition-colors cursor-pointer" title="Download PDF format">
                    <Download className="w-3.5 h-3.5 text-inherit" />
                  </button>
                  <button className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-lg font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Save Draft
                  </button>
                </div>
              </div>

              {/* Core Resume Paper Simulation */}
              <div className="p-6 md:p-8 bg-[#1d1b20] flex-1 overflow-y-auto max-h-[500px]">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Summary Block */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#cfbcff] border-b border-[#494551]/60 pb-1 uppercase tracking-wider">
                      Professional Summary
                    </h4>
                    <p className="text-xs text-[#e6e0e9] leading-relaxed font-sans">
                      Strategic Product Designer with 6+ years of experience specialized in building{' '}
                      <span className="bg-[#cfbcff]/20 text-[#cfbcff] px-1 rounded font-medium">
                        scalable fintech infrastructure
                      </span>{' '}
                      and{' '}
                      <span className="bg-[#cfbcff]/20 text-[#cfbcff] px-1 rounded font-medium">
                        global payment systems
                      </span>
                      . Proven track record of reducing transaction friction by 24% through data-driven
                      UI improvements and systemic design thinking.
                    </p>
                  </div>

                  {/* Highlights Bullet List & Suggestion checklist card */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#cfbcff] border-b border-[#494551]/60 pb-1 uppercase tracking-wider">
                      Experience Highlights (Tailored)
                    </h4>

                    {/* AI Review suggestion */}
                    <div className="p-4 bg-[#2b292f] border-l-4 border-[#cfbcff] rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#cfbcff] uppercase tracking-widest flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#cfbcff]" />
                          AI Suggestion (Stripe Alignment)
                        </span>

                        <button
                          type="button"
                          onClick={() => setAiBulletAccepted(!aiBulletAccepted)}
                          className={`px-3 py-1 rounded text-[10px] font-bold transition-all uppercase tracking-wider flex items-center gap-1 select-none cursor-pointer ${
                            aiBulletAccepted
                              ? 'bg-[#cfbcff]/15 text-[#cfbcff]'
                              : 'bg-[#36343a] text-[#cbc4d2]'
                          }`}
                        >
                          {aiBulletAccepted ? (
                            <>
                              <Check className="w-3 h-3" /> Accepted
                            </>
                          ) : (
                            'Accept'
                          )}
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-[#cbc4d2]/50 line-through">
                          Managed the core dashboard design for merchant payouts.
                        </p>

                        <p className="text-[#e6e0e9] leading-relaxed">
                          {aiBulletAccepted ? (
                            <>
                              Architected a{' '}
                              <strong className="text-[#cfbcff] font-semibold">
                                merchant-first payout ecosystem
                              </strong>{' '}
                              for high-volume transactions, resulting in a{' '}
                              <strong className="text-[#cfbcff] font-semibold">30% increase in user retention</strong>{' '}
                              across Stripe's core dashboard platform.
                            </>
                          ) : (
                            <span>Managed the core dashboard design for merchant payouts.</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Standard bullet */}
                    <div className="p-4 bg-[#211f24] border border-[#494551] rounded-xl text-xs text-[#e6e0e9] leading-relaxed">
                      Collaborated with cross-functional engineering teams to implement a multi-regional
                      design system, reducing localized component debt by 45% within the first fiscal year.
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Gap Analysis Segment */}
              <div className="p-6 border-t border-[#494551] bg-[#211f24] relative">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#e6e0e9] font-display">
                      Match Gap Analysis
                    </h3>
                    <p className="text-xs text-[#cbc4d2] mt-0.5">
                      Comparing draft against candidate keyword parameters of active employer.
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-semibold text-[#cfbcff]">94%</span>
                    <span className="text-[10px] text-[#cbc4d2] uppercase tracking-wider block font-semibold">
                      Match Score
                    </span>
                  </div>
                </div>

                {/* Progress bar match score */}
                <div className="w-full bg-[#0f0d13] h-2 rounded-full overflow-hidden mb-5">
                  <div className="match-score-gradient h-full rounded-full w-[94%]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Verified Skills */}
                  <div>
                    <h4 className="text-[#cbc4d2] font-semibold mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Skills You Have
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Figma', 'Fintech Systems', 'React', 'Data Visualization', 'Agile'].map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Gap */}
                  <div>
                    <h4 className="text-[#cbc4d2] font-semibold mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-[#e7c365]" />
                      Skills Gaps (Required)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      <div className="group relative">
                        <span className="px-2.5 py-1 bg-[#e7c365]/10 text-[#e7c365] border border-[#e7c365]/20 rounded-full text-[11px] font-medium cursor-help flex items-center gap-1">
                          Global Compliance UX
                        </span>
                        {/* Interactive Tooltip box */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#36343a] border border-[#494551] rounded text-[10px] text-[#e6e0e9] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-normal leading-relaxed leading-snug">
                          Not explicitly mentioned in master resume. AI is generating a bridge experience bullet inside this draft.
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-[#e7c365]/10 text-[#e7c365] border border-[#e7c365]/20 rounded-full text-[11px] font-medium">
                        Stripe API Knowledge
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Cover Letter Preview Canvas */
            <div className="bg-[#211f24] border border-[#494551] rounded-xl flex flex-col overflow-hidden min-h-[600px] text-xs">
              <div className="p-4 border-b border-[#494551] bg-[#1d1b20] flex justify-between items-center">
                <h3 className="font-bold text-[#e6e0e9]">
                  Cover Letter Draft (Fintech Focus)
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-1 px-3.5 hover:bg-[#36343a] text-[#cbc4d2] rounded-lg transition-colors border border-[#494551] flex items-center gap-1 cursor-pointer select-none active:scale-95 text-[11px] font-semibold"
                  >
                    {copiedNotification ? 'Copied!' : 'Copy Letter'}
                  </button>
                  <button className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-lg font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                    Save final
                  </button>
                </div>
              </div>

              {/* Cover Letter interactive tuning text prompt */}
              <div className="p-4 bg-[#2b292f] border-b border-[#494551] space-y-2">
                <p className="text-[11px] text-[#cbc4d2] font-semibold uppercase tracking-wider">
                  Refine Cover Letter tone:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customCoverPrompt}
                    onChange={(e) => setCustomCoverPrompt(e.target.value)}
                    placeholder="e.g. emphasize my Stripe payment API and high density systems design elements..."
                    className="flex-grow bg-[#1d1b20] border border-[#494551] rounded-xl p-2.5 text-xs text-[#e6e0e9] focus:outline-none focus:border-[#cfbcff]"
                  />
                  <button
                    onClick={handleSimulateRegen}
                    disabled={isRegenerating || !customCoverPrompt}
                    className="bg-[#6750a4] text-white hover:brightness-110 disabled:opacity-50 px-4 rounded-xl font-semibold select-none cursor-pointer"
                  >
                    Retarget
                  </button>
                </div>
              </div>

              {/* Paper simulation */}
              <div className="p-8 bg-[#1d1b20] flex-1 overflow-y-auto text-xs text-[#e6e0e9] leading-relaxed max-h-[450px]">
                <div className="max-w-2xl mx-auto space-y-4 font-sans select-text">
                  <p className="text-[#cbc4d2] text-right">May 21, 2026</p>
                  <p className="font-semibold text-[#e6e0e9]">Hiring Team</p>
                  <p className="font-semibold text-[#cbc4d2]">Stripe, Inc.</p>
                  <br />
                  <p className="font-semibold text-[#cfbcff]">
                    Subject: Senior Product Designer Application Alignment
                  </p>
                  <br />
                  <p>Dear Stripe Talent Acquisition Team,</p>
                  <p>
                    I am writing to express my strong professional alignment for the Senior Product Designer role.
                    Stripe’s commitment to building elegant global economic infrastructure is legendary, and my
                    background over the past six years is built specifically around this balance of design and
                    deep code interfaces.
                  </p>
                  <p>
                    Having engineered customized web components and payment dashboard flows, I understand first-hand
                    how crucial it is to design APIs that developers can trust intuitively. At Stripe, I hope to utilize
                    this depth in Figma variables, design systems, and data-dense dashboards to reduce checkout
                    repaints and build high-performance dashboard layouts.
                  </p>
                  <p>
                    Thank you for your review. My master resume, alongside my validated fintech case portfolio,
                    is attached for your consideration.
                  </p>
                  <br />
                  <p>Sincerely,</p>
                  <p className="font-semibold text-[#cfbcff]">Alex Chen</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
