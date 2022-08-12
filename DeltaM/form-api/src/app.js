
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 5000
const http_model = require('./model/http/http_model')([
  require('./model/http/http_hubspot'),
])
const hubspot_model = require('./model/hubspot/hubspot_model')([
  require('./model/hubspot/hubspot_entreprise'),
  require('./model/hubspot/hubspot_transaction'),
  require('./model/hubspot/hubspot_contact'),
])

const model = {
  ...http_model,
  ...hubspot_model
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));

app.get('/test', (req, res) => {
  res.send({
    result: 'success'
  })
})

app.get('/status', async (req, res) => {
  const http = await http_model.testConnection()
  const hubspot = await hubspot_model.testConnection()
  res.send({
    http,
    hubspot
  })
})

app.post('/form-1', async (req, res) => {
  req.body["Type de formulaire"] = "Formulaire monoligne"
  // req.body = {
  //   "Proprietaire": "Axel Segura",
  //   "Apporteur d’affaire": "Axel Lacroix",
  //   "Date de signature": "2021-10-12",
  //   "RAISON SOCIALE": "aa",
  //   "Annexe / bureau": "Oui",
  //   "Client en portefeuille": "OUI",
  //   "SIRET": "aa",
  //   "Forme Juridique": "Association déclarée, reconnue d'utilité publique",
  //   "Code NAF": "0126Z",
  //   "Civilité": "Madame",
  //   "Nom": "a",
  //   "Prénom": "a",
  //   "Email": "a",
  //   "Numéro de contact client": "a",
  //   "ADRESSE D'INSTALLATION": "a",
  //   "Code Postal": "a",
  //   "Ville": "a",
  //   "NOM DE L'OFFRE VENDUE": "OOP \"ADSL\"",
  //   "Type d’offre vendue": "Mono-ligne",
  //   "Contexte de vente partie Fixe": "Acquisition/Portabilité",
  //   "Après - ND Support": "a",
  //   "Après - NDI": "a",
  //   "Après Open": "Non",
  //   "Offre d'arrivée fixe": "a",
  //   "Engagement": "12 M",
  //   "Tarifs hors remise HT/mois": "a",
  //   "Tarifs remisés HT/mois 1ère année": "a",
  //   "Tarifs remisés HT/mois 2ème année": "a",
  //   "submit": true,
  //   "missing": {},
  //   "error": false,
  //   "Type de formulaire": "Formulaire monoligne"
  // }
  console.log(JSON.stringify(req.body, null, 4))
  let originDomain = (
    req.body['RAISON SOCIALE']
      .split(' ').join('')
      .split(',').join('')
      .split('(').join('')
      .split(')').join('')
      .split('#').join('')
      .split('\'').join('')
      .split('*').join('')
      .split('/').join('')
      .split('&').join('AND')
      .split('+').join('PLUS') + '.com'
  ).split('..').join('.').toLowerCase()
  let domain = originDomain
  req.body.domain = domain
  {
    const entreprises = await model.getEntreprises({ siret: req.body["SIRET"] })
    if (entreprises) {
      if (entreprises.total > 0) {
        if (entreprises.results[0].properties.name === req.body['RAISON SOCIALE']) {
          await model.updateEntreprise(entreprises.results[0].id, req.body)
        } else {
          return res.send({ result: 'error' })
        }
      } else {
        let i = 2
        while (true) {
          const entreprises2 = await model.getEntreprises({ domain })
          if (entreprises2.total === 0) {
            req.body.domain = domain
            await model.createEntreprise(req.body)
            break
          }
          domain = `${i}_${originDomain}`
          i++
        }
      }
    }
  }
  let contact_id = null
  let deal_id = null
  {
    let i = 2
    let originDealname = req.body["RAISON SOCIALE"] + ' - ' + req.body["NOM DE L'OFFRE VENDUE"]
    let dealname = originDealname
    while (true) {
      const transactions = await model.getTransactions({ dealname })
      if (transactions.total === 0) {
        req.body.dealname = dealname
        if (req.body["Apporteur d’affaire"] && req.body["Apporteur d’affaire"] !== "Aucun Apporteur d’affaire" && !req.body["Id de la transaction AA"]) {
          const aa = await model.createTransaction__AA(req.body)
          req.body["Id de la transaction AA"] = aa
          deal_id = await model.createTransaction(req.body)
        } else {
          deal_id = await model.createTransaction(req.body)
        }
        break
      }
      dealname = `${i}_${originDealname}`
      i++
    }
  }
  {
    const contacts = await model.getContacts({ email: `delta@${req.body.domain}` })
    if (contacts) {
      if (contacts.total > 0) {
      } else {
        contact_id = await model.createContact(req.body)
      }
    }
  }
  if (contact_id && deal_id)
    await model.linkContactToDeal({ contact_id, deal_id })
  res.send({
    result: 'success',
  })
})

