
const request = require('request')

module.exports = function (client, model) {

    model.sendRequest = (data) => new Promise(resolve => {
        request.post({
            headers: { 'content-type': 'application/json' },
            url: `http://monitor-api:5000/request`,
            // url: `https://api.monitor.hubspot.brindibou.ovh/request`,
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

    model.getEntreprises = (query) => new Promise(async (resolve) => {
        try {

            let filter
            if (query.siret) {
                filter = { propertyName: 'siret', operator: 'EQ', value: query.siret }
            }
            if (query.domain) {
                filter = { propertyName: 'domain', operator: 'EQ', value: query.domain }
            }
            const filterGroup = { filters: [filter] }
            const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
            const properties = ['siret', 'domain', 'name']
            const limit = 1
            const after = 0

            const publicObjectSearchRequest = {
                filterGroups: [filterGroup],
                sorts: [sort],
                properties,
                limit,
                after,
            }
            const ret = await client.crm.companies.searchApi.doSearch(publicObjectSearchRequest)
            console.log(JSON.stringify(ret.body, null, 4))
            await model.sendRequest({
                name: 'Search Entreprise ' + (query.siret || query.domain) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(ret.body.results)
            })
            resolve(ret.body)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Search Entreprise ' + (query.siret || query.domain) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
        }
        resolve()
    })

    model.createEntreprise = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.create({
                properties: {
                    name: body['RAISON SOCIALE'],
                    nom_de_l_enseigne: body['ENSEIGNE'],
                    civilit_: body['Civilité'],
                    nom_g_rant: body['Nom et Prénom du gérant'],
                    nom: body['Nom et Prénom du gérant'],
                    prenom: body['Nom et Prénom du gérant'],
                    siret: body['SIRET'],
                    secteur_d_activit_: body['Activité'],
                    forme_juridique_: body['Forme juridique'],
                    // e_mail: body['Work Email'],
                    num_ro_de_contact_client: body['Numéro de contact client'],
                    ndi: body['Après - NDI'],
                    nd_faxe: body['Après - Fax'],
                    domain: body.domain,
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                }
            })
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

    model.updateEntreprise = (id, body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.update(id, {
                properties: {
                    name: body['RAISON SOCIALE'],
                    nom_de_l_enseigne: body['ENSEIGNE'],
                    civilit_: body['Civilité'],
                    nom_g_rant: body['Nom et Prénom du gérant'],
                    siret: body['SIRET'],
                    secteur_d_activit_: body['Activité'],
                    forme_juridique_: body['Forme juridique'],
                    // e_mail: body['Work Email'],
                    num_ro_de_contact_client: body['Numéro de contact client'],
                    ndi: body['Après - NDI'],
                    nd_faxe: body['Après - Fax'],
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                }
            })
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

    model.createEntreprise2 = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.create({
                properties: {
                    "name": body["RAISON SOCIALE"],
                    "nom_de_l_enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "secteur_d_activit_": body["Activité"],
                    "forme_juridique_": body["Forme juridique"],
                    // "e_mail": body["Work Email"],
                    "num_ro_de_contact_client": body["Numéro de contact client"],
                    domain: body.domain,
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                    nom: body["Nom"],
                    prenom: body["Prénom"],
                }
            })
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

    model.updateEntreprise2 = (id, body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.update(id, {
                properties: {
                    "name": body["RAISON SOCIALE"],
                    "nom_de_l_enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "secteur_d_activit_": body["Activité"],
                    "forme_juridique_": body["Forme juridique"],
                    // "e_mail": body["Work Email"],
                    "num_ro_de_contact_client": body["Numéro de contact client"],
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                }
            })
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

    model.createEntreprise3 = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.create({
                properties: {
                    "name": body["RAISON SOCIALE"],
                    "nom_de_l_enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "secteur_d_activit_": body["Activité"],
                    "forme_juridique_": body["Forme juridique"],
                    // "e_mail": body["Work Email"],
                    "num_ro_de_contact_client": body["Numéro de contact client"],
                    "ndi": body["Après - NDI"],
                    "nd_faxe": body["Après - Fax"],
                    domain: body.domain,
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                }
            })
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Create Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

    model.updateEntreprise3 = (id, body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.companies.basicApi.update(id, {
                properties: {
                    "name": body["RAISON SOCIALE"],
                    "nom_de_l_enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "secteur_d_activit_": body["Activité"],
                    "forme_juridique_": body["Forme juridique"],
                    // "e_mail": body["Work Email"],
                    "num_ro_de_contact_client": body["Numéro de contact client"],
                    "ndi": body["Après - NDI"],
                    "nd_faxe": body["Après - Fax"],
                    address: body["ADRESSE D'INSTALLATION"],
                    "zip": body["Code Postal"],
                    "city": body["Ville"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm2": body["Apporteur d’affaire"],

                    client_en_portefeuille: body["Client en portefeuille"],
                    e_mail: body["Email"],
                }
            })
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            // console.log(ret)
        } catch (e) {
            await model.sendRequest({
                name: 'Update Entreprise ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'update',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            console.log(e)
        }
        resolve()
    })

}



