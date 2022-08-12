
const request = require("request");
const hubspot = require('@hubspot/api-client')
const hubspotAds = require('hubspot')
const hubspotClient = new hubspot.Client({ apiKey: process.env.API_KEY })
const hubspotClient2 = new hubspot.Client({ apiKey: process.env.API_KEY_2 })
const hubspotAdsClient = new hubspotAds({ apiKey: process.env.API_KEY })
const hubspotAdsClient2 = new hubspotAds({ apiKey: process.env.API_KEY_2 })

const getProperties = (key) => () => new Promise(resolve => {

    const options = {
        method: 'GET',
        url: 'https://api.hubapi.com/properties/v1/transactions/properties',
        qs: { hapikey: key }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const properties = JSON.parse(body)
        resolve([properties, properties.map(elem => elem.name)])
    });
})

const sendError = (domain, error) => new Promise(resolve => {
    console.log('sendError', { domain })
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `https://hooks.zapier.com/hooks/catch/5757310/on3f68r/`,
        body: JSON.stringify({
            domain,
            error
        })
    }, (err, httpResponse, body) => {
        if (err || httpResponse.statusCode >= 400) {
            console.log("err", err)
            console.log("statusCode", httpResponse && httpResponse.statusCode ? httpResponse.statusCode : 0)
        } else {
            console.log(body)
        }
        resolve()
    })
})


const getProperties1 = getProperties(process.env.API_KEY)
const getProperties2 = getProperties(process.env.API_KEY_2)

const getMax = (hubspotClient) => {
    return new Promise(async (resolve) => {

        let total = []

        const next = async (after = 0) => {
            const results = await hubspotClient.crm.deals.basicApi.getPage(100, after, ["dealname", "pipeline"])
            results.body.results.forEach(elem => {
                // if (!total.includes(elem?properties.dealname))
                    total.push(elem)
            })
            console.log({ total: total.length })
            // console.log(JSON.stringify(results, null, 4))
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after)
        }
        await next()
        // process.exit(0)
        resolve(total)
    })
}


const main = async () => {

    try {

        const max = await getMax(hubspotClient)
        const max2 = await getMax(hubspotClient2)

        const a = {}
        const b = {}

        max.forEach(elem => {
            if (elem.properties)
                a[elem.properties.pipeline] = a[elem.properties.pipeline] ? a[elem.properties.pipeline] + 1 : 1
            else {
                console.log(elem)
                process.exit(0)
            }
        })
        max2.forEach(elem => {
            if (elem.properties)
                b[elem.properties.pipeline] = b[elem.properties.pipeline] ? b[elem.properties.pipeline] + 1 : 1
            else {
                console.log(elem)
                process.exit(0)
            }
        })

        console.log(JSON.stringify(a, null, 4))
        console.log(JSON.stringify(b, null, 4))


        process.exit(0)
    } catch (e) {
        console.log(e)
    }
}

main()
