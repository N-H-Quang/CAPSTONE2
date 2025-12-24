import { TheaterDetailResponse } from '@/@type/response.type';
import React from 'react';

interface Props {
  cumRapList: TheaterDetailResponse[];
  selectedCumRap: TheaterDetailResponse | null;
  onSelect: (cumRap: TheaterDetailResponse) => void;
  loading: boolean;
  logo: string;
}

const CinemaList: React.FC<Props> = ({ cumRapList, selectedCumRap, onSelect, loading, logo }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cumRapList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-400">
        <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <p className="text-sm font-medium">Chọn hệ thống rạp</p>
        <p className="text-xs mt-1">để xem danh sách các rạp</p>
      </div>
    );
  }

  return (
    <div>
      {cumRapList.map((cumRap, index) => {
        const isSelected = selectedCumRap?.maCumRap === cumRap.maCumRap;

        return (
          <div
            key={cumRap.maCumRap}
            onClick={() => onSelect(cumRap)}
            className={`flex items-start p-4 cursor-pointer transition-all duration-200 ${index !== cumRapList.length - 1 ? 'border-b border-gray-200' : ''} ${
              isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600 shadow-inner' : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-16 h-16 bg-white rounded-lg shrink-0 overflow-hidden shadow-md border border-gray-200">
              <img
                src={logo}
                alt={cumRap.tenCumRap}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Cinema';
                }}
              />
            </div>

            <div className="ml-4 flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 mb-2">{cumRap.tenCumRap}</h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{cumRap.diaChi}</p>
              {isSelected && (
                <div className="mt-2 flex items-center text-xs text-blue-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Xem trên bản đồ
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CinemaList;
