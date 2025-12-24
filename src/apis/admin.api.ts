import { MovieResponse, UserResponse } from "@/@type/response.type";
import { APIResponse } from "@/@type/utils.type";
import http from "@/utils/http";

const adminApi = {
  getMovieListPagination: (params?: { page?: number; pageSize?: number; tenPhim?: string }) => {
    return http.get<APIResponse<{ items: MovieResponse[]; totalCount: number }>>(
      "QuanLyPhim/LayDanhSachPhimPhanTrang",
      { params }
    );
  },
  
  getMovieListWithPagination: (params?: { soTrang?: number; soPhanTuTrenTrang?: number }) => {
    return http.get<APIResponse<{ items: MovieResponse[]; totalCount: number }>>(
      "QuanLyPhim/LayDanhSachPhimPhanTrang",
      { params: { ...params, maNhom: 'GP01' } }
    );
  },

  addMovie: (data: FormData) => {
    return http.post<APIResponse<MovieResponse>>("QuanLyPhim/ThemPhimUploadHinh", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateMovie: (data: FormData) => {
    return http.post<APIResponse<MovieResponse>>("QuanLyPhim/CapNhatPhimUpload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMovie: (maPhim: number) => {
    return http.delete<APIResponse<string>>(`QuanLyPhim/XoaPhim`, {
      params: { MaPhim: maPhim },
    });
  },

  getUserList: (params?: { MaNhom?: string }) => {
    return http.get<APIResponse<UserResponse[]>>("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: { ...params, MaNhom: params?.MaNhom || 'GP01' },
    });
  },

  getUserListPagination: (params: { soTrang: number; soPhanTuTrenTrang: number; tuKhoa?: string }) => {
    return http.get<APIResponse<{ items: UserResponse[]; totalCount: number }>>(
      "QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
      { params: { ...params, MaNhom: 'GP01' } }
    );
  },

  addUser: (data: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
  }) => {
    return http.post<APIResponse<UserResponse>>("QuanLyNguoiDung/ThemNguoiDung", data);
  },

  updateUser: (data: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
  }) => {
    return http.put<APIResponse<UserResponse>>("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },

  deleteUser: (taiKhoan: string) => {
    return http.delete<APIResponse<string>>(`QuanLyNguoiDung/XoaNguoiDung`, {
      params: { TaiKhoan: taiKhoan },
    });
  },

  createShowtime: (data: {
    maPhim: number;
    ngayChieuGioChieu: string;
    maRap: string;
    giaVe: number;
  }) => {
    return http.post<APIResponse<string>>("QuanLyDatVe/TaoLichChieu", {
      maPhim: data.maPhim,
      ngayChieuGioChieu: data.ngayChieuGioChieu,
      maRap: data.maRap,
      giaVe: data.giaVe
    });
  },
};

export default adminApi;
