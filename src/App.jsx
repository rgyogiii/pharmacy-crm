import { RouterProvider } from "react-router-dom";
import Router from "./routes";

import { useState } from "react";
import { AlertDialogProvider, AuthProvider, DataHandlerProvider, OrderProvider } from "@/contexts";

function App() {
  return (
    <>
      <AuthProvider>
        <DataHandlerProvider>
          <AlertDialogProvider>
            <OrderProvider>
              <RouterProvider router={Router} />
            </OrderProvider>
          </AlertDialogProvider>
        </DataHandlerProvider>
      </AuthProvider>
    </>
  );
}

export default App;
