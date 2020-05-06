<template>
  <div class="container">
    <div class="header strong">Thanks for your order! We are preparing your items for shipping!</div>
    <div class="header strong">Your order number is {{ this.orderID }}</div>
    <rounded-button
      name="VIEW ORDER"
      v-on:press="pressViewOrder"
      class="btn-view-order"
      :variant="'outline'"
    />
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

export default {
  name: "order-complete",
  components: {
    RoundedButton
  },
  props: {
    orderDetails: {
      type: Object,
      default: () => {},
      required: true
    },
    orderID: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data() {
    return {
      stage: 0,
      shipping: {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    };
  },
  methods: {
    async pressViewOrder() {
      console.log("going to order details");

      // Go to order details page
      this.$router.push({
        name: "OrderDetails",
        params: { orderID: this.orderID }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  flex-direction: column;
}
.header {
  font-size: 1.2em;
}
.btn-view-order {
  width: 300px;
  margin-top: 20px;
}
</style>