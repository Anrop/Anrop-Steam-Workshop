const express = require('express')

const cache = require('../cache')
const formatItem = require('../utils/format_item.js')

const CACHE_INFO_RESPONSE_DURATION = 60 * 60 // 1h

function init (steamWorkshop) {
  const app = express()

  app.get('/:id', cache(CACHE_INFO_RESPONSE_DURATION), function (req, res) {
    const id = req.params.id

    steamWorkshop.getCollectionDetails(id, function (err, items) {
      if (err) {
        console.log('Get Steam Workshop item with id ' + id + ' failed with error:', err)
        return res.status(404).send({})
      }

      if (!Array.isArray(items[0].children)) {
        return res.status(404).send([])
      }

      if (items[0].children.length === 0) {
        return res.send([])
      }

      const ids = items[0].children.map(function (file) {
        return file.publishedfileid
      })

      steamWorkshop.getPublishedFileDetails(ids, function (err, items) {
        if (err) {
          console.log('Get Steam Workshop item with id ' + id + ' failed with error:', err)
          return res.status(404).send({})
        }

        return res.send(items.map(formatItem))
      })
    })
  })

  return app
}

module.exports = init
