import {
  isSubscribed,
  isOnlyOneValue,
  isNumberish,
  validate,
} from "../src/modules/validation.service";
import manifest from "./helpers/mockManifest.json";

describe("Validation service", () => {
  describe("isSubscribed", () => {
    test("custom url asset already subscribed", () => {
      const isAlreadySubscribed = isSubscribed(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.RAW.ETH.USD.PRICE"
      );
      expect(isAlreadySubscribed).toBeTruthy();
    });

    test("custom url asset not subscribed", () => {
      const isAlreadySubscribed = isSubscribed(
        manifest,
        "https://notSubscribed",
        "notSubscribedManifest"
      );
      expect(isAlreadySubscribed).toBeFalsy();
    });
  });

  describe("isOnlyOneValue", () => {
    test("multiple values", () => {
      const testValues = [1, 2, 3, 4];
      expect(isOnlyOneValue(testValues)).toBeFalsy();
    });

    test("only one value", () => {
      const testValues = [1];
      expect(isOnlyOneValue(testValues)).toBeTruthy();
    });
  });

  describe("isNumberish", () => {
    test("string value", () => {
      const testValues = "test";
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("number as string value", () => {
      const testValues = "1";
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("number as string value 0", () => {
      const testValues = "0";
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("number as string with commas", () => {
      const testValues = "123,123";
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("number as string with commas and dot", () => {
      const testValues = "123,123.123";
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("number value", () => {
      const testValues = 1;
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("number value 0", () => {
      const testValues = 0;
      expect(isNumberish(testValues)).toBeTruthy();
    });

    test("null", () => {
      const testValues = null;
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("undefined", () => {
      const testValues = undefined;
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("NaN", () => {
      const testValues = NaN;
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("empty string", () => {
      const testValues = "";
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("empty object", () => {
      const testValues = {};
      expect(isNumberish(testValues)).toBeFalsy();
    });

    test("object", () => {
      const testValues = {
        test: 1234,
      };
      expect(isNumberish(testValues)).toBeFalsy();
    });
  });

  describe("validate", () => {
    test("already subscribed", async () => {
      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.RAW.ETH.USD.PRICE"
      );
      expect(validation).toEqual({
        isError: true,
        errorMessage: "Introduced pair URL with JSONPath already exists",
      });
    });

    test("not single value", async () => {
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ SUPPLY: [1, 2, 3, 4] }),
          }) as Promise<Response>
      );

      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.SUPPLY"
      );
      expect(validation).toEqual({
        isError: true,
        errorMessage:
          "Response from pair URL and JSONPath is not single number value",
      });
    });

    test("not number value", async () => {
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ SUPPLY: "test" }),
          }) as Promise<Response>
      );

      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.SUPPLY"
      );
      expect(validation).toEqual({
        isError: true,
        errorMessage:
          "Response from pair URL and JSONPath is not single number value",
      });
    });

    test("valid url and jsonpath, number response", async () => {
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ SUPPLY: 1 }),
          }) as Promise<Response>
      );

      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.SUPPLY"
      );
      expect(validation).toEqual({
        isError: false,
        errorMessage: "",
      });
    });

    test("valid url and jsonpath, number as string response", async () => {
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ SUPPLY: "123,123.123" }),
          }) as Promise<Response>
      );

      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.SUPPLY"
      );
      expect(validation).toEqual({
        isError: false,
        errorMessage: "",
      });
    });

    test("valid url and jsonpath, string as number response", async () => {
      global.fetch = jest.fn(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ SUPPLY: "test" }),
          }) as Promise<Response>
      );

      const validation = await validate(
        manifest,
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "$.SUPPLY"
      );
      expect(validation).toEqual({
        isError: true,
        errorMessage:
          "Response from pair URL and JSONPath is not single number value",
      });
    });
  });
});
