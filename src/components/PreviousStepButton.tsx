import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  onClick: () => void;
};

const PreviousStepButton = ({ onClick }: Props) => {
  return (
    <button
      type="submit"
      className="rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
      onClick={onClick}
    >
      <ArrowLeftIcon className="h-6 w-6" />
    </button>
  );
};

export default PreviousStepButton;
