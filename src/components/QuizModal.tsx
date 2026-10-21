import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Question } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Coins, 
  Star, 
  RotateCcw,
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  questId: string;
  title: string;
  questions: Question[];
  xpReward: number;
  coinReward: number;
  onClose: () => void;
}

export const QuizModal: React.FC<Props> = ({
  questId,
  title,
  questions,
  xpReward,
  coinReward,
  onClose
}) => {
  const { user, recordAnswer, completeQuestSuccess, startWeakTopicsRevision } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [missed, setMissed] = useState<{ question: Question; studentChoice: number }[]>([]);
  const [rewardSummary, setRewardSummary] = useState<{ xpGained: number; coinsGained: number; isFirstTime: boolean } | null>(null);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered || isCompleted) return;

    setSelectedOption(idx);
    setIsAnswered(true);
    const isCorrect = idx === currentQ.correctIndex;

    recordAnswer(currentQ, isCorrect);

    if (isCorrect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setScore(prev => prev + 1);
      soundManager.playSuccess();
    } else {
      setCombo(0);
      soundManager.playError();
      setMissed(prev => [...prev, { question: currentQ, studentChoice: idx }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      soundManager.playClick();
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished all questions!
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 0 : 0); // already updated
      const accuracy = Math.round((score / questions.length) * 100);
      let stars = 1;
      if (accuracy >= 80) stars = 3;
      else if (accuracy >= 50) stars = 2;

      const summary = completeQuestSuccess(questId, xpReward, coinReward, stars);
      setRewardSummary(summary);
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setCombo(0);
    setScore(0);
    setMissed([]);
    setIsCompleted(false);
    setRewardSummary(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#131b2e] via-[#0d1222] to-[#0a0e19] border border-purple-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl glow-purple text-slate-100 my-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-purple-200 truncate max-w-xs sm:max-w-md">
              {title}
            </h3>
            <p className="text-xs text-slate-400">
              Question {currentIndex + 1} of {questions.length} • Grade: {user.grade}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {combo >= 2 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {combo}x Combo!
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= COMPLETED SUMMARY ================= */}
        {isCompleted ? (
          <div className="py-6 text-center space-y-6">
            <div className="inline-flex p-3.5 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-4xl shadow-xl glow-purple animate-bounce">
              🌟
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-cyan-200 to-white">
                Quest Completed!
              </h2>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {[1, 2, 3].map(s => {
                  const achieved = s <= (score >= questions.length * 0.8 ? 3 : score >= questions.length * 0.5 ? 2 : 1);
                  return (
                    <Star
                      key={s}
                      className={`w-6 h-6 ${achieved ? 'text-yellow-400 fill-yellow-400 filter drop-shadow' : 'text-slate-700'}`}
                    />
                  );
                })}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                You scored <strong className="text-purple-300">{score}</strong> out of <strong className="text-purple-300">{questions.length}</strong> ({Math.round((score / questions.length) * 100)}% accuracy)
              </p>
            </div>

            {/* Rewards Card */}
            <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
              <div className="flex-1 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-center">
                <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold text-purple-300 font-display">+{rewardSummary?.xpGained} XP</p>
                <p className="text-[10px] text-purple-200/70">{rewardSummary?.isFirstTime ? 'First Quest Bonus' : 'Practice Mastery'}</p>
              </div>

              <div className="flex-1 p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-center">
                <Coins className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold text-yellow-300 font-display">+{rewardSummary?.coinsGained}</p>
                <p className="text-[10px] text-yellow-200/70">Gold Coins</p>
              </div>
            </div>

            {/* Missed questions review */}
            {missed.length > 0 && (
              <div className="text-left space-y-2 mt-4 max-h-48 overflow-y-auto p-3 bg-slate-900/80 rounded-2xl border border-purple-500/20">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Mistakes Review (Concept Learning):
                </p>
                {missed.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1">
                    <p className="font-semibold text-slate-200">{m.question.question}</p>
                    <p className="text-emerald-400 font-medium">✓ Correct: {m.question.options[m.question.correctIndex]}</p>
                    <p className="text-slate-400 italic">💡 {m.question.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Again</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg glow-purple transition-all"
              >
                Continue Questing
              </button>
            </div>
          </div>
        ) : (
          /* ================= QUESTION RUNNER ================= */
          <div className="mt-4 space-y-5">
            
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Topic & Question Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161c33] to-[#0f1424] border border-purple-500/20 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30">
                  {currentQ.topic}
                </span>

                {currentQ.hint && (
                  <button
                    type="button"
                    onClick={() => setShowHint(prev => !prev)}
                    className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Clue' : 'Clue'}</span>
                  </button>
                )}
              </div>

              {showHint && currentQ.hint && (
                <div className="mb-3 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{currentQ.hint}</span>
                </div>
              )}

              <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'border-slate-800 bg-slate-900/70 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-200';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 glow-blue';
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-red-500 bg-red-950/80 text-red-200 glow-red animate-shake';
                  } else {
                    btnStyle = 'border-slate-800/60 bg-slate-950/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm font-semibold transition-all duration-150 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl border text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}>
                <div className="space-y-1">
                  <p className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct! +10 XP</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span>Nice try! Concept breakdown:</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-slate-300 leading-normal">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
