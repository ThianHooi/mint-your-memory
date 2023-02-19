import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  message?: string;
};

const DeployedFailedDialog = ({ message }: Props) => {
  return (
    <>
      <XCircleIcon className="h-14 w-14 text-[#FA3532]" />
      <p className="mt-4">Something went wrong.</p>
      {message && <p className="mt-4">{message}</p>}
    </>
  );
};

export default DeployedFailedDialog;
