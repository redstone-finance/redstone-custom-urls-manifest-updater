import { JWKInterface } from "arweave/node/lib/wallet";
import { fetchDataFeed, fetchManifest, getOracleContract } from "../../shared/utils";

export const shortenCustomOracleId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

export const fetchAssets = async () => {
	if (!process.env.JWK_WALLET) {
		throw Error('Missing JWK wallet');
	}
	const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
	const contract = getOracleContract(jwk);
	const dataFeed = await fetchDataFeed(contract);
	return fetchManifest(dataFeed.manifestTxId);
};

export const fetchAsset = async (id: string) => {
	const assets = await fetchAssets();
	return {
		...assets[id].customUrlDetails,
		id
	};
};
