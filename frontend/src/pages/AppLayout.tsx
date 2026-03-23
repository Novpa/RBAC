import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

function AppLayout() {
  const accessToken = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
