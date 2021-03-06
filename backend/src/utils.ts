import dotenv from "dotenv";
dotenv.config();
import Bundlr from "@bundlr-network/client";
import { JWKInterface } from "arweave/node/lib/wallet";

export const initBundlr = () => {
  const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
  return new Bundlr("https://node1.bundlr.network", "arweave", jwk);
};
