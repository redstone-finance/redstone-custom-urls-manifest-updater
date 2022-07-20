import axios from "axios";

const top20slugs = [
  { slug: "boredapeyachtclub", name: "Bored Ape Yacht Club" },
  { slug: "mutant-ape-yacht-club", name: "Mutant Ape Yacht Club" },
  { slug: "otherdeed", name: "Otherdeed for Otherside" },
  { slug: "azuki", name: "Azuki" },
  { slug: "decentraland", name: "Decentraland" },
  { slug: "clonex", name: "CLONE X - X TAKASHI MURAKAMI" },
  { slug: "sandbox", name: "The Sandbox" },
  { slug: "proof-moonbirds", name: "Moonbirds" },
  { slug: "doodles-official", name: "Doodles" },
  { slug: "meebits", name: "Meebits" },
  { slug: "cool-cats-nft", name: "Cool Cats NFT" },
  { slug: "bored-ape-kennel-club", name: "Bored Ape Kennel Club" },
  { slug: "lootproject", name: "Loot (for Adventurers)" },
  { slug: "decentraland-wearables", name: "Decentraland Wearables" },
  { slug: "cryptokitties", name: "CryptoKitties" },
  { slug: "world-of-women-nft", name: "World Of Women" },
  { slug: "cryptoadz-by-gremplin", name: "CrypToadz by GREMPLIN" },
  { slug: "parallelalpha", name: "Parallel Alpha" },
  { slug: "superrare", name: "SuperRare" },
  { slug: "beanzofficial", name: "BEANZ Official" },
];

(async () => {
  for (const { slug, name } of top20slugs) {
    const customUrls =
      "https://custom-urls-manifest-updater.redstone.finance/api/custom-urls";
    const url = `https://api.opensea.io/api/v1/collection/${slug}/stats`;
    const body = {
      url,
      jsonpath: "$.stats.floor_price",
      comment: `Floor Price for ${name} Collection`,
    };
    await axios
      .post(customUrls, body)
      .then((result) => {
        console.log(`Collection ${name} - ${result.data}`);
      })
      .catch((error) => {
        console.log(`Couldn"t add collection ${name}:`);
        console.log(error.response.data);
      });
  }
  console.log("All Done!");
})();
