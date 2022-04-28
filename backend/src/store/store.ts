export const buildStore = () => {
	let latestManifestTxId = '';
	let pendingOrSavedManifestTxId = '';

	const getLatestManifestTxId = () => latestManifestTxId;
	const getPendingOrSavedManifestTxId = () => pendingOrSavedManifestTxId;

	const updateLatestManifestTxId = (newManifestTxId: string) => {
		latestManifestTxId = newManifestTxId;
	};

	const updatePendingOrSavedManifestTxId = (newPendingOrSavedManifestTxId: string) => {
		pendingOrSavedManifestTxId = newPendingOrSavedManifestTxId;
	};

	return {
		getLatestManifestTxId,
		getPendingOrSavedManifestTxId,
		updateLatestManifestTxId,
		updatePendingOrSavedManifestTxId
	}
};
