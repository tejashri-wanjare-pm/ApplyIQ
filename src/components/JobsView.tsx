import React, { useState } from 'react';
import { Job } from '../types';
import { Search, SlidersHorizontal, Sparkles, Bookmark, Briefcase, Globe, AlertCircle, ArrowUpRight } from 'lucide-react';

interface JobsViewProps {
  jobs: Job[];
  onBookmarkToggle: (id: string) => void;
  onQuickTailor: (job: Job) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({
  jobs,
  onBookmarkToggle,
  onQuickTailor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const filterChips = [
    { label: 'Last 24h', value: 'recent' },
    { label: 'Remote', value: 'Remote' },
    { label: 'English', value: 'english' },
    { label: 'Min €80k', value: 'high_salary' },
    { label: 'Full-time', value: 'fulltime' },
  ];

  const handleFilterToggle = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Perform search & tag filtering
  const filteredJobs = jobs.filter((job) => {
    // Search match
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filters match
    for (const filter of activeFilters) {
      if (filter === 'Remote' && job.type !== 'Remote') {
        return false;
      }
      if (filter === 'recent' && job.matchScore < 90) {
        return false;
      }
      if (filter === 'high_salary') {
        const isEuro = job.salaryRange.includes('€');
        const numStr = job.salaryRange.replace(/[^0-9]/g, '');
        const val = parseInt(numStr.substring(0, 3)) || 0;
        // e.g. "95k" parses "95"
        if (val < 80) return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Search and Filters Strip */}
      <section className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 absolute left-4.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1d1b20] border border-[#494551] rounded-2xl py-3.5 pl-12 pr-4 text-[#e6e0e9] placeholder-[#cbc4d2]/60 focus:outline-none focus:border-[#cfbcff] focus:ring-1 focus:ring-[#cfbcff] transition-all text-sm"
              placeholder="Search for jobs or roles..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#cfbcff] hover:brightness-110 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFiltersModal(!showFiltersModal)}
            className={`bg-[#2b292f] border border-[#494551] text-[#e6e0e9] px-5 rounded-2xl flex items-center gap-2 hover:bg-[#36343a] transition-colors cursor-pointer select-none ${
              activeFilters.length > 0 ? 'border-[#cfbcff] bg-[#211f24] text-[#cfbcff]' : ''
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs font-semibold hidden sm:inline">
              Filter{activeFilters.length > 0 ? ` (${activeFilters.length})` : ''}
            </span>
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {filterChips.map((chip) => {
            const isSelected = activeFilters.includes(chip.value);
            return (
              <button
                key={chip.value}
                onClick={() => handleFilterToggle(chip.value)}
                className={`flex-shrink-0 cursor-pointer select-none text-xs px-4 py-2 rounded-full border transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#6750a4] text-white border-[#cfbcff]'
                    : 'bg-[#2b292f] text-[#cbc4d2] border-[#494551] hover:border-[#948e9c]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="text-[#cfbcff] text-xs font-medium pl-2 shrink-0 hover:underline cursor-pointer"
            >
              Reset Chips
            </button>
          )}
        </div>
      </section>

      {/* Grid of cards */}
      <section className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-[#211f24] border border-[#494551] rounded-2xl space-y-3">
            <AlertCircle className="w-10 h-10 text-[#cbc4d2] mx-auto block" />
            <h4 className="text-[#e6e0e9] font-medium">No results match your search</h4>
            <p className="text-xs text-[#cbc4d2] max-w-sm mx-auto">
              Try readjusting your target salary, location keywords, or clear existing filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#211f24] border border-[#494551] rounded-2xl p-5 hover:bg-[#2b292f] transition-all group relative duration-200 card-hover-effect"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  {/* Company & Title */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-[#494551] shrink-0 whitespace-nowrap">
                      {job.logoUrl ? (
                        <img
                          src={job.logoUrl}
                          alt={job.company}
                          className="w-8 h-8 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="font-bold text-[#cfbcff] text-sm">{job.company.substring(0, 2)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-base font-semibold text-[#e6e0e9] group-hover:text-[#cfbcff] transition-colors leading-tight">
                          {job.title}
                        </h3>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-[#948e9c] hover:text-[#cfbcff] transition-colors shrink-0"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <p className="text-xs text-[#cbc4d2] mt-1">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Match Rating Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-start shrink-0">
                    <div className="text-right">
                      <div className="match-score-gradient text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase select-none">
                        {job.matchScore}% MATCH
                      </div>
                      <div className="flex items-center gap-1.5 text-[#cbc4d2] text-[10px] justify-end mt-1 font-medium">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{job.sourceName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tag pill grid */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#2b292f] border border-[#494551] text-xs text-[#cbc4d2] px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                  {job.type === 'Remote' && (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Remote
                    </span>
                  )}
                </div>

                {/* Progress bar alignment slider */}
                <div className="w-full bg-[#0f0d13] h-1.5 rounded-full overflow-hidden mb-5">
                  <div
                    className="match-score-gradient h-full rounded-full transition-all duration-1000"
                    style={{ width: `${job.matchScore}%` }}
                  />
                </div>

                {/* Control Actions buttons with active transitions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => onQuickTailor(job)}
                    className="flex-grow cursor-pointer bg-[#cfbcff] text-[#381e72] py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 select-none"
                  >
                    <Sparkles className="w-4 h-4 fill-[#381e72]/10" />
                    Quick Tailor Resume
                  </button>

                  <button
                    onClick={() => onBookmarkToggle(job.id)}
                    className={`w-12 border rounded-xl flex items-center justify-center transition-all select-none cursor-pointer active:scale-90 ${
                      job.bookmarked
                        ? 'border-[#cfbcff] bg-[#4d4465]/40 text-[#cfbcff]'
                        : 'border-[#494551] text-[#cbc4d2] hover:bg-[#36343a] hover:text-[#cfbcff]'
                    }`}
                    title={job.bookmarked ? 'Remove bookmark' : 'Bookmark job'}
                  >
                    <Bookmark className={`w-4 h-4 ${job.bookmarked ? 'fill-[#cfbcff]' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
