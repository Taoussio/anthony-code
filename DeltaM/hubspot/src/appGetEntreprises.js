
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ apiKey: process.env.API_KEY })

const main = async () => {

    try {

        const mapping = {
            "city": "city",
            "civilit_": "civilite",
            "client_en_portefeuille": "client_en_portefeuille",
            "domain": "domain",
            "country": "country",
            "description": "description",
            "detail_retour_du_rdv": "detail_retour_du_rdv",
            "e_mail": "e_mail",
            "forme_juridique": "forme_juridique",
            "gps": "gps",
            "is_public": "is_public",
            "name": "name",
            "nom_de_l_enseigne": "nom_de_l_enseigne",
            "nom_d_entreprise": "nom_d_entreprise",
            "nom_g_rant": "nom_et_prenom_du_gerant",
            "numberofemployees": "numberofemployees",
            "num_ro_de_contact_client": "numero_de_contact_client",
            "num_ro_de_portable": "numero_s__de_portable_s_",
            "phone": "phone",
            "portefeuille": "portefeuille",
            "zip": "zip",
            "secteur_d_activit_": "secteur_d_activite",
            "secteur_d_activite": "secteur_d_activite_",
            "siret": "siret",
            "site_web_orange": "site_web",
            "state": "state",
            "address": "address",
            "address2": "address2",
            "timezone": "timezone",
            "total_money_raised": "total_money_raised",
            "type": "type",
            "url_du_site_web": "url_du_site_web",
            "web_technologies": "web_technologies",
            "website": "website",
        }


        const startA = Date.now()

        let i = 1

        const next = async (after = 0, total = 0) => {
            const start = Date.now()
            let results = null
            while (!results) {
                try {
                    results = await hubspotClient.crm.companies.basicApi.getPage(100, after, Object.keys(mapping))
                } catch (e) {
                }
            }

            require('fs').writeFileSync(`./bk/hubspot/${i}.json`, JSON.stringify(results.body.results, null, 4))

            i++

            console.log(results.body.results.length + total)

            const end = Date.now()
            console.log(`${Math.floor((end - start) / 1000)} s`)
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after, total + results.body.results.length)
        }
        await next()
        const endA = Date.now()
        console.log(`TIMES: ${Math.floor((endA - startA) / 1000)} s`)

        process.exit(0)
    } catch (e) {
        console.log(e)
    }
}

main()
