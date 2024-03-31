import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { cn } from "@/lib/utils";
import { version as AppVersion } from "../../../package.json";

import { TextField } from "@/components/forms";
import { Button } from "@/components/ui";

import EyeIcon from "~icons/custom/eye";
import EyeOffIcon from "~icons/custom/eyeoff";
import UserCircleIcon from "~icons/custom/user-circle";
import CarretDownIcon from "~icons/custom/carret-down";
import { useAuth } from "@/hooks";

const Login = () => {
  const navigate = useNavigate();
  const { error, signin } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    password: Yup.string("Enter your password").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      // setLoading(true);

      await signin(values);
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleNext = () => {
    formik.validateField("email");
    setShowPassword(false);
    !formik.errors.email && setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    formik.setFieldValue("password", "");
    formik.setFieldTouched("password", false);
    setShowPassword(false);
  };

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
      <form
        className="mx-auto w-full max-w-4xl p-10 pb-6 rounded-[2rem] bg-primary-50 shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <img className="h-14 w-auto shadow bg-primary-500 rounded-full" src="/assets/logo.ico" alt="Logo" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="row-span-5 mt-4 mb-6">
            <h2 className="text-4xl font-medium tracking-tight text-primary-900 mb-2">
              {step === 1 ? "Sign in" : "Welcome"}
            </h2>
            {step === 1 ? (
              <h6 className="text-lg leading-9 text-primary-900">Use your email or username</h6>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="hover:bg-neutral-500/15 rounded-full h-auto p-0.5 pr-2 flex items-center border-primary-900"
                onClick={handleBack}
              >
                <UserCircleIcon className="h-6 w-6 text-primary-900" />
                <p className="leading-none text-primary-900 text-sm mx-2.5">{formik.values.email}</p>
                <CarretDownIcon className="h-2 w-2 text-primary-900 mr-1.5" />
              </Button>
            )}
          </div>

          <div className="flex items-center mt-10">
            <TextField
              label="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className={cn(step === 1 ? "block" : "hidden")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}
            />
            <TextField
              password
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              className={cn(step === 2 ? "block" : "hidden")}
              icon={{
                right: showPassword ? EyeIcon : EyeOffIcon,
                className: !showPassword ? "pt-1.5" : "pt-0.5",
                onClick: () => setShowPassword(!showPassword),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.password && Boolean(formik.errors.password) ? formik.errors.password : null}
            />
          </div>

          {/* Errors */}
          <div className="row-span-5 flex items-center justify-start">
            {error ? <h6 className="ml-1 text-xs font-semibold leading-none text-red-400">{error}</h6> : null}
          </div>
        </div>
        <div className="flex justify-end items-center gap-1">
          {step === 1 && (
            <>
              <Button
                variant="link"
                className="hover:no-underline hover:text-secondary-500 text-primary-900 text-sm font-medium"
              >
                forgot email?
              </Button>
              <Button
                type="button"
                className="rounded-full px-6 bg-secondary-400 hover:bg-secondary-600"
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button
                type="button"
                variant="link"
                className="hover:no-underline hover:text-secondary-500 text-primary-900 text-sm font-medium"
              >
                forgot password?
              </Button>
              <Button type="submit" className="rounded-full px-6 bg-secondary-400 hover:bg-secondary-600">
                Signin
              </Button>
            </>
          )}
        </div>
      </form>

      <div className="mx-auto w-full max-w-4xl pt-2.5 px-4 flex items-center">
        <div className="text-xs font-bold text-neutral-700">Version {AppVersion}</div>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="hover:bg-neutral-300/50 text-neutral-700 text-sm">
            About
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-neutral-300/50 text-neutral-700 text-sm">
            Help
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
