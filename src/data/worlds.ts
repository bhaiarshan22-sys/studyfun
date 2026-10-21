import { World, QuestNode } from '../types/game';

export const WORLDS: World[] = [
  {
    id: 'world-math',
    title: 'Mathemagical Citadel',
    subject: 'math',
    themeColor: '#38bdf8', // sky blue
    description: 'A soaring crystalline fortress where geometric equations and arithmetic runes maintain reality itself.',
    icon: '📐',
    requiredLevel: 1,
    bgGradient: 'from-sky-950 via-slate-900 to-indigo-950'
  },
  {
    id: 'world-science',
    title: 'Alchemical Grove & Bio-Core',
    subject: 'science',
    themeColor: '#10b981', // emerald
    description: 'Bioluminescent forests and subterranean laboratories pulsating with chemical reactions and cosmic energy.',
    icon: '🌿',
    requiredLevel: 2,
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950'
  },
  {
    id: 'world-languages',
    title: 'The Polyglot Bazaar',
    subject: 'languages',
    themeColor: '#c084fc', // purple
    description: 'A bustling multi-dimensional marketplace where travelers trade scrolls in Portuguese, Spanish, French, and ancient tongues.',
    icon: '🗣️',
    requiredLevel: 2,
    bgGradient: 'from-purple-950 via-slate-900 to-fuchsia-950'
  },
  {
    id: 'world-geography',
    title: 'Atlas Peaks & Sky Isles',
    subject: 'geography',
    themeColor: '#f59e0b', // amber
    description: 'Floating continental plates, rushing cataracts, and soaring peaks mapping the contours of the known globe.',
    icon: '🗺️',
    requiredLevel: 3,
    bgGradient: 'from-amber-950 via-slate-900 to-orange-950'
  },
  {
    id: 'world-history',
    title: 'Chronos Ruins & Time Vault',
    subject: 'history',
    themeColor: '#f97316', // orange
    description: 'Time-fractured monuments and forgotten pyramids holding the preserved memories of all ancient empires.',
    icon: '🏛️',
    requiredLevel: 3,
    bgGradient: 'from-orange-950 via-slate-900 to-amber-950'
  },
  {
    id: 'world-english',
    title: 'Labyrinth of the Grand Lexicon',
    subject: 'english',
    themeColor: '#818cf8', // indigo
    description: 'A library with towering living bookshelves where words possess physical shape and metamorphic power.',
    icon: '📖',
    requiredLevel: 4,
    bgGradient: 'from-indigo-950 via-slate-900 to-purple-950'
  }
];

