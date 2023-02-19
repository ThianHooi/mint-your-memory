import { NFTMetadataInput } from "@thirdweb-dev/sdk";

export type ContractMetadata = {
  title: string;
  description?: string;
};

export type ContractTrait = {
  // [Key: string]: string;
  trait_type?: string;
  value: string;
};

export type CreateContractInput = {
  metadata: ContractMetadata;
  imageName: string;
  imageDescription?: string;
  traits?: ContractTrait[] | undefined;
  receivers: string[];
};

export type NFTMetadataInputLimited = Pick<
  NFTMetadataInput,
  | "name"
  | "image"
  | "external_url"
  | "animation_url"
  | "description"
  | "background_color"
>;
