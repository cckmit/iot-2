import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modals';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CurrentRegions: []
  },
  mutations: {
    set_CurrentRegions(state, val) {
      state.CurrentRegions = val;
    }
  },
  actions: {

  },
  modules: {
    modal
  }
})
