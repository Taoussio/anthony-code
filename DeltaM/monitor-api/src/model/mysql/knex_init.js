
const mandatoryRequirements = [
    require('./knex_testConnection'),
]

module.exports = (config, requirements = []) => {
    const model = {}
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : config.host,
            port : config.port,
            user : config.user,
            password : config.password,
            database : config.database,
            debug: false
        },
        acquireConnectionTimeout : config.connect_timeout,
        log: {
            warn(msg) {
                console.error("knex", msg)
            },
            error(msg) {
                console.error("knex", msg)
            },
            deprecate(msg) {
                console.error("knex", msg)
            },
            debug(msg) {
                console.error("knex", msg)
            },
          }
    });
    knex.log = msg => console.error('knex', msg)
    mandatoryRequirements.forEach(requirement => requirement(knex, model));
    requirements.forEach(requirement => requirement(knex, model));
    return model
}
