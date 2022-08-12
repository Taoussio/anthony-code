
const hubspot = require('@hubspot/api-client')

const mandatoryRequirements = [
    require('./hubspot_testConnection'),
]

module.exports = (config, requirements = []) => {

    const client = new hubspot.Client({ apiKey: config.apiKey })

    const model = {}
    mandatoryRequirements.forEach(requirement => requirement(client, model))
    requirements.forEach(requirement => requirement(client, model))
    return model
}
