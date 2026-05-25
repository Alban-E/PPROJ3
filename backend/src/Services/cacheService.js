const {LRUCache} = require('lru-cache')

// Cache 250 entries / during 1 day / refresh ttl on get
const cache = new LRUCache({
    max: 250,
    ttl: 1000 * 60 * 60 * 24,
    updateAgeOnGet: true,
})

const get = (key) => {
    return cache.get(key)
}

const set = (key, value) => {
    return cache.set(key, value)
}

const remove = (key) => {
    return cache.delete(key)
}

const clear = () => {
    return cache.clear()
}

const getStats = () => {
  return {
    size: cache.size,
    capacity: cache.max,
  };
};

module.exports = {get, set, remove, clear, getStats}