import { useState } from "react";
import logo from "../assets/tooth-logo.png";
import { useLocation } from "react-router-dom";

const NAV_PAGES = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Bookings", path: "/bookings" },
];

const Navbar = () => {
  const location = useLocation();
  const [name, setName] = useState({ firstName: "John", lastName: "Doe" });

  function transformName() {
    return [
      name.firstName.charAt(0).toUpperCase(),
      name.lastName.charAt(0).toUpperCase(),
    ].join("");
  }

  return (
    <div className="px-4 w-full max-h-[80px] h-[80px] flex items-center shadow-md lg:shadow-none justify-between bg-slate-50 xl:px-[200px] sticky top-0  text-purple-800 font-semibold lg:pt-4">
      <div className="hover:scale-105">
        <a href="/">
          <img src={logo} alt="" width={60} height={60} />
        </a>
      </div>
      <nav className="flex gap-6 md:gap-8">
        {NAV_PAGES.map((page) => (
          <a
            key={page.label}
            className={`nav__link ${
              location.pathname == page.path
                ? "text-purple-800 font-bold"
                : "text-purple-500"
            }`}
            href={page.path}
          >
            {page.label}
          </a>
        ))}
        <div className="rounded-full w-[35px] -mt-2 h-[35px] pt-[4px] border hover:bg-purple-200 hover:text-purple-800 border-purple-200 text-center font-semibold cursor-pointer hover:scale-125 transition-all ease-in-out duration-300">
          {transformName()}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
