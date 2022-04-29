import Arweave from "arweave";
import Bundlr from '@bundlr-network/client';

export const initArweave = () => {
	return Arweave.init({
		host: "arweave.net",
		port: 443,
		protocol: "https"
	});
};

export const initBundlr = () => {
	const jwk = JSON.parse(process.env.JWK_WALLET);
	return new Bundlr("http://node1.bundlr.network", "arweave", jwk);
};
