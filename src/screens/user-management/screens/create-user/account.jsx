import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

import EyeIcon from "~icons/custom/eye";
import EyeOffIcon from "~icons/custom/eyeoff";

const Account = ({ tabs, handleNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const current_tab = tabs.find((tab) => tab.label === "Account");

  const validationSchema = Yup.object({
    email: Yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    password: Yup.string("Enter your password").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: current_tab.data?.email ?? "",
      password: current_tab.data?.password ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setLoading(true);

      const res = await window.api.CreateUser(values);
      const parseResult = JSON.parse(res);

      console.log({ parseResult });
      if (parseResult.error) {
        setFieldError("email", parseResult.error);
      }

      if (parseResult.data) {
        handleNext({ current: "Account", data: values, next: "Roles" });
      }

      setLoading(false);
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  return (
    <div className="flex-1 max-w-2xl">
      <div>
        <p className="text-xl font-black text-secondary-500 leading-7 tracking-wide font-white">Account</p>
        <p className="text-primary-700 text-sm">Create a user account</p>
      </div>
      <Separator className="bg-gray-500/40 my-6" />

      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              formik.touched.email && Boolean(formik.errors.email) ? "text-red-500" : null
            )}
          >
            Email
          </p>
          <p className="text-xs text-primary-700 mb-2">This is the email that will be used to login</p>
          <TextField
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            className="w-1/2"
            value={formik.values.email ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}
            disabled={current_tab.completed}
          />
        </div>

        <div>
          <p
            className={cn(
              "text-sm font-medium",
              formik.touched.password && Boolean(formik.errors.password) ? "text-red-500" : null
            )}
          >
            Password
          </p>
          <p className="text-xs text-primary-700 mb-2">Set a temporary password. This can be change once user login.</p>
          <TextField
            password
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            className="w-1/2"
            icon={{
              right: showPassword ? EyeIcon : EyeOffIcon,
              className: showPassword ? "inset-y-2" : "top-3",
              onClick: () => setShowPassword(!showPassword),
              disabled: current_tab.completed,
            }}
            value={formik.values.password ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={formik.touched.password && Boolean(formik.errors.password) ? formik.errors.password : null}
            disabled={current_tab.completed}
          />
        </div>

        {!current_tab.completed && (
          <Button
            type="submit"
            className="px-6 bg-tertiary-600 hover:bg-tertiary-700"
            disabled={isLoading || !formik.values.email || !formik.values.password}
          >
            Create Account
          </Button>
        )}

        {/* <div className={cn("flex items-center justify-start pb-2 h-6", errors ? "visible" : "invisible")}>
          <h6 className="text-xs font-semibold leading-none text-red-400">{errors ?? ""}</h6>
        </div> */}
      </form>
    </div>
  );
};

export default Account;
