import ArLocal from "arlocal";
import fs from "fs";
import path from "path";
import { Warp, Contract, WarpFactory } from "warp-contracts";
import { evaluatePendingOrSavedManifestTxId } from "../src/modules/cron";
import { buildStore } from "../src/store/store";
import { RedstoneOraclesState, Store } from "../src/types";
import { Wallet } from "warp-contracts/lib/types/contract/testing/Testing";

describe("Cron", () => {
  let contractSrc: string;
  let wallet: Wallet;
  let warp: Warp;
  let arlocal: ArLocal;
  let initialState: RedstoneOraclesState;
  let contract: Contract<RedstoneOraclesState>;

  beforeAll(async () => {
    arlocal = new ArLocal(1822, false);
    await arlocal.start();

    warp = WarpFactory.forLocal(1822);

    wallet = await warp.generateWallet();
    await warp.testing.addFunds(wallet.jwk);

    contractSrc = fs.readFileSync(
      path.join(__dirname, "./helpers/redstone-oracle-registry.contract.js"),
      "utf8"
    );
  });

  beforeEach(async () => {
    initialState = {
      canEvolve: true,
      evolve: null,
      contractAdmins: [wallet.address],
      nodes: {},
      dataServices: {
        "redstone-custom-urls-demo": {
          name: "redstone-custom-urls-demo",
          manifestTxId: "testManifestTxId",
          logo: "testLogo",
          description: "testDescription",
          admin: wallet.address,
        },
      },
    };

    const { contractTxId } = await warp.deploy({
      wallet: wallet.jwk,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });

    contract = warp.contract(contractTxId);
    contract.connect(wallet.jwk);
    await warp.testing.mineBlock();
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
      const state = (await contract.readState()).cachedValue.state;
      const dataService = state.dataServices["redstone-custom-urls-demo"];
      await evaluatePendingOrSavedManifestTxId(contract, store);
      expect(store.getLatestManifestTxId()).toBe("testManifestTxId");
      expect(store.getPendingOrSavedManifestTxId()).toBe("testManifestTxId");
      expect(dataService.manifestTxId).toBe("testManifestTxId");
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
