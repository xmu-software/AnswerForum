// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'

Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.prototype.axios = axios


axios.defaults.baseURL = 'http://8.129.163.25:8888'
axios.defaults.headers.post['Content-Type'] = 'application/json';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
