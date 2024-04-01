import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@/components/ui";

import { useAlert, useData } from "@/hooks";

import EyeIcon from "~icons/custom/eye";
import EditIcon from "~icons/custom/edit";
import TrashIcon from "~icons/custom/trash";

const Actions = ({ row }) => {
  const alert = useAlert();
  const { updateUsers } = useData();

  const handleSubmit = async () => {
    const res = await window.api.RemoveUser({ _id: row.getValue("_id") });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      updateUsers();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        className="bg-red-400 hover:bg-red-600 shadow-xl text-xs pl-1.5 pr-3 py-2 h-7"
        onClick={() =>
          alert.open({
            title: "Are you sure you want to remove this account?",
            description: "This action cannot be undone. This will remove the account and it's associated access or records",
            leftBtnText: "Cancel",
            rightBtnText: `Yes, Remove`,
            onRightBtnClick: () => handleSubmit(),
          })
        }
      >
        <TrashIcon className="h-4 w-4 m-0.5 mr-1" />
        Remove
      </Button>
    </div>
  );
};

export default Actions;
