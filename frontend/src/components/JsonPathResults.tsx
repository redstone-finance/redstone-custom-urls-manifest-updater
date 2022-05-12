import Editor from "@monaco-editor/react";

interface Props {
  json: string;
  jsonPathValue: string;
}

const JsonPathResults = ({ json, jsonPathValue }: Props) => {
  return (
    <div>
      <h4 className="text-base text-neutral-700 font-bold mb-2">
        JSONPath response
      </h4>
      <div className="flex justify-between">
        <Editor 
          height="40vh"
          defaultLanguage="json"
          width="48%"
          value={JSON.stringify(JSON.parse(json), null, 2)}
          options={ { minimap: { enabled: false }}}
          className="border-2"
        />
        <Editor 
          height="40vh"
          width="48%"
          defaultLanguage="json"
          value={!!jsonPathValue 
            ? JSON.stringify(JSON.parse(jsonPathValue), null, 2) 
            : "No matches"
          }
          options={ { minimap: { enabled: false }}}
          className="border-2"
        />
      </div>
    </div>
  );
};

export default JsonPathResults;
