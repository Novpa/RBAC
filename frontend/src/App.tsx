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

function App() {
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
