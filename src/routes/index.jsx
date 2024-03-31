import { createBrowserRouter } from "react-router-dom";

import PageRoute from "./page-route";
import AuthRoute from "./auth-route";

import Screen404 from "@/screens/error/Screen404";

const Router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Screen404 />,
    children: [PageRoute, AuthRoute],
  },
]);

export default Router;
