import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import {store} from './store/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})