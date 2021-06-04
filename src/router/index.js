import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import View from '../views/View.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if(sessionStorage.getItem('id') === null) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if(sessionStorage.getItem('id') !== null) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/view',
    name: 'View',
    component: View,
    beforeEnter(to, from, next) {
      if(sessionStorage.getItem('id') === null) {
        next('/login')
      } else {
        next()
      }
    },
    props: (route) => ({ port: route.query.port, usb: route.query.usb })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
