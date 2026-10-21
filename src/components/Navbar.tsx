import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Flame, Coins, Gem, Sparkles, User, Award } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  onOpenProfile: () => void;
  onOpenStreakModal: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenProfile, onOpenStreakModal }) => {
  const { user, isMuted, toggleMute, setActiveScreen } = useGame();

  // Calculate XP threshold for current level
  // Level N requires N * 100 XP
  const xpCurrent = user.xp;
  const currentLevelBase = Math.pow(user.level - 1, 2) * 30;
  const nextLevelTarget = Math.pow(user.level, 2) * 30;
  const levelXpSpan = Math.max(1, nextLevelTarget - currentLevelBase);
  const progressInLevel = Math.max(0, xpCurrent - currentLevelBase);
  const xpPercent = Math.min(100, Math.round((progressInLevel / levelXpSpan) * 100));

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1322]/95 backdrop-blur-md border-b border-purple-500/20 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand / Title */}
        <div 
          onClick={() => {
            soundManager.playClick();
            setActiveScreen('dashboard');
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-lg shadow-md glow-purple group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-wider font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-white">
                StudyQuest
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
                RPG
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Level Up Your Knowledge</p>
          </div>
        </div>

        {/* Center: XP Bar & Level (Desktop & Tablet) */}
        <div className="hidden md:flex flex-col items-center max-w-xs w-full px-4">
          <div className="flex items-center justify-between w-full text-xs font-semibold mb-1">
            <span className="flex items-center gap-1 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Level {user.level}
            </span>
            <span className="text-slate-400 text-[11px]">
              {progressInLevel} / {levelXpSpan} XP
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden border border-purple-500/30 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-500 shadow-sm"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Streak Counter with Flame */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenStreakModal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-orange-950/60 border border-amber-500/30 hover:border-amber-400/60 transition-all glow-gold/40 group cursor-pointer"
            title="Daily Study Streak & Rewards"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
            <div className="text-left leading-tight">
              <span className="text-xs font-extrabold text-amber-300 font-display">
                {user.streak.currentStreak}d
              </span>
            </div>
            {user.streak.dailyGoalCompleted && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" title="Daily Goal Met!" />
            )}
          </button>

          {/* Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-yellow-500/20 text-yellow-300 text-xs font-bold">
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span>{user.coins}</span>
          </div>

          {/* Gems */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
            <Gem className="w-3.5 h-3.5 text-cyan-400" />
            <span>{user.gems}</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-slate-900/60 border-slate-700 text-slate-500 hover:text-slate-300'
                : 'bg-purple-950/60 border-purple-500/40 text-purple-300 hover:text-purple-100 glow-purple/30'
            }`}
            title={isMuted ? 'Unmute Game Sounds' : 'Mute Game Sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Profile / Character Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-sm shadow">
              {user.avatarId || '🧙‍♂️'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">{user.name}</p>
              <p className="text-[10px] text-purple-300 font-medium truncate max-w-[100px]">{user.grade}</p>
            </div>
          </button>

        </div>
      </div>

      {/* Mobile XP Bar Under Header */}
      <div className="md:hidden mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-1 text-purple-300 font-bold">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          Lvl {user.level}
        </div>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-purple-500/20">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <span className="text-slate-400 text-[10px]">
          {progressInLevel}/{levelXpSpan} XP
        </span>
      </div>
    </header>
  );
};
