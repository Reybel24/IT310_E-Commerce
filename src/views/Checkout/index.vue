<template>
  <div class="container">
    <div class="checkout">Welcome to checkout.</div>

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

      this.$router.push({
        name: "OrderComplete",
        params: { orderDetails: this.shipping, orderID: orderID }
      });
    }
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
</style>