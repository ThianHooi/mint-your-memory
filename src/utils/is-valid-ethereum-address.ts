import { ethers } from "ethers";

export const isValidEthereumAddress = (addres: string) => {
  return ethers.utils.isAddress(addres);
};
