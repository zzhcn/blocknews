import Vue from 'vue'
import router  from 'vue-router'
import index from '../page/index.vue'
import login from '../page/login'
import find from '../page/find'
import about from '../page/about'
import exNoticeList from '../page/ex_notice_list'
import newsList from '../page/news_list'
import gusList from '../page/gus_list'
import user from '../page/user'
import blockList from '../page/block'
Vue.use(router );
export default new router ({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/find',
      name: 'find',
      component: find
    }, {
      path: '/about',
      name: 'about',
      component: about
    }, {
      path: '/exNoticeList',
      name: 'exNoticeList',
      component: exNoticeList
    }, {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    }, {
      path: '/gusList',
      name: 'gusList',
      component: gusList
    }, {
      path: '/user',
      name: 'user',
      component: user
    }, {
      path: '/blockList',
      name: 'blockList',
      component: blockList
    }

  ]
})
