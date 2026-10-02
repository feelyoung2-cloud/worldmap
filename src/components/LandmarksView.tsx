import React, { useState } from 'react';
import { LandmarkItem } from '../types';
import { LANDMARKS_DATA, soundEffects } from '../data/atlasData';
import confetti from 'canvas-confetti';

interface LandmarksViewProps {
  onOpenLandmarkModal: (item: LandmarkItem) => void;
  onStartLandmarkQuiz: (landmarkName: string) => void;
}

export const LandmarksView: React.FC<LandmarksViewProps> = ({
  onOpenLandmarkModal,
  onStartLandmarkQuiz
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [featuredLandmark, setFeaturedLandmark] = useState<LandmarkItem>(LANDMARKS_DATA[0]);
  const [stampedList, setStampedList] = useState<Set<string>>(new Set(['sahara', 'nile', 'amazon']));
  const [stampSuccess, setStampSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: '전체', count: LANDMARKS_DATA.length },
    { id: 'cities', label: '🏙️ 수도와 도시' },
    { id: 'mountains', label: '⛰️ 산맥' },
    { id: 'rivers-deserts', label: '🌊 강과 사막' },
    { id: 'oceans', label: '🌐 대양' }
  ];

  const filteredLandmarks = LANDMARKS_DATA.filter((lm) => {
    const matchesCategory = selectedCategory === 'all' || lm.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      lm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lm.relatedCountries.some(rc => rc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCollectStamp = () => {
    soundEffects.playSuccess();
    setStampedList(prev => new Set(prev).add(featuredLandmark.id));
    setStampSuccess(true);
    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      setStampSuccess(false);
    }, 2200);
  };

  const isCurrentStamped = stampedList.has(featuredLandmark.id);

  return (
    <div className="flex flex-col w-full pb-10 max-w-2xl mx-auto">
      {/* Search Input Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#006194]">
            <span className="material-symbols-outlined text-[22px]">travel_explore</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="지명이나 국가를 찾아보세요 (사하라, 나일강, 런던)"
            className="w-full h-12 pl-11 pr-10 rounded-full bg-[#f2f3ff] text-[#131b2e] text-[14px] shadow-xs border border-[#eaedff] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/30 transition-all placeholder:text-[#707881]"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="검색창 지우기"
              className="absolute right-3 w-7 h-7 rounded-full flex items-center justify-center text-[#707881] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto no-scrollbar px-4 py-2 flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
              }`}
            >
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span className={`text-[11px] font-extrabold ${isActive ? 'text-[#cce5ff]' : 'text-[#707881]'}`}>
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Topography Map Canvas Plate */}
      <div className="px-4 pt-2">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-sm bg-[#f2f3ff] border border-[#eaedff]">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70 scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCM81VGG9j5BTkvvBIIL7HGMcAbe0okUOV3eGID7ay8OiPn3025cIRK__K-OcHn0cVlvOV5pP_YCVl2dJNMurdWc_vuHjjh6HpQu1Rd8Jw_LpH29qKJiTGBfwebS2VOKV49RV2hhhQd4bpNfNW5-Lox3_R814y-05s6P6zZjdr7N8cvtkI1I0f4dtFKSWqj0REAPBDvZbAJtbKc9V4oloGNHJi9ScXy_rs3Wn5gZhtxDn81pghHCgqPQw')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#006194]/20 via-transparent to-[#131b2e]/60" />

          {/* Mode Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-[#eaedff]">
            <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping" />
            <span className="text-[11px] font-extrabold text-[#006194] tracking-wide">6학년 탐험 모드: 지형 랜드마크</span>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => soundEffects.playPop()}
              className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#006194] shadow-xs hover:bg-white active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
            <button
              type="button"
              onClick={() => soundEffects.playPop()}
              className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#006194] shadow-xs hover:bg-white active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
          </div>

          {/* Map Pins */}
          {/* 1. Sahara Desert Pin */}
          <div
            onClick={() => {
              soundEffects.playPop();
              const item = LANDMARKS_DATA.find(x => x.id === 'sahara');
              if (item) setFeaturedLandmark(item);
            }}
            className="absolute top-[48%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
          >
            <div className="relative flex flex-col items-center">
              <span className="absolute -top-1 w-10 h-10 rounded-full bg-[#825100]/30 animate-ping" />
              <div className="px-2.5 py-1 rounded-full bg-[#a36700] text-white text-[11px] font-extrabold shadow-md flex items-center gap-1 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>사하라사막</span>
              </div>
              <div className="w-2 h-2 rotate-45 bg-[#a36700] -mt-1 shadow-xs" />
            </div>
          </div>

          {/* 2. Himalayas Pin */}
          <div
            onClick={() => {
              soundEffects.playPop();
              const item = LANDMARKS_DATA.find(x => x.id === 'himalayas');
              if (item) setFeaturedLandmark(item);
            }}
            className="absolute top-[38%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-90 hover:opacity-100 transition-transform hover:scale-110"
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#131b2e] text-[11px] font-bold shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006194]">landscape</span>
                <span>히말라야</span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45 bg-white -mt-1" />
            </div>
          </div>

          {/* 3. Alps Pin */}
          <div
            onClick={() => {
              soundEffects.playPop();
              const item = LANDMARKS_DATA.find(x => x.id === 'alps');
              if (item) setFeaturedLandmark(item);
            }}
            className="absolute top-[28%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-90 hover:opacity-100 transition-transform hover:scale-110"
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#131b2e] text-[11px] font-bold shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006194]">terrain</span>
                <span>알프스</span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45 bg-white -mt-1" />
            </div>
          </div>

          {/* 4. Amazon Pin */}
          <div
            onClick={() => {
              soundEffects.playPop();
              const item = LANDMARKS_DATA.find(x => x.id === 'amazon');
              if (item) setFeaturedLandmark(item);
            }}
            className="absolute top-[68%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-90 hover:opacity-100 transition-transform hover:scale-110"
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#131b2e] text-[11px] font-bold shadow-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006a61]">water_lux</span>
                <span>아마존강</span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45 bg-white -mt-1" />
            </div>
          </div>

          {/* Oceans decor */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
            <div className="flex items-center gap-1 text-[11px] font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[12px] text-[#86f2e4]">waves</span>
              <span>대서양</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[12px] text-[#86f2e4]">waves</span>
              <span>인도양</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Landmark Card */}
      <div className="px-4 pt-4">
        <div className="relative w-full rounded-2xl bg-white shadow-sm border border-[#eaedff] overflow-hidden transition-all duration-300">
          <div className="h-2 w-full bg-[#825100]" />
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[11px] font-bold">
                    {featuredLandmark.categoryName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[11px] font-semibold">
                    {featuredLandmark.continent}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <h2 className="text-[22px] font-extrabold text-[#131b2e]">{featuredLandmark.name}</h2>
                  <span className="text-[13px] text-[#707881]">{featuredLandmark.nameEn}</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#ffddb8]/60 flex items-center justify-center text-[#825100] shadow-xs flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">wb_sunny</span>
              </div>
            </div>

            {/* Landmark Image */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-inner bg-[#eaedff]">
              <img
                src={featuredLandmark.imgUrl}
                alt={featuredLandmark.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1 text-white">
                <span className="material-symbols-outlined text-[14px]">square_foot</span>
                <span className="text-[11px] font-bold">{featuredLandmark.highlightFact}</span>
              </div>
            </div>

            <p className="text-[14px] text-[#3f4850] leading-relaxed">
              {featuredLandmark.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-[#707881] font-bold">연관 탐험 국가:</span>
              {featuredLandmark.relatedCountries.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-[#f2f3ff] text-[#006194] text-[11px] font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  onStartLandmarkQuiz(featuredLandmark.name);
                }}
                className="h-12 rounded-xl bg-[#006194] text-white text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#007bb9] active:translate-y-[1px] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                <span>퀴즈 풀기 🎯</span>
              </button>

              <button
                type="button"
                onClick={handleCollectStamp}
                className={`h-12 rounded-xl text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform cursor-pointer ${
                  stampSuccess || isCurrentStamped
                    ? 'bg-[#86f2e4] text-[#005049]'
                    : 'bg-[#eaedff] text-[#006194] hover:bg-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {stampSuccess || isCurrentStamped ? 'verified' : 'bookmark'}
                </span>
                <span>{stampSuccess ? '스탬프 등록완료!' : isCurrentStamped ? '스탬프 보유 중 🔖' : '도감 스탬프 🔖'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Landmarks List Section */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[20px]">explore</span>
            <h3 className="text-[18px] font-bold text-[#131b2e]">더 탐험할 랜드마크</h3>
          </div>
          <span className="text-[11px] text-[#707881] font-bold">초등 사회 6-1 수록</span>
        </div>

        <div className="flex flex-col gap-3">
          {filteredLandmarks.map((lm) => {
            const isStamped = stampedList.has(lm.id);

            return (
              <div
                key={lm.id}
                onClick={() => {
                  soundEffects.playPop();
                  setFeaturedLandmark(lm);
                  onOpenLandmarkModal(lm);
                }}
                className="w-full rounded-2xl bg-white p-3 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3 cursor-pointer border border-[#eaedff]"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#eaedff]">
                  <img
                    src={lm.imgUrl}
                    alt={lm.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-white text-[10px] font-bold">
                    {lm.continent.split(' ')[0]}
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] text-[#131b2e] font-bold truncate">{lm.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#f2f3ff] text-[#006194] text-[10px] font-bold">
                      {lm.categoryName}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3f4850] line-clamp-2 mt-0.5 leading-snug">
                    {lm.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[#707881] text-[11px] font-semibold">
                    <span className="flex items-center gap-0.5 truncate">
                      <span className="material-symbols-outlined text-[13px]">flag</span>
                      {lm.locationText}
                    </span>
                    <span className={isStamped ? "text-[#006a61] font-bold shrink-0" : "text-[#825100] font-bold shrink-0"}>
                      {isStamped ? "도감 스탬프 수집" : `탐험율 ${lm.progress}%`}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`${lm.name} 상세 정보`}
                  className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4850] hover:text-[#006194] transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grade 6 Social Studies Quiz Tip Box */}
      <div className="px-4 pt-3">
        <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex items-center gap-3 border border-[#eaedff]">
          <div className="w-10 h-10 rounded-full bg-[#86f2e4] text-[#005049] flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] text-[#131b2e] font-bold">초등 6학년 지도 쏙쏙 퀴즈 팁</span>
            <p className="text-[12px] text-[#3f4850] mt-0.5 leading-relaxed">
              "지형을 익힐 때 경위도선과 5대양 6대주 위치를 연결하면 지리학 습득 속도가 2배 빨라져요!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
