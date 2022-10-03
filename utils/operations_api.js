const request = require('request')

const API_BASE_URL = 'https://api.anrop.se/operations/'

module.exports.fetchMods = function (id, callback) {
  request.get({ url: API_BASE_URL + id + '/steam_workshop', json: true }, function (err, response, mods) {
    callback(err, mods)
  })
}

module.exports.fetchOperation = function (id, callback) {
  request.get({ url: API_BASE_URL + id, json: true }, function (err, response, operation) {
    callback(err, operation)
  })
}
