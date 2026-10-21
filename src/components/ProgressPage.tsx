import React from 'react';
import { useGame } from '../context/GameContext';
import { SubjectId } from '../types/game';
import { 
  BarChart3, 
  Flame, 
  Clock, 
  Target, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  AlertTriangle, 
  TrendingUp, 
  GraduationCap, 
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { user, startWeakTopicsRevision, clearWeakTopic } = useGame();

  const totalQuestions = user.stats.totalQuestions;
  const correct = user.stats.correctAnswers;
  const overallAccuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 100;

  // Compute subject proficiencies
  const subjects: { id: SubjectId; label: string; icon: string }[] = [
    { id: 'math', label: 'Mathematics', icon: '📐' },
    { id: 'science', label: 'Science', icon: '🧪' },
    { id: 'languages', label: 'Languages (Portuguese, etc.)', icon: '🗣️' },
    { id: 'geography', label: 'Geography', icon: '🗺️' },
    { id: 'history', label: 'History', icon: '🏛️' },
    { id: 'english', label: 'English', icon: '📖' },
  ];

  const subjectScores = subjects.map(s => {
    const stat = user.stats.subjectStats[s.id] || { answered: 0, correct: 0 };
    const acc = stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 100;
    return {
      ...s,
      answered: stat.answered,
      correct: stat.correct,
      accuracy: acc
    };
  });

  // Find strongest & weakest subject
  const sortedSubjects = [...subjectScores].filter(s => s.answered > 0).sort((a, b) => b.accuracy - a.accuracy);
  const strongest = sortedSubjects.length > 0 ? sortedSubjects[0] : null;
  const weakest = sortedSubjects.length > 0 && sortedSubjects[sortedSubjects.length - 1].accuracy < 80 
    ? sortedSubjects[sortedSubjects.length - 1] 
    : null;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
          Scholar Analytics & Growth
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Track your learning velocity, subject proficiencies, and master weak spots through targeted spaced drills.
        </p>
      </div>

      {/* 6 Top Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 text-center">
          <Sparkles className="w-4 h-4 text-purple-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white font-display">{user.xp}</p>
          <p className="text-[10px] text-slate-400">Total XP Earned</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 text-center">
          <GraduationCap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white font-display">Level {user.level}</p>
          <p className="text-[10px] text-slate-400">Current Level</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-center">
          <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-xl font-black text-amber-300 font-display">{user.streak.currentStreak} Days</p>
          <p className="text-[10px] text-slate-400">Daily Streak</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 text-center">
          <Target className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white font-display">{overallAccuracy}%</p>
          <p className="text-[10px] text-slate-400">Overall Accuracy</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20 text-center">
          <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white font-display">{user.completedQuestIds.length}</p>
          <p className="text-[10px] text-slate-400">Quests Mastered</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 text-center">
          <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
          <p className="text-xl font-black text-white font-display">{user.stats.totalStudyMinutes}m</p>
          <p className="text-[10px] text-slate-400">Active Study Time</p>
        </div>
      </div>

      {/* Strongest vs Weakest Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Highest Proficiency Realm
            </span>
            <span className="text-xs font-black text-emerald-400 font-display">
              {strongest ? `${strongest.accuracy}%` : 'N/A'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-cinzel">
            {strongest ? `${strongest.icon} ${strongest.label}` : 'Keep questing to unlock insights!'}
          </h3>
          <p className="text-xs text-slate-300">
            {strongest 
              ? `You have answered ${strongest.correct} questions correctly in ${strongest.label}. Outstanding grasp of core principles!`
              : 'Complete at least 1 quest in each subject to measure your strongest skill.'}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-950/40 to-slate-900/80 border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-amber-400" />
              Growth Focus Realm
            </span>
            <span className="text-xs font-black text-amber-400 font-display">
              {weakest ? `${weakest.accuracy}%` : 'Balanced'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-cinzel">
            {weakest ? `${weakest.icon} ${weakest.label}` : 'All subjects are performing solidly!'}
          </h3>
          <p className="text-xs text-slate-300">
            {weakest
              ? `We recommend practicing ${weakest.label} quests to boost your accuracy to 90%+.`
              : 'No major deficit detected. Continue tackling challenging quests and bosses!'}
          </p>
        </div>
      </div>

      {/* Subject Breakdown Bars */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-cinzel">Subject Mastery Spectrum</h3>
          <span className="text-xs text-purple-300">Adapted for {user.grade}</span>
        </div>

        <div className="space-y-4">
          {subjectScores.map(sub => (
            <div key={sub.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <span>{sub.icon}</span>
                  <span>{sub.label}</span>
                </span>
                <span className="font-semibold text-slate-400">
                  {sub.answered > 0 ? `${sub.accuracy}% accuracy (${sub.correct}/${sub.answered})` : 'Unexplored'}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-500"
                  style={{ width: `${sub.answered > 0 ? sub.accuracy : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Learning System: Identified Weak Concepts */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white font-cinzel flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
              Smart Learning System: Concept Memory Vault
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies mistakes made across all quizzes to reinforce long-term memory via spaced repetition.
            </p>
          </div>

          {user.weakTopics.length > 0 && (
            <button
              type="button"
              onClick={startWeakTopicsRevision}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow glow-purple transition-all cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Launch Revision Rematch</span>
            </button>
          )}
        </div>

        {user.weakTopics.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center text-xs text-emerald-300">
            🎉 Clean record! No unresolved conceptual mistakes in your memory vault.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.weakTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white">{item.topic}</p>
                  <p className="text-[11px] text-slate-400 capitalize">
                    Subject: {item.subject} • Missed {item.errorCount} time(s)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => clearWeakTopic(item.topic)}
                  className="text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  title="Mark as Mastered"
                >
                  Mark Mastered ✓
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
