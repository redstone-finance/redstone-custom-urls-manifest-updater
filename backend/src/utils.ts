import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import Bundlr from "@bundlr-network/client";
import { Manifest } from "../../shared/types";
import { JWKInterface } from "arweave/node/lib/wallet";

export const initBundlr = () => {
  const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
  return new Bundlr("https://node1.bundlr.network", "arweave", jwk);
};

export const calculateId = (url: string, jsonpath: string) => {
  const symbol = ethers.utils.id(`${jsonpath}---${url}`);
  return symbol.slice(0, 18);
};

export const checkIfSubscribed = (manifest: Manifest, url: string, jsonpath: string) => {
  return Object.keys(manifest.tokens).some((id) => id === calculateId(url, jsonpath));
};
