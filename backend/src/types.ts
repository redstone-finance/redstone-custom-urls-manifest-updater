import { TokenConfig } from "../../shared/types";
import { buildAssetsService } from "./modules/assets.service";
import { buildStore } from "./store/store";

export interface EvolveState {
  canEvolve: boolean;
  evolve: string | null;
}

export interface RedstoneOraclesState extends EvolveState {
  contractAdmins: string[];
  nodes: Nodes;
  dataServices: DataServices;
}

export type Nodes = { [key in string]: Node };
export type DataServices = { [key in string]: DataService };

interface Node {
  name: string;
  logo: string;
  description: string;
  dataServiceId: string;
  evmAddress: string;
  ipAddress: string;
  url?: string;
}

export type Store = ReturnType<typeof buildStore>;
export type AssetsService = ReturnType<typeof buildAssetsService>;

export interface DataService {
  name: string;
  manifestTxId: string;
  logo: string;
  description: string;
  admin: string;
}

export interface Manifest {
  interval: number;
  priceAggregator: string;
  defaultSource?: string[];
  sourceTimeout: number;
  maxPriceDeviationPercent: number;
  evmChainId: number;
  tokens: { [symbol: string]: TokenConfig };
  enableArweaveBackup?: boolean;
  deviationCheck: DeviationCheckConfig;
  httpBroadcasterURLs?: string[];
  enableStreamrBroadcaster?: boolean;
}

interface DeviationCheckConfig {
  deviationWithRecentValues: {
    maxPercent: number;
    maxDelayMilliseconds: number;
  };
}
