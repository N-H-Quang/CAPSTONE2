import MainLayout from "./layouts/MainLayout";
import { lazy } from "react";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import { useRoutes } from "react-router-dom";
import { RejectedRoute } from "./components/RejectedRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
const Home = lazy(() => import("./pages/Main/Home"));
const MovieDetail = lazy(() => import("./pages/Main/MovieDetail"));
const OrderTicked = lazy(() => import("./pages/Main/OrderTicked"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Users = lazy(() => import("./pages/Admin/Users"));
const MovieList = lazy(() => import("./pages/Admin/Movies/MovieList"));
const AddMovie = lazy(() => import("./pages/Admin/Movies/AddMovie"));
const EditMovie = lazy(() => import("./pages/Admin/Movies/EditMovie"));
const ShowTimes = lazy(() => import("./pages/Admin/ShowTimes"));

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "auth",
      element: <RejectedRoute />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "order/:maLichChieu",
          element: <ProtectedRoute/>,
          children: [
            {
              path: "",
              element: <OrderTicked />,
            },
          ],
        },
      ],
    },
    {
      path: "admin",
      element: <AdminProtectedRoute />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "movies/list",
              element: <MovieList />,
            },
            {
              path: "movies/add",
              element: <AddMovie />,
            },
            {
              path: "movies/edit/:movieId",
              element: <EditMovie />,
            },
            {
              path: "showTimes",
              element: <ShowTimes />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routeElements;
}
