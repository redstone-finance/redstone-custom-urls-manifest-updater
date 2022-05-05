export const buildStore = () => {
  let latestManifestTxId = 'iLTjCD_DvYOGpsu2dh4esTs-TaOsVjjzmoA7VGJYG1Q';
  let pendingOrSavedManifestTxId = 'iLTjCD_DvYOGpsu2dh4esTs-TaOsVjjzmoA7VGJYG1Q';

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
