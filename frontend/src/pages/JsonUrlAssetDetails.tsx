import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import js from "jsonpath";
import Card from "../components/Card";
import Loader, { Spinner } from "../components/Loader";
import JsonPathResults from "../components/JsonPathResults";
import Modal from "../components/Modal";
import CodeExamples from "../components/CodeExamples";
import { fetchAsset } from "../utils";
import ExternalLinkIcon from "../assets/external-link.svg";

const JsonUrlAssetDetails = () => {
  const [jsonPathValue, setJsonPathValue] = useState("");
  const [json, setJson] = useState("");
  const [showCodeExamples, setShowCodeExamples] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setIsTestLoading(true);
    try {
      const response = await fetch(data.url);
      const manifest = await response.json();
      setJson(JSON.stringify(manifest));
      setIsTestLoading(false);
      return manifest;
    } catch {
      setJson("");
      setErrorMessage("Cannot fetch JSON from URL");
      setIsTestLoading(false);
    }
  };

  const fetchJsonPathValue = async () => {
    const manifest = await fetchJson();
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
    <div>
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-sky-900 font-bold">ID</p>
              <p className="text-md text-neutral-600">{data?.id ?? "-"}</p>
            </div>
            <a
              href={`https://app.redstone.finance/#/app/token/${data.id}`}
              className="text-neutral-600"
              target="_blank"
            >
              <div className="flex gap-2 align-center">
                Show historical data
                <img src={ExternalLinkIcon} width={20} />
              </div>
            </a>
          </div>
          <div>
            <p className="text-sm text-sky-900 font-bold">URL</p>
            <p className="text-md text-neutral-600">{data?.url ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-sky-900 font-bold">JSON path</p>
            <p className="text-md text-neutral-600">{data?.jsonpath ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-sky-900 font-bold">Comment</p>
            <p className="text-md text-neutral-600">{data?.comment ?? "-"}</p>
          </div>
        </div>
        {showCodeExamples && <CodeExamples customUrlId={data.id} />}
        {!!jsonPathValue && (
          <JsonPathResults json={json} jsonPathValue={jsonPathValue} />
        )}
        <div className="flex gap-5 justify-end">
          <button
            onClick={() => setShowCodeExamples(!showCodeExamples)}
            className="bg-white hover:opacity-75 text-redstone py-2 px-4 rounded-full border border-redstone"
          >
            {`${showCodeExamples ? "Hide" : "Show"} sample code`}
          </button>
          <button
            onClick={() => fetchJsonPathValue()}
            className="bg-redstone hover:opacity-75 text-white py-2 px-4 rounded-full text-center"
          >
            {isTestLoading ? <Spinner size={5} /> : "Test fetching now"}
          </button>
        </div>
      </Card>
      {!!errorMessage && (
        <Modal
          closeModal={() => setErrorMessage("")}
          title="There is a problem"
          text={errorMessage}
        />
      )}
    </div>
  );
};

export default JsonUrlAssetDetails;
