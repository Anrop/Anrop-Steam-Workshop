const request = require('supertest')
const dummyItem = require('./dummy_item')

const dummySteamWorkshop = {
  getCollectionDetails: function (id, cb) {
    return cb(null, [
      {
        publishedfileid: '123',
        result: 1,
        children: [
          {
            publishedfileid: '123',
            sortorder: 0,
            filetype: 0
          }
        ]
      }
    ])
  },
  getPublishedFileDetails: function (id, cb) {
    return cb(null, [dummyItem])
  }
}

const app = require('../collection')(dummySteamWorkshop)

describe('collection', function () {
  describe('GET /', function () {
    it('should respond with json', function (done) {
      this.timeout(10000)

      request(app)
        .get('/123')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          return done()
        })
    })
  })
})
