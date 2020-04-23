<template>
  <div class="container">
    <div class="crumbtrail">Hats {{ (this.isReady) ? " > " + this.product.name : "" }}</div>
    <div class="product">
      <div class="img">
        <div class="empty">
          <font-awesome-icon :icon="['fa', 'hat-cowboy']" class="icon" v-if="!this.isReady" />
        </div>
        <img :src="this.getProductImg(this.product)" v-if="this.isReady" />
      </div>
      <div class="details">
        <div class="name strong" v-if="this.isReady">{{ this.product.name }}</div>
        <div class="seller" v-if="this.isReady">
          <span>by</span>
          <span
            class="strong"
          >{{ (this.product.seller != undefined) ? this.product.seller : "Unknown Seller" }}</span>
        </div>
        <div class="rating">
          <rating-stars :rating="this.product.rating" v-if="this.isReady" class="stars" />
          {{ this.productReviews.length }} {{ (this.productReviews.length == 1) ? "review" : "reviews" }}
        </div>
        <div class="price strong" v-if="this.isReady">${{ this.product.price }}</div>
        <div
          class="desc"
          v-if="this.isReady"
        >{{ (this.product.description_long) ? this.product.description_long : "No description provided." }}</div>
        <div class="a-box">
          <rounded-button
            name="ADD TO BAG"
            v-if="this.isReady"
            v-on:press="pressAddToCart"
            class="btn btn-add-to-cart"
          />
          <rounded-button
            name="ADD TO LIST"
            v-if="this.isReady"
            v-on:press="pressAddToList"
            class="btn btn-add-to-list"
            variant="outline"
            icon="stream"
          />
        </div>
      </div>
    </div>

    <div class="related-products">
      <div class="head strong">Customers who bought this also looked at</div>
      <perfect-scrollbar v-dragscroll>
        <div class="grid">
          <div class="loading" v-if="!this.relatedProductsIsReady">
            <div class="related-product" v-for="num in 5" :key="num">
              <div class="img bg-cover"></div>
              <div class="name bg-cover">None</div>
            </div>
          </div>

          <div class="empty" v-if="this.relatedProductsIsReady && this.relatedProducts.length < 1">
            <font-awesome-icon :icon="['fa', 'frown']" class="icon" />
            <span class="strong">No related items found</span>
          </div>

          <div
            class="related-product"
            v-for="(prod, index) in relatedProducts"
            :key="index"
            @mousedown="startClickTimer(prod.id)"
            @mouseup="browseToProduct(prod.id)"
          >
            <div class="img">
              <img :src="getProductImg(prod)" />
            </div>
            <div class="name">{{ prod.name }}</div>
            <rating-stars :rating="prod.rating" />
            <div class="price strong">${{ prod.price }}</div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>

    <div class="reviews" v-if="this.reviewsIsReady">
      <div class="head strong">REVIEWS</div>
      <div class="leave-a-review">
        <input
          type="text"
          placeholder="Write a review"
          v-model="userReview.title"
          v-if="!this.reviewWasSubmitted"
        />
        <textarea
          placeholder="Tell us about your purchase"
          v-model="userReview.content"
          v-if="!this.reviewWasSubmitted"
        />
        <rounded-button
          name="POST REVIEW"
          v-on:press="pressPostReview(userReview.title, userReview.content)"
          class="btn btn-add-to-list"
          icon="stream"
          :disabled="userReview.title == '' || userReview.content == ''"
          v-if="!this.reviewWasSubmitted"
        />

        <div class="submitted" v-if="this.reviewWasSubmitted">Thanks for your review!</div>
      </div>
      <product-review v-for="(review, index) in productReviews" :key="index" :review="review" />

      <!-- No reviews -->
      <div class="empty" v-if="this.reviewsIsReady && this.productReviews.length < 1">
        <font-awesome-icon :icon="['fa', 'comment-alt']" class="icon" />
        <span class="strong">This product has no reviews. Be the first to review it!</span>
      </div>
    </div>
    <toast :title="this.toast.title" v-if="1==2" />

    <div class="toasts-container" ref="toastsContainer"></div>
  </div>
</template>

<script>
// Toast notification
import Toast from "@/components/Toast.vue";

// UI Components
import RoundedButton from "@/components/UI/RoundedButton.vue";
import RatingStars from "@/components/UI/RatingStars.vue";
import ProductReview from "@/components/ProductReview.vue";

// Common utility functions
import {
  fetchProductImg,
  randomNumberBetween,
  browseToProduct
} from "@/util/common.js";

