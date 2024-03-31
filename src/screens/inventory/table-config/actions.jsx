import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useAuth, useData } from "@/hooks";

import EyeIcon from "~icons/custom/eye";
import EditIcon from "~icons/custom/edit";
import TrashIcon from "~icons/custom/trash";
import { cn } from "@/lib/utils";

const Actions = ({ row, className }) => {
  const navigate = useNavigate();
  const { account } = useAuth();

  const alert = useAlert();
  const { updateProducts } = useData();

  const handleRemove = async () => {
    const res = await window.api.RemoveProduct({ _id: row.getValue("_id") });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      updateProducts();
    }
  };

  console.log({ account });
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Tooltip title="view" variant="info">
        <Button
          className="bg-secondary-400 hover:bg-secondary-600 shadow-xl text-xs p-2 px-1 h-6"
          onClick={() => navigate(`/inventory/view/product/${row.original._id}`)}
          disabled={account.role === "pharmacist"}
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip title="edit" variant="success">
        <Button
          className="bg-green-600 hover:bg-green-700 shadow-xl text-xs p-2 px-1 h-6"
          onClick={() => navigate(`/inventory/edit/product/${row.original._id}`)}
          disabled={account.role === "pharmacist"}
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip title="delete" variant="error">
        <Button
          className="bg-red-400 hover:bg-red-600 shadow-xl text-xs p-2 px-1 h-6"
          onClick={() =>
            alert.open({
              title: "Are you sure you want to remove this product?",
              description: "This action cannot be undone. This will remove the product and it's associated records",
              leftBtnText: "Cancel",
              rightBtnText: `Yes, Remove`,
              onRightBtnClick: () => handleRemove(),
            })
          }
          disabled={account.role === "pharmacist"}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Actions;
