<template>
  <div class="container">
    <div class="sign-in">
      <div class="form">
        <div class="input">
          <div class="label">FIRST NAME</div>
          <input type="text" class="input-text" placeholder="Rubeus" v-model="form.firstName" />
        </div>

        <div class="input">
          <div class="label">LAST NAME</div>
          <input type="text" class="input-text" placeholder="Hagrid" v-model="form.lastName" />
        </div>

        <div class="input">
          <div class="label">ZIP CODE</div>
          <input type="text" class="input-text" placeholder="12345" v-model="form.zipCode" />
        </div>

        <rounded-button
          name="Check Orders"
          v-on:press="pressCheckOrders"
          class="btn-return-item"
          :variant="'outline'"
        />
      </div>
    </div>
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

import Vue from "vue";

export default {
  name: "sign-in",
  components: {
    RoundedButton
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        zipCode: ""
      }
    };
  },
  methods: {
    pressCheckOrders() {
      // Store name and data in cookie
      Vue.$cookies.set("firstName", this.form.firstName);
      Vue.$cookies.set("lastName", this.form.lastName);
      Vue.$cookies.set("zipCode", this.form.zipCode);

      // Send back to my orders page
      this.$router.push({
        path: "my-orders"
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.sign-in {
  flex-direction: column;
}
.form {
  flex-direction: column;
  width: 40%;
}
</style>