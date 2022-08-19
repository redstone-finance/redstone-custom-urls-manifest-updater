import express from "express";
import { NewCustomUrlInput } from "../../../shared/types";
import { sendNewManifest } from "../modules/manifest.service";
import { validate } from "../modules/validation.service";
import { AssetsService, Store } from "../types";
import { fetchManifest } from "../utils";

const router = express.Router();

export const buildRoutes = (store: Store, assetService: AssetsService) => {
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

  router.get("/api/proxy", async (req, res) => {
    const params = req.query as { url: string };
    const responseFromProxiedUrl = await fetch(params.url);
    const responseAsJson = await responseFromProxiedUrl.json();
    res.send(responseAsJson);
  });

  router.get("/api/assets", async (_req, res) => {
    const assets = await assetService.fetchAssets();
    res.send(assets);
  });

  router.get("/api/assets/:id", async (req, res) => {
    const params = req.params as { id: string };
    const assets = await assetService.fetchAsset(params.id);
    res.send(assets);
  });

  router.get("/api/health-check", async (_req, res) => {
    res.send("Server is working");
  });

  return router;
};
