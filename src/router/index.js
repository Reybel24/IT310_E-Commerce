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
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "product" */ '../views/Checkout'),
  },
  {
    path: '/order-complete',
    name: 'OrderComplete',
    component: () => import(/* webpackChunkName: "product" */ '../views/OrderComplete.vue'),
    props: true
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    component: () => import(/* webpackChunkName: "product" */ '../views/OrderDetails.vue'),
    props: true
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import(/* webpackChunkName: "product" */ '../views/MyOrders.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "product" */ '../views/SignIn.vue'),
  },
  {
    path: '/item-return',
    name: 'ItemReturn',
    component: () => import(/* webpackChunkName: "product" */ '../views/ItemReturn.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
