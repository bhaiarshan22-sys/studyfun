import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { LeaderboardUser, GradeLevel } from '../types/game';
import { Trophy, Medal, Flame, Sparkles, Shield, UserCheck, Filter } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const Leaderboard: React.FC = () => {
  const { user } = useGame();
  const [gradeFilter, setGradeFilter] = useState<GradeLevel | 'all'>('all');
  const [leagueFilter, setLeagueFilter] = useState<string>('all');

  // Simulated anonymized peers around the student's level
  const baseUsers: LeaderboardUser[] = [
    { id: 'lb-1', name: 'CosmicSage #402', avatarId: '🧝‍♀️', grade: user.grade, level: Math.max(1, user.level + 2), xp: user.xp + 420, streak: 12, league: 'Diamond' },
    { id: 'lb-2', name: 'PixelKnight #109', avatarId: '⚔️', grade: user.grade, level: Math.max(1, user.level + 1), xp: user.xp + 210, streak: 9, league: 'Gold' },
    { id: 'lb-3', name: 'BioAlchemist #883', avatarId: '🧪', grade: user.grade, level: user.level, xp: Math.max(10, user.xp + 50), streak: 7, league: 'Gold' },
    { id: 'lb-user', name: `${user.name} (You)`, avatarId: user.avatarId, grade: user.grade, level: user.level, xp: user.xp, streak: user.streak.currentStreak, league: user.level >= 5 ? 'Diamond' : user.level >= 3 ? 'Gold' : 'Silver', isCurrentUser: true },
    { id: 'lb-4', name: 'ChronosRogue #319', avatarId: '⏳', grade: user.grade, level: Math.max(1, user.level - 1), xp: Math.max(0, user.xp - 90), streak: 4, league: 'Silver' },
    { id: 'lb-5', name: 'PolyglotEcho #721', avatarId: '🗣️', grade: user.grade, level: Math.max(1, user.level - 1), xp: Math.max(0, user.xp - 140), streak: 3, league: 'Silver' },
    { id: 'lb-6', name: 'AtlasExplorer #504', avatarId: '🏹', grade: user.grade, level: Math.max(1, user.level - 2), xp: Math.max(0, user.xp - 220), streak: 2, league: 'Bronze' },
  ];

  // Sort by XP descending
  const sorted = [...baseUsers].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Weekly Scholar League</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
            Hall of Legends
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compete with students worldwide! Privacy is protected: all participants use anonymous gamertags.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Student Privacy Shield Active</span>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {sorted.slice(0, 3).map((item, index) => {
          const podiumRank = index + 1;
          const isGold = podiumRank === 1;
          const isSilver = podiumRank === 2;
          const isBronze = podiumRank === 3;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border text-center flex flex-col items-center justify-between relative transition-all ${
                isGold
                  ? 'bg-gradient-to-b from-[#2a2012] to-[#120f09] border-yellow-500/50 glow-gold/30 order-1 md:order-2 md:-translate-y-2'
                  : isSilver
                  ? 'bg-gradient-to-b from-[#1b2230] to-[#0c1018] border-slate-400/40 order-2 md:order-1'
                  : 'bg-gradient-to-b from-[#221614] to-[#0f0c0b] border-amber-700/40 order-3'
              } ${item.isCurrentUser ? 'ring-2 ring-purple-400' : ''}`}
            >
              {/* Crown or Medal */}
              <div className="mb-2">
                {isGold ? (
                  <span className="text-3xl animate-bounce inline-block">👑</span>
                ) : (
                  <span className="text-2xl">{isSilver ? '🥈' : '🥉'}</span>
                )}
              </div>

              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-lg mb-3">
                {item.avatarId}
              </div>

              <div>
                <p className={`text-sm font-black font-cinzel ${item.isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                  {item.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Lvl {item.level} • {item.grade}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-around text-xs font-bold">
                <span className="text-purple-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  {item.xp} XP
                </span>
                <span className="text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  {item.streak}d Streak
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Rankings Table */}
      <div className="p-5 rounded-3xl bg-slate-900/80 border border-purple-500/20 overflow-hidden shadow-xl">
        <h3 className="text-base font-bold text-white font-cinzel mb-4">League Standings</h3>

        <div className="divide-y divide-slate-800">
          {sorted.map((item, index) => {
            const rank = index + 1;
            return (
              <div
                key={item.id}
                className={`py-3 px-3 rounded-2xl flex items-center justify-between transition-colors ${
                  item.isCurrentUser
                    ? 'bg-purple-950/60 border border-purple-500/40 text-purple-200 glow-purple/20'
                    : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className={`w-7 text-center font-black font-display text-sm ${
                    rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                    #{rank}
                  </span>

                  <span className="text-2xl p-1 rounded-xl bg-slate-950 border border-slate-800">
                    {item.avatarId}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold ${item.isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                        {item.name}
                      </p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {item.league}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Level {item.level} • {item.grade}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-8 text-xs font-bold text-right">
                  <div className="hidden sm:block">
                    <p className="text-amber-300 flex items-center gap-1 justify-end">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      {item.streak} Days
                    </p>
                    <p className="text-[10px] text-slate-500 font-normal">Active Streak</p>
                  </div>

                  <div>
                    <p className="text-purple-300 font-display text-sm">{item.xp} XP</p>
                    <p className="text-[10px] text-slate-500 font-normal">Total Earned</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
