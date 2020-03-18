import Vue from 'vue'
import Vuex from 'vuex'
import { categoriesModule } from './categoriesModule'
import { calendarsModule } from './calendarsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    loading: false,
    events: [],
    flash: null
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_FLASH(state, flash) {
      console.log("Set flash to", flash)
      state.flash = flash;
    }
  },
  actions: {
    clearFlash({commit, state}) {
      if(state.debug) console.log("Clearing flash")
      commit('SET_FLASH', null)
    },
  },
  getters: {
    flash(state) {
      console.log("Returning flash:", state.flash)
      return state.flash;
    }
  },
  modules: {
    categories: categoriesModule,
    calendars: calendarsModule
  }
})
