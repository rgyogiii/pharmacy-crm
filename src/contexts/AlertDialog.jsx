import { createContext, useEffect, useState } from "react";
import { Dialog } from "@/components/ui";

const { AlertDialog } = Dialog;

export const AlertDialogContext = createContext();

const AlertDialogProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const [dialog, setDialog] = useState({
    title: "",
    type: "warning",
    description: "",
    leftBtnText: "",
    rightBtnText: "",
  });

  const alert = (props) => {
    setShowDialog(true);
    props && setDialog(props);

    console.log({ props, dialog });
  };

  const dialogContextValue = {
    open: (props) => alert(props),
    close: () => setShowDialog(false),
    setAlertDialog: (props) => setDialog(props),
  };
  console.log({ fff: dialog });
  return (
    <AlertDialogContext.Provider value={dialogContextValue}>
      <AlertDialog open={showDialog} setOpen={setShowDialog} {...dialog} />
      {children}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogProvider;
