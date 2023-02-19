import React from "react";
import classNames from "classnames";
import SimpleDialog from "../../../../components/SimpleDialog";
import DeployedSuccessDialog from "./SuccessDialogContent";
import DeployedLoadingDialog from "./LoadingDialogContent";
import DeployedFailedDialog from "./FailedDialogContent";
import { DeployContractStatus } from "../../../type";

type Props = {
  showDialog: boolean;
  onClose: () => void;
  status?: DeployContractStatus;
  message?: string;
  contractAddress?: string;
};

const DeployStatusDialog = ({
  status,
  message,
  showDialog,
  onClose,
  contractAddress = "",
}: Props) => {
  return (
    <SimpleDialog onClose={onClose} showDialog={showDialog}>
      <div
        className={classNames(
          "flex flex-col items-center justify-center px-4 pt-4 pb-4 text-center text-[16px] font-medium"
        )}
      >
        {status === "success" && (
          <DeployedSuccessDialog contractAddress={contractAddress} />
        )}
        {status === "loading" && <DeployedLoadingDialog message={message} />}
        {status === "failed" && <DeployedFailedDialog message={message} />}
      </div>
    </SimpleDialog>
  );
};

export default DeployStatusDialog;
