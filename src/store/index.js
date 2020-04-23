/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// Router
// import router from "@/router/index,js";

// Common utility functions
import { delay, getProducts, getProduct, fetchProductImg, getProductReviews, getUser, getUserImg, getRelatedProducts } from "@/util/common.js";

// Moment
import moment from "moment";

export default new Vuex.Store({
  state: {
    // Shopping cart
    cart: [],
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        img: item.img
      });
    },
    removeFromCart(state, item) {
      // Find in cart
      state.cart.forEach(function (value, index) {
        if (item.id == value.id) {
          state.cart.splice(index, 1);
        }
      });
    },
    incrementItemInCart(state, item) {
      item.quantity++;
    },
    setCartTotal(state, amt) {
      state.cartTotal = amt;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async addItemToCart({ commit, state }, payload) {
      // api.addToCart(item);

      var item = payload.item;

      // Check if one of this item already exists in cart
      var existingItem = await this.dispatch({
        type: "findItemInCart",
        item: item
      });

      // Based on result, add to cart or increment quantity
      if (existingItem) {
        // Increase quantity by 1
        commit("incrementItemInCart", existingItem);
      } else {
        // Add new item to cart
        commit("addToCart", item);
      }
    },
    async removeItemFromCart({ commit, state }, payload) {
      // api.removeFromCart(item);

      var item = payload.item;

      // Add new item to cart
      commit("removeFromCart", item);
    },
    async clearCart({ commit, state }) {
      // Clear cart
      commit("clearCart");
    },
    findItemInCart({ commit, state }, payload) {
      for (let item of state.cart) {
        if (payload.item.id == item.id) {
          return item;
        }
      }
      return null;
    },
    async fetchProducts({ commit, state }, payload) {
      // Simulate network delay
      await delay(250);

      // Get all product from "api"
      var products = await getProducts();
      return products;
    },
    async fetchProduct({ commit, state }, payload) {
      // Simulate network delay
      await delay(250);

      // Get product data from "api"
      var id = payload.id;
      var product = await getProduct(id);
      return product;
    },
    async fetchProductReviews({ commit, state }, payload) {
      // Simulate network delay
      await delay(300);

      // Get product reviews from "api"
      var id = payload.id;
      var reviews = await getProductReviews(id);

      // Sort by date posted
      reviews = reviews.sort((a, b) => {
        // new moment(a.date_time).format('YYYYMMDD') - new moment(b.date_time).format('YYYYMMDD')
        // moment(a.date_time).diff(moment(b.date_time).format('YYYYMMDD'))
        moment(a.date_time).unix() - moment(b.date_time).unix()
      });

      return reviews;
    },
    async fetchUser({ commit, state }, payload) {
      // Get user
      var id = payload.id;
      var user = await getUser(id);
      return user;
    },
    async fetchUserImg({ commit, state }, payload) {
      // Get user
      var id = payload.id;
      var userImg = await getUserImg(id);
      return userImg;
    },
    async fetchProductImg({ commit, state }, payload) {
      // Get user
      var id = payload.id;
      var prodImg = await fetchProductImg(id);
      return prodImg;
    },
    async fetchRelatedProducts({ commit, state }, payload) {
      // Simulate network delay
      await delay(500);

      // Fetch products related to a product
      var id = payload.id;
      var related = await getRelatedProducts(id);
      return related;
    }
  },
  getters: {
    // Calculate cart total
    cartTotal: state => {
      var totalCost = 0;
      state.cart.map(item => {
        totalCost += item.price * item.quantity
      });
      return totalCost.toFixed(2);
    },
    countItemsInCart: state => {
      var count = 0;
      state.cart.map(item => {
        count += item.quantity
      });
      return count;
    }
  },
  modules: {
  }
})