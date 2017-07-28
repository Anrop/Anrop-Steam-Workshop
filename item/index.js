const express = require('express')

const cache = require('../cache')
const formatItem = require('../utils/format_item.js')

const CACHE_INFO_RESPONSE_DURATION = 60 * 60 // 1h

function init (steamWorkshop) {
  const app = express()

  app.get('/:id', cache(CACHE_INFO_RESPONSE_DURATION), function (req, res) {
    const id = req.params.id

    steamWorkshop.getPublishedFileDetails(id, function (err, items) {
      if (err) {
        console.log('Get Steam Workshop item with id ' + id + ' failed with error:', err)
        return res.status(404).send({})
      }

      const item = items[0]

      if (item.result !== 1) {
        return res.status(404).send({})
      }

      return res.send(formatItem(item))
    })
  })

  return app
}

module.exports = init
