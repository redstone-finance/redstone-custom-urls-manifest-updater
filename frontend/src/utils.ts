import { fetchManifest } from "../../shared/utils";
import { FetchManifestTransactionsIds } from "./types";

export const shortenCustomOracleId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

export const fetchManifestTransactionId = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/manifests`);
	return (await response.json()) as FetchManifestTransactionsIds; 
};

export const fetchAssets = async () => {
	const { pendingOrSavedManifestTxId } = await fetchManifestTransactionId();
	return fetchManifest(pendingOrSavedManifestTxId);
};

export const fetchAsset = async (id: string) => {
	const assets = await fetchAssets();
	return {
		...assets[id].customUrlDetails,
		id
	};
};
