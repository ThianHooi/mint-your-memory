import { NFTMetadataInput } from "@thirdweb-dev/sdk";

export type ContractMetadata = {
  title: string;
  description?: string;
};

export type ContractTrait = {
  [Key: string]: string;
};

export type CreateContractInput = {
  metadata: ContractMetadata;
  traits: ContractTrait[];
  receivers: [];
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
