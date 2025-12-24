import { UserResponse } from "@/@type/response.type";
import { APIResponse } from "@/@type/utils.type";
import http from "@/utils/http";

export const URL_REGISTER = "QuanLyNguoiDung/DangKy";
export const URL_LOGIN = "QuanLyNguoiDung/DangNhap";

const authApi = {
  register: (body: {
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    hoTen: string;
  }) => {
    return http.post<APIResponse<Omit<UserResponse, "maLoaiNguoiDung" | "accessToken">>>(URL_REGISTER, body);
  },
  login(body: { taiKhoan: string; matKhau: string }) {
    return http.post<APIResponse<UserResponse>>(URL_LOGIN, body);
  }
};

export default authApi;
