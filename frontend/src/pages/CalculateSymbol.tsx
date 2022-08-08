import { useState } from "react";
import Card from "../components/Card";
import { calculateSymbol } from "../../../shared/utils";

const CalculateSymbol = () => {
  const [url, setUrl] = useState("");
  const [jsonpath, setJsonpath] = useState("");

  return (
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
        <label
          className="block text-sky-900 text-sm font-bold mb-2"
          htmlFor="jsonpath"
        >
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
      <div>
        <label
          className="block text-sky-900 text-sm font-bold mb-2"
          htmlFor="jsonpath"
        >
          Calculated symbol
        </label>
        <input
          className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline"
          id="symbol"
          type="text"
          placeholder="Calculated symbol"
          disabled
          value={calculateSymbol(url, jsonpath)}
        />
      </div>
    </Card>
  );
};

export default CalculateSymbol;
