import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });
import express from 'express';
import cors from 'cors';
import { buildStore } from './src/store/store';
import { buildRoutes } from './src/routes/routes';
import { buildCron } from './src/modules/cron';

const app = express();
app.use(cors());
const port = process.env.PORT;

const store = buildStore();
const routes = buildRoutes(store);
const cron = buildCron(store);
cron.startUpdatingLatestManifestTxId();

app.use(routes);

app.listen(port, () => {
  console.log(`Custom URL manifest updater stared at port: ${port}`)
});
