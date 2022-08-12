
module.exports = function (client, model) {

    model.getContacts = (query) => new Promise(async (resolve) => {
        try {

            let filter
            if (query.email) {
                filter = { propertyName: 'email', operator: 'EQ', value: query.email }
            }
            const filterGroup = { filters: [filter] }
            const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
            const properties = ['email']
            const limit = 1
            const after = 0

            const publicObjectSearchRequest = {
                filterGroups: [filterGroup],
                sorts: [sort],
                properties,
                limit,
                after,
            }
            const ret = await client.crm.contacts.searchApi.doSearch(publicObjectSearchRequest)
            console.log(JSON.stringify(ret.body, null, 4))
            await model.sendRequest({
                name: 'Search Contact ' + (query.email) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(ret.body.results)
            })
            resolve(ret.body)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Search Contact ' + (query.email) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
        }
        resolve()
    })

    model.createContact = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.contacts.basicApi.create({
                properties: {
                    "company": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilite_": body["Civilité"],
                    "gerant_civilite_nom_et_prenom_": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "email": `delta@${body.domain}`,
                    "bon_email": body["Work Email"],
                    "numero_de_contact_client": body["Numéro de contact client"],
                    "annexe___bureau_": body["Annexe / bureau"],
                    "adresse_d_installation": body["ADRESSE D'INSTALLATION"],
                    "adresse_de_facturation": body["ADRESSE DE FACTURATION"],
                    "avant___ndi": body["Avant - NDI"],
                    "avant___fax": body["Avant - Fax"],
                    "avant___nd": body["Avant - ND"],
                    "avant___open": body["Avant Open"],
                    "avant___lm1": body["Avant - LM1"],
                    "avant___lm2": body["Avant - LM2"],
                    "avant___lm3": body["Avant - LM3"],
                    "avant___lm4": body["Avant - LM4"],
                    "commande": body["Commande"],
                    "apres___ndi": body["Après - NDI"],
                    "apres___nd": body["Après - ND"],
                    "apres___fax": body["Après - Fax"],
                    "apres___open": body["Après Open"],
                    "apres___lm1": body["Après - LM1"],
                    "apres___lm2": body["Après - LM2"],
                    "apres___lm3": body["Après - LM3"],
                    "apres___lm4": body["Après - LM4"],
                    "offre_de_depart": body["Offre de départ"],
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_d_arrivee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "engagement_": body["Engagement"],
                    "nd___support": body["ND SUPPORT"],
                    "commentaire_commande": body["Commentaire Commande"],
                    "date_de_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "bdc": body["BDC"],
                    "id_transaction_aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire": body["Proprietaire"],
                }
            })
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })

    model.createContact2 = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.contacts.basicApi.create({
                properties: {
                    "company": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilite_": body["Civilité"],
                    "gerant_civilite_nom_et_prenom_": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "email": `delta@${body.domain}`,
                    "bon_email": body["Work Email"],
                    "numero_de_contact_client": body["Numéro de contact client"],
                    "adresse_d_installation": body["ADRESSE D'INSTALLATION"],
                    "adresse_de_facturation": body["ADRESSE DE FACTURATION"],
                    "lm1": body["LM1"],
                    "lm2": body["LM2"],
                    "lm3": body["LM3"],
                    "lm4": body["LM4"],
                    "lm5": body["LM5"],
                    "lm6": body["LM6"],
                    "lm7": body["LM7"],
                    "lm8": body["LM8"],
                    "lm9": body["LM9"],
                    "offre_de_depart": body["Offre de départ"],
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_d_arrivee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "tarifs_terminaux_ht": body["Tarifs terminaux HT"],
                    "tarifs_terminaux_remises_ht": body["Tarifs terminaux remisés HT"],
                    "terminaux_vendus": body["Terminaux vendus"],
                    "engagement_": body["Engagement"],
                    "marges_de_manoeuvres": body["Marges de manoeuvres"],
                    "pieces_justificatives_": (body["Pièces-justificatives"] || []).join(';'),
                    "commentaire_commande": body["Commentaire Commande"],
                    "date_de_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "bdc": body["BDC"],
                    "id_transaction_aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire": body["Proprietaire"],
                    "adresse_de_livraison": body["Adresse Livraison Mobilite"],
                }
            })
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })


    model.createContact3 = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.contacts.basicApi.create({
                properties: {
                    "company": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilite_": body["Civilité"],
                    "gerant_civilite_nom_et_prenom_": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "email": `delta@${body.domain}`,
                    "bon_email": body["Work Email"],
                    "numero_de_contact_client": body["Numéro de contact client"],
                    "annexe___bureau_": body["Annexe / bureau"],
                    "adresse_d_installation": body["ADRESSE D'INSTALLATION"],
                    "adresse_de_facturation": body["ADRESSE DE FACTURATION"],
                    "avant___ndi": body["Avant - NDI"],
                    "avant___fax": body["Avant - Fax"],
                    "avant___nd": body["Avant - ND"],
                    "avant___open": body["Avant Open"],
                    "avant___lm1": body["Avant - LM1"],
                    "avant___lm2": body["Avant - LM2"],
                    "avant___lm3": body["Avant - LM3"],
                    "avant___lm4": body["Avant - LM4"],
                    "avant___nombre_d_utilisateurs": body["Avant - Nombre d'utilisateurs"],
                    "avant___nombre_de_sda": body["Avant - Nombre de SDA"],
                    "apres___nombre_de_postes": body["Avant - nombre de poste"],
                    "apres___nombre_de_postes_sans_fils": body["Avant - nombre de postes sans fils"],
                    "apres___nombre_de_postes_filaires": body["Avant - Nombre de poste filaire"],
                    "commande": body["Commande"],
                    "apres___ndi": body["Après - NDI"],
                    "apres___nd": body["Après - ND"],
                    "apres___fax": body["Après - Fax"],
                    "apres___open": body["Après Open"],
                    "apres___lm1": body["Après - LM1"],
                    "apres___lm2": body["Après - LM2"],
                    "apres___lm3": body["Après - LM3"],
                    "apres___lm4": body["Après - LM4"],
                    "apres____nombre_d_utilisateurs": body["Après - Nombre d'utilisateurs"],
                    "apres___nombre_de_sda": body["Après - Nombre de SDA"],
                    "avant___nombre_de_poste": body["Après - nombre de poste"],
                    "avant___nombre_de_postes_sans_fils": body["Après - nombre de postes sans fils"],
                    "avant___nombre_de_poste_filaire": body["Après - Nombre de poste filaire"],
                    "offre_de_depart": (body["Offre de départ"] || []).join(';'),
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_d_arrivee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "engagement_": body["Engagement"],
                    "nd_support": body["ND SUPPORT"],
                    "commentaire_commande": body["Commentaire Commande"],
                    "date_de_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "bdc": body["BDC"],
                    "id_transaction_aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire": body["Proprietaire"],
                }
            })
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Contact ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })
}

