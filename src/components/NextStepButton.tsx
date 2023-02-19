import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const NextStepButton = () => {
  return (
    <button
      type="submit"
      className="mt-12 w-full gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
    >
      <div className="flex items-center justify-center">
        <span>Next Step</span>
        <ArrowRightIcon className="ml-2 h-6 w-6" />
      </div>
    </button>
  );
};

export default NextStepButton;
