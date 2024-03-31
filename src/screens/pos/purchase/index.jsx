import React from "react";

import PesoIcon from "~icons/custom/peso";

import Table from "./components/table";
import Actions from "./components/actions";
import { Button, Separator } from "@/components/ui";
import { useOrder } from "@/hooks";

const formatNumber = (num) => {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const Purchase = ({ customerData }) => {
  const { orders, amount } = useOrder();

  console.log({ am: amount });
  return (
    <div className="w-4/12 h-full flex flex-col gap-3 outline outline-2 outline-primary-600/10 bg-primary-100 shadow-2xl rounded-3xl p-8 ">
      <h1 className="font-bold tracking-wide">Customer #{customerData._id}</h1>
      <div className="flex flex-col h-5/6 gap-4">
        <Table data={orders ?? []} />

        <div className="mt-auto">
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-4 border-b border-primary-900 border-dashed mb-4" />
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Subtotal</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.subtotal)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Discount</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.discount)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Tax 12%</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.tax)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-50 bg-primary-900 font-bold px-3 py-2 text-sm uppercase">
              Total
            </div>
            <div className="col-span-2 text-primary-50 bg-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.total)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Cash</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.cash)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Change</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <PesoIcon className="h-3 w-3" />
                <span>{formatNumber(amount.change)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="!mt-auto mb-2 flex justify-end gap-4">
        <Button
          variant="ghost"
          className="w-auto px-6 bg-tertiary-600 hover:bg-tertiary-700 text-primary-50 hover:text-primary-50 gap-2"
        >
          <span>Checkout</span>
        </Button>
      </div>
    </div>
  );
};

export default Purchase;
