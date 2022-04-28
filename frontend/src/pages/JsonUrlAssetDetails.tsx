import { useState } from "react";
import Editor from "@monaco-editor/react";
import js from 'jsonpath';
import Card from "../components/Card";

const oracle = {
	id: "0x031f7bcd73d9f5edf2a568ce68a1fa12eb5446979aa153dd8782030373c49b04",
	url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
	jsonpath: "$.RAW.ETH.USD.MEDIAN",
	maxPriceDeviationPercent: 80
}

const JsonUrlAssetDetails = () => {
	const [jsonPathValue, setJsonPathValue] = useState('');
	const [json, setJson] = useState('');

	const fetchJson = async () => {
		try {
			const response = await window.fetch(oracle.url);
			const manifest = await response.json();
			setJson(JSON.stringify(manifest));
			return manifest;
		} catch {
			setJson('');
		}
	};

	const fetchJsonPathValue = async () => {
		const manifest = await fetchJson()
		setJson(JSON.stringify(manifest));
		try {
			const jsonPathValueFromManifest = js.query(manifest, oracle.jsonpath);
			if (jsonPathValueFromManifest.length > 0) {
				setJsonPathValue(JSON.stringify(jsonPathValueFromManifest));
			} else {
				setJsonPathValue('');
			}
		} catch {
			setJsonPathValue('');
		}
	};

	return (
		<Card>
			<div className="flex flex-col gap-4 mb-5">
				<div>
					<p className="text-sm text-sky-900 font-bold">
						ID
					</p>
					<p className="text-md text-neutral-600">
						{oracle?.id ?? '-'}
					</p>
				</div>
				<div>
					<p className="text-sm text-sky-900 font-bold">
						URL
					</p>
					<p className="text-md text-neutral-600">
						{oracle?.url ?? '-'}
					</p>
				</div>
				<div>
					<p className="text-sm text-sky-900 font-bold">
						JSON path
					</p>
					<p className="text-md text-neutral-600">
						{oracle?.jsonpath ?? '-'}
					</p>
				</div>
			</div>
			<button
				onClick={() => fetchJsonPathValue()}
				className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
			>
				Test now
			</button>
			{!!jsonPathValue && (
				<div className="flex justify-between">
					<Editor 
						height="40vh"
						defaultLanguage="json"
						width="48%"
						value={JSON.stringify(JSON.parse(json), null, 2)}
						options={ { minimap: { enabled: false }}}
						className="border-2"
					/>
					<Editor 
						height="40vh"
						width="48%"
						defaultLanguage="json"
						value={!!jsonPathValue 
							? JSON.stringify(JSON.parse(jsonPathValue), null, 2) 
							: "No matches"
						}
						options={ { minimap: { enabled: false }}}
						className="border-2"
					/>
				</div>
			)}
		</Card>
	);
};

export default JsonUrlAssetDetails;
