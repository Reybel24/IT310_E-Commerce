<template>
  <div class="rating-stars">
    <div v-for="(star, index) in this.totalStars" :key="index" class="star">
      <font-awesome-icon :icon="['fa', 'star']" v-if="(index+1) <= rating" />
      <font-awesome-icon :icon="['fa', 'star-half']" v-if="isHalfStar(index)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "rating-stars",
  props: {
    rating: {
      type: Number,
      default: 2.5,
      required: false
    }
  },
  components: {},
  data() {
    return {
      totalStars: 5
    };
  },
  methods: {
    isHalfStar(pos) {
      pos++;
      if (this.rating > (pos-1) && this.rating < pos) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.rating-stars {
  display: flex;
  padding: 11px 11px 8px 0px;
}
.star {
  margin-right: 5px;
  color: $orange;
  transition: 0.12s;
  font-size: .8em;
}
</style>
