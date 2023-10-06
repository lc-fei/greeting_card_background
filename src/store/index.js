import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sign: false,
    token: localStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
    addtoken(state, outtoken){
      state.token = outtoken
    }
  },
  actions: {
  },
  modules: {
  }
})
