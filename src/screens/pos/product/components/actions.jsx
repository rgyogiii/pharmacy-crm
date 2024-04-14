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
    handleAddOrder({
      _id,
      product,
      price,
      stock,
      isPrescriptionRequired: Boolean(isPrescriptionRequired),
    });
  };

  const isZeroStock = orders.find((item) => item._id === row._id)?.stock === 0;
  // const isTwoMonthsDue =

  console.log({ orders });
  return (
    <div className="flex items-center gap-1">
      <Tooltip title="add" variant="info">
        <Button
          className="h-6 p-2 px-1 text-xs shadow-xl bg-secondary-400 hover:bg-secondary-500 text-primary-50 disabled:bg-primary-700 disabled:opacity-20"
          onClick={row && handleAdd}
          disabled={disabled || isComplete || isZeroStock}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Actions;
