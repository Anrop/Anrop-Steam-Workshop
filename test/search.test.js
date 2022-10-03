const assert = require('assert')
const request = require('supertest')
const dummyItem = require('./dummy_item')
const formatItem = require('../utils/format_item')

const dummySteamWorkshop = {
  queryFiles: function (query, cb) {
    return cb(null, [dummyItem])
  }
}

const app = require('../search')(dummySteamWorkshop)

describe('search', function () {
  describe('GET /', function () {
    it('should respond with json', function () {
      return request(app)
        .get('/')
        .query({ q: 'sfp' })
        .set('Accept', 'application/json')
        .expect(200)
        .then(function (res) {
          assert.strict.equal(res.text, JSON.stringify([formatItem(dummyItem)]))
        })
    }, 10000)
  })
})
