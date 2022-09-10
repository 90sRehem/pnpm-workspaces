import { PageNotFound } from "@/features/misc";
import { Route, Routes } from "@/lib/react-router-dom";
import { Users } from "./Users";

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
