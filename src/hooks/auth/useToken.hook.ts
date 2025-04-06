import { useEffect, useState } from "react";

export function useGetAccessToken() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken("");
    }
  }, [accessToken]);

  return { accessToken };
}
