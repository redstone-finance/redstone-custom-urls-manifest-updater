import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import js from "jsonpath";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { Spinner } from "../components/Loader";
import { NewCustomUrlInput } from "../../../shared/types";

const NewJsonUrlAsset = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [jsonpath, setJsonpath] = useState("");
  const [comment, setComment] = useState("");
  const [stringJson, setStringJson] = useState("");
  const [jsonpathMatchResult, setJsonpathMatchResult] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (stringJson) {
      handleJsonpathQuery(stringJson);
    }
  }, [jsonpath]);

  const fetchJson = async () => {
    if (url) {
      setIsTestLoading(true);
      try {
        const backendUrl = process.env.BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/proxy?url=${encodeURIComponent(url)}`
        );
        const json = await response.data;
        setIsTestLoading(false);
        return JSON.stringify(json);
      } catch {
        setErrorMessage("Cannot fetch JSON from URL");
        setIsTestLoading(false);
      }
    }
  };

  const handleJsonpathQuery = (jsonAsString: string) => {
    try {
      const matchResult = js.query(JSON.parse(jsonAsString), jsonpath);
      if (matchResult.length > 0) {
        setJsonpathMatchResult(JSON.stringify(matchResult));
      } else {
        setJsonpathMatchResult("");
      }
    } catch {
      setJsonpathMatchResult("");
    }
  };

  const handleEvaluate = async () => {
    const jsonAsString = await fetchJson();
    if (jsonAsString) {
      try {
        setStringJson(jsonAsString);
      } catch {
        setStringJson("");
      }
      handleJsonpathQuery(jsonAsString);
    }
  };

  const mutation = useMutation(
    (newCustomUrl: NewCustomUrlInput) => {
      const backendUrl = process.env.BACKEND_URL;
      const url = `${backendUrl}/custom-urls`;
      return axios.post(url, newCustomUrl);
    },
    {
      onError: (error: AxiosError<string>) =>
        setErrorMessage(error?.response?.data ?? ""),
      onSuccess: () => navigate("/"),
    }
  );

  return (
    <div>
      <Card>
        <div>
          <label
            className="block text-sky-900 text-sm font-bold mb-2"
            htmlFor="url"
          >
            URL
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="URL"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <div>
          <div className="flex gap-3">
            <label
              className="block text-sky-900 text-sm font-bold mb-2"
              htmlFor="jsonpath"
            >
              JSON path
            </label>
            <a
              className="text-sm text-slate-500 italic"
              href="https://jsonpath.com/"
              target="_blank"
            >
              (See how JSONPath works)
            </a>
          </div>
          <input
            className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
            id="jsonpath"
            type="text"
            placeholder="JSON path"
            onChange={(event) => setJsonpath(event.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-sky-900 text-sm font-bold mb-2"
            htmlFor="jsonpath"
          >
            Comment
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
            id="comment"
            type="text"
            placeholder="Comment"
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button
          onClick={() => handleEvaluate()}
          className="bg-redstone hover:opacity-75 text-white py-2 px-4 rounded-full"
        >
          {isTestLoading ? <Spinner size={5} /> : "Evaluate"}
        </button>
        {stringJson && (
          <div className="flex justify-between">
            <Editor
              height="40vh"
              defaultLanguage="json"
              width="48%"
              value={JSON.stringify(JSON.parse(stringJson), null, 2)}
              options={{ minimap: { enabled: false } }}
              className="border-2"
            />
            <Editor
              height="40vh"
              width="48%"
              defaultLanguage="json"
              value={
                !!jsonpathMatchResult
                  ? JSON.stringify(JSON.parse(jsonpathMatchResult), null, 2)
                  : "No matches"
              }
              options={{ minimap: { enabled: false } }}
              className="border-2"
            />
          </div>
        )}
        {jsonpathMatchResult && (
          <div className="flex justify-end">
            <button
              onClick={() => mutation.mutate({ url, jsonpath, comment })}
              className="bg-redstone hover:opacity-75 text-white py-2 px-4 rounded-full"
            >
              {mutation.isLoading ? <Spinner size={5} /> : "Subscribe"}
            </button>
          </div>
        )}
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

export default NewJsonUrlAsset;