// Import vue
import Vue from "vue";

// Dragscroll
import { dragscroll } from "vue-dragscroll";

export default {
  name: "product",
  props: {},
  components: {
    RatingStars,
    RoundedButton,
    ProductReview,
    Toast
  },
  directives: {
    dragscroll: dragscroll
  },
  data() {
    return {
      isReady: false,
      productId: null,
      product: null,
      productReviews: [],
      relatedProducts: [],
      relatedProductsIsReady: false,
      reviewsIsReady: false,
      userReview: {
        title: "",
        content: ""
      },
      reviewWasSubmitted: false,
      clickTimeout: null,
      canClick: false,

      // Methods
      randomNumberBetween,
      browseToProduct
    };
  },
  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    async loadPage() {
      this.isReady = false;
      this.relatedProductsIsReady = false;
      this.reviewsIsReady = false;
      this.productReviews = [];
      this.relatedProducts = [];
      this.resetUserReview();

      // Fetch product data
      await this.loadProduct();
      await this.loadProductReviews();
      this.relatedProducts = await this.getRelatedProducts();
    },
    async loadProduct() {
      // Get data by product id
      this.productId = this.$route.params.id;
      this.product = await this.$store.dispatch({
        type: "fetchProduct",
        id: parseInt(this.productId)
      });

      // Set ready
      this.isReady = true;
    },
    async loadProductReviews() {
      this.productReviews = await this.$store.dispatch({
        type: "fetchProductReviews",
        id: parseInt(this.productId)
      });

      // Set ready
      this.reviewsIsReady = true;
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    addToCart(item) {
      this.$store.dispatch({
        type: "addItemToCart",
        item: item
      });
      this.createToast(item.name + " added to cart!", item.img);
    },
    getProductImg(prod) {
      return fetchProductImg(prod);
    },
    pressAddToCart() {
      this.$store.dispatch({
        type: "addItemToCart",
        item: this.product
      });
      this.createToast(this.product.name + " added to cart!", this.product.img);
    },
    pressAddToList() {
      // Does nothing for now
      // Display a toast atleast
      this.createToast(
        this.product.name + " added to wish list!",
        this.product.img
      );
    },
    createToast(title, img) {
      var ComponentClass = Vue.extend(Toast);
      var instance = new ComponentClass({
        propsData: {
          title: title,
          img: img
        }
      });
      instance.$mount();
      this.$refs.toastsContainer.appendChild(instance.$el);
    },
    async getRelatedProducts() {
      var related = await this.$store.dispatch({
        type: "fetchRelatedProducts",
        id: this.productId
      });
      this.relatedProductsIsReady = true;
      return related;
    },
    startClickTimer() {
      // if (!this.canClick) return;
      clearTimeout(this.clickTimeout);

      // console.log("mosue down");
      setTimeout(function() {
        // console.log("time up");
        this.canClick = false;
        // console.log(this.canClick);
      }, 2000);
    },
    endClickTimer(prodId) {
      // console.log(this.canClick);
      if (this.canClick == true) {
        browseToProduct(prodId);
        // console.log("browsing to " + prodId);
      } else {
        // console.log("Not navigating. timer expired.");
      }

      this.canClick = true;
    },
    pressPostReview(title, content) {
      var now = new Date();

      // Create review object
      var review = {
        id: -1,
        author_id: -1,
        title: title,
        content: content,
        date_time: now,
        rating: 2.5
      };

      // Add to list
      this.productReviews.unshift(review);

      this.reviewWasSubmitted = true;
    },
    resetUserReview() {
      this.reviewWasSubmitted = false;
      this.userReview.title = "";
      this.userReview.content = "";
    }
  },
  mounted() {
    this.loadPage();
  },
  watch: {
    $route() {
      // When route changes, reload data with new product id
      this.loadPage();
    },
    canClick(old, newVal) {
      console.log("canClick changed to " + newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 75%;
  margin: 0 auto;
  flex-direction: column;
  margin-top: 12px;
}

// Current product
.product {
  flex-direction: row;
  min-height: 365px;

  .img {
    width: 20%;
    height: min-content;
    padding: 30px;
    align-items: center;
    justify-content: center;

    img {
      width: 95%;
      height: 95%;
      object-fit: contain;
      transition: 0.2s;
    }

    .empty {
      font-size: 8em;
      color: $lighter-grey;
    }
  }

  .product:hover > .img > img {
    transform: scale(1.1, 1.1);
  }

  .details {
    flex-direction: column;
    font-size: 1em;
    justify-content: flex-start;
    padding-left: 43px;
    width: 50%;

    // Product name
    .name {
      color: $black;
      font-size: 1.2em;
    }

    .price {
      color: $grey;
      font-size: 1.4em;
      margin-top: 5px;
    }

    .seller {
      color: $grey;
      font-size: 0.8em;
      padding: 3px 0 0 0;

      span {
        padding-right: 5px;
      }
    }

    .rating {
      color: $grey;
      font-size: 1em;
      margin-top: 5px;
    }

    .rating-stars {
      margin-right: 5px;
    }

    // Description
    .desc {
      font-size: 0.9em;
      text-align: left;
      padding: 10px 0 0 0;
      line-height: 26px;
      width: 90%;
    }
  }
}

// Buttons
.a-box {
  width: 100%;
  margin-left: auto;
  flex-direction: row;
  font-size: 1em;
  margin-top: 20px;

  .btn {
    width: 30%;
    align-self: center;
    border-radius: 5px;
    font-size: 0.9em;
    margin-top: auto;
    height: 30px;
  }
  .btn-add-to-cart {
    background-color: #f2b05f;
    color: #8b5007;
    background: rgb(255, 171, 0);
    background: linear-gradient(
      0deg,
      rgba(255, 171, 0, 1) 0%,
      rgba(255, 201, 0, 1) 100%
    );
  }

  .btn-add-to-list {
    margin-left: 20px;
  }
}

// Navigation
.crumbtrail {
  margin-bottom: 14px;
  font-size: 0.9em;
  color: $black;
}

// Related products
.related-products {
  width: 100%;
  padding: 10px 0 0 10px;
  margin-bottom: 20px;
  justify-content: flex-start;
  margin-top: 20px;
  flex-direction: column;
  user-select: none;

  .grid {
    margin-top: 20px;
    margin-bottom: 17px;
    padding-left: 4px;
  }

  .head {
    font-size: 1em;
    color: $black;
  }

  .empty {
    color: $grey;
    align-items: center;

    .icon {
      font-size: 3em;
      margin-right: 10px;
      color: $light-grey;
    }
  }

  .related-product {
    margin-right: 22px;
    color: $grey;
    width: 137px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.09);
    border: 1px solid rgb(245, 245, 245);
    background-color: white;
    padding: 30px 15px 19px 15px;
    border-radius: 6px;
    transition: 0.12s;
    flex-shrink: 0;
    margin-bottom: 15px;

    .img {
      width: 60%;
      height: min-content;
      padding: 10px 30px 30px 30px;
      align-items: center;
      justify-content: center;
      // border: 1px solid $lighter-grey;

      img {
        width: 95%;
        height: 95%;
        object-fit: contain;
        transition: 0.2s;
      }
    }

    .name {
      margin-top: 7px;
    }

    .price {
      font-size: 0.94em;
      margin-top: 3px;
    }
  }
}

.related-product:hover {
  box-shadow: 0px 5px 18px 0px rgba(79, 79, 79, 0.18);
  transform: scale(1.07, 1.07);
}

// Reviews
.reviews {
  width: 100%;
  max-width: 1300px;
  flex-direction: column;
  font-size: 1em;
  color: $black;
  margin-top: 30px;
  padding-bottom: 50px;

  .head {
    font-size: 1.1em;
    margin-bottom: 20px;
  }

  .review {
    margin: 0 0 40px 0;
  }

  .empty {
    color: $grey;
    align-items: center;

    .icon {
      font-size: 3em;
      margin-right: 16px;
      color: $lighter-grey;
    }
  }
}

// Leave a review box
.leave-a-review {
  margin-bottom: 40px;
  display: flex;
  color: $black;
  flex-direction: column;
  padding: 0 0% 0 0;

  input {
    height: 35px;
    padding: 0 10px 0 10px;
    border: 1px solid $lighter-grey;
  }

  textarea {
    height: 60px;
    border: 1px solid $lighter-grey;
    border-radius: 4px;
    padding: 15px 0 0 20px;
    resize: none;
    margin-top: 15px;
    border: 1px solid $lighter-grey;
  }

  .btn {
    width: 150px;
    margin-top: 20px;
    align-self: flex-end;
  }
}

// Toast notification
.toasts-container {
  flex-direction: column;
  position: absolute;
  bottom: 20px;
  right: 40px;

  .toast {
    margin-top: 10px;
  }
}

.bg-cover {
  background-color: $almost-white;
  color: $almost-white;
  border-radius: 4px;
}
</style>
