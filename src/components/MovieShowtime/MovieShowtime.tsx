import { useState, useMemo } from "react";
import TheaterList from "../SelectMovieTheater/TheaterList";
import DateSelector, { DateItem } from "./DateSelector";
import ShowtimeDetail from "./ShowtimeDetail";
import theaterApi from "@/apis/theater.api";
import { useQuery } from "@tanstack/react-query";
import { CumRapWithShowtimes } from "@/@type/model.type";

const initialFilter = {
  theaterId: "",
  selectedDate: new Date().toISOString().split("T")[0],
};

function MovieShowtime() {
  const [filter, setFilter] = useState(initialFilter);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);

  const { data: theaters } = useQuery({
    queryKey: ["theaters"],
    queryFn: theaterApi.getTheaterList,
    staleTime: 1000 * 60 * 5,
  });

  const { data: theaterShowtimes } = useQuery({
    queryKey: ["theaterShowtimes", filter.theaterId],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000);
      return theaterApi.getTheaterShowtime(filter.theaterId, controller.signal);
    },
    enabled: !!filter.theaterId,
    staleTime: 1000 * 60 * 5,
  });

  const heThongRapList = useMemo(() => {
    return theaters?.data.content || [];
  }, [theaters]);

  const selectedTheater = useMemo(() => {
    if (!filter.theaterId) return null;
    return (
      heThongRapList.find((t) => t.maHeThongRap === filter.theaterId) || null
    );
  }, [filter.theaterId, heThongRapList]);

  const handleHeThongSelect = (maHeThongRap: string) => {
    setFilter({
      ...filter,
      theaterId: maHeThongRap,
    });
  };

  const fullDateRange: DateItem[] = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
        return { label: `${day}/${month}`, weekday };
      }),
    []
  );

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + index);
    setFilter({
      ...filter,
      selectedDate: selectedDate.toISOString().split("T")[0],
    });
  };

  const filteredCumRapList = useMemo<CumRapWithShowtimes[]>(() => {
    if (!theaterShowtimes || !filter.selectedDate) return [];

    const allCumRaps = theaterShowtimes.data.content.flatMap(
      (theater) => theater.lstCumRap
    );

    return allCumRaps
      .map((cumRap) => {
        const showtimes = cumRap.danhSachPhim
          .flatMap((phim) => phim.lstLichChieuTheoPhim)
          .filter((lichChieu) => {
            const showtimeDate = new Date(lichChieu.ngayChieuGioChieu)
              .toISOString()
              .split("T")[0];
            return showtimeDate === filter.selectedDate;
          })
          .map((lichChieu) => {
            const hour = new Date(
              lichChieu.ngayChieuGioChieu
            ).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            });

            return {
              hour,
              maLichChieu: lichChieu.maLichChieu,
            };
          })
          .sort();

        return {
          ...cumRap,
          showtimes,
        };
      })
      .filter((cumRap) => cumRap.showtimes.length > 0);
  }, [theaterShowtimes, filter.selectedDate]);

  const VISIBLE_DAYS = 6;

  return (
    <div className="relative z-10 text-black bg-white rounded-lg shadow-lg min-h-[200px] mt-4 py-2 px-6">
      <h2 className="text-black text-xl font-semibold mt-4 relative inline-block after:content-[''] after:block after:w-full after:h-0.5 after:bg-black/20 after:mt-2 mb-4">
        Show Time
      </h2>
      <div className="flex flex-col md:flex-row min-h-[100px] bg-gray-100">
        {/* Theater List */}
        <div className="w-full md:w-fit bg-white border border-indigo-600 md:border-r md:border-gray-200 md:border-t-0 md:border-l-0 md:border-b-0 overflow-y-auto">
          <TheaterList
            heThongRapList={heThongRapList}
            selectedHeThongRap={selectedTheater}
            onSelect={handleHeThongSelect}
            showIconOnly={true}
          />
        </div>

        {/* Date Selector and Showtime Details */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div>
            <DateSelector
              fullDateRange={fullDateRange}
              windowStart={windowStart}
              visibleDays={VISIBLE_DAYS}
              selectedDateIndex={selectedDateIndex}
              setWindowStart={setWindowStart}
              setSelectedDateIndex={handleDateSelect}
            />

            <ShowtimeDetail cumRapList={filteredCumRapList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieShowtime;
