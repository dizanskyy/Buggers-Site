import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

import { DashboardView } from './views/DashboardView';
import { TracksCatalogView } from './views/TracksCatalogView';
import { TrackDetailView } from './views/TrackDetailView';
import { LessonView } from './views/LessonView';
import { SandboxView } from './views/SandboxView';
import { ProfileStatsView } from './views/ProfileStatsView';
import { LeaderboardView } from './views/LeaderboardView';

export const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
      case 'catalog':
        return <TracksCatalogView setActiveTab={setActiveTab} />;
      case 'track-detail':
        return <TrackDetailView setActiveTab={setActiveTab} onOpenWizard={() => setIsOnboardingOpen(true)} />;
      case 'lesson':
        return <LessonView setActiveTab={setActiveTab} />;
      case 'sandbox':
        return <SandboxView />;
      case 'stats':
        return <ProfileStatsView onOpenWizard={() => setIsOnboardingOpen(true)} />;
      case 'leaderboard':
        return <LeaderboardView />;
      default:
        return <DashboardView setActiveTab={setActiveTab} onOpenOnboarding={() => setIsOnboardingOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0c] text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0c]">
        {/* Topbar */}
        <Topbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic View Scrollable Container */}
        <main className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
          {renderView()}
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveTab={setActiveTab}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessRegister={() => setIsOnboardingOpen(true)}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinished={() => setActiveTab('track-detail')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <MainLayout />
      </LearningProvider>
    </AuthProvider>
  );
}
