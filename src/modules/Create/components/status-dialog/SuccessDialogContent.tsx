import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { constructBlockExplorerUrl } from "../../../../utils/construct-block-explorer-url";
import { ChainId } from "@thirdweb-dev/sdk";
import { truncateWalletAddress } from "../../../../utils/truncate-wallet-address";

type Props = {
  contractAddress: string;
};

const DeployedSuccessDialog = ({ contractAddress }: Props) => {
  return (
    <>
      <CheckCircleIcon className="h-14 w-14 text-[#00E6BE]" />
      <p className="mt-4">
        Deployed to{" "}
        <Link
          href={constructBlockExplorerUrl(ChainId.Mumbai, contractAddress)}
          target="_blank"
        >
          <span className="text-[hsl(280,100%,70%)]">
            {truncateWalletAddress(contractAddress, false)}
          </span>
          !
        </Link>
      </p>
    </>
  );
};

export default DeployedSuccessDialog;
