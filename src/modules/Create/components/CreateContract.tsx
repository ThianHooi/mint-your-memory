import React, { useState } from "react";
import Uploader from "./Uploader";
import ContractMetadataForm from "./ContractMetadataForm";
import {
  ContractMetadata,
  ContractTrait,
  CreateContractInput,
} from "../../../types/Contract";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useSDK,
} from "@thirdweb-dev/react";
import classNames from "classnames";
import DeployStatusDialog from "./status-dialog/DeployStatusDialog";
import { DeployContractStatus } from "../../type";
import ContractTraitsForm from "./ContractTraitsForm";
import { CreateContractStep } from "../enum";
import { parseTraits } from "../../../utils/parse-traits";
import ContractReceiversForm from "./ContractReceiversForm";

const CreateContract = () => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [deployedContractAddress, setDeployedContractAddress] = useState("");
  const [createContractInput, setCreateContractInput] =
    useState<Partial<CreateContractInput>>();
  const [statusDialogProps, setStatusDialogProps] = useState<{
    showDialog: boolean;
    status?: DeployContractStatus;
    message?: string;
  }>({
    showDialog: false,
    status: undefined,
  });

  const [createContractSteps, setCreateContractSteps] =
    useState<CreateContractStep>(CreateContractStep.InputMetadata);

  const connectedAddress = useAddress();
  const thirdwebSdk = useSDK();
  const isNetworkMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const deployEditionContract = async (
    deployData: Partial<CreateContractInput>
  ) => {
    if (!connectedAddress || !thirdwebSdk) {
      alert("SDK not initialised. Try again later");
      return;
    }

    if (isNetworkMismatched) {
      alert("Switch to Mumbai network");
      switchNetwork && (await switchNetwork(ChainId.Mumbai));
      return;
    }

    setStatusDialogProps({
      showDialog: true,
      status: "loading",
      message: "Deploying contract",
    });

    const contractAddress = await thirdwebSdk.deployer.deployEdition({
      name: deployData?.metadata?.title ?? "",
      description: deployData?.metadata?.description,
      image: uploadedImage,
      primary_sale_recipient: connectedAddress,
    });

    console.log("====================================");
    console.log(contractAddress);
    console.log("====================================");

    const contract = await thirdwebSdk.getContract(contractAddress, "edition");

    setStatusDialogProps({
      showDialog: true,
      status: "loading",
      message: "Minting NFT",
    });

    const mintedNft = await contract.mint({
      supply: deployData.receivers?.length ?? 1,
      metadata: {
        image: uploadedImage,
      },
    });

    setStatusDialogProps({
      showDialog: true,
      status: "loading",
      message: "Airdrop in progress",
    });

    await contract.airdrop(mintedNft.id, deployData?.receivers ?? []);

    setDeployedContractAddress(contractAddress);
    setStatusDialogProps({
      showDialog: true,
      status: "success",
    });
  };

  const onImageUploaded = (image: File) => {
    setUploadedImage(image);
  };

  const onSubmitMetadata = (metadata: ContractMetadata) => {
    setCreateContractInput({ ...createContractInput, metadata });
    setCreateContractSteps(CreateContractStep.UploadImage);
  };

  const onSubmitImageDescription = (
    imageData: Pick<CreateContractInput, "imageName" | "imageDescription">
  ) => {
    setCreateContractInput({ ...createContractInput, ...imageData });
    setCreateContractSteps(CreateContractStep.InputTraits);
  };

  const onSubmitTraits = (traits: ContractTrait[]) => {
    setCreateContractInput({
      ...createContractInput,
      traits: parseTraits(traits),
    });
    setCreateContractSteps(CreateContractStep.InputReceivers);
  };

  const onSubmitReceivers = (receivers: string[]) => {
    const validReceivers = [
      ...receivers.filter((add) => !!add),
      connectedAddress as string,
    ];

    setCreateContractInput({
      ...createContractInput,
      receivers: validReceivers,
    });
    deployEditionContract({
      ...createContractInput,
      receivers: validReceivers,
    })
      .then(() => {
        console.log("deployed");
      })
      .catch((err) => console.error(`Failed to deploy`, err));
  };

  const getPageTitle = (step: CreateContractStep) => {
    switch (step) {
      case CreateContractStep.InputMetadata:
        return (
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Give your <span className="text-[hsl(280,100%,70%)]">contract</span>{" "}
            a name
          </h1>
        );
      case CreateContractStep.UploadImage:
        return (
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Upload your <span className="text-[hsl(280,100%,70%)]">image</span>
          </h1>
        );
      case CreateContractStep.InputTraits:
        return (
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Describe</span> your
            image
          </h1>
        );
      case CreateContractStep.InputReceivers:
        return (
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Share</span> your image
          </h1>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={classNames(
          "flex h-full min-h-screen w-full flex-col items-center justify-center gap-12 px-4 py-16"
        )}
      >
        {getPageTitle(createContractSteps)}
        <div className="flex w-full items-center justify-center">
          <ConnectWallet
            className="w-3/4"
            colorMode="dark"
            accentColor="#CC66FF"
          />
        </div>

        {connectedAddress &&
          createContractSteps === CreateContractStep.InputMetadata && (
            <>
              <ContractMetadataForm nextStepHandler={onSubmitMetadata} />
            </>
          )}
        {connectedAddress &&
          createContractSteps === CreateContractStep.UploadImage && (
            <>
              <Uploader
                onImageUploaded={onImageUploaded}
                nextStepHandler={onSubmitImageDescription}
              />
            </>
          )}
        {connectedAddress &&
          createContractSteps === CreateContractStep.InputTraits && (
            <>
              <ContractTraitsForm nextStepHandler={onSubmitTraits} />
            </>
          )}

        {connectedAddress &&
          createContractSteps === CreateContractStep.InputReceivers && (
            <>
              <ContractReceiversForm nextStepHandler={onSubmitReceivers} />
            </>
          )}
      </div>
      <DeployStatusDialog
        {...statusDialogProps}
        contractAddress={deployedContractAddress}
        onClose={() =>
          setStatusDialogProps({ status: undefined, showDialog: false })
        }
      />
    </>
  );
};

export default CreateContract;
