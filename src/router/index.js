import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/Login";
import Register from "../components/Register";
import Index from "../components/Index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
  ]
})
