import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, GradeLevel, SubjectId, Question, Boss, Difficulty } from '../types/game';
import { INITIAL_INVENTORY_ITEMS, INITIAL_ACHIEVEMENTS } from '../data/storeItems';
import { BOSS_BATTLES } from '../data/bosses';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface GameContextType {
  user: UserProfile;
  activeScreen: 'dashboard' | 'quests' | 'subjects' | 'bosses' | 'map' | 'shop' | 'leaderboard' | 'progress';
  setActiveScreen: (screen: 'dashboard' | 'quests' | 'subjects' | 'bosses' | 'map' | 'shop' | 'leaderboard' | 'progress') => void;
  isMuted: boolean;
  toggleMute: () => void;
  // Quiz & Combat
  activeQuizQuest: { questId: string; title: string; questions: Question[]; xpReward: number; coinReward: number } | null;
  startQuest: (questId: string, title: string, questions: Question[], xpReward: number, coinReward: number) => void;
  closeQuizQuest: () => void;
  activeBossBattle: Boss | null;
  startBossBattle: (boss: Boss) => void;
  closeBossBattle: () => void;
  // Progress updates
  recordAnswer: (question: Question, isCorrect: boolean) => void;
  completeQuestSuccess: (questId: string, baseRewardXp: number, baseRewardCoins: number, stars: number) => { xpGained: number; coinsGained: number; isFirstTime: boolean };
  recordBossVictory: (bossId: string) => { xpGained: number; coinsGained: number; gemsGained: number; badgeName: string };
  // Streak
  checkDailyStreak: () => void;
  claimStreakMilestone: (day: number) => { coins: number; gems: number; title?: string } | null;
  // Shop & Inventory
  buyItem: (itemId: string) => boolean;
  equipItem: (itemId: string) => void;
  // User Profile configuration
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetToDemo: () => void;
  // Revision
  startWeakTopicsRevision: () => void;
  clearWeakTopic: (topic: string) => void;
  // Level up modal
  levelUpModalData: { oldLevel: number; newLevel: number } | null;
  closeLevelUpModal: () => void;
}

