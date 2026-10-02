import React from 'react';
import { CountryData } from '../types';
import { soundEffects, speakKoreanText } from '../data/atlasData';

interface CountryDetailModalProps {
  country: CountryData | null;
  onClose: () => void;
  onSaveToAtlas: (countryId: string) => void;
  isSaved: boolean;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  country,
  onClose,
  onSaveToAtlas,
  isSaved
}) => {
  if (!country) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-[#eaedff] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo or Flag Banner */}
        <div className="relative h-44 w-full bg-[#cce5ff] overflow-hidden">
          {country.photos && country.photos[0] ? (
            <img
              src={country.photos[0].url}
              alt={country.photos[0].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[72px]">
              {country.flagEmoji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            aria-label="닫기"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Flag & Names on Header */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="text-[36px] bg-white/90 backdrop-blur-sm p-1.5 rounded-2xl shadow-md border border-white/40">
              {country.flagEmoji}
            </div>
            <div className="text-white">
              <h2 className="text-[22px] font-extrabold drop-shadow-sm leading-tight">
                {country.name}
              </h2>
              <p className="text-[13px] text-white/90 drop-shadow-sm font-medium">
                {country.nameEn} • {country.continentName}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="text-[11px] text-[#707881] font-semibold">수도</span>
              <p className="text-[14px] font-bold text-[#131b2e] truncate">{country.capital}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="text-[11px] text-[#707881] font-semibold">소속 대륙</span>
              <p className="text-[14px] font-bold text-[#006194] truncate">{country.continentName}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <span className="text-[11px] text-[#707881] font-semibold">음성 안내</span>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  speakKoreanText(`${country.name}. 수도는 ${country.capital}입니다. ${country.description}`);
                }}
                className="w-full flex items-center justify-center text-[#006a61] mt-0.5 cursor-pointer"
                title="음성으로 듣기"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
            </div>
          </div>

          {/* Curriculum Geographic Description */}
          <div className="bg-[#f2f3ff] p-4 rounded-2xl border border-[#eaedff]">
            <div className="flex items-center gap-1.5 text-[#006194] font-bold text-[13px] mb-1.5">
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>초등 사회 6-1 지리 탐구 안내</span>
            </div>
            <p className="text-[14px] text-[#3f4850] leading-relaxed">
              {country.description}
            </p>
          </div>

          {/* Key Landmarks */}
          <div>
            <span className="text-[12px] font-extrabold text-[#707881] uppercase tracking-wider block mb-2">
              대표 지형 및 명소
            </span>
            <div className="flex flex-wrap gap-2">
              {country.keyLandmarks.map((lm, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white text-[#131b2e] font-semibold text-[13px] shadow-xs border border-[#eaedff] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#006194]">place</span>
                  {lm}
                </span>
              ))}
            </div>
          </div>

          {/* Photo Gallery if Available */}
          {country.photos && country.photos.length > 0 && (
            <div>
              <span className="text-[12px] font-extrabold text-[#707881] uppercase tracking-wider block mb-2">
                생생 사진 갤러리
              </span>
              <div className="grid grid-cols-2 gap-2">
                {country.photos.map((p, i) => (
                  <div key={i} className="rounded-xl overflow-hidden shadow-xs h-28 relative bg-[#eaedff]">
                    <img
                      src={p.url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold truncate">
                      {p.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                onClose();
              }}
              className="flex-1 h-12 rounded-full bg-[#eaedff] text-[#3f4850] font-bold text-[14px] hover:bg-[#dae2fd] transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playSuccess();
                onSaveToAtlas(country.id);
              }}
              className="flex-1 h-12 rounded-full bg-[#006194] text-white font-bold text-[14px] flex items-center justify-center gap-1.5 shadow-md hover:bg-[#007bb9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isSaved ? 'check' : 'bookmark_add'}
              </span>
              <span>{isSaved ? '도감에 수집됨' : '도감에 저장하기 ⭐️'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
