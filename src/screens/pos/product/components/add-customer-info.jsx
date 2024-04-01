import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

import { Button, Dialog } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useData } from "@/hooks";

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

const isObjNotEmpty = (obj) => {
  return _.some(obj, (value) => !_.isEmpty(value));
};

const isCustomerNotEmpty = (obj) => {
  return _.some(obj, (value, key) => {
    if (key !== "_id" && key !== "createdAt" && key !== "updatedAt" && key !== "__v") {
      return !_.isEmpty(value);
    } else {
      return false;
    }
  });
};

const hasChanges = (original, formikValues) => {
  return _.some(original, (value, key) => {
    if (formikValues[key] !== undefined) {
      if (value === null && formikValues[key] === "") {
        return false;
      } else if (formikValues[key] === value) {
        return false;
      } else {
        return true;
      }
    }
  });
};

const AddCustomerInfo = ({ onClick = () => {}, disabled = false, update }) => {
  const [isOpen, setOpen] = useState(true);
  const { customer, updateCustomer } = useData();

  const validationSchema = Yup.object({
    name: Yup.string("Enter name"),
    idType: Yup.string("Enter ID type"),
    idNumber: Yup.string("Enter ID number"),
    address: Yup.string("Enter address"),
    phone: Yup.number("Enter phone"),
    email: Yup.date("Enter expiry email"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      idType: "",
      idNumber: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      const res = await window.api.UpdateCustomer({ _id: customer?._id, data: values });
      const parseResult = JSON.parse(res);

      if (parseResult.error) {
        console.error(parseResult.error);
      }

      if (parseResult.data) {
        updateCustomer(parseResult.data);
      }

      setOpen(false);
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleSync = () => {
    customer?.name && formik.setFieldValue("name", customer.name);
    customer?.idType && formik.setFieldValue("idType", customer.idType);
    customer?.idNumber && formik.setFieldValue("idNumber", customer.idNumber);
    customer?.address && formik.setFieldValue("address", customer.address);
    customer?.phone && formik.setFieldValue("phone", customer.phone);
    customer?.email && formik.setFieldValue("email", customer.email);
  };

  return (
    <DialogContainer
      {...(!isOpen ? { open: false } : {})}
      onOpenChange={(val) => {
        setOpen(true);
        !val ? formik.resetForm() : handleSync();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-32 h-28 p-0 bg-secondary-600 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-2 text-sm"
          onClick={onClick}
          disabled={disabled}
        >
          {!isCustomerNotEmpty(customer) ? "Add" : "Update"}
          <br />
          Customer
          <br />
          Information
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[475px] gap-2">
        <DialogHeader>
          <DialogTitle>{!isCustomerNotEmpty(customer) ? "Add" : "Update"} customer information</DialogTitle>
          <DialogDescription>Customer #{customer?._id}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-0.5">
            <p className={cn("text-sm font-medium")}>ID Number</p>
            <TextField
              type="text"
              name="idNumber"
              id="idNumber"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.idNumber ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.idNumber && Boolean(formik.errors.idNumber) ? formik.errors.idNumber : null}
              helpers={false}
            />
          </div>
          <div className="space-y-0.5">
            <p className={cn("text-sm font-medium")}>ID type</p>
            <TextField
              type="text"
              name="idType"
              id="idType"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.idType ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.idType && Boolean(formik.errors.idType) ? formik.errors.idType : null}
              helpers={false}
            />
          </div>
          <div className="space-y-0.5">
            <p className={cn("text-sm font-medium")}>Name</p>
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
              helpers={false}
            />
          </div>
          <div className="space-y-0.5">
            <p className={cn("text-sm font-medium")}>Email</p>
            <TextField
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.email ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}
              helpers={false}
            />
          </div>
          <div className="space-y-0.5 col-span-2">
            <p className={cn("text-sm font-medium")}>Address</p>
            <TextField
              type="text"
              name="address"
              id="address"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.address ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.address && Boolean(formik.errors.address) ? formik.errors.address : null}
              helpers={false}
            />
          </div>
          <div className="space-y-0.5">
            <p className={cn("text-sm font-medium")}>Phone</p>
            <TextField
              type="number"
              name="phone"
              id="phone"
              autoComplete="off"
              textboxClassName="py-2 disabled:text-gray-400"
              value={formik.values.phone ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFieldTouch}
              error={formik.touched.phone && Boolean(formik.errors.phone) ? formik.errors.phone : null}
              helpers={false}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="w-auto px-4 bg-transparent hover:bg-red-400 text-red-500 hover:text-primary-50"
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="ghost"
            className="w-auto px-4 bg-secondary-600 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-2"
            onClick={formik.handleSubmit}
            disabled={!isObjNotEmpty(formik.values) || !hasChanges(customer, formik.values)}
          >
            <span>Save Information</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

export default AddCustomerInfo;
