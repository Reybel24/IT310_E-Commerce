<template>
  <div class="main">
    <div class="section">
      <div class="title strong">YOUR NAME</div>
      <div class="input">
        <div class="label">FIRST NAME</div>
        <input type="text" class="input-text" placeholder="Harry" v-model="shipping.firstName" />
      </div>

      <div class="input">
        <div class="label">LAST NAME</div>
        <input type="text" class="input-text" placeholder="Potter" v-model="shipping.lastName" />
      </div>

      <div class="input">
        <div class="label">EMAIL</div>
        <input type="text" class="input-text" placeholder="hpotter@hogwarts.edu" v-model="shipping.email" />
      </div>
    </div>

    <div class="section">
      <div class="title strong">SHIPPING DETAILS</div>
      <div class="input">
        <div class="label">Street</div>
        <input type="text" class="input-text" placeholder="4 Privet Drive" v-model="shipping.lastName" />
      </div>
      <div class="input">
        <div class="label">CITY</div>
        <input type="text" class="input-text" placeholder="4 Privet Drive" v-model="shipping.city" />
      </div>
      <div class="input">
        <div class="label">STATE</div>
        <input type="text" class="input-text" placeholder="Little Whinging" v-model="shipping.state" />
      </div>
      <div class="input">
        <div class="label">COUNTRY</div>
        <input type="text" class="input-text" placeholder="Surrey" v-model="shipping.country" />
      </div>
      <div class="input">
        <div class="label">ZIP CODE</div>
        <input type="text" class="input-text" placeholder="09487" v-model="shipping.zipCode" />
      </div>
    </div>

    <!-- Button: Go to checkout -->
    <rounded-button
      name="GO TO PAYMENT"
      v-on:press="saveShipping"
      class="btn-payment"
      icon="credit-card"
    />
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

export default {
  name: "entry-shipping",
  components: {
    RoundedButton
  },
  data() {
    return {
      shipping: {
        firstName: "Hermonie",
        lastName: "Granger",
        email: "hgranger@hogwarts.edu",
        street: "4 Privet Drive",
        city: "Lala Land",
        state: "Wizard City",
        country: "Hogwarts",
        zipCode: "12985"
      }
    };
  },
  methods: {
    goToPayment() {
      this.$emit("navigate", 1);
    },
    saveShipping() {
      this.$emit("save-shipping", this.shipping);
      this.goToPayment();
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

.btn-payment {
  height: 25px;
}
</style>