import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/public/login.page";
import Signup from "./pages/public/singup.page";

function App() {
  return (
    <div className="w-full h-screen bg-slate-50 text-slate-800">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
