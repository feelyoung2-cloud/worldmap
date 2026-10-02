import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../data/atlasData';

interface HomeViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenTeacherDashboard: () => void;
  onStartLocationQuiz: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onOpenTeacherDashboard,
  onStartLocationQuiz
}) => {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleStartTodayMission = () => {
    soundEffects.playSuccess();
    setToastMessage('아시아 탐험 지도로 이동합니다! 🚀');
    setTimeout(() => {
      onNavigateTab('world-map');
    }, 800);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full px-4 py-4 space-y-5 max-w-2xl mx-auto">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-white px-5 py-3 rounded-full shadow-xl font-bold text-[14px] flex items-center gap-2 z-50 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#86f2e4]">rocket</span>
          {toastMessage}
        </div>
      )}

      {/* Explorer Welcome Banner */}
      <div className="flex items-center justify-between bg-[#f2f3ff] rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#cce5ff] text-[#006194] shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">explore</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a61] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#006a61]"></span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-extrabold text-[#006194] tracking-wider uppercase">LEVEL 4 공인 탐험가</span>
            <h1 className="text-[18px] font-bold text-[#131b2e] truncate">지우 탐험가님, 환영해요! 🧭</h1>
            <p className="text-[13px] text-[#3f4850] truncate">오늘은 어느 나라로 모험을 떠나볼까요?</p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 pl-2">
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-xs border border-[#eaedff]">
            <span className="material-symbols-outlined text-[#825100] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-[13px] text-[#825100] font-bold">18성</span>
          </div>
          <span className="text-[10px] text-[#707881] mt-1 font-semibold">연속 출석 5일차</span>
        </div>
      </div>

      {/* Today's Highlight Mission Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-[#eaedff]">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#93ccff]/15 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/40 text-[#005049] text-[12px] font-bold">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">local_fire_department</span>
            오늘의 탐험 미션
          </span>
          <span className="text-[11px] font-bold text-[#707881] tracking-wider uppercase">GRADE 6 ATLAS</span>
        </div>

        <h2 className="text-[24px] font-extrabold text-[#131b2e] mb-2 leading-tight">
          아시아의 주요 국가와 국기 찾기
        </h2>
        <p className="text-[15px] text-[#3f4850] mb-4 leading-relaxed">
          동아시아와 서남아시아의 위치를 확인하고, 랜드마크와 국기 스티커를 완성하세요!
        </p>

        {/* Meta Information Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#3f4850] text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#006194]">schedule</span>
            <span>예상 학습: <strong className="text-[#131b2e] font-bold">10분</strong></span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#3f4850] text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#006a61]">flag</span>
            <span>목표: <strong className="text-[#131b2e] font-bold">국가 5개 찾기</strong></span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#3f4850] text-[13px]">
            <span className="material-symbols-outlined text-[18px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span>보상: <strong className="text-[#131b2e] font-bold">+120 EXP</strong></span>
          </div>
        </div>

        {/* Start Action Button */}
        <button
          type="button"
          onClick={handleStartTodayMission}
          className="w-full h-14 rounded-full bg-[#006194] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
          <span>탐험 시작하기</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Expedition Step Roadmap Gauge */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">map</span>
            <span className="text-[17px] font-bold text-[#131b2e]">탐험 단계 로드맵</span>
          </div>
          <span className="text-[13px] text-[#006194] font-bold">3단계 진행 중 (60%)</span>
        </div>

        {/* 5-Step Step-by-Step Interactive Path */}
        <div className="grid grid-cols-5 gap-1 pt-1">
          {/* Step 1: Completed */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onNavigateTab('world-map');
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </div>
            <span className="text-[11px] font-bold text-[#131b2e] mt-1.5 text-center">1단계</span>
            <span className="text-[11px] text-[#707881] text-center truncate w-full">대륙찾기</span>
          </button>

          {/* Step 2: Completed */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onNavigateTab('world-map');
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </div>
            <span className="text-[11px] font-bold text-[#131b2e] mt-1.5 text-center">2단계</span>
            <span className="text-[11px] text-[#707881] text-center truncate w-full">오대양탐험</span>
          </button>

          {/* Step 3: Current Active */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playChime();
              onNavigateTab('world-map');
            }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-md animate-pulse group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">flag</span>
            </div>
            <span className="text-[11px] font-bold text-[#006194] mt-1.5 text-center">3단계</span>
            <span className="text-[11px] font-bold text-[#006194] text-center truncate w-full">주요국가</span>
          </button>

          {/* Step 4: Upcoming */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onNavigateTab('quiz-challenge');
            }}
            className="flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#e2e7ff] text-[#3f4850] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">sports_esports</span>
            </div>
            <span className="text-[11px] font-bold text-[#3f4850] mt-1.5 text-center">4단계</span>
            <span className="text-[11px] text-[#707881] text-center truncate w-full">수도퀴즈</span>
          </button>

          {/* Step 5: Upcoming */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onNavigateTab('landmarks');
            }}
            className="flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#e2e7ff] text-[#3f4850] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">terrain</span>
            </div>
            <span className="text-[11px] font-bold text-[#3f4850] mt-1.5 text-center">5단계</span>
            <span className="text-[11px] text-[#707881] text-center truncate w-full">지형지명</span>
          </button>
        </div>
      </div>

      {/* Learning Module Cards Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold text-[#131b2e]">모험 코스 바로가기</span>
          <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#006194] text-[11px] font-bold">5개 코스</span>
        </div>
        <span className="text-[13px] text-[#707881]">터치하여 학습</span>
      </div>

      {/* Learning Module Cards List */}
      <div className="space-y-3">
        {/* Card 1: 세계 지도 */}
        <div
          onClick={() => {
            soundEffects.playPop();
            onNavigateTab('world-map');
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <span className="material-symbols-outlined text-[28px]">public</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#131b2e]">세계 지도</h3>
                  <span className="px-2 py-0.5 rounded bg-[#93ccff]/30 text-[#004b73] text-[11px] font-bold">기초 탄탄</span>
                </div>
                <p className="text-[13px] text-[#3f4850] line-clamp-2 mt-0.5">
                  7대륙과 5대양을 터치하고 확대·축소하며 세계를 생생하게 탐험해요!
                </p>
              </div>
            </div>
            {/* Stars: 3/3 */}
            <div className="flex items-center text-[#825100] shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-[#3f4850]">탐험 완료율</span>
              <span className="text-[#006194]">80%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
              <div className="h-full rounded-full bg-[#006194] transition-all duration-500" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: 국기 퀴즈 */}
        <div
          onClick={() => {
            soundEffects.playPop();
            onNavigateTab('quiz-challenge');
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#89f5e7]/50 flex items-center justify-center text-[#006a61] shrink-0">
                <span className="material-symbols-outlined text-[28px]">sports_esports</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#131b2e]">국기 퀴즈</h3>
                  <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[11px] font-bold">도전문</span>
                </div>
                <p className="text-[13px] text-[#3f4850] line-clamp-2 mt-0.5">
                  국기를 보고 알맞은 국가명을 연결하고 카드 짝을 맞춰보세요!
                </p>
              </div>
            </div>
            {/* Stars: 2/3 */}
            <div className="flex items-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px] text-[#bfc7d2]">star</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-[#3f4850]">탐험 완료율</span>
              <span className="text-[#006a61]">60%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
              <div className="h-full rounded-full bg-[#006a61] transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: 국가 찾기 */}
        <div
          onClick={() => {
            soundEffects.playPop();
            onStartLocationQuiz();
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#825100] shrink-0">
                <span className="material-symbols-outlined text-[28px]">search_check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#131b2e]">국가 찾기</h3>
                  <span className="px-2 py-0.5 rounded bg-[#ffb95f]/40 text-[#653e00] text-[11px] font-bold">지도 터치</span>
                </div>
                <p className="text-[13px] text-[#3f4850] line-clamp-2 mt-0.5">
                  미션으로 제시된 국가를 세계 지도에서 직접 터치해 찾아보세요!
                </p>
              </div>
            </div>
            {/* Stars: 2/3 */}
            <div className="flex items-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px] text-[#bfc7d2]">star</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-[#3f4850]">탐험 완료율</span>
              <span className="text-[#825100]">45%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
              <div className="h-full rounded-full bg-[#825100] transition-all duration-500" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 4: 지명 탐험 */}
        <div
          onClick={() => {
            soundEffects.playPop();
            onNavigateTab('landmarks');
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#006194] shrink-0">
                <span className="material-symbols-outlined text-[28px]">terrain</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#131b2e]">지명 탐험</h3>
                  <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#3f4850] text-[11px] font-bold">지형지물</span>
                </div>
                <p className="text-[13px] text-[#3f4850] line-clamp-2 mt-0.5">
                  히말라야산맥, 나일강, 사하라사막 등 대표 지형과 도시를 발견해요!
                </p>
              </div>
            </div>
            {/* Stars: 1/3 */}
            <div className="flex items-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#825100]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px] text-[#bfc7d2]">star</span>
              <span className="material-symbols-outlined text-[20px] text-[#bfc7d2]">star</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-[#3f4850]">탐험 완료율</span>
              <span className="text-[#006194]">30%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
              <div className="h-full rounded-full bg-[#006194] transition-all duration-500" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 5: 나의 도감 & 성장 */}
        <div
          onClick={() => {
            soundEffects.playPop();
            onNavigateTab('my-atlas');
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-3 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#6bd8cb]/30 flex items-center justify-center text-[#006a61] shrink-0">
                <span className="material-symbols-outlined text-[28px]">menu_book</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-[#131b2e]">나의 도감 &amp; 성장</h3>
                  <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[11px] font-bold">수집 공간</span>
                </div>
                <p className="text-[13px] text-[#3f4850] line-clamp-2 mt-0.5">
                  학습 완료한 국가 28개 수집 완료! 나만의 세계 도감을 채워보세요.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#f2f3ff] px-2.5 py-1 rounded-full text-[#006a61] text-[12px] font-bold shrink-0">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              배지 4개
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-[#3f4850]">도감 수집 현황</span>
              <span className="text-[#006a61]">28 / 50개 (56%)</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#eaedff] overflow-hidden">
              <div className="h-full rounded-full bg-[#006a61] transition-all duration-500" style={{ width: '56%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility & Teacher Mode Footer Card */}
      <div className="rounded-2xl bg-[#e2e7ff] p-4 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#3f4850]">
            <span className="material-symbols-outlined text-[20px] text-[#006194]">text_fields</span>
            <span className="text-[13px] font-bold text-[#131b2e]">시각 지원 안내</span>
          </div>
          <span className="text-[13px] text-[#707881]">상단 [가+] 버튼으로 큰 글자 조절 가능</span>
        </div>

        {/* Teacher Dashboard Switch Button */}
        <button
          type="button"
          onClick={() => {
            soundEffects.playChime();
            onOpenTeacherDashboard();
          }}
          className="h-12 w-full rounded-xl bg-white text-[#131b2e] text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#f2f3ff] active:scale-[0.99] transition-all cursor-pointer border border-[#eaedff]"
        >
          <span className="material-symbols-outlined text-[#006194] text-[20px]">school</span>
          <span>선생님 전용 학습 관리 대시보드 보기</span>
          <span className="material-symbols-outlined text-[16px] text-[#707881]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
