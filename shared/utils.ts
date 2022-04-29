import { arweaveUrl } from "./config";
import { Manifest } from "./types";

export const fetchManifest = async (manifestTransactionId: string) => {
	const fetchManifestResponse = await fetch(`${arweaveUrl}/${manifestTransactionId}`);
	return await fetchManifestResponse.json() as Manifest;
};
