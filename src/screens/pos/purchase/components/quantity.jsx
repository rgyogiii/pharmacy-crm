import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useData, useOrder } from "@/hooks";

import PlusIcon from "~icons/custom/plus";
import MinusIcon from "~icons/custom/minus";

const Quantity = ({ _id, count }) => {
  const alert = useAlert();
  const {
    orders,
    handleAddQuantity,
    handleRemoveQuantity,
    handleRemoveOrder,
    isComplete,
  } = useOrder();

  const current_order = orders.find((item) => item._id === _id);

  const handleAdd = async () => {
    handleAddQuantity(_id);
  };

  const handleRemove = async () => {
    if (current_order.quantity > 1) {
      alert.open({
        title: "Are you sure you want to void one of this item?",
        description: "This will remove one item on the cart.",
        leftBtnText: "Cancel",
        rightBtnText: `Yes, Remove`,
        onRightBtnClick: () => handleRemoveQuantity(_id),
      });
    } else {
      alert.open({
        title: "Are you sure you want to void this item?",
        description: "This will remove the item on the cart.",
        leftBtnText: "Cancel",
        rightBtnText: `Yes, Remove`,
        onRightBtnClick: () => handleRemoveOrder(_id),
      });
    }
  };

  console.log("current_order", current_order);
  return (
    <div className="flex items-center justify-center gap-0.5">
      <Button
        className="w-5 h-5 p-1 bg-red-400 rounded-full shadow-xl hover:bg-red-600"
        onClick={handleRemove}
        disabled={isComplete}
      >
        <MinusIcon className="w-full h-full" />
      </Button>
      <div className="text-xs">{count}</div>
      <Button
        className="w-5 h-5 p-1 rounded-full shadow-xl bg-secondary-400 hover:bg-secondary-600"
        onClick={handleAdd}
        disabled={isComplete || current_order.stock === 0}
      >
        <PlusIcon className="w-full h-full" />
      </Button>
    </div>
  );
};

export default Quantity;
