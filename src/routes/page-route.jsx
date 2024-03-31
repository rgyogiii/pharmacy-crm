import { Navigate } from "react-router-dom";

import { ScreenLayout } from "@/components/layouts";
import Screen404 from "@/screens/error/Screen404";

import Dashboard from "@/screens/dashboard";
import POS from "@/screens/pos";
import Inventory from "@/screens/inventory";
import Receipt from "@/screens/receipt";
import Sales from "@/screens/sales";
import UserManagement from "@/screens/user-management";

import { CreateUser, UpdateUser } from "@/screens/user-management/screens";
import { CreateProduct, ViewProduct } from "@/screens/inventory/screens";

const PageRoute = {
  path: "/",
  errorElement: <Screen404 />,
  element: <ScreenLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "dashboard",
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "pos",
      element: <POS />,
    },
    {
      path: "inventory",
      children: [
        {
          index: true,
          element: <Inventory />,
        },
        {
          path: "create-product",
          element: <CreateProduct />,
        },
        {
          path: ":type/product/:id",
          element: <ViewProduct />,
        },
      ],
    },
    {
      path: "receipt",
      element: <Receipt />,
    },
    {
      path: "sales",
      element: <Sales />,
    },
    {
      path: "user-management",
      children: [
        {
          index: true,
          element: <UserManagement />,
        },
        {
          path: "create-user",
          element: <CreateUser />,
        },
        {
          path: "update-user/:id",
          element: <UpdateUser />,
        },
      ],
    },
  ],
};

export default PageRoute;
