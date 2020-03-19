import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import Vuex from 'vuex'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {Auth} from "./firebase/auth.js"


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(firestorePlugin);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    console.log("In created")
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/auth/success')
      } else {
        console.log("No User. Moving to auth...")
        this.$router.push('/auth')
      }
    })
  }
}).$mount('#app')
