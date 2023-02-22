const redis = require('../redis.js')

module.exports = {
  getFromCache: async (key) => {
    let cacheEntry = await redis.get(key)
    if (cacheEntry) {
      cacheEntry = JSON.parse(cacheEntry)
      return cacheEntry
    }
    return
  },
  setInCache: async (key, value) => {
    await redis.set(key, value, 'EX', 660)
    return
  }
}