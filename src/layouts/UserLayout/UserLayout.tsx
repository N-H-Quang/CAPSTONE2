import Sidebar from "@/components/Admin/Sidebar"
import { PROFILE_DROPDOWN_ITEMS } from "@/utils/contant"
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Sidebar menuItems={PROFILE_DROPDOWN_ITEMS}>
         <Outlet />
      </Sidebar>
    </>
  )
}
export default UserLayout