import { ethers } from "ethers";

export const shortenCustomOracleId = (id: string) =>
  `${id.slice(0, 6)}...${id.slice(-4)}`;

export const shortenUrl = (url: string) => {
  if (url.length === 40) {
    return url;
  }
  return `${url.slice(0, 37)}...`;
};

export const calculateSymbol = (url: string, jsonpath: string) => {
  if (!(url && jsonpath)) {
    return "";
  }
  const symbol = ethers.utils.id(`${jsonpath}---${url}`);
  return symbol.slice(0, 18);
};
