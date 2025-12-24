import React from 'react';
import type { TheaterDetailResponse } from '@/@type/response.type';

interface Props {
  selectedCumRap: TheaterDetailResponse | null;
  heThongLogo?: string;
}

const InfoCard: React.FC<Props> = ({ selectedCumRap, heThongLogo }) => {
  if (!selectedCumRap) return null;

  return (
    <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow-2xl p-5 max-w-md animate-slideUp">
      <div className="flex items-start">
        <div className="w-12 h-12 bg-white rounded-lg shrink-0 overflow-hidden shadow border border-gray-200">
          <img src={heThongLogo} alt="Logo" className="w-full h-full object-contain p-1" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedCumRap.tenCumRap}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{selectedCumRap.diaChi}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Chỉ Đường
        </button>
        <button className="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors shadow-md hover:shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          Lịch Chiếu
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
