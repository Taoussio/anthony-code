
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000
const sql_model = require('./model/mysql/knex_model')([
  require('./model/mysql/knex_requests'),
])
const redis_cache = require('./cache/redis/redis_cache')()

const model = sql_model
const cache = redis_cache

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }))

app.get('/test', (req, res) => {
  res.send({
    result: 'success'
  })
})

app.get('/status', (req, res) => {
  sql_model.testConnection((err, message, info) => {
    redis_cache.testConnection((err2, message2, info2) => {
      res.send({
        mysql: {
          message,
          info
        },
        redis: {
          message: message2,
          info: info2
        },
      })
    })
  })
})

app.get('/requests', (req, res) => {
  model.getRequests(req.query, (total, data) => {
    res.send({
      result: 'success',
      total,
      data
    })
  })
})

const parse2 = (result) => {
  try {
    return JSON.parse(result)
  } catch (e) {
    return null
  }
}

app.get('/errors', (req, res) => {
  const d = new Date(Date.now() - 24 * 3600 * 1000)
  model.getRequests({ date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`, limit: 200000, result: '{"status":"error"' }, (total, data) => {
    const errors = data.map(elem => parse2(elem.result)).filter(e => !!e)
    const messageErrors = {}
    for (let i = 0; i < errors.length; i++) {
      if (!messageErrors[errors[i].message]) {
        messageErrors[errors[i].message] = {
          id: Math.random(),
          message: errors[i].message,
          count: 1
        }
      } else {
        messageErrors[errors[i].message].count++
      }
    }
    res.send({
      result: 'success',
      total: Object.values(messageErrors).length,
      data: Object.values(messageErrors).filter((_, i) => i >= req.query.offset && i < req.query.offset + req.query.limit)
    })
  })
})

app.post('/request', (req, res) => {
  model.addRequest(req.body, id => {
    if (!id) {
      req.body.result = "Invalid encoding"
      model.addRequest(req.body, id => {
        res.send({
          result: 'success',
          id
        })
      })
    } else {
      res.send({
        result: 'success',
        id
      })
    }
  })
})


app.put('/request', (req, res) => {
  model.updateRequest(req.body, () => {
    res.send({
      result: 'success',
    })
  })
})

app.delete('/request', (req, res) => {
  model.deleteRequest(req.body, () => {
    res.send({
      result: 'success',
    })
  })
})

app.delete('/requests', (req, res) => {
  model.deleteAllRequests(req.body, () => {
    res.send({
      result: 'success',
    })
  })
})

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

"Property values were not valid: [{\"isValid\":false,\"message\":\"Property \\\"egi_opo_8mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_8mmax\"},{\"isValid\":false,\"message\":\"Property \\\"egi_opo_18mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_18mmax\"}]"
"Property values were not valid: [{\"isValid\":false,\"message\":\"Property \\\"egi_opo_8mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_8mmax\"},{\"isValid\":false,\"message\":\"Property \\\"egi_opo_18mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_18mmax\"}]"

"Property values were not valid: [{\"isValid\":false,\"message\":\"Property \\\"egi_opo_18mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_18mmax\"},{\"isValid\":false,\"message\":\"Property \\\"egi_opo_8mmax\\\" does not exist\",\"error\":\"PROPERTY_DOESNT_EXIST\",\"name\":\"egi_opo_8mmax\"}]"
