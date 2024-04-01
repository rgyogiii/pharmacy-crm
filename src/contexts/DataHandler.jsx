import { createContext, useState } from "react";

export const DataHandlerContext = createContext();

const DataHandlerProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
  const [physicians, setPhysicians] = useState(null);
  const [sales, setSales] = useState(null);
  const [physician, setPhysician] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [order, setOrder] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAllUserFetch = async () => {
    console.log("fetchingggg.......");
    const res = await window.api.GetUsers();
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      setUsers(parseResult.data);
    }

    setLoading(false);
  };

  const handleAllProductFetch = async () => {
    console.log("fetchingggg.......");
    const res = await window.api.GetAllProduct();
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      setProducts(parseResult.data);
    }

    setLoading(false);
  };

  const handleAllPhysicianFetch = async () => {
    console.log("fetchingggg.......");
    const res = await window.api.GetAllPhysician();
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      setPhysicians(parseResult.data);
    }

    setLoading(false);
  };

  const handleAllSaleFetch = async () => {
    console.log("fetchingggg.......");
    const res = await window.api.GetAllSale();
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      setSales(parseResult.data);
    }

    setLoading(false);
  };

  const handleAllStats = async () => {
    console.log("fetchingggg.......");
    const res = await window.api.GetAllStats();
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      console.log({ sales: parseResult.data });
      setStats(parseResult.data);
    }

    setLoading(false);
  };

  const dataHandlerValue = {
    loading,
    users,
    products,
    physicians,
    customer,
    physician,
    order,
    sales,
    stats,
    updateUsers: () => {
      setLoading(true);
      handleAllUserFetch();
    },
    updateProducts: () => {
      setLoading(true);
      handleAllProductFetch();
    },
    updatePhysicians: () => {
      setLoading(true);
      handleAllPhysicianFetch();
    },
    updateCustomer: setCustomer,
    updatePhysician: setPhysician,
    updateOrder: setOrder,
    updateSales: () => {
      setLoading(true);
      handleAllSaleFetch();
    },
    updateStats: () => {
      setLoading(true);
      handleAllStats();
    },
  };

  return <DataHandlerContext.Provider value={dataHandlerValue}>{children}</DataHandlerContext.Provider>;
};

export default DataHandlerProvider;
