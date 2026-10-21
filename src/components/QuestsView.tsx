import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { QUEST_NODES, WORLDS } from '../data/worlds';
import { BOSS_BATTLES } from '../data/bosses';
import { getFilteredQuestions } from '../data/questionBank';
import { SubjectId, Difficulty, QuestNode } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  Compass, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Coins, 
  Swords, 
  Play, 
  Filter,
  Lock
} from 'lucide-react';

export const QuestsView: React.FC = () => {
  const { user, startQuest, startBossBattle } = useGame();

  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');

  const filteredQuests = QUEST_NODES.filter(quest => {
    if (subjectFilter !== 'all' && quest.subject !== subjectFilter) return false;
    if (difficultyFilter !== 'all' && quest.difficulty !== difficultyFilter) return false;
    return true;
  });

  const handleLaunch = (quest: QuestNode) => {
    soundManager.playClick();
    if (quest.isBossLair && quest.bossId) {
      const boss = BOSS_BATTLES.find(b => b.id === quest.bossId);
      if (boss) startBossBattle(boss);
    } else {
      const questions = getFilteredQuestions(quest.subject, user.grade, quest.difficulty);
      startQuest(quest.id, quest.title, questions.slice(0, quest.questionsCount), quest.xpReward, quest.coinReward);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
            Available Quests & Missions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete curriculum quests adapted to {user.grade} to earn XP, level up, and unlock realms!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 font-bold text-xs">
            {user.completedQuestIds.length} / {QUEST_NODES.length} Completed
          </span>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-900/70 border border-purple-500/20">
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>

        {/* Subject filter pills */}
        {(['all', 'math', 'science', 'languages', 'geography', 'history', 'english'] as const).map(sub => (
          <button
            key={sub}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSubjectFilter(sub);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              subjectFilter === sub
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {sub === 'all' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuests.map(quest => {
          const world = WORLDS.find(w => w.id === quest.worldId);
          const isCompleted = user.completedQuestIds.includes(quest.id);
          const stars = user.questStars[quest.id] || 0;

          return (
            <div
              key={quest.id}
              className={`p-5 rounded-3xl bg-slate-900/80 border transition-all flex flex-col justify-between ${
                quest.isBossLair
                  ? 'border-red-500/40 hover:border-red-400 glow-red/20'
                  : isCompleted
                  ? 'border-emerald-500/30 hover:border-emerald-400/60'
                  : 'border-purple-500/20 hover:border-purple-400/60'
              }`}
            >
              <div className="space-y-3">
                
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <span>{world?.icon}</span>
                    <span className="truncate max-w-[140px]">{world?.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : quest.isBossLair ? (
                      <span className="text-[10px] font-extrabold uppercase text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-500/40">
                        Boss Lair
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-500/40">
                        {quest.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-base font-bold text-white font-cinzel leading-snug">{quest.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">{quest.description}</p>
                </div>

                {/* Stars if completed */}
                {isCompleted && stars > 0 && (
                  <div className="flex items-center gap-1 pt-1">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`}
                      />
                    ))}
                    <span className="text-[11px] text-yellow-300 font-bold ml-1">{stars} / 3 Stars</span>
                  </div>
                )}

              </div>

              {/* Bottom footer with rewards and Launch button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <span className="text-purple-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    +{quest.xpReward} XP
                  </span>
                  <span className="text-yellow-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-yellow-400" />
                    +{quest.coinReward}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunch(quest)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
                    quest.isBossLair
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 glow-red'
                      : isCompleted
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 glow-purple'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isCompleted ? 'Replay' : 'Start'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