export const QUEST_NODES: QuestNode[] = [
  // Math Citadel
  {
    id: 'quest-math-1',
    worldId: 'world-math',
    title: 'Awakening of Numbers',
    description: 'Master foundational arithmetic and unlock the gate of the Citadel.',
    subject: 'math',
    topic: 'Addition & Subtraction',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    xpReward: 50,
    coinReward: 40,
    questionsCount: 3,
    x: 18,
    y: 72
  },
  {
    id: 'quest-math-2',
    worldId: 'world-math',
    title: 'The Multiplication Matrix',
    description: 'Channel numeric multipliers to charge the defensive obelisks.',
    subject: 'math',
    topic: 'Multiplication & Division',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    xpReward: 80,
    coinReward: 60,
    questionsCount: 4,
    x: 32,
    y: 58,
    prerequisiteNodeId: 'quest-math-1'
  },
  {
    id: 'quest-math-3',
    worldId: 'world-math',
    title: 'Fractional Alchemy',
    description: 'Balance broken crystals by calculating precise fractional proportions.',
    subject: 'math',
    topic: 'Fractions & Decimals',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    xpReward: 100,
    coinReward: 80,
    questionsCount: 4,
    x: 48,
    y: 44,
    prerequisiteNodeId: 'quest-math-2'
  },
  {
    id: 'quest-math-4',
    worldId: 'world-math',
    title: 'Algebraic Runes',
    description: 'Decipher the mysterious variable X left on the ancient columns.',
    subject: 'math',
    topic: 'Pre-Algebra & Variables',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 130,
    coinReward: 100,
    questionsCount: 5,
    x: 65,
    y: 35,
    prerequisiteNodeId: 'quest-math-3'
  },
  {
    id: 'quest-math-boss',
    worldId: 'world-math',
    title: 'Colossus Sanctum (Boss Lair)',
    description: 'Confront Pyramath the Calculus Colossus in a 10-question deathmatch!',
    subject: 'math',
    topic: 'Colossus Trial',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 250,
    coinReward: 300,
    questionsCount: 10,
    isBossLair: true,
    bossId: 'boss-math-1',
    x: 82,
    y: 20,
    prerequisiteNodeId: 'quest-math-4'
  },

  // Alchemical Grove (Science)
  {
    id: 'quest-sci-1',
    worldId: 'world-science',
    title: 'Roots of Vitality',
    description: 'Study plant photosynthesis and the water cycle in the sacred canopy.',
    subject: 'science',
    topic: 'Plants & Nature',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    xpReward: 60,
    coinReward: 45,
    questionsCount: 3,
    x: 20,
    y: 75
  },
  {
    id: 'quest-sci-2',
    worldId: 'world-science',
    title: 'The Cellular Dynamo',
    description: 'Peer into atomic and cellular structures powering living organisms.',
    subject: 'science',
    topic: 'Cell Biology',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    xpReward: 90,
    coinReward: 70,
    questionsCount: 4,
    x: 40,
    y: 55,
    prerequisiteNodeId: 'quest-sci-1'
  },
  {
    id: 'quest-sci-3',
    worldId: 'world-science',
    title: 'Elemental Fusion Vault',
    description: 'Harness the periodic table and physical laws of energy and motion.',
    subject: 'science',
    topic: 'Chemistry & Physics',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 120,
    coinReward: 90,
    questionsCount: 5,
    x: 62,
    y: 40,
    prerequisiteNodeId: 'quest-sci-2'
  },
  {
    id: 'quest-sci-boss',
    worldId: 'world-science',
    title: 'Toxivor Cavern (Boss Lair)',
    description: 'Neutralize the Chemical Chimera before it blights the ecosystem!',
    subject: 'science',
    topic: 'Chimera Trial',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 320,
    coinReward: 350,
    questionsCount: 10,
    isBossLair: true,
    bossId: 'boss-science-1',
    x: 84,
    y: 22,
    prerequisiteNodeId: 'quest-sci-3'
  },

  // Polyglot Bazaar (Languages - Portuguese, Spanish, etc.)
  {
    id: 'quest-lang-1',
    worldId: 'world-languages',
    title: 'The Greeting Plaza (Olá & Hola)',
    description: 'Master polite salutations and basic greetings in Portuguese and Spanish.',
    subject: 'languages',
    topic: 'Portuguese & Spanish Greetings',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    xpReward: 60,
    coinReward: 50,
    questionsCount: 4,
    x: 22,
    y: 70
  },
  {
    id: 'quest-lang-2',
    worldId: 'world-languages',
    title: 'The Lexical Marketplace',
    description: 'Trade words for numbers, colors, and daily essentials in Portuguese and world tongues.',
    subject: 'languages',
    topic: 'Portuguese Vocabulary & Essentials',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    xpReward: 95,
    coinReward: 75,
    questionsCount: 4,
    x: 45,
    y: 52,
    prerequisiteNodeId: 'quest-lang-1'
  },
  {
    id: 'quest-lang-3',
    worldId: 'world-languages',
    title: 'Syntax & Verb Conjugation',
    description: 'Learn regular verbs and gender agreement in Portuguese and European tongues.',
    subject: 'languages',
    topic: 'Portuguese Grammar & Verbs',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 130,
    coinReward: 100,
    questionsCount: 5,
    x: 65,
    y: 36,
    prerequisiteNodeId: 'quest-lang-2'
  },
  {
    id: 'quest-lang-boss',
    worldId: 'world-languages',
    title: 'Sphinx Perch (Boss Lair)',
    description: 'Face Babelon the Polyglot Sphinx in a multilingual riddle duel!',
    subject: 'languages',
    topic: 'Polyglot Riddle Duel',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 400,
    coinReward: 450,
    questionsCount: 10,
    isBossLair: true,
    bossId: 'boss-languages-1',
    x: 85,
    y: 18,
    prerequisiteNodeId: 'quest-lang-3'
  },

  // Chronos Ruins (History)
  {
    id: 'quest-hist-1',
    worldId: 'world-history',
    title: 'Dawn of Civilizations',
    description: 'Explore the fertile crescent and the monumental pharaohs of Egypt.',
    subject: 'history',
    topic: 'Ancient Civilizations',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    xpReward: 65,
    coinReward: 50,
    questionsCount: 3,
    x: 20,
    y: 68
  },
  {
    id: 'quest-hist-2',
    worldId: 'world-history',
    title: 'Age of Discovery & Renaissance',
    description: 'Trace the navigations of Portuguese explorers and Gutenberg’s press.',
    subject: 'history',
    topic: 'Exploration & Renaissance',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    xpReward: 100,
    coinReward: 80,
    questionsCount: 4,
    x: 48,
    y: 48,
    prerequisiteNodeId: 'quest-hist-1'
  },
  {
    id: 'quest-hist-boss',
    worldId: 'world-history',
    title: 'Temporal Singularity (Boss Lair)',
    description: 'Restore the timeline by outwitting Chronos the Time Devourer!',
    subject: 'history',
    topic: 'History Paradox',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    xpReward: 450,
    coinReward: 500,
    questionsCount: 10,
    isBossLair: true,
    bossId: 'boss-history-1',
    x: 80,
    y: 25,
    prerequisiteNodeId: 'quest-hist-2'
  }
];
