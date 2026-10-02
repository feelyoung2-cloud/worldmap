import React, { useState } from 'react';
import { ContinentType, CountryData } from '../types';
import { COUNTRIES_DATA, soundEffects, speakKoreanText } from '../data/atlasData';
import confetti from 'canvas-confetti';

interface WorldMapViewProps {
  onOpenCountryDetail: (country: CountryData) => void;
  onSaveToAtlas: (countryId: string) => void;
  savedCountryIds: Set<string>;
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({
  onOpenCountryDetail,
  onSaveToAtlas,
  savedCountryIds
}) => {
  const [selectedContinent, setSelectedContinent] = useState<ContinentType>('all');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES_DATA[0]); // default Korea
  const [oceanVisible, setOceanVisible] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isSavedAnimation, setIsSavedAnimation] = useState<boolean>(false);
  const [pinBounce, setPinBounce] = useState<boolean>(false);

  const continentButtons: { id: ContinentType; label: string }[] = [
    { id: 'all', label: '전체' },
    { id: 'asia', label: '아시아' },
    { id: 'europe', label: '유럽' },
    { id: 'africa', label: '아프리카' },
    { id: 'namerica', label: '북아메리카' },
    { id: 'samerica', label: '남아메리카' },
    { id: 'oceania', label: '오세아니아' },
    { id: 'antarctica', label: '남극' }
  ];

  const handleContinentFilter = (cont: ContinentType) => {
    soundEffects.playPop();
    setSelectedContinent(cont);
    if (cont === 'all') {
      setZoomLevel(1);
    } else if (cont === 'asia') {
      setZoomLevel(1.35);
      const c = COUNTRIES_DATA.find(x => x.id === 'korea');
      if (c) setSelectedCountry(c);
    } else if (cont === 'europe') {
      setZoomLevel(1.45);
      const c = COUNTRIES_DATA.find(x => x.id === 'france');
      if (c) setSelectedCountry(c);
    } else if (cont === 'africa') {
      setZoomLevel(1.3);
      const c = COUNTRIES_DATA.find(x => x.id === 'egypt');
      if (c) setSelectedCountry(c);
    } else if (cont === 'samerica') {
      setZoomLevel(1.3);
      const c = COUNTRIES_DATA.find(x => x.id === 'brazil');
      if (c) setSelectedCountry(c);
    } else if (cont === 'namerica') {
      setZoomLevel(1.3);
      const c = COUNTRIES_DATA.find(x => x.id === 'canada');
      if (c) setSelectedCountry(c);
    } else {
      setZoomLevel(1.2);
    }
  };

  const handleZoom = (delta: number) => {
    soundEffects.playPop();
    setZoomLevel(prev => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.85), 2.3));
  };

  const handleResetMap = () => {
    soundEffects.playChime();
    setZoomLevel(1);
    setSelectedContinent('all');
    setSelectedCountry(COUNTRIES_DATA[0]);
  };

  const handleCountryPinClick = (country: CountryData) => {
    soundEffects.playPop();
    setSelectedCountry(country);
    setPinBounce(true);
    setTimeout(() => setPinBounce(false), 1000);
    speakKoreanText(`${country.name}, 수도는 ${country.capital}입니다.`);
  };

  const handleSaveCountry = () => {
    soundEffects.playSuccess();
    onSaveToAtlas(selectedCountry.id);
    setIsSavedAnimation(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsSavedAnimation(false);
    }, 2200);
  };

  const isSaved = savedCountryIds.has(selectedCountry.id);

  return (
    <div className="flex flex-col w-full pb-6 max-w-4xl mx-auto">
      {/* Top Filter & Toggle Control Bar */}
      <section className="px-4 py-3 bg-white shadow-xs border-b border-[#eaedff] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006194] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              travel_explore
            </span>
            <h2 className="text-[20px] font-bold text-[#131b2e]">대륙과 대양 탐험</h2>
          </div>

          {/* 5 Oceans Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setOceanVisible(!oceanVisible);
              }}
              className={`h-9 px-3 rounded-full flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer select-none ${
                oceanVisible
                  ? 'bg-[#86f2e4] text-[#005049] font-bold'
                  : 'bg-[#e2e7ff] text-[#3f4850]'
              }`}
              title="지도 상 5대양 이름 표시 전환"
            >
              <span className="material-symbols-outlined text-[18px]">water</span>
              <span className="text-[13px] font-bold">5대양 <span>{oceanVisible ? 'ON' : 'OFF'}</span></span>
            </button>
          </div>
        </div>

        {/* Continent Filter Pills (Horizontally Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 touch-pan-x">
          {continentButtons.map((btn) => {
            const isActive = selectedContinent === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => handleContinentFilter(btn.id)}
                className={`flex-shrink-0 h-9 px-3.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Map Viewport */}
      <section className="relative w-full overflow-hidden bg-[#e0f0fa] border-b border-[#bfc7d2]/40" style={{ height: '390px' }}>
        {/* Subtle coordinate dot grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#006194 0.85px, transparent 0.85px)', 
            backgroundSize: '24px 24px' 
          }}
        />

        {/* Floating Zoom & Compass Toolbar (Top Left) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 shadow-md rounded-2xl bg-white/90 backdrop-blur-md p-1 border border-[#eaedff]">
          <button
            type="button"
            onClick={() => handleZoom(0.25)}
            aria-label="지도 확대"
            title="지도 확대 (+)"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <div className="w-5 h-[1px] bg-[#bfc7d2]/40 self-center" />
          <button
            type="button"
            onClick={() => handleZoom(-0.25)}
            aria-label="지도 축소"
            title="지도 축소 (-)"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <div className="w-5 h-[1px] bg-[#bfc7d2]/40 self-center" />
          <button
            type="button"
            onClick={handleResetMap}
            aria-label="초기 지도 복원"
            title="전체 지도 위치 초기화"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#006194] hover:bg-[#eaedff] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
          </button>
        </div>

        {/* 4-Direction Compass Rose Indicator (Top Right) */}
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-md border border-[#eaedff] flex items-center gap-2 pointer-events-none select-none">
          <div className="relative w-8 h-8 flex items-center justify-center text-[#006194]">
            <span className="material-symbols-outlined text-[26px]">navigation</span>
            <span className="absolute -top-1 text-[9px] font-extrabold text-[#ba1a1a]">N</span>
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-[10px] text-[#707881] font-extrabold uppercase leading-tight">방위표</span>
            <span className="text-[13px] text-[#131b2e] font-bold">4방위</span>
          </div>
        </div>

        {/* SVG World Map */}
        <div className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden">
          <svg
            id="worldMapSvg"
            viewBox="0 0 1000 520"
            className="w-full h-full select-none transform origin-center transition-all duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              <radialGradient id="koreaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#006194" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#006194" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#006194" stopOpacity="0" />
              </radialGradient>
              <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Parallels and Meridians Grid (위선과 경선) */}
            <g id="gridLines" opacity="0.3" stroke="#006194" strokeDasharray="3 3">
              {/* Equator (적도 - 빨간 실선) */}
              <line x1="0" y1="260" x2="1000" y2="260" stroke="#ba1a1a" strokeWidth="1.5" strokeDasharray="none" />
              <line x1="0" y1="130" x2="1000" y2="130" strokeWidth="0.8" />
              <line x1="0" y1="390" x2="1000" y2="390" strokeWidth="0.8" />
              <line x1="250" y1="0" x2="250" y2="520" strokeWidth="0.8" />
              {/* Prime Meridian (본초자오선) */}
              <line x1="500" y1="0" x2="500" y2="520" strokeWidth="1.2" stroke="#004b73" />
              <line x1="750" y1="0" x2="750" y2="520" strokeWidth="0.8" />
            </g>

            {/* Equator Label */}
            <text x="30" y="254" fill="#ba1a1a" fontSize="10" fontWeight="bold">
              적도 (Equator 0°)
            </text>

            {/* Continents Layer (7 Continents) */}
            <g id="continentsLayer" className="transition-opacity duration-300">
              {/* North America */}
              <path
                id="cont-namerica"
                d="M120,70 L240,65 L270,95 L220,130 L250,170 L210,210 L160,225 L150,195 L110,140 Z"
                fill="#93ccff"
                opacity={selectedContinent === 'all' || selectedContinent === 'namerica' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => {
                  handleContinentFilter('namerica');
                  const c = COUNTRIES_DATA.find(x => x.id === 'canada');
                  if (c) setSelectedCountry(c);
                }}
              />
              {/* South America */}
              <path
                id="cont-samerica"
                d="M210,240 L280,265 L270,355 L240,410 L215,370 L195,280 Z"
                fill="#6bd8cb"
                opacity={selectedContinent === 'all' || selectedContinent === 'samerica' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => {
                  handleContinentFilter('samerica');
                  const c = COUNTRIES_DATA.find(x => x.id === 'brazil');
                  if (c) setSelectedCountry(c);
                }}
              />
              {/* Europe */}
              <path
                id="cont-europe"
                d="M460,85 L545,80 L560,145 L490,165 L445,130 Z"
                fill="#dae2fd"
                opacity={selectedContinent === 'all' || selectedContinent === 'europe' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => {
                  handleContinentFilter('europe');
                  const c = COUNTRIES_DATA.find(x => x.id === 'france');
                  if (c) setSelectedCountry(c);
                }}
              />
              {/* Africa */}
              <path
                id="cont-africa"
                d="M460,185 L560,180 L585,260 L545,360 L480,335 L445,240 Z"
                fill="#ffddb8"
                opacity={selectedContinent === 'all' || selectedContinent === 'africa' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => {
                  handleContinentFilter('africa');
                  const c = COUNTRIES_DATA.find(x => x.id === 'egypt');
                  if (c) setSelectedCountry(c);
                }}
              />
              {/* Asia */}
              <path
                id="cont-asia"
                d="M555,80 L840,75 L860,130 L790,210 L730,235 L620,245 L560,170 Z"
                fill="#86f2e4"
                opacity={selectedContinent === 'all' || selectedContinent === 'asia' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => {
                  handleContinentFilter('asia');
                  const c = COUNTRIES_DATA.find(x => x.id === 'korea');
                  if (c) setSelectedCountry(c);
                }}
              />
              {/* Oceania */}
              <path
                id="cont-oceania"
                d="M760,295 L870,290 L895,375 L800,390 L750,335 Z"
                fill="#ffb95f"
                opacity={selectedContinent === 'all' || selectedContinent === 'oceania' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => handleContinentFilter('oceania')}
              />
              {/* Antarctica */}
              <path
                id="cont-antarctica"
                d="M120,480 L880,480 L850,515 L150,515 Z"
                fill="#cce5ff"
                opacity={selectedContinent === 'all' || selectedContinent === 'antarctica' ? 1 : 0.25}
                className="cursor-pointer transition-all hover:opacity-90"
                onClick={() => handleContinentFilter('antarctica')}
              />
            </g>

            {/* Continent Name Tags */}
            <g id="continentTags" className="pointer-events-none select-none">
              <rect x="150" y="130" width="70" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="185" y="145" textAnchor="middle" fill="#004b73" fontSize="11" fontWeight="bold">북아메리카</text>

              <rect x="210" y="315" width="70" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="245" y="330" textAnchor="middle" fill="#005049" fontSize="11" fontWeight="bold">남아메리카</text>

              <rect x="475" y="115" width="50" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="500" y="130" textAnchor="middle" fill="#131b2e" fontSize="11" fontWeight="bold">유럽</text>

              <rect x="485" y="260" width="60" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="515" y="275" textAnchor="middle" fill="#653e00" fontSize="11" fontWeight="bold">아프리카</text>

              <rect x="670" y="150" width="56" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="698" y="165" textAnchor="middle" fill="#005049" fontSize="11" fontWeight="bold">아시아</text>

              <rect x="785" y="330" width="68" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="819" y="345" textAnchor="middle" fill="#825100" fontSize="11" fontWeight="bold">오세아니아</text>

              <rect x="470" y="488" width="60" height="22" rx="11" fill="#ffffff" filter="url(#cardShadow)" />
              <text x="500" y="503" textAnchor="middle" fill="#004b73" fontSize="11" fontWeight="bold">남극대륙</text>
            </g>

            {/* 5 Oceans Group (Toggled ON/OFF) */}
            <g id="oceansGroup" className="transition-opacity duration-300 pointer-events-none" style={{ opacity: oceanVisible ? 1 : 0 }}>
              {/* Pacific Ocean (태평양 East and West) */}
              <g transform="translate(880, 210)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="13" fontWeight="bold">태평양</text>
              </g>
              <g transform="translate(70, 210)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="13" fontWeight="bold">태평양</text>
              </g>
              {/* Atlantic Ocean (대서양) */}
              <g transform="translate(360, 240)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="13" fontWeight="bold">대서양</text>
              </g>
              {/* Indian Ocean (인도양) */}
              <g transform="translate(650, 310)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="13" fontWeight="bold">인도양</text>
              </g>
              {/* Arctic Ocean (북극해) */}
              <g transform="translate(500, 35)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="12" fontWeight="bold">북극해</text>
              </g>
              {/* Southern Ocean (남극해) */}
              <g transform="translate(500, 445)">
                <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#006194" fillOpacity="0.14" />
                <text x="0" y="4" textAnchor="middle" fill="#006194" fontSize="12" fontWeight="bold">남극해</text>
              </g>
            </g>

            {/* Clickable Pins for Featured Countries */}
            {COUNTRIES_DATA.map((country) => {
              const isSelected = selectedCountry.id === country.id;
              return (
                <g
                  key={country.id}
                  id={`pin-${country.id}`}
                  transform={`translate(${country.coordinates.x}, ${country.coordinates.y})`}
                  className="cursor-pointer transition-transform duration-200 hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCountryPinClick(country);
                  }}
                >
                  {isSelected && (
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill="url(#koreaGlow)"
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                  )}
                  <circle cx="0" cy="0" r="14" fill="#006194" fillOpacity={isSelected ? 0.3 : 0.15} />
                  <path
                    d="M0,4 C-7,4 -10,-3 -10,-8 C-10,-15 0,-24 0,-24 C0,-24 10,-15 10,-8 C10,-3 7,4 0,4 Z"
                    fill={isSelected ? "#ba1a1a" : "#006194"}
                    filter="url(#cardShadow)"
                    className={pinBounce && isSelected ? "animate-bounce" : ""}
                  />
                  <circle cx="0" cy="-8" r="4" fill="#ffffff" />
                  <text
                    x="0"
                    y="-28"
                    textAnchor="middle"
                    fill={isSelected ? "#ba1a1a" : "#004b73"}
                    fontSize="11"
                    fontWeight="800"
                    filter="url(#cardShadow)"
                  >
                    {country.name} {country.flagEmoji}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Coordinates Indicator Bar */}
        <div className="absolute bottom-2 inset-x-4 flex justify-between items-center pointer-events-none text-[#707881] text-[11px] font-bold bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-xs">
          <span>서경 180°</span>
          <span>본초자오선 0°</span>
          <span>동경 180°</span>
        </div>
      </section>

      {/* Bottom Details Drawer / Sheet */}
      <section className="px-4 py-4 -mt-3 bg-white rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.06)] relative z-30 flex flex-col gap-4 border-t border-[#eaedff]">
        {/* Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-[#e2e7ff] self-center" />

        {/* Country Header Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-[34px] shadow-xs flex-shrink-0 border border-[#eaedff]">
              {selectedCountry.flagEmoji}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[20px] font-extrabold text-[#131b2e] leading-tight">
                  {selectedCountry.name}
                </h3>
                <span className="text-[13px] text-[#707881] font-normal truncate">
                  {selectedCountry.nameEn}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#006a61] font-bold bg-[#86f2e4]/50 px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[13px]">public</span>
                  {selectedCountry.continentName}
                </span>
                <span className="text-[13px] text-[#3f4850] font-medium">
                  수도: <strong className="text-[#131b2e] font-bold">{selectedCountry.capital}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Favorite / Bookmark Button */}
          <button
            type="button"
            onClick={handleSaveCountry}
            aria-label="즐겨찾기 저장"
            title={isSaved ? "도감에 저장됨" : "도감에 저장하기"}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#ffddb8] text-[#825100]'
                : 'bg-[#eaedff] text-[#707881] hover:bg-[#dae2fd]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
          </button>
        </div>

        {/* Grade 6 Social Studies Guide Box */}
        <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex flex-col gap-2 border border-[#eaedff]">
          <div className="flex items-center gap-1 text-[#006194]">
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span className="text-[13px] font-bold">초등 6학년 지리 길라잡이</span>
          </div>
          <p className="text-[14px] text-[#3f4850] leading-relaxed">
            {selectedCountry.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-[#707881] font-bold mr-1">대표 지형 &amp; 지명:</span>
            {selectedCountry.keyLandmarks.map((lm, idx) => (
              <span
                key={idx}
                className="text-[12px] px-2.5 py-0.5 rounded-full bg-white text-[#131b2e] font-semibold shadow-xs border border-[#eaedff]"
              >
                {lm}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Photo Inspiration Cards */}
        {selectedCountry.photos && selectedCountry.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {selectedCountry.photos.map((photo, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden h-28 shadow-xs bg-[#eaedff] group">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="text-white text-[11px] font-bold line-clamp-1">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons: "자세히 보기" & "도감에 저장하기" */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onOpenCountryDetail(selectedCountry);
            }}
            className="h-12 rounded-full bg-[#eaedff] text-[#006194] text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer hover:bg-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-[20px]">info</span>
            <span>자세히 보기</span>
          </button>

          <button
            type="button"
            onClick={handleSaveCountry}
            className={`h-12 rounded-full text-white text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
              isSavedAnimation || isSaved
                ? 'bg-[#006a61] hover:bg-[#005049]'
                : 'bg-[#007bb9] hover:bg-[#006194]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isSavedAnimation ? 'check_circle' : 'bookmark_add'}
            </span>
            <span>{isSavedAnimation ? '도감 저장 완료!' : isSaved ? '도감에 수집됨 ⭐️' : '도감에 저장하기 ⭐️'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
