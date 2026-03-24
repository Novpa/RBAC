import { Outlet } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { useEffect } from "react";

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
