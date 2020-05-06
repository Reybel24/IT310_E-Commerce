<template>
  <div class="container">
    <div class="header strong">CHECKOUT</div>

    <div class="main">
      <div class="section entry">
        <entry-shipping
          v-if="stage == 0"
          @navigate="navigateStages"
          @save-shipping="updateShipping"
        />
        <entry-payment
          v-if="stage == 1"
          @navigate="navigateStages"
          :shipping="shipping"
          @complete-order="onCompleteOrder"
        />
      </div>

      <div class="section order-items">
        <cart-summary :order="this.$store.getters.cart" />
      </div>
    </div>
  </div>
</template>

<script>
import EntryShipping from "./EntryShipping.vue";
import EntryPayment from "./EntryPayment.vue";
import CartSummary from "./CartSummary.vue";

import Vue from "vue";

export default {
  name: "checkout",
  components: {
    EntryShipping,
    EntryPayment,
    CartSummary
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
    navigateStages(direction) {
      if (direction == 0) {
        if (this.stage == 0) return;
        this.goToPreviousStage();
      } else {
        if (this.stage == 1) return;
        this.goToNextStage();
      }
    },
    goToNextStage() {
      this.stage = +1;
    },
    goToPreviousStage() {
      this.stage = -1;
    },
    updateShipping(details) {
      this.shipping = details;
      console.log("Shipping saved!");
    },
    async onCompleteOrder() {
      const orderID = await this.$store.dispatch({
        type: "checkoutCart",
        shipping: this.shipping,
        items: this.$store.getters.cart
      });

      // Store name and data in cookie
      Vue.$cookies.set("firstName", this.shipping.firstName);
      Vue.$cookies.set("lastName", this.shipping.lastName);
      Vue.$cookies.set("zipCode", this.shipping.zipCode);

      this.$router.push({
        name: "OrderComplete",
        params: { orderDetails: this.shipping, orderID: orderID }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  font-size: 1.3em;
  color: rgb(83, 83, 83);
}
.main {
  flex-direction: row;
  min-height: 700px;
  margin-top: 10px;
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
</style>