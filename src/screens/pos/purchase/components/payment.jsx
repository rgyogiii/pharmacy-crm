import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

import { Button, Dialog, Select } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useData, useOrder } from "@/hooks";

import PesoIcon from "~icons/custom/peso";
import DiscountIcon from "~icons/custom/discount";

const { DialogComponent } = Dialog;
const {
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} = DialogComponent;

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

const isObjNotEmpty = (obj) => {
  return _.some(obj, (value) => !_.isEmpty(value));
};

const formatNumber = (num) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Payment = ({
  className,
  onConfirm = () => {},
  onClick = () => {},
  disabled = false,
  update,
  isPaymentOpen,
  setPaymentOpen,
  controlled,
}) => {
  const [isOpen, setOpen] = useState(true);
  const { customer, physician, updateOrder, updateProducts } = useData();
  const { orders, amount, handleCalculateChange } = useOrder();
  const [discountType, setDiscountType] = useState(null);

  const validationSchema = Yup.object({
    cash: Yup.number("Enter cash"),
    idType: Yup.string("Enter ID type"),
    idNumber: Yup.string("Enter ID number"),
    discount: Yup.number("Enter discount"),
  });

  const formik = useFormik({
    initialValues: {
      cash: "",
      idType: "",
      idNumber: "",
      discount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const res = await window.api.CreateOrder({
        customer: customer?._id,
        orders,
        physician: physician?._id ?? null,
      });
      const parseResult = JSON.parse(res);

      if (parseResult.error) {
        console.error(parseResult.error);
      }

      if (parseResult.data) {
        handleCalculateChange(values.cash, values.discount);
        updateOrder(parseResult.data);
        updateProducts();
        onConfirm && onConfirm(values);
      }

      controlled ? setPaymentOpen(!isPaymentOpen) : setOpen(false);
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleSync = () => {
    customer?.idType && formik.setFieldValue("idType", customer.idType);
    customer?.idNumber && formik.setFieldValue("idNumber", customer.idNumber);
  };

  // useEffect(() => {
  //   setForceOpen(false);
  // }, [customer]);

  return (
    <DialogContainer
      {...(controlled
        ? { open: isPaymentOpen }
        : { ...(!isOpen ? { open: false } : {}) })}
      onOpenChange={(val) => {
        controlled ? setPaymentOpen(!isPaymentOpen) : setOpen(true);
        formik.resetForm();
        handleSync();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-auto px-6 bg-tertiary-600 hover:bg-tertiary-700 text-primary-50 hover:text-primary-50 gap-2",
            className
          )}
          onClick={onClick}
          disabled={disabled}
        >
          <span>Payment</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[475px] gap-2"
        onInteractOutside={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Customer #{customer?._id}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-0.5 col-span-2">
            <p className={cn("text-sm font-medium")}>Cash</p>
            <TextField
              type="number"
              name="cash"
              id="cash"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              icon={{
                left: PesoIcon,
                className: "inset-y-2.5 mr-1 ml-3 !text-primary-700",
              }}
              value={formik.values.cash ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={
                formik.touched.cash && Boolean(formik.errors.cash)
                  ? formik.errors.cash
                  : null
              }
              helpers={false}
            />
            {formik.values.cash !== "" && formik.values.cash < amount.total ? (
              <p className="text-red-500 text-xs font-semibold ml-1 !mt-1">
                Input exact or greater cash amount
              </p>
            ) : (
              <div className="flex items-center gap-1 text-secondary-700 text-xs font-semibold ml-1 !mt-1">
                Total amount to pay
                <span className="flex items-center gap-0.5">
                  <PesoIcon className="w-3 h-3" />
                  {formatNumber(amount.total)}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-0.5 col-span-2">
            <p className={cn("text-sm font-medium")}>Discount</p>
            <SelectContainer
              name="discount"
              id="discount"
              onValueChange={(val) => formik.setFieldValue("discount", val)}
              value={formik.values.discount ?? ""}
            >
              <SelectTrigger className={cn("w-full")}>
                <SelectValue placeholder="Select ID types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ID Types</SelectLabel>
                  <SelectItem value={20}>Senior Citizen</SelectItem>
                  <SelectItem value={20}>PWD</SelectItem>
                  <SelectItem value={5}>SUKI CARDS</SelectItem>
                  <SelectItem value={20}>OTHERS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectContainer>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="w-auto px-4 text-red-500 bg-transparent hover:bg-red-400 hover:text-primary-50"
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="ghost"
            className="w-auto gap-2 px-4 bg-tertiary-600 hover:bg-tertiary-700 text-primary-50 hover:text-primary-50"
            onClick={formik.handleSubmit}
            disabled={formik.values.cash < amount.total || !formik.values.cash}
          >
            <span>Complete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

export default Payment;
