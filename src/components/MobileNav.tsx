import React from 'react';
import { useGame } from '../context/GameContext';
import { Home, Compass, Swords, Map, Gift, BarChart3, Trophy } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const MobileNav: React.FC = () => {
  const { activeScreen, setActiveScreen } = useGame();

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'quests', label: 'Quests', icon: Compass },
    { id: 'bosses', label: 'Bosses', icon: Swords },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'shop', label: 'Rewards', icon: Gift },
    { id: 'progress', label: 'Stats', icon: BarChart3 },
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d18]/95 backdrop-blur-lg border-t border-purple-500/20 px-2 py-1.5 flex items-center justify-around select-none">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveScreen(tab.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isActive
                ? 'text-purple-300 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-purple-600/30 text-purple-300' : ''}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