app.post('/form-2', async (req, res) => {
  req.body["Type de formulaire"] = "Formulaire mobilité"
  // req.body = {
  //   "Type de formulaire": "Formulaire mobilité",
  //   "NOM DE L'OFFRE VENDUE": "PERFORMANCE ENTREPRISE",
  //   "RAISON SOCIALE": "TEST FORM MOBILITE",
  //   "ENSEIGNE": "MOBILE DECALE",
  //   "Civilité": "Madame",
  //   "Nom et Prénom du gérant": "REDOCO FIONA",
  //   "SIRET": "99966633300058",
  //   "Activité": "CREATION DE FORMULAIRE",
  //   "Forme juridique": "SARL",
  //   "Work Email": "fr.molinacelia@gmail.com",
  //   "Numéro de contact client": "06448555870",
  //   "Annexe / bureau": "Non",
  //   "ADRESSE D'INSTALLATION": "52 rue de bonsecours 57000 Metz",
  //   "ADRESSE DE FACTURATION": "53 rue de bonsecours 57000 Metz",
  //   "LM1": "0658855878",
  //   "LM2": "0658855896",
  //   "LM3": "0658855789",
  //   "LM4": "0658866966",
  //   "LM5": "0658866523",
  //   "LM6": "0658866547",
  //   "LM7": " ",
  //   "LM8": " ",
  //   "LM9": " ",
  //   "Offre de départ": "rien",
  //   "Offre d'arrivée": "flotte de 6",
  //   "Engagement": "24 M",
  //   "Tarifs hors remise HT/mois": "420",
  //   "Tarifs remisés HT/mois 1ère année": "360",
  //   "Tarifs remisés HT/mois 2ème année": "380",
  //   "Terminaux vendus": "iphone xr ",
  //   "Tarifs terminaux HT": "500",
  //   "Tarifs terminaux remisés HT": "420",
  //   "Marges de manoeuvres": "je sais pas e que c'est",
  //   "Pièces-justificatives": ["Kbis"],
  //   "Date de signature": "2021-05-12",
  //   "Code AA": "1002",
  //   "submit": true,
  //   "missing": {}
  // }
  console.log(JSON.stringify(req.body, null, 4))
  let originDomain = (
    req.body['RAISON SOCIALE']
      .split(' ').join('')
      .split(',').join('')
      .split('(').join('')
      .split(')').join('')
      .split('#').join('')
      .split('\'').join('')
      .split('*').join('')
      .split('/').join('')
      .split('&').join('AND')
      .split('+').join('PLUS') + '.com'
  ).split('..').join('.').toLowerCase()
  let domain = originDomain
  req.body.domain = domain
  {
    const entreprises = await model.getEntreprises({ siret: req.body["SIRET"] })
    if (entreprises) {
      if (entreprises.total > 0) {
        if (entreprises.results[0].properties.name === req.body['RAISON SOCIALE']) {
          await model.updateEntreprise2(entreprises.results[0].id, req.body)
        } else {
          return res.send({ result: 'error' })
        }
      } else {
        let i = 2
        while (true) {
          const entreprises2 = await model.getEntreprises({ domain })
          if (entreprises2.total === 0) {
            req.body.domain = domain
            await model.createEntreprise2(req.body)
            break
          }
          domain = `${i}_${originDomain}`
          i++
        }
      }
    }
  }
  let contact_id = null
  let deal_id = null
  {
    let i = 2
    let originDealname = req.body["RAISON SOCIALE"] + ' - FLOTTE MOBILE'
    let dealname = originDealname
    while (true) {
      const transactions = await model.getTransactions({ dealname })
      if (transactions.total === 0) {
        req.body.dealname = dealname

        if (req.body["Apporteur d’affaire"] && req.body["Apporteur d’affaire"] !== "Aucun Apporteur d’affaire" && !req.body["Id de la transaction AA"]) {
          const aa = await model.createTransaction__AA(req.body)
          req.body["Id de la transaction AA"] = aa
          deal_id = await model.createTransaction2(req.body)
        } else {
          deal_id = await model.createTransaction2(req.body)
        }
        break
      }
      dealname = `${i}_${originDealname}`
      i++
    }
  }
  {
    const contacts = await model.getContacts({ email: `delta@${req.body.domain}` })
    if (contacts) {
      if (contacts.total > 0) {
      } else {
        contact_id = await model.createContact2(req.body)
      }
    }
  }
  if (contact_id && deal_id)
    await model.linkContactToDeal({ contact_id, deal_id })
  res.send({
    result: 'success',
  })
})

