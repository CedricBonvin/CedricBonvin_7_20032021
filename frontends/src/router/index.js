import Vue from 'vue'
import VueRouter from 'vue-router'
import connection from '../views/connection.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'connection',
    component: connection
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
    path: '/inscription',
    name: 'inscription',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/inscription.vue')
  },
  {
    path: '/mur',
    name: 'mur',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/mur.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
