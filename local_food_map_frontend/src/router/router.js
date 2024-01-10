// router.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Join from '../views/Join.vue'
import StoreMap from '../views/StoreMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: Login
    },
    {
      path: '/join',
      name: 'UserJoin',
      component: Join
    },
    {
      path: '/map',
      name: 'MapPage',
      component: StoreMap
    }
  ]
})
