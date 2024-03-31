import { useContext } from "react";
import { OrderContext } from "@/contexts/Order";

const useOrder = () => useContext(OrderContext);

export default useOrder;
