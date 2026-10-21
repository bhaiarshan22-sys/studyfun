import React from 'react';
import { useGame } from '../context/GameContext';
import { BOSS_BATTLES } from '../data/bosses';
import { Boss } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  Swords, 
  ShieldAlert, 
  Lock, 
  Trophy, 
  Sparkles, 
  Coins, 
  Gem, 
  CheckCircle2, 
  Flame, 
  ArrowRight
} from 'lucide-react';

export const BossesView: React.FC = () => {
  const { user, startBossBattle } = useGame();

  const isBossUnlocked = (boss: Boss) => {
    return user.unlockedBosses.includes(boss.id) || user.level >= boss.requiredLevel;
  };

  const isBossDefeated = (boss: Boss) => {
    return user.defeatedBosses.includes(boss.id);
  };

  const handleFight = (boss: Boss) => {
    soundManager.playBossRoar();
    startBossBattle(boss);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>Special Arena Feature</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
          Boss Battle Dungeons
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Confront colossal fantasy bosses by answering 10 challenging questions! Each correct answer inflicts heavy damage. Defeat them to unlock rare badges, massive XP, and new learning worlds!
        </p>
      </div>

      {/* Boss Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {BOSS_BATTLES.map(boss => {
          const unlocked = isBossUnlocked(boss);
          const defeated = isBossDefeated(boss);

          let elementGlow = 'border-purple-500/30';
          if (boss.element === 'lightning') elementGlow = 'border-yellow-500/40 glow-gold/20';
          if (boss.element === 'nature') elementGlow = 'border-emerald-500/40 glow-blue/20';
          if (boss.element === 'cosmic') elementGlow = 'border-purple-500/40 glow-purple/20';
          if (boss.element === 'shadow') elementGlow = 'border-orange-500/40 glow-red/20';

          return (
            <div
              key={boss.id}
              className={`p-6 rounded-3xl bg-gradient-to-br from-[#131728] via-[#0d111d] to-[#080b14] border-2 transition-all flex flex-col justify-between ${elementGlow} ${
                !unlocked ? 'opacity-50' : 'hover:scale-101'
              }`}
            >
              <div className="space-y-4">
                
                {/* Top status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow">
                      {boss.avatar}
                    </span>
                    <div>
                      <h3 className="text-lg font-black font-cinzel text-white">{boss.name}</h3>
                      <p className="text-xs text-purple-300 font-semibold">{boss.title}</p>
                    </div>
                  </div>

                  {defeated ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Defeated
                    </span>
                  ) : unlocked ? (
                    <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-500/40 text-red-400 text-xs font-bold animate-pulse">
                      Ready to Battle
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-400 text-xs font-bold">
                      <Lock className="w-3 h-3" />
                      Lvl {boss.requiredLevel}
                    </span>
                  )}
                </div>

                {/* Boss Lore */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-2xl border border-slate-800/80">
                  {boss.lore}
                </p>

                {/* Boss Stats & Rewards Preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400">Questions</p>
                    <p className="font-bold text-white">10 Trials</p>
                  </div>

                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">
                    <p className="text-[10px] text-purple-300">Reward XP</p>
                    <p className="font-bold text-purple-200">+{boss.rewards.xp} XP</p>
                  </div>

                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/20">
                    <p className="text-[10px] text-yellow-300">Badge</p>
                    <p className="font-bold text-yellow-200 truncate">{boss.rewards.badgeName}</p>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Element: <strong className="capitalize text-slate-200">{boss.element}</strong>
                </span>

                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => handleFight(boss)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer ${
                    defeated
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : unlocked
                      ? 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white glow-red active:scale-95'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                  }`}
                >
                  <Swords className="w-4 h-4" />
                  <span>{defeated ? 'Rematch Boss' : unlocked ? 'Fight Boss (10 Qs)' : `Locked (Lvl ${boss.requiredLevel})`}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
