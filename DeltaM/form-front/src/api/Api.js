
import { stringify } from 'query-string';

const API_URL = process.env.REACT_APP_API_HOSTNAME;

// const mapping = {
//     'LIVEBOX PRO ADSL': 'IHD "ADSL"',
//     'LIVEBOX PRO FIBRE': 'LIVEBOX PRO FIBRE',
//     'LIVEBOX PRO ADSL 2 LIGNES': 'OPTIMAL PRO "ADSL"',
//     'LIVEBOX PRO FIBRE 2 LIGNES': 'OPTIMAL PRO FIBRE',
//     'OPEN PRO ALL IP': 'OOP "ADSL"',
//     'OPEN PRO FIBRE': 'OOPSF',
//     'OPEN PRO FIBRE 2 LIGNES': 'OOPF',
//     'OPO RTC "ADSL"': 'OPO RTC "ADSL"',
//     'OPO ALL IP "ADSL"': 'OPO ALL IP "ADSL"',
//     'OOPO RTC "ADSL"': 'OOPO RTC "ADSL"',
//     'OOPO ALL IP "ADSL"': 'OOPO ALL IP "ADSL"',
//     'CP ALL IP': 'CP ALL IP',
//     'CPO ALL IP': 'CPO ALL IP',
//     'OPOF': 'OPOF',
//     'OOPOF': 'OOPOF',
//     'CPF': 'CPF',
//     'CPOF': 'CPOF',
//     'PERFORMANCE PRO': 'PERFORMANCE PRO',
//     'PERFORMANCE ENTREPRISE': 'PERFORMANCE ENTREPRISE',
//     'BE': 'BE',
//     'PCM': 'PCM',
//     'SUITE CO': 'SUITE CO',
//     'E-COMMERCE': 'E-COMMERCE',
//     'TPE': 'TPE',
//     'FORMULAIRE DE RÉSILIATION OOPP': 'FORMULAIRE DE RÉSILIATION OOPP',
//     'OPTION/SERVICE': 'OPTION/SERVICE',
//     'BIV SERIE2 , 200 INTENSE FTTH 500M': 'BIV SERIE2 , 200 INTENSE FTTH 500M',
//     'BIV SERIE2 , 400 INTENSE FTTH 500M': 'BIV SERIE2 , 200 INTENSE FTTH 500M',
//     'BIV SERIE2 , 600 INTENSE FTTH 500M': 'BIV SERIE2 , 600 INTENSE FTTH 500M',
//     'BIV SERIE2 , 800 INTENSE FTTH 500M': 'BIV SERIE2 , 800 INTENSE FTTH 500M',
//     'BIV SERIE2 , 1200 INTENSE FTTH 500M': 'BIV SERIE2 , 800 INTENSE FTTH 500M',
//     'BIV Série 2 200 intense ADSL 8M': 'BIV SERIE2 , 800 INTENSE FTTH 500M',
//     'BIV Série 2 200 intense ADSL 18M': 'BIV Série 2 200 intense ADSL 18M',
//     'BIV Série 2 200 intense VDSL 50M MAX': 'BIV Série 2 200 intense VDSL 50M MAX',
//     'BIV Série 2 400 intense ADSL 8M': 'BIV Série 2 400 intense ADSL 8M',
//     'BIV Série 2 400 intense ADSL 18M': 'BIV Série 2 400 intense ADSL 18M',
//     'BIV Série 2 400 intense VDSL 50M MAX': 'BIV Série 2 400 intense VDSL 50M MAX',
//     'BIV FTTO': 'BIV FTTO'
// }


export default {
    postForm1: (body) => new Promise((resolve) => {
        // body["NOM DE L'OFFRE VENDUE"] = mapping[body["NOM DE L'OFFRE VENDUE"]]
        const url = `${API_URL}/form-1`
        const requestHeaders = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        const options = { headers: requestHeaders }
        options.method = 'POST'
        options.body = JSON.stringify(body)
        fetch(url, options).then(res => {
            return res.json()
        }).then((json) => {
            resolve(json.result === 'success')
        })
    }),
    postForm2: (body) => new Promise((resolve) => {
        // body["NOM DE L'OFFRE VENDUE"] = mapping[body["NOM DE L'OFFRE VENDUE"]]
        const url = `${API_URL}/form-2`
        const requestHeaders = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        const options = { headers: requestHeaders }
        options.method = 'POST'
        options.body = JSON.stringify(body)
        fetch(url, options).then(res => {
            return res.json()
        }).then((json) => {
            resolve(json.result === 'success')
        })
    }),
    postForm3: (body) => new Promise((resolve) => {
        // body["NOM DE L'OFFRE VENDUE"] = mapping[body["NOM DE L'OFFRE VENDUE"]]
        const url = `${API_URL}/form-3`
        const requestHeaders = new Headers()
        requestHeaders.set('Content-Type', 'application/json')
        const options = { headers: requestHeaders }
        options.method = 'POST'
        options.body = JSON.stringify(body)
        fetch(url, options).then(res => {
            return res.json()
        }).then((json) => {
            resolve(json.result === 'success')
        })
    })
}