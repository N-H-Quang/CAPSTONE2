import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <h2 className="text-xl font-bold">Hồ sơ của tôi</h2>
      <p className="mb-4">Đây là trang hồ sơ cá nhân của bạn.</p>
      <hr></hr>

      {!user ? (
        <p className="mt-5 text-sm text-body">Bạn chưa đăng nhập. Vui lòng đăng nhập để xem hồ sơ.</p>
      ) : (
        <form className="mt-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="taiKhoan"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={user.taiKhoan}
              readOnly
            />
            <label htmlFor="taiKhoan" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Tài khoản</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="hoTen"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={user.hoTen}
              readOnly
            />
            <label htmlFor="hoTen" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Họ tên</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={user.email}
              readOnly
            />
            <label htmlFor="email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              id="soDt"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              value={user.soDt}
              readOnly
            />
            <label htmlFor="soDt" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Số điện thoại</label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="maNhom"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={user.maNhom}
                readOnly
              />
              <label htmlFor="maNhom" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Mã nhóm</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="maLoaiNguoiDung"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={user.maLoaiNguoiDung || ""}
                readOnly
              />
              <label htmlFor="maLoaiNguoiDung" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Loại người dùng</label>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Profile