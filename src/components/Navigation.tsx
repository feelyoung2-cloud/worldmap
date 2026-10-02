import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../data/atlasData';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: '오늘탐험', icon: 'rocket_launch' },
    { id: 'world-map', label: '세계지도', icon: 'public' },
    { id: 'quiz-challenge', label: '퀴즈연결', icon: 'sports_esports' },
    { id: 'landmarks', label: '지명탐험', icon: 'location_city' },
    { id: 'my-atlas', label: '나의도감', icon: 'menu_book' }
  ];

  return (
    <nav 
      aria-label="주요 탐험 메뉴" 
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2 pb-[env(safe-area-inset-bottom,0px)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                onSelectTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center min-w-[58px] h-14 px-2.5 transition-all duration-200 touch-manipulation select-none ${
                isActive
                  ? 'text-[#006194] bg-[#e2e7ff] rounded-full font-bold shadow-sm scale-100'
                  : 'text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-full active:scale-95'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span 
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[12px] font-bold mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
