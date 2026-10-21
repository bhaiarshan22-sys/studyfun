import React from 'react';
import { useGame } from '../context/GameContext';
import { QUEST_NODES } from '../data/worlds';
import { BOSS_BATTLES } from '../data/bosses';
import { getFilteredQuestions } from '../data/questionBank';
import { soundManager } from '../utils/sound';
import { 
  Play, 
  Swords, 
  Flame, 
  Sparkles, 
  Coins, 
  Gem, 
  Trophy, 
  Target, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface Props {
  onOpenProfile: () => void;
  onOpenStreakModal: () => void;
}

export const Dashboard: React.FC<Props> = ({ onOpenProfile, onOpenStreakModal }) => {
  const { 
    user, 
    setActiveScreen, 
    startQuest, 
    startBossBattle, 
    startWeakTopicsRevision 
  } = useGame();

  // Find next uncompleted quest
  const nextQuest = QUEST_NODES.find(q => !user.completedQuestIds.includes(q.id) && !q.isBossLair) || QUEST_NODES[0];

  // Find current available boss
  const availableBoss = BOSS_BATTLES.find(b => !user.defeatedBosses.includes(b.id)) || BOSS_BATTLES[0];

  const handleContinueQuest = () => {
    soundManager.playClick();
    const questions = getFilteredQuestions(nextQuest.subject, user.grade, nextQuest.difficulty);
    startQuest(nextQuest.id, nextQuest.title, questions.slice(0, nextQuest.questionsCount), nextQuest.xpReward, nextQuest.coinReward);
  };

  const handleLaunchBoss = () => {
    soundManager.playBossRoar();
    startBossBattle(availableBoss);
  };

  // Level progress
  const currentLevelBase = Math.pow(user.level - 1, 2) * 30;
  const nextLevelTarget = Math.pow(user.level, 2) * 30;
  const levelXpSpan = Math.max(1, nextLevelTarget - currentLevelBase);
  const progressInLevel = Math.max(0, user.xp - currentLevelBase);
  const xpPercent = Math.min(100, Math.round((progressInLevel / levelXpSpan) * 100));

  const totalAnswered = user.stats.totalQuestions;
  const accuracy = totalAnswered > 0 ? Math.round((user.stats.correctAnswers / totalAnswered) * 100) : 100;

  return (
    <div className="space-y-6">
      
      {/* Hero Banner with Actions */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#171e36] via-[#12162b] to-[#0d1222] border border-purple-500/30 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-300 font-bold text-xs uppercase tracking-wider">
              {user.grade} Curriculum
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              • Specialization: <strong className="text-white">{user.heroClass}</strong>
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white leading-tight">
              Ready for Adventure, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-200 to-cyan-300">{user.name}</span>?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Answer questions to deal damage, earn XP, level up your scholar, and defeat dungeon bosses! Every quiz completed brings your hero closer to legendary mastery.
            </p>
          </div>

          {/* Large Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleContinueQuest}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl glow-purple transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Your Quest</span>
            </button>

            <button
              type="button"
              onClick={handleLaunchBoss}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl glow-red transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Swords className="w-4 h-4" />
              <span>Boss Battle ({availableBoss.name})</span>
            </button>
          </div>

        </div>

        {/* Big Avatar / Crest on Right */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center select-none pointer-events-none">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-purple-600/30 to-indigo-600/20 border-2 border-purple-500/40 flex items-center justify-center text-7xl shadow-2xl glow-purple animate-pulse-glow">
            {user.avatarId}
          </div>
          <span className="text-xs font-bold text-purple-300 mt-2 font-display">
            Lvl {user.level} {user.heroClass}
          </span>
        </div>
      </div>

      {/* Smart Learning System: Weak Topics Rematch Notice */}
      {user.weakTopics.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-orange-950/60 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-200">
                Smart Learning System: Review Concept Detected
              </p>
              <p className="text-[11px] text-amber-300/80">
                You previously missed questions in <strong className="text-white">"{user.weakTopics[0].topic}"</strong>. Take a quick 2-question revision rematch to turn weakness into mastery!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startWeakTopicsRevision}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Revision Drill</span>
          </button>
        </div>
      )}

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Level & XP */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-300 mb-2">
            <span>Scholar Level</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-black text-white font-display">Level {user.level}</p>
          <div className="mt-2">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{user.xp} Total XP</p>
          </div>
        </div>

        {/* Daily Streak */}
        <div 
          onClick={onOpenStreakModal}
          className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/25 hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-2">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-black text-amber-300 font-display">
            {user.streak.currentStreak} Days
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Goal: {user.streak.dailyGoalProgress}/{user.streak.dailyGoalTarget} Today (Click to claim)
          </p>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 mb-2">
            <span>Quiz Accuracy</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white font-display">{accuracy}%</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {user.stats.correctAnswers} / {totalAnswered} Correct Answers
          </p>
        </div>

        {/* Quests & Bosses Mastered */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 mb-2">
            <span>Dungeons Cleared</span>
            <Trophy className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-black text-white font-display">
            {user.completedQuestIds.length} Quests
          </p>
          <p className="text-[10px] text-emerald-300 mt-1">
            {user.defeatedBosses.length} Bosses Defeated
          </p>
        </div>

      </div>

      {/* Next Recommended Quests & Quick Launch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Quests Column */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold text-white font-cinzel">Recommended Quests</h3>
            </div>
            <button
              type="button"
              onClick={() => setActiveScreen('quests')}
              className="text-xs text-purple-300 hover:text-purple-200 font-semibold"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {QUEST_NODES.slice(0, 3).map(quest => {
              const isCompleted = user.completedQuestIds.includes(quest.id);
              return (
                <div
                  key={quest.id}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-800 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        {quest.title}
                      </span>
                      <span className="text-[10px] font-semibold text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/30">
                        {quest.topic}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Reward: +{quest.xpReward} XP • +{quest.coinReward} Coins
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const qs = getFilteredQuestions(quest.subject, user.grade, quest.difficulty);
                      startQuest(quest.id, quest.title, qs.slice(0, quest.questionsCount), quest.xpReward, quest.coinReward);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold shadow transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isCompleted ? 'Replay' : 'Start'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Boss Encounter Preview Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1c121e] to-[#0c0d16] border border-red-500/30 flex flex-col justify-between space-y-4 shadow-xl glow-red/10">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-500/40 animate-pulse">
                Current Boss Threat
              </span>
              <span className="text-xs text-slate-400">10 Questions</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shadow">
                {availableBoss.avatar}
              </span>
              <div>
                <h4 className="text-base font-black font-cinzel text-white leading-tight">{availableBoss.name}</h4>
                <p className="text-xs text-purple-300">{availableBoss.title}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
              "{availableBoss.dialogue.intro}"
            </p>
          </div>

          <button
            type="button"
            onClick={handleLaunchBoss}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 text-white font-bold text-xs shadow-lg glow-red transition-all cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>Enter Boss Arena</span>
          </button>
        </div>

      </div>

    </div>
  );
};
