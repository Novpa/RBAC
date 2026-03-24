import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import BlogList from "./pages/blog/BlogList";
import CreateBlog from "./pages/blog/CreateBlog";
import Signup from "./pages/auth/Signup";
import ErrorBoundary from "./pages/ErrorBoundary";
import AuthorManagement from "./pages/blog/AuthorManagement";
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./pages/PrivateRoute";
import { useEffect } from "react";
import axiosInstance from "./api/axiosInstance";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { setAuth, clearAuth, setInitialized, token } = useAuthStore();

  useEffect(() => {
    if (setInitialized || token) return;

    const initAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/refresh");

        // 1. Gunakan Optional Chaining (?.) agar tidak crash jika data kosong
        const authData = res?.data?.data;

        // 2. CEK: Apakah data, user, dan userId benar-benar ada?
        if (authData && authData.user && authData.user.userId) {
          setAuth(
            authData.user.userId,
            authData.user.email,
            authData.user.role,
            authData.accessToken,
          );
          console.log("Auth Berhasil Disetel");
        } else {
          // Jika data tidak lengkap, anggap session tidak ada
          console.warn("Data auth tidak lengkap dari server");
          clearAuth();
        }
      } catch (error) {
        console.error("Init auth failed:", error);
        clearAuth();
      }
    };

    initAuth();
  }, [setAuth, clearAuth]);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: AppLayout,
      ErrorBoundary: ErrorBoundary,
      children: [
        {
          path: "blog",
          element: (
            <PrivateRoute allowedRoles={["READER"]}>
              <BlogList />
            </PrivateRoute>
          ),
        },
        {
          path: "blog/new",
          Component: CreateBlog,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "signup",
          Component: Signup,
        },
        {
          path: "author/management",
          Component: AuthorManagement,
        },
        {
          path: "unauthorized",
          Component: Unauthorized,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
