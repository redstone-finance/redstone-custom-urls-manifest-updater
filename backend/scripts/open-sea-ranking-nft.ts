import axios from "axios";

const top20slugs = [
    "boredapeyachtclub",
    "mutant-ape-yacht-club",
    "otherdeed",
    "azuki",
    "decentraland",
    "clonex",
    "sandbox",
    "proof-moonbirds",
    "doodles-official",
    "meebits",
    "cool-cats-nft",
    "bored-ape-kennel-club",
    "lootproject",
    "decentraland-wearables",
    "cryptokitties",
    "decentraland-wearables",
    "world-of-women-nft",
    "cryptoadz-by-gremplin",
    "parallelalpha",
    "superrare"
];

(async() => {
    for (const slug of top20slugs) {
        const customUrls = "https://custom-urls-manifest-updater.redstone.finance/api/custom-urls"
        const url = `https://api.opensea.io/api/v1/collection/${slug}/stats`
        const body = {
            url,
            jsonpath: "$.stats.floor_price",
            comment: `Floor Price for ${slug} Collection`
        }
        await axios.post(customUrls, body)
            .then((result) => {
                console.log(`Collection ${slug} - ${result.data}`)
            })
            .catch((error) => {
                console.log(`Couldn"t add collection ${slug}:`)
                console.log(error.response.data)
            });
    }
    console.log("All Done!")
})()