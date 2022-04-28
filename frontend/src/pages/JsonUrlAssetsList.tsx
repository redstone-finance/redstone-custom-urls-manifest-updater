import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { shortenCustomOracleId } from "../utils";

const mock = {
	"0x031f7bcd73d9f5edf2a568ce68a1fa12eb5446979aa153dd8782030373c49b04": {
		"customUrlDetails": {
			"url": "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
			"jsonpath": "$.RAW.ETH.USD.PRICE"
		},
		"maxPriceDeviationPercent": 80
	},
	"0xffe45ffaf671f5639376511d38fec72826638665701dafbcdb49ee1da0168ad5": {
		"customUrlDetails": {
			"url": "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
			"jsonpath": "$.RAW.ETH.USD.MEDIAN"
		},
		"maxPriceDeviationPercent": 80
	},
	"0xd8e28697d41536a1cf9eaa7399232033d30cbc3ab08ce055fb3184fa2df599a6": {
		"customUrlDetails": {
			"url": "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
			"jsonpath": "$.RAW.ETH.USD.VOLUMEDAY"
		},
		"maxPriceDeviationPercent": 80
	}
}

const JsonUrlAssetsList = () => {
	const navigate = useNavigate();

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
			{Object.entries(mock).map(([key, value]) => (
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
