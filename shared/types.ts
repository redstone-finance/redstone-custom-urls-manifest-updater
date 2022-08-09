export type CustomUrlsList = {
  [assetId in string]: TokenConfigWithPending;
};

export interface TokenConfig {
  source?: string[];
  maxPriceDeviationPercent?: number;
  customUrlDetails: CustomUrlDetails;
  comment?: string;
}

export interface TokenConfigWithPending extends TokenConfig {
  isPending: boolean;
}

export interface NewCustomUrlInput extends CustomUrlDetails {
  comment: string;
}

interface CustomUrlDetails {
  url: string;
  jsonpath: string;
}
