import { useContext } from "react";
import { DataHandlerContext } from "@/contexts/DataHandler";

const useData = () => useContext(DataHandlerContext);

export default useData;
