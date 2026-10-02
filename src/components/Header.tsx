import React from 'react';
import { AVATAR_IMG, soundEffects, speakKoreanText } from '../data/atlasData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  soundOn: boolean;
  onToggleSound: () => void;
  fontScale: 'normal' | 'large' | 'huge';
  onCycleFontScale: () => void;
  onOpenPassport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  soundOn,
  onToggleSound,
  fontScale,
  onCycleFontScale,
  onOpenPassport
}) => {
  const handleReadCurrentView = () => {
    soundEffects.playPop();
    let text = '세계지도 탐험대, 초등학교 6학년 아틀라스에 오신 것을 환영합니다!';
    if (currentTab === 'home') {
      text = '오늘의 탐험 미션: 아시아의 주요 국가와 국기 찾기. 7대륙과 5대양을 탐험해 보세요!';
    } else if (currentTab === 'world-map') {
      text = '대륙과 대양 탐험 지도입니다. 5대양 버튼과 대륙 필터를 눌러 전 세계를 탐험하세요!';
    } else if (currentTab === 'quiz-challenge') {
      text = '국기 퀴즈와 국가 위치 찾기 챌린지입니다. 왼쪽 국기를 오른쪽 국가명과 연결해 보세요!';
    } else if (currentTab === 'landmarks') {
      text = '세계의 대표 지형과 랜드마크 탐험입니다. 사하라사막, 히말라야산맥, 나일강을 발견해 보세요!';
    } else if (currentTab === 'my-atlas') {
      text = '나의 국가 도감과 성장 기록입니다. 지금까지 수집한 28개국과 탐험 배지를 확인하세요!';
    }
    speakKoreanText(text);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Logo & Grade Marker */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none group"
          onClick={() => {
            soundEffects.playChime();
          }}
          title="세계지도 탐험대 홈으로"
        >
          <div className="w-10 h-10 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">explore</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-[20px] text-[#006194] tracking-tight">세계지도</span>
              <span className="font-extrabold text-[20px] text-[#825100] tracking-tight">탐험대</span>
            </div>
            <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider leading-none">GRADE 6 ATLAS</span>
          </div>
        </div>

        {/* Global Action Utility Buttons */}
        <div className="flex items-center gap-1">
          {/* Sound Effect Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleSound();
              if (!soundOn) {
                soundEffects.playPop();
              }
            }}
            aria-label={soundOn ? "음향 효과 끄기" : "음향 효과 켜기"}
            title={soundOn ? "음향 효과 켜짐" : "음향 효과 꺼짐"}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] active:scale-95 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {soundOn ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* TTS Screen Reader */}
          <button
            type="button"
            onClick={handleReadCurrentView}
            aria-label="화면 내용 음성으로 듣기"
            title="본문 읽어주기 TTS"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] active:scale-95 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
          </button>

          {/* Font Size Adjuster Button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onCycleFontScale();
            }}
            aria-label="글자 크기 조절"
            title={`글자 크기: ${fontScale === 'normal' ? '기본 (100%)' : fontScale === 'large' ? '크게 (115%)' : '아주 크게 (130%)'}`}
            className="h-10 px-2.5 rounded-full flex items-center justify-center gap-0.5 text-[#006194] bg-[#cce5ff]/40 hover:bg-[#cce5ff] active:scale-95 transition-colors"
          >
            <span className="text-[14px] font-extrabold">가</span>
            <span className="material-symbols-outlined text-[15px]">
              {fontScale === 'normal' ? 'add' : fontScale === 'large' ? 'expand_less' : 'restart_alt'}
            </span>
          </button>

          {/* User Profile Avatar with Online Badge */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playChime();
              onOpenPassport();
            }}
            title="지우 탐험가 여권 및 프로필"
            className="flex items-center ml-1.5 focus:outline-none focus:ring-2 focus:ring-[#006194] rounded-full relative group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#006194]/30 shadow-sm group-hover:ring-[#006194] transition-all">
              <img
                src={AVATAR_IMG}
                alt="지우 탐험가 프로필"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#006a61] border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
