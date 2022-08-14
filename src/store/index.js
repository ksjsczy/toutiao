import { createStore } from 'vuex'
import localCache from '@/utils/localCache'

const TOKEN_KEY = 'TOUTIAO_USER'

export default createStore({
  state() {
    return {
      user: localCache.get(TOKEN_KEY),
    }
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data
      localCache.set(TOKEN_KEY, state.user)
    },
  },
  actions: {},
  modules: {},
})
