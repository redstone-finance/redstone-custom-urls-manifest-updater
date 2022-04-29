import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchAssets, shortenCustomOracleId } from "../utils";

const JsonUrlAssetsList = () => {
	const navigate = useNavigate();

	const { isLoading, data } = useQuery('assets', fetchAssets);

	if (isLoading || !data) {
		return <Loader />;
	}

	return (
		<Card>
			<div className="flex justify-between align-center">
				<h2 className="text-xl text-neutral-700 font-bold">Custom URL Oracles</h2>
				<button
					onClick={() => navigate('/create-new')}
					className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
				>
					Create new
				</button>
			</div>
			{Object.entries(data).map(([key, value]) => (
				<div
					key={key}
					className="flex rounded align-center shadow-3xl p-5 cursor-pointer hover:scale-105 hover:transition-all"
					onClick={() => navigate(key)}
				>
					<div className="w-1/6">
						<p className="text-xs text-sky-900 font-bold">ID</p>
						<p className="text-sm text-neutral-600">
							{shortenCustomOracleId(key)}
						</p>
					</div>
					<div className="w-4/6">
						<p className="text-xs text-sky-900 font-bold">URL</p>
						<p className="text-sm text-neutral-600">{value.customUrlDetails.url}</p>
					</div>
					<div className="w-1/4">
						<p className="text-xs text-sky-900 font-bold">JSON path</p>
						<p className="text-sm text-neutral-600">{value.customUrlDetails.jsonpath}</p>
					</div>
				</div>
			))}
		</Card>
	);
};

export default JsonUrlAssetsList;
