import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { SubjectId, Difficulty, LanguageSubtype } from '../types/game';
import { getFilteredQuestions, generateCurriculumQuestions } from '../data/questionBank';
import { generateQuestFromTopic } from '../services/geminiQuestService';
import { soundManager } from '../utils/sound';
import { 
  BookOpen, 
  Sparkles, 
  Coins, 
  Play, 
  Layers, 
  PenTool, 
  Check, 
  Flame, 
  Loader2,
  FileText
} from 'lucide-react';

export const SubjectsView: React.FC = () => {
  const { user, startQuest } = useGame();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('math');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageSubtype>('Portuguese');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [customTopic, setCustomTopic] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐', desc: 'Arithmetic, Algebra, Geometry, Calculus', color: 'from-blue-500/20 to-sky-600/30' },
    { id: 'science', name: 'Science', icon: '🧪', desc: 'Biology, Physics, Chemistry, Astronomy', color: 'from-emerald-500/20 to-teal-600/30' },
    { id: 'languages', name: 'Languages', icon: '🗣️', desc: 'Portuguese, Spanish, French, German, Japanese', color: 'from-purple-500/20 to-fuchsia-600/30' },
    { id: 'geography', name: 'Geography', icon: '🗺️', desc: 'Continents, Oceans, Capitals, Tectonics', color: 'from-amber-500/20 to-orange-600/30' },
    { id: 'history', name: 'History', icon: '🏛️', desc: 'Ancient Eras, Discoveries, World Wars', color: 'from-orange-500/20 to-rose-600/30' },
    { id: 'english', name: 'English', icon: '📖', desc: 'Grammar, Phonics, Rhetoric, Literature', color: 'from-indigo-500/20 to-violet-600/30' },
  ] as const;

  const quickTopics: Record<SubjectId, string[]> = {
    math: ['Basic Arithmetic', 'Multiplication & Tables', 'Fractions & Ratios', 'Algebra & Linear Equations', 'Geometry & Angles'],
    science: ['Ecosystems & Plants', 'States of Matter', 'Cell Biology & Organelles', 'Forces & Newton’s Laws', 'Periodic Elements'],
    languages: ['Portuguese: Greetings & Olá', 'Portuguese: Essential Food & Water', 'Portuguese: Verbs & Ser/Estar', 'Spanish Basics', 'French & German Greetings'],
    geography: ['Continents & Oceans', 'World Capitals', 'Plate Tectonics & Ring of Fire', 'Rivers & Mountains', 'Global Climates'],
    history: ['Ancient Egypt & Nile', 'Gutenberg & Renaissance', 'Age of Exploration (Vasco da Gama)', 'Medieval Castles', 'Modern Space Race'],
    english: ['Parts of Speech', 'Figurative Language & Metaphors', 'Spelling & Phonics', 'Sentence Syntax & Semicolons', 'Reading Comprehension']
  };

  const handleStartQuickQuest = (topic: string) => {
    soundManager.playClick();
    const questions = generateCurriculumQuestions(
      selectedSubject,
      topic,
      user.grade,
      difficulty,
      5
    );
    startQuest(`quick-${selectedSubject}-${Date.now()}`, `${topic} (${user.grade})`, questions, 75, 60);
  };

  const handleGenerateCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;

    soundManager.playClick();
    setIsGenerating(true);

    try {
      const questions = await generateQuestFromTopic({
        subject: selectedSubject,
        topic: customTopic.trim(),
        notes: customNotes.trim() || undefined,
        grade: user.grade,
        difficulty,
        questionCount: 5
      });

      startQuest(
        `custom-${Date.now()}`,
        `Custom Quest: ${customTopic.trim()}`,
        questions,
        90,
        75
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
          Subjects & Quest Forge
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select a subject, pick your grade difficulty, or forge an AI-powered quest from your own class notes!
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {subjects.map(s => {
          const isSelected = selectedSubject === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedSubject(s.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-400 bg-purple-950/80 glow-purple scale-102 ring-1 ring-purple-400/50'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />}
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{s.name}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* If Languages selected, show language selector */}
      {selectedSubject === 'languages' && (
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 mr-2">
            Target Language:
          </span>
          {(['Portuguese', 'Spanish', 'French', 'German', 'Japanese'] as LanguageSubtype[]).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedLanguage(lang);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-purple-600 text-white shadow glow-purple'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lang === 'Portuguese' ? '🇧🇷/🇵🇹 Portuguese' : lang === 'Spanish' ? '🇪🇸 Spanish' : lang === 'French' ? '🇫🇷 French' : lang === 'German' ? '🇩🇪 German' : '🇯🇵 Japanese'}
            </button>
          ))}
        </div>
      )}

      {/* Difficulty & Grade Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-purple-500/20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Difficulty:
          </span>
          {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
            <button
              key={d}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setDifficulty(d);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                difficulty === d
                  ? d === 'Easy'
                    ? 'bg-emerald-600 text-white shadow'
                    : d === 'Medium'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-red-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Target Grade:</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/30 text-purple-300 font-bold">
            {user.grade}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Quick Topics List */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold text-white font-cinzel">Curriculum Topics</h3>
            </div>
            <span className="text-[11px] text-purple-300">Grade {user.grade}</span>
          </div>

          <div className="space-y-2.5">
            {quickTopics[selectedSubject].map((topic, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/50 hover:bg-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors">
                    {topic}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    5 Questions • {difficulty} • +75 XP
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartQuickQuest(topic)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold shadow transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Forge Quest from Custom Notes / Topics */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#161c33] to-[#0c101c] border border-cyan-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white font-cinzel">Study from Your Notes</h3>
              <p className="text-[11px] text-cyan-300/80">Turn any class notes or textbook topic into a quest</p>
            </div>
          </div>

          <form onSubmit={handleGenerateCustom} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Enter Quest Topic:
              </label>
              <input
                type="text"
                required
                value={customTopic}
                onChange={e => setCustomTopic(e.target.value)}
                placeholder="e.g. Portuguese Food Vocabulary, Photosynthesis, Quadratic Formula..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Paste Class Notes (Optional):
              </label>
              <textarea
                rows={3}
                value={customNotes}
                onChange={e => setCustomNotes(e.target.value)}
                placeholder="Paste key formulas, terms, or paragraph notes from your teacher..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-white outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !customTopic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg glow-blue transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Quest for {user.grade}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Forge Custom Quest (5 Questions)</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
