<template>
  <div class="main">
    <div class="section header">YOUR ORDER</div>

    <div class="section cart">
      <!-- list items here -->
      <div class="item" v-for="(item, index) in this.order" :key="index">
        <div class="img">
          <img :src="getProductImg(item)" />
        </div>
        <div class="info">
          <div class="name strong">{{ item.name }}</div>

          <div class="size-color">SIZE M, DARK BROWN</div>
        </div>

        <div class="quantity">
          <font-awesome-icon
            :icon="['fa', 'minus-circle']"
            class="btn"
            v-on:click="updateQuantity(item, -1)"
            v-if="interactive"
          />
          <input type="text" v-model="item.quantity" @change="validateQuantity(item)" :disabled="!interactive" />
          <font-awesome-icon
            :icon="['fa', 'plus-circle']"
            class="btn"
            v-on:click="updateQuantity(item, 1)"
            v-if="interactive"
          />
        </div>

        <div class="cost">${{ calcItemCost(item) }}</div>
      </div>
    </div>

    <div class="section details-cost-breakdown strong">
      <div class="cost-item">
        <div class="label">TOTAL</div>
        <div class="value">${{ calcTotalCost() }}</div>
      </div>
      <div class="cost-item">
        <div class="label">YOU PAY</div>
        <div class="value">$0</div>
      </div>
    </div>
    <span class="small-text">You will only be charged for the items you keep <i>after</i> you have returned the items you don't want (if any).</span>
  </div>
</template>

<script>
// Common utility functions
import { fetchProductImg } from "@/util/common.js";

export default {
  name: "cart-summary",
  props: {
    order: {
      type: Array,
      default: () => [],
      required: true
    },
    interactive: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    getProductImg(prod) {
      return fetchProductImg(prod);
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
    calcTotalCost() {
      var total = 0;
      this.order.forEach(item => {
        console.log(item.quantity);
        total += (item.price * item.quantity);
      });
      return total.toFixed(2);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.main {
  flex-direction: column !important;
  margin-top: 0px !important;
}
.section {
  flex-direction: column;
  margin-bottom: 38px;
  font-size: 1em;

  .header {
    font-size: 0.8em;
    color: $grey;
    text-align: left;
    border-bottom: 1px solid rgb(223, 223, 223);
    padding: 0 0 7px 0px;
  }
}

.cart {
  .item {
    padding: 20px;
    height: 70px;
    color: $black;
    font-size: 0.9em;
    align-items: center;
    border-bottom: 1px solid rgb(235, 235, 235);
    margin-bottom: 60px;
    padding: 0 0 50px 0;

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
}

.details-cost-breakdown {
  flex-direction: column;

  .cost-item {
    color: black;
    justify-content: space-between;
    margin-bottom: 8px;

    .label {
    }
  }
}

.small-text {
  text-align: left;
  font-size: .9em;
  color: $grey;
}
</style>