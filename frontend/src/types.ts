import { DataFeed } from "../../shared/types";

export interface NewJsonUrlAssetInput {
	url: string;
	jsonpath: string;
}

export interface RedstoneOraclesInput {
  function: "getDataFeedDetailsById"
  data: {
		id: string
	}
}

export interface DataFeedWithId extends DataFeed {
  id: string;
}
