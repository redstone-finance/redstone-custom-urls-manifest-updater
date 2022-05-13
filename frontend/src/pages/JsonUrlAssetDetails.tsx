import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import js from "jsonpath";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchAsset } from "../utils";
import CodeExamples from "../components/CodeExamples";
import JsonPathResults from "../components/JsonPathResults";

const JsonUrlAssetDetails = () => {
  const [jsonPathValue, setJsonPathValue] = useState("");
  const [json, setJson] = useState("");
  const [showCodeExamples, setShowCodeExamples] = useState(false);
  const { id } = useParams();

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
      setJson("");
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
        setJsonPathValue("");
      }
    } catch {
      setJsonPathValue("");
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-sky-900 font-bold">
              ID
            </p>
            <p className="text-md text-neutral-600">
              {data?.id ?? "-"}
            </p>
          </div>
          <a
            href={`https://app.redstone.finance/#/app/token/${data.id}`}
            className="bg-white hover:opacity-75 text-redstone font-bold py-2 px-4 rounded-full border-2 border-redstone"
            target="_blank"
          >
            Show historical data
          </a>
        </div>
        <div>
          <p className="text-sm text-sky-900 font-bold">
            URL
          </p>
          <p className="text-md text-neutral-600">
            {data?.url ?? "-"}
          </p>
        </div>
        <div>
          <p className="text-sm text-sky-900 font-bold">
            JSON path
          </p>
          <p className="text-md text-neutral-600">
            {data?.jsonpath ?? "-"}
          </p>
        </div>
        <div>
          <p className="text-sm text-sky-900 font-bold">
            Comment
          </p>
          <p className="text-md text-neutral-600">
            {data?.comment ?? "-"}
          </p>
        </div>
      </div>
      {showCodeExamples && <CodeExamples customUrlId={data.id} />}
      {!!jsonPathValue && <JsonPathResults json={json} jsonPathValue={jsonPathValue} />}
      <div className="flex gap-5 justify-end">
        <button
          onClick={() => setShowCodeExamples(!showCodeExamples)}
          className="bg-white hover:opacity-75 text-redstone font-bold py-2 px-4 rounded-full border-2 border-redstone"
        >
          {`${showCodeExamples ? "Hide" : "Show"} sample code`}
        </button>
        <button
          onClick={() => fetchJsonPathValue()}
          className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
        >
          Test fetching now
        </button>
      </div>
    </Card>
  );
};

export default JsonUrlAssetDetails;
