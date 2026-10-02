import React, { useState } from 'react';
import { CountryData, BadgeItem } from '../types';
import { COUNTRIES_DATA, BADGES_DATA, soundEffects } from '../data/atlasData';

interface MyAtlasViewProps {
  onOpenCountryDetail: (country: CountryData) => void;
  savedCountryIds: Set<string>;
}

export const MyAtlasView: React.FC<MyAtlasViewProps> = ({
  onOpenCountryDetail,
  savedCountryIds
}) => {
  const [filterContinent, setFilterContinent] = useState<string>('all');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  const continentFilters = [
    { id: 'all', label: '전체 (28)' },
    { id: 'asia', label: '아시아 (12)' },
    { id: 'europe', label: '유럽 (6)' },
    { id: 'namerica', label: '아메리카 (5)' },
    { id: 'africa', label: '아프리카 (5)' }
  ];

  const filteredCountries = COUNTRIES_DATA.filter((c) => {
    if (filterContinent === 'all') return true;
    if (filterContinent === 'asia') return c.continent === 'asia';
    if (filterContinent === 'europe') return c.continent === 'europe';
    if (filterContinent === 'namerica') return c.continent === 'namerica' || c.continent === 'samerica';
    if (filterContinent === 'africa') return c.continent === 'africa';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10 max-w-2xl mx-auto px-4 pt-3 space-y-5">
      {/* Top Banner & Stats Overview */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[24px]">menu_book</span>
            <h1 className="text-[22px] font-extrabold text-[#131b2e]">나의 탐험 도감</h1>
          </div>
          <p className="text-[13px] text-[#707881] mt-0.5">지우 탐험가님의 세계 수집 기록</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#006194] text-white shadow-xs">
          <span className="material-symbols-outlined text-[18px]">military_tech</span>
          <span className="text-[12px] font-bold">LEVEL 4 공인 탐험가</span>
        </div>
      </div>

      {/* Explorer Passport Card ("어린이 세계지도 탐험대 공식 여권") */}
      <div className="relative rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-[#003452] via-[#004b73] to-[#006194] text-white p-5 border-2 border-[#93ccff]/30">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Passport Header */}
        <div className="flex items-start justify-between border-b border-white/20 pb-3.5 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <span className="material-symbols-outlined text-[28px] text-[#86f2e4]">public</span>
            </div>
            <div>
              <span className="text-[10px] text-[#93ccff] font-extrabold tracking-widest uppercase">
                REPUBLIC OF KOREA ATLAS PASSPORT
              </span>
              <h2 className="text-[17px] font-bold text-white leading-tight">
                대한민국 초등 세계지도 탐험 여권
              </h2>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-[#86f2e4]/20 border border-[#86f2e4]/40 text-[#86f2e4] text-[11px] font-bold">
            정회원 인증
          </span>
        </div>

        {/* Passport Body */}
        <div className="grid grid-cols-2 gap-3 text-[13px]">
          <div>
            <span className="text-[11px] text-white/60">탐험가 성명</span>
            <p className="font-bold text-[16px] text-white">이지우 (Lee Ji-woo)</p>
            <p className="text-[11px] text-white/80">6학년 2반 탐험소대</p>
          </div>
          <div>
            <span className="text-[11px] text-white/60">발급 번호</span>
            <p className="font-mono font-bold text-[14px] text-[#86f2e4]">KOR-EXP-2026-0612</p>
            <p className="text-[11px] text-white/80">사회과 6-1 공인 이수</p>
          </div>
        </div>

        {/* Passport Footer Counts */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#86f2e4] text-[16px]">flag</span>
            <span>수집 국가: <strong className="text-white font-extrabold">28개국</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffddb8] text-[16px]">verified</span>
            <span>배지: <strong className="text-white font-extrabold">4개</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">stars</span>
            <span>경험치: <strong className="text-white font-extrabold">760 XP</strong></span>
          </div>
        </div>
      </div>

      {/* Explorer Honor Badges Showcase ("명예 배지 갤러리") */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#825100] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <h2 className="text-[17px] font-bold text-[#131b2e]">명예 탐험 배지 갤러리</h2>
          </div>
          <span className="text-[12px] text-[#006a61] font-bold">4 / 6개 획득</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {BADGES_DATA.map((badge) => (
            <button
              key={badge.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setSelectedBadge(badge);
              }}
              className={`p-3 rounded-xl flex flex-col items-center text-center transition-all cursor-pointer ${
                badge.unlocked
                  ? 'bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#eaedff]'
                  : 'bg-[#eaedff]/40 opacity-60 hover:opacity-90'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[24px] mb-1.5 shadow-xs ${
                badge.unlocked ? 'bg-white' : 'bg-[#bfc7d2]/30 text-[#707881]'
              }`}>
                {badge.icon}
              </div>
              <span className="text-[12px] font-bold text-[#131b2e] leading-tight line-clamp-1">
                {badge.title}
              </span>
              <span className={`text-[10px] mt-0.5 ${badge.unlocked ? 'text-[#006a61] font-bold' : 'text-[#707881]'}`}>
                {badge.unlocked ? '획득 완료' : '도전 중'}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Badge Detail Modal / Popup */}
        {selectedBadge && (
          <div className="mt-3.5 p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-start justify-between gap-2 animate-fadeIn">
            <div className="flex items-start gap-3">
              <span className="text-[32px]">{selectedBadge.icon}</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#131b2e]">{selectedBadge.title}</h4>
                <p className="text-[12px] text-[#3f4850] mt-0.5 leading-snug">{selectedBadge.description}</p>
                <span className="inline-block mt-1 text-[11px] font-bold text-[#006194]">
                  {selectedBadge.unlocked ? '✅ 사회과 탐구 성취 달성' : '🔒 해당 지명 퀴즈를 모두 완료하세요'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="text-[#707881] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}
      </div>

      {/* Collected Countries Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[18px] font-bold text-[#131b2e]">수집한 국가 카드</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#006194] text-[11px] font-bold">
              {filteredCountries.length}개
            </span>
          </div>
          <span className="text-[12px] text-[#707881]">터치하여 세부 카드 확인</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {continentFilters.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setFilterContinent(tab.id);
              }}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                filterContinent === tab.id
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredCountries.map((c) => {
            const isBookmarked = savedCountryIds.has(c.id);

            return (
              <div
                key={c.id}
                onClick={() => {
                  soundEffects.playPop();
                  onOpenCountryDetail(c);
                }}
                className="bg-white rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#eaedff] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[24px] shadow-xs border border-[#eaedff]">
                      {c.flagEmoji}
                    </div>
                    {isBookmarked && (
                      <span className="material-symbols-outlined text-[#825100] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    )}
                  </div>

                  <h4 className="text-[16px] font-bold text-[#131b2e] leading-snug group-hover:text-[#006194] transition-colors">
                    {c.name}
                  </h4>
                  <p className="text-[12px] text-[#707881] truncate">{c.nameEn}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#eaedff] flex items-center justify-between text-[11px]">
                  <span className="text-[#3f4850]">수도: {c.capital}</span>
                  <span className="text-[#006a61] font-bold">수집완료</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explorer Certificate Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            soundEffects.playSuccess();
            setShowCertificate(true);
          }}
          className="w-full h-14 rounded-2xl bg-[#006a61] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#005049] active:scale-98 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
          <span>초등 세계지도 탐험 수료증 발급받기 🎓</span>
        </button>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-[#ffddb8] relative text-center">
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-[#707881] hover:text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="w-16 h-16 rounded-full bg-[#ffddb8] text-[#825100] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>

            <span className="text-[11px] font-extrabold text-[#006194] tracking-widest uppercase">
              CERTIFICATE OF GEOGRAPHY EXPLORATION
            </span>
            <h3 className="text-[22px] font-extrabold text-[#131b2e] mt-1 mb-3">
              초등 세계지도 탐험 수료증
            </h3>

            <p className="text-[14px] text-[#3f4850] leading-relaxed mb-4">
              위 학생 <strong>이지우</strong>는 6학년 사회과 교육과정에 따른 7대륙 5대양 및 세계 주요 국가, 랜드마크 탐험을 우수한 성적으로 이수하였음을 공인합니다.
            </p>

            <div className="bg-[#f2f3ff] rounded-2xl p-3 text-[12px] text-[#3f4850] space-y-1 mb-5">
              <div className="flex justify-between">
                <span>발급일자:</span>
                <span className="font-bold text-[#131b2e]">2026년 9월 14일</span>
              </div>
              <div className="flex justify-between">
                <span>수료 레벨:</span>
                <span className="font-bold text-[#006194]">Level 4 공인 탐험가</span>
              </div>
              <div className="flex justify-between">
                <span>발급 기관:</span>
                <span className="font-bold text-[#131b2e]">초등 세계지도 교육탐험협회</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playSuccess();
                window.print();
              }}
              className="w-full h-12 rounded-full bg-[#006194] text-white font-bold text-[14px] flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>수료증 인쇄 및 저장</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
