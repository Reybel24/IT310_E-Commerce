<template>
  <div class="product">
    <div class="img" :class="{ 'bg-blur': !this.hasData() }">
      <img :src="this.getProductImg()" v-if="this.hasData()" />
    </div>
    <div class="info">
      <div
        class="name strong"
        :class="{ 'bg-blur': !this.hasData() }"
      >{{ (this.data) ? this.data.name : "Loading..." }}</div>
      <div
        class="description"
        :class="{ 'bg-blur': !this.hasData() }"
      >{{ (this.data) ? this.data.description: "Loading description" }}</div>
      <rating-stars :rating="data.rating" v-if="this.data" />
      <div class="bottom">
        <div class="price strong" :class="{ 'bg-blur': !this.hasData() }">
          ${{ (this.data) ? Math.floor(this.data.price) : "199" }}
          <span
            class="cents"
          >{{ (this.data) ? (this.data.price % 1).toFixed(2).toString().slice(2) : "99"}}</span>
        </div>
        <rounded-button name="ADD TO CART" v-if="this.hasData()" v-on:press="pressAddToCart" class="btn-add-to-cart" :variant="'outline'" />
      </div>
      <div class="tags">
        <div class="tag" v-for="(tag, index) in this.getTags()" :key="index">{{ tag }}</div>
        <div class="tag empty" v-if="this.hasData() && (!this.data.tags || this.data.tags.length < 1)">No tags</div>
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
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    RoundedButton,
    RatingStars
  },
  methods: {
    getProductImg() {
      if (!this.data) return;
      if (Object.prototype.hasOwnProperty.call(this.data, "img") == false) {
        return null;
      }
      return require("@/assets/products/" + this.data.img);
    },
    hasData() {
      if (this.data != undefined && this.data != null) {
        return true;
      }
      return false;
    },
    getTags() {
      if (this.hasData()) {
        if (this.data.tags) {
          return this.data.tags;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    pressAddToCart() {
      this.$emit("add-to-cart", this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  width: 98%;
  min-height: 210px;
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.05);
  border: 1px solid rgb(245, 245, 245);
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;
  background-color: white;
  min-width: 265px;
  @include lg {
    max-width: 620px;
  }
  @include xl {
    width: 47%;
    max-width: 585px;
  }
  @include rwd(1900) {
    width: 32%;
  }
  @include rwd(2560) {
    width: 24%;
  }
}
.product:hover {
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.15);
}

/* Product information UI */
.img {
  width: 35%;
  padding: 30px;
  align-items: center;
  justify-content: center;
}
.img > img {
  width: 95%;
  height: 95%;
  object-fit: contain;
  transition: 0.2s;
}
.product:hover > .img > img {
  transform: scale(1.1, 1.1);
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 20px 22px 15px;
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
  margin-bottom: 11px;
  flex-wrap: wrap;
}
.info .price {
  font-size: 1.2em;
}
.info .price > .cents {
  font-size: 0.7em;
  padding: 1px 0px 0px 2px;
}
.btn-add-to-cart {
  margin-top: 3px;
}

.tags {
  margin-top: auto;
  flex-wrap: wrap;
  display: none;
  @include lg {
    display: flex;
    width: 100%;
  }
}
.tags .tag {
  padding: 3px 9px 3px 9px;
  background-color: $purple;
  border-radius: 20px;
  margin-right: 5px;
  color: white;
  font-size: 0.8em;
  opacity: 0.7;
  transition: 0.1s;
  margin-bottom: 3px;
}
.tags .tag:hover {
  opacity: 1;
}
.tags .tag.empty {
  background-color: $light-grey;
  color: white;
}

.bg-blur {
  background-color: $lighter-grey;
  color: $lighter-grey !important;
}
</style>
