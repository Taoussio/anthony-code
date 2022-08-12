
const request = require("request");
const hubspot = require('@hubspot/api-client')
const hubspotAds = require('hubspot')
const hubspotClient = new hubspot.Client({ apiKey: process.env.API_KEY })
const hubspotClient2 = new hubspot.Client({ apiKey: process.env.API_KEY_2 })
const hubspotAdsClient = new hubspotAds({ apiKey: process.env.API_KEY })
const hubspotAdsClient2 = new hubspotAds({ apiKey: process.env.API_KEY_2 })

// IMAGINE WORLD ST
/*
https://app.hubspot.com/contacts/4802297/companies/list/view/all/?query=Imagi
https://app.hubspot.com/property-settings/8314360/properties/restore?type=0-2
*/

const formatAme = (str) => {
    if (!str)
        return str
    const arr = str.split('/')
    if (arr.length === 3) {
        arr.reverse()
        return arr.join('-')
    }
    return str
}

const getProperties = (key) => () => new Promise(resolve => {

    const options = {
        method: 'GET',
        url: 'https://api.hubapi.com/properties/v1/companies/properties',
        qs: { hapikey: key }
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const properties = JSON.parse(body)
        resolve([properties, properties.map(elem => elem.name)])
    });
})

const getProperties1 = getProperties(process.env.API_KEY)
const getProperties2 = getProperties(process.env.API_KEY_2)

const getMax = () => {
    return new Promise(async (resolve) => {

        let total = 0

        const next = async (after = 0) => {
            const results = await hubspotClient.crm.companies.basicApi.getPage(100, after)
            total += results.body.results.length
            console.log({ total })
            // console.log(JSON.stringify(results, null, 4))
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after)
        }
        await next()
        // process.exit(0)
        resolve(total)
    })
}

