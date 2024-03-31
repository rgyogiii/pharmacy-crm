import { createContext, useState } from "react";

export const DataHandlerContext = createContext();

const DataHandlerProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
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

  const dataHandlerValue = {
    loading,
    users,
    products,
    updateUsers: () => {
      setLoading(true);
      handleAllUserFetch();
    },
    updateProducts: () => {
      setLoading(true);
      handleAllProductFetch();
    },
  };

  return <DataHandlerContext.Provider value={dataHandlerValue}>{children}</DataHandlerContext.Provider>;
};

export default DataHandlerProvider;
