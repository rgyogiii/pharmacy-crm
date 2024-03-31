import { useEffect } from "react";

import { useAlert, useData } from "@/hooks";
import { Switch } from "@/components/ui";

const Status = ({ row }) => {
  const alert = useAlert();
  const { updateUsers } = useData();

  const handleSubmit = async () => {
    const res = await window.api.ActivateUser({ _id: row.getValue("_id"), active: !row.getValue("active") });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      console.log("updating", { parseResult });
      updateUsers();
    }
  };

  return (
    <div className="w-[50px]">
      <Switch
        checked={row.getValue("active")}
        onCheckedChange={() =>
          alert.open({
            title: `Are you sure you want to ${!row.getValue("active") ? "activate" : "deactivate"} this account?`,
            type: "info",
            description: `This action can be change anytime, and will ${
              !row.getValue("active") ? "activate" : "deactivate"
            } ${row.getValue("email")}`,
            leftBtnText: "Cancel",
            rightBtnText: `Yes, ${!row.getValue("active") ? "Activate" : "Deactivate"}`,
            onRightBtnClick: () => handleSubmit(),
          })
        }
      />
    </div>
  );
};

export default Status;
