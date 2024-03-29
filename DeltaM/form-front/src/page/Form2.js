import React, { Component } from 'react';

import Api from '../api/Api'

import Desktop from '../responsive/Desktop2'
import Mobile from '../responsive/Mobile2'

import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core'

import '../scss/common.scss';
import '../scss/home.scss';


const mandatory = [
  "Proprietaire",
  "Date de signature",
  "RAISON SOCIALE",
  "Annexe / bureau",
  "Client en portefeuille",
  "Forme Juridique",
  "Code NAF",
  "Nom",
  "Prénom",
  "SIRET",
  "Civilité",
  "Email",
  "Numéro de contact client",
  "ADRESSE DE LIVRAISON",
  "Code Postal",
  "Ville",

  "LM1",
  "C.LM1",

  "NOM DE L'OFFRE VENDUE",
  "Type d’offre vendue",
  "Engagement",

  "Apporteur d’affaire"

]

const offre = [
  `PERFORMANCE PRO`,
  `PERFORMANCE ENTREPRISE`,
  `BE`,
  `PCM`,
  `OPTION/SERVICE`,
  'PCM 24 MOIS INITIAL VOIX',
  'PCM 24 MOIS INITIAL',
  'PCM 24 MOIS EQUILIBRE 70 GO',
  'PCM 24 MOIS EQUILIBRE 130 GO',
  'PCM 24 MOIS INTENSE',
  'PCM 24 MOIS INTENSE TRAVELL'
]

