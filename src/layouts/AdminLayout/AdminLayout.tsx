import Sidebar from "@/components/Admin/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default AdminLayout;
