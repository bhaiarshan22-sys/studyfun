import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { WORLDS, QUEST_NODES } from '../data/worlds';
import { BOSS_BATTLES } from '../data/bosses';
import { getFilteredQuestions } from '../data/questionBank';
import { QuestNode, World } from '../types/game';
import { soundManager } from '../utils/sound';
import { 
  Lock, 
  Check, 
  Star, 
  Swords, 
  Sparkles, 
  Coins, 
  Play, 
  Compass,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const QuestMap: React.FC = () => {
  const { user, startQuest, startBossBattle } = useGame();

  const [selectedWorldId, setSelectedWorldId] = useState<string>(user.unlockedWorlds[0] || 'world-math');
  const [selectedNode, setSelectedNode] = useState<QuestNode | null>(null);

  const activeWorld = WORLDS.find(w => w.id === selectedWorldId) || WORLDS[0];
  const worldNodes = QUEST_NODES.filter(n => n.worldId === selectedWorldId);

  const isWorldUnlocked = (world: World) => {
    return user.unlockedWorlds.includes(world.id) || user.level >= world.requiredLevel;
  };

  const isNodeUnlocked = (node: QuestNode) => {
    if (!isWorldUnlocked(activeWorld)) return false;
    if (!node.prerequisiteNodeId) return true;
    return user.completedQuestIds.includes(node.prerequisiteNodeId);
  };

  const handleNodeClick = (node: QuestNode) => {
    soundManager.playClick();
    setSelectedNode(node);
  };

  const handleLaunchQuest = (node: QuestNode) => {
    if (node.isBossLair && node.bossId) {
      const boss = BOSS_BATTLES.find(b => b.id === node.bossId);
      if (boss) {
        startBossBattle(boss);
      }
    } else {
      // Fetch or generate questions tailored to user's grade
      const questions = getFilteredQuestions(node.subject, user.grade, node.difficulty);
      startQuest(node.id, node.title, questions.slice(0, node.questionsCount), node.xpReward, node.coinReward);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* World Selector Header Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {WORLDS.map(world => {
          const unlocked = isWorldUnlocked(world);
          const isSelected = selectedWorldId === world.id;

          return (
            <button
              key={world.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedWorldId(world.id);
                setSelectedNode(null);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'border-purple-400 bg-purple-950/70 text-white glow-purple'
                  : unlocked
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  : 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-60'
              }`}
            >
              <span className="text-xl">{world.icon}</span>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight truncate">{world.title}</p>
                <p className="text-[10px] text-purple-300/80">
                  {unlocked ? 'Unlocked Realm' : `Requires Lvl ${world.requiredLevel}`}
                </p>
              </div>
              {!unlocked && <Lock className="w-3.5 h-3.5 text-slate-500 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* World Visual Card & Info */}
      <div className={`relative rounded-3xl p-6 bg-gradient-to-r ${activeWorld.bgGradient} border border-purple-500/30 overflow-hidden shadow-2xl`}>
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Realm Exploration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
            {activeWorld.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200/90 mt-1 leading-relaxed">
            {activeWorld.description}
          </p>
        </div>

        {/* Floating background fantasy icon */}
        <div className="absolute -right-6 -bottom-8 text-8xl opacity-15 pointer-events-none select-none">
          {activeWorld.icon}
        </div>
      </div>

      {/* Interactive Map Canvas Grid */}
      <div className="relative min-h-[460px] rounded-3xl bg-[#090d18] border border-purple-500/25 p-6 overflow-hidden shadow-2xl">
        
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* SVG Path connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {worldNodes.map(node => {
            if (!node.prerequisiteNodeId) return null;
            const parent = worldNodes.find(n => n.id === node.prerequisiteNodeId);
            if (!parent) return null;
            return (
              <line
                key={`line-${node.id}`}
                x1={`${parent.x}%`}
                y1={`${parent.y}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Quest Nodes */}
        <div className="relative z-10 w-full h-full min-h-[400px]">
          {worldNodes.map(node => {
            const unlocked = isNodeUnlocked(node);
            const isCompleted = user.completedQuestIds.includes(node.id);
            const stars = user.questStars[node.id] || 0;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => handleNodeClick(node)}
                  className={`relative group p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'scale-125 border-yellow-400 bg-purple-900/90 glow-gold z-30'
                      : node.isBossLair
                      ? 'border-red-500 bg-red-950/80 hover:scale-110 glow-red animate-pulse'
                      : isCompleted
                      ? 'border-emerald-500 bg-emerald-950/80 hover:scale-110 glow-blue'
                      : unlocked
                      ? 'border-purple-400 bg-purple-950/80 hover:scale-110 glow-purple'
                      : 'border-slate-800 bg-slate-900/60 opacity-40 cursor-not-allowed'
                  }`}
                >
                  {node.isBossLair ? (
                    <Swords className="w-6 h-6 text-red-400" />
                  ) : isCompleted ? (
                    <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
                  ) : unlocked ? (
                    <Sparkles className="w-5 h-5 text-purple-300" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}

                  {/* Stars Badge if completed */}
                  {isCompleted && stars > 0 && (
                    <div className="absolute -bottom-2 flex items-center gap-0.5 bg-black/80 px-1 py-0.5 rounded-full border border-yellow-500/40">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className={`w-2 h-2 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Node Title Tooltip */}
                  <div className="absolute -top-7 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-slate-700/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {node.title}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#141b2e] to-[#0c101c] border border-purple-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                selectedNode.isBossLair ? 'bg-red-950 text-red-300 border border-red-500/50' : 'bg-purple-950 text-purple-300 border border-purple-500/30'
              }`}>
                {selectedNode.isBossLair ? 'Boss Lair' : `${selectedNode.difficulty} Quest`}
              </span>
              <span className="text-xs text-slate-400">• Grade: {user.grade}</span>
            </div>
            <h3 className="text-lg font-bold text-white font-cinzel">{selectedNode.title}</h3>
            <p className="text-xs text-slate-300 max-w-xl">{selectedNode.description}</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-purple-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                +{selectedNode.xpReward} XP
              </span>
              <span className="text-yellow-300 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-yellow-400" />
                +{selectedNode.coinReward}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleLaunchQuest(selectedNode)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition-all ${
                selectedNode.isBossLair
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 glow-red'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 glow-purple'
              }`}
            >
              <span>{selectedNode.isBossLair ? 'Confront Boss' : 'Start Quest'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
