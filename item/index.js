const express = require('express')

const formatItem = require('../utils/format_item.js')

function init (steamWorkshop) {
  const app = express()

  app.get('/:id', function (req, res) {
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
