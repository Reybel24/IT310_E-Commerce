/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
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
    findItemInCart({ commit, state }, payload) {
      for (let item of state.cart) {
        if (payload.item.id == item.id) {
          return item;
        }
      }
      return null;
    },
    calcCartTotal({ commit, state }) {
      var total = + state.cart.map(item => {
        return item.price * item.quantity
      });
    }
  },
  modules: {
  }
})
