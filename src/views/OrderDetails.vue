<template>
  <div class="container">
    <div class="checkout">Order #{{ this.orderID }}</div>

    <div class="main">
      <div class="section details" v-if="isReady">
        <div class="detail-item">{{ this.order.fname + " " + this.order.lname }}</div>
        <div class="detail-item strong">{{ this.order.street }}</div>
      <div class="detail-item strong">{{ this.order.city + ", " + this.order.state + " " + this.order.zip_code }}</div>
      <div class="detail-item strong">{{ this.order.country }}</div>
      <div class="detail-item strong">{{ this.order.email }}</div>
      </div>

      <div class="section order-items">
        <cart-summary v-if="isReady" :order="this.orderItems" :interactive="false" />
      </div>
    </div>
  </div>
</template>

<script>
import CartSummary from "./Checkout/CartSummary.vue";

export default {
  name: "checkout",
  components: {
    CartSummary
  },
  props: {
    orderID: {
      type: Number,
      default: 48,
      required: false
    }
  },
  data() {
    return {
      order: null,
      orderItems: [],
      isReady: false
    };
  },
  methods: {
    async loadOrder() {
      console.log("Loading order #" + this.orderID);
      this.order = await this.$store.dispatch({
        type: "fetchOrderById",
        orderID: parseInt(this.orderID)
      });

      console.log("order details below: ");
      console.log(this.order);

      this.buildItemsList(this.order);

      this.order = this.order[0];

      this.isReady = true;
    },
    async buildItemsList(order) {
      order.forEach(async element => {
        var item = await this.$store.dispatch({
          type: "fetchProduct",
          productId: parseInt(element.itemID)
        });

        if (item != 0) {
          // Combine attributes
          item.quantity = parseInt(element.item_AMT);
        }

        // Add to list
        if (item != 0) this.orderItems.push(item);
      });

      console.log(this.orderItems)
    }
  },
  mounted() {
    this.loadOrder();
  }
};
</script>

<style scoped lang="scss">
.main {
  flex-direction: row;
  min-height: 700px;
  margin-top: 20px;
  justify-content: space-between;
}
.section {
  flex-direction: column;
  height: 100%;
}
.entry {
  width: 45%;
  height: 100%;
}
.order-items {
  width: 45%;
  height: 100%;
}
.detail-item {
    font-size: 1;
    color: rgb(92, 92, 92);
    margin-bottom: 3px;
  }
</style>