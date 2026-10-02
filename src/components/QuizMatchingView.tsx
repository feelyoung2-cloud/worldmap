import React, { useState } from 'react';
import { MATCHING_QUIZZES, LOCATION_MISSION_EGYPT, soundEffects, speakKoreanText } from '../data/atlasData';
import confetti from 'canvas-confetti';

interface QuizMatchingViewProps {
  onEarnExp?: (xp: number) => void;
  initialMode?: 'matching' | 'location';
}

export const QuizMatchingView: React.FC<QuizMatchingViewProps> = ({
  onEarnExp,
  initialMode = 'matching'
}) => {
  const [activeMode, setActiveMode] = useState<'matching' | 'location'>(initialMode);

  // Matching Challenge State
  const quiz = MATCHING_QUIZZES[0];
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({
    'flag-brazil': 'brazil' // default matched per original design
  });
  const [wrongPairAlert, setWrongPairAlert] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [stageProgress] = useState<number>(60);

  // Location Quiz State
  const locMission = LOCATION_MISSION_EGYPT;
  const [clickedRegion, setClickedRegion] = useState<'egypt' | 'libya' | 'sudan' | 'saudi' | null>('egypt');
  const [locationSuccess, setLocationSuccess] = useState<boolean>(true);
  const [revealedHints, setRevealedHints] = useState<number[]>([1, 2, 3, 4]);

  // Matching Interaction Handler
  const handleFlagSelect = (flagId: string) => {
    soundEffects.playPop();
    setSelectedFlagId(flagId);
    setWrongPairAlert(false);
  };

  const handleCountrySelect = (countryId: string) => {
    if (!selectedFlagId) {
      soundEffects.playPop();
      return;
    }

    // Check if correct
    if (quiz.correctPairs[selectedFlagId] === countryId) {
      soundEffects.playSuccess();
      setMatchedPairs(prev => ({
        ...prev,
        [selectedFlagId]: countryId
      }));
      setSelectedFlagId(null);
      setWrongPairAlert(false);

      if (onEarnExp) onEarnExp(20);

      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    } else {
      soundEffects.playPop();
      setWrongPairAlert(true);
      setTimeout(() => setWrongPairAlert(false), 1500);
    }
  };

  const handleResetMatching = () => {
    soundEffects.playChime();
    setMatchedPairs({});
    setSelectedFlagId(null);
    setWrongPairAlert(false);
  };

  // Location Map Handlers
  const handleMapCountryClick = (regionId: 'egypt' | 'libya' | 'sudan' | 'saudi') => {
    setClickedRegion(regionId);
    if (regionId === 'egypt') {
      soundEffects.playSuccess();
      setLocationSuccess(true);
      if (onEarnExp) onEarnExp(30);
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    } else {
      soundEffects.playPop();
      setLocationSuccess(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-4 space-y-4 max-w-2xl mx-auto pb-10">
      {/* Mode Switcher Tabs */}
      <div className="flex p-1 rounded-full bg-[#eaedff] shadow-xs">
        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveMode('matching');
          }}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === 'matching'
              ? 'bg-[#006194] text-white shadow-sm'
              : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">sports_esports</span>
          <span>국기 짝 맞추기</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveMode('location');
          }}
          className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === 'location'
              ? 'bg-[#006194] text-white shadow-sm'
              : 'text-[#3f4850] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">search_check</span>
          <span>국가 위치 찾기 미션</span>
        </button>
      </div>

      {/* ===================== MODE 1: MATCHING CHALLENGE ===================== */}
      {activeMode === 'matching' && (
        <div className="space-y-4">
          {/* Progress Header */}
          <section className="flex flex-col gap-2.5 bg-[#f2f3ff] p-4 rounded-2xl shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-extrabold tracking-wide uppercase">
                  STAGE 03
                </span>
                <span className="text-[20px] font-extrabold text-[#006194]">{quiz.title}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dae2fd] text-[#3f4850] text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#825100]">timer_off</span>
                <span>시간 제한 없음</span>
              </div>
            </div>

            {/* 60% Animated Progress Bar */}
            <div className="relative w-full h-3 rounded-full bg-[#dae2fd] overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#006194] to-[#006a61] rounded-full transition-all duration-500"
                style={{ width: `${stageProgress}%` }}
              >
                <div className="w-full h-full opacity-40 bg-white animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-extrabold text-[#707881] uppercase tracking-wider">
                MATCHING CHALLENGE
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    speakKoreanText("왼쪽 국기를 오른쪽 알맞은 국가명으로 터치하여 짝을 맞춰보세요!");
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaedff] text-[#006194] text-[12px] font-bold hover:bg-[#dae2fd] active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  <span>문제 읽기</span>
                </button>
                <button
                  type="button"
                  onClick={() => soundEffects.playPop()}
                  className="p-1.5 rounded-full bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd] cursor-pointer"
                  title="배경음"
                >
                  <span className="material-symbols-outlined text-[18px]">music_note</span>
                </button>
              </div>
            </div>
          </section>

          {/* Instruction Badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#cce5ff]/50 text-[#131b2e] border border-[#93ccff]/40">
            <span className="material-symbols-outlined text-[#006194] text-[22px]">touch_app</span>
            <p className="text-[14px] font-bold tracking-tight text-[#131b2e]">
              왼쪽 국기를 선택하고 오른쪽 알맞은 국가명을 터치하여 짝을 맞춰보세요!
            </p>
          </div>

          {wrongPairAlert && (
            <div className="px-4 py-2 rounded-xl bg-[#ffdad6] text-[#93000a] text-[13px] font-bold flex items-center gap-2 animate-bounce">
              <span className="material-symbols-outlined text-[18px]">error</span>
              다시 한번 확인해 보세요! 국기와 국가명이 일치하지 않아요.
            </div>
          )}

          {/* Interactive Flag-to-Country Matching Play Field */}
          <div className="relative w-full py-1">
            {/* SVG Connector Line for Matched Pairs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="matchGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#006a61" />
                  <stop offset="50%" stopColor="#86f2e4" />
                  <stop offset="100%" stopColor="#006a61" />
                </linearGradient>
              </defs>
              {/* Brazil match line */}
              {matchedPairs['flag-brazil'] === 'brazil' && (
                <>
                  <path
                    d="M 140 46 C 180 46, 175 190, 215 190"
                    fill="none"
                    stroke="url(#matchGlow)"
                    strokeWidth="4"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <circle cx="140" cy="46" r="6" fill="#006a61" />
                  <circle cx="215" cy="190" r="6" fill="#006a61" />
                </>
              )}
            </svg>

            {/* Grid Columns: Left Flags / Right Country Names */}
            <div className="grid grid-cols-2 gap-4 relative z-0">
              {/* Left Column: Flags */}
              <div className="flex flex-col gap-3">
                {quiz.flags.map((flag) => {
                  const isMatched = !!matchedPairs[flag.id];
                  const isSelected = selectedFlagId === flag.id;

                  return (
                    <div
                      key={flag.id}
                      id={flag.id}
                      onClick={() => !isMatched && handleFlagSelect(flag.id)}
                      className={`relative flex items-center gap-3 p-3 rounded-xl shadow-xs select-none transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-[#86f2e4] text-[#005049] ring-2 ring-[#006a61]'
                          : isSelected
                          ? 'bg-[#cce5ff] text-[#001d31] ring-2 ring-[#006194] scale-[1.02]'
                          : 'bg-white text-[#131b2e] hover:bg-[#f2f3ff] border border-[#eaedff] active:scale-98'
                      }`}
                    >
                      <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-xs relative bg-white border border-[#eaedff]">
                        <img
                          src={flag.flagUrl}
                          alt={flag.alt}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={`text-[10px] font-extrabold uppercase ${isMatched ? 'text-[#005049]' : 'text-[#707881]'}`}>
                          {flag.flagNo}
                        </span>
                        <span className="text-[17px] font-bold leading-tight truncate">
                          {flag.name}
                        </span>
                      </div>
                      {isMatched ? (
                        <div className="w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                      ) : (
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${isSelected ? 'bg-[#006194]' : 'bg-[#dae2fd]'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Country Names with Pronunciation Speaker */}
              <div className="flex flex-col gap-3">
                {quiz.countries.map((c) => {
                  const isMatched = Object.values(matchedPairs).includes(c.id);

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleCountrySelect(c.id)}
                      className={`flex items-center justify-between p-3 h-[68px] rounded-xl shadow-xs select-none transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-[#86f2e4] text-[#005049] ring-2 ring-[#006a61]'
                          : 'bg-white text-[#131b2e] hover:bg-[#f2f3ff] border border-[#eaedff] active:scale-98'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isMatched && (
                          <span className="material-symbols-outlined text-[#006a61] text-[20px]">
                            task_alt
                          </span>
                        )}
                        <span className={`text-[17px] font-bold truncate ${isMatched ? 'text-[#005049]' : 'text-[#131b2e]'}`}>
                          {c.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.playPop();
                          speakKoreanText(c.pronounceText);
                        }}
                        aria-label={`${c.name} 발음 듣기`}
                        title="발음 듣기"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isMatched
                            ? 'bg-[#006a61] text-white shadow-xs'
                            : 'bg-[#eaedff] text-[#006194] hover:bg-[#dae2fd]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Correct Feedback & Mini Map Dossier Box */}
          <section className="relative overflow-hidden rounded-2xl bg-[#f2f3ff] p-4 shadow-sm border border-[#eaedff]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#825100] flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  celebration
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] text-[#006a61] font-extrabold">🎉 정답이에요!</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#005049] text-[11px] font-bold">
                    탐험 지식 +20 XP
                  </span>
                </div>
                <p className="text-[13px] text-[#3f4850] leading-relaxed">
                  이 국기는 <strong className="text-[#131b2e] font-bold">브라질</strong>의 국기예요. 남아메리카 대륙에서 가장 넓은 면적을 차지하는 나라랍니다!
                </p>
              </div>
            </div>

            {/* Mini Geographic Map Insight Viewport */}
            <div className="mt-3.5 relative w-full h-28 rounded-xl overflow-hidden shadow-inner bg-[#93ccff]/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk3wIyGpIR8Anf1iYtwqqPU60GCoJ_OrwZLDdLEjgLGS_Q3-hwGs0wqh0BzThMYFx_Bj0lTztIQKYKdj0b26S6FFrKHmsLdTwD358tVWDs58tGi0ONbImZYmr5pCrGV0P2ERPKm3f1Qg8IXBEo1Bw5pbKvcRSKA1Ztms7VAig40aZs1eFwr3vsJwJ4S5ay-Wzx384z2TOclZ5D10qigXFF08_KJrFQ3ih3oAGoQCCIXEZgnh4z-bF8WQ"
                alt="브라질 지도 및 지형"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#86f2e4] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#89f5e7]"></span>
                  </div>
                  <span className="text-[13px] text-white font-bold drop-shadow-sm">
                    남아메리카 • 브라질 연방공화국
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[#006a61] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">public</span>
                  <span>수도: 브라질리아</span>
                </div>
              </div>
            </div>
          </section>

          {/* Hint disclosure box if clicked */}
          {showHint && (
            <div className="p-3.5 rounded-xl bg-[#ffddb8]/40 border border-[#ffb95f] text-[#2a1700] text-[13px] flex items-start gap-2">
              <span className="material-symbols-outlined text-[#825100] text-[18px]">lightbulb</span>
              <p>
                <strong>힌트:</strong> 초록색 바탕에 노란 마름모는 브라질, 파랑-하양-빨강 삼색기는 프랑스, 붉은 단풍잎은 캐나다, 태극 문양은 대한민국입니다!
              </p>
            </div>
          )}

          {/* Bottom Action Toolbar */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setShowHint(!showHint);
                }}
                className="flex items-center gap-1 px-3.5 py-2.5 rounded-full bg-[#eaedff] text-[#825100] text-[13px] font-bold hover:bg-[#dae2fd] active:scale-95 shadow-xs transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span>힌트</span>
              </button>
              <button
                type="button"
                onClick={handleResetMatching}
                className="flex items-center gap-1 px-3.5 py-2.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[13px] font-bold hover:bg-[#dae2fd] active:scale-95 shadow-xs transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>다시 풀기</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playSuccess();
                  setMatchedPairs({
                    'flag-brazil': 'brazil',
                    'flag-france': 'france',
                    'flag-canada': 'canada',
                    'flag-korea': 'korea'
                  });
                  try {
                    confetti({ particleCount: 30 });
                  } catch {
                    // ignore
                  }
                }}
                className="px-4 py-2.5 rounded-full bg-[#eaedff] text-[#006194] text-[13px] font-bold hover:bg-[#dae2fd] active:scale-95 shadow-xs transition-transform cursor-pointer"
              >
                정답 확인
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playSuccess();
                  setActiveMode('location');
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#006194] text-white text-[14px] font-bold shadow-md hover:bg-[#007bb9] active:scale-95 transition-all cursor-pointer"
              >
                <span>다음 문제</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODE 2: ACTIVE LOCATION QUIZ ===================== */}
      {activeMode === 'location' && (
        <div className="space-y-4">
          {/* Level Header */}
          <div className="flex items-center justify-between bg-[#f2f3ff] px-4 py-2.5 rounded-2xl shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#a36700] text-white">
                <span className="material-symbols-outlined text-[16px]">military_tech</span>
              </span>
              <span className="text-[11px] font-extrabold text-[#3f4850] uppercase">탐험 레벨 2</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#bfc7d2]" />
              <span className="text-[13px] text-[#006194] font-bold">국가 위치 찾기</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-xs border border-[#eaedff]">
              <span className="material-symbols-outlined text-[#825100] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="text-[12px] text-[#131b2e] font-extrabold">350 XP</span>
            </div>
          </div>

          {/* Question Banner */}
          <div className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold">
                    오늘의 미션
                  </span>
                  <span className="text-[12px] text-[#3f4850] font-semibold">{locMission.subRegion}</span>
                </div>
                <h2 className="text-[19px] font-bold text-[#131b2e] leading-snug">
                  세계 지도에서 <span className="text-[#006194] font-extrabold underline decoration-[#006a61] decoration-2 underline-offset-4">‘{locMission.targetCountry}’</span>를 찾아 터치해 보세요!
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#86f2e4] flex items-center justify-center text-[#005049] flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[28px]">explore</span>
              </div>
            </div>

            {/* Action bar under question */}
            <div className="flex items-center gap-2 mt-3 pt-3 bg-[#f2f3ff] rounded-xl px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  speakKoreanText("이집트, Egypt");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006194] rounded-full text-white text-[13px] font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
                <span>발음 듣기</span>
              </button>
              <span className="text-[13px] text-[#3f4850] font-medium">{locMission.pronunciationText}</span>
            </div>
          </div>

          {/* Regional Map Viewport (North Africa / Mediterranean) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#d7e9f7] shadow-md border border-[#eaedff]">
            <div className="relative w-full h-[320px] overflow-hidden">
              {/* Coordinate grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
                <line x1="0" y1="160" x2="100%" y2="160" stroke="#007bb9" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="200" y1="0" x2="200" y2="100%" stroke="#007bb9" strokeWidth="1" strokeDasharray="4,4" />
              </svg>

              {/* Interactive Vector Regions */}
              <svg viewBox="0 0 400 320" className="w-full h-full absolute inset-0 select-none">
                <text x="180" y="45" fill="#006194" fontSize="10" fontWeight="bold" opacity="0.85">
                  지중해 (MEDITERRANEAN SEA)
                </text>
                <text x="325" y="195" fill="#006194" fontSize="9" fontWeight="bold" opacity="0.75">
                  홍해 (RED SEA)
                </text>

                {/* Europe/Greece edge */}
                <path d="M 120,0 L 220,0 L 210,30 L 190,40 L 175,25 L 140,35 L 115,10 Z" fill="#eaedff" stroke="#bfc7d2" strokeWidth="1.5" />

                {/* Libya (West) */}
                <g className="cursor-pointer group" onClick={() => handleMapCountryClick('libya')}>
                  <path
                    d="M 30,80 L 155,75 L 160,180 L 70,210 L 20,160 Z"
                    fill={clickedRegion === 'libya' ? '#ffdad6' : '#eaedff'}
                    stroke="#bfc7d2"
                    strokeWidth="1.5"
                    className="transition-colors group-hover:fill-[#dae2fd]"
                  />
                  <text x="80" y="135" fill="#3f4850" fontSize="12" fontWeight="600">리비아</text>
                </g>

                {/* Sudan (South) */}
                <g className="cursor-pointer group" onClick={() => handleMapCountryClick('sudan')}>
                  <path
                    d="M 150,195 L 280,195 L 305,280 L 170,300 L 120,250 Z"
                    fill={clickedRegion === 'sudan' ? '#ffdad6' : '#eaedff'}
                    stroke="#bfc7d2"
                    strokeWidth="1.5"
                    className="transition-colors group-hover:fill-[#dae2fd]"
                  />
                  <text x="195" y="245" fill="#3f4850" fontSize="12" fontWeight="600">수단</text>
                </g>

                {/* Saudi Arabia (East) */}
                <g className="cursor-pointer group" onClick={() => handleMapCountryClick('saudi')}>
                  <path
                    d="M 315,95 L 380,105 L 395,240 L 335,210 L 305,130 Z"
                    fill={clickedRegion === 'saudi' ? '#ffdad6' : '#eaedff'}
                    stroke="#bfc7d2"
                    strokeWidth="1.5"
                    className="transition-colors group-hover:fill-[#dae2fd]"
                  />
                  <text x="335" y="160" fill="#3f4850" fontSize="11" fontWeight="600">사우디</text>
                </g>

                {/* Target Country: EGYPT */}
                <g className="cursor-pointer" onClick={() => handleMapCountryClick('egypt')}>
                  <path
                    d="M 160,75 L 275,70 L 285,100 L 298,125 L 280,195 L 150,195 Z"
                    fill={locationSuccess ? "#ffddb8" : "#86f2e4"}
                    stroke="#a36700"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    className="animate-pulse"
                  />
                  {/* Nile River stylization */}
                  <path
                    d="M 245,72 Q 248,110 240,140 T 235,195"
                    fill="none"
                    stroke="#007bb9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="248" cy="80" r="2.5" fill="#007bb9" />
                  <text x="195" y="135" fill="#2a1700" fontSize="14" fontWeight="800">
                    이집트 🇪🇬
                  </text>
                </g>
              </svg>

              {/* Target Floating Pin */}
              {locationSuccess && (
                <div className="absolute left-[54%] top-[28%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center animate-bounce">
                  <div className="px-2.5 py-1 rounded-full bg-[#825100] text-white text-[11px] font-extrabold shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                    정답 위치!
                  </div>
                  <div className="w-3 h-3 bg-[#825100] rotate-45 -mt-1.5 shadow-xs" />
                </div>
              )}

              {/* Touch guidance micro indicator */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#006194] text-[18px]">touch_app</span>
                <span className="text-[12px] font-bold text-[#131b2e]">국가를 직접 터치해 보세요</span>
              </div>

              {/* Compass decor */}
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[#006a61] text-[24px]">navigation</span>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          {locationSuccess ? (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#86f2e4] flex items-center justify-center text-[#005049] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    celebration
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[#006a61] text-[11px] font-extrabold mb-0.5">
                    <span>미션 성공</span>
                    <span>•</span>
                    <span>나일강 문명의 발상지</span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#131b2e]">
                    🌟 잘 찾았어요! 대단한 탐험가네요!
                  </h3>
                  <p className="text-[13px] text-[#3f4850] mt-1 leading-relaxed">
                    이집트는 아프리카 대륙의 북동쪽에 있으며, 세계에서 가장 긴 강 중 하나인 <strong className="text-[#131b2e] font-bold">나일강</strong>이 흐르고 고대 피라미드가 유명하답니다!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mt-4 pt-3 bg-[#f2f3ff] rounded-xl p-2.5">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setClickedRegion(null);
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#dae2fd] text-[#131b2e] text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                  <span>다시 탐색하기</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playSuccess();
                    alert("축하합니다! 이번 퀘스트를 모두 완수했습니다. '그리스' 탐험 퀘스트가 열렸습니다!");
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#006194] text-white text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md hover:bg-[#007bb9] cursor-pointer"
                >
                  <span>다음 국가로 이동</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#ffdad6]/50 rounded-2xl p-4 shadow-sm border border-[#ffdad6]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ffddb8] flex items-center justify-center text-[#825100] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">flight_takeoff</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[16px] font-bold text-[#131b2e]">이웃 국가에 도착했어요!</h4>
                  <p className="text-[13px] text-[#3f4850] mt-0.5">
                    거의 다 왔어요! 아래 힌트 연구소의 단서를 확인하고 노란빛으로 빛나는 구역을 탭해볼까요?
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4-Step Hint Laboratory ("탐험대 힌트 연구소") */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#a36700] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lightbulb
                  </span>
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-[#131b2e] leading-none">탐험대 힌트 연구소</h3>
                  <span className="text-[11px] text-[#707881] font-semibold">단계별 단서를 열어보세요</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-[11px] font-extrabold">
                4개 단서
              </span>
            </div>

            <div className="space-y-2.5">
              {locMission.hints.map((hint) => (
                <div key={hint.id} className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-xs border border-[#eaedff]">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-extrabold ${
                    hint.id === 1
                      ? 'bg-[#006a61] text-white'
                      : hint.id === 2
                      ? 'bg-[#006194] text-white'
                      : hint.id === 3
                      ? 'bg-[#a36700] text-white'
                      : 'bg-[#dae2fd] text-[#131b2e]'
                  }`}>
                    {hint.id === 1 ? (
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    ) : (
                      hint.id
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-[#006194]">{hint.title}</span>
                      <span className="text-[10px] font-bold text-[#707881]">{hint.status}</span>
                    </div>
                    <p className="text-[13px] font-semibold text-[#131b2e] mt-0.5 leading-relaxed">
                      {hint.content}
                    </p>

                    {hint.id === 4 && (
                      <div className="mt-2.5 p-2 rounded-xl bg-[#f2f3ff] flex items-center gap-3 border border-[#eaedff]">
                        <div className="w-12 h-8 rounded-lg overflow-hidden flex flex-col shadow-xs flex-shrink-0 border border-[#bfc7d2]">
                          <div className="w-full h-1/3 bg-[#ce1126]" />
                          <div className="w-full h-1/3 bg-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-[10px] text-[#c09300]">shield</span>
                          </div>
                          <div className="w-full h-1/3 bg-black" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[12px] font-bold text-[#131b2e]">이집트 아랍 공화국</span>
                          <p className="text-[11px] text-[#707881] truncate">수도: 카이로 (Cairo)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Landmark Carousel */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-extrabold text-[#707881] uppercase tracking-wider">이집트의 대표 랜드마크</h4>
            <div className="grid grid-cols-2 gap-3">
              {locMission.landmarks.map((lm, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#eaedff] flex flex-col">
                  <div className="h-28 w-full relative overflow-hidden bg-[#eaedff]">
                    <img
                      src={lm.imgUrl}
                      alt={lm.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#131b2e] shadow-xs">
                      {lm.name}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[12px] text-[#3f4850] line-clamp-2 leading-relaxed">{lm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
