import express from "express";
import { Contract } from "redstone-smartweave";
import { sendNewManifest } from '../modules/manifest.service';
import { fetchDataFeed, fetchManifest } from '../../../shared/utils';
import { CustomUrlsBody, Store } from "../types";
import { checkIfSubscribed } from "../utils";

const router = express.Router();

export const buildRoutes = (contract: Contract, store: Store) => {
	router.post<CustomUrlsBody>('/api/custom-urls', async (req, res) => {
		const dataFeed = await fetchDataFeed(contract);
		const manifest = await fetchManifest(dataFeed.manifestTxId);
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
