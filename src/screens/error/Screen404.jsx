import { Link, useNavigate } from "react-router-dom";

import RightIcon from "~icons/custom/right";

const Screen404 = () => {
  const navigate = useNavigate();
  const support_email = import.meta.env.VITE_SUPPORT_EMAIL;

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen">
      <main className="grid min-h-full place-items-center py-32 px-8">
        <div className="text-center">
          <p className="text-6xl font-semibold text-red-500">404</p>
          <h1 className="mt-4 font-bold tracking-tight text-prussian-blue text-5xl">Screen not found</h1>
          <p className="mt-3 text-base leading-7 font-medium text-gray-400">
            Sorry, we couldn’t find the screen you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <button
              className="uppercase cursor-pointer rounded-md bg-white px-5 py-2.5 text-sm text-primary font-semibold shadow-lg hover:bg-red-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400/10 select-none"
              onClick={handleBackToHome}
            >
              Go back Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Screen404;
