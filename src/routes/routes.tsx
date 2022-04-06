import { Outlet, RouteObject } from "react-router-dom";
import { lazy, ReactNode, Suspense } from "react";
import { ProtectedRoute } from "providers/AuthProvider";
import Loading from "pages/Loading";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const ConfigEditor = Loadable(lazy(() => import("pages/ConfigEditor")));
const NotFound = Loadable(lazy(() => import("pages/NotFound")));
const Login = Loadable(lazy(() => import("pages/Login")));
const Home = Loadable(lazy(() => import("pages/Home")));

const ROUTES: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "config/:requestedFile",
        element: <ConfigEditor />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default ROUTES;
