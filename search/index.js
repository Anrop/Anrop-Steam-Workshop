const express = require('express')

const cache = require('../cache')
const createQuery = require('./create_query')
const fuzzySearch = require('./fuzzy_search')
const formatItem = require('../utils/format_item.js')

const CACHE_SEARCH_RESPONSE_DURATION = 60 * 60 // 1h

function init (steamWorkshop) {
  const app = express()

  app.get('/', cache(CACHE_SEARCH_RESPONSE_DURATION), function (req, res) {
    const text = req.query.q

    if (!text) {
      res.status(400).send('Missing text')
      return
    }

    steamWorkshop.queryFiles(createQuery(text), function (err, items) {
      if (err) {
        console.log('Search failed with error:', err)
        return res.status(500).send([])
      }

      // Remove missions from result, missions contains a filename, mods don't
      items = items.filter(function (item) {
        return item.result === 1 && !item.filename
      })

      // Format each item into common format
      items = items.map(formatItem)

      // Filter and sort items based on fuzzy search
      items = fuzzySearch(items, text)

      return res.send(items)
    })
  })

  return app
}

module.exports = init
