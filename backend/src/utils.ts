import axios from "axios";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import Bundlr from "@bundlr-network/client";
import { JWKInterface } from "arweave/node/lib/wallet";
import { WarpFactory } from "warp-contracts";
import { Manifest } from "./types";

const oracleRegistryAddress = "Ebh7jYjVxzoZpVR4HSjHddZs1t6k2JLskBRbjEfutgM";
const arweaveUrl = "https://arweave.net";
const SMARTWEAVE_DRE_NODE_URL = "https://dre-1.warp.cc/contract";
const DATA_FEED_ID = "redstone-custom-urls-demo";

export const initBundlr = () => {
  const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
  return new Bundlr("https://node1.bundlr.network", "arweave", jwk);
};

export const getCurrentManifestTxIdForCustomUrls = async () => {
  const params = new URLSearchParams([["id", oracleRegistryAddress]]);
  const response = await axios.get(SMARTWEAVE_DRE_NODE_URL, {
    params,
  });
  return response.data.state.dataServices[DATA_FEED_ID].manifestTxId;
};

export const fetchManifest = async (manifestTransactionId: string) => {
  const fetchManifestResponse = await fetch(
    `${arweaveUrl}/${manifestTransactionId}`
  );
  return (await fetchManifestResponse.json()) as Manifest;
};

export const getOracleContract = (jwk?: JWKInterface) => {
  const warp = WarpFactory.forMainnet();
  const contract = warp.contract(oracleRegistryAddress);
  return !!jwk ? contract.connect(jwk) : contract;
};

export const calculateSymbol = (url: string, jsonpath: string) => {
  if (!(url && jsonpath)) {
    return "";
  }
  const symbol = ethers.utils.id(`${jsonpath}---${url}`);
  return symbol.slice(0, 18);
};
