import { Manifest } from "../types";
import { calculateSymbol, initBundlr } from "../utils";

export const generateNewManifest = (
  manifest: Manifest,
  url: string,
  jsonpath: string,
  comment: string
) => {
  const id = calculateSymbol(url, jsonpath);
  const newManifest = { ...manifest };
  newManifest.tokens[id] = {
    customUrlDetails: { url, jsonpath },
    comment,
  };
  return newManifest;
};

export const sendNewManifest = async (
  manifest: Manifest,
  url: string,
  jsonpath: string,
  comment: string
): Promise<string> => {
  const newManifest = generateNewManifest(manifest, url, jsonpath, comment);
  const bundlr = initBundlr();
  const transaction = bundlr.createTransaction(JSON.stringify(newManifest));
  await transaction.sign();
  const id = (await transaction.upload()).data.id;
  return id;
};
