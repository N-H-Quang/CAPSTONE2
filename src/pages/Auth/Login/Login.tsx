import { APIResponse } from "@/@type/utils.type";
import authApi from "@/apis/auth.api";
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setCredentials } from "../slice";

const validationSchema = Yup.object({
  taiKhoan: Yup.string()
    .required("Tài khoản là bắt buộc")
    .min(3, "Tài khoản phải có ít nhất 3 ký tự"),
  matKhau: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

function Login() {
  const formikInitialValues = {
    taiKhoan: "",
    matKhau: "",
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: (body: typeof formikInitialValues) => authApi.login(body),
  });

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values, {
        onSuccess: (response) => {
          const dataUser = response.data.content;
          dispatch(setCredentials({ user: dataUser }));
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
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

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Đăng nhập
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        action="#"
        onSubmit={formik.handleSubmit}
      >
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
        <button
          type="submit"
          className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            !(formik.isValid && formik.dirty)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Đăng nhập
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
