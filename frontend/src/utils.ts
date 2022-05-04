import { Contract } from "redstone-smartweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { RedstoneOraclesInput, DataFeedWithId } from "../../shared/types";
import {  fetchManifest, getOracleContract } from "../../shared/utils";
import { FetchManifestsResponse, ManifestWithPending } from "./types";

export const shortenCustomOracleId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

export const fetchDataFeed = async (contract: Contract) => {
	return (await contract.viewState<RedstoneOraclesInput, DataFeedWithId>({
		function: "getDataFeedDetailsById",
		data: {
			id: "redstone-custom-urls-demo"
		}
	})).result;
};

export const fetchAssets = async () => {
	const manifestFromContract = await fetchManifestFromContract();
	const manifestFromGateway = await fetchManifestFromGateway();
	return { ...manifestFromGateway, ...manifestFromContract };
};

const fetchManifestFromContract = async () => {
	if (!process.env.JWK_WALLET) {
		throw Error('Missing JWK wallet');
	}
	const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
	const contract = getOracleContract(jwk);
	const dataFeed = await fetchDataFeed(contract);
	const manifest = await fetchManifest(dataFeed.manifestTxId);
	return Object.entries(manifest).reduce((object, [ key, value ]) => ({
		...object,
		[key]: {
			...value,
			isPending: false
		}
	}), {} as ManifestWithPending);
};

const fetchManifestFromGateway = async () => {
	const backendUrl = process.env.BACKEND_URL;
	const url = `${backendUrl}/manifests`;
	const manifestsTxIdsResponse = await fetch(url);
	const manifestsTxIds = await manifestsTxIdsResponse.json() as FetchManifestsResponse;
	const manifest = await fetchManifest(manifestsTxIds.latestManifestTxId)
	return Object.entries(manifest).reduce((object, [ key, value ]) => ({
		...object,
		[key]: {
			...value,
			isPending: true
		}
	}), {} as ManifestWithPending);
};

export const fetchAsset = async (id: string) => {
	const assets = await fetchAssets();
	return {
		...assets[id].customUrlDetails,
		id
	};
};
