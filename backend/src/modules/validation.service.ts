import js from "jsonpath";
import { Manifest } from "../../../shared/types";
import { calculateSymbol } from "../../../shared/utils";

const fetchJsonPathResponse = async (url: string, jsonpath: string) => {
  const response = await (await fetch(url)).json();
  return js.query(response, jsonpath);
};

export const isSubscribed = (
  manifest: Manifest,
  url: string,
  jsonpath: string
) => {
  return Object.keys(manifest.tokens).some(
    (id) => id === calculateSymbol(url, jsonpath)
  );
};

export const isOnlyOneValue = (valuesFromJsonPath: any[]) =>
  valuesFromJsonPath.length === 1;

export const isNumber = (valueFromJsonPath: any) =>
  typeof valueFromJsonPath === "number";

export const validate = async (
  manifest: Manifest,
  url: string,
  jsonpath: string
) => {
  const isAlreadySubscribed = isSubscribed(manifest, url, jsonpath);
  if (isAlreadySubscribed) {
    return {
      isError: true,
      errorMessage: "Introduced pair URL with JSONPath already exists",
    };
  }
  const valuesFromJsonPath = await fetchJsonPathResponse(url, jsonpath);
  const isOnlyOneValueInResponse = isOnlyOneValue(valuesFromJsonPath);
  const isResponseNumber = isNumber(valuesFromJsonPath[0]);
  if (!isOnlyOneValueInResponse || !isResponseNumber) {
    return {
      isError: true,
      errorMessage:
        "Response from pair URL and JSONPath is not single number value",
    };
  }
  return {
    isError: false,
    errorMessage: "",
  };
};
