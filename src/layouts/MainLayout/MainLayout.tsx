import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
interface Props {
  children?: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Header></Header>
      {children}
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
