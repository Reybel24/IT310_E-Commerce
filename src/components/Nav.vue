<template>
  <div class="hero">
    <div class="app-name strong">
      <font-awesome-icon :icon="['fa', 'hat-cowboy']" class="icon" />Sock & Monkey
    </div>

    <search-bar />

    <!-- Shoppin cart (mini) -->
    <transition name="fade">
      <cart-mini v-if="cartIsOpen" v-on:close="cartIsOpen=false" />
    </transition>

    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <router-link to="/products">Browse</router-link>
      <router-link to="/my-orders">My Orders</router-link>
      <div class="cart" v-on:click="toggleShoppingCart()" :class="{ 'anim-grow-shrink': isAnim }">
        <font-awesome-icon :icon="['fa', 'shopping-bag']" class="icon" />
        <div class="text strong">{{ cartItemsCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// Search bar
import SearchBar from "@/components/SearchBar.vue";

// Mini cart
import CartMini from "@/components/CartMini.vue";

import { mapGetters } from "vuex";

export default {
  name: "navbar",
  props: {},
  data() {
    return {
      cartIsOpen: false,
      isAnim: false
    };
  },
  components: {
    SearchBar,
    CartMini
  },
  methods: {
    toggleShoppingCart() {
      this.cartIsOpen = !this.cartIsOpen;
    }
  },
  computed: {
    ...mapGetters({
      cartItemsCount: "countItemsInCart"
    })
  },
  watch: {
    cartItemsCount: function() {
      // console.log("cart updated!");
      this.isAnim = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.hero {
  background-color: $purple;
  padding: 25px 30px 20px 30px;
  justify-content: space-between;
  border-bottom: 5px solid $dark-purple;
}
#nav {
  display: flex;
  align-items: center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  color: white;
  padding: 5px 6px 5px 6px;
}
#nav a.router-link-exact-active {
}

.app-name {
  color: white;
  font-size: 1em;
  align-items: center;
}
.app-name .icon {
  font-size: 1.7em;
  margin-right: 14px;
}

.search-bar {
  width: 60%;
  height: 39px;
}
.search-bar > input {
  width: 100%;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  border: none;
  padding: 0px 20px 0px 20px;
  font-size: 0.9em;
  color: $black;
  overflow: hidden;
}
.search-bar > input::placeholder {
  color: $light-grey;
}
.search-bar > input:focus {
  outline: none;
}
.search-bar .icon {
}

.btn-search {
  width: 80px;
  height: 100%;
  background-color: $dark-purple;
  border-radius: 0px 30px 30px 0px;
  color: white;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 1px 0px;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0.85;
}
.btn-search:hover {
  opacity: 1;
}

.cart {
  color: white;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.15s;

  font-size: 1.4em;

  .text {
    color: white;
    font-size: 0.6em;
    margin-left: 5px;
  }

  .icon {
    font-size: 1.6em;
    margin-left: 10px;
  }
}
.cart:hover {
  color: $dark-purple;

  .text {
    color: white;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.anim-grow-shrink {
  animation-name: grow-shrink;
  animation-duration: .4s;
}
@keyframes grow-shrink {
  from {
    transform: scale(.8, .8);
  }
  to {
    transform: scale(1, 1);
  }
}
</style>
