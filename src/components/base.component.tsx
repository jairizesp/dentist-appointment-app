import Navbar from "./navbar.component";
import Footer from "./footer.component";
import { Outlet } from "react-router-dom";

const Base = () => {
  return (
    <>
      <Navbar />
      <div className="px-8 xl:px-[200px] min-h-[720px]">{<Outlet />}</div>
      <Footer />
    </>
  );
};

export default Base;
