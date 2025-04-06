import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/public/login.page";
import Signup from "./pages/public/singup.page";
import ProtectedRoutes from "./components/protected.route";
import Home from "./pages/authenticated/home.page";
import Dashboard from "./pages/authenticated/dashboard.page";
import Booking from "./pages/authenticated/booking.page";
import Base from "./components/base.component";

function App() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Base />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/bookings"} element={<Booking />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
