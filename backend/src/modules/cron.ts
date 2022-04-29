import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
import { Contract } from "redstone-smartweave";
import { Store } from "../types";

export const evaluatePendingOrSavedManifestTxId = async (
	contract: Contract,
	store: Store
) => {
	const latestManifestTxId = store.getLatestManifestTxId();
	const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
	if (latestManifestTxId === pendingOrSavedManifestTxId) {
		return;
	}
	await contract.writeInteraction({
		function: 'updateDataFeed',
		data: {
			id: 'redstone-custom-urls-demo',
			update: {
				manifestTxId: latestManifestTxId
			}
		}
	});
	store.updatePendingOrSavedManifestTxId(latestManifestTxId);
};

export const buildCron = (contract: Contract, store: Store) => {
	const startUpdatingPendingOrSavedManifestTxId = () => {
		const tenSecondsInMilliseconds = 10000;
		setInterval(() => {
			evaluatePendingOrSavedManifestTxId(contract, store);
		}, tenSecondsInMilliseconds)
	}

	return {
		startUpdatingPendingOrSavedManifestTxId
	}
};
