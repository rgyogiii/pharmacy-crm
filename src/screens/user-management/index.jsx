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
  const { users, updateUsers } = useData();

  useEffect(() => {
    updateUsers();
  }, []);

  return (
    <Container className="pt-16 pb-12 space-y-4 container h-full w-full max-w-7xl">
      <Header
        actionButton={
          <Button
            variant="ghost"
            className="w-auto px-2 pr-4 bg-secondary-500 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-1"
            onClick={() => navigate("create-user")}
          >
            <AddIcon className="h-5 w-auto m-1" />
            <span>Add New User</span>
          </Button>
        }
      />
      <section className="p-10 w-full h-auto outline outline-1 outline-primary-700/10 bg-primary-100 shadow-xl rounded-3xl space-y-8">
        <div className="flex-1 max-w-xl">
          <p className="text-2xl font-black leading-7 tracking-wide text-secondary-500">User Management</p>
          <p className="text-primary-700">Let you manage user accounts, permissions, and roles.</p>
        </div>
        <Table
          data={users?.filter((user) => user._id !== account._id) ?? []}
          columns={Config.columns}
          filter={Config.filter}
          rowsPerPage={5}
        />
      </section>
    </Container>
  );
};

export default UserManagement;
