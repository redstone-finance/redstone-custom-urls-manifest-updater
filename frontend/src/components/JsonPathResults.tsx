import Editor from "@monaco-editor/react";

interface Props {
  json: string;
  jsonPathValue: string;
}

const JsonPathResults = ({ json, jsonPathValue }: Props) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1">
        <h4 className="text-base text-neutral-700 font-bold mb-2">
          URL Response
        </h4>
        <Editor
          height="40vh"
          defaultLanguage="json"
          value={JSON.stringify(JSON.parse(json), null, 2)}
          options={{ minimap: { enabled: false } }}
          className="border-2"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-base text-neutral-700 font-bold mb-2">
          JSONPath result
        </h4>
        <Editor
          height="40vh"
          defaultLanguage="json"
          value={
            !!jsonPathValue
              ? JSON.stringify(JSON.parse(jsonPathValue), null, 2)
              : "No matches"
          }
          options={{ minimap: { enabled: false } }}
          className="border-2"
        />
      </div>
    </div>
  );
};

export default JsonPathResults;
