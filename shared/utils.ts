import Arweave from "arweave";
import { ethers } from "ethers";
import axios from "axios";
import { SmartWeaveWebFactory } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { arweaveUrl, oracleRegistryAddress } from "./config";
import { Manifest } from "./types";

export const DATA_FEED_ID = "redstone-custom-urls-demo";
const SMARTWEAVE_DEN_NODE_URL = "https://d2rkt3biev1br2.cloudfront.net/state";

export const fetchManifest = async (manifestTransactionId: string) => {
  const fetchManifestResponse = await fetch(
    `${arweaveUrl}/${manifestTransactionId}`
  );
  return (await fetchManifestResponse.json()) as Manifest;
};

const initArweave = () => {
  return Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
};

export const getCurrentManifestTxIdForCustomUrls = async () => {
  const params = new URLSearchParams([["id", oracleRegistryAddress]]);
  const response = await axios.get(SMARTWEAVE_DEN_NODE_URL, {
    params,
  });
  return response.data.state.dataFeeds[DATA_FEED_ID].manifestTxId;
};

export const getOracleContract = (jwk?: JWKInterface) => {
  const arweave = initArweave();
  const smartweave = SmartWeaveWebFactory.memCachedBased(
    arweave as any
  ).build();
  const contract = smartweave.contract(oracleRegistryAddress);
  return !!jwk ? contract.connect(jwk) : contract;
};

export const calculateSymbol = (url: string, jsonpath: string) => {
  if (!(url && jsonpath)) {
    return "";
  }
  const symbol = ethers.utils.id(`${jsonpath}---${url}`);
  return symbol.slice(0, 18);
};
