/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// Axios
const axios = require('axios');

// Router
// import router from "@/router/index,js";

// Common utility functions
import { delay, getProducts, getProduct, fetchProductImg, getProductReviews, getUser, getUserImg, getRelatedProducts } from "@/util/common.js";

export default new Vuex.Store({
  state: {
    // Shopping cart
    cart: [],
    api_base: "https://web.njit.edu/~sm2327/backstore.php"
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push({
        itemID: item.itemID,
        name: item.name,
        price: item.price,
        quantity: 1,
        img: item.img
      });
    },
    removeFromCart(state, item) {
      // Find in cart
      state.cart.forEach(function (value, index) {
        if (item.itemID == value.itemID) {
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
      // console.log(payload.item)
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
        if (payload.item.itemID == item.itemID) {
          return item;
        }
      }
      return null;
    },
    async fetchProducts_local({ commit, state }, payload) {
      // Simulate network delay
      await delay(250);

      // Get all product from "api"
      var products = await getProducts();
      return products;
    },
    async fetchProducts({ commit, state }, payload) {
      return new Promise((resolve) => {
        // Get all product from api
        const formData = new FormData();
        formData.append("postType", "product_list");

        axios.post(this.state.api_base, formData)
          .then(response => {
            console.log(response.data);
            resolve(response.data);
          }, function (error) {
            console.log(error);
          });
      })
    },
    async fetchProduct_local({ commit, state }, payload) {
      // Simulate network delay
      await delay(250);

      // Get product data from "api"
      var id = payload.id;
      var product = await getProduct(id);
      return product;
    },
    async fetchProduct({ commit, state }, payload) {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("postType", "get_product");
        formData.append("productID", payload.productId);

        axios.post(this.state.api_base, formData)
          .then(response => {
            // console.log(response.data[0]);
            resolve(response.data[0]);
          }, function (error) {
            console.log(error);
          });
      })
    },
    async fetchOrderById({ commit, state }, payload) {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("postType", "get_order");
        formData.append("orderID", payload.orderID);

        axios.post(this.state.api_base, formData)
          .then(response => {
            console.log(response.data);
            resolve(response.data);
          }, function (error) {
            console.log(error);
          });
      })
    },
    async fetchOrdersByName({ commit, state }, payload) {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("postType", "get_order_by_name");
        formData.append("fname", payload.firstName);
        formData.append("lname", payload.lastName);
        formData.append("zip", payload.zipCode);

        axios.post(this.state.api_base, formData)
          .then(response => {
            // console.log(response.data);
            resolve(response.data);
          }, function (error) {
            console.log(error);
          });
      })
    },
    async checkoutCart({ commit, state }, payload) {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("postType", "place_order");
        formData.append("total", 35.07);
        formData.append("fname", payload.shipping.firstName);
        formData.append("lname", payload.shipping.lastName);
        formData.append("age", 22);
        formData.append("address", payload.shipping.street);
        formData.append("city", payload.shipping.city);
        formData.append("state", payload.shipping.state);
        formData.append("zip", payload.shipping.zipCode);
        formData.append("cart", JSON.stringify({results: payload.items }));
        var testVar = {results: payload.items };
        console.log(testVar)

        // Cart items
        console.log(this.state.cart);
        // formData.append("cart", this.state.cart);

        axios.post(this.state.api_base, formData)
          .then(async response => {
            console.log(response.data);

            // Clear the cart
            await this.dispatch({
              type: "clearCart",
            });

            resolve(response.data);
          }, function (error) {
            console.log(error);
          });
      })
    },
    async fetchProductReviews({ commit, state }, payload) {
      // Simulate network delay
      await delay(300);

      // Get product reviews from "api"
      var id = payload.id;
      var reviews = await getProductReviews(id);

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
    },
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
    // Get entire cart
    cart: state => {
      return state.cart;
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