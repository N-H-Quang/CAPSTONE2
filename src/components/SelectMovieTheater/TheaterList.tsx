import { TheaterResponse } from "@/@type/response.type";
import React from "react";
interface Props {
  heThongRapList: TheaterResponse[];
  selectedHeThongRap: TheaterResponse | null;
  onSelect: (ma: string) => void;
  showIconOnly?: boolean;
}

const TheaterList: React.FC<Props> = ({
  heThongRapList,
  selectedHeThongRap,
  onSelect,
  showIconOnly = false,
}) => {
  return (
    <>
      <div className="md:hidden px-3 py-2">
        <div className="overflow-x-auto">
          <div className="flex gap-3 items-center">
            {heThongRapList.map((heThong) => {
              const isSelected = selectedHeThongRap?.maHeThongRap === heThong.maHeThongRap;
              return (
                <button
                  key={heThong.maHeThongRap}
                  onClick={() => onSelect(heThong.maHeThongRap)}
                  className={`shrink-0 flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 whitespace-nowrap ${
                    isSelected
                      ? "bg-black text-white border border-black"
                      : "bg-white text-black/80 border border-gray-200"
                  }`}
                >
                  <img
                    src={heThong.logo}
                    alt={heThong.tenHeThongRap}
                    className="w-8 h-8 object-contain"
                  />
                  {!showIconOnly && (
                    <div>
                      <div className="text-sm font-medium">
                        {heThong.tenHeThongRap}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:block pr-4 pt-4">
        {heThongRapList.map((heThong) => {
          const isSelected = selectedHeThongRap?.maHeThongRap === heThong.maHeThongRap;

          return (
            <button
              key={heThong.maHeThongRap}
              onClick={() => onSelect(heThong.maHeThongRap)}
              className={`w-full flex items-center p-4 mb-3 rounded-xl transition-all duration-200 ${
                isSelected
                  ? "bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-500 shadow-lg"
                  : "bg-gray-50 border-2 border-gray/50 hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-indigo-600">
                <img
                  src={heThong.logo}
                  alt={heThong.tenHeThongRap}
                  className="w-12 h-12 object-contain"
                />
              </div>
              {!showIconOnly && (
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">
                    {heThong.tenHeThongRap}
                  </h3>
                </div>
              )}
              {isSelected && (
                <div className="ml-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TheaterList;
