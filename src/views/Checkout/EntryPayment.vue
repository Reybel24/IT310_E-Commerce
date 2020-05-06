<template>
  <div class="main">
    <div class="section summary">
      <div class="title strong">SUMMARY</div>
      <div class="detail-item strong">{{ shipping.firstName + " " + shipping.lastName }}</div>
      <div class="detail-item strong">{{ shipping.street }}</div>
      <div class="detail-item strong">{{ shipping.city + ", " + shipping.state }}</div>
      <div class="detail-item strong">{{ shipping.country }}</div>
      <div class="detail-item strong">{{ shipping.email }}</div>
    </div>

    <div class="section">
      <div class="title strong">PAYMENT DETAILS</div>
      <div class="input">
        <div class="label">NAME ON CARD</div>
        <input type="text" class="input-text" placeholder="Severus Snape" />
      </div>
      <div class="input">
        <div class="label">CARD NUMBER</div>
        <input type="text" class="input-text" placeholder="4242 4242 4242 4242" />
      </div>
      <div class="input">
        <div class="label">CVV</div>
        <input type="text" class="input-text" placeholder="123" />
      </div>
      <div class="input">
        <div class="label">EXPIRATION</div>
        <input type="text" class="input-text" placeholder="08/2025" />
      </div>
    </div>

    <!-- Button: Go to checkout -->
    <rounded-button
      name="PLACE ORDER"
      v-on:press="pressCompleteOrder"
      class="btn-payment"
      icon="credit-card"
    />
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

export default {
  name: "entry-payment",
  components: {
    RoundedButton
  },
  props: {
    shipping: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    pressCompleteOrder() {
      this.$emit("complete-order");
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  flex-direction: column !important;
}
.section {
  flex-direction: column;
  margin-bottom: 38px;
  font-size: 1em;

  .title {
    border-bottom: 1px solid rgb(223, 223, 223);
    padding: 0 0 5px 0;
    margin-bottom: 20px;
    font-size: 0.9em;
    color: $grey;
  }

  .input {
    flex-direction: column;
    margin-bottom: 20px;

    .label {
      font-size: 0.7em;
      color: $grey;
      margin-bottom: 7px;
    }

    .input-text {
      height: 30px;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 2px;
      padding: 0 0 0 7px;
    }
  }
}

.section.summary {
  font-size: 1em;

  .detail-item {
    font-size: 1;
    color: rgb(92, 92, 92);
    margin-bottom: 3px;
  }
}

.btn-payment {
  height: 25px;
}
</style>