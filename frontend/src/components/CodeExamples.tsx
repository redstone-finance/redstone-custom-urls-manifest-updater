import Editor from "@monaco-editor/react";
import {
  getJavascriptCodeExample,
  getSolidityCodeExample,
} from "../assets/codeExamples";

interface Props {
  customUrlId: string;
}

const CodeExamples = ({ customUrlId }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="text-base text-neutral-700 font-bold mb-2">
          Sample Javascript interface
        </h4>
        <Editor
          height="35vh"
          defaultLanguage="javascript"
          width="100%"
          value={getJavascriptCodeExample(customUrlId)}
          options={{ minimap: { enabled: false } }}
          className="border-2"
        />
      </div>
      <div>
        <h4 className="text-base text-neutral-700 font-bold mb-2">
          Sample Solidity Smart contract
        </h4>
        <Editor
          height="50vh"
          width="100%"
          defaultLanguage="sol"
          value={getSolidityCodeExample(customUrlId)}
          options={{ minimap: { enabled: false } }}
          className="border-2"
        />
      </div>
    </div>
  );
};

export default CodeExamples;
