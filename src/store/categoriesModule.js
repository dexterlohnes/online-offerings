import { DB } from '../firebase/firestore.js';
export const categoriesModule = {
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    fetchCategories(context) {
      context.commit('SET_LOADING', true);
      DB.collection("categories").get().then((querySnapshot) => {
        if (context.state.debug)
          console.log("Fetched categories");
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
  },
  getters: {
    categories(state) {
      return state.categories.filter(it => it);
    },
    category: (state) => (id) => {
      return state.categories.find(it => it.id === id);
    },
    categoryByName: (state) => (name) => {
      return state.categories.find(it => it.display_name === name);
    },
  }
};
