import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import $ from 'jquery'
import '../static/css/reset.css'
import ax from 'axios'

Vue.prototype.baseUrl = 'http://media.iszeng.cn/api/';
Vue.prototype.get = function (url, success, error) {
  ax.get('http://media.iszeng.cn/api/'+url).then(function (res) {
    success(res.data) && success
  })
    .catch(function (err) {
      error(err) && error
    })
};
Vue.use(VueRouter);
// Vue.use(ax)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
