import { buildStore } from "./store/store";

export interface CustomUrlsBody {
	url: string;
	jsonpath: string;
}

export interface EvolveState {
  canEvolve: boolean;
  evolve: string | null;
}

export interface RedstoneOraclesState extends EvolveState {
  contractAdmins: string[];
  nodes: Nodes;
  dataFeeds: DataFeeds;
}

export type Nodes = { [key in string]: Node };
export type DataFeeds = { [key in string]: DataFeed };

interface Node {
  name: string;
  logo: string;
  description: string;
  dataFeedId: string;
  evmAddress: string;
  ipAddress: string;
  url?: string;
}

interface DataFeed {
  name: string;
  manifestTxId: string;
  logo: string;
  description: string;
  admin: string;
}

export type Store = ReturnType<typeof buildStore>;
