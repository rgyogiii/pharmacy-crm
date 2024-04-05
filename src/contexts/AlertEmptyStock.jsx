import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { Dialog, Toaster } from "@/components/ui";
import { useData } from "@/hooks";

const { AlertDialog } = Dialog;

export const AlertEmptyStockContext = createContext();

const AlertEmptyStockProvider = ({ children }) => {
  const { products, updateProducts } = useData();

  const handleEmptyProducts = () => {
    toast.dismiss();
    updateProducts();

    const emptyProducts = products?.filter((item) => item.stock <= 1);

    emptyProducts?.forEach((item) =>
      toast.warning(`${item.name} has only one or zero stock remaining.`, {
        cancel: {
          label: "Close",
          onClick: () => {},
        },
      })
    );
  };

  useEffect(() => {
    handleEmptyProducts();
  }, [window.location.href]);

  return (
    <AlertEmptyStockContext.Provider value={{}}>
      <Toaster position="top-right" />
      {children}
    </AlertEmptyStockContext.Provider>
  );
};

export default AlertEmptyStockProvider;
