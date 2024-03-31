import { useContext } from "react";
import { AlertDialogContext } from "@/contexts/AlertDialog";

const useAlert = () => useContext(AlertDialogContext);

export default useAlert;