const sendError = (domain, error) => new Promise(resolve => {
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

const only = [
    "mmemarieterrillon.com",
    "monsieurlaurentthiriot.com",
    "madameclaireponcelin.com",
    "communedemorsains.com",
    "marieaudemougenot.com",
    "monsieuryoannnicole.com",
    "monsieurpatrickdonofrio.com",
    "monsieurphilippemaitredhotel.com",
    "monsieurjeromedaumail.com",
    "monsieurgabinmageot.com",
    "monsieurericgay.com",
    "monsieurhervevalantin.com",
    "communedelironcourtcollectededechets.com",
    "estcanalisationenvironnement.com",
    "bpchauffagesanitaire.com",
    "monsieurkevinpouchain.com",
    "madameannemariedagelinckx.com",
    "monsieurflorentpicart.com",
    "monsieurlaurentperrotsiege.com",
    "sugg.com",
    "monsieurjeanmichelclement.com",
    "madamemaudsahed.com",
    "monsieuralainsirot.com",
    "monsieurregisdemimuid.com",
    "monsieurkevinmezenen.com",
    "monsieurchristophebohain.com",
    "azizsahinravalement2.com",
    "monsieuremmanuelcarpentier.com",
    "didep.com",
    "sarlhausswirth.com",
    "communedesaintmarceaudistributiondeau.com",
    "monsieurnicolasburg.com",
    "monsieurlouishacquard.com",
    "monsieurfrancoismeyer.com",
    "monsieurchristophebarthelemy.com",
    "madamenathaliedutertre.com",
    "monsieurfredericszyperski.com",
    "infinicoiffure.com",
    "monsieurdamienbridel.com",
    "monsieuranthonymangeon.com",
    "communedecharencyvezinecolematernelle.com",
    "communedesaintjuliencollectededechets.com",
    "madamehuguettehubiche.com",
    "communedeleintrey.com",
    "communedesionnedistributiondeau.com",
    "monsieurjacquesguenego.com",
    "monsieurjeanguise.com",
    "monsieurstefanedodeux.com",
    "monsieuralbanaltermatt.com",
    "cabinetdocteurjeanlouishaeusser.com",
    "monsieurremymagnus.com",
    "passionimmo.com",
    "monsieurmichaelthanacody.com",
    "monsieurericmatt.com",
    "cordonnerieindustriellerohan.com",
    "monsieurphilippemertz.com",
    "madameclaudinewinstein.com",
    "madamesylvianesellier.com",
    "mmyrielroger.com",
    "sarldarquenergypereetfils.com",
    "agencel.architecte.com",
    "madamelaetitialaheurte.com",
    "monsieurdanielrungette.com",
    "EARLDESACEY.COM",
    "monsieurchristianwasser.com",
]

const main = async () => {

    try {
        // const [properties, names] = await getProperties1()
        // const [properties2, names2] = await getProperties2()

        // console.log(JSON.stringify(properties.filter(elem => elem.name === 'date_de_signature' || elem.name === 'date_de_validation' || elem.name === 'secteur_d_activite_'), null, 4))
        // console.log(JSON.stringify(properties2.filter(elem => elem.name === 'date_de_signature' || elem.name === 'date_de_validation'), null, 4))


        const mapping = {
            "a_r_pondu": "a_repondu",
            "abonnement_partie_fixe": "abonnement_partie_fixe",
            "annualrevenue": "annualrevenue",
            // "apporteur_d_affaire": "apporteur_d_affaires",
            // "apporteur_d_affaire_en_cours": "apporteur_d_affaires_en_cours",
            // "num_associated_contacts": "num_associated_contacts",
            // "num_associated_deals": "num_associated_deals",
            "city": "city",
            "civilit_": "civilite",
            "client_en_portefeuille": "client_en_portefeuille",
            "fibre_client": "client_fibre",
            "closedate": "closedate",
            "commentaire_retour_rdv": "commentaire_retour_rdv",
            "domain": "domain",
            // "hubspot_owner_id": "hubspot_owner_id",
            "contact_": "contacte",
            "country": "country",
            "createdate": "createdate",
            "data": "data",
            "date_de_cl_ture_de_la_tache": "date_de_cloture_de_la_tache",
            "date_de_cr_ation_immatriculation_de_la_soci_t_": "date_de_creation_immatriculation_de_la_societe",
            "date_de_fin_d_engagement_materiel_s_": "date_de_fin_d_engagement_materiel_s_",
            "engagement": "date_de_fin_d_engagement_partie_fixe",
            "date_de_fin_d_engagement_mobile": "date_de_fin_d_engagement_partie_mobile",
            "date_de_la_derni_re_mise_jour_des_offres": "date_de_la_derniere_mise_a_jour_des_offres",
            "date_de_prise_du_rdv": "date_de_prise_du_rdv",
            "date_de_signature": "date_de_signature",
            "date_de_validation": "date_de_validation",
            "date_d_integration_dans_le_crm": "date_d_integration_dans_le_crm",
            "date_dernier_contact": "date_du_dernier_contact",
            "dernier_test_egi_opo_xdsl": "date_du_dernier_test_egi_opo___connect_xdsl",
            "date_du_dernier_test_egi_fibre": "date_du_dernier_test_egi_fibre",
            "date_rendez_vous": "date_du_rendez_vous",
            // "days_to_close": "days_to_close",
            "d_partement": "departement",
            "description": "description",
            "detail_retour_du_rdv": "detail_retour_du_rdv",
            "d_tails": "details",
            "d_tails_de_l_appel": "details_de_l_appel",
            "di_prevue": "di_prevue",
            "egi_connect_xdsl": "egi_connect_xdsl",
            // "egi_opo_18mmax": "egi_opo_18mmax",
            // "egi_opo": "egi_opo_8mmax",
            "egi_opo_xdsl": "egi_opo_xdsl",
            "egi_opo_xdsl_v2": "egi_opo_xdsl_v2",
            "fibre": "egi_fibre",
            "e_mail": "e_mail",
            "facturation_abo_partie_fixe": "facturation_abo_partie_fixe",
            "facturation_abo_partie_mobile": "facturation_abo_partie_mobile",
            "facturation_moyenne_partie_fixe_mois_": "facturation_moyenne_partie_fixe_____mois_",
            "facturation_moyenne_partie_mobile_mois_": "facturation_moyenne_partie_mobile____mois_",
            // "first_contact_createdate": "first_contact_createdate",
            // "first_deal_created_date": "first_deal_created_date",
            "forme_juridique": "forme_juridique",
            "gps": "gps",
            // "hubspot_team_id": "hubspot_team_id",
            "is_public": "is_public",
            // "notes_last_updated": "notes_last_updated",
            // "notes_last_contacted": "notes_last_contacted",
            // "hs_last_sales_activity_timestamp": "hs_last_sales_activity_timestamp",
            // "hs_last_logged_call_date": "hs_last_logged_call_date",
            // "hs_lastmodifieddate": "hs_lastmodifieddate",
            // "hs_last_open_task_date": "hs_last_open_task_date",
            "hs_lead_status": "hs_lead_status",
            "lifecyclestage": "lifecyclestage",
            "mat_riel_s_en_parc_pabx_": "materiel_s__en_parc___pabx_",
            "engagements_last_meeting_booked_medium": "engagements_last_meeting_booked_medium",
            "motif_du_refus": "motif_du_refus",
            "name": "name",
            "nd_faxe": "nd_fax",
            "nd_support": "nd_support",
            "ndi": "ndi",
            // "notes_next_activity_date": "notes_next_activity_date",
            "nom_de_l_enseigne": "nom_de_l_enseigne",
            "nom_d_entreprise": "nom_d_entreprise",
            "nom_g_rant": "nom_et_prenom_du_gerant",
            "nombre_de_ligne_mobile_en_mig_depuis_obs": "nombre_de_ligne_mobile_en_mig_depuis_obs",
            "nombre_de_prise_de_contact_dm_": "nombre_de_prise_de_contact__dm_",
            "numberofemployees": "numberofemployees",
            // "hs_num_open_deals": "hs_num_open_deals",
            // "num_contacted_notes": "num_contacted_notes",
            "num_ro_de_contact_client": "numero_de_contact_client",
            "num_ro_de_portable": "numero_s__de_portable_s_",
            "hs_createdate": "hs_createdate",
            "offre_d_tenu_partie_fixe": "offre_detenu_partie_fixe",
            "offre_d_tenu_partie_mobile": "offre_detenu_partie_mobile",
            "op_rateur": "operateur_fixe",
            "op_rateur_mobile": "operateur_mobile",
            "option_s_service_s_partie_fixe": "option_s____service_s__partie_fixe",
            // "option_s_service_s_partie_mobile": "option_s____service_s__partie_mobile",
            "outil": "outil",
            // "hubspot_owner_assigneddate": "hubspot_owner_assigneddate",
            // "hs_parent_company_id": "hs_parent_company_id",
            "phone": "phone",
            "portefeuille": "portefeuille",
            "zip": "zip",
            // "recent_deal_amount": "recent_deal_amount",
            // "recent_deal_close_date": "recent_deal_close_date",
            "reference": "reference",
            "rendez_vous": "rendez_vous_pris",
            "secteur_d_activit_": "secteur_d_activite",
            "secteur_d_activite": "secteur_d_activite_",
            "siret": "siret",
            "site_web_orange": "site_web",
            "state": "state",
            "statut___tache": "statut___tache",
            "statut_de_la_tache": "statut_de_la_tache",
            "statut_du_portefeuille": "statut_du_portefeuille",
            "address": "address",
            "address2": "address2",
            "timezone": "timezone",
            "total_money_raised": "total_money_raised",
            // "hs_total_deal_value": "hs_total_deal_value",
            // "total_revenue": "total_revenue",
            "type": "type",
            "type_d_offre": "type_d_offre_detenu",
            "url_du_site_web": "url_du_site_web",
            "utilisation_partie_fixe": "utilisation_partie_fixe",
            "utilisation_partie_mobile": "utilisation_partie_mobile",
            "vo": "vo",
            "wb": "wb",
            "web_technologies": "web_technologies",
            "website": "website",
            "founded_year": "founded_year"
        }

        // console.log(JSON.stringify(names2, null, 4))

        // process.exit(0)

        const max = "none" //await getMax()

        const startA = Date.now()

        const next = () => new Promise(async (resolve) => {
            const filter = { propertyName: 'domain', operator: 'EQ', value: 'beiconcept.com' }
            const filterGroup = { filters: [filter] }
            const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
            const properties = ['createdate', 'firstname', 'lastname', "statut___tache", "statut_de_la_tache", "domain"]
            const limit = 1
            const after = 0

            const publicObjectSearchRequest = {
                filterGroups: [filterGroup],
                sorts: [sort],
                properties,
                limit,
                after,
            }

            // delete results.body.results[J].properties["createdate"]
            // delete results.body.results[J].properties["hs_object_id"]
            // delete results.body.results[J].properties["hs_lastmodifieddate"]

            // const body = {}

            // for (let key in mapping) {
            //     body[mapping[key]] = results.body.results[J].properties[key]
            // }

            // // console.log("->", body.type_d_offre_detenu)
            // if (body.type_d_offre_detenu == "Mono-ligne;SITE WEB") {
            //     body.type_d_offre_detenu = "Mono-ligne"
            // }
            // if (body.type_d_offre_detenu == "SITE WEB;Mono-ligne") {
            //     body.type_d_offre_detenu = "Mono-ligne"
            // }
            // if (body.type_d_offre_detenu == "SITE WEB") {
            //     body.type_d_offre_detenu = "E-commerce / Site vitrine"
            // }
            // // console.log("<-", body.type_d_offre_detenu)

            // if (body.date_du_dernier_test_egi_opo___connect_xdsl === 'OUI')
            //     delete body.date_du_dernier_test_egi_opo___connect_xdsl

            // body.date_de_signature = formatAme(body.date_de_signature)
            // if (body.date_de_fin_d_engagement_partie_fixe &&
            //     (
            //         body.date_de_fin_d_engagement_partie_fixe.split(' ').join('').toLowerCase() === "6m" ||
            //         body.date_de_fin_d_engagement_partie_fixe.split(' ').join('').toLowerCase() === "12m" ||
            //         body.date_de_fin_d_engagement_partie_fixe.split(' ').join('').toLowerCase() === "24m"
            //     )
            // )
            //     delete body.date_de_fin_d_engagement_partie_fixe

            const search = await hubspotClient.crm.companies.searchApi.doSearch(publicObjectSearchRequest)
            console.log(search.body.results)
            // try {
            //     if (search.body.total > 0) {
            //         const ret = await hubspotClient2.crm.companies.basicApi.update(search.body.results[0].id, { properties: body })
            //     } else {
            //         const ret = await hubspotClient2.crm.companies.basicApi.create({ properties: body })
            //     }
            //     break
            // } catch (e) {
            //     console.log(e)
            // }
            resolve()
        })
        await next()
        const endA = Date.now()
        console.log(`TIMES: ${Math.floor((endA - startA) / 1000)} s`)
        process.exit(0)
    } catch (e) {
        console.log(e)
    }
}

main()

