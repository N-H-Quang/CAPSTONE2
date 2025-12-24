import React from "react";
import TheaterList from "./TheaterList";
import CinemaList from "./CinemaList";
import MapPanel from "./MapPanel";
import InfoCard from "./InfoCard";
import theaterApi from "@/apis/theater.api";
import { useQuery } from "@tanstack/react-query";
import { TheaterDetailResponse, TheaterResponse } from "@/@type/response.type";

const SelectMovieTheater: React.FC = () => {
  const [selectedHeThongRap, setSelectedHeThongRap] = React.useState<TheaterResponse | null>(null);
  const [selectedCumRap, setSelectedCumRap] = React.useState<TheaterDetailResponse | null>(null);

  const handleHeThongRapClick = (maHeThongRap: string) => {
    if (selectedHeThongRap?.maHeThongRap === maHeThongRap) {
      setSelectedHeThongRap(null);
    } else {
      setSelectedHeThongRap(theaters?.data.content.find(ht => ht.maHeThongRap === maHeThongRap) || null);
    }
  };

  const { data: theaters } = useQuery({
    queryKey: ["theaters"],
    queryFn: theaterApi.getTheaterList,
    staleTime: 1000 * 60 * 5,
  });

    const { data: theaterDetails, isLoading: loading } = useQuery({
    queryKey: ["theaterDetails", selectedHeThongRap?.maHeThongRap],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000);
      return theaterApi.getTheaterDetail(selectedHeThongRap?.maHeThongRap || "", controller.signal);
    },
    enabled: selectedHeThongRap !== null,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Left Panel - Hệ Thống Rạp */}
      <div className="w-full md:w-72 h-50 md:h-auto bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Hệ Thống Rạp</h2>
        </div>
        <div className="border border-indigo-600 rounded-lg md:border-0">
          <TheaterList
            heThongRapList={theaters?.data.content || []}
            selectedHeThongRap={selectedHeThongRap}
            onSelect={handleHeThongRapClick}
          />
        </div>
      </div>

      {/* Middle Panel - Danh Sách Cụm Rạp */}
      <div className="w-full md:w-96 bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Danh Sách Rạp</h2>
          {selectedHeThongRap && (
            <p className="text-sm text-blue-600 font-medium mt-1">
              {
                theaters?.data.content.find(
                  (ht) => ht.maHeThongRap === selectedHeThongRap.maHeThongRap
                )?.tenHeThongRap
              }
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {(theaterDetails?.data?.content??[]).length > 0
              ? `${theaterDetails?.data?.content.length} rạp`
              : "Chọn hệ thống rạp"}
          </p>
        </div>

        <div>
          <CinemaList
            cumRapList={theaterDetails?.data?.content || []}
            selectedCumRap={selectedCumRap}
            onSelect={(cumRap) => {
              setSelectedCumRap(cumRap);
            }}
            loading={loading}
            logo={selectedHeThongRap?.logo || ""}
          />
        </div>
      </div>

      {/* Right Panel - Map + Info */}
      <div className="hidden md:flex md:flex-1 relative">
        <MapPanel
          cumRapList={theaterDetails?.data?.content || []}
          selectedCumRap={selectedCumRap}
          setSelectedCumRap={setSelectedCumRap}
          heThongRapList={theaters?.data.content || []}
          selectedHeThongRap={selectedHeThongRap}
        />

        <InfoCard
          selectedCumRap={selectedCumRap}
          heThongLogo={
           selectedHeThongRap?.logo || ""
          }
        />

        {(theaterDetails?.data?.content??[]).length > 0 && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
            <p className="text-xs text-gray-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              <span className="font-semibold text-gray-800">
                {(theaterDetails?.data?.content??[]).length}
              </span>{" "}
              rạp chiếu phim
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMovieTheater;
