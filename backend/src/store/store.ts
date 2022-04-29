export const buildStore = () => {
	let latestManifestTxId = 'cfARSgFA5k0bZmCMF864zjfuuFbG9ggCxrKFOZFEQYo';
	let pendingOrSavedManifestTxId = 'cfARSgFA5k0bZmCMF864zjfuuFbG9ggCxrKFOZFEQYo';

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
