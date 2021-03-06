import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../components/Auth.vue'
import AuthSuccess from '../components/AuthSuccess.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    component: Auth
  },
  {
    path: '/auth/success',
    component: AuthSuccess
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    name: 'Category',
    path: '/categories/:id',
    component: () => import('../views/Category.vue')
  },
  {
    name: 'Calendar',
    path: '/categories/:category/:id',
    component: () => import('../views/Calendar.vue')
  },
  {
    name: 'NewCalendar',
    path: '/calendars/new',
    component: () => import('../views/NewCalendar.vue')
  },
  {
    name: 'NewEvent',
    path: '/events/new',
    component: () => import('../views/NewEvent.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
