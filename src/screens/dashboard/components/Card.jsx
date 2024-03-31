import { cn } from "@/lib/utils";
import React from "react";

import LockIcon from "~icons/custom/lock";
import RightIcon from "~icons/custom/right";

const AnimatedLabel = ({ label, danger }) => {
  return (
    <div
      className={cn("flex items-center relative", !danger ? "group-hover:text-secondary-500" : "group-hover:text-red-600")}
    >
      <span className="relative leading-none break-all uppercase font-semibold pb-1">
        {label}
        <span
          className={cn(
            "absolute bottom-0 left-0 w-0 bg-primary-800 group-hover:w-full h-0.5 transition-all duration-500 rounded-full",
            !danger ? "group-hover:bg-secondary-500" : "group-hover:bg-red-600"
          )}
        />
      </span>
      <RightIcon
        className={cn(
          "absolute -right-5 h-4 w-auto text-primary-800 transition-all duration-500 group-hover:-right-7 group-hover:delay-500 invisible group-hover:visible",
          !danger ? "group-hover:text-secondary-500" : "group-hover:text-red-600"
        )}
      />
    </div>
  );
};

const Card = ({ name, logo, onClick, lock = false }) => {
  return (
    <button
      className="relative cursor-default outline outline-1 outline-primary-700/10 bg-primary-100 shadow-xl rounded-3xl overflow-hidden p-4 gap-8 flex flex-col justify-around items-center w-60 h-60 hover:bg-primary-300 hover:outline-0 disabled:cursor-not-allowed disabled:hover:bg-primary-300 disabled:outline-0 disabled:bg-primary-300 disabled:opacity-50 group"
      disabled={lock}
      onClick={onClick}
    >
      <img className="h-36 w-auto" src={logo} alt={name} draggable="false" />

      {!lock ? (
        <AnimatedLabel label={name} danger={name === "Log out"} />
      ) : (
        <>
          <span className="relative leading-none break-all uppercase font-semibold pr-1 mr-1 pb-1">{name}</span>
          <LockIcon className="h-28 w-28 text-primary-800/80 absolute inset-50 z-20" />
        </>
      )}
    </button>
  );
};

export default Card;
