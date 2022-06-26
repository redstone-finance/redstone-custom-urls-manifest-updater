import axios from "axios";
import OpenseaScraper from "opensea-scraper";

(async() => {
    const rankings = (await OpenseaScraper.rankings("total")).slice(0,20);
    for (const ranking of rankings) {
        const customUrls = 'https://custom-urls-manifest-updater.redstone.finance/api/custom-urls'
        const url = `https://api.opensea.io/api/v1/collection/${ranking.slug}/stats`
        const body = {
            url,
            jsonpath: '$.stats.floor_price',
            comment: `Floor Price for ${ranking.name} Collection`
        }
        await axios.post(customUrls, body)
            .then((result) => {
                console.log(`Collection ${ranking.name} - ${result.data}`)
            })
            .catch((error) => {
                console.log(`Couldn't add collection ${ranking.name}:`)
                console.log(error.response.data)
            });
    }
    console.log('All Done!')
})()