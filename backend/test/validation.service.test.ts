import {
  isSubscribed,
  isOnlyOneValue,
  isNumber,
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

  describe("isNumber", () => {
    test("string value", () => {
      const testValues = "test";
      expect(isNumber(testValues)).toBeFalsy();
    });

    test("number as string value", () => {
      const testValues = "1";
      expect(isNumber(testValues)).toBeFalsy();
    });

    test("number value", () => {
      const testValues = 1;
      expect(isNumber(testValues)).toBeTruthy();
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
          json: () => Promise.resolve({ SUPPLY: "1" }),
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

  test("valid url and jsonpath", async () => {
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
});
