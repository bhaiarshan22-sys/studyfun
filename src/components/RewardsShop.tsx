import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { InventoryItem } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  Gift, 
  Coins, 
  Gem, 
  Check, 
  Sparkles, 
  Award, 
  Shield, 
  Trophy, 
  CheckCircle2, 
  Lock,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardsShop: React.FC = () => {
  const { user, buyItem, equipItem } = useGame();
  const [activeTab, setActiveTab] = useState<'items' | 'badges' | 'achievements'>('items');
  const [typeFilter, setTypeFilter] = useState<'all' | 'avatar' | 'pet' | 'title'>('all');

  const filteredItems = user.inventory.filter(item => {
    if (item.type === 'badge') return false; // Handled in badges tab
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    return true;
  });

  const badges = user.inventory.filter(i => i.type === 'badge');

  const handleBuy = (item: InventoryItem) => {
    const success = buyItem(item.id);
    if (success) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
            Grand Vault & Vault of Honors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Exchange gold coins and gems earned by answering questions for avatars, titles, pets, and badges!
          </p>
        </div>

        {/* Currency balances */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-yellow-500/30 text-yellow-300 font-bold text-xs">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>{user.coins} Coins</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
            <Gem className="w-4 h-4 text-cyan-400" />
            <span>{user.gems} Gems</span>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-purple-500/20 max-w-md">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveTab('items');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'items'
              ? 'bg-purple-600 text-white shadow glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Armory & Companions
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveTab('badges');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'badges'
              ? 'bg-purple-600 text-white shadow glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Badges & Trophies ({badges.length})
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveTab('achievements');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'achievements'
              ? 'bg-purple-600 text-white shadow glow-purple'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* ================= ITEMS & ARMORY TAB ================= */}
      {activeTab === 'items' && (
        <div className="space-y-4">
          {/* Subfilter */}
          <div className="flex items-center gap-2">
            {(['all', 'avatar', 'pet', 'title'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setTypeFilter(t);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-purple-950 text-purple-200 border border-purple-500/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {t === 'all' ? 'All Items' : t === 'avatar' ? 'Avatars' : t === 'pet' ? 'Pets & Spirits' : 'Honorary Titles'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const isEquipped = item.equipped || 
                (item.type === 'avatar' && user.avatarId === item.icon) ||
                (item.type === 'title' && user.equippedTitle === item.name) ||
                (item.type === 'pet' && user.equippedPet === item.name);

              const canAfford = user.coins >= item.costCoins && user.gems >= item.costGems;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl bg-slate-900/80 border transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'border-purple-400 bg-purple-950/40 glow-purple/30'
                      : item.unlocked
                      ? 'border-slate-700/80 hover:border-slate-600'
                      : 'border-slate-800 hover:border-purple-500/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl p-2 rounded-2xl bg-slate-950 border border-slate-800 shadow">
                        {item.icon}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white font-cinzel">{item.name}</h4>
                      <p className="text-xs text-slate-300 mt-1">{item.description}</p>
                    </div>

                    {item.statBonus && (
                      <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/20 text-[11px] text-purple-200 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                        <span>{item.statBonus}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      {item.unlocked ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Unlocked
                        </span>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-bold">
                          {item.costCoins > 0 && (
                            <span className="text-yellow-300 flex items-center gap-0.5">
                              <Coins className="w-3.5 h-3.5 text-yellow-400" />
                              {item.costCoins}
                            </span>
                          )}
                          {item.costGems > 0 && (
                            <span className="text-cyan-300 flex items-center gap-0.5">
                              <Gem className="w-3.5 h-3.5 text-cyan-400" />
                              {item.costGems}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      {isEquipped ? (
                        <span className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-400 text-purple-200 text-xs font-bold">
                          Equipped
                        </span>
                      ) : item.unlocked ? (
                        <button
                          type="button"
                          onClick={() => equipItem(item.id)}
                          className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={!canAfford}
                          onClick={() => handleBuy(item)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold shadow transition-all cursor-pointer ${
                            canAfford
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 text-slate-950 font-black glow-gold'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          Unlock
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= BADGES & TROPHIES TAB ================= */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Badges earned by defeating subject bosses, completing difficulty milestones, and mastering language challenges.
          </p>

          {badges.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Boss Badges Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Confront bosses like Pyramath the Calculus Colossus in Boss Battles to unlock your first permanent trophy badge!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className="p-5 rounded-3xl bg-slate-900/80 border border-purple-500/30 text-center space-y-2 glow-purple/20"
                >
                  <span className="text-4xl block animate-bounce">{badge.icon}</span>
                  <p className="text-sm font-bold text-white font-cinzel">{badge.name}</p>
                  <p className="text-[11px] text-purple-300">{badge.description}</p>
                  <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    Mastered ✓
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= ACHIEVEMENTS TAB ================= */}
      {activeTab === 'achievements' && (
        <div className="space-y-3">
          {user.achievements.map(ach => {
            const isDone = ach.progress >= ach.target;
            const percent = Math.min(100, Math.round((ach.progress / ach.target) * 100));

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {ach.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{ach.title}</p>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{ach.description}</p>
                    
                    {/* Progress bar */}
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-yellow-300">
                  <p>+{ach.rewardCoins} Coins</p>
                  <p className="text-purple-300">+{ach.rewardXp} XP</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
