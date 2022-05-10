import { getCurrentManifestTxIdForCustomUrls } from "../../../shared/utils";

export const buildStore = () => {
  let latestManifestTxId = "";
  let pendingOrSavedManifestTxId = "";

  const getLatestManifestTxId = () => latestManifestTxId;
  const getPendingOrSavedManifestTxId = () => pendingOrSavedManifestTxId;

  const updateLatestManifestTxId = (newManifestTxId: string) => {
    latestManifestTxId = newManifestTxId;
  };

  const updatePendingOrSavedManifestTxId = (newPendingOrSavedManifestTxId: string) => {
    pendingOrSavedManifestTxId = newPendingOrSavedManifestTxId;
  };

  const initTxIdsInStoreIfNeeded = async () => {
    if (!latestManifestTxId || !pendingOrSavedManifestTxId) {
      const currentManifestTxId = await getCurrentManifestTxIdForCustomUrls();
      updateLatestManifestTxId(currentManifestTxId);
      updatePendingOrSavedManifestTxId(currentManifestTxId);
    }
  }

  return {
    getLatestManifestTxId,
    getPendingOrSavedManifestTxId,
    updateLatestManifestTxId,
    updatePendingOrSavedManifestTxId,
    initTxIdsInStoreIfNeeded
  };
};
