const request = require('supertest')
const dummyItem = require('./dummy_item')

const dummySteamWorkshop = {
  queryFiles: function (query, cb) {
    return cb(null, [dummyItem])
  }
}

const app = require('../search')(dummySteamWorkshop)

describe('search', function () {
  describe('GET /', function () {
    it('should respond with json', function (done) {
      request(app)
        .get('/')
        .query({ q: 'sfp' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          return done()
        })
    }, 10000)
  })
})
