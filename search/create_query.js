module.exports = function (text) {
  return {
    appid: 107410,
    key: process.env.STEAM_WEB_API_KEY,
    numperpage: 100,
    return_metadata: 1,
    return_short_description: 1,
    search_text: text
  }
}
