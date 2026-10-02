import React, { useState } from 'react';
import { soundEffects } from '../data/atlasData';

interface TeacherDashboardModalProps {
  onClose: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'class-status' | 'worksheet'>('curriculum');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const handlePrintWorksheet = () => {
    soundEffects.playSuccess();
    window.print();
  };

  const handleCopyLink = () => {
    soundEffects.playPop();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-[#eaedff] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#eaedff] flex items-center justify-between bg-[#f2f3ff] rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#006194] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#006194] tracking-wider uppercase">
                EDUCATOR MANAGEMENT CONSOLE
              </span>
              <h2 className="text-[19px] font-extrabold text-[#131b2e]">
                선생님 전용 학습 관리 대시보드
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white text-[#707881] flex items-center justify-center hover:text-[#131b2e] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#eaedff] px-4 pt-2 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-4 text-[13px] font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-[#006194] text-[#006194]'
                : 'border-transparent text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            교육과정 성취기준
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('class-status')}
            className={`py-3 px-4 text-[13px] font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'class-status'
                ? 'border-[#006194] text-[#006194]'
                : 'border-transparent text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            학급 탐험 현황 (6-2반)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('worksheet')}
            className={`py-3 px-4 text-[13px] font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'worksheet'
                ? 'border-[#006194] text-[#006194]'
                : 'border-transparent text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            수업용 활동지 인쇄
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 text-[#131b2e]">
          {activeTab === 'curriculum' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#006194] font-bold text-[13px] mb-1">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>[6사01-01] 세계 여러 대륙과 대양의 위치와 특징 파악</span>
                </div>
                <p className="text-[13px] text-[#3f4850] leading-relaxed">
                  지구의 7대륙과 5대양을 지도에서 식별하고, 각 대륙에 속한 주요 국가들의 지리적 환경과 위치를 경위도 및 방위표를 활용하여 탐구합니다.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#006a61] font-bold text-[13px] mb-1">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>[6사01-02] 주요 국가의 국기와 수도, 문화적 랜드마크 탐색</span>
                </div>
                <p className="text-[13px] text-[#3f4850] leading-relaxed">
                  세계 주요 국가의 국기 디자인 상징성을 이해하고, 수도와 대표적인 자연·인문 지형(피라미드, 히말라야, 나일강 등)을 매칭하여 글로벌 시민 의식을 기릅니다.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#cce5ff]/40 text-[#001d31] text-[12px]">
                <span>단원: 2022 개정 초등 6학년 1학기 사회 1단원 지구, 대륙 그리고 국가들</span>
                <span className="font-bold text-[#006194]">100% 반영 완료</span>
              </div>
            </div>
          )}

          {activeTab === 'class-status' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
                  <span className="text-[11px] text-[#707881]">등록 학생수</span>
                  <p className="text-[20px] font-extrabold text-[#131b2e]">24명</p>
                  <span className="text-[10px] text-[#006a61] font-bold">전원 참여 중</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
                  <span className="text-[11px] text-[#707881]">평균 진도율</span>
                  <p className="text-[20px] font-extrabold text-[#006194]">78%</p>
                  <span className="text-[10px] text-[#006194] font-bold">+12% 전주대비</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
                  <span className="text-[11px] text-[#707881]">국기퀴즈 평균</span>
                  <p className="text-[20px] font-extrabold text-[#825100]">92점</p>
                  <span className="text-[10px] text-[#825100] font-bold">우수 성취</span>
                </div>
              </div>

              <div className="border border-[#eaedff] rounded-2xl p-3 bg-white space-y-2">
                <span className="text-[12px] font-bold text-[#131b2e]">학생별 최근 탐험 현황</span>
                <div className="space-y-1.5 text-[12px]">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#f2f3ff]">
                    <span className="font-semibold">이지우 (본 앱 사용자)</span>
                    <span className="text-[#006194] font-bold">28개국 수집 • 배지 4개</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#f2f3ff]">
                    <span className="font-semibold">김민준</span>
                    <span className="text-[#006a61] font-bold">31개국 수집 • 배지 5개</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#f2f3ff]">
                    <span className="font-semibold">박서아</span>
                    <span className="text-[#006194] font-bold">25개국 수집 • 배지 3개</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'worksheet' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-center space-y-2">
                <span className="material-symbols-outlined text-[36px] text-[#006194]">description</span>
                <h4 className="text-[16px] font-bold text-[#131b2e]">6학년 1학기 사회과 지리 탐구 활동지</h4>
                <p className="text-[13px] text-[#3f4850]">
                  세계 7대륙과 5대양 표시하기, 대표 국기 연결 퀴즈, 랜드마크 백지도가 수록된 A4 활동지 세트입니다.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintWorksheet}
                    className="px-5 py-2.5 rounded-full bg-[#006194] text-white font-bold text-[13px] flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>활동지 인쇄 (A4)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-full bg-[#eaedff] text-[#006194] font-bold text-[13px] flex items-center gap-1.5 hover:bg-[#dae2fd] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span>수업 링크 복사</span>
                  </button>
                </div>
                {copiedNotification && (
                  <p className="text-[11px] text-[#006a61] font-bold">클립보드에 링크가 복사되었습니다!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eaedff] bg-white flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#006194] text-white font-bold text-[14px] shadow-xs cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
