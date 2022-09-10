import { lazyImport } from "@/utils";
import { Route, Routes } from "react-router-dom";

const { NotFound } = lazyImport(() => import("@/features/misc"), "NotFound");
const { Login } = lazyImport(() => import("./Login"), "Login");
const { Register } = lazyImport(() => import("./Register"), "Register");

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
