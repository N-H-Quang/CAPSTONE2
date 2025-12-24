export interface UserResponse {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
  maLoaiNguoiDung?: string;
  accessToken?: string;
}

export interface BannerResponse {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
}

export interface MovieResponse {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface TheaterResponse {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface TheaterDetailResponse {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: DanhSachRapResponse[];
}

export interface DanhSachRapResponse {
  maRap: number;
  tenRap: string;
}

export interface TheaterShowtimeResponse {
  lstCumRap: LstCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}

export interface LstCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface DanhSachPhim {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean | null;
  dangChieu: boolean | null;
  sapChieu: boolean | null;
}

export interface LstLichChieuTheoPhim {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}

export enum LoaiGhe {
  Thuong = "Thuong",
  Vip = "Vip",
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null;
}

export interface SeatBookingResponse {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface PaginatedResponse<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[];
}


