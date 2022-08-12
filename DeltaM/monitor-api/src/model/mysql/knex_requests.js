
module.exports = function (knex, model) {

    const LIMIT = 1000000

    const extract = (mysqlOutput) => {
        mysqlOutput = { ...mysqlOutput }
        return mysqlOutput
    }

    const extractAll = (mysqlOutput) => {
        return mysqlOutput.map((elem) => extract(elem))
    }

    const insert = (modelInput, isCreated) => {
        modelInput = { ...modelInput }
        for (let i in modelInput) {
            if (!modelInput[i])
                modelInput[i] = null
        }
        if (modelInput.date) {
            const date = modelInput.date
            modelInput.date = new Date()
            modelInput.date.setFullYear(parseInt(date.split('/')[2]), parseInt(date.split('/')[1]) - 1, parseInt(date.split('/')[0]))
            modelInput.exact_date = new Date(parseInt(modelInput.exact_date))
        }
        delete modelInput.createdAt
        delete modelInput.updatedAt
        if (isCreated)
            modelInput.createdAt = knex.fn.now()
        modelInput.updatedAt = knex.fn.now()
        return modelInput
    }

    model.getRequests = (dataGet, callback) => {
        // console.log({ dataGet })
        const { id, name, method, project, date, result } = dataGet
        const limit = dataGet.limit || 10
        const offset = dataGet.offset || 0
        let q = knex.select().from("Requests")
        if (id) {
            q = q.where({ id })
        }
        if (name) {
            q = q.where({ name })
        }
        if (method) {
            q = q.where({ method })
        }
        if (project) {
            q = q.where({ project })
        }
        if (result) {
            q = q.where("result", "like", `%${result}%`)
        }
        if (date) {
            const start = new Date()
            start.setFullYear(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0])
            start.setHours(0, 0, 1)
            const end = new Date(start)
            end.setHours(23, 59, 59)
            q = q.where('createdAt', '>=', start)
            q = q.where('createdAt', '<=', end)
        }
        console.log(q.toSQL())
        let q2 = q.clone()
        q = q.count('* as c')
        q.then(function (rows) {
            q2 = q2.select()
            if (dataGet.sort_field === 'id' && dataGet.sort_order === 'DESC')
                q2 = q2.orderBy('id', 'desc')
            else if (dataGet.sort_field === 'id' && dataGet.sort_order === 'ASC')
                q2 = q2.orderBy('id', 'asc')
            else if (dataGet.sort_field === 'createdAt' && dataGet.sort_order === 'DESC')
                q2 = q2.orderBy('createdAt', 'desc')
            else if (dataGet.sort_field === 'createdAt' && dataGet.sort_order === 'ASC')
                q2 = q2.orderBy('createdAt', 'asc')
            else if (dataGet.sort_field === 'updatedAt' && dataGet.sort_order === 'DESC')
                q2 = q2.orderBy('updatedAt', 'desc')
            else if (dataGet.sort_field === 'updatedAt' && dataGet.sort_order === 'ASC')
                q2 = q2.orderBy('updatedAt', 'asc')
            else
                q2 = q2.orderBy('id', 'desc')
            q2 = q2.limit(limit).offset(offset)
            q2.then(function (rows2) {
                rows2 = extractAll(rows2)
                callback(Math.min(LIMIT, rows[0].c), rows2)
                return null
            }).catch(function (err) {
                console.error("Knex Select Requests error", err)
                callback(0, []);
            });
        }).catch(function (err) {
            console.error("Knex Select Requests error", err)
            callback(0, []);
        });
    }

    const getTotal = (callback) => {
        let q = knex.select().from("Requests")
        q = q.count('* as c')
        q.then(function (rows) {
            callback(rows[0].c)
            return null
        }).catch(function (err) {
            console.error("Knex Select Requests error", err)
            callback(0, []);
        });
    }

    model.addRequest = (data, callback) => {
        // console.log({ data })
        knex("Requests").insert(insert(data, true)).then((rows) => {
            callback(rows[0])
            return null
        }).catch((err) => {
            console.error("Knex Insert Requests error ", err)
            callback(false);
        });
    }

    model.deleteRequest = (data, callback) => {
        // console.log({ data })
        const { id } = data
        knex("Requests").where({ id }).del().then((nb) => {
            callback(nb !== 0)
            return null
        }).catch((err) => {
            console.error("Knex Delete Requests error ", err)
            callback(false);
        });
    }

    model.deleteRequestLimit = (data, callback) => {
        // console.log({ data })
        const { limit } = data
        knex("Requests").limit(limit).del().then((nb) => {
            callback(nb !== 0)
            return null
        }).catch((err) => {
            console.error("Knex Delete Requests error ", err)
            callback(false);
        });
    }

    model.deleteAllRequests = (data, callback) => {
        // console.log({ data })
        knex("Requests").del().then((nb) => {
            callback(nb !== 0)
            return null
        }).catch((err) => {
            console.error("Knex Delete Requests error ", err)
            callback(false);
        });
    }

    model.updateRequest = (data, callback) => {
        // console.log({ data })
        const { id } = data
        knex("Requests").where({ id }).update(insert(data, false)).then((nb) => {
            callback(nb !== 0)
            return null
        }).catch((err) => {
            console.error("Knex Insert Requests error ", err)
            callback(false);
        })
    }

    setInterval(() => {
        getTotal((total) => {
            if (total > LIMIT) {
                model.deleteRequestLimit({ limit: total - LIMIT }, () => {})
            }
        })
    }, 24 * 3600 * 1000)
}

