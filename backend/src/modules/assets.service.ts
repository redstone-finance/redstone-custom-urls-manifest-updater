import { fetchManifest, getCurrentManifestTxIdForCustomUrls } from "../utils";
import { Store } from "../types";
import { CustomUrlsList } from "../../../shared/types";

export const buildAssetsService = (store: Store) => {
  const fetchAssets = async () => {
    const manifestFromContract = await fetchManifestFromContract();
    const manifestFromGateway = await fetchManifestFromGateway();

    // It's important that manifestFromContract goes after manifestFromGateway
    // beacause it should overwrite some isPending values
    const mergedManifest = { ...manifestFromGateway, ...manifestFromContract };

    // Logging (to help with debugging)
    console.log({
      manifestFromContract,
      manifestFromGateway,
      mergedManifest,
    });

    return mergedManifest;
  };

  const fetchManifestFromContract = async () => {
    console.log("Fetching current manifest from smart contract");
    const manifestTxId = await getCurrentManifestTxIdForCustomUrls();
    const manifest = await fetchManifest(manifestTxId);
    return Object.entries(manifest?.tokens ?? []).reduce(
      (object, [key, value]) => ({
        ...object,
        [key]: {
          ...value,
          isPending: false,
        },
      }),
      {} as CustomUrlsList
    );
  };

  const fetchManifestFromGateway = async () => {
    console.log("Fetching current manifest using latest manifest from store");
    const latestManifestTxId = store.getLatestManifestTxId();
    const manifest = await fetchManifest(latestManifestTxId);
    return Object.entries(manifest?.tokens ?? []).reduce(
      (object, [key, value]) => ({
        ...object,
        [key]: {
          ...value,
          isPending: true,
        },
      }),
      {} as CustomUrlsList
    );
  };

  const fetchAsset = async (id: string) => {
    const assets = await fetchAssets();
    const asset = assets[id];
    return {
      ...asset.customUrlDetails,
      comment: asset.comment,
      id,
    };
  };

  return {
    fetchAssets,
    fetchAsset,
  };
};
