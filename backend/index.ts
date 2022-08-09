import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { buildStore } from "./src/store/store";
import { buildRoutes } from "./src/routes/routes";
import { buildCron } from "./src/modules/cron";
import { getOracleContract } from "./src/utils";
import { buildAssetsService } from "./src/modules/assets.service";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const store = buildStore();
const jwk = JSON.parse(process.env.JWK_WALLET);
const contract = getOracleContract(jwk);
const assetsService = buildAssetsService(store);
const routes = buildRoutes(store, assetsService);
const cron = buildCron(contract, store);
cron.startUpdatingPendingOrSavedManifestTxId();

app.use(routes);

app.use(express.static("../frontend/dist"));

app.get("*", (_req, res) => {
  res.sendFile("index.html", { root: "../frontend/dist" });
});

app.listen(port, () => {
  console.log(`Custom URL manifest updater stared at port: ${port}`);
});
