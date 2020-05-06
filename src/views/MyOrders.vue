<template>
  <div class="container">
    <div class="welcome strong">Hi, {{ getCustomerName() }}</div>
    <div class="header strong">YOUR ORDERS</div>
    <div class="orders" v-if="isReady">
      <div class="order" v-for="(order, index) in this.orders" :key="index">
        <div class="header">ORDER #{{ order[0].orderID }}<span class="date-time">ORDERED ON {{ formatDateTime(order[0].date_time) }}</span></div>
        <div class="item" v-for="(item, index) in order" :key="index">
          <div class="img">
            <img :src="getProductImg(item)" />
          </div>
          <div class="info">
            <div class="name strong">{{ item.name }}</div>

            <div class="size-color">SIZE M, DARK BROWN</div>
          </div>

          <div class="quantity">
            <input type="text" v-model="item.quantity" :disabled="true" />
          </div>

          <div class="cost">${{ calcItemCost(item) }}</div>

          <rounded-button
          name="RETURN"
          v-on:press="pressReturnItem"
          class="btn-return-item"
          :variant="'outline'"
        />
        </div>
      </div>

      <div class="empty" v-if="isReady && orders.length < 1">
        Looks like you haven't ordered anything yet
      </div>
    </div>
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

// Common utility functions
import { fetchProductImg } from "@/util/common.js";

// For date times
var moment = require('moment');

import Vue from "vue";

export default {
  name: "my-orders",
  components: {
    RoundedButton
  },
  data() {
    return {
      orders: {},
      allProducts: [],
      isReady: false
    };
  },
  methods: {
    async loadOrders() {
      if (!Vue.$cookies.isKey("firstName")) {
        return;
      }

      var _orders = await this.$store.dispatch({
        type: "fetchOrdersByName",
        firstName: Vue.$cookies.get("firstName"),
        lastName: Vue.$cookies.get("lastName"),
        zipCode: Vue.$cookies.get("zipCode")
      });

      // Group by order id
      var ordersGrouped = {};
      _orders.forEach(item => {
        // console.log(item.orderID);
        const orderId = item.orderID;

        // Grab product metadata
        var found = this.getProductDetails(item);
        if (!found) return;

        if (orderId in ordersGrouped) {
          // Order id exists
          ordersGrouped[orderId].push(item);
        } else {
          // Make new group for order id
          ordersGrouped[orderId] = [];
        }
      });

      this.orders = ordersGrouped;

      console.log(this.orders);
    },
    getProductDetails(product) {
      for (var item of this.allProducts) {
        if (product.itemID == item.itemID) {

          // Combine attributes
          product.name = item.name;
          product.img = item.img;
          product.quantity = product.item_AMT;
          product.price = product.total_price;

          return true;
        }
      }

      return false;

      // console.log(metadata)
    },
    getProductImg(prod) {
      return fetchProductImg(prod);
    },
    calcItemCost(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    async loadAllProducts() {
      this.allProducts = await this.$store.dispatch({
        type: "fetchProducts"
      });
    },
    formatDateTime(dateTime) {
      var _dateTime = new Date(dateTime);
      return moment(_dateTime, "MM-DD-YYYY");
    },
    pressReturnItem(item) {
      console.log("returning item: " + item.name);
    },
    getCustomerName() {
      return Vue.$cookies.get("firstName");
    }
  },
  async mounted() {
    await this.loadAllProducts();
    await this.loadOrders();

    this.isReady = true;

    console.log("done");
  }
};
</script>

<style scoped lang="scss">
.welcome {
  margin-bottom: 7px;
}
.header {
  margin-bottom: 20px;
  align-items: center;

  .date-time {
    font-size: .7em;
    color: rgb(182, 182, 182);
    margin-left: 18px;
  }
}
.orders {
  flex-direction: column;

  .order {
    flex-direction: column;
    margin-bottom: 40px;

    .header {
      font-size: 1.1em;
      color: grey;
      padding: 0 0 8px 0;
      border-bottom: 1px solid rgb(194, 194, 194);
      margin-bottom: 30px;
    }

    .item {
      margin-bottom: 15px;
      height: 70px;
      color: $black;
      font-size: 0.9em;
      align-items: center;
      border-bottom: 1px solid rgb(235, 235, 235);
      margin-bottom: 60px;
      padding: 0 0 30px 0;

      .info {
        flex-direction: column;
        margin-left: 23px;
        justify-content: center;

        .name {
          text-align: left;
          margin-bottom: 3px;
        }

        .size-color {
          font-size: 0.7em;
          color: $light-grey;
        }
      }

      .cost {
        font-size: 1em;
        margin-left: auto;
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
        height: 100%;
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

      .btn-return-item {
        margin-left: 80px;
      }
    }
  }
}

.cart {
  .item {
  }
}
</style>