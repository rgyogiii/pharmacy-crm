import { AuthLayout } from "@/components/layouts";
import { Login } from "@/screens/auth";

const AuthRoute = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Login />,
    },
  ],
};

export default AuthRoute;
