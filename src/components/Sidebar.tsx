import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Home, 
  Compass, 
  BookOpen, 
  Swords, 
  Map, 
  Gift, 
  Trophy, 
  BarChart3,
  Flame,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  onOpenStreakModal: () => void;
}

export const Sidebar: React.FC<Props> = ({ onOpenStreakModal }) => {
  const { activeScreen, setActiveScreen, user } = useGame();

  interface NavItem {
    id: 'dashboard' | 'quests' | 'subjects' | 'bosses' | 'map' | 'shop' | 'leaderboard' | 'progress';
    label: string;
    icon: typeof Home;
    badge: string | null;
    badgeColor?: string;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: Home, badge: null },
    { id: 'quests', label: 'Quests', icon: Compass, badge: user.completedQuestIds.length > 0 ? `${user.completedQuestIds.length}` : null },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, badge: null },
    { id: 'bosses', label: 'Boss Battles', icon: Swords, badge: 'HOT', badgeColor: 'bg-red-500/80 text-white' },
    { id: 'map', label: 'Quest Map', icon: Map, badge: null },
    { id: 'shop', label: 'Rewards & Shop', icon: Gift, badge: null },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, badge: null },
    { id: 'progress', label: 'Progress & Stats', icon: BarChart3, badge: user.weakTopics.length > 0 ? `${user.weakTopics.length} Drill` : null, badgeColor: 'bg-amber-500/80 text-white' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-60px)] bg-[#0a0e1a]/95 border-r border-purple-500/15 p-4 justify-between shrink-0 select-none">
      <div className="space-y-6">
        
        {/* Navigation Links */}
        <div className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-purple-400/70">
            Adventure Menu
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveScreen(item.id);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 text-white border border-purple-500/40 glow-purple/30 shadow-md translate-x-1'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor || 'bg-purple-950 text-purple-300 border border-purple-700/50'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Daily Streak Card Widget */}
        <div 
          onClick={() => {
            soundManager.playClick();
            onOpenStreakModal();
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1a1429] to-[#0e1628] border border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer glow-gold/20 group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Daily Goal</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-300">
              {user.streak.dailyGoalProgress} / {user.streak.dailyGoalTarget}
            </span>
          </div>
          
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300"
              style={{ width: `${Math.min(100, (user.streak.dailyGoalProgress / user.streak.dailyGoalTarget) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Streak: <strong className="text-amber-300 font-display">{user.streak.currentStreak} Days</strong></span>
            <span className="text-purple-300 group-hover:text-purple-200 font-semibold underline">Loot Chest →</span>
          </div>
        </div>

      </div>

      {/* Hero Class Footer Summary */}
      <div className="pt-4 border-t border-purple-500/15 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-xl shadow">
          {user.avatarId}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-slate-200 truncate">{user.heroClass}</p>
          <p className="text-[11px] text-purple-300/80 truncate">"{user.equippedTitle}"</p>
        </div>
      </div>
    </aside>
  );
};
