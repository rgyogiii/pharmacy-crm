import React, { useState } from "react";
import _ from "lodash";

import PesoIcon from "~icons/custom/peso";

import Table from "./components/table";
import Actions from "./components/actions";
import { Button, Separator } from "@/components/ui";
import { useAlert, useData, useOrder } from "@/hooks";
import AddPhysician from "./components/add-physician";
import Payment from "./components/payment";
import { cn } from "@/lib/utils";
import Sales from "./components/sales";

const formatNumber = (num) => {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const Purchase = ({ setShowOrder }) => {
  const { orders, amount, isPrescriptionRequired, isComplete } = useOrder();
  const { order, customer, physician, updateCustomer } = useData();
  const alert = useAlert();

  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isSalesOpen, setSalesOpen] = useState(false);

  console.log({ asdasasd: amount, order, totalItems: amount.items });
  return (
    <div className="w-4/12 h-full flex flex-col gap-3 outline outline-2 outline-primary-600/10 bg-primary-100 shadow-2xl rounded-3xl p-8 ">
      <h1 className="font-bold tracking-wide text-sm">Customer #{customer._id}</h1>
      <div className="flex flex-col h-[87%] gap-4">
        <Table data={orders ?? []} />

        <div className="mt-auto">
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-4 border-b border-primary-900 border-dashed mb-4" />
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Items</div>
            <div className="col-span-2 text-primary-900 font-bold px-3 py-2 text-sm">
              <div className="flex items-center justify-end">
                <span>{formatNumber(amount.items)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-start-3 col-span-2 text-primary-900 font-bold px-3 py-2 text-sm uppercase">Sub total</div>
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
        </div>
      </div>
      <div className="!mt-auto mb-2 flex justify-end gap-4">
        {!isComplete ? (
          <>
            <AddPhysician
              className={cn(isPrescriptionRequired && _.isEmpty(physician) ? "block" : "hidden")}
              onConfirm={(val) => isPrescriptionRequired && !_.isEmpty(val) && setPaymentOpen(true)}
              disabled={orders.length <= 0}
            />
            <Payment
              className={cn(isPrescriptionRequired && _.isEmpty(physician) ? "hidden" : "block")}
              disabled={orders.length <= 0}
              isPaymentOpen={isPaymentOpen}
              setPaymentOpen={setPaymentOpen}
              controlled={isPrescriptionRequired && !_.isEmpty(physician)}
              onConfirm={(val) => setSalesOpen(true)}
            />
          </>
        ) : (
          <Sales isSalesOpen={isSalesOpen} setSalesOpen={setSalesOpen} setShowOrder={setShowOrder} controlled />
        )}
      </div>
    </div>
  );
};

export default Purchase;