const fj = Array.from(new Set([
  "Autre société à responsabilité limitée", "Entrepreneur individuel", "(Autre) Établissement public administratif local", "(Autre) Personne physique", "Artisan", "Artisan-commerçant", "Commerçant", "Commune et commune nouvelle", "Établissement public local d'enseignement", "Association d'avocats à responsabilité professionnelle individuelle", "Autre organisme professionnel", "Autre personne de droit privé inscrite au registre du commerce et des sociétés", "Autre SARL coopérative", "Autre société civile professionnelle", "Autre société civile", "Communauté de communes", "Établissement public local social et médico-social", "Exploitant agricole", "Groupement agricole d'exploitation en commun (GAEC)", "Groupement de coopération sanitaire à gestion privée", "Groupement d'employeurs", "Mutuelle", "Ordre professionnel ou assimilé", "Profession libérale", "SARL coopérative artisanale", "SARL coopérative ouvrière de production (SCOP)", "SARL d'intérêt collectif agricole (SICA)", "SARL d'intérêt collectif agricole (SICA)", "SARL unipersonnelle", "SAS, société par actions simplifiée", "SAS, société par actions simplifiée", "SCP d'avocats", "SCP d'avocats aux conseils", "SCP d'avoués d'appel", "SCP de commissaires-priseurs", "SCP de commissaires-priseurs", "SCP de directeurs de laboratoire d'analyse médicale", "SCP de géomètres experts", "SCP de masseurs-kinésithérapeutes", "SCP de médecins", "SCP de notaires", "SCP de vétérinaires", "SCP d'huissiers", "SCP d'infirmiers", "Société à responsabilité limitée (sans autre indication)", "Société civile de moyens", "Société créée de fait entre personnes physiques", "Société de Participations Financières de Profession Libérale Société à responsabilité limitée (SPFPL SARL)", "Société d'exercice libéral à responsabilité limitée", "Société d'exercice libéral en commandite par actions", "Société d'exercice libéral par action simplifiée", "Société en nom collectif", "Société en participation de professions libérales", "Société en participation entre personnes physiques", "Société par actions simplifiée à associé unique ou société par actions simplifiée unipersonnelle", "Syndicat intercommunal à vocation unique (SIVU)", "Société civile immobilière", "Syndicat intercommunal à vocation multiple (SIVOM)", "Syndicat mixte fermé", "Syndicat de salariés", "Syndicat de copropriété", "Syndicat patronal", "Syndicat mixte ouvert", "Indivision entre personnes physiques", "Indivision avec personne morale", "Société créée de fait avec personne morale", "Paroisse horz zone concordataire", "Autre groupement de droit privé non doté de la personnalité morale", "Représentation ou agence commerciale d'état ou organisme public étranger immatriculé au RCS", "Société commerciale étrangère immatriculée au RCS", "Organisation internationale", "État, collectivité ou établissement public étranger", "Société étrangère non immatriculée au RCS", "Autre personne morale de droit étranger", "Établissement public national à caractère industriel ou commercial doté d'un comptable public", "Établissement public national à caractère industriel ou commercial non doté d'un comptable public", "Établissement public local à caractère industriel ou commercial", "Régie d'une collectivité locale à caractère industriel ou commercial", "Institution Banque de France", "Société de caution mutuelle", "Société coopérative de banque populaire", "Caisse de crédit maritime mutuel", "Caisse (fédérale) de crédit mutuel", "Association coopérative inscrite (droit local Alsace Moselle)", "Caisse d'épargne et de prévoyance à forme coopérative", "Société en commandite simple", "Société en commandite simple coopérative", "Société en commandite par actions", "Société en commandite par actions coopérative", "Société de Paticipations Financières de Profession Libérale Société en commandite par actions (SPFPL SCA)", "SARL d'économie mixte", "SA à participation ouvrière à conseil d'administration", "SA nationale à conseil d'administration", "SA d'économie mixte à conseil d'administration", "Société d'investissement à capital variable (SICAV) à conseil d'administration", "SA immobilière d'investissement à conseil d'administration", "SA immobilière pour le commerce et l'industrie (SICOMI) à conseil d'administration", "SA d'aménagement foncier et d'équipement rural (SAFER) à conseil d'administration", "Société anonyme mixte d'intérêt agricole (SMIA) à conseil d'administration", "SA d'intérêt collectif agricole (SICA) à conseil d'administration", "SA coopérative de construction à conseil d'administration", "SA de HLM à conseil d'administration", "SA coopérative de production de HLM à conseil d'administration", "SA de crédit immobilier à conseil d'administration", "SA coopérative de consommation à conseil d'administration", "SA coopérative de commerçants-détaillants à conseil d'administration", "SA coopérative artisanale à conseil d'administration", "SA coopérative (d'intérêt) maritime à conseil d'administration", "SA coopérative de transport à conseil d'administration", "SA coopérative ouvrière de production (SCOP) à conseil d'administration", "SA union de sociétés coopératives à conseil d'administration", "Autre SA coopérative à conseil d'administration", "Société de Participation Financières de Profession Libérale", "Société d'exercice libéral à forme anonyme à conseil d'administration", "Société d'exercice libéral à forme anonyme à conseil d'administration", "SA à conseil d'administration (s.a.i)", "SA à participation ouvrière à directoire", "SA nationale à directoire", "SA d'économie mixte à directoire", "Société d'investissement à capital variable (SICAV) à directoire", "Safer anonyme à directoire", "SA d'intérêt collectif agricole (SICA)", "SA d'attribution à directoire", "SA de HLM à directoire", "Société coopérative de production de HLM anonyme à directoire", "SA de crédit immobilier à directoire", "SA coopérative de consommation à directoire", "SA coopérative de commerçants-détaillants à directoire", "SA coopérative artisanale à directoire", "SA coopérative d'intérêt maritime à directoire", "SA coopérative de transport à directoire", "SA coopérative ouvrière de production (SCOP) à directoire", "SA union de sociétés coopératives à directoire", "Société de Participations Financières de Profession Libérale Société anonyme à Directoire (SPFPL SA à directoire)", "Société d'exercice libéral à forme anonyme à directoire", "SA à directoire (s.a.i)", "Société de Participations Financières de Profession Libérale Société par actions simplifiées (SPFPL SAS)", "Caisse d'Épargne et de Prévoyance",
  "Société en commandite simple", "Société en commandite simple coopérative", "Société en commandite par actions", "Société en commandite par actions coopérative", "Société de Participations Financières de Profession Libérale Société en commandite par actions", "(SPFPL SCA)", "SARL d'économie mixte", "SA à participation ouvrière à conseil d'administration", "SA nationale à conseil d'administration", "SA d'économie mixte à conseil d'administration", "Société d'investissement à capital variable (SICAV) à conseil d'administration", "SA immobilière d'investissement à conseil d'administration", "SA immobilière pour le commerce et l'industrie (SICOMI) à conseil d'administration", "SA d'aménagement foncier et d'équipement rural (SAFER) à conseil d'administration", "Société anonyme mixte d'intérêt agricole (SMIA) à conseil d'administration", "SA d'intérêt collectif agricole (SICA) à conseil d'administration", "SA coopérative de construction à conseil d'administration", "SA coopérative de construction à conseil d'administration", "SA coopérative de production de HLM à conseil d'administration", "SA de crédit immobilier à conseil d'administration", "SA coopérative de consommation à conseil d'administration", "SA coopérative de commerçants-détaillants à conseil d'administration", "SA coopérative artisanale à conseil d'administration", "SA coopérative (d'intérêt) maritime à conseil d'administration", "SA coopérative de transport à conseil d'administration", "SA coopérative ouvrière de production (SCOP) à conseil d'administration", "SA union de sociétés coopératives à conseil d'administration", "Autre SA coopérative à conseil d'administration", "Société de Participation Financières de Profession Libérale Société anonyme à conseil d'administration (SPFPL SA à conseil d'administration)", "Société d'exercice libéral à forme anonyme à conseil d'administration", "SA à conseil d'administration (s.a.i)", "SA à participation ouvrière à directoire", "SA nationale à directoire", "SA d'économie mixte à directoire", "Société d'investissement à capital variable (SICAV) à directoire", "Safer anonyme à directoire", "SA d'intérêt collectif agricole (SICA)", "SA d'attribution à directoire", "SA de HLM à directoire", "Société coopérative de production de HLM anonyme à directoire", "SA de crédit immobilier à directoire", "SA coopérative de consommation à directoire", "SA coopérative de commerçants-détaillants à directoire", "SA coopérative artisanale à directoire", "SA coopérative d'intérêt maritime à directoire", "SA coopérative de transport à directoire", "SA coopérative ouvrière de production (SCOP) à directoire", "SA union de sociétés coopératives à directoire", "Société de Participations Financières de Profession Libérale Société anonyme à Directoire (SPFPL SA à directoire)", "Société d'exercice libéral à forme anonyme à directoire", "SA à directoire (s.a.i)", "Société de Participations Financières de Profession Libérale Société par actions simplifiées (SPFPL SAS)", "Caisse d'Épargne et de Prévoyance", "Groupement européen d'intérêt économique (GEIE)", "Groupement d'intérêt économique (GIE)", "Coopérative d'utilisation de matériel agricole en commun (CUMA)", "Société coopérative agricole", "Union de sociétés coopératives agricoles", "Société d'assurance à forme mutuelle", "Société interprofessionnelle de Soins Ambulatoires", "Société civile de placement collectif immobilier (SCPI)", "Société d'intérêt collectif agricole (SICA)", "Groupement foncier agricole", "Groupement agricole foncier", "Groupement forestier", "Groupement pastoral", "Groupement foncier et rural", "Société civile foncière", "Société civile immobilière de construction-vente", "Société civile d'attribution", "Société civile coopérative de consommation", "Société civile coopérative entre médecins", "Caisse locale de crédit mutuel", "Caisse de crédit agricole mutuel", "Société civile d'exploitation agricole", "Exploitation agricole à responsabilité limitée", "Autorité constitutionnelle", "Ministère", "Service central d'un ministère", "Service déconcentré à compétence nationale d'un ministère (hors défense)", "Service déconcentré de l'État à compétence (inter) départementale", "(Autre) Service déconcentré de l'État à compétence territoriale", "Département", "Collectivité e territoire d'Outre Mer", "(Autre) Collectivité territoriale", "Région", "Section de commune", "Association syndicale autorisée", "Association foncière urbaine", "Métropole", "Association foncière de remembrement", "Pôle métropolitain", "Communauté urbaine", "Syndicat Intercommunal à vocation multiple (SIVOM)", "Communauté d'agglomération", "Institution interdépartementale ou entente", "Commission syndicale pour la gestion des biens indivis des communes", "Pôle d'équilibre territorial et rural (PETR)", "Centre communal d'action sociale", "Caisse des écoles", "Caisse de crédit municipal", "Centre intercommunal d'action sociale (CIAS)", "Service départemental d'incendie et de secours (SDIS)", "Régie d'une collectivité locale à caractère administratif", "Organisme consulaire", "Établissement public national ayant fonction d'administration centrale", "Établissement public national à caractère scientifique culturel et professionnel", "Établissement public national à caractère administratif", "Groupement d'intérêt public (GIP)", "Établissement public des cultes Alsace-Lorraine", "Établissement public administratif, cercle et foyer dans les armées", "Groupement de coopération sanitaire à gestion publique", "Régime général de la Sécurité Sociale", "Régime spécial de la Sécurité Sociale", "Institution de retraite complémentaire", "Mutualité Sociale agricole", "Régime maladie des non-salariés non agricoles", "Régime vieillesse ne dépendant pas du régime général de la Sécurité Sociale", "Régime d'assurance chômage", "Autre régime de prévoyance sociale", "Assurance mutuelle agricole", "Comité central d'entreprise", "Comité d'établissement", "Centre technique industriel ou comité professionnel du développement économique", "Institution de prévoyance", "Association syndicale libre", "Association non déclarée", "Association déclarée", "Association déclarée d'insertion par l'économique", "Association intermédiaire", "Association déclarée, reconnue d'utilité publique", "Congrégation", "Association de droit local (Bas-Rhin, Haut-Rhin et Moselle)", "Fondation"
]))

