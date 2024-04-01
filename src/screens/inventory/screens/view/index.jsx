import { useEffect, useReducer, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Container, Header } from "@/components";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import BackspaceIcon from "~icons/custom/backspace";
import LockIcon from "~icons/custom/lock";
import Information from "./information";
import Pricing from "./pricing";
import Settings from "./settings";

const tabsReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_TAB":
      return state.map((tab) => ({
        ...tab,
        active: tab.label === action.payload,
      }));
    case "SET_COMPLETE":
      return state.map((tab) => ({
        ...tab,
        completed: true,
      }));
    case "SET_RESET":
      return state.map((tab) => ({
        ...tab,
        completed: false,
      }));
    case "SET_DATA":
      return state.map((tab) => ({
        ...tab,
        data: tab.label === action.payload ? action.data : tab.data,
      }));
    case "SET_NEXT":
      return state.map((tab) => ({
        ...tab,
        disabled: tab.label === action.payload ? false : tab.disabled,
      }));
    default:
      return state;
  }
};

const ViewProduct = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const isViewProduct = type === "view";

  const initialTabs = [
    { label: "Information", active: true, disabled: false, completed: isViewProduct, data: null },
    { label: "Pricing", active: false, disabled: false, completed: isViewProduct, data: null },
    { label: "Settings", active: false, disabled: false, completed: isViewProduct, data: null },
  ];

  const [tabs, setTab] = useReducer(tabsReducer, initialTabs);
  const [infoData, setInfoData] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);

  const active_tab = tabs.find((tab) => tab.active)?.label;

  const handleTabClick = (label) => {
    setTab({ type: "SELECT_TAB", payload: label });
  };

  const handleNext = ({ current, next, data }) => {
    setTab({ type: "SET_COMPLETE" });
    navigate(`/inventory/view/product/${id}`);
  };

  return (
    <Container className="justify-start h-full pt-16 pb-12 space-y-4 container max-w-7xl">
      {isViewProduct ? (
        <Header
          goBackTo="/inventory"
          actionButton={
            <Button
              variant="ghost"
              className="w-auto px-4 bg-secondary-500 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-1"
              onClick={() => {
                navigate(`/inventory/edit/product/${id}`);
                setTab({ type: "SET_RESET" });
              }}
            >
              <span>Edit Product</span>
            </Button>
          }
        />
      ) : (
        <Header goBackTo="/inventory" />
      )}

      <section className="gap-x-20 p-10 pb-16 w-full outline outline-1 outline-primary-700/10 bg-primary-100 shadow-xl rounded-3xl overflow-auto h-full">
        <div className="flex-1 max-w-xl">
          <p className="text-2xl font-black leading-7 tracking-wide text-secondary-500 text-lowercase capitalize">
            {type} Product
          </p>
          <p className="text-primary-700">Manages medicine and other medical products information</p>
        </div>
        <Separator className="bg-primary-400 my-6" />
        <div className="flex gap-x-12 gap-y-8">
          <aside className="flex flex-col gap-y-2 gap-x-2 pt-2 w-1/5">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                variant="ghost"
                size="lg"
                className={cn(
                  "text-sm font-semibold rounded-md w-full text-primary-900 justify-between px-5 hover:text-primary-50",
                  tab.active
                    ? "bg-secondary-500 cursor-default hover:bg-secondary-500 text-primary-50"
                    : "hover:bg-secondary-500"
                )}
                onClick={() => handleTabClick(tab.label)}
                disabled={tab.disabled}
              >
                {tab.label}
                <LockIcon className={cn(tab.disabled ? "flex " : "hidden", "h-4 w-auto")} />
              </Button>
            ))}
          </aside>
          {active_tab === "Information" && <Information tabs={tabs} handleNext={handleNext} product={id} />}
          {active_tab === "Pricing" && <Pricing tabs={tabs} handleNext={handleNext} product={id} />}
          {active_tab === "Settings" && <Settings tabs={tabs} handleNext={handleNext} product={id} />}
        </div>
      </section>
    </Container>
  );
};

export default ViewProduct;
