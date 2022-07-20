import { generateNewManifest } from "../src/modules/manifest.service";
import manifest from "./helpers/mockManifest.json";

describe("Manifest service", () => {
  describe("generateNewManifest", () => {
    test("generate new manifest with new custom oracle url and jsonpath", async () => {
      const newManifest = generateNewManifest(
        manifest,
        "https://newUrl",
        "newJsonpath",
        "Test comment"
      );
      expect(newManifest).toEqual({
        ...manifest,
        tokens: {
          ...manifest.tokens,
          "0x16e82b57b6e71a27": {
            customUrlDetails: {
              jsonpath: "newJsonpath",
              url: "https://newUrl",
            },
            comment: "Test comment",
          },
        },
      });
    });
  });
});
