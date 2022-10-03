require('dotenv').config()

if (process.env.NEW_RELIC_LICENSE_KEY && process.env.NEW_RELIC_APP_NAME) {
  require('newrelic')
}

const express = require('express')
const cors = require('cors')
const SteamWorkshop = require('steam-workshop')

const operationsApi = require('./utils/operations_api')

const steamWorkshop = new SteamWorkshop()

const app = express()
app.use(cors())

app.get('/', function (req, res) {
  res.send('hello world!')
})

app.use('/collection', require('./collection')(steamWorkshop))
app.use('/item', require('./item')(steamWorkshop))
app.use('/preset', require('./preset')(steamWorkshop, operationsApi))
app.use('/search', require('./search')(steamWorkshop))

app.listen(process.env.PORT || 3000)
