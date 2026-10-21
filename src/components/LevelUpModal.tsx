import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, Coins, Gem, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const LevelUpModal: React.FC = () => {
  const { levelUpModalData, closeLevelUpModal, user } = useGame();

  if (!levelUpModalData) return null;

  const handleClose = () => {
    soundManager.playClick();
    closeLevelUpModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#22183b] via-[#141226] to-[#0c0d16] border-2 border-yellow-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl glow-gold text-slate-100 text-center animate-in zoom-in-95 duration-200">
        
        {/* Animated Icon */}
        <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-yellow-400 to-amber-600 text-5xl shadow-2xl glow-gold mb-3 animate-bounce">
          ⚡👑
        </div>

        <h2 className="text-3xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-white">
          LEVEL UP!
        </h2>
        
        <p className="text-lg font-bold text-yellow-300 font-display mt-1">
          Level {levelUpModalData.oldLevel} → Level {levelUpModalData.newLevel}
        </p>

        <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
          Your scholarly power has surged! You have unlocked higher-tier quests and deeper dungeons in the learning realms!
        </p>

        {/* Level Up Rewards */}
        <div className="my-5 p-3.5 rounded-2xl bg-slate-900/80 border border-yellow-500/30 flex items-center justify-around">
          <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>+100 Coins</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Gem className="w-4 h-4 text-cyan-400" />
            <span>+5 Gems</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Power Boost</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-400 text-slate-950 font-black text-sm shadow-xl glow-gold transition-all cursor-pointer"
        >
          <span>Claim Power & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
