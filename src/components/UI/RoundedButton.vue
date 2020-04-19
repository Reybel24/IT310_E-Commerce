<template>
  <div class="btn" :class="btnVariant" v-on:click="onPress">
    <font-awesome-icon :icon="['fa', 'shopping-cart']" class="icon" />
    <div class="name strong">{{ this.name }}</div>
  </div>
</template>

<script>
export default {
  name: "rounded-button",
  props: {
    name: {
      type: String,
      default: "",
      required: false
    },
    variant: {
      type: String,
      default: "fill",
      required: false
    }
  },
  components: {},
  methods: {
    onPress() {
      this.$emit("press");
    }
  },
  computed: {
    btnVariant: function () {
      return {
        "fill": (this.variant == "fill"),
        "outline": (this.variant == "outline"),
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 8px 11px 8px 11px;
  display: flex;
  background-color: white;
  border-radius: 15px;
  color: $blue;
  transition: 0.12s;
  font-size: 0.75em;
  align-items: center;
  opacity: 0.8;
  justify-content: center;
  cursor: pointer;
}
.btn:hover {
  opacity: 1;
}
.icon {
  font-size: 0.9em;
}
.name {
  margin-left: 6px;
}

/* Variants */
.fill {
  background-color: $blue;
  color: white;
}
.fill:hover {

}

.outline {
  border: 1px solid $blue;
}
.outline:hover {
  background-color: $blue;
  color: white;
}

</style>
