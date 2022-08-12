
const request = require("request");
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ apiKey: process.env.API_KEY })

const sendZap = (rets) => new Promise(resolve => {

    let str = 'Siret,Nom,Téléphone,Date,Conclusion,Erreur\n'
    for (let i in rets) {
        const elem = rets[i]
        str += `"${elem.siret}","${elem.name}","${elem.phone}","${elem.date}","${elem.conclusion}",${elem.error ? `"${elem.error}"` : ''}\n`
    }
    str = '<table cellspacing="0" cellpadding="10" border="1"><thead><tr><th>Siret</th><th>Nom</th><th>Téléphone</th><th>Date</th><th>Erreur</tr></td></thead><tbody>'
    for (let i in rets) {
        const elem = rets[i]
        str += `<tr><td>${elem.siret}</td><td>${elem.name}</td><td>${elem.phone}</td><td>${elem.date}</td><td>${elem.conclusion}</td><td>${elem.error ? `"${elem.error}"` : ''}</td></tr>`
    }
    str += '</tbody></table>'
    console.log(str)
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `https://hooks.zapier.com/hooks/catch/5757310/boeeuk6/`,
        body: JSON.stringify({
            msgs: str
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

// sendZap([
//     {
//         "siret": "83182708400011",
//         "name": "MOLINA Célia",
//         "phone": "0644855870",
//         "date": "2021-03-28"
//     }
// ]).then(() => process.exit(0))

const sendOrange = (data) => new Promise(resolve => {
    request.post({
        headers: {
            'authorization': 'Basic b2ppRjA5TUNuWE1oUUNyWmJMRDIwR2I1Nlh1YjlyeUg6T28yYVlxckd6aDFSOEVVQQ==',
            'content-type': 'application/json'
        },
        url: `https://api.orange.com/dviservice/v1/outgoingCall`,
        body: JSON.stringify(data)
    }, (err, httpResponse, body) => {
        if (err || httpResponse.statusCode >= 400) {
            console.log("err", err)
            console.log("statusCode", httpResponse && httpResponse.statusCode ? httpResponse.statusCode : 0)
            console.log(body)
        } else {
            console.log(body)
        }
        resolve(body)
    })
})

const sendRequest = (data) => new Promise(resolve => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `https://api.monitor.hubspot.brindibou.ovh/request`,
        body: JSON.stringify(data)
    }, (err, httpResponse, body) => {
        if (err || httpResponse.statusCode >= 400) {
            console.log("err", err)
            console.log("statusCode", httpResponse && httpResponse.statusCode ? httpResponse.statusCode : 0)
        } else {
            // console.log(body)
        }
        resolve()
    })
})

const main = async () => {

    const rets = []

    try {
        const startA = Date.now()

        const next = async (after = 0, total = 0) => {
            const start = Date.now()
            let results = null
            // while (results === null) {
            //     try {
                    results = await hubspotClient.crm.companies.basicApi.getPage(100, after, [
                        "remontee_orange",
                        "num_ro_de_contact_client",
                        "date_dernier_contact",
                        "univers",
                        "nom_g_rant",
                        "siret",
                        "e_mail",
                        "type_de_conclusion"
                    ])
                    await sendRequest({
                        name: 'Search ' + after + ' from CRM 1',
                        method: 'getPage',
                        project: 'Remontée Orange',
                        result: results.body.results.length + ' objects'
                    })
            //     } catch (e) {
            //         console.log(e)
            //     }
            // }
            // console.log(JSON.stringify(results, null, 4))
            const l = results.body.results.length
            const data = results.body.results.map(elem => ({
                id: elem.id,
                remontee_orange: elem.properties.remontee_orange,
                num_ro_de_contact_client: elem.properties.num_ro_de_contact_client,
                date_dernier_contact: elem.properties.date_dernier_contact,
                univers: elem.properties.univers,
                nom_g_rant: elem.properties.nom_g_rant,
                type_de_conclusion: elem.properties.type_de_conclusion,
                siret: elem.properties.siret,
                e_mail: elem.properties.e_mail,
            })).filter(elem => elem.remontee_orange === "A ENVOYER")
            console.log(JSON.stringify(data, null, 4))
            for (let i = 0; i < data.length; i++) {
                const elem = data[i]
                const ret = await sendOrange({
                    "telephoneNumber": elem.num_ro_de_contact_client,
                    "date": `${elem.date_dernier_contact}T14:00:00Z`,
                    "conclusion": elem.type_de_conclusion,
                    "productCategory": elem.univers,
                    "interlocutor": {
                        "title": "M.",
                        "familyName": elem.nom_g_rant,
                        "givenName": elem.nom_g_rant,
                        // "emailAddress": elem.e_mail
                    },
                    "organization": {
                        "siren": elem.siret ? elem.siret.substring(0, "380129866".length) : null,
                        "siret": elem.siret
                    }
                })
                let json = JSON.parse(ret)
                console.log(json)
                json = {
                    siret: elem.siret,
                    name: elem.nom_g_rant,
                    phone: elem.num_ro_de_contact_client,
                    date: elem.date_dernier_contact,
                    conclusion: elem.type_de_conclusion,
                    error: json.description
                }
                rets.push(json)
                if (!json.error) {
                    const ret = await hubspotClient.crm.companies.basicApi.update(data[i].id, {
                        properties: {
                            remontee_orange: "ENVOYEE"
                        }
                    })
                    await sendRequest({
                        name: 'Update Siret',
                        method: 'update',
                        project: 'Remontée Orange',
                        result: JSON.stringify(ret)
                    })
                }
            }
            const end = Date.now()
            // console.log(`${Math.floor((end - start) / 1000)} s`)
            console.log({ total })
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after, total + l)
        }
        await next()
        const endA = Date.now()
        console.log(`TIMES: ${Math.floor((endA - startA) / 1000)} s`)
        await sendZap(rets)
        process.exit(0)
    } catch (e) {
        console.log(e)
    }
}

// main()

const main2 = () => {
    const r = async () => {
        const d = new Date()
        if (d.getHours() === 2 && d.getMinutes() === 0) {
            console.log(`Go ! ${d.getHours()} : ${d.getMinutes()}`)
            main()
        } else {
            console.log(`Wait ! ${d.getHours()} : ${d.getMinutes()}`)
        }
        setTimeout(r, 60 * 1000)
    }
    r()
}

main2()
