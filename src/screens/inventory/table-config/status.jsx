import { useEffect } from "react";

import { useAlert, useAuth, useData } from "@/hooks";
import { Switch } from "@/components/ui";
import { cn } from "@/lib/utils";

const Status = ({ row, className }) => {
  const { account } = useAuth();
  const alert = useAlert();
  const { updateProducts } = useData();

  const handleSubmit = async () => {
    const res = await window.api.ActivateProduct({ _id: row.getValue("_id"), active: !row.getValue("active") });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      console.log("updating", { parseResult });
      updateProducts();
    }
  };

  console.log({ row });
  return (
    <div className={cn("w-[50px]", className)}>
      <Switch
        checked={row.getValue("active")}
        onCheckedChange={() =>
          alert.open({
            title: `Are you sure you want to ${!row.getValue("active") ? "activate" : "deactivate"} this account?`,
            type: "info",
            description: `This action can be change anytime, and will ${
              !row.getValue("active") ? "activate" : "deactivate"
            } ${row.getValue("name")}`,
            leftBtnText: "Cancel",
            rightBtnText: `Yes, ${!row.getValue("active") ? "Activate" : "Deactivate"}`,
            onRightBtnClick: () => handleSubmit(),
          })
        }
        disabled={account.role === "pharmacist"}
      />
    </div>
  );
};

export default Status;
