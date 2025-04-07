import { useEffect, useRef, useState } from "react";
import logo from "../assets/tooth-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { clearToken, getIdentity } from "../utils/helpers/tokenHelper";

const NAV_PAGES = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Bookings", path: "/bookings" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [identity, setIdentity] = useState(getIdentity());
  const [isShowLogout, setIsShowLogout] = useState(false);

  const logoutRef = useRef<HTMLDivElement>(null); // <== ref here

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setIsShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function transformName() {
    return [
      identity?.first_name.charAt(0).toUpperCase(),
      identity?.last_name.charAt(0).toUpperCase(),
    ].join("");
  }

  const handlePathName = (path: string): boolean => {
    if (path == "/") {
      return location.pathname == path;
    } else {
      return location.pathname.includes(path);
    }
  };

  const toggleLogout = () => {
    setIsShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="px-4 w-full max-h-[80px] h-[80px] flex items-center shadow-md lg:shadow-none justify-between bg-slate-50 xl:px-[200px] sticky top-0 z-50 text-purple-800 font-semibold lg:pt-4">
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
              handlePathName(page.path)
                ? "text-purple-800 font-bold"
                : "text-purple-500"
            }`}
            href={page.path}
          >
            {page.label}
          </a>
        ))}
        <div className="relative" ref={logoutRef}>
          <button
            onClick={toggleLogout}
            className="relative rounded-full w-[35px] -mt-2 h-[35px] pt-[1px] border hover:bg-purple-200 hover:text-purple-800 border-purple-200 text-center hover:scale-125 font-semibold cursor-pointer active:scale-110 transition-all ease-in-out duration-300"
          >
            {transformName()}
          </button>
          {isShowLogout && (
            <div
              onClick={handleLogout}
              className="flex flex-col active:scale-95 cursor-pointer absolute -bottom-11 -left-5 border border-gray-300 rounded-md px-4 py-2 hover:bg-purple-800 hover:text-purple-200 bg-white z-50"
            >
              <p>Logout</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
