import dotenv from 'dotenv';
dotenv.config();
import { Contract } from "redstone-smartweave";
import { Store } from "../types";

const JOB_INTERVAL_MILLISECONDS = 10000; // 10 seconds

export const evaluatePendingOrSavedManifestTxId = async (
  contract: Contract,
  store: Store
) => {
  await store.initTxIdsInStoreIfNeeded();
  const latestManifestTxId = store.getLatestManifestTxId();
  const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
  if (latestManifestTxId === pendingOrSavedManifestTxId) {
    return;
  }
  await contract.bundleInteraction({
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
    setInterval(() => {
      evaluatePendingOrSavedManifestTxId(contract, store);
    }, JOB_INTERVAL_MILLISECONDS)
  };

  return { startUpdatingPendingOrSavedManifestTxId };
};
