import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useData, useOrder } from "@/hooks";

import CancelIcon from "~icons/custom/cancel";
import TrashIcon from "~icons/custom/trash";

const Actions = ({ _id }) => {
  const alert = useAlert();
  const { handleRemoveOrder } = useOrder();

  const handleRemove = async () => {
    alert.open({
      title: "Are you sure you want to void this item?",
      description: "This action cannot be undone. This will remove the item on the cart.",
      leftBtnText: "Cancel",
      rightBtnText: `Yes, Remove`,
      onRightBtnClick: () => handleRemoveOrder(_id),
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Tooltip title="void" variant="error">
        <Button className="bg-red-400 hover:bg-red-600 shadow-xl text-xs p-2 px-1 h-6" onClick={handleRemove}>
          <CancelIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Actions;
