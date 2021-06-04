/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-theme-dark'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import './assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/display.css'
import JSMpeg from './assets/js/jsmpeg.min'

Vue.config.productionTip = false
Vue.use(ElementUI)

const socket = io('http://videostream.fidodarts.com:8007')
Vue.use(VueSocketIOExt, socket)

Vue.mixin({
  data: function() {
    return {
      me: {
        id: '',
        no: '',
        mac: ''
      },
      touchDevice: ('ontouchstart' in window || navigator.msMaxTouchPoints) || false
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/* eslint-enable */
