import { useReducer } from "react";

import { useNavigate } from "react-router-dom";

import { Container, Header } from "@/components";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import BackspaceIcon from "~icons/custom/backspace";
import LockIcon from "~icons/custom/lock";
import Account from "./account";
import Roles from "./roles";

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
        completed: tab.label === action.payload ? true : tab.completed,
      }));
    case "SET_DATA":
      return state.map((tab) => ({
        ...tab,
        data: tab.label === action.payload ? action.data : tab.data,
      }));
    case "SET_ENABLED":
      return state.map((tab) => ({
        ...tab,
        disabled: false,
      }));
    default:
      return state;
  }
};

const initialTabs = [
  { label: "Account", active: true, disabled: false, completed: false, data: null },
  { label: "Roles", active: false, disabled: true, completed: false, data: null },
];

const CreateUser = () => {
  const navigate = useNavigate();

  const [tabs, setTab] = useReducer(tabsReducer, initialTabs);

  const active_tab = tabs.find((tab) => tab.active).label;

  const handleTabClick = (label) => {
    setTab({ type: "SELECT_TAB", payload: label });
  };

  const handleNext = ({ current, data, next }) => {
    console.log({ data });
    setTab({ type: "SET_COMPLETE", payload: current });
    data && setTab({ type: "SET_DATA", payload: current, data });
    next && setTab({ type: "SELECT_TAB", payload: next });

    if (next === "Roles") {
      setTab({ type: "SET_ENABLED" });
    }
  };

  return (
    <Container className="justify-start h-full pt-16 pb-12 space-y-4 container max-w-7xl">
      <Header goBackTo="/user-management" />

      <section className="gap-x-20 p-10 pb-16 w-full h-full outline outline-1 outline-primary-700/10 bg-primary-100 shadow-xl rounded-3xl overflow-hidden">
        <div className="flex-1 max-w-xl">
          <p className="text-2xl font-black leading-7 tracking-wide text-secondary-500">Add User</p>
          <p className="text-primary-700">Create user accounts, permissions, and roles.</p>
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

          {active_tab === "Account" && <Account tabs={tabs} handleNext={handleNext} />}
          {active_tab === "Roles" && <Roles tabs={tabs} handleNext={handleNext} />}
        </div>
      </section>
    </Container>
  );
};

export default CreateUser;
