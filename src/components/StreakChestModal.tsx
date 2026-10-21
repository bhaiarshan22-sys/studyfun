import React from 'react';
import { useGame } from '../context/GameContext';
import { Flame, X, Gift, Check, Sparkles, Coins, Gem, ShieldAlert, Award } from 'lucide-react';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MILESTONES = [
  { day: 1, label: 'Day 1 Initiation', coins: 50, gems: 3, title: undefined, icon: '📦' },
  { day: 3, label: 'Day 3 Flame', coins: 150, gems: 8, title: 'Flame of Discipline', icon: '🎁' },
  { day: 7, label: 'Day 7 Week Titan', coins: 350, gems: 20, title: 'Week Champion', icon: '🏆' },
  { day: 14, label: 'Day 14 Master', coins: 700, gems: 45, title: 'Fortnight Titan', icon: '💎' },
  { day: 30, label: 'Day 30 Legend', coins: 1500, gems: 100, title: 'Solar Legend', icon: '👑' },
];

export const StreakChestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, claimStreakMilestone } = useGame();

  if (!isOpen) return null;

  const currentStreak = user.streak.currentStreak;
  const claimed = user.streak.claimedMilestones;

  const handleClaim = (day: number) => {
    const res = claimStreakMilestone(day);
    if (res) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#19132b] via-[#101021] to-[#0a0a14] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl glow-gold text-slate-100 my-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg glow-gold">
              🔥
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-100">
                Daily Study Streak
              </h3>
              <p className="text-xs text-amber-300/80">
                Consistent daily practice unlocks legendary milestone vaults!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Streak & Daily Status */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-orange-950/60 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Active Streak
            </span>
            <p className="text-3xl font-black text-white font-display flex items-center gap-1.5">
              <span>{currentStreak}</span>
              <span className="text-lg text-amber-300 font-sans">Days In A Row</span>
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Today's Goal: <strong className="text-white">{user.streak.dailyGoalProgress} / {user.streak.dailyGoalTarget} questions</strong>
            </p>
          </div>

          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              user.streak.dailyGoalCompleted
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-950 text-amber-300 border-amber-500/40 animate-pulse'
            }`}>
              {user.streak.dailyGoalCompleted ? 'Goal Met Today ✓' : 'In Progress'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1.5">Resets if a day is missed!</p>
          </div>
        </div>

        {/* Milestones Chests List */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {MILESTONES.map(m => {
            const isClaimed = claimed.includes(m.day);
            const canClaim = currentStreak >= m.day && !isClaimed;
            const isLocked = currentStreak < m.day;

            return (
              <div
                key={m.day}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isClaimed
                    ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                    : canClaim
                    ? 'bg-amber-950/40 border-amber-500/50 glow-gold/30'
                    : 'bg-slate-900/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    {m.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-white">{m.label}</p>
                      {m.title && (
                        <span className="text-[9px] font-bold text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/30">
                          Title: {m.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-amber-300 font-semibold mt-0.5">
                      <span>+{m.coins} Coins</span>
                      <span>+{m.gems} Gems</span>
                    </div>
                  </div>
                </div>

                <div>
                  {isClaimed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <Check className="w-4 h-4" />
                      Claimed
                    </span>
                  ) : canClaim ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(m.day)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md glow-gold transition-all cursor-pointer animate-bounce"
                    >
                      Open Chest!
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {m.day - currentStreak} days left
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rule explanation footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            StudyQuest 1-Day Streak Rule: Log in and answer at least {user.streak.dailyGoalTarget} questions every 24 hours to maintain your streak. Prevent reward farming: each milestone chest can only be opened once!
          </p>
        </div>

      </div>
    </div>
  );
};
