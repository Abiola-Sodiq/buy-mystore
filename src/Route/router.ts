import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "./dynamicImport";
import { routePath } from "../utils/helper";

export const router = createBrowserRouter([
  {
    Component: Homepage,
    path: routePath.HOMEPAGE,
    children: [
      { index: true, Component: Homepage },
      { path: routePath.HOMEPAGE, Component: Homepage },
    ],
  },
]);
