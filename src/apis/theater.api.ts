import { TheaterDetailResponse, TheaterResponse, TheaterShowtimeResponse } from "@/@type/response.type";
import { APIResponse } from "@/@type/utils.type";
import http from "@/utils/http";

export const URL_THEATER = "QuanLyRap/LayThongTinHeThongRap";

export const URL_THEATER_DETAIL = "QuanLyRap/LayThongTinCumRapTheoHeThong";

export const URL_THEATER_SHOWTIME = "QuanLyRap/LayThongTinLichChieuHeThongRap";

const theaterApi = {
  getTheaterList: () => {
    return http.get<APIResponse<TheaterResponse[]>>(URL_THEATER);
  },
  getTheaterDetail: (theaterId: string, signal?: AbortSignal) => {
    return http.get<APIResponse<TheaterDetailResponse[]>>(
      URL_THEATER_DETAIL,
      {
        params: {
          maHeThongRap: theaterId,
        },
        signal,
      }
    );
  },
  getTheaterShowtime: (theaterId: string, signal?: AbortSignal) => {
    return http.get<APIResponse<TheaterShowtimeResponse[]>>(
      URL_THEATER_SHOWTIME,
      {
        params: {
          maHeThongRap: theaterId,
        },
        signal,
      }
    );
  }
};

export default theaterApi;
