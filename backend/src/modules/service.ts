import { ethers } from "ethers";
import { arweaveUrl } from "../config/config";
import { Manifest } from "../types";
import { initBundlr } from "../utils";

export const fetchManifest = async (pendingOrSavedManifestTxId: string) => {
	const fetchManifestResponse = await fetch(`${arweaveUrl}/${pendingOrSavedManifestTxId}`);
	return await fetchManifestResponse.json() as Manifest;
};

export const checkIfSubscribed = (manifest: Manifest, url: string) => {
	return Object.values(manifest).some((customUrl) => customUrl.customUrlDetails.url === url);
};

export const generateNewManifest = (manifest: Manifest, url: string, jsonpath: string) => {
	const symbol = ethers.utils.id(`${jsonpath}---${url}`);
	const newManifest = { ...manifest };
	newManifest[symbol] = {
		customUrlDetails: { url, jsonpath },
	};
	return newManifest;
};

export const sendNewManifest = async (
	manifest: Manifest,
	url: string,
	jsonpath: string
): Promise<string> => {
	const newManifest = generateNewManifest(manifest, url, jsonpath);
	const bundlr = initBundlr();
	const transaction = bundlr.createTransaction(JSON.stringify(newManifest));
	await transaction.sign();
	const id = (await transaction.upload()).data.id
	return id;
};
