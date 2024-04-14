import { Fragment, useEffect, useRef, useState } from "react";

import { Button, Dialog, Separator } from "@/components/ui";
import { TextField } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useAuth, useData, useOrder } from "@/hooks";

import PesoIcon from "~icons/custom/peso";
import DiscountIcon from "~icons/custom/discount";
import { cva } from "class-variance-authority";

import { useReactToPrint } from "react-to-print";

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

const itemVariants = cva("w-full", {
  variants: {
    item: {
      default: "max-w-[75px]",
      description: "max-w-[325px]",
      qty: "max-w-[50px]",
      amount: "max-w-[125px]",
    },
  },
  defaultVariants: {
    item: "default",
  },
});

const TableBody = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      {children}
    </div>
  );
};

const TableRow = ({ children, className }) => {
  return (
    <div id="row" className={cn("flex items-center", className)}>
      {children}
    </div>
  );
};

const TableCell = ({ children, className }) => {
  return (
    <div
      id="cell"
      className={cn(
        "text-primary-900 font-bold px-2.5 py-1.5 text-xs w-full break-all",
        className
      )}
    >
      {children}
    </div>
  );
};

const formatNumber = (num) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Sales = ({
  className,
  onClick = () => {},
  disabled = false,
  update,
  isSalesOpen,
  setSalesOpen,
  controlled,
  setShowOrder,
}) => {
  const headers = ["qty", "description", "amount"];

  const receiptRef = useRef(null);
  const [isDisabled, setDisabled] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const { order, customer, updatePhysician, updateSales } = useData();
  const { amount, handleResetOrder, updateStats } = useOrder();
  const { account } = useAuth();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    onAfterPrint: () => {
      handleResetOrder();
      setDisabled(true);
      setSalesOpen(false);
      setShowOrder(false);
      updatePhysician();
      updateSales();
      updateStats();
    },
  });

  const handleComplete = async () => {
    const res = await window.api.CreateSales({ order: order._id, ...amount });
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      console.error(parseResult.error);
    }

    if (parseResult.data) {
      handlePrint();
    }
  };

  return (
    <DialogContainer
      {...(controlled
        ? { open: isSalesOpen }
        : { ...(!isOpen ? { open: false } : {}) })}
      onOpenChange={(val) => {
        controlled ? setSalesOpen(!isSalesOpen) : setOpen(true);
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
          <span>Payments</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[525px] h-8/12 gap-6 flex flex-col"
        onInteractOutside={(ev) => ev.preventDefault()}
        noExitBtn
      >
        <div
          ref={receiptRef}
          className="flex flex-col h-full p-4 !pt-0 gap-y-1"
        >
          <div className="flex flex-col justify-center items-center !mb-6">
            <div className="text-lg font-bold uppercase">VP Pharmacy</div>
            <div className="text-xs ">
              123 street, Ramos Village, Pasig City, Philippines
            </div>
            <div className="text-xs">info@vp-pharmacy.com</div>
            <div className="text-xs">0912345678</div>
          </div>
          <div className="space-y-0.5 !mb-2.5">
            <div className="text-sm font-bold">Receipt #{order?._id}</div>

            <div className="text-xs font-bold !mt-4">
              Cashier: <span className="capitalize">{account.role}</span>
            </div>
            <div className="text-xs font-bold">Customer: {customer._id}</div>
          </div>
          <div className="relative w-full h-full space-y-3 overflow-auto max-h-52">
            <TableRow className="sticky top-0 uppercase bg-white border-t border-b border-dashed border-primary-800">
              {headers.map((item, i) => (
                <TableCell key={i} className={cn(itemVariants({ item }))}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
            <TableBody>
              {order.orders.map((row) => (
                <TableRow
                  key={row.id}
                  className="items-start bg-transparent hover:bg-primary-700/10 pt-0.5"
                >
                  {headers.map((cell, i) => (
                    <Fragment key={i}>
                      {cell === "description" && (
                        <TableCell
                          className={cn(
                            "bg-transparent uppercase",
                            itemVariants({ item: cell })
                          )}
                        >
                          <div className="text-xs break-all">{row.item}</div>
                          <span>@ {formatNumber(row.price)}</span>
                        </TableCell>
                      )}

                      {cell === "amount" && (
                        <TableCell
                          className={cn(
                            "bg-transparent flex items-center gap-0.5",
                            itemVariants({ item: cell })
                          )}
                        >
                          <PesoIcon className="w-3 h-3" />
                          <div className="w-full text-sm">
                            {formatNumber(row.price * row.quantity)}
                          </div>
                        </TableCell>
                      )}

                      {cell === "qty" && (
                        <TableCell
                          className={cn(
                            "bg-transparent",
                            itemVariants({ item: cell })
                          )}
                        >
                          {row.quantity}
                        </TableCell>
                      )}
                    </Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </div>
          <div className="mt-auto">
            <TableRow className="flex items-center justify-end mb-2 uppercase">
              <TableCell className="w-full p-0 font-extrabold border-b border-dashed border-primary-800" />
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px]">Items</TableCell>
              <TableCell className="w-[145px] text-end">
                {amount.items}
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px] h-full">Sub Total</TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3" />
                <div className="text-sm">{formatNumber(amount.subtotal)}</div>
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px]">Discount</TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3" />
                <div className="text-sm">{formatNumber(amount.discount)}</div>
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px]">Tax 12%</TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3" />
                <div className="text-sm">{formatNumber(amount.tax)}</div>
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[270px] font-extrabold border-b border-dashed border-primary-800 p-0" />
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px] text-base font-extrabold">
                Total
              </TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3 font-extrabold" />
                <div className="text-base font-extrabold">
                  {formatNumber(amount.total)}
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[270px] font-extrabold border-b border-dashed border-primary-800 p-0" />
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px]">Cash</TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3" />
                <div className="text-sm">{formatNumber(amount.cash)}</div>
              </TableCell>
            </TableRow>
            <TableRow className="flex items-center justify-end uppercase">
              <TableCell className="w-[125px]">Change</TableCell>
              <TableCell className="w-[145px] flex items-center justify-end gap-0.5">
                <PesoIcon className="w-3 h-3" />
                <div className="text-sm ">{formatNumber(amount.change)}</div>
              </TableCell>
            </TableRow>
          </div>
        </div>
        <DialogFooter className="absolute bottom-4">
          <Button
            type="button"
            variant="ghost"
            className="gap-2 px-4 mb-2 ml-auto bg-tertiary-600 hover:bg-tertiary-700 text-primary-50 hover:text-primary-50"
            onClick={handleComplete}
            disabled={isDisabled}
          >
            <span>Generate Receipt</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

export default Sales;
