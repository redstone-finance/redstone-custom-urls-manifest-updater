import Arweave from "arweave";
import { SmartWeaveNodeFactory, Contract } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { arweaveUrl, oracleRegistryAddress } from "./config";
import { DataFeedWithId, Manifest, RedstoneOraclesInput } from "./types";

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

export const fetchDataFeed = async (contract: Contract) => {
	return (await contract.viewState<RedstoneOraclesInput, DataFeedWithId>({
		function: "getDataFeedDetailsById",
		data: {
			id: "redstone-custom-urls-demo"
		}
	})).result;
};
