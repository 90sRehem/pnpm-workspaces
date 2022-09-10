import { useAuth } from "@/features/authentication";
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  return useRoutes([...routes]);
}
