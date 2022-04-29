import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import js from 'jsonpath';
import Card from "../components/Card";

const NewJsonUrlAsset = () => {
	const [url, setUrl] = useState('');
	const [jsonpath, setJsonpath] = useState('');
	const [stringJson, setStringJson] = useState('');
	const [jsonpathMatchResult, setJsonpathMatchResult] = useState('');

	useEffect(() => {
		if (stringJson) {
			handleJsonpathQuery(stringJson);
		}
	}, [jsonpath]);

	const fetchJson = async () => {
		if (url) {
			const response = await fetch(url);
			const json = await response.json();
			return JSON.stringify(json);
		}
	};

	const handleJsonpathQuery = (jsonAsString: string) => {
		try {
			const matchResult = js.query(JSON.parse(jsonAsString), jsonpath);
			if (matchResult.length > 0) {
				setJsonpathMatchResult(JSON.stringify(matchResult));
			} else {
				setJsonpathMatchResult('');
			}
		} catch {
			setJsonpathMatchResult('');
		}
	};

	const handleEvaluate = async () => {
		const jsonAsString = await fetchJson();
		if (jsonAsString) {
			try {
				setStringJson(jsonAsString);
			} catch {
				setStringJson('');
			}
			handleJsonpathQuery(jsonAsString);
		}
	};

	return (
		<Card>
			<div className="mb-2">
				<label className="block text-sky-900 text-sm font-bold mb-2" htmlFor="url">
					URL
				</label>
				<input
					className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
					id="url" type="text"
					placeholder="URL"
					onChange={(event) => setUrl(event.target.value)}
				/>
			</div>
			<div className="mb-2">
				<label className="block text-sky-900 text-sm font-bold mb-2" htmlFor="jsonpath">
					JSON path
				</label>
				<input
					className="shadow border rounded w-full py-2 px-3 text-neutral-600  focus:outline-none focus:shadow-outline"
					id="jsonpath" type="text"
					placeholder="JSON path"
					onChange={(event) => setJsonpath(event.target.value)}
				/>
			</div>
			<button
				onClick={() => handleEvaluate()}
				className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
			>
				Evaluate
			</button>
			{stringJson && (
				<div className="flex justify-between">
					<Editor 
						height="40vh"
						defaultLanguage="json"
						width="48%"
						value={JSON.stringify(JSON.parse(stringJson), null, 2)}
						options={ { minimap: { enabled: false }}}
						className="border-2"
					/>
					<Editor 
						height="40vh"
						width="48%"
						defaultLanguage="json"
						value={!!jsonpathMatchResult 
							? JSON.stringify(JSON.parse(jsonpathMatchResult), null, 2) 
							: "No matches"
						}
						options={ { minimap: { enabled: false }}}
						className="border-2"
					/>
				</div>
			)}
			{jsonpathMatchResult && (
				<div className="flex justify-end">
					<button
						onClick={() => handleEvaluate()}
						className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
					>
						Subscribe
					</button>
				</div>
			)}
		</Card>
	);
};

export default NewJsonUrlAsset;
