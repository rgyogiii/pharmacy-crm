import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useData, useOrder } from "@/hooks";

import PlusIcon from "~icons/custom/plus";
import MinusIcon from "~icons/custom/minus";

const Quantity = ({ _id, count }) => {
  const alert = useAlert();
  const { orders, handleAddQuantity, handleRemoveQuantity, handleRemoveOrder } = useOrder();

  const current_order = orders.find((item) => item._id === _id);

  const handleAdd = async () => {
    handleAddQuantity(_id);
  };

  const handleRemove = async () => {
    console.log({ current_order });
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

  return (
    <div className="flex items-center justify-center gap-2">
      <Button className="bg-red-400 hover:bg-red-600 shadow-xl rounded-full h-5 w-5 p-1" onClick={handleRemove}>
        <MinusIcon className="h-full w-full" />
      </Button>
      <div className="text-center">{count}</div>
      <Button className="bg-secondary-400 hover:bg-secondary-600 shadow-xl rounded-full h-5 w-5 p-1" onClick={handleAdd}>
        <PlusIcon className="h-full w-full" />
      </Button>
    </div>
  );
};

export default Quantity;
