import React, { useState } from 'react';
import { ApplicationCard, ApplicationStage } from '../types';
import { Plus, Clock, ChevronRight, ChevronLeft, Calendar, Bell, Sparkles, X, PlusCircle, CheckCircle } from 'lucide-react';

interface TrackerViewProps {
  cards: ApplicationCard[];
  onAddCard: (card: Omit<ApplicationCard, 'id' | 'dateText'>) => void;
  onUpdateCardStage: (id: string, stage: ApplicationStage) => void;
  onDeleteCard?: (id: string) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  cards,
  onAddCard,
  onUpdateCardStage,
  onDeleteCard,
}) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newScore, setNewScore] = useState(90);
  const [newStage, setNewStage] = useState<ApplicationStage>('saved');
  const [newStageDetails, setNewStageDetails] = useState('');

  const stages: { key: ApplicationStage; label: string; bgDot: string; countStr: string }[] = [
    { key: 'saved', label: 'Saved', bgDot: 'bg-[#948e9c]', countStr: '08' },
    { key: 'applied', label: 'Applied', bgDot: 'bg-[#cfbcff]', countStr: '12' },
    { key: 'screening', label: 'Screening', bgDot: 'bg-[#e7c365]', countStr: '03' },
    { key: 'interview', label: 'Interview', bgDot: 'bg-[#cdc0e9]', countStr: '01' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newTitle) return;
    onAddCard({
      company: newCompany,
      title: newTitle,
      matchScore: Number(newScore),
      stage: newStage,
      attentionNeeded: Math.random() > 0.5,
      stageDetails: newStageDetails || undefined,
    });
    // Reset
    setNewCompany('');
    setNewTitle('');
    setNewScore(90);
    setNewStage('saved');
    setNewStageDetails('');
    setIsOpenAddModal(false);
  };

  const getCardsByStage = (stage: ApplicationStage) => {
    return cards.filter((card) => card.stage === stage);
  };

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Tracker Meta Strip */}
      <div className="flex justify-between items-end gap-4">
        <div>
          <span className="text-[#cfbcff] text-xs font-bold tracking-widest uppercase mb-1 block">Live Audit</span>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-[#e6e0e9]">
            Application Tracker
          </h2>
          <p className="text-[#cbc4d2] text-sm mt-1">
            Monitoring {cards.length + 18} active high-match opportunities
          </p>
        </div>

        <button
          onClick={() => setIsOpenAddModal(true)}
          className="bg-[#cfbcff] text-[#381e72] hover:brightness-110 active:scale-[0.97] transition-all px-4 py-2.5 rounded-xl text-xs font-semibold uppercase flex items-center gap-2 select-none cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Application
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x hide-scrollbar">
        {stages.map((col) => {
          const colCards = getCardsByStage(col.key);
          return (
            <div key={col.key} className="flex-shrink-0 w-[320px] snap-start flex flex-col">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1 select-none">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.bgDot}`} />
                  <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-[#cbc4d2]">
                    {col.label}
                  </h3>
                  <span className="bg-[#2b292f] text-[#cbc4d2] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {String(colCards.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Column Content Box */}
              <div className="flex flex-col gap-4 border-t border-dashed border-[#494551] pt-4 min-h-[500px]">
                {colCards.length === 0 ? (
                  <div className="text-center py-12 px-6 border border-dashed border-[#494551]/50 rounded-2xl bg-white/2">
                    <p className="text-xs text-[#cbc4d2]/60">Empty stage</p>
                  </div>
                ) : (
                  colCards.map((card) => {
                    const isHighPriority = col.key === 'interview' && card.matchScore >= 95;
                    return (
                      <div
                        key={card.id}
                        className={`bg-[#211f24] hover:border-[#cfbcff]/50 border rounded-xl p-4 transition-all relative overflow-hidden group hover:scale-[1.01] ${
                          isHighPriority
                            ? 'border-[#cfbcff] shadow-md shadow-[#cfbcff]/5'
                            : 'border-[#494551]'
                        }`}
                      >
                        {/* Interactive match badge top right */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#e7c365]/10 text-[#e7c365] px-2 py-0.5 rounded text-[10px] font-bold uppercase select-none">
                            {card.matchScore}% Match
                          </span>
                        </div>

                        {/* Company & Title */}
                        <h4 className="text-xs font-semibold text-[#cbc4d2] select-text">
                          {card.company}
                        </h4>
                        <p className="text-sm font-semibold text-[#e6e0e9] mt-0.5 select-text mb-3">
                          {card.title}
                        </p>

                        {/* Match Bar */}
                        <div className="w-full bg-[#0f0d13] h-1 rounded-full overflow-hidden mb-3">
                          <div
                            className="match-score-gradient h-full rounded-full"
                            style={{ width: `${card.matchScore}%` }}
                          />
                        </div>

                        {/* Footer details */}
                        <div className="flex justify-between items-center text-[11px] text-[#cbc4d2] font-medium pt-1">
                          <div className="flex items-center gap-1">
                            {card.stageDetails ? (
                              <span className="text-[#cfbcff] font-semibold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#cfbcff]" />
                                {card.stageDetails}
                              </span>
                            ) : (
                              <>
                                <Clock className="w-3.5 h-3.5" />
                                <span>{card.dateText}</span>
                              </>
                            )}
                          </div>

                          {/* Warning indicators for follow-up */}
                          {card.attentionNeeded && (
                            <div className="flex items-center gap-1 bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] px-1.5 py-0.5 rounded">
                              <Bell className="w-3 h-3 text-[#ffb4ab] animate-swing" />
                              <span className="text-[9px] uppercase font-bold tracking-tighter">Nudge</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive state advancement controls */}
                        <div className="mt-3 pt-3 border-t border-[#494551]/40 flex justify-between gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                          {stages.indexOf(stages.find((s) => s.key === card.stage)!) > 0 ? (
                            <button
                              onClick={() => {
                                const idx = stages.findIndex((s) => s.key === card.stage);
                                if (idx > 0) onUpdateCardStage(card.id, stages[idx - 1].key);
                              }}
                              className="text-[10px] text-[#cbc4d2]/80 hover:text-white flex items-center gap-0.5 cursor-pointer selection:bg-transparent"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" /> Prev
                            </button>
                          ) : (
                            <div className="w-1" />
                          )}

                          {onDeleteCard && (
                            <button
                              onClick={() => onDeleteCard(card.id)}
                              className="text-[10px] text-[#ffb4ab]/70 hover:text-[#ffb4ab] cursor-pointer"
                            >
                              Delete
                            </button>
                          )}

                          {stages.indexOf(stages.find((s) => s.key === card.stage)!) < stages.length - 1 ? (
                            <button
                              onClick={() => {
                                const idx = stages.findIndex((s) => s.key === card.stage);
                                if (idx < stages.length - 1) onUpdateCardStage(card.id, stages[idx + 1].key);
                              }}
                              className="text-[10px] text-[#cfbcff] hover:brightness-120 flex items-center gap-0.5 font-semibold cursor-pointer selection:bg-transparent"
                            >
                              Next <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#cdc0e9] flex items-center gap-0.5 uppercase font-bold select-none cursor-default">
                              <CheckCircle className="w-3 h-3 text-emerald-400" /> Goal
                            </span>
                          )}
                        </div>

                        {/* Anthropic / priority backdrop decoration blur */}
                        {isHighPriority && (
                          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#cfbcff]/5 rounded-full blur-xl pointer-events-none" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floater Mobile Add Circle Trigger */}
      <button
        onClick={() => setIsOpenAddModal(true)}
        className="md:hidden fixed right-6 bottom-24 bg-[#cfbcff] text-[#381e72] w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-[0.95] select-none transition-all cursor-pointer z-50"
      >
        <Plus className="w-6 h-6 text-inherit" />
      </button>

      {/* Modal Dialog overlay matching material style */}
      {isOpenAddModal && (
        <div className="fixed inset-0 bg-[#0f0d13]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#211f24] border border-[#494551] rounded-2xl w-full max-w-md overflow-hidden relative">
            <div className="flex justify-between items-center p-5 border-b border-[#494551]">
              <h3 className="text-base font-semibold text-[#e6e0e9] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#cfbcff]" />
                New Opportunity
              </h3>
              <button
                onClick={() => setIsOpenAddModal(false)}
                className="text-[#cbc4d2] hover:text-[#cfbcff] p-1 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-[#cbc4d2] font-semibold block">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. OpenAI"
                  className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-sm text-[#e6e0e9] placeholder-[#cbc4d2]/30 focus:outline-none focus:border-[#cfbcff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#cbc4d2] font-semibold block">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior AI Research Engineer"
                  className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-sm text-[#e6e0e9] placeholder-[#cbc4d2]/30 focus:outline-none focus:border-[#cfbcff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[#cbc4d2] font-semibold block">Match Rating (% )</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-sm text-[#e6e0e9] focus:outline-none focus:border-[#cfbcff]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#cbc4d2] font-semibold block">Status Column</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                    className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-sm text-[#e6e0e9] focus:outline-none focus:border-[#cfbcff]"
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#cbc4d2] font-semibold block">Stage Details (Optional info)</label>
                <input
                  type="text"
                  value={newStageDetails}
                  onChange={(e) => setNewStageDetails(e.target.value)}
                  placeholder="e.g. Phase 3: Technical Case"
                  className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-sm text-[#e6e0e9] placeholder-[#cbc4d2]/30 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpenAddModal(false)}
                  className="w-1/2 py-3 bg-[#2b292f] hover:bg-[#36343a] text-[#cbc4d2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-[#cfbcff] hover:brightness-110 text-[#381e72] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Confirm Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
