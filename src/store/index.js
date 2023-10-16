import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sign: false,
    token: '',
    dataList: [],
    imageName: '',
    image01Url: '',
    image02Url: '' || null
  },
  getters: {
  },
  mutations: {
    addtoken(state, outtoken){
      state.token = outtoken
    },
    setImage01Url(state, url)
    {
      state.image01Url = url
    }
    ,
    setImage02Url(state, url)
    {
      state.image02Url = url
    },
    setImageName(state, name)
    {
      state.imageName = name
    }
  },
  actions: {
  },
  modules: {
  }
})
