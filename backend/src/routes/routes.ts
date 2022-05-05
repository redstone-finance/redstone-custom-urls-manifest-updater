import express from "express";
import { sendNewManifest } from '../modules/manifest.service';
import { fetchManifest } from '../../../shared/utils';
import { CustomUrlsBody, Store } from "../types";
import { checkIfSubscribed } from "../utils";

const router = express.Router();

export const buildRoutes = (store: Store) => {
  router.post<CustomUrlsBody>('/api/custom-urls', async (req, res) => {
    const latestManifestTxId = store.getLatestManifestTxId();
    const manifest = await fetchManifest(latestManifestTxId);
    const isAlreadySubscribed = checkIfSubscribed(manifest, req.body.url, req.body.jsonpath);
    if (isAlreadySubscribed) {
      res.sendStatus(400);
    } else {
      const id = await sendNewManifest(manifest, req.body.url, req.body.jsonpath);
      store.updateLatestManifestTxId(id);
      res.sendStatus(200);
    }
  });

  router.get('/api/manifests', (req, res) => {
    const latestManifestTxId = store.getLatestManifestTxId();
    const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
    res.send({
      pendingOrSavedManifestTxId,
      latestManifestTxId
    });
  });

  return router;
};
