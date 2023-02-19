import React from "react";
import LoadingSpinnerIcon from "../../../../components/icon/LoadingSpinnerIcon";

type Props = {
  message?: string;
};

const DeployedLoadingDialog = ({ message }: Props) => {
  return (
    <>
      <LoadingSpinnerIcon />
      <p>Loading...</p>
      {message && <p>{message}</p>}
    </>
  );
};

export default DeployedLoadingDialog;
