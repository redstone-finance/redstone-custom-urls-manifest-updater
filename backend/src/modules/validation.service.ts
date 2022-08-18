import js from "jsonpath";
import { Manifest } from "../types";
import { calculateSymbol } from "../utils";

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

export const isNumberish = (valueFromJsonPath: any) => {
  let valueParsed = valueFromJsonPath;
  const isTypeOfNumber = typeof valueFromJsonPath === "number";
  const isNotNullOrUndefined = !(
    valueParsed === null || valueParsed === undefined
  );
  const isNotEmptyString = !(
    typeof valueParsed === "string" && valueParsed.length === 0
  );
  if (typeof valueFromJsonPath === "string") {
    const valueWithoutCommas = valueFromJsonPath.replace(/,/g, "");
    valueParsed = Number(valueWithoutCommas);
  }
  const isNotNaN = !isNaN(valueParsed);
  const isNumberAsString =
    typeof valueParsed === "number" && !isNaN(valueParsed);
  return (
    isNotNullOrUndefined &&
    isNotNaN &&
    isNotEmptyString &&
    (isTypeOfNumber || isNumberAsString)
  );
};

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
  const isResponseNumber = isNumberish(valuesFromJsonPath[0]);
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
