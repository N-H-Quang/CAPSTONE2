import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isAdmin = auth.user?.maLoaiNguoiDung === "QuanTri";
  const isLoading = auth.isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminProtectedRoute;
