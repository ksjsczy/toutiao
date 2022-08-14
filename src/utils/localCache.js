class LocalCache {
  constructor() {
    this.cache = localStorage
  }

  set(key, value) {
    this.cache.setItem(key, JSON.stringify(value))
  }

  get(key) {
    return JSON.parse(this.cache.getItem(key))
  }
}

export default new LocalCache()
