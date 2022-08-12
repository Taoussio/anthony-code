
const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASSWORD
const connect_timeout = 10000

module.exports = () => {
    return require('./redis_init')({ host, port, password, connect_timeout }, [
        (client, cache) => {
            cache.set = (key, value, seconds) => new Promise(resolve => {
                if (client.ready) {
                    value = JSON.stringify(value)
                    try {
                        client.set(key, value, 'EX', seconds, (err) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false })
                        });
                    } catch (err) {
                        console.error("err", err)
                        return resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.get = (key) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.get(key, (err, value) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            try {
                                resolve({ err: false, value: JSON.parse(value) })
                            } catch (e) {
                                console.error("err", e)
                                resolve({ err: true })
                            }
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.expire = (key, seconds) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.expire(key, seconds, (err) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.push = (listname, value) => new Promise(resolve => {
                if (client.ready) {
                    value = JSON.stringify(value)
                    try {
                        client.rpush(listname, value, (err) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
                value = JSON.stringify(value)
            })

            cache.pop = (listname) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.rpop(listname, (err, value) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false, value: JSON.parse(value) })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.unshift = (listname, value) => new Promise(resolve => {
                if (client.ready) {
                    value = JSON.stringify(value)
                    try {
                        client.lpush(listname, value, (err) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.shift = (listname) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.lpop(listname, (err, value) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false, value: JSON.parse(value) })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.size = (listname) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.llen(listname, (err, value) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false, value })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.range = (listname, offset, limit) => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.lrange(listname, offset, offset + limit, (err, values) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false, values: values.map(value => JSON.parse(value)) })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

            cache.flushall = () => new Promise(resolve => {
                if (client.ready) {
                    try {
                        client.flushall((err) => {
                            if (err) {
                                console.error("err", err)
                                return resolve({ err: true })
                            }
                            resolve({ err: false })
                        })
                    } catch (err) {
                        console.error("err", err)
                        resolve({ err: true })
                    }
                } else {
                    resolve({ err: { msg: 'not ready' } })
                }
            })

        }
    ])
}
