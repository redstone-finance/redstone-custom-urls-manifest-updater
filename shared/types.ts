export interface JsonUrlAsset {
	customUrlDetails: {
		url: string;
		jsonpath: string;
	};
}

export type Manifest = { [x in string]: JsonUrlAsset };
