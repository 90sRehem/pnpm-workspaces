import { Route, Routes } from "react-router-dom";
import { Expenses } from "../components";

export function ExpensesRoutes() {
  return (
    <Routes>
      <Route index element={<Expenses />} />
    </Routes>
  );
}
