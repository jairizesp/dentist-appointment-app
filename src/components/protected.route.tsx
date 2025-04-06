import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/helpers/tokenHelper";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return accessToken ? <Outlet /> : null;
};

export default ProtectedRoutes;
