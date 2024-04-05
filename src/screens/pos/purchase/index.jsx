import React, { useState } from "react";
import _ from "lodash";

import PesoIcon from "~icons/custom/peso";

import Table from "./components/table";
import Actions from "./components/actions";
import { Button, Separator } from "@/components/ui";
import { useAlert, useAuth, useData, useOrder } from "@/hooks";
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
  const { account } = useAuth();

  const alert = useAlert();

  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isSalesOpen, setSalesOpen] = useState(false);

  return (
    <div className="flex flex-col w-4/12 h-full gap-3 p-8 shadow-2xl outline outline-2 outline-primary-600/10 bg-primary-100 rounded-3xl ">
      <h1 className="text-sm font-bold tracking-wide">
        Customer #{customer._id}
      </h1>
      <div
        className={cn(
          "flex flex-col gap-4",
          account.role === "pharmacist" ? "h-full" : "h-[87%]"
        )}
      >
        <Table data={orders ?? []} />

        <div className="mt-auto">
          <div className="grid grid-cols-6">
            <div className="col-span-4 col-start-3 mb-4 border-b border-dashed border-primary-900" />
            <div className="col-span-2 col-start-3 px-3 py-2 text-sm font-bold uppercase text-primary-900">
              Items
            </div>
            <div className="col-span-2 px-3 py-2 text-sm font-bold text-primary-900">
              <div className="flex items-center justify-end">
                <span>{formatNumber(amount.items)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-span-2 col-start-3 px-3 py-2 text-sm font-bold uppercase text-primary-900">
              Sub total
            </div>
            <div className="col-span-2 px-3 py-2 text-sm font-bold text-primary-900">
              <div className="flex items-center justify-end">
                <PesoIcon className="w-3 h-3" />
                <span>{formatNumber(amount.subtotal)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-span-2 col-start-3 px-3 py-2 text-sm font-bold uppercase text-primary-900">
              Discount
            </div>
            <div className="col-span-2 px-3 py-2 text-sm font-bold text-primary-900">
              <div className="flex items-center justify-end">
                <PesoIcon className="w-3 h-3" />
                <span>{formatNumber(amount.discount)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-span-2 col-start-3 px-3 py-2 text-sm font-bold uppercase text-primary-900">
              Tax 12%
            </div>
            <div className="col-span-2 px-3 py-2 text-sm font-bold text-primary-900">
              <div className="flex items-center justify-end">
                <PesoIcon className="w-3 h-3" />
                <span>{formatNumber(amount.tax)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="col-span-2 col-start-3 px-3 py-2 text-sm font-bold uppercase text-primary-50 bg-primary-900">
              Total
            </div>
            <div className="col-span-2 px-3 py-2 text-sm font-bold text-primary-50 bg-primary-900">
              <div className="flex items-center justify-end">
                <PesoIcon className="w-3 h-3" />
                <span>{formatNumber(amount.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {account.role !== "pharmacist" && (
        <div className="!mt-auto mb-2 flex justify-end gap-4">
          {!isComplete ? (
            <>
              <AddPhysician
                className={cn(
                  isPrescriptionRequired && _.isEmpty(physician)
                    ? "block"
                    : "hidden"
                )}
                onConfirm={(val) =>
                  isPrescriptionRequired &&
                  !_.isEmpty(val) &&
                  setPaymentOpen(true)
                }
                disabled={orders.length <= 0}
              />
              <Payment
                className={cn(
                  isPrescriptionRequired && _.isEmpty(physician)
                    ? "hidden"
                    : "block"
                )}
                disabled={orders.length <= 0}
                isPaymentOpen={isPaymentOpen}
                setPaymentOpen={setPaymentOpen}
                controlled={isPrescriptionRequired && !_.isEmpty(physician)}
                onConfirm={(val) => setSalesOpen(true)}
              />
            </>
          ) : (
            <Sales
              isSalesOpen={isSalesOpen}
              setSalesOpen={setSalesOpen}
              setShowOrder={setShowOrder}
              controlled
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Purchase;
