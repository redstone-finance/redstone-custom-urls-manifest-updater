export interface JsonUrlAsset {
  customUrlDetails: {
    url: string;
    jsonpath: string;
  };
}

export interface Manifest {
  interval: number;
  priceAggregator: string;
  defaultSource?: string[];
  sourceTimeout: number;
  maxPriceDeviationPercent: number,
  evmChainId: number,
  tokens: { [symbol: string]: TokenConfig };
  enableArweaveBackup?: boolean;
}

export interface TokenConfig {
  source?: string[];
  maxPriceDeviationPercent?: number;
  customUrlDetails: CustomUrlDetails;
  comment?: string;
};

export interface CustomUrlDetails {
  url: string;
  jsonpath: string;
};

export interface DataFeed {
  name: string;
  manifestTxId: string;
  logo: string;
  description: string;
  admin: string;
}

export interface RedstoneOraclesInput {
  function: "getDataFeedDetailsById";
  data: {
    id: string;
  };
}

export interface DataFeedWithId extends DataFeed {
  id: string;
}

export interface NewCustomUrlInput extends CustomUrlDetails {
  comment: string
}