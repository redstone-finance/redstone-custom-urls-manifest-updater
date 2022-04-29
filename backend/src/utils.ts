import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });
import Arweave from "arweave";
import { ethers } from "ethers";
import Bundlr from '@bundlr-network/client';
import { Manifest } from "../../shared/types";
import { JWKInterface } from 'arweave/node/lib/wallet';

export const initArweave = () => {
	return Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https'
	});
};

export const initBundlr = () => {
	const jwk = JSON.parse(process.env.JWK_WALLET) as JWKInterface;
	return new Bundlr('https://node2.bundlr.network', 'arweave', jwk);
};

export const calculateId = (url: string, jsonpath: string) => {
	const symbol = ethers.utils.id(`${jsonpath}---${url}`);
	return symbol.slice(0, 18);
};

export const checkIfSubscribed = (manifest: Manifest, url: string, jsonpath: string) => {
	return Object.keys(manifest).some((id) => id === calculateId(url, jsonpath));
};