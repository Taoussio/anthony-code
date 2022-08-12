
const request = require('request')

module.exports = function (model) {

    model.linkContactToDeal = ({ contact_id, deal_id }) => new Promise(resolve => {

        var options = {
            method: 'PUT',
            url: `https://api.hubapi.com/crm/v3/objects/contacts/${contact_id}/associations/deal/${deal_id}/contact_to_deal`,
            qs: { hapikey: process.env.HUBSPOT_API_KEY },
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            json: true
        };

        request(options, function (error, response, body) {
            if (error || !response || response.statusCode !== 204) {
                console.log(error)
                console.log(response)
            }
            resolve()
        });

    })

}

