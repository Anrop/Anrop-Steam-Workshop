const Fuse = require('fuse.js')

const options = {
  shouldSort: true,
  tokenize: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title'
  ]
}

module.exports = function (items, text) {
  const fuse = new Fuse(items, options)
  return fuse.search(text)
}
