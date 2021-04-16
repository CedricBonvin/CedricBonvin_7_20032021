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
    path: '/inscription',
    name: 'inscription',
    component: () => import(/* webpackChunkName: "inscription" */ '../views/inscription.vue')
  },
  {
    path: '/mur',
    name: 'mur',
    component: () => import(/* webpackChunkName: "mur" */ '../views/mur.vue')
  },
  {
    path: '/commentaire/:id',
    name: 'commentaire',
    component: () => import(/* webpackChunkName: "commentaire" */ '../views/commentaire.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "commentaire" */ '../views/admin.vue')
  },
  {
    path: '/parametre',
    name: 'parametre',
    component: () => import(/* webpackChunkName: "parametre" */ '../views/parametre.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
