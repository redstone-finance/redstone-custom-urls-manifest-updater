import Arweave from "arweave";
import ArweaveService from "redstone-node/dist/src/arweave/ArweaveService";
import { ethers } from "ethers";
import { SmartWeaveNodeFactory } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { arweaveUrl, oracleRegistryAddress } from "./config";
import { Manifest } from "./types";

export const DATA_FEED_ID = "redstone-custom-urls-demo";

export const fetchManifest = async (manifestTransactionId: string) => {
  const fetchManifestResponse = await fetch(
    `${arweaveUrl}/${manifestTransactionId}`
  );
  return (await fetchManifestResponse.json()) as Manifest;
};

export const initArweave = () => {
  return Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
};

export const getCurrentManifestTxIdForCustomUrls = async () => {
  const arweaveService = new ArweaveService();
  const contractState = await arweaveService.getOracleRegistryContractState();
  return contractState.dataFeeds[DATA_FEED_ID].manifestTxId;
};

export const getOracleContract = (jwk?: JWKInterface) => {
  const arweave = initArweave();
  const contract = SmartWeaveNodeFactory.memCached(arweave).contract(
    oracleRegistryAddress
  );
  return !!jwk ? contract.connect(jwk) : contract;
};

export const calculateSymbol = (url: string, jsonpath: string) => {
  if (!(url && jsonpath)) {
    return "";
  }
  const symbol = ethers.utils.id(`${jsonpath}---${url}`);
  return symbol.slice(0, 18);
};
