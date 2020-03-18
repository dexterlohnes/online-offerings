import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false

Vue.use(firestorePlugin);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
