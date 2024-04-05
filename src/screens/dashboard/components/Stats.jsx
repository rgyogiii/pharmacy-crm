import { cn } from "@/lib/utils";

import PesoIcon from "~icons/custom/peso";
import UpIcon from "~icons/custom/up";
import DownIcon from "~icons/custom/down";
import { useEffect, useState } from "react";
import { useData } from "@/hooks";
import { Button } from "@/components/ui";

const formatNumber = (num) => {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const Stats = ({
  revenue,
  product,
  customers,
  stocks,
  revenueIncrement = "",
  productIncrement = "",
  customerIncrement = "",
}) => {
  const [filter, setFilter] = useState("daily");
  const { stats, updateStats } = useData();

  useEffect(() => {
    updateStats(filter);
  }, [filter]);

  return (
    <div className="space-y-2">
      <div className="flex justify-end bg-transparent rounded-3xl gap-x-1">
        <Button
          variant="outline"
          className={cn(
            "w-16 h-6 p-0 text-xs bg-primary-400/70 hover:bg-secondary-600 hover:text-primary-50",
            filter === "daily" && "bg-secondary-400 text-primary-50"
          )}
          onClick={() => setFilter("daily")}
        >
          Daily
        </Button>
        <Button
          variant="outline"
          className={cn(
            "w-16 h-6 p-0 text-xs bg-primary-400/70 hover:bg-secondary-600 hover:text-primary-50",
            filter === "monthly" && "bg-secondary-400 text-primary-50"
          )}
          onClick={() => setFilter("monthly")}
        >
          Monthly
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-8 p-4 shadow-xl outline outline-1 outline-primary-700/5 bg-primary-100 rounded-3xl">
        <div className="flex flex-col justify-center h-20 gap-1 p-4 px-5 overflow-hidden shadow-xl cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 rounded-xl w-60 text-primary-900">
          <div className="text-sm font-semibold leading-none capitalize text-lowercase">
            {filter} Revenue
          </div>
          <div
            className={cn(
              "flex items-center gap-0.5",
              revenueIncrement === "increase" && "text-green-700",
              revenueIncrement === "decrease" && "text-red-600"
            )}
          >
            <PesoIcon className="h-3.5 w-3.5" />
            <div className="text-xl font-bold leading-none">
              {formatNumber(revenue)}
            </div>
            {revenueIncrement === "increase" && (
              <UpIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
            {revenueIncrement === "decrease" && (
              <DownIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center h-20 gap-1 p-4 px-5 overflow-hidden shadow-xl cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 rounded-xl w-60 text-primary-900">
          <div className="text-sm font-semibold leading-none capitalize text-lowercase">
            {filter} Product Sold
          </div>
          <div
            className={cn(
              "flex items-center gap-0.5",
              productIncrement === "increase" && "text-green-700",
              productIncrement === "decrease" && "text-red-600"
            )}
          >
            <div className="text-xl font-bold leading-none">
              {" "}
              {formatNumber(product)}
            </div>
            {productIncrement === "increase" && (
              <UpIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
            {productIncrement === "decrease" && (
              <DownIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center h-20 gap-1 p-4 px-5 overflow-hidden shadow-xl cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 rounded-xl w-60 text-primary-900">
          <div className="text-sm font-semibold leading-none capitalize text-lowercase">
            {filter} Customers
          </div>
          <div
            className={cn(
              "flex items-center gap-0.5",
              customerIncrement === "increase" && "text-green-700",
              customerIncrement === "decrease" && "text-red-600"
            )}
          >
            <div className="text-xl font-bold leading-none">
              {formatNumber(customers)}
            </div>
            {customerIncrement === "increase" && (
              <UpIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
            {customerIncrement === "decrease" && (
              <DownIcon className="h-4 w-4 ml-1 mt-0.5" />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center h-20 gap-1 p-4 px-5 overflow-hidden shadow-xl cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 rounded-xl w-60 text-primary-900">
          <div className="text-sm font-semibold leading-none">
            Available Stocks
          </div>
          <div className="text-xl font-bold leading-none">
            {formatNumber(stocks)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
