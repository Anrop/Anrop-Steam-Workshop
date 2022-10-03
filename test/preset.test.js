const assert = require('assert')
const request = require('supertest')
const dummyItem = require('./dummy_item')

const dummySteamWorkshop = {
  getPublishedFileDetails: function (id, cb) {
    if (id === 826911897) {
      return cb(null, [dummyItem])
    }

    return cb(null, [{ result: 9 }])
  }
}

const dummyOperation = {
  id: 1,
  title: 'Dummy Operation'
}

const dummyOperationMods = [
  {
    id: 1,
    operation_id: 1,
    steam_workshop_id: 826911897
  },
  {
    id: 2,
    operation_id: 1,
    steam_workshop_id: 123
  }
]

const dummyOperationsApi = {
  fetchMods: function (id, cb) {
    return cb(null, dummyOperationMods)
  },
  fetchOperation: function (id, cb) {
    return cb(null, dummyOperation)
  }
}

const app = require('../preset')(dummySteamWorkshop, dummyOperationsApi)

describe('preset', function () {
  describe('GET /', function () {
    it('should respond with json', function () {
      return request(app)
        .get('/123')
        .expect('Content-Type', 'text/html')
        .expect(200)
        .then(function (res) {
          assert.strict.match(res.text, /<meta name="arma:PresetName" content="Dummy Operation" \/>/)
          assert.strict.match(res.text, /<h1>Arma 3 Mods - Preset <strong>Dummy Operation<\/strong><\/h1>/)
          assert.strict.match(res.text, /<td data-type="DisplayName">SFP: Swedish Forces Pack<\/td>/)
          assert.strict.match(res.text, /<a href="http:\/\/steamcommunity.com\/sharedfiles\/filedetails\/\?id=826911897" data-type="Link">/)
          assert.strict.match(res.text, /<td data-type="DisplayName">123<\/td>/)
          assert.strict.match(res.text, /<a href="http:\/\/steamcommunity.com\/sharedfiles\/filedetails\/\?id=123" data-type="Link">/)
        })
    }, 10000)
  })
})
