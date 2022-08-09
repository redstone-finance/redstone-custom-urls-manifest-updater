import axios from "axios";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import Bundlr from "@bundlr-network/client";
import { JWKInterface } from "arweave/node/lib/wallet";
import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";
import { Manifest } from "./types";

const oracleRegistryAddress = "qg5BIOUraunoi6XJzbCC-TgIAypcXyXlVprgg0zRRDE";
const arweaveUrl = "https://arweave.net";
const SMARTWEAVE_DEN_NODE_URL = "https://d2rkt3biev1br2.cloudfront.net/state";
const DATA_FEED_ID = "redstone-custom-urls-demo";

export const initBundlr = () => {
  const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
  return new Bundlr("https://node1.bundlr.network", "arweave", jwk);
};

export const getCurrentManifestTxIdForCustomUrls = async () => {
  const params = new URLSearchParams([["id", oracleRegistryAddress]]);
  const response = await axios.get(SMARTWEAVE_DEN_NODE_URL, {
    params,
  });
  return response.data.state.dataFeeds[DATA_FEED_ID].manifestTxId;
};

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

export const getOracleContract = (jwk?: JWKInterface) => {
  const arweave = initArweave();
  const smartweave = SmartWeaveNodeFactory.memCachedBased(arweave).build();
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
