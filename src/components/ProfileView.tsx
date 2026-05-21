import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { User, ShieldAlert, Plus, X, Globe, DollarSign, Clock, Settings, Bell, Palette, CheckCircle } from 'lucide-react';

interface ProfileViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const [newCompany, setNewCompany] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCompanyAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany) return;
    onUpdatePreferences({
      blockedCompanies: [...preferences.blockedCompanies, newCompany],
    });
    setNewCompany('');
  };

  const handleCompanyRemove = (company: string) => {
    onUpdatePreferences({
      blockedCompanies: preferences.blockedCompanies.filter((c) => c !== company),
    });
  };

  const handleKeywordAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword) return;
    onUpdatePreferences({
      excludedKeywords: [...preferences.excludedKeywords, newKeyword],
    });
    setNewKeyword('');
  };

  const handleKeywordRemove = (keyword: string) => {
    onUpdatePreferences({
      excludedKeywords: preferences.excludedKeywords.filter((k) => k !== keyword),
    });
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeUp text-xs md:text-sm">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[#cfbcff] text-xs font-bold tracking-widest uppercase mb-1 block">Configuration</span>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-[#e6e0e9]">
            Blacklist & Settings
          </h2>
          <p className="text-[#cbc4d2] text-sm mt-1">
            Re-align targeted role attributes and autonomous filter keywords
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2.5 animate-fadeIn font-semibold">
          <CheckCircle className="w-5 h-5" /> Configured preferences updated successfully. Sync logs updated.
        </div>
      )}

      {/* Grid of Profile forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Target Parameters */}
        <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#cfbcff]" />
            <h3 className="text-base font-semibold text-[#e6e0e9]">
              Target Job Attributes
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-[#cbc4d2] font-semibold block">Preferred Job Title</label>
              <input
                type="text"
                value={preferences.targetRoles}
                onChange={(e) => onUpdatePreferences({ targetRoles: e.target.value })}
                className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-[#e6e0e9] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#cbc4d2] font-semibold block">Target Locations (Separated by comma)</label>
              <input
                type="text"
                value={preferences.targetLocations}
                onChange={(e) => onUpdatePreferences({ targetLocations: e.target.value })}
                className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-[#e6e0e9] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-[#cbc4d2] font-semibold block">Minimum Annual Target</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#cbc4d2]/70 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={preferences.minSalary}
                    onChange={(e) => onUpdatePreferences({ minSalary: e.target.value })}
                    className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl py-3 pl-9 pr-3 text-[#e6e0e9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#cbc4d2] font-semibold block">Primary Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => onUpdatePreferences({ language: e.target.value })}
                  className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-[#e6e0e9] focus:outline-none cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="German">German</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Exclusions Registration & Blacklists */}
        <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#e7c365]" />
            <h3 className="text-base font-semibold text-[#e6e0e9]">
              Exclusion Specifications
            </h3>
          </div>

          <div className="space-y-5">
            {/* Blocked Companies */}
            <div className="space-y-2">
              <label className="text-xs text-[#cbc4d2] font-semibold block">
                Blocked Companies (We will hide match updates)
              </label>

              <div className="flex flex-wrap gap-1.5 p-2.5 bg-[#1d1b20] rounded-xl border border-[#494551]/60">
                {preferences.blockedCompanies.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg flex items-center gap-1.5 font-sans font-medium hover:border-rose-400/40 select-none"
                  >
                    {c}
                    <X
                      className="w-3.5 h-3.5 text-rose-400 hover:text-white cursor-pointer select-none"
                      onClick={() => handleCompanyRemove(c)}
                    />
                  </span>
                ))}

                {/* Inline form */}
                <form onSubmit={handleCompanyAdd} className="flex-1 min-w-[100px] flex items-center gap-1 pl-1">
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="+ Block Brand"
                    className="w-full bg-transparent border-none text-[#e6e0e9] placeholder-[#cbc4d2]/30 focus:outline-none"
                  />
                </form>
              </div>
            </div>

            {/* Keyword excluders */}
            <div className="space-y-2">
              <label className="text-xs text-[#cbc4d2] font-semibold block">
                Excluded Role Keywords (Hides matches containing these words)
              </label>

              <div className="flex flex-wrap gap-1.5 p-2.5 bg-[#1d1b20] rounded-xl border border-[#494551]/60">
                {preferences.excludedKeywords.map((k) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 bg-[#4d4465] text-[#cfbcff] border border-[#cfbcff]/15 rounded-lg flex items-center gap-1.5 font-sans font-medium hover:border-[#cfbcff]/40 select-none"
                  >
                    {k}
                    <X
                      className="w-3.5 h-3.5 text-[#cfbcff] hover:text-white cursor-pointer select-none"
                      onClick={() => handleKeywordRemove(k)}
                    />
                  </span>
                ))}

                <form onSubmit={handleKeywordAdd} className="flex-1 min-w-[100px] flex items-center gap-1 pl-1">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="+ Filter word"
                    className="w-transparent bg-transparent border-none text-[#e6e0e9] placeholder-[#cbc4d2]/30 focus:outline-none"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Notifications Settings */}
        <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#cfbcff]" />
            <h3 className="text-base font-semibold text-[#e6e0e9]">
              Digest Transmissions
            </h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 bg-[#1d1b20] hover:bg-[#2b292f] rounded-xl cursor-pointer select-none">
              <div>
                <p className="text-xs font-semibold text-[#e6e0e9]">Receive Daily Email Digest</p>
                <p className="text-[10px] text-[#cbc4d2] font-medium leading-tight">Summarized match list sent directly to your inbox yesterday.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailReport}
                onChange={(e) => onUpdatePreferences({ emailReport: e.target.checked })}
                className="rounded border-[#494551] bg-[#1d1b20] text-[#cfbcff] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-[#1d1b20] hover:bg-[#2b292f] rounded-xl cursor-pointer select-none">
              <div>
                <p className="text-xs font-semibold text-[#e6e0e9]">Instant Push Warnings</p>
                <p className="text-[10px] text-[#cbc4d2] font-medium leading-tight">Prompt immediately when candidate interview invitations or target nudges trigger.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.pushNotifications}
                onChange={(e) => onUpdatePreferences({ pushNotifications: e.target.checked })}
                className="rounded border-[#494551] bg-[#1d1b20] text-[#cfbcff] cursor-pointer"
              />
            </label>

            <div className="space-y-1">
              <label className="text-xs text-[#cbc4d2] font-semibold block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Scheduled Delivery Time
              </label>
              <select
                value={preferences.deliveryTime}
                onChange={(e) => onUpdatePreferences({ deliveryTime: e.target.value })}
                className="w-full bg-[#1d1b20] border border-[#494551] rounded-xl p-3 text-[#e6e0e9] focus:outline-none cursor-pointer"
              >
                <option value="08:00 AM (EST)">08:00 AM (EST)</option>
                <option value="12:00 PM (EST)">12:00 PM (EST)</option>
                <option value="06:00 PM (EST)">06:00 PM (EST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Theme & Master Vault settings */}
        <div className="bg-[#211f24] border border-[#494551] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#cdc0e9]" />
            <h3 className="text-base font-semibold text-[#e6e0e9]">
              Material Customizer
            </h3>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <p className="text-xs font-semibold text-[#e6e0e9] mb-2">Visual Theme</p>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => onUpdatePreferences({ theme: 'dark' })}
                  className={`py-3 rounded-xl border text-center cursor-pointer select-none font-semibold ${
                    preferences.theme === 'dark'
                      ? 'bg-[#6750a4]/30 border-[#cfbcff] text-white'
                      : 'border-[#494551] text-[#cbc4d2]'
                  }`}
                >
                  Dark Slate Carbon (Default)
                </button>
                <button
                  type="button"
                  onClick={() => onUpdatePreferences({ theme: 'light' })}
                  className={`py-3 rounded-xl border text-center cursor-pointer select-none font-semibold ${
                    preferences.theme === 'light'
                      ? 'bg-[#cfbcff] border-[#cfbcff] text-[#381e72]'
                      : 'border-[#494551] text-[#cbc4d2]'
                  }`}
                >
                  Light Classic Slate
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-[#1d1b20] border border-[#494551]/60 rounded-xl leading-relaxed space-y-1">
              <span className="font-semibold text-[#cfbcff] text-[10px] uppercase tracking-widest block">System Diagnostics</span>
              <p className="text-[#cbc4d2] text-[11px]">
                Currently connected to the local AI engine. Sandbox simulation operational on port 3000. All sync locks checked.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent global configs save trigger */}
      <div className="flex justify-end pt-4 select-none">
        <button
          onClick={handleSave}
          className="bg-[#cfbcff] text-[#381e72] hover:brightness-110 px-8 py-3 rounded-xl font-bold uppercase transition-all select-none cursor-pointer"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};
