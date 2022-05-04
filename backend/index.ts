import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });
import express from 'express';
import cors from 'cors';
import { getOracleContract } from '../shared/utils';
import { buildStore } from './src/store/store';
import { buildRoutes } from './src/routes/routes';
import { buildCron } from './src/modules/cron';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const store = buildStore();
const routes = buildRoutes(store);

const jwk = JSON.parse(process.env.JWK_WALLET);
const contract = getOracleContract(jwk);
const cron = buildCron(contract, store);
cron.startUpdatingPendingOrSavedManifestTxId();

app.use(routes);

app.listen(port, () => {
  console.log(`Custom URL manifest updater stared at port: ${port}`)
});
