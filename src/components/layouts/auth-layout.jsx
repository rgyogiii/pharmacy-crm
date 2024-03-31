import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";

const AuthLayout = () => {
  const { account } = useAuth();

  if (account) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative h-screen bg-main bg-center bg-cover bg-repeat">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
