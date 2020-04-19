<template>
  <div class="cart" v-on-clickaway="close">
    <div class="head">
      <div
        class="title strong"
        v-if="!cartIsEmpty()"
      >YOUR CART ({{ this.$store.state.cart.length }})</div>
      <div class="clear-cart strong" v-if="!cartIsEmpty()" v-on:click="clearCart()">
        <font-awesome-icon :icon="['fa', 'times']" class="icon" />CLEAR
      </div>
    </div>

    <div class="items">
      <div class="item" v-for="(item, index) in this.$store.state.cart" :key="index">
        <div class="img">
          <img :src="getProductImg(item)" />
        </div>
        <div class="info">
          <div class="name strong">{{ item.name }}</div>
          <div class="cost">${{ calcItemCost(item) }}</div>
        </div>

        <div class="quantity">
          <font-awesome-icon
            :icon="['fa', 'minus-circle']"
            class="btn"
            v-on:click="updateQuantity(item, -1)"
          />
          <input type="text" v-model="item.quantity" @change="validateQuantity(item)" />
          <font-awesome-icon
            :icon="['fa', 'plus-circle']"
            class="btn"
            v-on:click="updateQuantity(item, 1)"
          />
        </div>
      </div>
    </div>

    <div class="cart-total" v-if="!cartIsEmpty()">
      TOTAL
      <div class="value strong">${{ this.$store.getters.cartTotal }}</div>
    </div>

    <!-- Button: Go to checkout -->
    <rounded-button
      name="GO TO CHECKOUT"
      v-if="!cartIsEmpty()"
      v-on:press="pressGoToCheckout"
      class="btn-checkout"
    />

    <!-- Empty cart -->
    <div class="cart-empty" v-if="cartIsEmpty()">
      <font-awesome-icon :icon="['fa', 'ghost']" class="icon" />
      <div class="msg">Wow, much empty. Go ahead and add some items to your cart.</div>
    </div>
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

// Clickaway
import { mixin as clickaway } from "vue-clickaway";

// Scroll
// import { PerfectScrollbar } from "vue2-perfect-scrollbar";

export default {
  mixins: [clickaway],
  name: "cart-mini",
  props: {},
  components: {
    RoundedButton
    // PerfectScrollbar
  },
  data() {
    return {
      scrollBarOptions: {
        wheelSpeed: 1,
        suppressScrollX: true
      }
    };
  },
  methods: {
    getProductImg(item) {
      if (Object.prototype.hasOwnProperty.call(item, "img") == false) {
        return null;
      }
      return require("@/assets/products/" + item.img);
    },
    pressGoToCheckout() {
      console.log("Going to checkout.");
    },
    updateQuantity(item, amt) {
      if (item.quantity + amt > 0) {
        item.quantity += amt;
      } else {
        // Remove from cart
        this.$store.dispatch({
          type: "removeItemFromCart",
          item: item
        });
      }
    },
    calcItemCost(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    validateQuantity(item) {
      var quantity = item.quantity;
      if (quantity < 0) {
        // Remove negative
        console.log("negative");
        item.quantity = quantity * -1;
      } else if (quantity == 0) {
        this.$store.dispatch({
          type: "removeItemFromCart",
          item: item
        });
      }
    },
    cartIsEmpty() {
      if (this.$store.state.cart.length < 1) {
        return true;
      }
      return false;
    },
    clearCart() {
      this.$store.dispatch({
        type: "clearCart"
      });
    },
    async getCartTotal() {
      var total = await this.$store.dispatch({
        type: "calcCartTotal"
      });
      return total;
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  width: 400px;
  padding: 10px 15px 20px 15px;
  background-color: white;
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.15);
  border-radius: 10px;
  position: absolute;
  right: 40px;
  top: 70px;
  z-index: 100;
  cursor: default !important;
  max-height: 60%;
  min-height: 190px;
  flex-direction: column;
}

.head {
  font-size: 0.5em;
  color: grey;
  padding: 5px 20px 0 20px;
  justify-content: space-between;
  align-content: center;

  .title {
  }
  .clear-cart {
    background-color: $light-grey;
    padding: 3px 9px 3px 9px;
    border-radius: 10px;
    color: white;
    opacity: 0.7;
    transition: 0.2s;
    cursor: pointer;
    align-items: center;

    .icon {
      font-size: 1em;
      margin-right: 4px;
    }
  }
  .clear-cart:hover {
    opacity: 1;
    background-color: $purple;
  }
}

.items {
  flex-direction: column;
  overflow-y: auto;
  overflow-x: none;
}

/* Item */
.cart .item {
  padding: 20px;
  color: $black;
  font-size: 0.65em;

  .info {
    flex-direction: column;
    margin-left: 23px;
    justify-content: center;
    .name {
      text-align: left;
      margin-bottom: 6px;
    }
    .cost {
      font-size: 0.9em;
    }
  }

  .quantity {
    margin-left: auto;
    align-items: center;
    font-size: 0.9em;
    margin-top: 5px;
    user-select: none;

    .btn {
      font-size: 1.4em;
      color: $light-grey;
      padding: 0px 8px 0px 8px;
      cursor: pointer;
      transition: 0.2s;
    }
    .btn:hover {
      color: $grey;
    }

    input {
      width: 20px;
      border: 1px solid rgb(223, 223, 223);
      padding: 5px;
    }
  }

  .img {
    width: 15%;
    padding: 0px;
    align-items: center;
    justify-content: center;
    img {
      width: 95%;
      height: 95%;
      object-fit: contain;
      transition: 0.2s;
    }
  }
}

.btn-checkout {
  margin-top: auto;
  border-radius: 7px;
  width: 90%;
  margin-top: 24px;
  align-self: center;
}

.cart-empty {
  color: $light-grey;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px 30px 0px;
  .msg {
    font-size: 0.77em;
    margin-top: 21px;
    width: 60%;
    line-height: 26px;
  }
  .icon {
    font-size: 2em;
  }
}

.cart-total {
  color: $grey;
  font-size: 0.6em;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 10px 0 0;

  .value {
    font-size: 1.2em;
    padding: 0 0 0 6px;
    color: $green;
  }
}
</style>
