<template>
  <div class="container">
    <div class="header">{{ item.name }}</div>
    <p
      class="desc"
    >{{ item.name }} is eligible for a return since it has not passed its 30 day period. Just print out the return label using the link below and ship it back to us.</p>
    <p
      class="desc small"
    >You will not be charged for this item. You only pay for the items you decide to keep at the end of the 30-day period after which this order was placed.</p>

    <div class="actions">
      <rounded-button
        name="PRINT LABEL"
        v-on:press="pressPrintShippingLabel(item)"
        class="btn-print-label"
        :variant="'outline'"
      />

      <rounded-button name="Done" v-on:press="pressDone" class="btn-return-item" />
    </div>
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";

export default {
  name: "item-return",
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true
    }
  },
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
    pressDone() {
      this.$router.push({
        path: "my-orders"
      });
    },
    pressPrintShippingLabel() {
      this.$router.push({
        path: "my-orders"
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.container {
  align-items: center;
}
.header {
  font-size: 1.3em;
  color: black;
}
.desc {
  margin-bottom: 0px;

  &.small {
    font-size: 0.9em;
    color: rgb(150, 150, 150);
  }
}
.actions {
  flex-direction: column;
  width: 30%;
  margin-top: 30px;

  .btn-print-label {
    margin-bottom: 10px;
  }
}
</style>