fj.sort()

const naf = [
  "0111Z", "0112Z", "0113Z", "0114Z", "0115Z", "0116Z", "0119Z", "0121Z", "0122Z", "0123Z", "0124Z", "0125Z", "0126Z", "0127Z", "0128Z", "0129Z", "0130Z", "0141Z", "0142Z", "0143Z", "0144Z", "0145Z", "0146Z", "0147Z", "0149Z", "0150Z", "0161Z", "0162Z", "0163Z", "0164Z", "0170Z", "0210Z", "0220Z", "0230Z", "0240Z", "0311Z", "0312Z", "0321Z", "0322Z", "0510Z", "0520Z", "0610Z", "0620Z", "0710Z", "0721Z", "0729Z", "0811Z", "0812Z", "0891Z", "0892Z", "0893Z", "0899Z", "0910Z", "0990Z", "1011Z", "1012Z", "1013A", "1013B", "1020Z", "1031Z", "1032Z", "1039A", "1039B", "1041A", "1041B", "1042Z", "1051A", "1051B", "1051C", "1051D", "1052Z", "1061A", "1061B", "1062Z", "1071A", "1071B", "1071C", "1071D", "1072Z", "1073Z", "1081Z", "1082Z", "1083Z", "1084Z", "1085Z", "1086Z", "1089Z", "1091Z", "1092Z", "1101Z", "1102A", "1102B", "1103Z", "1104Z", "1105Z", "1106Z", "1107A", "1107B", "1200Z", "1310Z", "1320Z", "1330Z", "1391Z", "1392Z", "1393Z", "1394Z", "1395Z", "1396Z", "1399Z", "1411Z", "1412Z", "1413Z", "1414Z", "1419Z", "1420Z", "1431Z", "1439Z", "1511Z", "1512Z", "1520Z", "1610A", "1610B", "1621Z", "1622Z", "1623Z", "1624Z", "1629Z", "1711Z", "1712Z", "1721A", "1721B", "1721C", "1722Z", "1723Z", "1724Z", "1729Z", "1811Z", "1812Z", "1813Z", "1814Z", "1820Z", "1910Z", "1920Z", "2011Z", "2012Z", "2013A", "2013B", "2014Z", "2015Z", "2016Z", "2017Z", "2020Z", "2030Z", "2041Z", "2042Z", "2051Z", "2052Z", "2053Z", "2059Z", "2060Z", "2110Z", "2120Z", "2211Z", "2219Z", "2221Z", "2222Z", "2223Z", "2229A", "2229B", "2311Z", "2312Z", "2313Z", "2314Z", "2319Z", "2320Z", "2331Z", "2332Z", "2341Z", "2342Z", "2343Z", "2344Z", "2349Z", "2351Z", "2352Z", "2361Z", "2362Z", "2363Z", "2364Z", "2365Z", "2369Z", "2370Z", "2391Z", "2399Z", "2410Z", "2420Z", "2431Z", "2432Z", "2433Z", "2434Z", "2441Z", "2442Z", "2443Z", "2444Z", "2445Z", "2446Z", "2451Z", "2452Z", "2453Z", "2454Z", "2511Z", "2512Z", "2521Z", "2529Z", "2530Z", "2540Z", "2550A", "2550B", "2561Z", "2562A", "2562B", "2571Z", "2572Z", "2573A", "2573B", "2591Z", "2592Z", "2593Z", "2594Z", "2599A", "2599B", "2611Z", "2612Z", "2620Z", "2630Z", "2640Z", "2651A", "2651B", "2652Z", "2660Z", "2670Z", "2680Z", "2711Z", "2712Z", "2720Z", "2731Z", "2732Z", "2733Z", "2740Z", "2751Z", "2752Z", "2790Z", "2811Z", "2812Z", "2813Z", "2814Z", "2815Z", "2821Z", "2822Z", "2823Z", "2824Z", "2825Z", "2829A", "2829B", "2830Z", "2841Z", "2849Z", "2891Z", "2892Z", "2893Z", "2894Z", "2895Z", "2896Z", "2899A", "2899B", "2910Z", "2920Z", "2931Z", "2932Z", "3011Z", "3012Z", "3020Z", "3030Z", "3040Z", "3091Z", "3092Z", "3099Z", "3101Z", "3102Z", "3103Z", "3109A", "3109B", "3211Z", "3212Z", "3213Z", "3220Z", "3230Z", "3240Z", "3250A", "3250B", "3291Z", "3299Z", "3311Z", "3312Z", "3313Z", "3314Z", "3315Z", "3316Z", "3317Z", "3319Z", "3320A", "3320B", "3320C", "3320D", "3511Z", "3512Z", "3513Z", "3514Z", "3521Z", "3522Z", "3523Z", "3530Z", "3600Z", "3700Z", "3811Z", "3812Z", "3821Z", "3822Z", "3831Z", "3832Z", "3900Z", "4110A", "4110B", "4110C", "4110D", "4120A", "4120B", "4211Z", "4212Z", "4213A", "4213B", "4221Z", "4222Z", "4291Z", "4299Z", "4311Z", "4312A", "4312B", "4313Z", "4321A", "4321B", "4322A", "4322B", "4329A", "4329B", "4331Z", "4332A", "4332B", "4332C", "4333Z", "4334Z", "4339Z", "4391A", "4391B", "4399A", "4399B", "4399C", "4399D", "4399E", "4511Z", "4519Z", "4520A", "4520B", "4531Z", "4532Z", "4540Z", "4611Z", "4612A", "4612B", "4613Z", "4614Z", "4615Z", "4616Z", "4617A", "4617B", "4618Z", "4619A", "4619B", "4621Z", "4622Z", "4623Z", "4624Z", "4631Z", "4632A", "4632B", "4632C", "4633Z", "4634Z", "4635Z", "4636Z", "4637Z", "4638A", "4638B", "4639A", "4639B", "4641Z", "4642Z", "4643Z", "4644Z", "4645Z", "4646Z", "4647Z", "4648Z", "4649Z", "4651Z", "4652Z", "4661Z", "4662Z", "4663Z", "4664Z", "4665Z", "4666Z", "4669A", "4669B", "4669C", "4671Z", "4672Z", "4673A", "4673B", "4674A", "4674B", "4675Z", "4676Z", "4677Z", "4690Z", "4711A", "4711B", "4711C", "4711D", "4711E", "4711F", "4719A", "4719B", "4721Z", "4722Z", "4723Z", "4724Z", "4725Z", "4726Z", "4729Z", "4730Z", "4741Z", "4742Z", "4743Z", "4751Z", "4752A", "4752B", "4753Z", "4754Z", "4759A", "4759B", "4761Z", "4762Z", "4763Z", "4764Z", "4765Z", "4771Z", "4772A", "4772B", "4773Z", "4774Z", "4775Z", "4776Z", "4777Z", "4778A", "4778B", "4778C", "4779Z", "4781Z", "4782Z", "4789Z", "4791A", "4791B", "4799A", "4799B", "4910Z", "4920Z", "4931Z", "4932Z", "4939A", "4939B", "4939C", "4941A", "4941B", "4941C", "4942Z", "4950Z", "5010Z", "5020Z", "5030Z", "5040Z", "5110Z", "5121Z", "5122Z", "5210A", "5210B", "5221Z", "5222Z", "5223Z", "5224A", "5224B", "5229A", "5229B", "5310Z", "5320Z", "5510Z", "5520Z", "5530Z", "5590Z", "5610A", "5610B", "5610C", "5621Z", "5629A", "5629B", "5630Z", "5811Z", "5812Z", "5813Z", "5814Z", "5819Z", "5821Z", "5829A", "5829B", "5829C", "5911A", "5911B", "5911C", "5912Z", "5913A", "5913B", "5914Z", "5920Z", "6010Z", "6020A", "6020B", "6110Z", "6120Z", "6130Z", "6190Z", "6201Z", "6202A", "6202B", "6203Z", "6209Z", "6311Z", "6312Z", "6391Z", "6399Z", "6411Z", "6419Z", "6420Z", "6430Z", "6491Z", "6492Z", "6499Z", "6511Z", "6512Z", "6520Z", "6530Z", "6611Z", "6612Z", "6619A", "6619B", "6621Z", "6622Z", "6629Z", "6630Z", "6810Z", "6820A", "6820B", "6831Z", "6832A", "6832B", "6910Z", "6920Z", "7010Z", "7021Z", "7022Z", "7111Z", "7112A", "7112B", "7120A", "7120B", "7211Z", "7219Z", "7220Z", "7311Z", "7312Z", "7320Z", "7410Z", "7420Z", "7430Z", "7490A", "7490B", "7500Z", "7711A", "7711B", "7712Z", "7721Z", "7722Z", "7729Z", "7731Z", "7732Z", "7733Z", "7734Z", "7735Z", "7739Z", "7740Z", "7810Z", "7820Z", "7830Z", "7911Z", "7912Z", "7990Z", "8010Z", "8020Z", "8030Z", "8110Z", "8121Z", "8122Z", "8129A", "8129B", "8130Z", "8211Z", "8219Z", "8220Z", "8230Z", "8291Z", "8292Z", "8299Z", "8411Z", "8412Z", "8413Z", "8421Z", "8422Z", "8423Z", "8424Z", "8425Z", "8430A", "8430B", "8430C", "8510Z", "8520Z", "8531Z", "8532Z", "8541Z", "8542Z", "8551Z", "8552Z", "8553Z", "8559A", "8559B", "8560Z", "8610Z", "8621Z", "8622A", "8622B", "8622C", "8623Z", "8690A", "8690B", "8690C", "8690D", "8690E", "8690F", "8710A", "8710B", "8710C", "8720A", "8720B", "8730A", "8730B", "8790A", "8790B", "8810A", "8810B", "8810C", "8891A", "8891B", "8899A", "8899B", "9001Z", "9002Z", "9003A", "9003B", "9004Z", "9101Z", "9102Z", "9103Z", "9104Z", "9200Z", "9311Z", "9312Z", "9313Z", "9319Z", "9321Z", "9329Z", "9411Z", "9412Z", "9420Z", "9491Z", "9492Z", "9499Z", "9511Z", "9512Z", "9521Z", "9522Z", "9523Z", "9524Z", "9525Z", "9529Z", "9601A", "9601B", "9602A", "9602B", "9603Z", "9604Z", "9609Z", "9700Z", "9810Z", "9820Z", "9900Z"
]


