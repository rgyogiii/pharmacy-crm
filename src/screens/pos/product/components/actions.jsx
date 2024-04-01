import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useData, useOrder } from "@/hooks";

import PlusIcon from "~icons/custom/plus";

const Actions = ({ row, disabled }) => {
  const alert = useAlert();
  const { orders, handleAddOrder, isComplete } = useOrder();

  const handleAdd = async () => {
    const { _id, name: product, price, stock, isPrescriptionRequired } = row;
    handleAddOrder({ _id, product, price, stock, isPrescriptionRequired: Boolean(isPrescriptionRequired) });
  };

  return (
    <div className="flex items-center gap-1">
      <Tooltip title="add" variant="info">
        <Button
          className="bg-secondary-400 hover:bg-secondary-500 shadow-xl text-primary-50 text-xs p-2 px-1 h-6 disabled:bg-primary-700 disabled:opacity-20"
          onClick={row && handleAdd}
          disabled={disabled || isComplete || orders.find((item) => item._id === row._id)?.stock === 0}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Actions;
