
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

const sendError = (rets) => new Promise(resolve => {
    // request.post({
    //     headers: { 'content-type': 'application/json' },
    //     url: `https://hooks.zapier.com/hooks/catch/5757310/boeed8f/`,
    //     body: JSON.stringify({
    //         msgs: JSON.stringify(rets)
    //     })
    // }, (err, httpResponse, body) => {
    //     if (err || httpResponse.statusCode >= 400) {
    //         console.log("err", err)
    //         console.log("statusCode", httpResponse && httpResponse.statusCode ? httpResponse.statusCode : 0)
    //     } else {
    //         console.log(body, JSON.stringify(rets, null, 4))
    //     }
    //     resolve()
    // })
})

const sendRequest = (data) => new Promise(resolve => {
    return resolve()
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


const getProperties1 = getProperties(process.env.API_KEY)
const getProperties2 = getProperties(process.env.API_KEY_2)

const getMax = () => {
    return new Promise(async (resolve) => {

        let total = []

        const next = async (after = 0) => {
            const results = await hubspotClient.crm.deals.basicApi.getPage(100, after, ["dealname"])
            results.body.results.map(elem => elem.properties.dealname).forEach(elem => {
                if (!total.includes(elem))
                    total.push(elem)
            })
            console.log({ total: total.length })
            // console.log(JSON.stringify(results, null, 4))
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after)
        }
        await next()
        // process.exit(0)
        resolve(total.length)
    })
}

const only = [
    'DEL MAT - OOPF',
    'SARL EXOS - BE'
]


const mapping = {
    "abonnement_mobile": "abonnement_mobile",
    "abonnement_partie_fixe": "abonnement_partie_fixe",
    "activite": "activite",
    "adresse_postale": "adresse_de_facturation_si_differente_d_installation_",
    "adresse_de_livraison": "adresse_de_livraison_mobilite",
    "adresse_de_livraison_du_materiel": "adresse_de_livraison_poste_materiel",
    "adresse_dinstallation": "adresse_d_installation",
    "adresse_du_site_du_rendez_vous": "adresse_du_site_du_rendez_vous",
    "alarme": "alarme",
    "amount": "amount",
    // "amount_in_home_currency": "amount_in_home_currency",
    "annulation_commerciale": "annulation_commerciale",
    "annulation_technique": "annulation_technique",
    // "importeur_d_affaire": "apporteur_d_affaire",
    "as_tu_bien_pens_a_mettre_jour_le_d_tail_des_pi_ces_manquantes_dans_le_deal_description_": "as_tu_bien_pense_a_mettre_a_jour_le_detail_des_pieces_manquantes_dans_le__deal_description___",
    "as_tu_bien_pens_remplir_le_d_tail_du_blocage_dans_deal_description_": "as_tu_bien_pense_a_remplir_le_detail_du_blocage_dans__deal_description___",
    "as_tu_pense_a_indique_la_date_d_ouverture_commercial_fibre_dans_le_deal_description_": "as_tu_pense_a__indique_la_date_d_ouverture_commercial_fibre_dans_le__deal_description___",
    "as_tu_pens_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise_": "as_tu_pense_a_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise__",
    "as_tu_pense_a_d_placer_la_com_c_de_reprise_du_rem_du_mois_en_cours_reprise_de_rem_": "as_tu_pense_a_deplacer_la__com_c__de__reprise_du_rem_du_mois_en_cours__a__reprise_de_rem___",
    "as_tu_pense_a_effacer_la_date_de_fermeture_ci_dessous_": "as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessous__",
    "as_tu_pens_a_supprimer_la_date_de_fermeture_ci_dessus_": "as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessus__",
    "as_tu_pense_a_effacer_la_date_de_fermeture_ci_dessus_": "as_tu_pense_a_effacer_la_date_de_fermeture_ci_dessus__",
    "as_tu_pense_a_indique_la_date_de_l_ouverture_commerciale_fibre_": "as_tu_pense_a_indique_la_date_de_l_ouverture_commerciale_fibre__",
    "as_tu_pense_a_indiquer_les_d_tail_du_blocage_ou_des_pi_ces_manquantes_dans_le_deal_description_": "as_tu_pense_a_indiquer_les_details_du_blocage_ou_des_pieces_manquantes_dans_le_deal_description__",
    "as_tu_pense_a_mettre_a_maj_le_deal_description_d_tail_tape_tude_financi_re_": "as_tu_pense_a_maj_le_deal_description__detail_etape_etude_financiere____",
    "as_tu_pens_a_mettre_a_jour_op_rateur_partie_fixe_op_rateur_partie_mobile_": "as_tu_pense_a_mettre_a_jour___operateur_partie_fixe_____operateur_partie_mobile___",
    "as_tu_pens_a_mettre_a_jour_offre_d_tenue_partie_fixe_offre_d_tenue_partie_mobile_": "as_tu_pense_a_mettre_a_jour__offre_detenue_partie_fixe____offre_detenue_partie_mobile___",
    "as_tu_pense_a_mettre_a_jour_le_type_de_l_offre_detenue_l_offre_detenue_partie_fixe_et_partie_mobile": "as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise__le__type_de_l_offre_detenue____",
    "as_tu_pense_a_mettre_a_jour_la_date_de_fin_d_engagement_pour_la_partie_fixe_la_partie_mobile_": "as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_la_date_de_fin_d_engagement_pour_la_partie_fix",
    "as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_la_facturation_abo_partie_fixe_partie_mobile_": "as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_la_facturation_abo__partie_fixe___partie_mobil",
    "as_tu_pense_a_reporter_le_nd_support_fibre_sur_la_fiche_entreprise_": "as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_le_nd_support_fibre___le_ndi__",
    "as_tu_pense_a_mettre_a_jour_le_propriete_client_fibre_sur_la_fiche_entreprise_": "as_tu_pense_a_mettre_a_jour_le_propriete__client_fibre__sur_la_fiche_entreprise__",
    "as_tu_pens_a_mettre_a_jour_la_det_d_engagement_de_la_fiche_entreprise": "as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise",
    "as_tu_pens_a_mettre_jour_l_offre_du_client_": "as_tu_pense_a_mettre_a_jour_l_offre_du_client__",
    "as_tu_pens_en_passer_en_payable_la_rem_com_aa_": "as_tu_pense_a_passer_en_payable_la_rem___com_apporteur__",
    "as_tu_pens_a_supprimer_la_com_a_sauf_pour_les_pay_s_": "as_tu_pense_a_supprimer_la_com_a___sauf_pour_les_payes____",
    "as_tu_pens_a_bien_indiquer_la_nouvelle_date_de_la_validation_dans_deal_description_": "as_tu_pense_a_supprimer_l_ancienne_date_de_validation__",
    "as_tu_bien_indique_que_si_le_client_est_deja_orange_et_que_l_acces_adsl_ou_fibre_est_deja_construit": "attention____pour_les_commandes_multi_lignes__opo___cpf___si_le_client_est_deja_orange_et_que_l_acc",
    "as_tu_pense_bien_indiquer_la_date_et_le_d_tail_de_la_demande_de_d_rogation_dans_le_deal_description": "attention___il_faut_imperativement_indiquer_la_date_d_envoi__de_la_demande_de_derogation_dans_le_de",
    "attention_il_faut_imperativement_verifier_si_le_formulaire_de_cas_derogatoire_soit_bien_rempli_si_o": "attention___il_faut_imperativement_verifier_que_le_formulaire_de_cas_derogatoire_soit_bien_rempli_p",
    "as_tu_pense_que_si_com_c_est_en_reprise_de_rem_du_mois_en_cours_il_faut_la_repasser_en_paye_": "attention___si__com_c__est_en___reprise_de_rem_du_mois_en_cours___il_faut_la_repasser_la_com_ca_en_",
    "attention_si_com_c_est_en_payable_sur_arbitrage_il_faut_la_supprimer_et_laisser_la_com_c_vide_": "attention___si__com_c__est_en__payable_sur_arbitrage__il_faut_la_supprimer_et_laisser_la__com_c__vi",
    "si_com_c_est_en_paye_il_faut_la_repasser_en_reprise_de_rem_du_mois_en_cours_": "attention___si__com_c__est_en__paye_ou_paye_sur_arbitrage___il_faut_la_repasser_en__reprise_de_rem_",
    "attention_si_la_com_c_est_en_payable_sur_arbitrage_il_ne_faut_pas_oublier_de_la_passer_en_payable_": "attention___si_la__com_c__est_en__payable_sur_arbitrage__il_ne_faut_pas_oublier_de_la_passer_en__pa",
    "attention_si_la_commande_est_a_revalider_il_ne_faut_pas_oublier_de_remettre_a_jour_le_statut_partie": "attention___si_la_commande_est_a_revalider__il_ne_faut_pas_oublier_de_remettre_a_jour_le___statut_p",
    "attention_si_la_commande_etait_integre_dans_les_echanges_il_faut_bien_penser_a_mettre_a_jour_les_pr": "attention___si_la_commande_etait_integre_dans_les_echanges__il_faut_bien_penser_a_mettre_a_jour_les",
    "attention_si_il_s_agit_d_une_liasse_ou_l_etude_financiere_est_ok_et_que_la_liasse_passe_en_cours_de": "attention___si_la_liasse_passe_de__en_cours_d_etude_financiere__a___en_cours_de_livraison__il_faut_",
    "cas_derogatoire": "cas_derogatoire",
    "civilit_": "civilite",
    "client_en_portefeuille": "client_en_portefeuille",
    "client_fibre": "client_fibre",
    "closedate": "closedate",
    "closed_lost_reason": "closed_lost_reason",
    "closed_won_reason": "closed_won_reason",
    "code_aa": "code_aa",
    "code_postal": "code_postal",
    "com_agence": "com_a",
    "com_aa": "com_aa",
    "com_c": "com_c",
    "commentaire": "commentaire",
    "commentaire_retour_rdv": "commentaire_retour_rdv",
    "commentaires_des_echanges_a_traiter": "commentaires_des_echanges_a_traiter_a_jour",
    "createdate": "createdate",
    "dat_du_rendez_vous_fr": "dat_du_rendez_vous_fr",
    "date_d_int_gration_dans_les_changes": "date_integration_dans_les_echanges",
    "date_d_activation_partie_fixe": "date_d_activation_partie_fixe",
    "date_d_activation_partie_mobile": "date_d_activation_partie_mobile",
    "date_d_annulation": "date_annulation",
    "date_de_reprise_de_rem": "date_de_deco_com_c",
    "date_de_fin_d_engagement": "date_de_fin_d_engagement_partie_fixe",
    "date_de_fin_d_engagement_partie_mobile": "date_de_fin_d_engagement_partie_mobile",
    "date_de_paiement_apporteur_d_affaire_": "date_de_paiement_com_aa",
    "date_de_paiement": "date_de_paiement_com_c",
    "date_de_portabilit_": "date_de_portabilite_mobile",
    "date_de_prise_du_rdv": "date_de_prise_du_rdv",
    "date_signature": "date_de_signature",
    "date_validation": "date_de_validation",
    "date_d_envoi_du_contrat": "date_d_envoi_du_contrat",
    "date_installation": "date_d_installation",
    "date_installation_opo": "date_d_installation_a_domicile_xdsl_mono_office_connect_",
    "date_d_ouverture_commerciale_fibre": "date_d_ouverture_commerciale_fibre",
    "date_du_rendez_vous": "date_du_rendez_vous__prospection_",
    "date_rdv_prospection_americain": "date_rdv_prospection_americain",
    "date_activation_service": "date_termine_total",
    "description": "description",
    "hs_object_id": "hs_object_id",
    "dealname": "dealname",
    // "hubspot_owner_id": "hubspot_owner_id",
    "dealstage": "dealstage",
    "dealtype": "dealtype",
    "d_partement": "departement",
    "detail_retour_du_rdv": "detail_retour_du_rdv",
    "motif_d_annulation": "details_d_annulation",
    "dur_e_d_engagement": "duree_d_engagement",
    "egi_connect_adsl": "egi_connect_adsl",
    "egi_fibre": "egi_fibre",
    "e_mail": "email",
    "engagement_materiel": "engagement_materiel",
    "engagement_partie_fixe": "engagement_partie_fixe",
    "engagement_partie_mobile": "engagement_partie_mobile",
    "facturation_du_materiel": "facturation_du_materiel",
    "facturation_partie_fixe": "facturation_partie_fixe",
    "facturation_partie_mobile": "facturation_partie_mobile",
    "fibre": "fibre",
    "forme_juridique": "forme_juridique",
    "heure_du_rdv__prospection_": "heure_du_rdv__prospection_",
    "heure_du_rdv_pour_install_a_domicile_m_e_s_telephonie_": "heure_du_rdv_pour__install_a_domicile___m_e_s_telephonie_",
    "heures_du_rdv_pour_acces_reseau_": "heures_du_rdv_pour__acces_reseau_",
    "d_tails_des_changes": "historique_details_des_echanges",
    // "hubspot_team_id": "hubspot_team_id",
    "indice_qualit_apr_s_vente": "indice_qualite_apres_vente",
    "int_gr_dans_les_changes": "integre_dans_les_echanges",
    // "notes_last_updated": "notes_last_updated",
    // "notes_last_contacted": "notes_last_contacted",
    "materiel": "materiel",
    "montant_com_aa": "montant_com_aa",
    "motif_de_la_cloture": "motif_de_la_cloture",
    "motif_de_la_requalification": "motif_de_la_requalification",
    "nb_collaborateurs": "nb_collaborateurs",
    "nb_postes": "nb_postes",
    "nb_site": "nb_site",
    "num_ro_de_fax": "nd_fax",
    "nd_support": "nd_support",
    "num_tel_": "ndi",
    // "notes_next_activity_date": "notes_next_activity_date",
    "nom_de_l_offre_vendue": "nom_de_l_offre_vendue",
    "nom_pr_nom_du_g_rant": "nom_et_prenom_du_gerant",
    "nombre_de_ligne_s_en_cr_ation": "nombre_de_ligne_mobile_eb_creation",
    "nombre_de_ligne_s_mobiles_en_mig_depuis_obs": "nombre_de_ligne_s_mobiles_en_mig_depuis_obs",
    "nombre_de_ligne_s_mobiles_en_migration_sans_valeur": "nombre_de_ligne_s_mobiles_en_migration_sans_valeur",
    "nombre_de_ligne_s_en_wb": "nombre_de_ligne_mobile_en_wb",
    "nombre_de_lignes_s_mobiles_en_fluidit_e": "nombre_de_ligne_mobile_en_fluidite",
    // "num_associated_contacts": "num_associated_contacts",
    // "num_notes": "num_notes",
    // "num_contacted_notes": "num_contacted_notes",
    "num_ro_de_contact": "numero_du_contact_client",
    "num_ro_de_portable": "numero_de_portable",
    "offre_proposee": "offre_d_arrivee",
    "offre_detenue": "offre_de_depart",
    "op_rateur_fixe": "operateur_fixe",
    "op_rateur_mobile": "operateur_mobile",
    "option_s_service_s_partie_fixe": "option_service_partie_fixe",
    "option_s_service_s_partie_mobile": "option_service_partie_mobile",
    "outil": "outil",
    // "hubspot_owner_assigneddate": "hubspot_owner_assigneddate",
    "partie_fixe": "partie_fixe",
    "partie_mobile": "partie_mobile",
    "piece_jointe_bon_de_commande_transaction_": "piece_jointe_bon_de_commande_transaction_",
    "pi_ces_justificatives": "pieces_justificative",
    // "pipeline": "pipeline",
    "pour_mettre_a_jour_les_proprietes_de_la_fiche_entreprise_ouvre_une_deuxieme_page_avec_la_fiche_entr": "pour_mettre_a_jour_les_proprietes_de_la_fiche_entreprise_correspondant_a_cette_transaction____ouvre",
    "quelle_est_la_nouvelle_date_du_rdv__": "quelle_est_la_nouvelle_date_du_rdv__",
    "raison_d_annulation__prospection_": "raison_d_annulation__prospection_",
    "raison_sociale": "raison_sociale",
    "reference": "reference",
    "schtafel": "schtafel",
    "siret": "siret",
    "engagements_last_meeting_booked_source": "engagements_last_meeting_booked_source",
    "commandes_terminaux": "statut_commande_terminal___terminaux",
    "statut_fixe": "statut_fixe",
    "statut_matereriels_postes_multi_lignes_": "statut_matereriels_postes_multi_lignes_",
    "statut_partie_fixe_acc_s_r_seau_": "statut_partie_fixe_acces_reseau_",
    "statut_partie_fixe_service_mes_t_l_phonie": "statut_partie_fixe_service_m_e_s_telephonie",
    "statut_mobile": "statut_partie_mobile",
    "terminal_command_": "terminaux_commandes",
    "type_de_rdv": "type_de_rdv",
    "type_d_offre": "type_d_offre_vendu",
    "ville": "ville",
    "vo": "vo",
    "win_back": "win_back",

    'contexte_de_vente_partie_fixe': 'contexte_de_vente_partie_fixe',
    'contexte_de_vente_partie_mobile': 'contexte_de_vente_partie_mobile',
    'proprietaire___crm_2': 'proprietaire',
    'apporteur_d_affaires_crm_2': 'apporteurs_d_affaires',
    'client_en_protefeuille': 'client_en_portefeuille_',
    'forme_juridique_': 'forme_juridique_',
    'option_s____service_s__fixe': 'option_s____service_s__fixe',
    'option_s____service_s__mobile': 'option_s____service_s__mobile',
    'com_aa': 'com_aa',
    'nom_de_l_offre_vendue': 'nom_de_l_offre_vendue',
    'date_rdv_acces__reseau': 'date_rdv_acces__reseau',
    'date_rdv_mes_telephonie': 'date_rdv_mes_telephonie',
    'nom_du_gerant': 'nom_du_gerant',
    'prenom_du_gerant': 'prenom_du_gerant',
    'nom_de_l_offre_vendue_' : 'nom_de_l_offre_vendue_'


}

const getEnt = (query) => new Promise(async (resolve) => {
    try {

        let filter
        if (query.dealname) {
            filter = { propertyName: 'dealname', operator: 'EQ', value: query.dealname }
        }
        const filterGroup = { filters: [filter] }
        const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
        const properties = [...Object.keys(mapping), "pipeline"]
        const limit = 1
        const after = 0

        const publicObjectSearchRequest = {
            filterGroups: [filterGroup],
            sorts: [sort],
            properties,
            limit,
            after,
        }
        const ret = await hubspotClient.crm.deals.searchApi.doSearch(publicObjectSearchRequest)
        console.log(JSON.stringify(ret.body, null, 4))
        resolve({ body: ret.body })
    } catch (e) {
        console.log(e)
    }
    resolve()
})

const main = async () => {

    const rets = []

    try {
        // const [properties, names] = await getProperties1()
        // const [properties2, names2] = await getProperties2()

        const max = 0 //await getMax()

        const startA = Date.now()

        const next = async (after = 0, total = 0) => {
            const start = Date.now()
            let results = null
            // while (results === null) {
            // try {
            results = await hubspotClient.crm.deals.basicApi.getPage(100, after, [...Object.keys(mapping), "pipeline"])
            await sendRequest({
                name: 'Search ' + after + ' from CRM 1',
                method: 'getPage',
                project: 'CRM1 - CRM2 - Transaction',
                result: results.body.results.length + ' objects'
            })
            // results = await getEnt({ dealname: 'COMMUNE D HAREVILLE - CPOF' })
            // } catch (e) {
            //     console.log(e)
            // }
            // }

            // console.log(JSON.stringify(results.body, null, 4))
            // process.exit(0)

            // console.log(results.body.results.length)
            // results.body.results = results.body.results.filter(elem => only.includes(elem.properties.dealname))
            // if (results.body.results.length > 0) {
            //     console.log(JSON.stringify(results.body.results, null, 4))
            // }

            let finishMax = 0
            let finish = 0
            for (let j = 0; j < results.body.results.length; j++) {
                // console.log(JSON.stringify(results.body.results[j], null, 4))
                const J = j
                console.log(total + j, '/', results.body.results.length + total, { max })
                finishMax++
                await new Promise(async (resolve) => {
                    try {
                        const filter = { propertyName: 'dealname', operator: 'EQ', value: results.body.results[J].properties['dealname'] }
                        const filterGroup = { filters: [filter] }
                        const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
                        const properties = ['dealname', 'com_a', 'dealstage']
                        const limit = 2
                        const after = 0

                        const publicObjectSearchRequest = {
                            filterGroups: [filterGroup],
                            sorts: [sort],
                            properties,
                            limit,
                            after,
                        }

                        delete results.body.results[J].properties["createdate"]
                        delete results.body.results[J].properties["hs_object_id"]
                        delete results.body.results[J].properties["hs_lastmodifieddate"]

                        const body = {
                            pipeline: results.body.results[J].properties.pipeline
                        }

                        for (let key in mapping) {
                            body[mapping[key]] = results.body.results[J].properties[key]
                        }

                        if (body['as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_le_type_de_l_offre_detenue_'] === "OUI")
                            body.as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_le_type_de_l_offre_detenue_ = "OK"
                        if (body['as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise'] === "OUI")
                            body.as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise = "OK"
                        if (body['as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise'] === "true")
                            body.as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise = "OK"
                        if (body['as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessus__'] === "true")
                            body.as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessus__ = "OK"
                        if (body['as_tu_pense_a_mettre_a_jour_l_offre_du_client__'] === "true")
                            body.as_tu_pense_a_mettre_a_jour_l_offre_du_client__ = "OK"
                        if (body['as_tu_pense_a__indique_la_date_d_ouverture_commercial_fibre_dans_le__deal_description___'] === "OUI")
                            body.as_tu_pense_a__indique_la_date_d_ouverture_commercial_fibre_dans_le__deal_description___ = "OK"
                        if (body['as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_le_type_de_l_offre_detenue_'] === "OUI")
                            body.as_tu_pense_a_mettre_a_jour_dans_la_fiche_entreprise_le_type_de_l_offre_detenue_ = "OK"
                        if (body['as_tu_pense_a_mettre_a_jour___operateur_partie_fixe_____operateur_partie_mobile___'] === "OUI")
                            body.as_tu_pense_a_mettre_a_jour___operateur_partie_fixe_____operateur_partie_mobile___ = "OK"
                        if (body['as_tu_pense_a_maj_le_deal_description__detail_etape_etude_financiere____'] === "OUI")
                            body.as_tu_pense_a_maj_le_deal_description__detail_etape_etude_financiere____ = "OK"

                        if (body['duree_d_engagement'])
                            body['duree_d_engagement'] = parseInt(body['duree_d_engagement']) + ' M'

                        if (body.duree_d_engagement === '48 M')
                            delete body.duree_d_engagement

                        if (body.civilite)
                            body.civilite = body.civilite.toUpperCase()
                        if (body.duree_d_engagement === '12M')
                            body.duree_d_engagement = '12 M'
                        if (body.duree_d_engagement === '24M')
                            body.duree_d_engagement = '24 M'
                        if (body.duree_d_engagement === '36M')
                            body.duree_d_engagement = '36 M'

                        const a = {
                            // '5375037': 'appointmentscheduled',
                            // '1756151': 'qualifiedtobuy',
                            // '555983': 'presentationscheduled',
                            // '6488a91b-61a6-4bec-8abf-61251ff2118e': 'decisionmakerboughtin',
                            // '882358a5-2410-439a-8386-9d810b6275be': 'contractsent',
                            // '548759': 'closedwon',
                            // '532072': 'closedlost',
                            // '9630c892-28f2-4e06-b806-888033546c59': '7323127',
                            // '1329848': '7323128',
                            // '1087852': '7323129',
                            // '548745': '7323130',
                            // '2eaa10f1-406f-4a1b-a08a-d214ca06f007': '7323131',
                            // 'c1cac1d8-4854-4de9-a348-9321617cccb4': '7323132',
                            // 'decisionmakerboughtin': '7323133',
                            // '4689197': '7323134',
                            // '4689198': '7323135',
                            // 'b0cbf5d-bf5d-48bd-b5ae-5546ace16697': '7323136',
                            // '589950': '7323137',
                            // '670f5447-1744-449c-9fd5-76e7720b7583': '7323138',
                            // 'qualifiedtobuy': '7323139',
                            // '1180832': '7323140',
                            // '520296': '7323141',
                            // 'presentationscheduled': '11179461',
                            // 'df6f9d67-01b0-477d-890c-0794e5b87655': '7323142',
                            // '781e7e3d-8bbf-4222-a031-1e0c8b9e4ba2 ': '7323143',
                            // 'contractsent': '7323144',
                            // 'closedwon': '7323145',
                            // 'e686942b-21ec-4da7-9a82-b44d235fe2dc': '7323146',
                            // '8925b058-abe1-4ae8-b51d-5f97b7ddf983': '7323147',
                            // '9440454': '11170389',
                            // '10385959': '11170390',
                            // '10385960': '11170391',
                            // '10385958': '11170392',
                            // '10429086': '11170393',
                            // '10386721': '11170394',
                            // '9440456': '11170395',
                            // '9440455': '11170425',
                            // '9440457': '11170426',
                            // 'cb0cbf5d-bf5d-48bd-b5ae-5546ace16697': '7323136',


                            '1756151': 'qualifiedtobuy',
                            '555983': 'presentationscheduled',
                            '882358a5-2410-439a-8386-9d810b6275be': 'contractsent',
                            '548759': 'closedwon',
                            '9630c892-28f2-4e06-b806-888033546c59': '7323127',
                            '1329848': '7323128',
                            '532072': 'closedlost',
                            '1087852': '7323129',
                            '548745': '7323130',
                            '2eaa10f1-406f-4a1b-a08a-d214ca06f007': '7323131',
                            '548745': '16671041',
                            '16644205': '16671041',
                            '589950': '7323137',
                            'decisionmakerboughtin': '7323133',
                            '4689197': '7323134',
                            '4689198': '7323135',
                            'cb0cbf5d-bf5d-48bd-b5ae-5546ace16697': '7323136',
                            '670f5447-1744-449c-9fd5-76e7720b7583': '7323138',
                            'qualifiedtobuy': '7323139',
                            '1180832': '7323140',
                            '520296': '7323141',
                            'presentationscheduled': '11179461',
                            'df6f9d67-01b0-477d-890c-0794e5b87655': '7323142',
                            '781e7e3d-8bbf-4222-a031-1e0c8b9e4ba2': '7323143',
                            '12726524': '16583086',
                            'contractsent': '7323144',
                            'closedwon': '7323145',
                            'e686942b-21ec-4da7-9a82-b44d235fe2dc': '7323146',
                            '8925b058-abe1-4ae8-b51d-5f97b7ddf983': '7323147',

                            '10385959': '11170390',
                            '10385960': '11170391',
                            '10386721': '11170394',
                            '13757548': '16585894',
                            '14203845': '16585926',
                            '11420776': '2931123',
                            '2933365': '11170395',
                            '13949453': '16585949',
                            '13949454': '16586171',
                            '14493127': '16586273',
                            '14493138': '11170392',
                            '13208097': '16586274',
                            '13949455': '16586279',
                        }

                        // 


                        console.log('-> dealstage', body.dealstage)
                        body.dealstage = a[body.dealstage]
                        console.log('<- dealstage', body.dealstage)

                        console.log('pipeline', body.pipeline)

                        if (body.pipeline !== 'default')
                            return resolve()

                        if (body.pipeline === '9440453') 
                            body.pipeline = '11170388'

                        if (body.as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise === 'NON')
                            delete body.as_tu_pense_a_mettre_a_jour_les_dates_de_fin_d_engagement_de_la_fiche_entreprise

                        if (body.as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessus__ == 'false')
                            delete body.as_tu_pense_a_effacer_la___date_de_fermeture__ci_dessus__

                        if (body.attention___si__com_c__est_en___reprise_de_rem_du_mois_en_cours___il_faut_la_repasser_la_com_ca_en_ === 'OUI')
                            body.attention___si__com_c__est_en___reprise_de_rem_du_mois_en_cours___il_faut_la_repasser_la_com_ca_en_ = 'OK'

                        if (body.as_tu_pense_a_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise___ === 'OUI')
                            body.as_tu_pense_a_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise___ = 'OK'
                        if (body.as_tu_pense_a_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise__ === 'OUI')
                            body.as_tu_pense_a_bien_mettre_a_jour_le_nd_support_sur_la_fiche_entreprise__ = 'OK'

                        if (body.schtafel === 'SANS VALEUR' || body.schtafel === 'RECLA REM')
                            delete body.schtafel

                        // while (true) {
                        // try {
                        const search = await hubspotClient2.crm.deals.searchApi.doSearch(publicObjectSearchRequest)
                        await sendRequest({
                            name: 'Get one ' + results.body.results[J].properties['dealname'] + ' from CRM 2',
                            method: 'doSearch',
                            project: 'CRM1 - CRM2 - Transaction',
                            result: JSON.stringify(search.body.results)
                        })

                        // console.log(JSON.stringify(search.body))

                        if (search.body.results.length > 1) {
                            console.log('###>', results.body.results[J].properties['dealname'])
                        } else {

                            if (search.body.total > 0) {
                                if (search.body.results[0].properties["com_a"] !== null) {
                                    delete body.com_a
                                }
                                const ret = await hubspotClient2.crm.deals.basicApi.update(search.body.results[0].id, { properties: body })
                                await sendRequest({
                                    name: 'Update ' + results.body.results[J].properties['dealname'],
                                    method: 'update',
                                    project: 'CRM1 - CRM2 - Transaction',
                                    result: JSON.stringify(ret)
                                })
                            } else {
                                const ret = await hubspotClient2.crm.deals.basicApi.create({ properties: body })
                                await sendRequest({
                                    name: 'Create ' + results.body.results[J].properties['dealname'],
                                    method: 'create',
                                    project: 'CRM1 - CRM2 - Transaction',
                                    result: JSON.stringify(ret)
                                })
                            }
                            // break
                        }

                        // } catch (e) {
                        //     if (!(e.response && e.response.body && (e.response.body.category === 'RATE_LIMITS' || e.response.body.errorType === 'RATE_LIMITS')))
                        //         throw e
                        // }
                        // }
                    } catch (e) {
                        if (e.response && e.response.body) {
                            // await sendError(results.body.results[J].properties['dealname'], e.response.body)
                            console.log(results.body.results[J].properties['dealname'], e.response.body)
                            // rets.push({ name: results.body.results[J].properties['dealname'], body: e.response.body })
                            await sendRequest({
                                name: 'Error ' + results.body.results[J].properties['dealname'],
                                method: 'create/update',
                                project: 'CRM1 - CRM2 - Transaction',
                                result: JSON.stringify(e.response.body)
                            })
                        }
                        else
                            console.log(e)
                    }
                    resolve()
                }).then(() => {
                    finish++
                })
            }
            const waitFinish = () => new Promise(resolve => {
                const r = () => {
                    console.log("f", finish, '/', finishMax)
                    if (finish === finishMax)
                        return resolve()
                    setTimeout(r, 1000)
                }
                r()
            })
            await waitFinish()
            // process.exit(0)
            const end = Date.now()
            console.log(`${Math.floor((end - start) / 1000)} s`)
            if (results.body.paging && results.body.paging.next)
                await next(results.body.paging.next.after, total + results.body.results.length)
        }
        await next()
        const endA = Date.now()
        console.log(`TIMES: ${Math.floor((endA - startA) / 1000)} s`)
        await sendError(rets)
        process.exit(0)
    } catch (e) {
        console.log(e)
    }
}

main()

const main2 = () => {
    const r = async () => {
        const d = new Date()
        if (d.getHours() === 18 && d.getMinutes() === 0) { // 20:00
            console.log(`Go ! ${d.getHours()} : ${d.getMinutes()}`)
            main()
        } else {
            console.log(`Wait ! ${d.getHours()} : ${d.getMinutes()}`)
        }
        setTimeout(r, 60 * 1000)
    }
    r()
}

// main2()
