import { SidebarWithHeader, Loader } from "@/components";
import { useAuth } from "@/features/authentication";
import { lazyImport } from "@/utils";
import { Suspense } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");
const { PageNotFound } = lazyImport(
  () => import("@/features/misc"),
  "PageNotFound",
);
const { Home } = lazyImport(() => import("@/features/misc"), "Home");
const { Reports } = lazyImport(() => import("@/features/misc"), "Reports");
const { Settings } = lazyImport(() => import("@/features/misc"), "Settings");
const { UsersRoutes } = lazyImport(
  () => import("@/features/users"),
  "UsersRoutes",
);

function PrivateOulet() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Suspense fallback={<Loader />}>
        <SidebarWithHeader />
        <Outlet />
      </Suspense>
    );
  }
  return <Navigate to="/" />;
}

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PrivateOulet />,
    children: [
      { index: true, path: "/app", element: <Dashboard /> },
      // { path: "dashboard", element: <Dashboard /> },
      { path: "/app/users/*", element: <UsersRoutes /> },
      { path: "/app/reports/*", element: <Reports /> },
      { path: "/app/settings/*", element: <Settings /> },
      { path: "/app/*", element: <PageNotFound /> },
      { path: "/", element: <Navigate to="/app" /> },
    ],
  },
];
