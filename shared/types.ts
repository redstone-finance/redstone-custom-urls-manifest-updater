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
