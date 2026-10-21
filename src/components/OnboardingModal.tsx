import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GradeLevel } from '../types/game';
import { Sparkles, Shield, User, GraduationCap, Flame, ArrowRight, Play } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  { id: '🧙‍♂️', name: 'Mage', label: 'Arcane Scholar' },
  { id: '⚔️', name: 'Warrior', label: 'Mathblade Knight' },
  { id: '🤖', name: 'Cyber', label: 'Quantum Prodigy' },
  { id: '🏹', name: 'Ranger', label: 'Geo-Pathfinder' },
  { id: '🧪', name: 'Alchemist', label: 'Bio-Alchemist' },
  { id: '🧝‍♀️', name: 'Valkyrie', label: 'Polyglot Sage' },
  { id: '🐉', name: 'Dragon Master', label: 'Chronos Tamer' },
  { id: '👑', name: 'Monarch', label: 'Arch-Ruler of Lore' },
];

const GRADE_OPTIONS: GradeLevel[] = [
  'Grade 1-2',
  'Grade 3-5',
  'Grade 6-8',
  'Grade 9-10',
  'Grade 11-12',
  'College / Advanced'
];

export const OnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useGame();

  const [name, setName] = useState(user.name || 'Alex Starblade');
  const [grade, setGrade] = useState<GradeLevel>(user.grade || 'Grade 6-8');
  const [age, setAge] = useState<number>(user.age || 13);
  const [avatar, setAvatar] = useState(user.avatarId || '🧙‍♂️');
  const [heroClass, setHeroClass] = useState(user.heroClass || 'Arcane Scholar');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playLevelUp();
    updateProfile({
      name: name.trim() || 'Hero Adventurer',
      grade,
      age: Math.max(5, Math.min(99, age || 12)),
      avatarId: avatar,
      heroClass
    });
    onClose();
  };

  const handleSkipDemo = () => {
    soundManager.playClick();
    updateProfile({
      name: 'Hero Adventurer',
      grade: 'Grade 6-8',
      age: 13,
      avatarId: '🧙‍♂️',
      heroClass: 'Arcane Scholar'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 bg-gradient-to-b from-[#131b2e] to-[#0c101d] border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl glow-purple text-slate-100">
        
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-2xl shadow-lg glow-blue">
              ⚔️
            </div>
            <div>
              <h2 className="text-2xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-200 to-indigo-300">
                Create Your Hero
              </h2>
              <p className="text-xs text-purple-300/80">Customize your StudyQuest character profile</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleSkipDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60"
          >
            <Play className="w-3.5 h-3.5 text-blue-400" />
            Skip / Instant Demo
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Choose Character Avatar
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATAR_OPTIONS.map(opt => {
                const isSelected = avatar === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setAvatar(opt.id);
                      setHeroClass(opt.label);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-purple-400 bg-purple-600/30 scale-105 glow-purple ring-2 ring-purple-400/50'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{opt.id}</span>
                    <span className="text-[10px] text-slate-300 truncate max-w-full font-medium">{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Class Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Hero Gamertag / Name
              </label>
              <input
                type="text"
                required
                maxLength={24}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter character name..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm outline-none text-white transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Class Specialization
              </label>
              <input
                type="text"
                value={heroClass}
                onChange={e => setHeroClass(e.target.value)}
                placeholder="Hero Class (e.g. Arcane Scholar)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm outline-none text-white transition-colors"
              />
            </div>
          </div>

          {/* Grade & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Grade Level (Adapts Question Difficulty!)
              </label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm outline-none text-white transition-colors cursor-pointer"
              >
                {GRADE_OPTIONS.map(g => (
                  <option key={g} value={g} className="bg-slate-900 text-white">
                    {g}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Questions will automatically match this grade!
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Student Age
              </label>
              <input
                type="number"
                min={5}
                max={99}
                value={age}
                onChange={e => setAge(parseInt(e.target.value, 10) || 12)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-sm outline-none text-white transition-colors"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Used to personalize study pace & recommendations.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-purple-500/20">
            <button
              type="button"
              onClick={handleSkipDemo}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg glow-purple transition-all duration-200 active:scale-95"
            >
              <span>Begin Your Quest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