const simpleTextView = (self, label) => {
  return <TextField
    className="textview"
    label={`${label}${!mandatory.includes(label) ? '' : ' *'}`}
    variant="outlined"
    // value={self.state[label] || ''}
    // onChange={(e) => self.setState({ [label]: e.target.value })}
    onChange={(e) => self.state[label] = e.target.value}
    error={(self.state.missing && self.state.missing[label]) || (label === "RAISON SOCIALE" && self.state.error)}
  />
}

const simpleTextareaView = (self, label) => {
  return <TextField
    className="textview"
    label={`${label}${!mandatory.includes(label) ? '' : ' *'}`}
    variant="outlined"
    // value={this.state["Offre d'arrivée fixe"] || ''}
    // onChange={(e) => this.setState({ ["Offre d'arrivée fixe"]: e.target.value })}
    onChange={(e) => self.state[label] = e.target.value}
    multiline
    rows={1}
    rowsMax={6}
    error={(self.state.missing && self.state.missing[label])}
  />
}

const simpleEmpty = () => {
  return <div
    className="textview"
  />
}

const simpleSelect = (self, label, values, multiple) => {
  return <FormControl className="textview">
    <InputLabel className="inputlabel">{`${label}${!mandatory.includes(label) ? '' : ' *'}`}</InputLabel>
    <Select
      value={self.state[label] || (multiple ? [] : '')}
      onChange={e => self.setState({ [label]: e.target.value })}
      label={`${label}${!mandatory.includes(label) ? '' : ' *'}`}
      variant="outlined"
      multiple={multiple}
      error={self.state.missing && self.state.missing[label]}
    >
      {
        values.map(elem => <MenuItem value={elem}>{elem}</MenuItem>)
      }
    </Select>
  </FormControl>
}


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    return (
      <div className="Home">
        <div className="header">
          <div className="helem"></div>
          <div className="helem"></div>
          <div className="helem"><img src='delta.png' /></div>
          <div className="helem"><h3>Feuille de prod: Flottemobile</h3></div>
          <div className="helem"><img src='orange.jpg' /></div>
          <div className="helem"></div>
          <div className="helem"></div>
        </div>
        <div className="body">
          <div className="container">
            {simpleSelect(this, "Proprietaire", [
              "Axel Segura",
              "Théo Segura",
              "Deniz Horuz",
              "Ayoub Fatmi",
              "Nadia Meloua",
              "Myriam-Angèle",
              "Kany Brayhan Yrio",
              "Soufiane Husser",
              "Nouvel utilisateur",
            ])}
            {simpleSelect(this, "Apporteur d’affaire", [
              "Valentin Lang",
              "Tugay Sumbul",
              "Axel Lacroix",
              "Hakan Cetinkaya",
              "Pierre Pitasi",
              "Nouvel utilisateur",
              "Aucun Apporteur d’affaire"

            ])}
          </div>
          <div className="container">
            <TextField className="textview"
              label="Date de signature *"
              type="date"
              value={this.state["Date de signature"] || ''}
              onChange={(e) => this.setState({ ["Date de signature"]: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              error={this.state.missing && this.state.missing["Date de signature"]}
            />
            {simpleTextView(this, "Id de la transaction AA")}
          </div>
          <div className="container">
            {simpleTextView(this, "RAISON SOCIALE")}
            {simpleTextView(this, "ENSEIGNE")}
          </div>
          <div className="container">
            {simpleSelect(this, "Annexe / bureau", ["Oui", "Non"])}
            {simpleSelect(this, "Client en portefeuille", ["OUI", "NON", "NC"])}
          </div>
          <div className="container">
            {simpleTextView(this, "SIRET")}
            {simpleSelect(this, "Forme Juridique", fj)}
            {simpleSelect(this, "Code NAF", naf)}
          </div>
          <div className="container">
            {simpleSelect(this, "Civilité", ["Monsieur", "Madame"])}
            {simpleTextView(this, "Nom")}
            {simpleTextView(this, "Prénom")}
          </div>
          <div className="container">
            {simpleTextView(this, "Email")}
            {simpleTextView(this, "Numéro de contact client")}
          </div>
          <div className="container">
            {simpleTextView(this, "ADRESSE DE LIVRAISON")}
            {simpleTextView(this, "Code Postal")}
            {simpleTextView(this, "Ville")}
          </div>
          <div className="container">
            {simpleTextView(this, "ADRESSE DE FACTURATION")}
          </div>
          <div className="container">
            {simpleTextView(this, "Adresse livraison terminaux")}
          </div>
          <div className="container">
            {/* {simpleTextView(this, "ADRESSE DE LIVRAISON POSTE/MATERIEL")} */}
          </div>
          {(() => {
            const a = (n) => (
              <>
                <div className="container">
                  {simpleTextView(this, `LM${n + 1}`)}
                  {simpleTextView(this, `LM${n + 2}`)}
                  {simpleTextView(this, `LM${n + 3}`)}
                  {simpleTextView(this, `LM${n + 4}`)}
                  {simpleTextView(this, `LM${n + 5}`)}
                </div>
                <div className="container">
                  {simpleSelect(this, `Avant Forfait LM${n + 1}`, ["AUCUN", "FORFAIT CONCURRENT", "FORFAIT ORANGE GP", "INITIAL VOIX - OPEN", "INITIAL - OPEN", "EQUILIBRE 70 - OPEN", "EQUILIBRE 130 - OPEN", "INTENSE - OPEN", "INTENSE TRAVEL - OPEN", "PE INITIAL VOIX", "PE INITIAL", "PE DYNAMIQUE", "PE EQUILIBRE", "PE INTENSE", "PE TRAVEL", "PERF PRO INITIAL VOIX", "PERF PRO INITIAL", "PERF PRO EQUILIBRE", "PERF PRO EQUILIBRE 100GO", "PERF PRO INTENSE", "PERF PRO INTENSE TRAVEL", "BE INITIAL", "BE ÉQUILIBRE", "BE INTENSE", "BE ABONDANCE"])}
                  {simpleSelect(this, `Avant Forfait LM${n + 2}`, ["AUCUN", "FORFAIT CONCURRENT", "FORFAIT ORANGE GP", "INITIAL VOIX - OPEN", "INITIAL - OPEN", "EQUILIBRE 70 - OPEN", "EQUILIBRE 130 - OPEN", "INTENSE - OPEN", "INTENSE TRAVEL - OPEN", "PE INITIAL VOIX", "PE INITIAL", "PE DYNAMIQUE", "PE EQUILIBRE", "PE INTENSE", "PE TRAVEL", "PERF PRO INITIAL VOIX", "PERF PRO INITIAL", "PERF PRO EQUILIBRE", "PERF PRO EQUILIBRE 100GO", "PERF PRO INTENSE", "PERF PRO INTENSE TRAVEL", "BE INITIAL", "BE ÉQUILIBRE", "BE INTENSE", "BE ABONDANCE"])}
                  {simpleSelect(this, `Avant Forfait LM${n + 3}`, ["AUCUN", "FORFAIT CONCURRENT", "FORFAIT ORANGE GP", "INITIAL VOIX - OPEN", "INITIAL - OPEN", "EQUILIBRE 70 - OPEN", "EQUILIBRE 130 - OPEN", "INTENSE - OPEN", "INTENSE TRAVEL - OPEN", "PE INITIAL VOIX", "PE INITIAL", "PE DYNAMIQUE", "PE EQUILIBRE", "PE INTENSE", "PE TRAVEL", "PERF PRO INITIAL VOIX", "PERF PRO INITIAL", "PERF PRO EQUILIBRE", "PERF PRO EQUILIBRE 100GO", "PERF PRO INTENSE", "PERF PRO INTENSE TRAVEL", "BE INITIAL", "BE ÉQUILIBRE", "BE INTENSE", "BE ABONDANCE"])}
                  {simpleSelect(this, `Avant Forfait LM${n + 4}`, ["AUCUN", "FORFAIT CONCURRENT", "FORFAIT ORANGE GP", "INITIAL VOIX - OPEN", "INITIAL - OPEN", "EQUILIBRE 70 - OPEN", "EQUILIBRE 130 - OPEN", "INTENSE - OPEN", "INTENSE TRAVEL - OPEN", "PE INITIAL VOIX", "PE INITIAL", "PE DYNAMIQUE", "PE EQUILIBRE", "PE INTENSE", "PE TRAVEL", "PERF PRO INITIAL VOIX", "PERF PRO INITIAL", "PERF PRO EQUILIBRE", "PERF PRO EQUILIBRE 100GO", "PERF PRO INTENSE", "PERF PRO INTENSE TRAVEL", "BE INITIAL", "BE ÉQUILIBRE", "BE INTENSE", "BE ABONDANCE"])}
                  {simpleSelect(this, `Avant Forfait LM${n + 5}`, ["AUCUN", "FORFAIT CONCURRENT", "FORFAIT ORANGE GP", "INITIAL VOIX - OPEN", "INITIAL - OPEN", "EQUILIBRE 70 - OPEN", "EQUILIBRE 130 - OPEN", "INTENSE - OPEN", "INTENSE TRAVEL - OPEN", "PE INITIAL VOIX", "PE INITIAL", "PE DYNAMIQUE", "PE EQUILIBRE", "PE INTENSE", "PE TRAVEL", "PERF PRO INITIAL VOIX", "PERF PRO INITIAL", "PERF PRO EQUILIBRE", "PERF PRO EQUILIBRE 100GO", "PERF PRO INTENSE", "PERF PRO INTENSE TRAVEL", "BE INITIAL", "BE ÉQUILIBRE", "BE INTENSE", "BE ABONDANCE"])}
                </div>
                <div className="container">
                  {simpleTextView(this, `RIO - LM${n + 1}`)}
                  {simpleTextView(this, `RIO - LM${n + 2}`)}
                  {simpleTextView(this, `RIO - LM${n + 3}`)}
                  {simpleTextView(this, `RIO - LM${n + 4}`)}
                  {simpleTextView(this, `RIO - LM${n + 5}`)}
                </div>
                <div className="container">
                  {simpleSelect(this, `C.LM${n + 1}`, [
                    "Création",
                    "Portabilité",
                    "Fluidité montante",
                    "Fidélisation PCM",
                    "Fidélisation Options",
                    "Migration sans valeur",
                  ])}
                  {simpleSelect(this, `C.LM${n + 2}`, [
                    "Création",
                    "Portabilité",
                    "Fluidité montante",
                    "Fidélisation PCM",
                    "Fidélisation Options",
                    "Migration sans valeur",
                  ])}
                  {simpleSelect(this, `C.LM${n + 3}`, [
                    "Création",
                    "Portabilité",
                    "Fluidité montante",
                    "Fidélisation PCM",
                    "Fidélisation Options",
                    "Migration sans valeur",
                  ])}
                  {simpleSelect(this, `C.LM${n + 4}`, [
                    "Création",
                    "Portabilité",
                    "Fluidité montante",
                    "Fidélisation PCM",
                    "Fidélisation Options",
                    "Migration sans valeur",
                  ])}
                  {simpleSelect(this, `C.LM${n + 5}`, [
                    "Création",
                    "Portabilité",
                    "Fluidité montante",
                    "Fidélisation PCM",
                    "Fidélisation Options",
                    "Migration sans valeur",
                  ])}
                </div>
                <div className="container">
                  {simpleSelect(this, `Après Forfait - LM${n + 1}`, [
                    "INITIAL VOIX",
                    "INITIAL",
                    "EQUILIBRE 70 GO",
                    "EQUILIBRE 130 GO",
                    "INTENSE",
                    "INTENSE TRAVEL",
                    "PE INITIAL VOIX",
                    "PE INITIAL",
                    "PE DYNAMIQUE",
                    "PE EQUILIBRE",
                    "PE INTENSE",
                    "PE TRAVEL",
                    "PERF PRO INITIAL VOIX",
                    "PERF PRO INITIAL",
                    "PERF PRO EQUILIBRE",
                    "PERF PRO EQUILIBRE 100GO",
                    "PERF PRO INTENSE",
                    "PERF PRO INTENSE TRAVEL",
                    "BE INITIAL",
                    "BE ÉQUILIBRE",
                    "BE INTENSE",
                    "BE ABONDANCE",
                  ])}
                  {simpleSelect(this, `Après Forfait - LM${n + 2}`, [
                    "INITIAL VOIX",
                    "INITIAL",
                    "EQUILIBRE 70 GO",
                    "EQUILIBRE 130 GO",
                    "INTENSE",
                    "INTENSE TRAVEL",
                    "PE INITIAL VOIX",
                    "PE INITIAL",
                    "PE DYNAMIQUE",
                    "PE EQUILIBRE",
                    "PE INTENSE",
                    "PE TRAVEL",
                    "PERF PRO INITIAL VOIX",
                    "PERF PRO INITIAL",
                    "PERF PRO EQUILIBRE",
                    "PERF PRO EQUILIBRE 100GO",
                    "PERF PRO INTENSE",
                    "PERF PRO INTENSE TRAVEL",
                    "BE INITIAL",
                    "BE ÉQUILIBRE",
                    "BE INTENSE",
                    "BE ABONDANCE",
                  ])}
                  {simpleSelect(this, `Après Forfait - LM${n + 3}`, [
                    "INITIAL VOIX",
                    "INITIAL",
                    "EQUILIBRE 70 GO",
                    "EQUILIBRE 130 GO",
                    "INTENSE",
                    "INTENSE TRAVEL",
                    "PE INITIAL VOIX",
                    "PE INITIAL",
                    "PE DYNAMIQUE",
                    "PE EQUILIBRE",
                    "PE INTENSE",
                    "PE TRAVEL",
                    "PERF PRO INITIAL VOIX",
                    "PERF PRO INITIAL",
                    "PERF PRO EQUILIBRE",
                    "PERF PRO EQUILIBRE 100GO",
                    "PERF PRO INTENSE",
                    "PERF PRO INTENSE TRAVEL",
                    "BE INITIAL",
                    "BE ÉQUILIBRE",
                    "BE INTENSE",
                    "BE ABONDANCE",
                  ])}
                  {simpleSelect(this, `Après Forfait - LM${n + 4}`, [
                    "INITIAL VOIX",
                    "INITIAL",
                    "EQUILIBRE 70 GO",
                    "EQUILIBRE 130 GO",
                    "INTENSE",
                    "INTENSE TRAVEL",
                    "PE INITIAL VOIX",
                    "PE INITIAL",
                    "PE DYNAMIQUE",
                    "PE EQUILIBRE",
                    "PE INTENSE",
                    "PE TRAVEL",
                    "PERF PRO INITIAL VOIX",
                    "PERF PRO INITIAL",
                    "PERF PRO EQUILIBRE",
                    "PERF PRO EQUILIBRE 100GO",
                    "PERF PRO INTENSE",
                    "PERF PRO INTENSE TRAVEL",
                    "BE INITIAL",
                    "BE ÉQUILIBRE",
                    "BE INTENSE",
                    "BE ABONDANCE",
                  ])}
                  {simpleSelect(this, `Après Forfait - LM${n + 5}`, [
                    "INITIAL VOIX",
                    "INITIAL",
                    "EQUILIBRE 70 GO",
                    "EQUILIBRE 130 GO",
                    "INTENSE",
                    "INTENSE TRAVEL",
                    "PE INITIAL VOIX",
                    "PE INITIAL",
                    "PE DYNAMIQUE",
                    "PE EQUILIBRE",
                    "PE INTENSE",
                    "PE TRAVEL",
                    "PERF PRO INITIAL VOIX",
                    "PERF PRO INITIAL",
                    "PERF PRO EQUILIBRE",
                    "PERF PRO EQUILIBRE 100GO",
                    "PERF PRO INTENSE",
                    "PERF PRO INTENSE TRAVEL",
                    "BE INITIAL",
                    "BE ÉQUILIBRE",
                    "BE INTENSE",
                    "BE ABONDANCE",
                  ])}
                </div>
                <div className="container">
                  {simpleSelect(this, `Après Option - LM${n + 1}`, ["ASSURANCE", "ASSURANCE CONFORT", "ASSURANCE PREMIUM", "OPTION ORANGE TELEPHONE PRO", "OPTION CARTE JUMELLE", "OPTION DEVICE", "MANAGEMENT EXPRESS", "CYBERFILTRE 12 MOIS", "CYBERFILTRE AVANCE 12 MOIS",], true)}
                  {simpleSelect(this, `Après Option - LM${n + 2}`, ["ASSURANCE", "ASSURANCE CONFORT", "ASSURANCE PREMIUM", "OPTION ORANGE TELEPHONE PRO", "OPTION CARTE JUMELLE", "OPTION DEVICE", "MANAGEMENT EXPRESS", "CYBERFILTRE 12 MOIS", "CYBERFILTRE AVANCE 12 MOIS",], true)}
                  {simpleSelect(this, `Après Option - LM${n + 3}`, ["ASSURANCE", "ASSURANCE CONFORT", "ASSURANCE PREMIUM", "OPTION ORANGE TELEPHONE PRO", "OPTION CARTE JUMELLE", "OPTION DEVICE", "MANAGEMENT EXPRESS", "CYBERFILTRE 12 MOIS", "CYBERFILTRE AVANCE 12 MOIS",], true)}
                  {simpleSelect(this, `Après Option - LM${n + 4}`, ["ASSURANCE", "ASSURANCE CONFORT", "ASSURANCE PREMIUM", "OPTION ORANGE TELEPHONE PRO", "OPTION CARTE JUMELLE", "OPTION DEVICE", "MANAGEMENT EXPRESS", "CYBERFILTRE 12 MOIS", "CYBERFILTRE AVANCE 12 MOIS",], true)}
                  {simpleSelect(this, `Après Option - LM${n + 5}`, ["ASSURANCE", "ASSURANCE CONFORT", "ASSURANCE PREMIUM", "OPTION ORANGE TELEPHONE PRO", "OPTION CARTE JUMELLE", "OPTION DEVICE", "MANAGEMENT EXPRESS", "CYBERFILTRE 12 MOIS", "CYBERFILTRE AVANCE 12 MOIS",], true)}
                </div>
              </>
            )
            return [
              a(0),
              a(5),
              a(10),
              a(15)
            ]
          })()}
          <div className="container">
            {simpleSelect(this, "NOM DE L'OFFRE VENDUE", offre)}
            {simpleSelect(this, "Type d’offre vendue", [
              "Flotte Mobile",
              "E-commerce / Site vitrine",
              "Suite Co",
              "MATÉRIEL(S) EQUIPEMENTS",
              "PCM",
              "OPTION(S) / SERVICE(S)",
              "FORMULAIRE DE RÉSILIATION OOPP",
            ])}
          </div>
          <div className="container">
            {/* {simpleSelect(this, "Opérateur mobile", [
              "Client Orange résidentiel",
              "Client Orange pro",
              "Client OBS",
              "Retour concurrent",
              "Aucun",
            ], true)} */}
            {/* <TextField className="textview"
              label="Opérateur mobile"
              variant="outlined"
              value={this.state["Opérateur mobile"] || ''}
              onChange={(e) => this.setState({ ["Opérateur mobile"]: e.target.value })}
              multiline
              rows={1}
              rowsMax={6}
            /> */}
            {simpleSelect(this, "Engagement", ["12 M", "24 M"])}
          </div>
          <div className="container">
            {simpleTextareaView(this, "Terminaux vendus")}
          </div>
          <div className="container" >
            <TextField className="textview"
              label="Marges de manoeuvres *"
              variant="outlined"
              value={this.state["Marges de manoeuvres"] || ''}
              onChange={(e) => this.setState({ ["Marges de manoeuvres"]: e.target.value })}
              multiline
              rows={3}
              error={this.state.missing && this.state.missing["Marges de manoeuvres"]}
            />
            {simpleSelect(this, "Pièces-justificatives", [
              "Kbis",
              "Pièces d'identité",
              "RIB",
              "Fiche Affaire",
              "Attestation Titulaire",
            ], true)}
          </div>
          <div className="container textview" >
            <TextField className="textview"
              label="Commentaire Commande"
              variant="outlined"
              value={this.state["Commentaire Commande"] || ''}
              onChange={(e) => this.setState({ ["Commentaire Commande"]: e.target.value })}
              multiline
              rows={9}
              rowsMax={9}
            />
          </div>
          {
            !this.state.submit && (
              <Button onClick={() => {
                this.setState({ submit: true }, () => {
                  const missing = {}
                  for (let i in mandatory) {
                    if (!this.state[mandatory[i]])
                      missing[mandatory[i]] = true
                  }
                  this.setState({ missing: { ...missing } }, () => {
                    console.log({ missing })
                    if (Object.keys(missing).length === 0) {
                      Api.postForm2(this.state).then((success) => {
                        // this.setState({ hubspotErr: true })
                        if (success)
                          window.location = '/success'
                        else
                          this.setState({ error: true, submit: false })
                      })
                    } else {
                      this.setState({ submit: false })
                    }
                  })
                })
              }}>
                Submit
              </Button>
            )
          }
          {
            this.state.hubspotErr && (
              <div
                style={{
                  color: "red"
                }}
              >
                L'api hubspot renvoie une erreur: GENERIC_ERROR (3)
              </div>
            )
          }
        </div>
      </div >
    )
  }
}

export default Home;
