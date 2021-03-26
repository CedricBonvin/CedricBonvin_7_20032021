import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPseudo : ""
    
  },
  mutations: {
    AFFICHE_USER(state){
      state.userPseudo = JSON.parse(localStorage.getItem("pseudo"))
    }
  },
  actions: {
  },
  modules: {
  }
})
