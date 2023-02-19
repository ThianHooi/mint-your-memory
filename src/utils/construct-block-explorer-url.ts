import { ChainId } from "@thirdweb-dev/sdk";

const Web3ChainToBlockExplorer: Record<string, string> = {
  [ChainId.Mainnet]: "https://etherscan.io/",
  [ChainId.Goerli]: "https://goerli.etherscan.io/",
  [ChainId.Polygon]: "https://polygonscan.com/",
  [ChainId.Mumbai]: "https://mumbai.polygonscan.com/",
};

export const constructBlockExplorerUrl = (
  network: ChainId,
  address: string
) => {
  const blockExplorerUrl = Web3ChainToBlockExplorer[network] ?? "";
  return `${blockExplorerUrl}/address/${address}`;
};
