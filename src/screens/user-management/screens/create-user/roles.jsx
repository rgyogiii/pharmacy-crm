import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Select, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

const {
  SelectContainer,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} = Select;

const Roles = ({ tabs, handleNext }) => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const current_tab = tabs.find((tab) => tab.label === "Roles");
  const account = tabs.find((tab) => tab.label === "Account");

  const handleSubmit = async () => {
    setLoading(true);

    const res = await window.api.SetUserRole({
      email: account.data?.email,
      role: roles,
    });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setFieldError("email", parseResult.error);
    }

    if (parseResult.data) {
      handleNext({ current: "Roles", data: roles });
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 max-w-2xl">
      <div>
        <p className="text-xl font-black leading-7 tracking-wide text-secondary-500 font-white">
          Roles
        </p>
        <p className="text-sm text-primary-700">Set account roles</p>
      </div>
      <Separator className="my-6 bg-gray-500/40" />

      <div className="space-y-3">
        <div>
          <p className={cn("text-sm font-medium")}>Roles</p>
          <p className="mb-2 text-xs text-primary-700">
            This is the roles for the accounts which limits its access. This can
            be change anytime by the admin.
          </p>
          <SelectContainer
            onValueChange={(val) => setRoles(val)}
            disabled={current_tab.completed}
            value={current_tab.data ?? roles}
          >
            <SelectTrigger className={cn("w-1/2")}>
              <SelectValue placeholder="Select account roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="pharmacist">Pharmacist</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectContainer>
        </div>

        {!current_tab.completed ? (
          <Button
            className="px-6 bg-tertiary-600 hover:bg-tertiary-700"
            disabled={!roles}
            onClick={handleSubmit}
          >
            Set Roles
          </Button>
        ) : (
          <Button
            className="px-6 bg-secondary-600 hover:bg-secondary-700"
            onClick={() => navigate("/user-management")}
          >
            Complete
          </Button>
        )}

        <div
          className={cn(
            "flex items-center justify-start pb-2 h-6",
            errors ? "visible" : "invisible"
          )}
        >
          <h6 className="text-xs font-semibold leading-none text-red-400">
            {errors ?? ""}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Roles;
