
module.exports = function (client, model) {

    model.getTransactions = (query) => new Promise(async (resolve) => {
        try {

            let filter
            if (query.dealname) {
                filter = { propertyName: 'dealname', operator: 'EQ', value: query.dealname }
            }
            const filterGroup = { filters: [filter] }
            const sort = JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' })
            const properties = ['dealname', 'pi_ces_justificatives']
            const limit = 1
            const after = 0

            const publicObjectSearchRequest = {
                filterGroups: [filterGroup],
                sorts: [sort],
                properties,
                limit,
                after,
            }
            const ret = await client.crm.deals.searchApi.doSearch(publicObjectSearchRequest)
            console.log(JSON.stringify(ret.body, null, 4))
            await model.sendRequest({
                name: 'Search Transaction ' + (query.dealname) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(ret.body.results)
            })
            resolve(ret.body)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Search Transaction ' + (query.dealname) + ' from CRM 1',
                method: 'doSearch',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
        }
        resolve()
    })

    model.createTransaction = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.deals.basicApi.create({
                properties: {
                    "type_de_formulaire": body["Type de formulaire"],
                    "dealname": body.dealname,
                    "nom_de_l_offre_vendue_": body["NOM DE L'OFFRE VENDUE"],
                    "raison_sociale": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_pr_nom_du_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "e_mail": body["Work Email"],
                    "num_ro_de_contact": body["Numéro de contact client"],
                    "adresse_dinstallation": body["ADRESSE D'INSTALLATION"],
                    "adresse_postale": body["ADRESSE DE FACTURATION"],
                    "avant___ndi": body["Avant - NDI"],
                    "avant___nd_fax": body["Avant - Fax"],
                    "avant___nd": body["Avant - ND"],
                    "avant___open": body["Avant Open"],
                    "avant___lm1": body["Avant - LM1"],
                    "avant___lm2": body["Avant - LM2"],
                    "avant___lm3": body["Avant - LM3"],
                    "avant___lm4": body["Avant - LM4"],
                    "commande": body["Commande"],
                    "apres___ndi": body["Après - NDI"],
                    "num_tel_": body["Après - NDI"],
                    "apres___nd": body["Après - ND"],
                    "apres___fax": body["Après - Fax"],
                    "apres___open": body["Après Open"],
                    "apres___lm1": body["Après - LM1"],
                    "apres___lm2": body["Après - LM2"],
                    "apres___lm3": body["Après - LM3"],
                    "apres___lm4": body["Après - LM4"],
                    "offre_de_depart_partie_fixe": (body["OFFRE DE DEPART PARTIE FIXE"] || []).join(';'),
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_proposee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "dur_e_d_engagement": body["Engagement"],
                    "nd_support": body["ND SUPPORT"],
                    "commentaire_feuille_de_prod": body["Commentaire Commande"],
                    "date_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "piece_jointe_bon_de_commande_transaction_": body["BDC"],
                    "pipeline": "default",
                    "dealstage": "555983",
                    "annexe___bureau_": body["Annexe / bureau"],
                    "id_transaction___aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "adresse_de_livraison_du_materiel": body["Adresse de livraison poste"],
                    "type_d_offre": body["Type d’offre vendue"],
                    "tarifs_terminaux_hors_remise__flotte_mobile_": body["Tarifs terminaux HT"],
                    "tarifs_terminaux_remises_ht__flotte_mobile_": body["Tarifs terminaux remisés HT"],
                    "contexte___lm1": body["C.LM1"],
                    "contexte___lm2": body["C.LM2"],
                    "contexte___lm3": body["C.LM3"],
                    "contexte___lm4": body["C.LM4"],
                    "op_rateur_fixe": body["Opérateur Partie Fixe"],
                    "op_rateur_mobile": body["Opérateur Partie Mobile"],
                    "contexte_de_vente_partie_fixe": body["Contexte de vente partie Fixe"],
                    "apporteur_d_affaires_crm_2": body["Apporteur d’affaire"],
                    "option_s____service_s__fixe__depart_": (body["OPTION(S) / SERVICE(S) FIXE (départ)"] || []).join(';'),
                    "option_s____service_s__mobile__depart_": (body["OPTION(S) / SERVICE(S) MOBILE (départ)"] || []).join(';'),
                    "option_s____service_s__fixe": (body["OPTION(S) / SERVICE(S) FIXE (arrivée)"] || []).join(';'),
                    "option_s____service_s__mobile": (body["OPTION(S) / SERVICE(S) MOBILE (arrivée)"] || []).join(';'),

                    client_en_protefeuille: body["Client en portefeuille"],
                    prenom_du_gerant: body["Prénom"],
                    nom_du_gerant: body["Nom"],
                    forme_juridique_: body["Forme Juridique"],
                    code_naf: body["Code NAF"],
                    code_postal: body["Code Postal"],
                    ville: body["Ville"],
                    e_mail: body["Email"],
                    op_rateur_fixe: (body["Opérateur Fixe"] || []).join(';'),
                    op_rateur_mobile: (body["Opérateur Mobile"] || []).join(';'),
                    avant___nd: body["Avant - ND Support"],
                    contexte_de_vente_partie_fixe: body["Contexte de vente partie Fixe"],
                    apres___nd: body["Après - ND Support"],
                    terminal_command_: body["Terminaux vendus"],
                    option_s____service_s__fixe: (body["OPTION(S) / SERVICE(S) FIXE"] || []).join(';'),
                    option_s____service_s__mobile: (body["OPTION(S) / SERVICE(S) MOBILE"] || []).join(';'),
                    contexte___lm1: body["Contexte LM1"],
                    contexte___lm2: body["Contexte LM2"],
                    contexte___lm3: body["Contexte LM3"],
                    contexte___lm4: body["Contexte LM4"],

                    avant___forfait_lm1_: body['Avant Forfait - LM1'],
                    avant___forfait_lm2_: body['Avant Forfait - LM2'],
                    avant___forfait_lm3_: body['Avant Forfait - LM3'],
                    avant___forfait_lm4_: body['Avant Forfait - LM4'],

                    offre_arrivee: body["Offre d'arrivée fixe"],

                    adresse_de_livraison: body["Adresse livraison terminaux"],
                    avant___option_lm1: body["Avant – Option LM1"],
                    avant___option_lm2: body["Avant – Option LM2"],
                    avant___option_lm3: body["Avant – Option LM3"],
                    avant___option_lm4: body["Avant – Option LM4"],

                    apres___forfait_lm1: body['Après Forfait - LM1'],
                    apres___forfait_lm2: body['Après Forfait - LM2'],
                    apres___forfait_lm3: body['Après Forfait - LM3'],
                    apres___forfait_lm4: body['Après Forfait - LM4'],

                    apres___option_lm1: (body['Après Option - LM1'] || []).join(';'),
                    apres___option_lm2: (body['Après Option - LM2'] || []).join(';'),
                    apres___option_lm3: (body['Après Option - LM3'] || []).join(';'),
                    apres___option_lm4: (body['Après Option - LM4'] || []).join(';'),
                    
                }
            })
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })

    model.createTransaction2 = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.deals.basicApi.create({
                properties: {
                    "type_de_formulaire": body["Type de formulaire"],
                    "dealname": body.dealname,
                    "nom_de_l_offre_vendue_": body["NOM DE L'OFFRE VENDUE"],
                    "raison_sociale": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_pr_nom_du_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "e_mail": body["Work Email"],
                    "num_ro_de_contact": body["Numéro de contact client"],
                    "adresse_dinstallation": body["ADRESSE D'INSTALLATION"],
                    "adresse_postale": body["ADRESSE DE FACTURATION"],
                    "flotte___lm1": body["LM1"],
                    "flotte___lm2": body["LM2"],
                    "flotte___lm3": body["LM3"],
                    "flotte___lm4": body["LM4"],
                    "flotte___lm5": body["LM5"],
                    "flotte___lm6": body["LM6"],
                    "flotte___lm7": body["LM7"],
                    "flotte___lm8": body["LM8"],
                    "flotte___lm9": body["LM9"],
                    "flotte___lm10": body["LM10"],
                    "flotte___lm11": body["LM11"],
                    "flotte___lm12": body["LM12"],
                    "flotte___lm13": body["LM13"],
                    "flotte___lm14": body["LM14"],
                    "flotte___lm15": body["LM15"],
                    "flotte___lm16": body["LM16"],
                    "flotte___lm17": body["LM17"],
                    "flotte___lm18": body["LM18"],
                    "flotte___lm19": body["LM19"],
                    "flotte___lm20": body["LM20"],
                    "offre_de_depart_partie_fixe": (body["Offre de départ"] || []).join(';'),
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_proposee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "tarifs_terminaux_hors_remise__flotte_mobile_": body["Tarifs terminaux HT"],
                    "tarifs_terminaux_remises_ht__flotte_mobile_": body["Tarifs terminaux remisés HT"],
                    "terminal_command_": body["Terminaux vendus"],
                    "dur_e_d_engagement": body["Engagement"],
                    "marge_de_manoeuvre___mobilite": body["Marges de manoeuvres"],
                    "pi_ces_justificatives": (body["Pièces-justificatives"] || []).join(';'),
                    "commentaire_feuille_de_prod": body["Commentaire Commande"],
                    "date_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "piece_jointe_bon_de_commande_transaction_": body["BDC"],
                    "pipeline": "default",
                    "dealstage": "555983",
                    "annexe___bureau_": body["Annexe / bureau"],
                    "id_transaction___aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "adresse_de_livraison": body["Adresse Livraison Mobilite"],
                    "type_d_offre": body["Type d’offre vendue"],
                    "apporteur_d_affaires_crm_2": body["Apporteur d’affaire"],


                    client_en_protefeuille: body["Client en portefeuille"],
                    prenom_du_gerant: body["Prénom"],
                    nom_du_gerant: body["Nom"],
                    forme_juridique_: body["Forme Juridique"],
                    code_naf: body["Code NAF"],
                    code_postal: body["Code Postal"],
                    ville: body["Ville"],
                    e_mail: body["Email"],
                    op_rateur_fixe: (body["Opérateur Fixe"] || []).join(';'),
                    op_rateur_mobile: (body["Opérateur Mobile"] || []).join(';'),
                    avant___nd: body["Avant - ND Support"],
                    contexte_de_vente_partie_fixe: body["Contexte de vente partie Fixe"],
                    apres___nd: body["Après - ND Support"],
                    terminal_command_: body["Terminaux vendus"],
                    option_s____service_s__fixe: (body["OPTION(S) / SERVICE(S) FIXE"] || []).join(';'),
                    option_s____service_s__mobile: (body["OPTION(S) / SERVICE(S) MOBILE"] || []).join(';'),
                    contexte___lm1: body["C.LM1"],
                    contexte___lm2: body["C.LM2"],
                    contexte___lm3: body["C.LM3"],
                    contexte___lm4: body["C.LM4"],
                    contexte___lm5: body["C.LM5"],
                    contexte___lm6: body["C.LM6"],
                    contexte___lm7: body["C.LM7"],
                    contexte___lm8: body["C.LM8"],
                    contexte___lm9: body["C.LM9"],
                    contexte___lm10: body["C.LM10"],
                    contexte___lm11: body["C.LM11"],
                    contexte___lm12: body["C.LM12"],
                    contexte___lm13: body["C.LM13"],
                    contexte___lm14: body["C.LM14"],
                    contexte___lm15: body["C.LM15"],
                    contexte___lm16: body["C.LM16"],
                    contexte___lm17: body["C.LM17"],
                    contexte___lm18: body["C.LM18"],
                    contexte___lm19: body["C.LM19"],
                    contexte___lm20: body["C.LM20"],

                    avant___forfait_lm1_: body['Avant Forfait LM1'],
                    avant___forfait_lm2_: body['Avant Forfait LM2'],
                    avant___forfait_lm3_: body['Avant Forfait LM3'],
                    avant___forfait_lm4_: body['Avant Forfait LM4'],
                    avant___forfait_lm5: body['Avant Forfait LM5'],
                    avant___forfait_lm6: body['Avant Forfait LM6'],
                    avant___forfait_lm7: body['Avant Forfait LM7'],
                    avant___forfait_lm8: body['Avant Forfait LM8'],
                    avant___forfait_lm9: body['Avant Forfait LM9'],
                    avant___forfait_lm10: body['Avant Forfait LM10'],
                    avant___forfait_lm11: body['Avant Forfait LM11'],
                    avant___forfait_lm12: body['Avant Forfait LM12'],
                    avant___forfait_lm13: body['Avant Forfait LM13'],
                    avant___forfait_lm14: body['Avant Forfait LM14'],
                    avant___forfait_lm15: body['Avant Forfait LM15'],
                    avant___forfait_lm16: body['Avant Forfait LM16'],
                    avant___forfait_lm17: body['Avant Forfait LM17'],
                    avant___forfait_lm18: body['Avant Forfait LM18'],
                    avant___forfait_lm19: body['Avant Forfait LM19'],
                    avant___forfait_lm20: body['Avant Forfait LM20'],

                    rio___lm1: body['RIO - LM1'],
                    rio___lm2: body['RIO - LM2'],
                    rio___lm3: body['RIO - LM3'],
                    rio___lm4: body['RIO - LM4'],
                    rio___lm5: body['RIO - LM5'],
                    rio___lm6: body['RIO - LM6'],
                    rio___lm7: body['RIO - LM7'],
                    rio___lm8: body['RIO - LM8'],
                    rio___lm9: body['RIO - LM9'],
                    rio___lm10: body['RIO - LM10'],
                    rio___lm11: body['RIO - LM11'],
                    rio___lm12: body['RIO - LM12'],
                    rio___lm13: body['RIO - LM13'],
                    rio___lm14: body['RIO - LM14'],
                    rio___lm15: body['RIO - LM15'],
                    rio___lm16: body['RIO - LM16'],
                    rio___lm17: body['RIO - LM17'],
                    rio___lm18: body['RIO - LM18'],
                    rio___lm19: body['RIO - LM19'],
                    rio___lm20: body['RIO - LM20'],

                    apres___forfait_lm1: body['Après Forfait - LM1'],
                    apres___forfait_lm2: body['Après Forfait - LM2'],
                    apres___forfait_lm3: body['Après Forfait - LM3'],
                    apres___forfait_lm4: body['Après Forfait - LM4'],
                    apres___forfait_lm5: body['Après Forfait - LM5'],
                    apres___forfait_lm6: body['Après Forfait - LM6'],
                    apres___forfait_lm7: body['Après Forfait - LM7'],
                    apres___forfait_lm8: body['Après Forfait - LM8'],
                    apres___forfait_lm9: body['Après Forfait - LM9'],
                    apres___forfait_lm10: body['Après Forfait - LM10'],
                    apres___forfait_lm11: body['Après Forfait - LM11'],
                    apres___forfait_lm12: body['Après Forfait - LM12'],
                    apres___forfait_lm13: body['Après Forfait - LM13'],
                    apres___forfait_lm14: body['Après Forfait - LM14'],
                    apres___forfait_lm15: body['Après Forfait - LM15'],
                    apres___forfait_lm16: body['Après Forfait - LM16'],
                    apres___forfait_lm17: body['Après Forfait - LM17'],
                    apres___forfait_lm18: body['Après Forfait - LM18'],
                    apres___forfait_lm19: body['Après Forfait - LM19'],
                    apres___forfait_lm20: body['Après Forfait - LM20'],

                    apres___option_lm1: (body['Après Option - LM1'] || []).join(';'),
                    apres___option_lm2: (body['Après Option - LM2'] || []).join(';'),
                    apres___option_lm3: (body['Après Option - LM3'] || []).join(';'),
                    apres___option_lm4: (body['Après Option - LM4'] || []).join(';'),
                    apres___option_lm5: (body['Après Option - LM5'] || []).join(';'),
                    apres___option_lm6: (body['Après Option - LM6'] || []).join(';'),
                    apres___option_lm7: (body['Après Option - LM7'] || []).join(';'),
                    apres___option_lm8: (body['Après Option - LM8'] || []).join(';'),
                    apres___option_lm9: (body['Après Option - LM9'] || []).join(';'),
                    apres___option_lm10: (body['Après Option - LM10'] || []).join(';'),
                    apres___option_lm11: (body['Après Option - LM11'] || []).join(';'),
                    apres___option_lm12: (body['Après Option - LM12'] || []).join(';'),
                    apres___option_lm13: (body['Après Option - LM13'] || []).join(';'),
                    apres___option_lm14: (body['Après Option - LM14'] || []).join(';'),
                    apres___option_lm15: (body['Après Option - LM15'] || []).join(';'),
                    apres___option_lm16: (body['Après Option - LM16'] || []).join(';'),
                    apres___option_lm17: (body['Après Option - LM17'] || []).join(';'),
                    apres___option_lm18: (body['Après Option - LM18'] || []).join(';'),
                    apres___option_lm19: (body['Après Option - LM19'] || []).join(';'),
                    apres___option_lm20: (body['Après Option - LM20'] || []).join(';'),


                    offre_arrivee: body["Offre d'arrivée fixe"],

                    adresse_de_livraison: body["Adresse livraison terminaux"],

                }
            })
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })

    model.createTransaction3 = (body) => new Promise(async (resolve) => {

        const ll = {
            A: 'n__de_la_ligne',
            B: 'n_conserve_ou_recupere',
            C: 'rio',
            D: 'intitule',
            E: 'intitule_complementaire',
            F: 'telephone_associe',
            G: 'parution_annuaire',
        }
        try {
            const ret = await client.crm.deals.basicApi.create({
                properties: {
                    "type_de_formulaire": body["Type de formulaire"],
                    "dealname": body.dealname,
                    "nom_de_l_offre_vendue_": body["NOM DE L'OFFRE VENDUE"],
                    "raison_sociale": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_pr_nom_du_g_rant": body["Nom et Prénom du gérant"],
                    "siret": body["SIRET"],
                    "activite": body["Activité"],
                    "forme_juridique": body["Forme juridique"],
                    "e_mail": body["Work Email"],
                    "num_ro_de_contact": body["Numéro de contact client"],
                    "adresse_dinstallation": body["ADRESSE D'INSTALLATION"],
                    "adresse_postale": body["ADRESSE DE FACTURATION"],
                    "avant___ndi": body["Avant - NDI"],
                    "avant___nd_fax": body["Avant - Fax"],
                    "avant___nd": body["Avant - ND"],
                    "avant___open": body["Avant Open"],
                    "avant___lm1": body["Avant - LM1"],
                    "avant___lm2": body["Avant - LM2"],
                    "avant___lm3": body["Avant - LM3"],
                    "avant___lm4": body["Avant - LM4"],
                    "avant___nombre_ligne_utilisateur__multiligne_": body["Avant - Nombre d'utilisateurs"],
                    "avant___nombre_de_sda__multiligne_": body["Avant - Nombre de SDA"],
                    "avant___nombre_de_postes__multiligne_": body["Avant - nombre de poste"],
                    "avant___nombre_poste_sans_fil__multiligne_": body["Avant - nombre de postes sans fils"],
                    "avant___nombre_poste_filaire__multiligne_": body["Avant - Nombre de poste filaire"],
                    "commande": body["Commande"],
                    "apres___ndi": body["Après - NDI"],
                    "apres___nd": body["Après - ND"],
                    "apres___fax": body["Après - Fax"],
                    "apres___open": body["Après Open"],
                    "apres___lm1": body["Après - LM1"],
                    "apres___lm2": body["Après - LM2"],
                    "apres___lm3": body["Après - LM3"],
                    "apres___lm4": body["Après - LM4"],
                    "apres___nombre_ligne_utilisateurs__multi_ligne_": body["Après - Nombre d'utilisateurs"],
                    "apres___nombre_sda__multi_ligne_": body["Après - Nombre de SDA"],
                    "apres___nombre_de_poste__multi_ligne_": body["Après - nombre de poste"],
                    "apres___nombre_poste_sans_fil__multi_ligne_": body["Après - nombre de postes sans fils"],
                    "apres___nombre_poste_filaire__multiligne_": body["Après - Nombre de poste filaire"],
                    "offre_de_depart_partie_fixe": (body["Offre de départ"] || []).join(';'),
                    "option_s__de_depart": body["Option(s) de départ"],
                    "offre_proposee": body["Offre d'arrivée"],
                    "option_s__d_arrivee": body["Option(s) d'arrivée"],
                    "tarifs_hors_remise_ht_mois": body["Tarifs hors remise HT/mois"],
                    "tarifs_remises_ht_mois_1ere_annee": body["Tarifs remisés HT/mois 1ère année"],
                    "tarifs_remises_ht_mois_2eme_annee": body["Tarifs remisés HT/mois 2ème année"],
                    "dur_e_d_engagement": body["Engagement"],
                    "nd_support": body["ND SUPPORT"],
                    "commentaire_feuille_de_prod": body["Commentaire Commande"],
                    "date_signature": body["Date de signature"],
                    "code_aa": body["Code AA"],
                    "piece_jointe_bon_de_commande_transaction_": body["BDC"],
                    "pipeline": "default",
                    "dealstage": "555983",
                    "annexe___bureau_": body["Annexe / bureau"],
                    "id_transaction___aa": body["Id de la transaction AA"],
                    "code_postal__installation_": body["Code Postal Installation"],
                    "ville__installation_": body["Ville Installation"],
                    "proprietaire___crm_2": body["Proprietaire"],
                    "adresse_de_livraison_du_materiel": body["ADRESSE DE LIVRAISON POSTE/MATERIEL"],
                    "type_d_offre": body["Type d’offre vendue"],
                    "tarifs_terminaux_hors_remise__flotte_mobile_": body["Tarifs terminaux HT"],
                    "tarifs_terminaux_remises_ht__flotte_mobile_": body["Tarifs terminaux remisés HT"],
                    "contexte___lm1": body["C.LM1"],
                    "contexte___lm2": body["C.LM2"],
                    "contexte___lm3": body["C.LM3"],
                    "contexte___lm4": body["C.LM4"],
                    "op_rateur_fixe": body["Opérateur Partie Fixe"],
                    "op_rateur_mobile": body["Opérateur Partie Mobile"],
                    "contexte_de_vente_partie_fixe": body["Contexte de vente partie Fixe"],
                    "apporteur_d_affaires_crm_2": body["Apporteur d’affaire"],
                    "option_s____service_s__fixe__depart_": (body["OPTION(S) / SERVICE(S) FIXE (départ)"] || []).join(';'),
                    "option_s____service_s__mobile__depart_": (body["OPTION(S) / SERVICE(S) MOBILE (départ)"] || []).join(';'),
                    "option_s____service_s__fixe": (body["OPTION(S) / SERVICE(S) FIXE (arrivée)"] || []).join(';'),
                    "option_s____service_s__mobile": (body["OPTION(S) / SERVICE(S) MOBILE (arrivée)"] || []).join(';'),
                    ...(() => {
                        const obj = {}
                        for (let i in ll) {
                            for (let j = 1; j <= 20; j++) {
                                obj[`l${j}_utilisateur___${ll[i]}`] = body[`${i} L${j}`]
                            }
                        }
                        return obj
                    })(),


                    client_en_protefeuille: body["Client en portefeuille"],
                    prenom_du_gerant: body["Prénom"],
                    nom_du_gerant: body["Nom"],
                    forme_juridique_: body["Forme Juridique"],
                    code_naf: body["Code NAF"],
                    code_postal: body["Code Postal"],
                    ville: body["Ville"],
                    e_mail: body["Email"],
                    op_rateur_fixe: (body["Opérateur Fixe"] || []).join(';'),
                    op_rateur_mobile: (body["Opérateur Mobile"] || []).join(';'),
                    avant___nd: body["Avant - ND Support"],
                    contexte_de_vente_partie_fixe: body["Contexte de vente partie Fixe"],
                    apres___nd: body["Après - ND Support"],
                    terminal_command_: body["Terminaux vendus"],
                    option_s____service_s__fixe: (body["OPTION(S) / SERVICE(S) FIXE"] || []).join(';'),
                    option_s____service_s__mobile: (body["OPTION(S) / SERVICE(S) MOBILE"] || []).join(';'),
                    contexte___lm1: body["Contexte LM1"],
                    contexte___lm2: body["Contexte LM2"],
                    contexte___lm3: body["Contexte LM3"],
                    contexte___lm4: body["Contexte LM4"],

                    avant___forfait_lm1_: body['Avant Forfait - LM1'],
                    avant___forfait_lm2_: body['Avant Forfait - LM2'],
                    avant___forfait_lm3_: body['Avant Forfait - LM3'],
                    avant___forfait_lm4_: body['Avant Forfait - LM4'],

                    avant___nombre_ligne_utilisateur__multiligne_: body['NB UTILISATEURS'],
                    avant___nombre_de_postes__multiligne_: body['NB POSTES'],
                    avant___nombre_poste_sans_fil__multiligne_: body['NB POSTES SANS FIL'],
                    avant___nombre_poste_filaire__multiligne_: body['NB POSTES FILAIRES'],
                    apres___nombre_ligne_utilisateurs__multi_ligne_: body['NB UTILISATEURS.'],
                    apres___nombre_de_poste__multi_ligne_: body['NB POSTES.'],
                    apres___nombre_poste_sans_fil__multi_ligne_: body['NB POSTES SANS FIL.'],
                    apres___nombre_poste_filaire__multiligne_: body['NB POSTES FILAIRES.'],

                    offre_arrivee: body["Offre d'arrivée fixe"],

                    adresse_de_livraison: body["Adresse livraison terminaux"],
                    avant___option_lm1: body["Avant – Option LM1"],
                    avant___option_lm2: body["Avant – Option LM2"],
                    avant___option_lm3: body["Avant – Option LM3"],
                    avant___option_lm4: body["Avant – Option LM4"],

                    apres___forfait_lm1: body['Après Forfait - LM1'],
                    apres___forfait_lm2: body['Après Forfait - LM2'],
                    apres___forfait_lm3: body['Après Forfait - LM3'],
                    apres___forfait_lm4: body['Après Forfait - LM4'],

                    apres___option_lm1: (body['Après Option - LM1'] || []).join(';'),
                    apres___option_lm2: (body['Après Option - LM2'] || []).join(';'),
                    apres___option_lm3: (body['Après Option - LM3'] || []).join(';'),
                    apres___option_lm4: (body['Après Option - LM4'] || []).join(';'),


                }
            })
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })

    model.createTransaction__AA = (body) => new Promise(async (resolve) => {
        try {
            const ret = await client.crm.deals.basicApi.create({
                properties: {
                    "dealname": `RDV - ${body["RAISON SOCIALE"]}`,
                    "proprietaire___crm_2": body["Proprietaire"],
                    "apporteur_d_affaires_crm_2": body["Apporteur d’affaire"],
                    "raison_sociale": body["RAISON SOCIALE"],
                    "enseigne": body["ENSEIGNE"],
                    "civilit_": body["Civilité"],
                    "nom_de_l_offre_vendue_": body["NOM DE L'OFFRE VENDUE"],
                    "num_ro_de_contact": body["Numéro de contact client"],
                    "nom_pr_nom_du_g_rant": body["Nom et Prénom du gérant"],
                    "e_mail": body["Work Email"],
                    "siret": body["SIRET"],
                    "code_aa": body["Code AA"],
                    "pipeline": "9440453",
                    "dealstage": "13949453",
                }
            })
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(ret)
            })
            resolve(ret.body.id)
        } catch (e) {
            console.log(e)
            await model.sendRequest({
                name: 'Create Transaction ' + body['RAISON SOCIALE'] + ' (CRM 1)',
                method: 'create',
                project: 'Formulaire',
                result: JSON.stringify(e.response.body)
            })
            resolve()
        }
    })
}
