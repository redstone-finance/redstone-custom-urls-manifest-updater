import ArLocal from "arlocal";
import Arweave from "arweave";
import fs from "fs";
import path from "path";
import { JWKInterface } from "arweave/node/lib/wallet";
import {
  SmartWeave,
  SmartWeaveNodeFactory,
  Contract,
} from "redstone-smartweave";
import { evaluatePendingOrSavedManifestTxId } from "../src/modules/cron";
import { buildStore } from "../src/store/store";
import { addFunds, mineBlock } from "./helpers/utils";
import { RedstoneOraclesState, Store } from "../src/types";

describe("Cron", () => {
  let contractSrc: string;
  let wallet: JWKInterface;
  let walletAddress: string;
  let arweave: Arweave;
  let arlocal: ArLocal;
  let smartweave: SmartWeave;
  let initialState: RedstoneOraclesState;
  let contract: Contract<RedstoneOraclesState>;

  beforeAll(async () => {
    arlocal = new ArLocal(1823, false);
    await arlocal.start();

    arweave = Arweave.init({
      host: "localhost",
      port: 1823,
      protocol: "http",
      logging: false,
    });

    smartweave = SmartWeaveNodeFactory.memCached(arweave as any);
    wallet = await arweave.wallets.generate();
    await addFunds(arweave, wallet);
    walletAddress = await arweave.wallets.jwkToAddress(wallet);

    contractSrc = fs.readFileSync(
      path.join(__dirname, "./helpers/redstone-oracle-registry.contract.js"),
      "utf8"
    );
  });

  beforeEach(async () => {
    initialState = {
      canEvolve: true,
      evolve: null,
      contractAdmins: [walletAddress],
      nodes: {},
      dataFeeds: {
        "redstone-custom-urls-demo": {
          name: "redstone-custom-urls-demo",
          manifestTxId: "testManifestTxId",
          logo: "testLogo",
          description: "testDescription",
          admin: walletAddress,
        },
      },
    };

    const contractTxId = await smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });

    contract = smartweave.contract(contractTxId);
    contract.connect(wallet);
    await mineBlock(arweave);
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  describe("evaluatePendingOrSavedManifestTxId", () => {
    let store: Store;

    beforeEach(() => {
      store = buildStore();
    });

    test("latestManifestTxId is equal to pendingOrSavedManifestTxId", async () => {
      store.updateLatestManifestTxId("testManifestTxId");
      store.updatePendingOrSavedManifestTxId("testManifestTxId");
      const state = (await contract.readState()).state;
      const dataFeed = state.dataFeeds["redstone-custom-urls-demo"];
      await evaluatePendingOrSavedManifestTxId(contract, store);
      expect(store.getLatestManifestTxId()).toBe("testManifestTxId");
      expect(store.getPendingOrSavedManifestTxId()).toBe("testManifestTxId");
      expect(dataFeed.manifestTxId).toBe("testManifestTxId");
    });

    test("latestManifestTxId is not equal to pendingOrSavedManifestTxId", async () => {
      store.updateLatestManifestTxId("newTestManifestTxId");
      store.updatePendingOrSavedManifestTxId("testManifestTxId");
      await evaluatePendingOrSavedManifestTxId(contract, store);
      expect(store.getLatestManifestTxId()).toBe("newTestManifestTxId");
      expect(store.getPendingOrSavedManifestTxId()).toBe("newTestManifestTxId");
    });
  });
});
