import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

import PesoIcon from "~icons/custom/peso";
import BoxIcon from "~icons/custom/box";

const Pricing = ({ tabs, handleNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const current_tab = tabs.find((tab) => tab.label === "Pricing");
  const product = tabs.find((tab) => tab.label === "Information");

  const validationSchema = Yup.object({
    price: Yup.number("Enter price").required("Price is required"),
    stock: Yup.number("Enter stock").required("Stock is required"),
    location: Yup.string("Enter location").required("locator is required"),
    expiryDate: Yup.date("Enter expiry data").required(
      "Expiry data is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      price: current_tab.data?.price ?? "",
      stock: current_tab.data?.stock ?? "",
      location: current_tab.data?.location ?? "",
      expiryDate: current_tab.data?.expiryDate ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setLoading(true);

      const res = await window.api.UpdateProduct({
        _id: product.data._id,
        data: values,
      });
      const parseResult = JSON.parse(res);

      if (parseResult.error) {
        setErrors(parseResult.error);
      }

      if (parseResult.data) {
        const createBatch = await window.api.CreateProductBatch({
          _id: product.data._id,
          data: values,
        });
        const parseBatchResult = JSON.parse(createBatch);

        if (parseBatchResult.error) {
          setErrors(parseBatchResult.error);
        }

        if (parseBatchResult.data) {
          handleNext({
            current: "Pricing",
            data: { _id: parseResult.data._id, ...values },
            next: "Settings",
          });
        }
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
        <p className="text-xl font-black leading-7 tracking-wide text-secondary-500 font-white">
          Pricing
        </p>
        <p className="text-sm text-primary-700">
          Set product pricing, stocks, and expiration date
        </p>
      </div>
      <Separator className="my-6 bg-gray-500/40" />

      <form className="space-3" onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                formik.touched.price && Boolean(formik.errors.price)
                  ? "text-red-500"
                  : null
              )}
            >
              Price
            </p>
            <p className="mb-2 text-xs text-primary-700">
              Set the product name
            </p>
            <TextField
              type="number"
              name="price"
              id="price"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.price ?? ""}
              className="w-2/4"
              icon={{
                left: PesoIcon,
                className: "inset-y-2.5 mr-1 ml-3 !text-primary-700",
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={
                formik.touched.price && Boolean(formik.errors.price)
                  ? formik.errors.price
                  : null
              }
              disabled={current_tab.completed}
            />
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                formik.touched.stock && Boolean(formik.errors.stock)
                  ? "text-red-500"
                  : null
              )}
            >
              Stock
            </p>
            <p className="mb-2 text-xs text-primary-700">Set the description</p>
            <TextField
              type="number"
              name="stock"
              id="stock"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.stock ?? ""}
              icon={{
                left: BoxIcon,
                className: "inset-y-2 !text-primary-800 h-5 w-6",
              }}
              className="w-2/4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={
                formik.touched.stock && Boolean(formik.errors.stock)
                  ? formik.errors.stock
                  : null
              }
              disabled={current_tab.completed}
            />
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
                  ? "text-red-500"
                  : null
              )}
            >
              Expiration
            </p>
            <p className="mb-2 text-xs text-primary-700">Set the expiration</p>
            <TextField
              type="date"
              name="expiryDate"
              id="expiryDate"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.expiryDate ?? ""}
              className="w-2/4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
                  ? formik.errors.expiryDate
                  : null
              }
              disabled={current_tab.completed}
            />
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-medium",
                formik.touched.location && Boolean(formik.errors.location)
                  ? "text-red-500"
                  : null
              )}
            >
              Locator
            </p>
            <p className="mb-2 text-xs text-primary-700">
              Set the product location
            </p>
            <TextField
              type="text"
              name="location"
              id="location"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.location ?? ""}
              icon={{
                left: BoxIcon,
                className: "inset-y-2 !text-primary-800 h-5 w-6",
              }}
              className="w-2/4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={
                formik.touched.location && Boolean(formik.errors.location)
                  ? formik.errors.location
                  : null
              }
              disabled={current_tab.completed}
            />
          </div>
        </div>

        {!current_tab.completed && (
          <Button
            type="submit"
            className="px-6 bg-tertiary-600 hover:bg-tertiary-700"
            disabled={
              isLoading ||
              !formik.values.price ||
              !formik.values.stock ||
              !formik.values.expiryDate
            }
          >
            Continue
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
      </form>
    </div>
  );
};

export default Pricing;
