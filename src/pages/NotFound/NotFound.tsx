import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full text-center p-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500">404</h1>
          <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Oops!
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Trang bạn đang tìm kiếm không tồn tại.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Về trang chủ
          </Link>
          <Link
            to="/auth/login"
            className="inline-block w-full px-6 py-3 text-blue-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center border border-blue-600 dark:bg-gray-800 dark:text-blue-500 dark:border-blue-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
