import { Route, Routes } from "react-router-dom";
import { Invoices } from "../components";

export function InvoicesRoutes() {
  return (
    <Routes>
      <Route index element={<Invoices />} />
    </Routes>
  );
}
