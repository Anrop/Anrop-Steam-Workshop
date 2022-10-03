const assert = require('assert')
const request = require('supertest')
const dummyItem = require('./dummy_item')

const dummySteamWorkshop = {
  getPublishedFileDetails: function (id, cb) {
    return cb(null, [dummyItem])
  }
}

const dummyOperation = {
  id: 123,
  title: 'Dummy Operation'
}

const dummyOperationMods = [
  {
    id: 123,
    operation_id: 123,
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
    it('should respond with json', function (done) {
      request(app)
        .get('/123')
        .expect('Content-Type', 'text/html')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          assert.strict.match(res.text, /<meta name="arma:PresetName" content="Dummy Operation" \/>/)
          assert.strict.match(res.text, /<h1>Arma 3 Mods - Preset <strong>Dummy Operation<\/strong><\/h1>/)
          assert.strict.match(res.text, /<td data-type="DisplayName">SFP: Swedish Forces Pack<\/td>/)
          assert.strict.match(res.text, /<a href="http:\/\/steamcommunity.com\/sharedfiles\/filedetails\/\?id=826911897" data-type="Link">/)
          return done()
        })
    }, 10000)
  })
})
