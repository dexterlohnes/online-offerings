import { DB } from '../firebase/firestore.js';
export const calendarsModule = {
  state: {
    calendars: [],
  },
  mutations: {
    SET_CALENDARS(state, calendars) {
      console.log("Setting calendars to", calendars);
      state.calendars = calendars;
    },
  },
  actions: {
    fetchCalendars(context) {
      context.commit('SET_LOADING', true);
      DB.collectionGroup("calendars").get().then((querySnapshot) => {
        if (context.state.debug)
          console.log("Fetched all calendars");
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
    fetchCalendarsForCategory(context, id) {
      context.commit('SET_LOADING', true);
      DB.collection("categories").doc(id).collection("calendars").get().then((querySnapshot) => {
        if (context.state.debug)
          console.log("Fetched calendars for category", id);
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
    createCalendar({ commit }, cal) {
      console.log("a Create calendar", cal);
      commit('SET_LOADING', true);
      DB.collection("categories").doc(cal.category.id)
        .collection("calendars").doc(cal.id).set({
          display_name: cal.name,
          collection: cal.category.id,
          visible: true // User is admin?
        })
        .then(function () {
          console.log("Created calendar event");
          commit('SET_FLASH', { type: 'success', message: `Calendar "${cal.name}" created` });
        })
        .catch(function (error) {
          console.log("Failed to create calendar event:", error);
          commit('SET_FLASH', { type: 'error', message: 'Failed to create calendar: ' + JSON.stringify(error) });
        });
    }
  },
  getters: {
    calendarsForCategory: (state) => (id) => {
      return state.calendars.filter(it => it.collection === id);
    },
    calendars (state) {
      return state.calendars;
    }
  }
};
