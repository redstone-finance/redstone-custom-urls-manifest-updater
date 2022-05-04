import { JWKInterface } from "arweave/node/lib/wallet";
import { fetchManifest, getOracleContract } from "../../shared/utils";
import { DataFeedWithId, RedstoneOraclesInput } from "./types";

export const shortenCustomOracleId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

export const fetchAssets = async () => {
	const jwk = JSON.parse(import.meta.env.VITE_JWK_WALLET) as JWKInterface;
	console.log(jwk)
	const contract = getOracleContract(jwk);
	const dataFeed = (await contract.viewState<RedstoneOraclesInput, DataFeedWithId>({
		function: "getDataFeedDetailsById",
		data: {
			id: 'redstone-custom-urls-demo'
		}
	})).result;
	console.log(dataFeed)
	return fetchManifest(dataFeed.manifestTxId);
};

export const fetchAsset = async (id: string) => {
	const assets = await fetchAssets();
	return {
		...assets[id].customUrlDetails,
		id
	};
};
