import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ResultadosPage } from "./pages/ResultadosPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/resultados",
    Component: ResultadosPage,
  },
  {
    path: "/paquete/:id",
    Component: PackageDetailPage,
  },
]);