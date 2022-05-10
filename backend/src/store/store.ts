const INITIAL_MANIFEST_TX_ID = "m0wYHiGUDNaiSo6GEE83CK0cRim4NLhqytx2P2Y7WF0";

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
  };
};
