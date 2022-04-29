import { ethers } from "ethers";
import { Manifest } from "../../../shared/types";
import { initBundlr } from "../utils";

export const checkIfSubscribed = (manifest: Manifest, url: string) => {
	return Object.values(manifest).some((customUrl) => customUrl.customUrlDetails.url === url);
};

export const generateNewManifest = (manifest: Manifest, url: string, jsonpath: string) => {
	const symbol = ethers.utils.id(`${jsonpath}---${url}`);
	const shortSymbol = symbol.slice(0, 18);
	const newManifest = { ...manifest };
	newManifest[shortSymbol] = {
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
