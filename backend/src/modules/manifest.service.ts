import { Manifest } from "../../../shared/types";
import { calculateId, initBundlr } from "../utils";

export const generateNewManifest = (manifest: Manifest, url: string, jsonpath: string) => {
  const id = calculateId(url, jsonpath);
  const newManifest = { ...manifest };
  newManifest.tokens[id] = {
    customUrlDetails: { url, jsonpath },
  };
  return newManifest;
};

export const sendNewManifest = async (
  manifest: Manifest,
  url: string,
  jsonpath: string
): Promise<string> => {
  const newManifest = generateNewManifest(manifest, url, jsonpath);
  const bundlr = initBundlr();
  const transaction = bundlr.createTransaction(JSON.stringify(newManifest));
  await transaction.sign();
  const id = (await transaction.upload()).data.id
  return id;
};
