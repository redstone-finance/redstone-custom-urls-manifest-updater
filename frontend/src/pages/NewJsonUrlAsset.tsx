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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const mutation = useMutation((newCustomUrl: NewCustomUrlInput) => {
    const backendUrl = process.env.BACKEND_URL;
    const url = `${backendUrl}/custom-urls`;
    return axios.post(url, newCustomUrl);
  }, {
    onError: () => setIsModalOpen(true),
    onSuccess: () => navigate("/")
  });
  const errorMessage = (mutation.error as AxiosError<string>)?.response?.data ?? "";

  return (
    <div>
      <Card>
        <div className="mb-2">
          <label className="block text-sky-900 text-sm font-bold mb-2" htmlFor="url">
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
        <div className="mb-2">
          <label className="block text-sky-900 text-sm font-bold mb-2" htmlFor="jsonpath">
            JSON path
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
            id="jsonpath"
            type="text"
            placeholder="JSON path"
            onChange={(event) => setJsonpath(event.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-sky-900 text-sm font-bold mb-2" htmlFor="jsonpath">
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
            {mutation.isLoading ? (
                <Spinner />
              ) : (
                <button
                  onClick={() => mutation.mutate({ url, jsonpath, comment })}
                  className="bg-redstone hover:opacity-75 text-white font-bold py-2 px-4 rounded-full"
                >
                  Subscribe
                </button>
              )
            }
          </div>
        )}
      </Card>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="There is a problem"
        text={errorMessage}
      />
    </div>
  );
};

export default NewJsonUrlAsset;
