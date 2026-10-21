import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Boss, Question } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  Shield, 
  Heart, 
  Swords, 
  Sparkles, 
  RotateCcw, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Coins, 
  Gem, 
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  boss: Boss;
  onClose: () => void;
}

export const BossBattle: React.FC<Props> = ({ boss, onClose }) => {
  const { user, recordAnswer, recordBossVictory, startWeakTopicsRevision } = useGame();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [playerShields, setPlayerShields] = useState(3);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [bossState, setBossState] = useState<'idle' | 'hit' | 'attack' | 'defeated'>('idle');
  const [combatLog, setCombatLog] = useState<string[]>([
    boss.dialogue.intro,
    `Boss Battle Begun: 10 Questions to conquer ${boss.name}!`
  ]);
  const [floatingDamage, setFloatingDamage] = useState<{ id: number; text: string; isCrit: boolean; isPlayerDamage?: boolean } | null>(null);
  const [missedQuestions, setMissedQuestions] = useState<{ question: Question; studentChoice: number }[]>([]);
  const [battleOutcome, setBattleOutcome] = useState<'playing' | 'victory' | 'defeat'>('playing');
  const [victoryRewards, setVictoryRewards] = useState<{ xpGained: number; coinsGained: number; gemsGained: number; badgeName: string } | null>(null);

  const currentQ = boss.questions[currentQuestionIndex];
  const damagePerHit = Math.round(boss.maxHp / boss.questions.length); // 10 HP per question

  const handleSelectOption = (idx: number) => {
    if (isAnswered || battleOutcome !== 'playing') return;

    setSelectedOption(idx);
    setIsAnswered(true);
    const isCorrect = idx === currentQ.correctIndex;

    // Record in global tracking
    recordAnswer(currentQ, isCorrect);

    if (isCorrect) {
      // Player hits boss!
      soundManager.playCriticalHit();
      setBossState('hit');
      const nextHp = Math.max(0, bossHp - damagePerHit);
      setBossHp(nextHp);

      // Trigger floating damage
      setFloatingDamage({ id: Date.now(), text: `-${damagePerHit} DMG`, isCrit: true });
      setCombatLog(prev => [
        `⚔️ Correct! You cast a critical counter and dealt ${damagePerHit} DMG to ${boss.name}!`,
        ...prev.slice(0, 5)
      ]);

      setTimeout(() => setBossState('idle'), 600);

      // Check if boss died or last question
      if (nextHp <= 0 || currentQuestionIndex === boss.questions.length - 1) {
        setTimeout(() => {
          handleVictory();
        }, 1200);
      }
    } else {
      // Boss attacks player!
      soundManager.playAttackHit();
      setBossState('attack');
      setMissedQuestions(prev => [...prev, { question: currentQ, studentChoice: idx }]);
      const nextShields = playerShields - 1;
      setPlayerShields(nextShields);

      setFloatingDamage({ id: Date.now(), text: `Shield -1`, isCrit: false, isPlayerDamage: true });
      setCombatLog(prev => [
        `💥 Mistake! ${boss.dialogue.onAttack}`,
        ...prev.slice(0, 5)
      ]);

      setTimeout(() => setBossState('idle'), 600);

      if (nextShields <= 0) {
        setTimeout(() => {
          handleDefeat();
        }, 1200);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < boss.questions.length - 1 && playerShields > 0 && bossHp > 0) {
      soundManager.playClick();
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setFloatingDamage(null);
    }
  };

  const handleVictory = () => {
    setBattleOutcome('victory');
    setBossState('defeated');
    soundManager.playBossRoar();
    const rewards = recordBossVictory(boss.id);
    setVictoryRewards(rewards);
  };

  const handleDefeat = () => {
    setBattleOutcome('defeat');
    soundManager.playError();
  };

  const handleRetry = () => {
    soundManager.playClick();
    setCurrentQuestionIndex(0);
    setBossHp(boss.maxHp);
    setPlayerShields(3);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setMissedQuestions([]);
    setBattleOutcome('playing');
    setBossState('idle');
    setCombatLog([boss.dialogue.intro, 'Rematch initiated! Stand firm!']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#11162b] via-[#0d1222] to-[#080c16] border-2 border-red-500/40 rounded-3xl p-4 sm:p-7 shadow-2xl glow-red text-slate-100 my-auto">
        
        {/* Top Battle Header */}
        <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Swords className="w-3.5 h-3.5" />
              Boss Encounter
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Question {currentQuestionIndex + 1} of {boss.questions.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= VICTORY SCREEN ================= */}
        {battleOutcome === 'victory' && (
          <div className="py-8 text-center space-y-6">
            <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-yellow-500 to-amber-600 text-5xl shadow-2xl glow-gold animate-bounce">
              🏆
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-white">
                VICTORY OVER {boss.name.toUpperCase()}!
              </h2>
              <p className="text-sm text-yellow-300/90 mt-1 max-w-md mx-auto">
                {boss.dialogue.defeat}
              </p>
            </div>

            {/* Rewards Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-center">
                <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold text-purple-300 font-display">+{victoryRewards?.xpGained || boss.rewards.xp} XP</p>
                <p className="text-[11px] text-purple-200/70">Mastery XP</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-center">
                <Coins className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold text-yellow-300 font-display">+{victoryRewards?.coinsGained || boss.rewards.coins}</p>
                <p className="text-[11px] text-yellow-200/70">Gold Coins</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center">
                <Gem className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-lg font-extrabold text-cyan-300 font-display">+{victoryRewards?.gemsGained || boss.rewards.gems}</p>
                <p className="text-[11px] text-cyan-200/70">Arcane Gems</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                <span className="text-2xl block mb-0.5">{boss.rewards.badgeIcon}</span>
                <p className="text-xs font-extrabold text-emerald-300 truncate">{victoryRewards?.badgeName || boss.rewards.badgeName}</p>
                <p className="text-[10px] text-emerald-200/70">Badge Unlocked!</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-xl glow-blue transition-all"
              >
                Claim Loot & Return to Citadel
              </button>
            </div>
          </div>
        )}

        {/* ================= DEFEAT / REVIEW SCREEN ================= */}
        {battleOutcome === 'defeat' && (
          <div className="py-6 space-y-6">
            <div className="text-center">
              <div className="inline-flex p-3 rounded-2xl bg-red-950 border border-red-500/50 text-3xl shadow-lg mb-2">
                💀
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-red-400">
                DEFEATED BY {boss.name.toUpperCase()}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                "{boss.dialogue.victory}"
              </p>
              <p className="text-xs text-amber-300 mt-2 font-medium">
                Review your missed questions below to master these concepts and claim victory!
              </p>
            </div>

            {/* Missed Questions Review */}
            <div className="max-h-60 overflow-y-auto space-y-3 p-3 bg-slate-900/80 rounded-2xl border border-red-500/20">
              {missedQuestions.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left text-xs space-y-1.5">
                  <p className="font-bold text-slate-200">
                    Q: {item.question.question}
                  </p>
                  <p className="text-red-400 font-semibold">
                    Your Answer: {item.question.options[item.studentChoice]}
                  </p>
                  <p className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Correct Answer: {item.question.options[item.question.correctIndex]}
                  </p>
                  <p className="text-slate-400 italic bg-slate-900/60 p-2 rounded-lg">
                    💡 Explanation: {item.question.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetry}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg glow-red transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Boss Battle</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  startWeakTopicsRevision();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-bold text-sm transition-all"
              >
                <span>Drill Weak Topics First</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= ACTIVE COMBAT SCREEN ================= */}
        {battleOutcome === 'playing' && (
          <div className="mt-4 space-y-6">
            
            {/* Arena Stage: Boss vs Player Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-2xl bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-950/80 border border-purple-500/25">
              
              {/* Boss Entity Showcase */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-purple-900 to-red-900 border-2 border-red-500/60 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl ${
                    bossState === 'hit' ? 'animate-shake border-yellow-400' : 'animate-float'
                  }`}>
                    {boss.avatar}
                  </div>

                  {/* Floating Damage Text */}
                  {floatingDamage && (
                    <div className={`absolute -top-3 -right-2 px-2 py-0.5 rounded font-black text-sm damage-indicator ${
                      floatingDamage.isPlayerDamage ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black glow-gold'
                    }`}>
                      {floatingDamage.text}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="font-extrabold text-base text-red-300 font-cinzel leading-tight">{boss.name}</h3>
                      <p className="text-[11px] text-slate-400">{boss.title}</p>
                    </div>
                    <span className="text-xs font-bold text-red-400 font-display">
                      {bossHp} / {boss.maxHp} HP
                    </span>
                  </div>

                  {/* Animated Boss HP Bar */}
                  <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-red-500/40 p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.max(0, (bossHp / boss.maxHp) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Player Shields & Combat Log */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{user.avatarId}</span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                      <p className="text-[10px] text-purple-300">Player Shields</p>
                    </div>
                  </div>

                  {/* 3 Shields Icons */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map(heartIdx => (
                      <div
                        key={heartIdx}
                        className={`p-1.5 rounded-lg border transition-all ${
                          heartIdx <= playerShields
                            ? 'bg-blue-950/80 border-blue-400 text-blue-400 glow-blue/40 scale-105'
                            : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                        }`}
                        title={heartIdx <= playerShields ? 'Shield Active' : 'Shield Broken'}
                      >
                        <Shield className="w-4 h-4 fill-current" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combat ticker message */}
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 truncate">
                  {combatLog[0]}
                </div>
              </div>

            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161c33] to-[#0f1424] border border-purple-500/30 shadow-lg text-left">
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
                      <span>{showHint ? 'Hide Hint' : 'Rune Hint'}</span>
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

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      onClick={() => handleSelectOption(idx)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm font-semibold transition-all duration-150 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Advance Card */}
              {isAnswered && (
                <div className={`p-4 rounded-2xl border text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/40 border-red-500/40 text-red-200'
                }`}>
                  <div className="space-y-1">
                    <p className="font-bold text-sm flex items-center gap-1.5">
                      {selectedOption === currentQ.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Direct Hit! +10 XP</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span>Shield Damaged! Study This:</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-300 leading-normal">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>{currentQuestionIndex === boss.questions.length - 1 ? 'Finish Duel' : 'Next Attack'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
