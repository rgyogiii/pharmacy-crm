import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

const Information = ({ tabs, handleNext, product }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const current_tab = tabs.find((tab) => tab.label === "Information");

  console.log({ current_tab });
  const validationSchema = Yup.object({
    name: Yup.string("Enter name").required("Name is required"),
    description: Yup.string("Enter description").required("Description is required"),
    manufacturer: Yup.string("Enter manufacturer").required("Manufacturer is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      manufacturer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setLoading(true);

      const res = await window.api.UpdateProduct({ _id: product, data: values });
      const parseResult = JSON.parse(res);

      console.log({ parseResult });
      if (parseResult.error) {
        setErrors(parseResult.error);
      }

      if (parseResult.data) {
        handleNext({ current: "Information", data: { _id: parseResult.data._id, ...values }, next: "Pricing" });
      }

      setLoading(false);
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleGetProduct = async () => {
    const res = await window.api.GetProduct({ _id: product });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      formik.setFieldValue("name", parseResult.data.name);
      formik.setFieldValue("description", parseResult.data.description);
      formik.setFieldValue("manufacturer", parseResult.data.manufacturer);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className="flex-1 max-w-2xl">
      <div>
        <p className="text-xl font-black text-secondary-500 leading-7 tracking-wide font-white">Information</p>
        <p className="text-primary-700 text-sm">Create a product information</p>
      </div>
      <Separator className="bg-gray-500/40 my-6" />

      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div>
          <p
            className={cn("text-sm font-medium", formik.touched.name && Boolean(formik.errors.name) ? "text-red-500" : null)}
          >
            Name
          </p>
          <p className="text-xs text-primary-700 mb-2">Set the product name</p>
          <TextField
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.name ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={formik.touched.name && Boolean(formik.errors.name) ? formik.errors.name : null}
            disabled={current_tab.completed}
          />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              formik.touched.description && Boolean(formik.errors.description) ? "text-red-500" : null
            )}
          >
            Description
          </p>
          <p className="text-xs text-primary-700 mb-2">Set the description</p>
          <TextField
            type="text"
            name="description"
            id="description"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.description ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={formik.touched.description && Boolean(formik.errors.description) ? formik.errors.description : null}
            disabled={current_tab.completed}
          />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              formik.touched.manufacturer && Boolean(formik.errors.manufacturer) ? "text-red-500" : null
            )}
          >
            Manufacturer
          </p>
          <p className="text-xs text-primary-700 mb-2">Set the manufacturer</p>
          <TextField
            type="text"
            name="manufacturer"
            id="manufacturer"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.manufacturer ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer) ? formik.errors.manufacturer : null}
            disabled={current_tab.completed}
          />
        </div>

        {!current_tab.completed && (
          <Button
            type="submit"
            className="px-6 bg-tertiary-600 hover:bg-tertiary-700"
            disabled={isLoading || !formik.values.name || !formik.values.description || !formik.values.manufacturer}
          >
            Save & Update
          </Button>
        )}

        <div className={cn("flex items-center justify-start pb-2 h-6", errors ? "visible" : "invisible")}>
          <h6 className="text-xs font-semibold leading-none text-red-400">{errors ?? ""}</h6>
        </div>
      </form>
    </div>
  );
};

export default Information;
