import { useEffect, useState } from "react";
import { useData, useOrder } from "@/hooks";
import Table from "./components/table";
import _ from "lodash";

import { TextField } from "@/components/forms";
import { Button, Separator } from "@/components/ui";

import PlusIcon from "~icons/custom/plus";
import SearchIcon from "~icons/custom/search";
import { cn } from "@/lib/utils";

import AddCustomerInfo from "./components/add-customer-info";
import AddPhysician from "./components/add-physician";

const Product = ({ showOrder, setShowOrder }) => {
  const { products, updateProducts, updateCustomer, updatePhysicians, physician, updatePhysician } = useData();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { orders, handleResetOrder } = useOrder();

  const handleSearchByName = (name) => {
    if (name === "") {
      setData(products.filter((item) => item.active && item.stock > 0));
    } else {
      const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      setData(filteredProducts);
    }

    setSearch(name);
  };

  const handleNewOrder = async () => {
    const res = await window.api.CreateCustomer();
    const parseResult = JSON.parse(res);

    console.log({ parseResult });
    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      updateCustomer(parseResult.data);
      setShowOrder(true);
    }
  };

  useEffect(() => {
    updateProducts();
    updatePhysicians();
    handleResetOrder();
    updatePhysician(null);
  }, []);

  useEffect(() => {
    products?.length > 0 && setData(products.filter((item) => item.active && item.stock > 0));
  }, [products]);

  console.log("index", physician, _.isEmpty(physician));
  return (
    <div
      className={cn(
        "w-8/12 outline outline-2 outline-primary-600/10 bg-primary-100 shadow-2xl rounded-3xl p-8 flex flex-col gap-8",
        !showOrder && "container"
      )}
    >
      <div className="!mb-auto flex justify-start gap-4">
        <Button
          variant="ghost"
          className="w-32 h-28 p-0 bg-tertiary-600 hover:bg-tertiary-700 text-primary-50 hover:text-primary-50 gap-2 text-sm"
          onClick={handleNewOrder}
          disabled={showOrder}
        >
          New
          <br />
          Order
        </Button>
        <AddCustomerInfo disabled={!showOrder} />
        <AddPhysician disabled={!showOrder || !_.isEmpty(physician)} />
      </div>
      <div className="flex flex-col h-4/6 gap-4">
        <div className="relative">
          <TextField
            placeholder={`Search product name`}
            type="text"
            name="filter-search"
            id="filter-search"
            autoComplete="off"
            value={search}
            onChange={(e) => handleSearchByName(e.target.value)}
            textboxClassName="py-2 border-primary-600 hover:!border-secondary-500 focus:!border-primary-900 !pr-9"
            icon={{
              left: SearchIcon,
              className: "inset-y-[11px] h-4 w-4 left-1",
            }}
            helpers={false}
          />
          <Button
            className={cn(
              "bg-red-400 hover:bg-red-600 shadow-xl rounded-full h-5 w-5 p-1 right-2 inset-y-2 z-20",
              search === "" ? "hidden" : "absolute"
            )}
            onClick={() => {
              setSearch("");
              setData(products.filter((item) => item.active && item.stock > 0));
            }}
          >
            <PlusIcon className="h-full w-full rotate-45" />
          </Button>
        </div>
        <Table data={data} disabled={!showOrder} />
      </div>
    </div>
  );
};

export default Product;
