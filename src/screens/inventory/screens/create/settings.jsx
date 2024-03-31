import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Badge, Button, Select, Separator, Switch } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";

const { SelectContainer, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } =
  Select;

const Settings = ({ tabs, handleNext }) => {
  const navigate = useNavigate();

  const [active, setActive] = useState(false);
  const [prescribe, setPrescribe] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputTags, setInputTags] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const current_tab = tabs.find((tab) => tab.label === "Settings");
  const product = tabs.find((tab) => tab.label === "Information");

  const handleSubmit = async () => {
    setLoading(true);

    const res = await window.api.UpdateProduct({
      _id: product.data._id,
      data: { tags, active, isPrescriptionRequired: prescribe },
    });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      handleNext({ current: "Settings", data: { tags, active, isPrescriptionRequired: prescribe } });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (current_tab.data?.tags) setTags(current_tab.data.tags);
    if (current_tab.data?.isPrescriptionRequired) setPrescribe(current_tab.data.isPrescriptionRequired);
    if (current_tab.data?.active) setActive(current_tab.data.active);
  }, []);

  return (
    <div className="flex-1 max-w-2xl">
      <div>
        <p className="text-xl font-black text-secondary-500 leading-7 tracking-wide font-white">Settings</p>
        <p className="text-primary-700 text-sm">Set precsription, active, and tags.</p>
      </div>
      <Separator className="bg-gray-500/40 my-6" />

      <div className="space-y-4">
        <div className="w-full space-y-2">
          <div>
            <p className={cn("text-sm font-medium")}>Tags</p>
            <p className="text-xs text-primary-700">This sets the tags for better hits</p>
          </div>
          <div className="flex w-2/6 gap-2">
            <TextField
              type="text"
              name="tags"
              id="tags"
              autoComplete="off"
              textboxClassName="py-1.5 disabled:text-gray-400"
              value={inputTags}
              onChange={(e) => setInputTags(e.target.value)}
              helpers={false}
              disabled={current_tab.completed}
            />
            <Button
              size="sm"
              variant="outline"
              className="px-3 h-auto border-primary-400 hover:text-secondary-500 hover:border-secondary-500"
              onClick={() => {
                setInputTags("");
                inputTags && setTags((prev) => (prev.includes(inputTags) ? prev : [...prev, inputTags]));
              }}
              disabled={current_tab.completed}
            >
              Add Tag
            </Button>
          </div>
          <div className="my-2 flex flex-wrap gap-2 !mt-4">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                className="rounded-md text-[11px] h-5 px-1.5 py-0 bg-secondary-500 text-primary-50 hover:bg-red-500"
                onClick={() => setTags(tags.filter((item) => item !== tag))}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Separator className="bg-gray-500/40 !my-8" />
        <div className="flex items-center w-4/5 border border-primary-400 p-4 rounded-2xl">
          <div className="w-full">
            <p className={cn("text-sm font-medium")}>Prescription Required</p>
            <p className="text-xs text-primary-700">This sets the product or medicine if prescription is required</p>
          </div>
          <Switch
            className="disabled:!opacity-100"
            checked={prescribe}
            onCheckedChange={(val) => setPrescribe(val)}
            disabled={current_tab.completed}
          />
        </div>
        <div className="flex items-center w-4/5 border border-primary-400 p-4 rounded-2xl !mb-4">
          <div className="w-full">
            <p className={cn("text-sm font-medium")}>Active</p>
            <p className="text-xs text-primary-700">This sets the product or medicine to be added for selling</p>
          </div>
          <Switch
            className="disabled:!opacity-100"
            checked={active}
            onCheckedChange={(val) => setActive(val)}
            disabled={current_tab.completed}
          />
        </div>

        {!current_tab.completed ? (
          <Button className="px-6 bg-tertiary-600 hover:bg-tertiary-700" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button className="px-6 bg-secondary-600 hover:bg-secondary-700" onClick={() => navigate("/inventory")}>
            Complete
          </Button>
        )}

        <div className={cn("flex items-center justify-start pb-2 h-6", errors ? "visible" : "invisible")}>
          <h6 className="text-xs font-semibold leading-none text-red-400">{errors ?? ""}</h6>
        </div>
      </div>
    </div>
  );
};

export default Settings;