const STORAGE_KEY = 'studyquest_user_v2';

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'hero-1',
  name: 'Alex Starblade',
  avatarId: '🧙‍♂️',
  grade: 'Grade 6-8',
  age: 13,
  heroClass: 'Arcane Scholar',
  level: 1,
  xp: 0,
  coins: 120,
  gems: 10,
  equippedTitle: 'Novice Seeker',
  equippedPet: undefined,
  streak: {
    currentStreak: 1,
    bestStreak: 1,
    lastActiveDate: getTodayString(),
    dailyGoalTarget: 3,
    dailyGoalProgress: 1,
    dailyGoalCompleted: false,
    freezeCount: 1,
    claimedMilestones: []
  },
  unlockedWorlds: ['world-math'],
  unlockedBosses: ['boss-math-1'],
  defeatedBosses: [],
  completedQuestIds: [],
  questStars: {},
  weakTopics: [],
  inventory: INITIAL_INVENTORY_ITEMS,
  achievements: INITIAL_ACHIEVEMENTS,
  stats: {
    totalQuestions: 0,
    correctAnswers: 0,
    bossVictories: 0,
    totalStudyMinutes: 15,
    subjectStats: {
      math: { answered: 0, correct: 0 },
      science: { answered: 0, correct: 0 },
      geography: { answered: 0, correct: 0 },
      history: { answered: 0, correct: 0 },
      english: { answered: 0, correct: 0 },
      languages: { answered: 0, correct: 0 }
    }
  }
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'quests' | 'subjects' | 'bosses' | 'map' | 'shop' | 'leaderboard' | 'progress'>('dashboard');
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());
  const [activeQuizQuest, setActiveQuizQuest] = useState<{ questId: string; title: string; questions: Question[]; xpReward: number; coinReward: number } | null>(null);
  const [activeBossBattle, setActiveBossBattle] = useState<Boss | null>(null);
  const [levelUpModalData, setLevelUpModalData] = useState<{ oldLevel: number; newLevel: number } | null>(null);

  // Initialize sound on mount
  useEffect(() => {
    soundManager.initFromStorage();
    setIsMuted(soundManager.isMuted());
  }, []);

  // Save user profile changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const toggleMute = useCallback(() => {
    const next = !isMuted;
    soundManager.setMuted(next);
    setIsMuted(next);
  }, [isMuted]);

  // Daily Streak check according to user requirements:
  // "it must be of one day and resets if the daily goal is not met."
  const checkDailyStreak = useCallback(() => {
    const today = getTodayString();
    const yesterday = getYesterdayString();
    const lastActive = user.streak.lastActiveDate;

    if (lastActive === today) {
      // Already active today, nothing to reset
      return;
    }

    if (lastActive === yesterday) {
      // Active yesterday! Check if goal was met
      if (user.streak.dailyGoalCompleted) {
        // Continue streak, start new day counter
        setUser(prev => ({
          ...prev,
          streak: {
            ...prev.streak,
            lastActiveDate: today,
            dailyGoalProgress: 0,
            dailyGoalCompleted: false
          }
        }));
      } else {
        // Missed yesterday's daily goal! Resets to 1
        setUser(prev => ({
          ...prev,
          streak: {
            ...prev.streak,
            currentStreak: 1,
            lastActiveDate: today,
            dailyGoalProgress: 0,
            dailyGoalCompleted: false
          }
        }));
      }
    } else {
      // More than 1 day missed! Streak resets to 1
      setUser(prev => ({
        ...prev,
        streak: {
          ...prev.streak,
          currentStreak: 1,
          lastActiveDate: today,
          dailyGoalProgress: 0,
          dailyGoalCompleted: false
        }
      }));
    }
  }, [user.streak]);

  // Run streak check on mount
  useEffect(() => {
    checkDailyStreak();
  }, [checkDailyStreak]);

  // Calculate Level from XP: Level 1 = 0-99 XP, Level 2 = 100-249 XP, Level 3 = 250-449 XP...
  const checkLevelUp = (currentXp: number, currentLevel: number): number => {
    const newLevel = Math.max(1, Math.floor(Math.sqrt(currentXp / 30)) + 1);
    return newLevel > currentLevel ? newLevel : currentLevel;
  };

  const recordAnswer = useCallback((question: Question, isCorrect: boolean) => {
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }

    setUser(prev => {
      const today = getTodayString();
      const prevXp = prev.xp;
      const xpGained = isCorrect ? 10 : 2; // 10 XP for correct answer, 2 XP for effort
      const nextXp = prevXp + xpGained;
      const nextLevel = checkLevelUp(nextXp, prev.level);

      if (nextLevel > prev.level) {
        soundManager.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setLevelUpModalData({ oldLevel: prev.level, newLevel: nextLevel });
      }

      // Update daily goal
      const nextProgress = prev.streak.dailyGoalProgress + 1;
      const goalCompleted = nextProgress >= prev.streak.dailyGoalTarget;
      let nextStreak = prev.streak.currentStreak;
      if (!prev.streak.dailyGoalCompleted && goalCompleted) {
        nextStreak = prev.streak.currentStreak + 1;
        soundManager.playCoin();
      }

      // Update weak topics on mistake
      let nextWeak = [...prev.weakTopics];
      if (!isCorrect) {
        const existing = nextWeak.find(w => w.topic.toLowerCase() === question.topic.toLowerCase());
        if (existing) {
          existing.errorCount += 1;
          existing.lastMissedDate = today;
          if (!existing.sampleQuestionIds.includes(question.id)) {
            existing.sampleQuestionIds.push(question.id);
          }
        } else {
          nextWeak.push({
            topic: question.topic,
            subject: question.subject,
            errorCount: 1,
            lastMissedDate: today,
            sampleQuestionIds: [question.id]
          });
        }
      }

      // Update subject stats
      const subjectStat = prev.stats.subjectStats[question.subject] || { answered: 0, correct: 0 };
      const updatedSubjectStats = {
        ...prev.stats.subjectStats,
        [question.subject]: {
          answered: subjectStat.answered + 1,
          correct: subjectStat.correct + (isCorrect ? 1 : 0)
        }
      };

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        coins: prev.coins + (isCorrect ? 5 : 1),
        weakTopics: nextWeak,
        streak: {
          ...prev.streak,
          lastActiveDate: today,
          dailyGoalProgress: nextProgress,
          dailyGoalCompleted: goalCompleted || prev.streak.dailyGoalCompleted,
          currentStreak: nextStreak,
          bestStreak: Math.max(prev.streak.bestStreak, nextStreak)
        },
        stats: {
          ...prev.stats,
          totalQuestions: prev.stats.totalQuestions + 1,
          correctAnswers: prev.stats.correctAnswers + (isCorrect ? 1 : 0),
          totalStudyMinutes: prev.stats.totalStudyMinutes + 1,
          subjectStats: updatedSubjectStats
        }
      };
    });
  }, []);

  const completeQuestSuccess = useCallback((questId: string, baseRewardXp: number, baseRewardCoins: number, stars: number) => {
    soundManager.playLevelUp();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    const isFirstTime = !user.completedQuestIds.includes(questId);
    const xpGained = isFirstTime ? baseRewardXp : Math.round(baseRewardXp * 0.25); // Practice reward if replay
    const coinsGained = isFirstTime ? baseRewardCoins : Math.round(baseRewardCoins * 0.25);

    setUser(prev => {
      const nextXp = prev.xp + xpGained;
      const nextLevel = checkLevelUp(nextXp, prev.level);

      if (nextLevel > prev.level) {
        setLevelUpModalData({ oldLevel: prev.level, newLevel: nextLevel });
      }

      const completed = isFirstTime ? [...prev.completedQuestIds, questId] : prev.completedQuestIds;
      const bestStars = Math.max(prev.questStars[questId] || 0, stars);

      // Check achievements
      const achievements = prev.achievements.map(ach => {
        if (ach.id === 'ach-first-quest' && completed.length >= 1) {
          return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || getTodayString() };
        }
        return ach;
      });

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        coins: prev.coins + coinsGained,
        completedQuestIds: completed,
        questStars: { ...prev.questStars, [questId]: bestStars },
        achievements
      };
    });

    return { xpGained, coinsGained, isFirstTime };
  }, [user.completedQuestIds]);

  const recordBossVictory = useCallback((bossId: string) => {
    soundManager.playLevelUp();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });

    const boss = BOSS_BATTLES.find(b => b.id === bossId);
    const isFirstTime = !user.defeatedBosses.includes(bossId);

    const xpGained = boss ? (isFirstTime ? boss.rewards.xp : Math.round(boss.rewards.xp * 0.3)) : 200;
    const coinsGained = boss ? (isFirstTime ? boss.rewards.coins : Math.round(boss.rewards.coins * 0.3)) : 250;
    const gemsGained = boss ? (isFirstTime ? boss.rewards.gems : 2) : 5;
    const badgeName = boss ? boss.rewards.badgeName : 'Boss Conqueror';

    setUser(prev => {
      const nextXp = prev.xp + xpGained;
      const nextLevel = checkLevelUp(nextXp, prev.level);

      if (nextLevel > prev.level) {
        setLevelUpModalData({ oldLevel: prev.level, newLevel: nextLevel });
      }

      const defeated = isFirstTime ? [...prev.defeatedBosses, bossId] : prev.defeatedBosses;
      
      // Unlock next world if specified
      let unlockedWorlds = [...prev.unlockedWorlds];
      if (boss?.rewards.unlockedWorldId && !unlockedWorlds.includes(boss.rewards.unlockedWorldId)) {
        unlockedWorlds.push(boss.rewards.unlockedWorldId);
      }

      // Unlock next boss
      const bossIdx = BOSS_BATTLES.findIndex(b => b.id === bossId);
      let unlockedBosses = [...prev.unlockedBosses];
      if (bossIdx >= 0 && bossIdx + 1 < BOSS_BATTLES.length) {
        const nextBoss = BOSS_BATTLES[bossIdx + 1];
        if (!unlockedBosses.includes(nextBoss.id)) {
          unlockedBosses.push(nextBoss.id);
        }
      }

      // Add badge to inventory if first time
      let inventory = [...prev.inventory];
      if (boss && isFirstTime) {
        inventory.push({
          id: boss.rewards.badgeId,
          name: boss.rewards.badgeName,
          type: 'badge',
          description: `Defeated ${boss.name} (${boss.title})`,
          icon: boss.rewards.badgeIcon,
          costCoins: 0,
          costGems: 0,
          unlocked: true
        });
      }

      // Achievement: Colossus Bane
      const achievements = prev.achievements.map(ach => {
        if (ach.id === 'ach-boss-slayer') {
          return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || getTodayString() };
        }
        return ach;
      });

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        coins: prev.coins + coinsGained,
        gems: prev.gems + gemsGained,
        defeatedBosses: defeated,
        unlockedWorlds,
        unlockedBosses,
        inventory,
        achievements,
        stats: {
          ...prev.stats,
          bossVictories: prev.stats.bossVictories + 1
        }
      };
    });

    return { xpGained, coinsGained, gemsGained, badgeName };
  }, [user.defeatedBosses]);

  const claimStreakMilestone = useCallback((day: number) => {
    if (user.streak.claimedMilestones.includes(day)) return null;
    if (user.streak.currentStreak < day) return null;

    soundManager.playCoin();
    let coins = 100;
    let gems = 5;
    let title: string | undefined = undefined;

    if (day === 1) { coins = 50; gems = 3; }
    else if (day === 3) { coins = 150; gems = 8; title = 'Flame of Discipline'; }
    else if (day === 7) { coins = 350; gems = 20; title = 'Week Champion'; }
    else if (day === 14) { coins = 700; gems = 45; title = 'Fortnight Titan'; }
    else if (day === 30) { coins = 1500; gems = 100; title = 'Solar Legend'; }

    setUser(prev => {
      let inv = [...prev.inventory];
      if (title) {
        inv.push({
          id: `title-streak-${day}`,
          name: title,
          type: 'title',
          description: `Reward for reaching a ${day}-day study streak!`,
          icon: '🔥✨',
          costCoins: 0,
          costGems: 0,
          unlocked: true
        });
      }

      return {
        ...prev,
        coins: prev.coins + coins,
        gems: prev.gems + gems,
        inventory: inv,
        streak: {
          ...prev.streak,
          claimedMilestones: [...prev.streak.claimedMilestones, day]
        }
      };
    });

    return { coins, gems, title };
  }, [user.streak]);

  const buyItem = useCallback((itemId: string): boolean => {
    const item = user.inventory.find(i => i.id === itemId);
    if (!item || item.unlocked) return false;

    if (user.coins >= item.costCoins && user.gems >= item.costGems) {
      soundManager.playCoin();
      setUser(prev => ({
        ...prev,
        coins: prev.coins - item.costCoins,
        gems: prev.gems - item.costGems,
        inventory: prev.inventory.map(i => i.id === itemId ? { ...i, unlocked: true } : i)
      }));
      return true;
    }
    soundManager.playError();
    return false;
  }, [user]);

  const equipItem = useCallback((itemId: string) => {
    const item = user.inventory.find(i => i.id === itemId);
    if (!item || !item.unlocked) return;

    soundManager.playClick();
    setUser(prev => {
      let avatarId = prev.avatarId;
      let equippedTitle = prev.equippedTitle;
      let equippedPet = prev.equippedPet;
      let equippedSkin = prev.equippedSkin;

      if (item.type === 'avatar') avatarId = item.icon;
      if (item.type === 'title') equippedTitle = item.name;
      if (item.type === 'pet') equippedPet = item.name;
      if (item.type === 'skin') equippedSkin = item.name;

      const nextInv = prev.inventory.map(i => {
        if (i.type === item.type) {
          return { ...i, equipped: i.id === itemId };
        }
        return i;
      });

      return {
        ...prev,
        avatarId,
        equippedTitle,
        equippedPet,
        equippedSkin,
        inventory: nextInv
      };
    });
  }, [user.inventory]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const resetToDemo = useCallback(() => {
    setUser(DEFAULT_PROFILE);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const startQuest = useCallback((questId: string, title: string, questions: Question[], xpReward: number, coinReward: number) => {
    setActiveQuizQuest({ questId, title, questions, xpReward, coinReward });
  }, []);

  const closeQuizQuest = useCallback(() => {
    setActiveQuizQuest(null);
  }, []);

  const startBossBattle = useCallback((boss: Boss) => {
    setActiveBossBattle(boss);
  }, []);

  const closeBossBattle = useCallback(() => {
    setActiveBossBattle(null);
  }, []);

  const clearWeakTopic = useCallback((topic: string) => {
    setUser(prev => ({
      ...prev,
      weakTopics: prev.weakTopics.filter(w => w.topic.toLowerCase() !== topic.toLowerCase())
    }));
  }, []);

  const startWeakTopicsRevision = useCallback(() => {
    if (user.weakTopics.length === 0) return;
    const weakest = user.weakTopics[0];
    // Create a dynamic revision drill
    const questions: Question[] = [
      {
        id: `rev-1-${Date.now()}`,
        subject: weakest.subject,
        gradeRange: user.grade,
        difficulty: 'Medium',
        topic: weakest.topic,
        question: `Revision Challenge [${weakest.topic}]: Which fundamental principle is critical when applying this concept?`,
        options: [
          'Verify assumptions and follow step-by-step logic',
          'Rely solely on intuitive guesses',
          'Skip calculations and estimate wildly',
          'Ignore negative signs and inverse operations'
        ],
        correctIndex: 0,
        explanation: `By methodically testing each step in ${weakest.topic}, you avoid previous pitfalls and solidify your mastery.`,
        hint: 'Carefully verify each calculation or fact step-by-step.'
      },
      {
        id: `rev-2-${Date.now()}`,
        subject: weakest.subject,
        gradeRange: user.grade,
        difficulty: 'Hard',
        topic: weakest.topic,
        question: `Application Mastery [${weakest.topic}]: What is the recommended strategy when solving complex questions in this topic?`,
        options: [
          'Break down into smaller identifiable sub-problems',
          'Select the longest option automatically',
          'Only study this topic once a year',
          'Rush as fast as possible without re-reading'
        ],
        correctIndex: 0,
        explanation: 'Decomposing complex concepts into smaller sub-problems guarantees deep comprehension and accuracy.',
        hint: 'Divide and conquer.'
      }
    ];

    startQuest(`revision-${weakest.topic}`, `Revision Rematch: ${weakest.topic}`, questions, 80, 60);
  }, [user.weakTopics, user.grade, startQuest]);

  const closeLevelUpModal = useCallback(() => {
    setLevelUpModalData(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        user,
        activeScreen,
        setActiveScreen,
        isMuted,
        toggleMute,
        activeQuizQuest,
        startQuest,
        closeQuizQuest,
        activeBossBattle,
        startBossBattle,
        closeBossBattle,
        recordAnswer,
        completeQuestSuccess,
        recordBossVictory,
        checkDailyStreak,
        claimStreakMilestone,
        buyItem,
        equipItem,
        updateProfile,
        resetToDemo,
        startWeakTopicsRevision,
        clearWeakTopic,
        levelUpModalData,
        closeLevelUpModal
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
