// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates a wallet address to the format 0x0000…0000
 * @param {String} address Full address to truncate
 * @returns {String} Truncated address
 */
export const truncateWalletAddress = (address: string, extraShort = true) => {
  return `${address.substring(0, extraShort ? 4 : 6)}...${address.substring(
    address.length - (extraShort ? 3 : 6)
  )}`;
};
