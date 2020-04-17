<template>
  <div class="product">
    <div class="img">
      <img :src="this.getProductImg()" />
    </div>
    <div class="info">
      <div class="name strong">{{ this.data.name }}</div>
      <div class="description">{{ this.data.description }}</div>
      <rating-stars :rating="data.rating" />
      <div class="bottom">
        <div class="price strong">
          {{ Math.floor(this.data.price) }}
          <span class="cents">{{ (this.data.price % 1).toFixed(2).toString().slice(2) }}</span>
        </div>
        <rounded-button name="ADD TO CART" />
      </div>
    </div>
  </div>
</template>

<script>
// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";
import RatingStars from "@/components/UI/RatingStars.vue";

export default {
  name: "listed-product",
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  components: {
    RoundedButton,
    RatingStars
  },
  methods: {
    getProductImg() {
      if (!this.data.img) return null;
      return require("@/assets/products/" + this.data.img);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  width: 445px;
  height: 200px;
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.05);
  outline: 1px solid rgb(245, 245, 245);
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;
}
.product:hover {
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.15);
}

/* Product information UI */
.img {
  width: 35%;
  padding: 10px 20px 20px 20px;
}
.img > img {
  max-width: 95%;
  width: auto;
  height: auto;
}
.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 20px 40px 15px;
  font-size: 1em;
  color: $black;
}
.info .name {
  text-align: left;
}
.info .description {
  text-align: left;
  margin-top: 3px;
  color: $light-grey;
  font-size: 0.9em;
}
.bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info .price {
  font-size: 1.2em;
}
.info .price > .cents {
  font-size: .7em;
  padding: 1px 0px 0px 3px;
}
</style>
