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
    calendars: []
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
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
    }
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    category: (state) => (id) => {
      return state.categories.find(it => it.id === id);
    }
  },
  modules: {
  }
})
