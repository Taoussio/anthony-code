
const apiKey = process.env.HUBSPOT_API_KEY

module.exports = (requirements) => {
    return require('./hubspot_init')({ apiKey }, requirements)
}