app.post('/form-3', async (req, res) => {
  req.body["Type de formulaire"] = "Formulaire multiligne"
  // req.body = {
  //   "Type de formulaire": "Formulaire multiligne",
  //   "NOM DE L'OFFRE VENDUE": "OPOF",
  //   "RAISON SOCIALE": "TEST MULTILIGNE",
  //   "ENSEIGNE": "FIRLITU",
  //   "Civilité": "Monsieur",
  //   "Nom et Prénom du gérant": "ARNAUD GRANDJEAN",
  //   "SIRET": "78999966600087",
  //   "Activité": "CHAUFFAGE",
  //   "Forme juridique": "SAS",
  //   "Work Email": "nsp@delta.com",
  //   "Numéro de contact client": "0644855870",
  //   "Annexe / bureau": "Non",
  //   "ADRESSE D'INSTALLATION": "85 RUE DES MARSOUIN 58000 LILLE",
  //   "ADRESSE DE FACTURATION": "87 RUE DES MARSOUIN 58000 LILLE",
  //   "Avant - NDI": "085000230",
  //   "Avant - Fax": "PAS DE FAX",
  //   "Avant - ND": "06558855870",
  //   "Après - ND": "06558855870",
  //   "Après - Fax": "FAX MAIL",
  //   "Commande": "Portabilité",
  //   "Après - NDI": "085000231",
  //   "Avant Open": "Oui",
  //   "Avant - LM1": "0633223333",
  //   "Avant - LM2": "0633223334",
  //   "Avant - LM4": "0633223335",
  //   "Avant - LM3": "332233306",
  //   "Avant - Nombre d'utilisateurs": "4",
  //   "Avant - Nombre de SDA": "2",
  //   "Après - Nombre de SDA": "4",
  //   "Après - Nombre d'utilisateurs": "5",
  //   "Après - nombre de poste": "5",
  //   "Après - Nombre de poste filaire": "1",
  //   "Après - nombre de postes sans fils": "4",
  //   "Avant - nombre de poste": "1",
  //   "Avant - Nombre de poste filaire": "1",
  //   "Avant - nombre de postes sans fils": "0",
  //   "Après Open": "Oui",
  //   "Après - LM1": "0633223333",
  //   "Après - LM2": "0633223334",
  //   "Après - LM4": "0633223335",
  //   "Après - LM3": "332233306",
  //   "Offre de départ": "NC",
  //   "Option(s) de départ": "AUCUNE",
  //   "Offre d'arrivée": "OPOF",
  //   "Option(s) d'arrivée": "ANTI CASSE PORTABLE",
  //   "Tarifs hors remise HT/mois": "560",
  //   "Tarifs remisés HT/mois 1ère année": "450",
  //   "Tarifs remisés HT/mois 2ème année": "480",
  //   "Engagement": "24 M",
  //   "ND SUPPORT": "0369968545",
  //   "Commentaire Commande": "RAS",
  //   "Date de signature": "2021-05-12",
  //   "Code AA": "1002",
  //   "submit": true,
  //   "missing": {}
  // }
  console.log(JSON.stringify(req.body, null, 4))
  let originDomain = (
    req.body['RAISON SOCIALE']
      .split(' ').join('')
      .split(',').join('')
      .split('(').join('')
      .split(')').join('')
      .split('#').join('')
      .split('\'').join('')
      .split('*').join('')
      .split('/').join('')
      .split('&').join('AND')
      .split('+').join('PLUS') + '.com'
  ).split('..').join('.').toLowerCase()
  let domain = originDomain
  req.body.domain = domain
  {
    const entreprises = await model.getEntreprises({ siret: req.body["SIRET"] })
    if (entreprises) {
      if (entreprises.total > 0) {
        if (entreprises.results[0].properties.name === req.body['RAISON SOCIALE']) {
          await model.updateEntreprise3(entreprises.results[0].id, req.body)
        } else {
          return res.send({ result: 'error' })
        }
      } else {
        let i = 2
        while (true) {
          const entreprises2 = await model.getEntreprises({ domain })
          if (entreprises2.total === 0) {
            req.body.domain = domain
            await model.createEntreprise3(req.body)
            break
          }
          domain = `${i}_${originDomain}`
          i++
        }
      }
    }
  }
  let contact_id = null
  let deal_id = null
  {
    let i = 2
    let originDealname = req.body["RAISON SOCIALE"] + ' - ' + req.body["NOM DE L'OFFRE VENDUE"]
    let dealname = originDealname
    while (true) {
      const transactions = await model.getTransactions({ dealname })
      if (transactions.total === 0) {
        req.body.dealname = dealname
        if (req.body["Apporteur d’affaire"] && req.body["Apporteur d’affaire"] !== "Aucun Apporteur d’affaire" && !req.body["Id de la transaction AA"]) {
          const aa = await model.createTransaction__AA(req.body)
          req.body["Id de la transaction AA"] = aa
          deal_id = await model.createTransaction3(req.body)
        } else {
          deal_id = await model.createTransaction3(req.body)
        }
        break
      }
      dealname = `${i}_${originDealname}`
      i++
    }
  }
  {
    const contacts = await model.getContacts({ email: `delta@${req.body.domain}` })
    if (contacts) {
      if (contacts.total > 0) {
      } else {
        contact_id = await model.createContact3(req.body)
      }
    }
  }
  if (contact_id && deal_id)
    await model.linkContactToDeal({ contact_id, deal_id })
  res.send({
    result: 'success',
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const main = async () => {
//   const entreprises = await model.getEntreprises({ domain: 'testanthonycelia.com' })
//   // const entreprises2 = await model.getEntreprises({ siret: '7778885555200002' })
//   // const transactions = await model.getTransactions({ dealname: 'BIOMONITOR - FLOTTE MOBILE' })
//   // // console.log({ entreprises, transactions })
//   // console.log({ transactions })
// }

// main()
