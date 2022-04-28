import { Contract, SmartWeaveNodeFactory } from "redstone-smartweave";
import { oracleRegistryAddress } from "../config/config";
import { initArweave } from "../utils";
import { Store } from "../types";

export const evaluateLatestManifestTxId = async (
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

const arweave = initArweave();
const contract = SmartWeaveNodeFactory
	.memCached(arweave)
	.contract(oracleRegistryAddress);

export const buildCron = (store: Store) => {
	const startUpdatingLatestManifestTxId = () => {
		const tenSecondsInMilliseconds = 10000;
		setInterval(() => {
			evaluateLatestManifestTxId(contract, store);
		}, tenSecondsInMilliseconds)
	}

	return {
		startUpdatingLatestManifestTxId
	}
};
