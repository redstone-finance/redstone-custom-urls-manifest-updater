export interface JsonUrlAsset {
  customUrlDetails: {
    url: string;
    jsonpath: string;
  };
}

export type Manifest = { [x in string]: JsonUrlAsset };

export interface DataFeed {
  name: string;
  manifestTxId: string;
  logo: string;
  description: string;
  admin: string;
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
