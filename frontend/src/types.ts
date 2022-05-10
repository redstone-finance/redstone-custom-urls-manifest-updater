import { JsonUrlAsset } from "../../shared/types";

export interface NewJsonUrlAssetInput {
  url: string;
  jsonpath: string;
}

export interface FetchManifestsResponse {
  pendingOrSavedManifestTxId: string;
  latestManifestTxId: string;
}

interface JsonUrlAssetWithPending extends JsonUrlAsset {
  isPending: boolean;
}

export type CustomUrlsList = {
  [assetId in string]: JsonUrlAssetWithPending
}
