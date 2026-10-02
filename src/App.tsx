import { useState, useEffect } from 'react';
import { TabType, CountryData, LandmarkItem } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { WorldMapView } from './components/WorldMapView';
import { QuizMatchingView } from './components/QuizMatchingView';
import { LandmarksView } from './components/LandmarksView';
import { MyAtlasView } from './components/MyAtlasView';
import { CountryDetailModal } from './components/CountryDetailModal';
import { LandmarkModal } from './components/LandmarkModal';
import { TeacherDashboardModal } from './components/TeacherDashboardModal';
import { soundEffects, soundPlayer, COUNTRIES_DATA } from './data/atlasData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('world-map');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [userExp, setUserExp] = useState<number>(760);
  const [savedCountryIds, setSavedCountryIds] = useState<Set<string>>(
    new Set(['korea', 'brazil', 'france', 'egypt'])
  );

  // Modals
  const [selectedCountryModal, setSelectedCountryModal] = useState<CountryData | null>(null);
  const [selectedLandmarkModal, setSelectedLandmarkModal] = useState<LandmarkItem | null>(null);
  const [teacherDashboardOpen, setTeacherDashboardOpen] = useState<boolean>(false);
  const [quizInitialMode, setQuizInitialMode] = useState<'matching' | 'location'>('matching');
  const [expNotice, setExpNotice] = useState<string | null>(null);

  // Sync font size to HTML body
  useEffect(() => {
    if (fontSize === 'large') {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.remove('text-lg');
    }
  }, [fontSize]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundPlayer.setMuted(!next);
    if (next) {
      soundEffects.playPop();
    }
  };

  const handleToggleFontSize = () => {
    soundEffects.playPop();
    setFontSize(prev => (prev === 'normal' ? 'large' : 'normal'));
  };

  const handleSaveToAtlas = (countryId: string) => {
    setSavedCountryIds(prev => {
      const next = new Set(prev);
      if (next.has(countryId)) {
        next.delete(countryId);
      } else {
        next.add(countryId);
      }
      return next;
    });
  };

  const handleEarnExp = (amount: number) => {
    setUserExp(prev => prev + amount);
    setExpNotice(`+${amount} EXP 획득! 🌟`);
    setTimeout(() => {
      setExpNotice(null);
    }, 2400);
  };

  const handleStartLocationQuiz = () => {
    setQuizInitialMode('location');
    setActiveTab('quiz-challenge');
  };

  const handleStartLandmarkQuiz = (_landmarkName: string) => {
    setQuizInitialMode('location');
    setActiveTab('quiz-challenge');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#131b2e] flex flex-col font-sans antialiased selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        fontSize={fontSize}
        onToggleFontSize={handleToggleFontSize}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => setActiveTab('my-atlas')}
        onOpenTeacherDashboard={() => setTeacherDashboardOpen(true)}
      />

      {/* Floating EXP Celebration Toast */}
      {expNotice && (
        <div className="fixed top-20 right-4 z-50 bg-[#006a61] text-white px-4 py-2.5 rounded-full shadow-lg font-extrabold text-[13px] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">stars</span>
          <span>{expNotice}</span>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="flex-1 w-full pt-16 pb-24 flex flex-col">
        {activeTab === 'home' && (
          <HomeView
            onNavigateTab={setActiveTab}
            onOpenTeacherDashboard={() => setTeacherDashboardOpen(true)}
            onStartLocationQuiz={handleStartLocationQuiz}
          />
        )}

        {activeTab === 'world-map' && (
          <WorldMapView
            onOpenCountryDetail={(country) => setSelectedCountryModal(country)}
            onSaveToAtlas={handleSaveToAtlas}
            savedCountryIds={savedCountryIds}
          />
        )}

        {activeTab === 'quiz-challenge' && (
          <QuizMatchingView
            key={quizInitialMode}
            initialMode={quizInitialMode}
            onEarnExp={handleEarnExp}
          />
        )}

        {activeTab === 'landmarks' && (
          <LandmarksView
            onOpenLandmarkModal={(lm) => setSelectedLandmarkModal(lm)}
            onStartLandmarkQuiz={handleStartLandmarkQuiz}
          />
        )}

        {activeTab === 'my-atlas' && (
          <MyAtlasView
            onOpenCountryDetail={(country) => setSelectedCountryModal(country)}
            savedCountryIds={savedCountryIds}
          />
        )}
      </main>

      {/* Bottom 5-Tab Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'quiz-challenge') {
            setQuizInitialMode('matching');
          }
          setActiveTab(tab);
        }}
      />

      {/* Modals */}
      {selectedCountryModal && (
        <CountryDetailModal
          country={selectedCountryModal}
          onClose={() => setSelectedCountryModal(null)}
          onSaveToAtlas={handleSaveToAtlas}
          isSaved={savedCountryIds.has(selectedCountryModal.id)}
        />
      )}

      {selectedLandmarkModal && (
        <LandmarkModal
          landmark={selectedLandmarkModal}
          onClose={() => setSelectedLandmarkModal(null)}
          onStartQuiz={(lmName) => {
            setSelectedLandmarkModal(null);
            handleStartLandmarkQuiz(lmName);
          }}
        />
      )}

      {teacherDashboardOpen && (
        <TeacherDashboardModal
          onClose={() => setTeacherDashboardOpen(false)}
        />
      )}
    </div>
  );
}
