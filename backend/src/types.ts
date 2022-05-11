import { DataFeed } from "../../shared/types";
import { buildStore } from "./store/store";

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

export type Store = ReturnType<typeof buildStore>;
