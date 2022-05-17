import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchAssets, shortenCustomOracleId, shortenUrl } from "../utils";

const JsonUrlAssetsList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { isLoading, data } = useQuery("assets", fetchAssets);

  if (isLoading || !data) {
    return <Loader />;
  }

  const assetsSorted = Object.entries(data)
    .sort(([,left], [,right]) => Number(left.isPending) - Number(right.isPending));

  const assetsFiltered = assetsSorted.filter(([key, value]) => {
    const searchLowerCase = search.toLowerCase();
    return key.toLowerCase().includes(searchLowerCase) ||
      value.customUrlDetails.jsonpath.toLowerCase().includes(searchLowerCase) ||
      value.customUrlDetails.url.toLowerCase().includes(searchLowerCase) ||
      value.comment?.toLocaleLowerCase().includes(searchLowerCase);
  });

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl text-neutral-700 font-bold">
            Custom URL Oracles
          </h2>
          <input
            className="shadow border rounded w-half py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <button
          onClick={() => navigate("/create-new")}
          className="bg-white hover:opacity-75 text-redstone py-2 px-4 rounded-full border border-redstone"
        >
          Create new
        </button>
      </div>
      {assetsFiltered.map(([key, value]) => (
        <div
          key={key}
          className={`shadow-3xl cursor-pointer hover:scale-105 hover:transition-all rounded
            ${value.isPending && "border-2 border-yellow-500"}
            ${value.isPending ? "px-5 pb-5 pt-1" : "p-5"}
          `}
        >
          {value.isPending && <div className="flex justify-center mb-1 text-xs text-yellow-600">
            Pending
          </div>}
          <div
            className="flex items-start align-center gap-5"
            onClick={() => navigate(key)}
          >
            <div className="w-1/6">
              <p className="text-xs text-sky-900 font-bold">ID</p>
              <p className="text-sm text-neutral-600">
                {shortenCustomOracleId(key)}
              </p>
            </div>
            <div className="w-2/6 overflow-hidden">
              <p className="text-xs text-sky-900 font-bold">Comment</p>
              <p className="text-sm text-neutral-600 truncate">{value?.comment ?? '-'}</p>
            </div>
            <div className="w-2/6 overflow-hidden">
              <p className="text-xs text-sky-900 font-bold">URL</p>
              <p className="text-sm text-neutral-600 truncate">{shortenUrl(value.customUrlDetails.url)}</p>
            </div>
            <div className="w-1/6 overflow-hidden">
              <p className="text-xs text-sky-900 font-bold">JSON path</p>
              <p className="text-sm text-neutral-600 truncate">{value.customUrlDetails.jsonpath}</p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default JsonUrlAssetsList;
