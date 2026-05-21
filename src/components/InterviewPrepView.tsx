import React, { useState } from 'react';
import { InterviewEvent } from '../types';
import { Play, Mic, MicOff, Calendar, Video, MapPin, CheckCircle, ChevronDown, ChevronUp, Search, TrendingUp, Sparkles, CheckSquare, PlusCircle, X } from 'lucide-react';

interface InterviewPrepViewProps {
  interviews: InterviewEvent[];
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ interviews }) => {
  const [selectedEventId, setSelectedEventId] = useState('i1');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>('q1');
  const [eventChecklist, setEventChecklist] = useState<Record<string, { id: string; text: string; checked: boolean }[]>>(() => {
    // Map initial state on component load
    const initial: Record<string, { id: string; text: string; checked: boolean }[]> = {};
    interviews.forEach((v) => {
      initial[v.id] = [...v.checklist];
    });
    return initial;
  });

  // Speech prep states
  const [isLivePracticeOpen, setIsLivePracticeOpen] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);
  const [practiceText, setPracticeText] = useState('');
  const [practiceEvaluation, setPracticeEvaluation] = useState<any | null>(null);

  const activeEvent = interviews.find((v) => v.id === selectedEventId) || interviews[0];

  const handleToggleCheck = (eventId: string, itemId: string) => {
    setEventChecklist((prev) => {
      const currentList = prev[eventId] || [];
      return {
        ...prev,
        [eventId]: currentList.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      };
    });
  };

  const currentChecklist = eventChecklist[activeEvent.id] || activeEvent.checklist;

  const handleQuestionToggle = (qId: string) => {
    setOpenQuestionId((prev) => (prev === qId ? null : qId));
  };

  const handleMicTrigger = () => {
    if (isMicListening) {
      // Stopped, evaluate
      setIsMicListening(false);
      setPracticeText(
        'For Linear issue tracking, I would focus on progressive disclosure. Power users like keyboard shortcuts, so we must expose a fast command palette. Keyboard trigger operations reduce friction while keeping the visual layout extremely clean.'
      );
      setPracticeEvaluation({
        score: '96%',
        keywordsMatched: ['progressive disclosure', 'command palette', 'friction', 'visual layout'],
        feedback: 'Excellent vocal cadence. Used 4 targeted resume power verbs. Speech speed is at an optimal 140 WPM.',
      });
    } else {
      // Start listening
      setIsMicListening(true);
      setPracticeText('Listening... State your response to Question 1 in the microphone.');
      setPracticeEvaluation(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeUp relative">
      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Calendar List & Negotiation range (span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-semibold tracking-tight text-[#e6e0e9]">
              Upcoming
            </h3>
            <span className="bg-[#6750a4]/30 text-[#cfbcff] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase select-none">
              3 Scheduled
            </span>
          </div>

          {/* Calendar List */}
          <div className="space-y-4">
            {interviews.map((evt) => {
              const isSelected = evt.id === activeEvent.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all select-none border ${
                    isSelected
                      ? 'bg-[#4d4465]/40 border-[#cfbcff] shadow-lg shadow-[#cfbcff]/5 hover:brightness-105'
                      : 'bg-[#211f24] hover:bg-[#2b292f] border-[#494551] hover:border-[#948e9c]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#36343a] flex items-center justify-center border border-[#494551] overflow-hidden">
                        {evt.logoUrl ? (
                          <img src={evt.logoUrl} alt={evt.company} className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="text-[#cfbcff] font-bold text-xs">{evt.company[0]}</span>
                        )}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? 'text-[#cfbcff]' : 'text-[#cbc4d2]'}`}>
                          {evt.company}
                        </p>
                        <p className="text-[11px] text-[#cbc4d2]/80 font-medium truncate max-w-[120px]">
                          {evt.title}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-[#cfbcff] font-bold select-none whitespace-nowrap">
                      {evt.statusText}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#cbc4d2]/80 mt-1">
                    <Video className="w-3.5 h-3.5 text-[#cfbcff]" />
                    <span>{evt.dateText}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Salary negotiation target widget */}
          <div className="bg-[#211f24] border border-[#494551] rounded-xl p-5 relative overflow-hidden">
            <h4 className="text-xs font-bold tracking-widest text-[#e7c365] mb-4 uppercase">
              Negotiation Intelligence
            </h4>

            <div className="flex justify-between items-end mb-2">
              <span className="text-xs text-[#cbc4d2]">Estimated Range</span>
              <span className="text-base font-bold text-[#e6e0e9]">{activeEvent.salaryMinMax}</span>
            </div>

            {/* Range gauge bar */}
            <div className="w-full bg-[#0f0d13] h-2 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#e7c365] w-[65%] rounded-full" />
            </div>

            <p className="text-xs text-[#cbc4d2] leading-relaxed">
              Based on your years of validated experience and current local market variables for a "
              {activeEvent.title}" target in the tech sector.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Prep Materials Sheet (span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Cover card with Match Rate */}
          <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-1 z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#cfbcff] uppercase tracking-widest select-none">
                  Preparation Active
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </div>

              <h2 className="text-xl font-semibold text-[#e6e0e9] font-display">
                {activeEvent.title} @ {activeEvent.company}
              </h2>
              <p className="text-xs text-[#cbc4d2] font-semibold">{activeEvent.focusAreas}</p>
            </div>

            {/* Match score gauge */}
            <div className="text-right sm:text-right shrink-0 z-10">
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-3xl font-bold font-display text-[#cfbcff] leading-none">
                  {activeEvent.matchScore}%
                </span>
                <span className="text-xs text-[#cbc4d2] font-medium tracking-tight">Match</span>
              </div>

              {/* Matching progress track */}
              <div className="w-28 h-1.5 bg-[#0f0d13] rounded-full overflow-hidden mt-1.5 border border-[#494551]/30">
                <div
                  className="h-full match-score-gradient rounded-full"
                  style={{ width: `${activeEvent.matchScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top 10 Questions Accordeon (span 2) */}
            <div className="md:col-span-2 bg-[#211f24] border border-[#494551] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#cfbcff]" />
                <h3 className="text-base font-semibold text-[#e6e0e9]">
                  Top Likely Questions
                </h3>
              </div>

              <div className="space-y-3">
                {activeEvent.questions.map((q) => {
                  const isOpen = openQuestionId === q.id;
                  return (
                    <div
                      key={q.id}
                      className="bg-[#1d1b20] border border-[#494551]/80 rounded-xl overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion header click wrapper */}
                      <div
                        onClick={() => handleQuestionToggle(q.id)}
                        className="flex justify-between items-start gap-4 p-4 cursor-pointer hover:bg-[#2b292f] select-none text-xs"
                      >
                        <p className="font-semibold text-[#e6e0e9] pr-4 leading-relaxed">
                          {q.question}
                        </p>
                        <button className="text-[#cbc4d2] pt-0.5 shrink-0">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Accordion body container */}
                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-[#494551]/35 select-text p-4">
                          <div className="mt-4 p-3.5 rounded-lg bg-[#cfbcff]/5 border-l-4 border-[#cfbcff] space-y-1.5">
                            <span className="text-[10px] font-bold text-[#cfbcff] uppercase tracking-widest block">
                              AI Suggested Response Strategy
                            </span>
                            <p className="text-xs text-[#e6e0e9] leading-relaxed italic">
                              "{q.answer}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-4 py-2.5 bg-[#4d4465]/35 border border-[#cfbcff]/20 text-[#cfbcff] rounded-xl text-xs font-semibold uppercase hover:bg-[#4d4465]/50 transition-colors select-none">
                Generate More Questions with Gemini
              </button>
            </div>

            {/* Column 1: Company Deep Dive details */}
            <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Search className="w-4.5 h-4.5 text-[#e7c365]" />
                <h3 className="text-sm font-semibold text-[#e6e0e9]">
                  Company Analysis
                </h3>
              </div>

              {/* Hotlinked Office Image */}
              {activeEvent.imageUri && (
                <div className="relative rounded-xl overflow-hidden h-28 border border-[#494551]/60">
                  <img src={activeEvent.imageUri} alt="Office" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141218]/90 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[10px] uppercase tracking-wider font-bold text-white">
                    {activeEvent.company} HQ • SF
                  </span>
                </div>
              )}

              <div className="space-y-3 font-sans text-xs">
                <div>
                  <p className="text-[10px] font-bold text-[#e7c365] uppercase tracking-wider mb-1">
                    Culture & Values
                  </p>
                  <p className="text-[#cbc4d2] leading-relaxed">
                    {activeEvent.cultureDescription}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#e7c365] uppercase tracking-wider mb-1.5">
                    Recent News
                  </p>
                  <ul className="list-disc list-inside text-[#cbc4d2] space-y-1">
                    {activeEvent.recentNews.map((news, idx) => (
                      <li key={idx} className="leading-normal">
                        {news}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: Preparation Checklist */}
            <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4.5 h-4.5 text-[#cdc0e9]" />
                <h3 className="text-sm font-semibold text-[#e6e0e9]">
                  Preparation Checklist
                </h3>
              </div>

              <div className="flex flex-col gap-2.5">
                {currentChecklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-[#1d1b20] hover:bg-[#2b292f] border border-[#494551]/40 rounded-xl cursor-pointer transition-colors group select-none text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleCheck(activeEvent.id, item.id)}
                      className="mt-0.5 rounded border-[#494551] bg-[#1d1b20] text-[#cfbcff] focus:ring-[#cfbcff] cursor-pointer"
                    />
                    <span
                      className={`font-sans font-medium text-[#e6e0e9] leading-tight ${
                        item.checked ? 'line-through opacity-40 select-none' : ''
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Microphone practice Module wrapper */}
      <div className="fixed right-6 bottom-24 z-40">
        <button
          onClick={() => setIsLivePracticeOpen(!isLivePracticeOpen)}
          className="bg-[#cfbcff]/15 hover:bg-[#cfbcff] text-[#cfbcff] hover:text-[#381e72] w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-[0.95] select-none transition-all cursor-pointer border border-[#cfbcff]/30"
          title="Interactive Vocal Preparation simulator"
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>

      {/* Vocal Practice Modal simulation */}
      {isLivePracticeOpen && (
        <div className="fixed inset-0 bg-[#0f0d13]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn text-xs">
          <div className="bg-[#211f24] border border-[#494551] rounded-2xl w-full max-w-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-5 border-b border-[#494551]">
              <h3 className="text-base font-semibold text-[#e6e0e9] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#cfbcff]" />
                Mock AI Speech Coach
              </h3>
              <button
                onClick={() => {
                  setIsLivePracticeOpen(false);
                  setIsMicListening(false);
                }}
                className="text-[#cbc4d2] hover:text-[#cfbcff] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-[#cbc4d2] text-xs font-semibold uppercase tracking-wider">
                  Test prompt (Question 1 for {activeEvent.company})
                </p>
                <p className="text-[#cfbcff] font-medium leading-relaxed max-w-sm mx-auto">
                  "How would you improve the current Linear issue tracking interface for power users?"
                </p>
              </div>

              {/* Recording Animation wave display */}
              <div className="flex items-center justify-center h-20 bg-[#1d1b20] rounded-2xl relative border border-[#494551]/60">
                {isMicListening ? (
                  <div className="flex items-end gap-1.5 h-10">
                    {[0.6, 0.4, 0.8, 0.2, 0.9, 0.5, 0.3, 0.7, 0.5, 0.9, 0.7, 0.3, 0.6].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#cfbcff] rounded"
                        style={{
                          height: `${h * 100}%`,
                          animation: 'pulseGlow 1.2s infinite ease-in-out',
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center font-semibold text-[#cbc4d2]/50">
                    Microphone Closed. Click triggers active audit.
                  </div>
                )}
              </div>

              {/* Action record controllers */}
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleMicTrigger}
                  className={`w-40 py-3 rounded-full font-semibold select-none flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isMicListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#cfbcff] text-[#381e72] hover:brightness-110'
                  }`}
                >
                  {isMicListening ? (
                    <>
                      <MicOff className="w-4 h-4" /> Stop & Analyze
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" /> Start Vocal Check
                    </>
                  )}
                </button>
              </div>

              {/* Transcript list */}
              {practiceText && (
                <div className="p-4 bg-[#1d1b20] border border-[#494551]/45 rounded-xl space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#cbc4d2] uppercase tracking-widest block">
                      Vocal transcript
                    </span>
                    <p className="text-[#e6e0e9] mt-1 leading-relaxed italic">{practiceText}</p>
                  </div>

                  {practiceEvaluation && (
                    <div className="border-t border-[#494551]/40 pt-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                          Speech grading (AI coach audit)
                        </span>
                        <p className="text-[#cbc4d2] leading-snug">{practiceEvaluation.feedback}</p>
                        <div className="flex gap-1.5 flex-wrap pt-1.5">
                          {practiceEvaluation.keywordsMatched.map((kw: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-400/20"
                            >
                              ✓ {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xl font-bold text-emerald-400">{practiceEvaluation.score}</p>
                        <p className="text-[9px] uppercase tracking-wider text-[#cbc4d2]">Cadence</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
