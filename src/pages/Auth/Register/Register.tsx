import { APIResponse } from "@/@type/utils.type";
import authApi from "@/apis/auth.api";
import { isAxiosError } from "@/utils/utils";
import { useMutation } from '@tanstack/react-query';
import { useFormik } from "formik";
import { omit } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  taiKhoan: Yup.string()
    .required("Tài khoản là bắt buộc")
    .min(3, "Tài khoản phải có ít nhất 3 ký tự"),
  matKhau: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  nhapLaiMatKhau: Yup.string()
    .oneOf([Yup.ref("matKhau"), undefined], "Mật khẩu nhập lại không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  hoTen: Yup.string()
    .required("Họ tên là bắt buộc")
    .min(3, "Họ tên phải có ít nhất 3 ký tự"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  soDt: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số"),
});

function Register() {
  const navigate = useNavigate();
  const formikInitialValues = {
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "",
  };

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<typeof formikInitialValues, "nhapLaiMatKhau">) =>
      authApi.register(body),
  });

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = omit(values, ["nhapLaiMatKhau"]);
      registerAccountMutation.mutate(body, {
        onSuccess: (response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/auth/login");
          }, 1500);
        },
        onError: (error) => {
          if (isAxiosError<APIResponse<string>>(error)) {
            toast.error(
              error.response?.data.content ||
                "Đã có lỗi xảy ra, vui lòng thử lại sau"
            );
          } else if (isAxiosError(error)) {
            toast.error(error.message);
          } else {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
          }
        },
      });
    },
  });

  if (registerAccountMutation.isPending) {
    return (
        <div className="fixed top-0 start-0 w-full h-full flex items-center justify-center">
          <div className="absolute top-0 start-0 w-full h-full bg-neutral-primary/95 z-10 gap-2 flex items-center justify-center flex-col">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Đăng ký tài khoản
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="taiKhoan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tài khoản
          </label>
          <input
            type="text"
            name="taiKhoan"
            id="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"
            required
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.taiKhoan}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            name="matKhau"
            id="matKhau"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formik.values.matKhau}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.matKhau}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="nhapLaiMatKhau"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            name="nhapLaiMatKhau"
            id="nhapLaiMatKhau"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formik.values.nhapLaiMatKhau}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nhapLaiMatKhau && formik.errors.nhapLaiMatKhau ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.nhapLaiMatKhau}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="hoTen"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Họ tên
          </label>
          <input
            type="text"
            name="hoTen"
            id="hoTen"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập họ tên"
            required
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.hoTen}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="soDt"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            name="soDt"
            id="soDt"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số điện thoại"
            required
            value={formik.values.soDt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.soDt && formik.errors.soDt ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.soDt}
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="maNhom"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mã nhóm
          </label>
          <input
            type="text"
            name="maNhom"
            id="maNhom"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mã nhóm"
            required
            value={formik.values.maNhom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.maNhom && formik.errors.maNhom ? (
            <div className="text-sm text-red-600 mt-1">
              {formik.errors.maNhom}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800}`}
        >
          Đăng ký
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
