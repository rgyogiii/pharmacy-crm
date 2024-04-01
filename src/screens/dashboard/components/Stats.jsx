import { cn } from "@/lib/utils";

import PesoIcon from "~icons/custom/peso";
import UpIcon from "~icons/custom/up";
import DownIcon from "~icons/custom/down";

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
  return (
    <div className="grid grid-cols-4 gap-8 outline outline-1 outline-primary-700/5 bg-primary-100 shadow-xl rounded-3xl p-4">
      <div className="flex flex-col justify-center gap-1 cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 shadow-xl rounded-xl overflow-hidden p-4 w-60 text-primary-900 h-20 px-5">
        <div className="text-sm font-semibold leading-none">Monthly Revenue</div>
        <div
          className={cn(
            "flex items-center gap-0.5",
            revenueIncrement === "increase" && "text-green-700",
            revenueIncrement === "decrease" && "text-red-600"
          )}
        >
          <PesoIcon className="h-3.5 w-3.5" />
          <div className="font-bold text-xl leading-none">{formatNumber(revenue)}</div>
          {revenueIncrement === "increase" && <UpIcon className="h-4 w-4 ml-1 mt-0.5" />}
          {revenueIncrement === "decrease" && <DownIcon className="h-4 w-4 ml-1 mt-0.5" />}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 shadow-xl rounded-xl overflow-hidden p-4 w-60 text-primary-900 h-20 px-5">
        <div className="text-sm font-semibold leading-none">Monthly Product Sold</div>
        <div
          className={cn(
            "flex items-center gap-0.5",
            productIncrement === "increase" && "text-green-700",
            productIncrement === "decrease" && "text-red-600"
          )}
        >
          <div className="font-bold text-xl leading-none"> {formatNumber(product)}</div>
          {productIncrement === "increase" && <UpIcon className="h-4 w-4 ml-1 mt-0.5" />}
          {productIncrement === "decrease" && <DownIcon className="h-4 w-4 ml-1 mt-0.5" />}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 shadow-xl rounded-xl overflow-hidden p-4 w-60 text-primary-900 h-20 px-5">
        <div className="text-sm font-semibold leading-none">Monthly Customers</div>
        <div
          className={cn(
            "flex items-center gap-0.5",
            customerIncrement === "increase" && "text-green-700",
            customerIncrement === "decrease" && "text-red-600"
          )}
        >
          <div className="font-bold text-xl leading-none"> {formatNumber(customers)}</div>
          {customerIncrement === "increase" && <UpIcon className="h-4 w-4 ml-1 mt-0.5" />}
          {customerIncrement === "decrease" && <DownIcon className="h-4 w-4 ml-1 mt-0.5" />}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 cursor-default outline outline-1 outline-primary-700/10 bg-primary-400/70 shadow-xl rounded-xl overflow-hidden p-4 w-60 text-primary-900 h-20 px-5">
        <div className="text-sm font-semibold leading-none">Available Stocks</div>
        <div className="font-bold text-xl leading-none">{formatNumber(stocks)}</div>
      </div>
    </div>
  );
};

export default Stats;
