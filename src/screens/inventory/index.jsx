import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useData } from "@/hooks";

import { Container, Header } from "@/components";
import { Button } from "@/components/ui";

import Table from "@/components/table";
import Config from "./table-config";

import AddIcon from "~icons/custom/add";

const Inventory = () => {
  const navigate = useNavigate();
  const { account } = useAuth();
  const { products, updateProducts } = useData();

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <Container className="space-y-4 container h-full w-full max-w-7xl overflow-y-auto mt-6">
      <Header
        actionButton={
          <Button
            variant="ghost"
            className="w-auto px-2 pr-4 bg-secondary-500 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-1"
            onClick={() => navigate("create-product")}
            disabled={account.role === "pharmacist"}
          >
            <AddIcon className="h-5 w-auto m-1" />
            <span>Add New Product</span>
          </Button>
        }
      />
      <section className="p-10 w-full h-auto outline outline-1 outline-primary-700/10 bg-primary-100 shadow-xl rounded-3xl space-y-8">
        <div className="flex-1 max-w-xl">
          <p className="text-2xl font-black leading-7 tracking-wide text-secondary-500">Inventory</p>
          <p className="text-primary-700">Let you manage medicine products, stocks, and many more.</p>
        </div>
        <Table
          data={products ?? []}
          columns={Config.columns}
          filter={{
            searches: {
              column: "name",
            },
          }}
          columnVisibility={{ _id: false }}
          rowsPerPage={5}
          height="h-64"
        />
      </section>
    </Container>
  );
};

export default Inventory;
