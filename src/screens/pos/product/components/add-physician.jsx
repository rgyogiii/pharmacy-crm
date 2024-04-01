import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

import { Button, Dialog, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useData } from "@/hooks";

import PlusIcon from "~icons/custom/plus";
import SearchIcon from "~icons/custom/search";

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

const AddPhysician = ({ onClick = () => {}, disabled = false, update }) => {
  const [isOpen, setOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchPhysician, setSearchPhysician] = useState("");
  const [searhResult, setSearchResult] = useState(null);

  const { physicians, physician, updatePhysician, updatePhysicians } = useData();

  const validationSchema = Yup.object({
    name: Yup.string("Enter name"),
    idNumber: Yup.string("Enter ID number"),
    institution: Yup.string("Enter institution"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      idNumber: "",
      institution: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      if (searhResult) {
        updatePhysician(searhResult);
        setOpen(false);
        setTimeout(() => {
          setSearchResult(null);
          setShowForm(false);
          setSearchPhysician("");
        }, 100);
      } else {
        await handleCreatePhysician(values);
      }
    },
  });

  const handleCreatePhysician = async (values) => {
    const res = await window.api.CreatePhysician(values);
    const parseResult = JSON.parse(res);
    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      updatePhysicians();
      updatePhysician(parseResult.data);
      setShowForm(false);
    }

    setOpen(false);
  };

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleSearchByIdNumber = (id) => {
    if (id === "") {
      setSearchResult(null);
    } else {
      const filteredPhysicians = physicians.filter((item) => item.idNumber.toLowerCase().includes(id.toLowerCase()));
      if (filteredPhysicians.length > 0) {
        setSearchResult(filteredPhysicians[0]);
        formik.setFieldValue("name", filteredPhysicians[0].name);
        formik.setFieldValue("idNumber", filteredPhysicians[0].idNumber);
        formik.setFieldValue("institution", filteredPhysicians[0].institution);
      } else {
        setSearchResult(null);
      }
    }

    setSearchPhysician(id);
  };

  const handleSync = () => {
    physician?.name && formik.setFieldValue("name", physician.name);
    physician?.idNumber && formik.setFieldValue("idNumber", physician.idNumber);
    physician?.institution && formik.setFieldValue("institution", physician.institution);
  };

  return (
    <DialogContainer
      {...(!isOpen ? { open: false } : {})}
      onOpenChange={(val) => {
        setOpen(true);
        physicians?.length === 0 && setShowForm(true);

        !val
          ? setTimeout(() => {
              formik.resetForm();
              setSearchResult(null);
              setShowForm(false);
              setSearchPhysician("");
            }, 100)
          : handleSync();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-32 h-28 p-0 bg-secondary-600 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-2 text-sm ml-auto"
          onClick={onClick}
          disabled={disabled}
        >
          Add
          <br />
          Physician
          <br />
          Information
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[475px] gap-2">
        <DialogHeader>
          <DialogTitle>Add physician information</DialogTitle>
          <DialogDescription>Search physician or add a new one for prescription</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {showForm ? (
            <>
              <div className="space-y-0.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    formik.touched.idNumber && Boolean(formik.errors.idNumber) ? "text-red-500" : null
                  )}
                >
                  ID Number
                </p>
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
                {formik.touched.idNumber && Boolean(formik.errors.idNumber) && (
                  <p className="text-[11px] text-red-700 mb-2 ml-1 font-semibold">{formik.errors.idNumber}</p>
                )}
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
              <div className="space-y-0.5 col-span-2">
                <p className={cn("text-sm font-medium")}>Institution</p>
                <TextField
                  type="text"
                  name="institution"
                  id="institution"
                  autoComplete="off"
                  textboxClassName="py-2 disabled:text-gray-400"
                  value={formik.values.institution ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={handleFieldTouch}
                  error={formik.touched.institution && Boolean(formik.errors.institution) ? formik.errors.institution : null}
                  helpers={false}
                />
              </div>
            </>
          ) : physicians?.length > 0 ? (
            <>
              <div className="relative col-span-2">
                <TextField
                  placeholder={`Search by physician id`}
                  type="text"
                  name="filter-search"
                  id="filter-search"
                  autoComplete="off"
                  value={searchPhysician}
                  onChange={(e) => handleSearchByIdNumber(e.target.value)}
                  textboxClassName="py-2 border-primary-600 hover:!border-secondary-500 focus:!border-primary-900 !pr-9"
                  icon={{
                    left: SearchIcon,
                    className: "inset-y-[11px] h-4 w-4 left-1",
                  }}
                  helpers={false}
                />
                <Button
                  className={cn(
                    "bg-red-400 hover:bg-red-600 shadow-xl rounded-full h-5 w-5 p-1 right-2 inset-y-2 z-20",
                    searchPhysician === "" ? "hidden" : "absolute"
                  )}
                  onClick={() => {
                    setSearchPhysician("");
                    setSearchResult(null);
                    updatePhysician(null);
                  }}
                >
                  <PlusIcon className="h-full w-full rotate-45" />
                </Button>
              </div>
              {!searhResult ? (
                <div className="col-span-2 text-center text-sm font-semibold h-60 flex flex-col items-center justify-center gap-4">
                  <span>No Physician found</span>
                  <div className="flex items-center justify-center w-full">
                    <Separator className="bg-primary-600 w-8" />
                    <span className="mx-2 mb-1 text-primary-600 ">or</span>
                    <Separator className="bg-primary-600 w-8" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-auto px-4 bg-secondary-600 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-2"
                    onClick={() => {
                      setShowForm(true);
                      updatePhysician(null);
                      formik.resetForm();
                    }}
                  >
                    <span>Add New Physician</span>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-0.5">
                    <p className={cn("text-sm font-medium")}>ID Number</p>
                    <TextField
                      type="text"
                      name="idNumber"
                      id="idNumber"
                      autoComplete="off"
                      textboxClassName="py-2 disabled:text-gray-400"
                      value={searhResult.idNumber ?? ""}
                      helpers={false}
                      disabled
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
                      value={searhResult.name ?? ""}
                      helpers={false}
                      disabled
                    />
                  </div>
                  <div className="space-y-0.5 col-span-2">
                    <p className={cn("text-sm font-medium")}>Institution</p>
                    <TextField
                      type="text"
                      name="institution"
                      id="institution"
                      autoComplete="off"
                      textboxClassName="py-2 disabled:text-gray-400"
                      value={searhResult.institution ?? ""}
                      helpers={false}
                      disabled
                    />
                  </div>
                </>
              )}
            </>
          ) : null}
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
            disabled={!formik.values.idNumber && (_.isEmpty(searhResult) || !formik.values.idNumber)}
          >
            <span>Select & Continue</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

export default AddPhysician;
