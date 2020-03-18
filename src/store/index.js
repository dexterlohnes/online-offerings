import Vue from 'vue'
import Vuex from 'vuex'
import { DB } from '../firebase/firestore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: true,
    loading: false,
    categories: [],
    events: [],
    calendars: [],
    flash: null
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_CALENDARS(state, calendars) {
      console.log("Setting calendars to", calendars)
      state.calendars = calendars;
    },
    SET_FLASH(state, flash) {
      console.log("Set flash to", flash)
      state.flash = flash;
    }
  },
  actions: {
    fetchCategories(context) {
      context.commit('SET_LOADING', true)
      DB.collection("categories").get().then((querySnapshot) => {
        if(context.state.debug) console.log("Fetched categories");
        var objs = [];
        querySnapshot.forEach((doc) => {
          var obj = doc.data();
          obj.id = doc.id;
          objs.push(obj);
        });
        context.commit('SET_CATEGORIES', objs);
        context.commit('SET_LOADING', false);
      });
    },
    fetchCalendarsForCategory(context, id) {
      context.commit('SET_LOADING', true)
      DB.collection("categories").doc(id).collection("calendars").get().then((querySnapshot) => {
        if(context.state.debug) console.log("Fetched calendars for category", id);
        var objs = [];
        querySnapshot.forEach((doc) => {
          var obj = doc.data();
          obj.id = doc.id;
          objs.push(obj);
        });
        context.commit('SET_CALENDARS', objs);
        context.commit('SET_LOADING', false);
      });
    },
    clearFlash({commit, state}) {
      if(state.debug) console.log("Clearing flash")
      commit('SET_FLASH', null)
    },
    createCalendar({commit}, cal) {
      console.log("a Create calendar", cal)
      commit('SET_LOADING', true)
      DB.collection("categories").doc(cal.category.id)
      .collection("calendars").doc(cal.id).set({
        display_name: cal.name,
        collection: cal.category.id,
        visible: true // User is admin?
      })
      .then(function() {
        console.log("Created calendar event")
        commit('SET_FLASH', { type: 'success', message: `Calendar "${cal.name}" created`})
      })
      .catch(function(error) {
        console.log("Failed to create calendar event:", error)
        commit('SET_FLASH', { type: 'error', message: 'Failed to create calendar: ' + JSON.stringify(error)})
      })
    }
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    category: (state) => (id) => {
      return state.categories.find(it => it.id === id);
    },
    categoryByName: (state) => (name) => {
      return state.categories.find(it => it.display_name === name);
    },
    calendarsForCategory: (state) => (id) => {
      return state.calendars.filter(it => it.collection === id);
    },
    flash(state) {
      console.log("Returning flash:", state.flash)
      return state.flash;
    }
  },
  modules: {
  }
})
