import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import js from 'jsonpath';
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchAsset } from "../utils";

const JsonUrlAssetDetails = () => {
	const [jsonPathValue, setJsonPathValue] = useState('');
	const [json, setJson] = useState('');
	const { id } = useParams();;

	const { isLoading, data } = useQuery(`assets-${id}`, () => {
		if (id) {
			return fetchAsset(id);
		}
	});

	if (isLoading || !data) {
		return <Loader />;
	}

	const fetchJson = async () => {
		try {
			const response = await fetch(data.url);
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
			const jsonPathValueFromManifest = js.query(manifest, data.jsonpath);
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
						{data?.id ?? '-'}
					</p>
				</div>
				<div>
					<p className="text-sm text-sky-900 font-bold">
						URL
					</p>
					<p className="text-md text-neutral-600">
						{data?.url ?? '-'}
					</p>
				</div>
				<div>
					<p className="text-sm text-sky-900 font-bold">
						JSON path
					</p>
					<p className="text-md text-neutral-600">
						{data?.jsonpath ?? '-'}
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
