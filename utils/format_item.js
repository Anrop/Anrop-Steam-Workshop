const filesize = require('filesize')

const BASE_URL = 'https://steamcommunity.com/sharedfiles/filedetails/'

module.exports = function (item) {
  return {
    created: item.created,
    description: item.short_description,
    fileSize: item.file_size,
    fileSizeFormatted: filesize(item.file_size),
    id: item.publishedfileid,
    image: item.preview_url,
    link: BASE_URL + item.publishedfileid,
    subscriptions: item.subscriptions,
    title: item.title,
    updated: item.updated
  }
}
