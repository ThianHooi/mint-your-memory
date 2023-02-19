import { ContractTrait } from "../types/Contract";

export const parseTraits = (traits: ContractTrait[]) => {
  const parsedArray = traits
    .filter(({ value }) => value !== "")
    .map(({ value, trait_type }) => ({
      ...(!!trait_type && { trait_type }),
      value,
    }));

  return parsedArray.length === 0 ? undefined : parsedArray;
};
