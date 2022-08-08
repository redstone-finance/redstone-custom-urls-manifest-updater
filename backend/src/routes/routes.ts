import express from "express";
import { sendNewManifest } from "../modules/manifest.service";
import { validate } from "../modules/validation.service";
import { fetchManifest } from "../../../shared/utils";
import { Store } from "../types";
import { NewCustomUrlInput } from "../../../shared/types";

const router = express.Router();

export const buildRoutes = (store: Store) => {
  router.post<NewCustomUrlInput>("/api/custom-urls", async (req, res) => {
    await store.initTxIdsInStoreIfNeeded();
    const latestManifestTxId = store.getLatestManifestTxId();
    const manifest = await fetchManifest(latestManifestTxId);
    const { url, jsonpath, comment } = req.body;
    const validation = await validate(manifest, url, jsonpath);
    if (validation.isError) {
      res.status(400).send(validation.errorMessage);
    } else {
      const id = await sendNewManifest(manifest, url, jsonpath, comment);
      store.updateLatestManifestTxId(id);
      res.sendStatus(200);
    }
  });

  router.get("/api/manifests", (_req, res) => {
    const latestManifestTxId = store.getLatestManifestTxId();
    const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
    res.send({
      pendingOrSavedManifestTxId,
      latestManifestTxId,
    });
  });

  router.get("/api/proxy", async (req, res) => {
    const params = req.query as { url: string };
    const responseFromProxiedUrl = await fetch(params.url);
    const responseAsJson = await responseFromProxiedUrl.json();
    res.send(responseAsJson);
  });

  return router;
};
