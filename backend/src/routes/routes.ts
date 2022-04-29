import express from "express";
import { checkIfSubscribed, sendNewManifest } from '../modules/service';
import { fetchManifest } from '../../../shared/utils';
import { CustomUrlsBody, Store } from "../types";

const router = express.Router();

export const buildRoutes = (store: Store) => {
	router.post<CustomUrlsBody>('/custom-urls', async (req, res) => {
		const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
		const manifest = await fetchManifest(pendingOrSavedManifestTxId);
		const isAlreadySubscribed = checkIfSubscribed(manifest, req.body.url);
		if (isAlreadySubscribed) {
			res.send(400);
		} else {
			const id = await sendNewManifest(manifest, req.body.url, req.body.jsonpath);
			store.updateLatestManifestTxId(id);
			res.send(200);
		}
	});

	router.get('/manifests', (req, res) => {
		const latestManifestTxId = store.getLatestManifestTxId();
		const pendingOrSavedManifestTxId = store.getPendingOrSavedManifestTxId();
		res.send({
			pendingOrSavedManifestTxId,
			latestManifestTxId
		});
	});

	return router;
};
