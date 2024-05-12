import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import { Button, Separator, Switch, Tooltip } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

import { useAlert } from "@/hooks";

import PesoIcon from "~icons/custom/peso";
import BoxIcon from "~icons/custom/box";
import EyeIcon from "~icons/custom/eye";
import EditIcon from "~icons/custom/edit";
import TrashIcon from "~icons/custom/trash";

const PricingBatch = ({
  newBatch = false,
  onCancel,
  tabs,
  handleNext,
  batch,
  product,
  update,
}) => {
  const alert = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allowEdit, setAllowEdit] = useState(newBatch ?? false);
  const [errors, setErrors] = useState(null);

  const current_tab = tabs.find((tab) => tab.label === "Pricing");

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
      active: false,
      price: "",
      stock: "",
      location: "",
      expiryDate: moment(current_tab.data?.expiryDate ?? "").format(
        "YYYY-MM-DD"
      ),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setLoading(true);
      if (newBatch) {
        await handleCreateBatch(values);
      } else {
        await handleUpdateBatch(values);
      }
      setLoading(false);
    },
  });

  const handleCreateBatch = async (values) => {
    update(true);
    const res = await window.api.CreateProductBatch({
      _id: product,
      data: values,
    });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      onCancel();
      handleNext({
        current: "Pricing",
        data: { _id: parseResult.data._id, ...values },
        next: "Settings",
      });
    }
    setTimeout(() => update(false), 1000);
  };

  const handleUpdateBatch = async (values) => {
    update(true);
    const res = await window.api.UpdateProductBatch({
      _id: batch,
      data: values,
    });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      setAllowEdit(false);
      handleNext({
        current: "Pricing",
        data: { _id: parseResult.data._id, ...values },
        next: "Settings",
      });
    }
    setTimeout(() => update(false), 1000);
  };

  const handleSetProductBatch = async (values) => {
    console.log("zxc", { values });
    update(true);
    const res = await window.api.SetProductBatch({
      _id: batch,
      product,
    });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      handleNext({
        current: "Pricing",
        data: { _id: batch, ...values },
        next: "Settings",
      });
    }
    setTimeout(() => update(false), 1000);
  };

  const handleRemoveBatch = async () => {
    update(true);
    const res = await window.api.RemoveProductBatch({ _id: batch });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    setTimeout(() => update(false), 1000);
  };

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleGetProductBatch = async () => {
    console.log({ batch });

    const res = await window.api.GetProductBatch({ _id: batch });
    const parseResult = JSON.parse(res);

    console.log({ parseResult, batch });

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      formik.setFieldValue("active", parseResult.data.active);
      formik.setFieldValue("price", parseResult.data.price);
      formik.setFieldValue("stock", parseResult.data.stock);
      formik.setFieldValue("location", parseResult.data.location);
      formik.setFieldValue(
        "expiryDate",
        moment(parseResult.data.expiryDate).format("YYYY-MM-DD")
      );
    }
  };

  useEffect(() => {
    handleGetProductBatch();
    console.log({ batch });
  }, [batch]);

  return (
    <form className="space-3" onSubmit={formik.handleSubmit}>
      <div
        className={cn(
          "flex items-center justify-start pb-2 h-6",
          errors ? "block" : "hidden"
        )}
      >
        <h6 className="text-xs font-semibold leading-none text-red-400">
          error: {errors ?? ""}
        </h6>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <div className="w-full">
          <TextField
            type="number"
            name="price"
            id="price"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.price ?? ""}
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
            disabled={!allowEdit}
          />
        </div>
        <div className="w-full">
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.stock && Boolean(formik.errors.stock)
                ? formik.errors.stock
                : null
            }
            disabled={!allowEdit}
          />
        </div>
        <div className="w-full">
          <TextField
            type="date"
            name="expiryDate"
            id="expiryDate"
            autoComplete="off"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.expiryDate ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
                ? formik.errors.expiryDate
                : null
            }
            disabled={!allowEdit}
          />
        </div>
        <div className="w-full">
          <TextField
            type="text"
            name="location"
            id="location"
            autoComplete="off"
            placeholder="Cabinet A-2"
            textboxClassName="py-2 disabled:text-gray-400"
            value={formik.values.location ?? ""}
            icon={{
              left: BoxIcon,
              className: "inset-y-2 !text-primary-800 h-5 w-6",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.location && Boolean(formik.errors.location)
                ? formik.errors.location
                : null
            }
            disabled={!allowEdit}
          />
        </div>

        <div className="w-full">
          {newBatch ? (
            <div className="flex items-center self-stretch gap-2">
              <Button
                type="button"
                className="w-full bg-neutral-300 text-neutral-400 hover:bg-neutral-400 hover:text-white"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full bg-tertiary-600 hover:bg-tertiary-700"
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          ) : allowEdit ? (
            <div className="flex items-center self-stretch gap-2">
              <Button
                type="button"
                className="w-full bg-neutral-300 text-neutral-400 hover:bg-neutral-400 hover:text-white"
                onClick={() => setAllowEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full bg-secondary-600 hover:bg-secondary-700"
                disabled={isLoading}
              >
                Update
              </Button>
            </div>
          ) : (
            <div className="h-[38px] flex items-center gap-2">
              <Switch
                checked={formik.values.active}
                name="location"
                onCheckedChange={() =>
                  alert.open({
                    title: "Are you sure you want to switch to this batch?",
                    description:
                      "This action can be changed anytime. This batch will be active and will deactivate the other batches",
                    leftBtnText: "Cancel",
                    rightBtnText: `Yes, Activate`,
                    onRightBtnClick: handleSetProductBatch,
                  })
                }
                disabled={formik.values.active}
              />

              {!current_tab.completed && (
                <>
                  <Tooltip title="edit" variant="success">
                    <Button
                      type="button"
                      className="h-6 p-2 px-1 text-xs bg-green-600 shadow-xl hover:bg-green-700 disabled:!cursor-not-allowed disabled:bg-green-600"
                      onClick={() => setAllowEdit(true)}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title="delete"
                    variant="error"
                    disabled={formik.values.active}
                  >
                    <Button
                      type="button"
                      className="h-6 p-2 px-1 text-xs bg-red-400 shadow-xl hover:bg-red-600 disabled:!cursor-not-allowed disabled:bg-red-400"
                      onClick={() =>
                        alert.open({
                          title: "Are you sure you want to remove this batch?",
                          description:
                            "This action cannot be undone. This will remove the product batch and it's associated records",
                          leftBtnText: "Cancel",
                          rightBtnText: `Yes, Remove`,
                          onRightBtnClick: handleRemoveBatch,
                        })
                      }
                      disabled={formik.values.active}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PricingBatch;
