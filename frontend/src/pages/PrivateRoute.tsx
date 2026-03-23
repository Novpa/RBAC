import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface PrivateRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

function PrivateRoute({ allowedRoles, children }: PrivateRouteProps) {
  const userRole = useAuthStore((state) => state.role);
  const accessToken = useAuthStore((state) => state.token);
  console.log("allowed roles", allowedRoles);

  if (!allowedRoles.includes(userRole as string)) {
    return <Navigate to={"/unauthorized"} replace={true} />;
  }
  if (!accessToken) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <div>{children}</div>;
}

export default PrivateRoute;
