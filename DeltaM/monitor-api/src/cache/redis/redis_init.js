
const redis = require("redis")

const mandatoryRequirements = [
    require('./redis_testConnection')
]

module.exports = (config, requirements = []) => {
    const model = {}
    const client = redis.createClient({
        host : config.host,
        port : config.port,
        password : config.password,
        connect_timeout : config.connect_timeout,
        retry_strategy: function(options) {
            if (options.error && options.error.code === "ECONNREFUSED") {
                return new Error("The server refused the connection");
            }
            if (options.error && options.error.code === "NOAUTH") {
                return new Error("Authentication fail");
            }
            return 1000
        }
    })
    mandatoryRequirements.forEach(requirement => requirement(client, model));
    requirements.forEach(requirement => requirement(client, model));
    return model
}
