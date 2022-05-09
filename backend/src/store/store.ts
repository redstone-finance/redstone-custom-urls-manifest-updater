const INITIAL_MANIFEST_TX_ID = "iLTjCD_DvYOGpsu2dh4esTs-TaOsVjjzmoA7VGJYG1Q";

export const buildStore = () => {
  let latestManifestTxId = INITIAL_MANIFEST_TX_ID;
  let pendingOrSavedManifestTxId = INITIAL_MANIFEST_TX_ID;

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
