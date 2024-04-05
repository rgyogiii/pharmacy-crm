import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Container, Header } from "@/components";
import { Button } from "@/components/ui";

import Table from "@/components/table";
import Config from "./table-config";

import AddIcon from "~icons/custom/add";
import { useAuth, useData } from "@/hooks";

const UserManagement = () => {
  const navigate = useNavigate();
  const { account } = useAuth();
  const { users, updateUsers, sales, updateSales } = useData();

  useEffect(() => {
    updateUsers();
    updateSales();
  }, []);

  return (
    <Container className="container w-full h-full pt-16 pb-12 space-y-4 max-w-7xl">
      <Header />
      <section className="w-full h-auto p-10 space-y-8 shadow-xl outline outline-1 outline-primary-700/10 bg-primary-100 rounded-3xl">
        <div className="flex-1 max-w-xl">
          <p className="text-2xl font-black leading-7 tracking-wide text-secondary-500">
            Sales
          </p>
          <p className="text-primary-700">
            Let's you view sales and purchased data.
          </p>
        </div>
        <Table
          data={sales ?? []}
          columns={Config.columns}
          filter={{
            searches: {
              column: "id",
            },
          }}
          rowsPerPage={5}
        />
      </section>
    </Container>
  );
};

export default UserManagement;
