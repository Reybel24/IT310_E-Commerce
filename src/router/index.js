import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
