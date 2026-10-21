export type GradeLevel = 
  | 'Grade 1-2'
  | 'Grade 3-5'
  | 'Grade 6-8'
  | 'Grade 9-10'
  | 'Grade 11-12'
  | 'College / Advanced';

export type SubjectId = 
  | 'math'
  | 'science'
  | 'geography'
  | 'history'
  | 'english'
  | 'languages';

export type LanguageSubtype = 
  | 'Portuguese'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Japanese';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  difficulty: Difficulty;
  gradeRange: GradeLevel;
  subject: SubjectId;
  topic: string;
  subLanguage?: LanguageSubtype;
}

export interface WeakTopic {
  topic: string;
  subject: SubjectId;
  errorCount: number;
  lastMissedDate: string;
  sampleQuestionIds: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
  rewardCoins: number;
  rewardXp: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'avatar' | 'title' | 'skin' | 'pet' | 'badge';
  description: string;
  icon: string;
  costCoins: number;
  costGems: number;
  unlocked: boolean;
  equipped?: boolean;
  statBonus?: string;
  gradeRequirement?: string;
}

export interface BossReward {
  xp: number;
  coins: number;
  gems: number;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  unlockedWorldId?: string;
}

export interface Boss {
  id: string;
  name: string;
  title: string;
  subject: SubjectId;
  element: 'fire' | 'frost' | 'lightning' | 'shadow' | 'cosmic' | 'nature';
  avatar: string;
  maxHp: number;
  requiredLevel: number;
  lore: string;
  dialogue: {
    intro: string;
    onAttack: string;
    onHit: string;
    defeat: string;
    victory: string;
  };
  questions: Question[];
  rewards: BossReward;
}

export interface QuestNode {
  id: string;
  worldId: string;
  title: string;
  description: string;
  subject: SubjectId;
  topic: string;
  gradeRange: GradeLevel;
  difficulty: Difficulty;
  xpReward: number;
  coinReward: number;
  questionsCount: number;
  isBossLair?: boolean;
  bossId?: string;
  x: number; // For map positioning (%)
  y: number; // For map positioning (%)
  prerequisiteNodeId?: string;
}

export interface World {
  id: string;
  title: string;
  subject: SubjectId;
  themeColor: string;
  description: string;
  icon: string;
  requiredLevel: number;
  bgGradient: string;
}

export interface DailyStreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoalTarget: number; // e.g. 5 questions answered or 1 quest done
  dailyGoalProgress: number;
  dailyGoalCompleted: boolean;
  freezeCount: number;
  claimedMilestones: number[]; // Day 1, Day 3, Day 7, Day 14, Day 30
}

export interface UserProfile {
  id: string;
  name: string;
  avatarId: string;
  grade: GradeLevel;
  age: number;
  heroClass: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  equippedTitle: string;
  equippedPet?: string;
  equippedSkin?: string;
  streak: DailyStreakData;
  unlockedWorlds: string[];
  unlockedBosses: string[];
  defeatedBosses: string[];
  completedQuestIds: string[];
  questStars: Record<string, number>; // questId -> 1, 2, or 3 stars
  weakTopics: WeakTopic[];
  inventory: InventoryItem[];
  achievements: Achievement[];
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    bossVictories: number;
    totalStudyMinutes: number;
    subjectStats: Record<SubjectId, { answered: number; correct: number }>;
  };
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarId: string;
  grade: GradeLevel;
  level: number;
  xp: number;
  streak: number;
  league: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master';
  isCurrentUser?: boolean;
}
