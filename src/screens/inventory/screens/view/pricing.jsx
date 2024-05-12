import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import { Button, Separator } from "@/components/ui";
import { cn } from "@/lib/utils";

import PesoIcon from "~icons/custom/peso";
import BoxIcon from "~icons/custom/box";
import PricingBatch from "./pricing-batch";

const Pricing = ({ tabs, handleNext, product }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [batches, setBatches] = useState([]);
  const [addBatch, setAddBatch] = useState(false);

  const current_tab = tabs.find((tab) => tab.label === "Pricing");

  const handleGetProductBatch = async () => {
    const batch = await window.api.GetAllProductBatch({ _id: product });
    const parseResult = JSON.parse(batch);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      setBatches(parseResult.data);
    }
  };

  useEffect(() => {
    console.log("fxv");
    handleGetProductBatch();
  }, [isLoading]);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-black leading-7 tracking-wide text-secondary-500 font-white">
            Pricing
          </p>
          <p className="text-sm text-primary-700">
            Set product pricing, stocks, and expiration date
          </p>
        </div>
        {!current_tab.completed && !addBatch && (
          <Button
            type="submit"
            className="px-6 bg-tertiary-600 hover:bg-tertiary-700"
            disabled={isLoading}
            onClick={() => setAddBatch(true)}
          >
            Add New Batch
          </Button>
        )}
      </div>
      <Separator className="my-6 bg-gray-500/40" />

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <svg
            aria-hidden="true"
            class="w-32 h-32 text-gray-200 animate-spin fill-secondary-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="space-6">
          <div className="grid grid-cols-5 gap-6">
            <div className="w-full">
              <p className={cn("text-sm font-medium")}>Price</p>
              <p className="mb-2 text-xs text-primary-700">
                Set the product name
              </p>
            </div>
            <div className="w-full">
              <p className={cn("text-sm font-medium")}>Stock</p>
              <p className="mb-2 text-xs text-primary-700">
                Set the description
              </p>
            </div>
            <div className="w-full">
              <p className={cn("text-sm font-medium")}>Expiration</p>
              <p className="mb-2 text-xs text-primary-700">
                Set the expiration
              </p>
            </div>
            <div className="w-full">
              <p className={cn("text-sm font-medium")}>Locator</p>
              <p className="mb-2 text-xs text-primary-700">
                Set the product location
              </p>
            </div>

            <div className="w-full">
              <p className={cn("text-sm font-medium")}>Controls</p>
              <p className="mb-2 text-xs text-primary-700">Manage this Batch</p>
            </div>
          </div>

          {batches?.length > 0 &&
            batches.map((batch, i) => (
              <PricingBatch
                key={i}
                tabs={tabs}
                handleNext={handleNext}
                batch={batch._id}
                product={product}
                update={setLoading}
              />
            ))}

          {addBatch && (
            <PricingBatch
              tabs={tabs}
              handleNext={handleNext}
              product={product}
              newBatch={addBatch}
              onCancel={() => setAddBatch(false)}
              update={setLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pricing;
