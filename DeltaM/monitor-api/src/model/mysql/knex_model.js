const host = process.env.DB_HOST
const port = process.env.DB_PORT
const user = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const connect_timeout = 10000

module.exports = (requirements) => {
    return require('./knex_init')({ host, port, user, password, database, connect_timeout }, requirements)
}
