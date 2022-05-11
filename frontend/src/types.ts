import { TokenConfig } from "../../shared/types";

export interface FetchManifestsResponse {
  pendingOrSavedManifestTxId: string;
  latestManifestTxId: string;
}

interface TokenConfigWithPending extends TokenConfig {
  isPending: boolean;
}

export type CustomUrlsList = {
  [assetId in string]: TokenConfigWithPending
}
