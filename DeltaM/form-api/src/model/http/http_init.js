
const mandatoryRequirements = [
    require('./http_testConnection'),
]

module.exports = (config, requirements = []) => {
    const model = {}
    mandatoryRequirements.forEach(requirement => requirement(model))
    requirements.forEach(requirement => requirement(model))
    return model
}
