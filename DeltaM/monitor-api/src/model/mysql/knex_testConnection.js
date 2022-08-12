
const errors = {
    'ETIMEDOUT' : {
        message : 'Knex Connection Timeout',
        result : false
    },
    'ECONNREFUSED' : {
        message : 'Knex Connection Refused',
        result : false
    },
    'ER_ACCESS_DENIED_ERROR' : {
        message : 'Knex Connection Access Denied',
        result : false
    },
    'ER_BAD_DB_ERROR' : {
        message : 'Knex Connection Bad Database',
        result : false
    },
    'ER_NO_TABLES_USED' : {
        message : 'Knex Connection Success',
        result : true
    }
}

module.exports = (knex, model) => {

    model.testConnection = (callback) => {
        knex.select('').then((rows) => {
            callback(true, "Knex Connection Success")
        }).catch((err) => {
            const error = errors[err.code]
            if (error) {
                callback(error.result, error.message, error.result ? undefined : err)
            } else {
                callback(false, 'Knex Connection Fail', err)
            }
        });
    }

}
