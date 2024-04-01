import { RouterProvider } from "react-router-dom";
import Router from "./routes";

import { useState } from "react";
import { AlertDialogProvider, AlertEmptyStockProvider, AuthProvider, DataHandlerProvider, OrderProvider } from "@/contexts";

function App() {
  return (
    <>
      <AuthProvider>
        <DataHandlerProvider>
          <OrderProvider>
            <AlertEmptyStockProvider>
              <AlertDialogProvider>
                <RouterProvider router={Router} />
              </AlertDialogProvider>
            </AlertEmptyStockProvider>
          </OrderProvider>
        </DataHandlerProvider>
      </AuthProvider>
    </>
  );
}

export default App;
