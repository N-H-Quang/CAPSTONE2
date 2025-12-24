import { Banner } from "@/@type/model.type";
import { MovieResponse, SeatBookingResponse } from "@/@type/response.type";
import { APIResponse } from "@/@type/utils.type";
import http from "@/utils/http";

export const URL_Banner = "QuanLyPhim/LayDanhSachBanner";
export const URL_MovieList = "QuanLyPhim/LayDanhSachPhim";
export const URL_MovieDetail = "QuanLyPhim/LayThongTinPhim";
export const URL_QuanLyDatVe = "QuanLyDatVe/LayDanhSachPhongVe";
const movieApi = {
  getBanners: () => {
    return http.get<APIResponse<Banner[]>>(URL_Banner);
  },
  getMovieList: () => {
    return http.get<APIResponse<MovieResponse[]>>(URL_MovieList);
  },
  getMovieDetail: (movieId: string) => {
    return http.get<APIResponse<MovieResponse>>(URL_MovieDetail, {
      params: {
        MaPhim: movieId,
      },
    });
  },
  getQuanLyDatVe: (movieId: string) => {
    return http.get<APIResponse<SeatBookingResponse>>(URL_QuanLyDatVe, {
      params: {
        MaLichChieu: movieId,
      },
    });
  },
  orderTickets: (data: {
    maLichChieu: number;
    danhSachVe: {
      maGhe: number;
      giaVe: number;
    }[];
  }) => {
    return http.post<APIResponse<string>>("QuanLyDatVe/DatVe", data);
  }
};

export default movieApi;
