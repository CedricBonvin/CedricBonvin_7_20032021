import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo : "",
    clearPassword : "",
    idUser : null,
    email : "",
    photoProfil : "",

    idMessage : 0

    
  },
  mutations: {
    PUT_CLEAR_PASSWORD(state,password){
      state.clearPassword = password
    }
  },
  actions: {
  },
  modules: {
  }
})
