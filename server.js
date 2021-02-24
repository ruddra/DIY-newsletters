const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router();

const { API_KEY, DOMAIN, MAILING_LIST } = process.env

const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN })


const list = mailgun.lists(`${MAILING_LIST}@${DOMAIN}`);

const template = {
  subscribed: true,
}

router.post('/', (req, res) => {
  let user = {
    ...template,
    ...req.body
  }
  list.members().create(user, function (error, data) {
    res.json({
      "success": true
    })
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)