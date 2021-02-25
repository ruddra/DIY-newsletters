const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router();

const { API_KEY, DOMAIN, MAILING_LIST } = process.env

const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN })


const list = mailgun.lists(`${MAILING_LIST}@${DOMAIN}`);

router.post('/', (req, res) => {
  let { name, address } = req.body
  let user = {
    subscribed: true,
    name: name,
    address: address
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