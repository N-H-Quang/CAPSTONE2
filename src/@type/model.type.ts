import { Omit } from "lodash";
import { LstCumRap, UserResponse } from "./response.type";

export type UserProfile = Omit<UserResponse, "accessToken">;

export interface Banner {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

export interface CumRapWithShowtimes extends LstCumRap {
  showtimes?: {
    hour: string;
    maLichChieu: number;
  }[];
}