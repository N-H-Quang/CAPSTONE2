import { LstLichChieuTheoPhim, MovieResponse } from "@/@type/response.type";
import theaterApi from "@/apis/theater.api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo, useState } from "react";

const initialFilter: { movieId: string; theaterId: string; location: string } =
  {
    movieId: "",
    theaterId: "",
    location: "",
  };

type Props = {
  movies: MovieResponse[];
};

function FiltersBar({ movies }: Props) {
  const [filter, setFilter] = useState(initialFilter);

  const { data: theaters } = useQuery({
    queryKey: ["theaters"],
    queryFn: theaterApi.getTheaterList,
    staleTime: 1000 * 60 * 5,
  });

  const { data: theaterDetails } = useQuery({
    queryKey: ["theaterDetails", filter.theaterId],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000);
      return theaterApi.getTheaterDetail(filter.theaterId, controller.signal);
    },
    enabled: !!filter.theaterId,
    staleTime: 1000 * 60 * 5,
  });

  const { data: theaterShowtimes } = useQuery({
    queryKey: ["theaterShowtimes", filter.theaterId],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000);
      return theaterApi.getTheaterShowtime(filter.theaterId, controller.signal);
    },
    enabled: !!filter.theaterId && !!filter.movieId && !!filter.location,
    staleTime: 1000 * 60 * 5,
  });

  const handleChangeFilter = (
    type: "movieId" | "theaterId" | "location",
    value: string
  ) => {
    setFilter({
      ...filter,
      [type]: value,
    });
  };

  const filteredShowtimes: LstLichChieuTheoPhim[] = useMemo(() => {
    if (!theaterShowtimes) return [];
    const showtimes = theaterShowtimes.data.content
      .flatMap((theater) => theater.lstCumRap)
      .filter((cumRap) => cumRap.maCumRap === filter.location)
      .flatMap((cumRap) => cumRap.danhSachPhim)
      .filter((phim) => phim.maPhim.toString() === filter.movieId)
      .flatMap((phim) => phim.lstLichChieuTheoPhim);
    return showtimes;
  }, [theaterShowtimes, filter.location, filter.movieId]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
      <SelectGroup>
        <Select
          onValueChange={(value) => handleChangeFilter("movieId", value)}
          value={filter.movieId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Movie" />
          </SelectTrigger>
          <SelectContent>
            {movies?.map((movie) => (
              <SelectItem key={movie.maPhim} value={movie.maPhim.toString()}>
                {movie.tenPhim}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>

      <SelectGroup>
        <Select
          onValueChange={(value) => handleChangeFilter("theaterId", value)}
          value={filter.theaterId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Theater" />
          </SelectTrigger>
          <SelectContent>
            {theaters?.data.content.map((theater) => (
              <SelectItem
                key={theater.maHeThongRap}
                value={theater.maHeThongRap}
              >
                {theater.tenHeThongRap}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>

      <SelectGroup>
        <Select
          onValueChange={(value) => handleChangeFilter("location", value)}
          value={filter.location}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {theaterDetails?.data.content.map((theaterDetail) => (
              <SelectItem
                key={theaterDetail.maCumRap}
                value={theaterDetail.maCumRap}
              >
                {theaterDetail.tenCumRap}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>
      <SelectGroup>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Showtime" />
          </SelectTrigger>
          <SelectContent>
            {filteredShowtimes.map((showtime) => (
              <SelectItem
                key={showtime.maLichChieu}
                value={showtime.maLichChieu.toString()}
              >
                {new Date(showtime.ngayChieuGioChieu).toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SelectGroup>

      <div className="flex items-center">
        <Button className="w-full">Book Now</Button>
      </div>
    </div>
  );
}

export default memo(FiltersBar, (prevProps, nextProps) => {
  return prevProps.movies === nextProps.movies;
});
