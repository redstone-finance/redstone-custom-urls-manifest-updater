import { Contract } from "redstone-smartweave";
import { RedstoneOraclesInput, DataFeedWithId } from "../../shared/types";
import {  fetchManifest, getOracleContract } from "../../shared/utils";
import { FetchManifestsResponse, CustomUrlsList } from "./types";

export const shortenCustomOracleId = (id: string) => `${id.slice(0, 6)}...${id.slice(-4)}`;

export const fetchDataFeed = async (contract: Contract) => {
  return (await contract.viewState<RedstoneOraclesInput, DataFeedWithId>({
    function: "getDataFeedDetailsById",
    data: {
      id: "redstone-custom-urls-demo"
    }
  })).result;
};

export const fetchAssets = async () => {
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
  const contract = getOracleContract();
  const dataFeed = await fetchDataFeed(contract);
  const manifest = await fetchManifest(dataFeed.manifestTxId);
  return Object.entries(manifest.tokens).reduce((object, [ key, value ]) => ({
    ...object,
    [key]: {
      ...value,
      isPending: false
    },
  }), {} as CustomUrlsList);
};

const fetchManifestFromGateway = async () => {
  const backendUrl = process.env.BACKEND_URL;
  const url = `${backendUrl}/manifests`;
  const manifestsTxIdsResponse = await fetch(url);
  const manifestsTxIds = await manifestsTxIdsResponse.json() as FetchManifestsResponse;
  const manifest = await fetchManifest(manifestsTxIds.latestManifestTxId);
  return Object.entries(manifest.tokens).reduce((object, [ key, value ]) => ({
    ...object,
    [key]: {
      ...value,
      isPending: true
    }
  }), {} as CustomUrlsList);
};

export const fetchAsset = async (id: string) => {
  const assets = await fetchAssets();
  return {
    ...assets[id].customUrlDetails,
    id
  };
};
