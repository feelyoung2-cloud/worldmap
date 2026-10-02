import React, { useState } from 'react';
import { LandmarkItem } from '../types';
import { soundEffects, speakKoreanText } from '../data/atlasData';
import confetti from 'canvas-confetti';

interface LandmarkModalProps {
  landmark: LandmarkItem | null;
  onClose: () => void;
  onStartQuiz: (landmarkName: string) => void;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  landmark,
  onClose,
  onStartQuiz
}) => {
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  if (!landmark) return null;

  const handleTestQuiz = (choice: string) => {
    setQuizAnswered(true);
    if (choice === landmark.continent || choice === '정답') {
      soundEffects.playSuccess();
      setIsCorrect(true);
      try {
        confetti({ particleCount: 30 });
      } catch {
        // ignore
      }
    } else {
      soundEffects.playPop();
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-[#eaedff] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Landmark Photo Banner */}
        <div className="relative h-48 w-full bg-[#eaedff] overflow-hidden">
          <img
            src={landmark.imgUrl}
            alt={landmark.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

          {/* Title on Photo */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[11px] font-bold">
                {landmark.categoryName}
              </span>
              <span className="text-[12px] text-white/80">{landmark.continent}</span>
            </div>
            <h2 className="text-[24px] font-extrabold drop-shadow-sm leading-tight">
              {landmark.name}
            </h2>
            <p className="text-[13px] text-white/90 drop-shadow-sm font-medium">
              {landmark.nameEn}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Highlight Fact Callout */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#ffddb8]/40 border border-[#ffddb8] text-[#2a1700]">
            <span className="material-symbols-outlined text-[#825100] text-[24px]">verified</span>
            <div>
              <span className="text-[11px] font-extrabold uppercase text-[#825100]">핵심 지리 팩트</span>
              <p className="text-[14px] font-bold">{landmark.highlightFact}</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-[#f2f3ff] p-4 rounded-2xl border border-[#eaedff]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-[#006194]">탐험 지형 정보</span>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  speakKoreanText(`${landmark.name}. ${landmark.description}`);
                }}
                className="flex items-center gap-1 text-[12px] font-bold text-[#006a61] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>설명 듣기</span>
              </button>
            </div>
            <p className="text-[14px] text-[#3f4850] leading-relaxed">
              {landmark.description}
            </p>
          </div>

          {/* Related Countries Tags */}
          <div>
            <span className="text-[12px] font-extrabold text-[#707881] uppercase tracking-wider block mb-2">
              관련 인접 국가
            </span>
            <div className="flex flex-wrap gap-1.5">
              {landmark.relatedCountries.map((rc, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white text-[#131b2e] font-semibold text-[12px] shadow-xs border border-[#eaedff]">
                  #{rc}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Check Mini Quiz */}
          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
            <div className="flex items-center gap-1.5 text-[#006194] font-bold text-[13px] mb-2">
              <span className="material-symbols-outlined text-[18px]">quiz</span>
              <span>확인 퀴즈: {landmark.name}은(는) 어느 대륙에 있을까요?</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTestQuiz(landmark.continent)}
                className="py-2.5 px-3 rounded-xl bg-white text-[#131b2e] text-[13px] font-bold shadow-xs hover:bg-[#cce5ff] border border-[#eaedff] cursor-pointer transition-colors"
              >
                {landmark.continent}
              </button>
              <button
                type="button"
                onClick={() => handleTestQuiz('오답')}
                className="py-2.5 px-3 rounded-xl bg-white text-[#131b2e] text-[13px] font-bold shadow-xs hover:bg-[#eaedff] border border-[#eaedff] cursor-pointer transition-colors"
              >
                남극 대륙
              </button>
            </div>

            {quizAnswered && (
              <div className={`mt-2.5 p-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 ${
                isCorrect ? 'bg-[#86f2e4] text-[#005049]' : 'bg-[#ffdad6] text-[#93000a]'
              }`}>
                <span className="material-symbols-outlined text-[16px]">
                  {isCorrect ? 'check_circle' : 'error'}
                </span>
                <span>{isCorrect ? '정답입니다! +15 XP 획득' : '다시 확인해 보세요!'}</span>
              </div>
            )}
          </div>

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
                soundEffects.playPop();
                onClose();
                onStartQuiz(landmark.name);
              }}
              className="flex-1 h-12 rounded-full bg-[#006194] text-white font-bold text-[14px] flex items-center justify-center gap-1.5 shadow-md hover:bg-[#007bb9] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">sports_esports</span>
              <span>퀴즈 도전하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
