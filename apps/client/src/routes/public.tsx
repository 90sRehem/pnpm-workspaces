import { Loader } from "@/components";
import { lazyImport } from "@/utils";
import { Suspense } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

const { Landing } = lazyImport(() => import("@/features/misc"), "Landing");
const { AuthRoutes } = lazyImport(
  () => import("@/features/authentication"),
  "AuthRoutes",
);

function RoutesContainer() {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RoutesContainer />,
    children: [
      {
        index: true,
        path: "/",
        element: <Landing />,
      },
      { path: "auth/*", element: <AuthRoutes /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
