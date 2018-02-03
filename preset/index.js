const async = require('async')
const express = require('express')
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
const request = require('request')
const slugify = require('slugify')

const templateFile = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8')
const template = handlebars.compile(templateFile)

const API_BASE_URL = 'https://api.anrop.se/operations/'

function init (steamWorkshop) {
  function resolveMod (mod, callback) {
    const id = mod.steam_workshop_id
    steamWorkshop.getPublishedFileDetails(id, function (err, items) {
      if (err) {
        console.error('Get Steam Workshop item with id ' + id + ' failed with error:', err)
        return callback(err)
      }

      const item = items[0]

      if (item.result !== 1) {
        return callback(new Error('Mod ' + id + ' not found'))
      }

      return callback(null, item)
    })
  }

  function resolveMods (mods, callback) {
    async.map(mods, resolveMod, callback)
  }

  function fetchMods (id, callback) {
    request.get({ url: API_BASE_URL + id + '/steam_workshop', json: true }, function (err, response, mods) {
      if (err) {
        return callback(err)
      }

      resolveMods(mods, callback)
    })
  }

  function fetchOperation (id, callback) {
    request.get({ url: API_BASE_URL + id, json: true }, function (err, response, operation) {
      callback(err, operation)
    })
  }

  const app = express()

  app.get('/:id', function (req, res) {
    const id = req.params.id

    async.parallel({
      mods: function (callback) {
        fetchMods(id, callback)
      },
      operation: function (callback) {
        fetchOperation(id, callback)
      }
    }, function (err, result) {
      if (err) {
        console.error(err)
        return res.status(500).send()
      }

      const html = template(result)
      const slug = slugify(result.operation.title)

      res.setHeader('Content-Type', 'text/html')
      res.setHeader('Content-Disposition', 'attachment; filename=' + slug + '.html')

      res.send(Buffer.from(html))
    })
  })

  return app
}

module.exports = init
