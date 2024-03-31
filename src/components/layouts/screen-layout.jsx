import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useAuth } from "@/hooks";

const ScreenLayout = () => {
  const { account } = useAuth();

  if (!account) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <main className="relative h-screen bg-main bg-center bg-cover bg-repeat">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default ScreenLayout;
