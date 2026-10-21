import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { QuestsView } from './components/QuestsView';
import { SubjectsView } from './components/SubjectsView';
import { BossesView } from './components/BossesView';
import { QuestMap } from './components/QuestMap';
import { RewardsShop } from './components/RewardsShop';
import { Leaderboard } from './components/Leaderboard';
import { ProgressPage } from './components/ProgressPage';
import { OnboardingModal } from './components/OnboardingModal';
import { StreakChestModal } from './components/StreakChestModal';
import { QuizModal } from './components/QuizModal';
import { BossBattle } from './components/BossBattle';
import { LevelUpModal } from './components/LevelUpModal';

function MainApp() {
  const { 
    activeScreen, 
    activeQuizQuest, 
    closeQuizQuest, 
    activeBossBattle, 
    closeBossBattle 
  } = useGame();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const onboarded = localStorage.getItem('studyquest_onboarded_v2');
      return !onboarded;
    }
    return false;
  });

  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('studyquest_onboarded_v2', 'true');
    }
  };

  return (
    <div className="min-h-screen bg-[#080c16] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar 
        onOpenProfile={() => setIsOnboardingOpen(true)}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-6">
        
        {/* Desktop / Tablet Sidebar */}
        <Sidebar onOpenStreakModal={() => setIsStreakModalOpen(true)} />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {activeScreen === 'dashboard' && (
            <Dashboard 
              onOpenProfile={() => setIsOnboardingOpen(true)} 
              onOpenStreakModal={() => setIsStreakModalOpen(true)}
            />
          )}
          {activeScreen === 'quests' && <QuestsView />}
          {activeScreen === 'subjects' && <SubjectsView />}
          {activeScreen === 'bosses' && <BossesView />}
          {activeScreen === 'map' && <QuestMap />}
          {activeScreen === 'shop' && <RewardsShop />}
          {activeScreen === 'leaderboard' && <Leaderboard />}
          {activeScreen === 'progress' && <ProgressPage />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
      />

      <StreakChestModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />

      {activeQuizQuest && (
        <QuizModal
          questId={activeQuizQuest.questId}
          title={activeQuizQuest.title}
          questions={activeQuizQuest.questions}
          xpReward={activeQuizQuest.xpReward}
          coinReward={activeQuizQuest.coinReward}
          onClose={closeQuizQuest}
        />
      )}

      {activeBossBattle && (
        <BossBattle
          boss={activeBossBattle}
          onClose={closeBossBattle}
        />
      )}

      <LevelUpModal />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
