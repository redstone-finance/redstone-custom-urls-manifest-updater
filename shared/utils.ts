import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { SmartWeaveNodeFactory } from "redstone-smartweave";
import { arweaveUrl, oracleRegistryAddress } from "./config";
import { Manifest } from "./types";

export const fetchManifest = async (manifestTransactionId: string) => {
	const fetchManifestResponse = await fetch(`${arweaveUrl}/${manifestTransactionId}`);
	return await fetchManifestResponse.json() as Manifest;
};

export const initArweave = () => {
	return Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https'
	});
};

export const getOracleContract = (jwk: JWKInterface) => {
	const arweave = initArweave();
	return SmartWeaveNodeFactory
		.memCached(arweave)
		.contract(oracleRegistryAddress)
		.connect(jwk);
};
