import { InventoryItem, Achievement } from '../types/game';

export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  // Avatars
  {
    id: 'avatar-mage',
    name: 'Arcane Scholar',
    type: 'avatar',
    description: 'A master of spellbound equations and ancient lore.',
    icon: '🧙‍♂️',
    costCoins: 0,
    costGems: 0,
    unlocked: true,
    equipped: true
  },
  {
    id: 'avatar-warrior',
    name: 'Blade of Wisdom',
    type: 'avatar',
    description: 'Armor-clad champion who slices through logic puzzles.',
    icon: '⚔️🛡️',
    costCoins: 150,
    costGems: 0,
    unlocked: false
  },
  {
    id: 'avatar-cyber',
    name: 'Cybernetic Prodigy',
    type: 'avatar',
    description: 'Futuristic hacker armed with quantum processors.',
    icon: '🤖⚡',
    costCoins: 300,
    costGems: 10,
    unlocked: false
  },
  {
    id: 'avatar-ranger',
    name: 'Forest Pathfinder',
    type: 'avatar',
    description: 'Expert tracker fluent in the natural flora and fauna.',
    icon: '🏹🌿',
    costCoins: 200,
    costGems: 5,
    unlocked: false
  },
  {
    id: 'avatar-valkyrie',
    name: 'Celestial Valkyrie',
    type: 'avatar',
    description: 'Winged guardian of historical truths and languages.',
    icon: '✨🧝‍♀️',
    costCoins: 500,
    costGems: 25,
    unlocked: false
  },

  // Titles
  {
    id: 'title-novice',
    name: 'Novice Seeker',
    type: 'title',
    description: 'Beginning of an unforgettable learning expedition.',
    icon: '📜',
    costCoins: 0,
    costGems: 0,
    unlocked: true,
    equipped: true
  },
  {
    id: 'title-mathblade',
    name: 'Colossus Slicer',
    type: 'title',
    description: 'Title bestowed upon those who dismantle algebraic beasts.',
    icon: '⚡',
    costCoins: 250,
    costGems: 5,
    unlocked: false,
    statBonus: '+5% XP in Mathematics'
  },
  {
    id: 'title-polyglot',
    name: 'Polyglot Envoy',
    type: 'title',
    description: 'Master of Portuguese, Spanish, and world languages.',
    icon: '🗣️',
    costCoins: 300,
    costGems: 10,
    unlocked: false,
    statBonus: '+10% Coins in Languages'
  },
  {
    id: 'title-archmage',
    name: 'Grand Archmage of Logic',
    type: 'title',
    description: 'Legendary rank for students with 90%+ overall accuracy.',
    icon: '👑',
    costCoins: 800,
    costGems: 50,
    unlocked: false,
    statBonus: '+15% All XP'
  },

  // Pets & Companions
  {
    id: 'pet-owl',
    name: 'Athena the Wisdom Owl',
    type: 'pet',
    description: 'Hoots helpful clues and keeps your daily streak burning bright.',
    icon: '🦉',
    costCoins: 250,
    costGems: 5,
    unlocked: false,
    statBonus: 'Grants 1 Hint recharge per quiz'
  },
  {
    id: 'pet-dragon',
    name: 'Ignis Baby Dragon',
    type: 'pet',
    description: 'Breathes motivational fire on your streak counter!',
    icon: '🐲',
    costCoins: 600,
    costGems: 20,
    unlocked: false,
    statBonus: '+10% Boss damage'
  },
  {
    id: 'pet-fox',
    name: 'Kitsune of Memory',
    type: 'pet',
    description: 'Spiritual fox helping remember tricky past mistakes.',
    icon: '🦊',
    costCoins: 400,
    costGems: 15,
    unlocked: false,
    statBonus: 'Boosts revision quest rewards by 20%'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-quest',
    title: 'First Steps of Heroism',
    description: 'Complete your first educational quest.',
    icon: '🎯',
    progress: 0,
    target: 1,
    rewardCoins: 50,
    rewardXp: 100
  },
  {
    id: 'ach-streak-3',
    title: 'Study Flame',
    description: 'Reach a 3-day daily study streak.',
    icon: '🔥',
    progress: 1,
    target: 3,
    rewardCoins: 150,
    rewardXp: 150
  },
  {
    id: 'ach-streak-7',
    title: 'Unstoppable Scholar',
    description: 'Maintain a 7-day daily study streak.',
    icon: '⚡🔥',
    progress: 1,
    target: 7,
    rewardCoins: 350,
    rewardXp: 400
  },
  {
    id: 'ach-boss-slayer',
    title: 'Colossus Bane',
    description: 'Defeat your first epic subject Boss.',
    icon: '🏆',
    progress: 0,
    target: 1,
    rewardCoins: 200,
    rewardXp: 300
  },
  {
    id: 'ach-polyglot',
    title: 'Língua Viva (Living Tongue)',
    description: 'Answer 10 Portuguese or language questions correctly.',
    icon: '🇧🇷🇵🇹',
    progress: 0,
    target: 10,
    rewardCoins: 200,
    rewardXp: 250
  },
  {
    id: 'ach-scholar-50',
    title: 'Grand Knowledge Accumulator',
    description: 'Answer 50 questions across all subjects.',
    icon: '📚',
    progress: 0,
    target: 50,
    rewardCoins: 500,
    rewardXp: 600
  }
];
