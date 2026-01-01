import Sidebar from "@/components/Admin/Sidebar";
import { ADMIN_MENU_ITEMS } from "@/utils/contant";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Sidebar menuItems={ADMIN_MENU_ITEMS}>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default AdminLayout;
