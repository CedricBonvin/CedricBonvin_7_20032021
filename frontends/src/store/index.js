import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo : "",
    idUser : null,
    email : "",
    photoProfil : "",
    photoProfilMessage : "",

    idMessage : 0,

    isAdmin : true 
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
