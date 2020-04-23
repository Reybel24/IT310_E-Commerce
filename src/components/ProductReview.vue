<template>
  <div class="review" v-if="this.isReady">
    <div class="author">
      <div class="avatar">
        <img :src="this.getUserImg()" />
      </div>
      <div class="name">{{ this.user.name }}</div>
      <div
        class="badge strong"
        v-if=" this.user.badges.length > 0"
      >{{ this.user.badges[0].title.toUpperCase() }}</div>
    </div>
    <div class="title-rating">
      <div class="title strong">{{ review.title }}</div>
      <rating-stars :rating="review.rating" class="rating-stars" />
    </div>
    <div class="date-time">{{ getDateInEnglish() }}</div>
    <div class="content-text">{{ review.content }}</div>
    <div class="helpful">{{ this.randomNumberBetween(0, 48) }} people found this helpful</div>
    <div class="actions">
      <rounded-button name="Helpful" class="btn btn-helpful" variant="outline" />
      <rounded-button name="Not Helpful" class="btn btn-not-helpful" variant="outline" />
    </div>
  </div>
</template>

<script>
// UI components
import RatingStars from "@/components/UI/RatingStars.vue";
import RoundedButton from "@/components/UI/RoundedButton.vue";

// Common utility functions
import { randomNumberBetween } from "@/util/common.js";

// Moment
import moment from "moment";

export default {
  name: "product-review",
  props: {
    review: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  components: {
    RatingStars,
    RoundedButton
  },
  data() {
    return {
      isReady: false,
      user: null,
      randomNumberBetween
    };
  },
  methods: {
    async loadUserData() {
      this.user = await this.$store.dispatch({
        type: "fetchUser",
        id: parseInt(this.review.author_id)
      });

      console.log(this.user);

      // Set ready
      this.isReady = true;
    },
    getUserImg() {
      return require("@/assets/avatars/" + this.user.avatar);
    },
    getDateInEnglish() {
      // var date = new Date(this.review.date_time);
      var date = moment(this.review.date_time).format("MMMM Do, YYYY");
      return date;
    }
  },
  async mounted() {
    // Get user data for name and avatar
    await this.loadUserData();
  }
};
</script>

<style lang="scss" scoped>
.review {
  font-size: 1em;
  padding: 0px 0 0 0;
  color: $black;
  flex-direction: column;
  max-width: 750px;
  line-height: 25px;

  .author {
    font-size: 0.8em;
    align-items: center;

    .avatar {
      width: 25px;
      height: 25px;
      background-color: $grey;
      border-radius: 30px;
      overflow: hidden;
      align-items: center;
      justify-content: center;

      img {
        width: 110%;
        height: 110%;
        object-fit: contain;
      }
    }

    .name {
      margin-left: 8px;
    }
  }

  .title-rating {
    align-items: center;
    margin-top: 8px;
  }

  .title {
    font-size: 1em;
  }

  .rating-stars {
    margin-left: 10px;
  }

  .content-text {
    font-size: 0.9em;
    color: $dark-grey;
    margin-top: 6px;
    text-align: left;
  }

  .date-time {
    font-size: 0.8em;
    color: $grey;
    margin-top: 4px;
  }

  .badge {
    font-size: 0.85em;
    color: $blue;
    margin-top: 0px;
    padding: 2px 8px 2px 8px;
    margin-left: 10px;
    cursor: default;
    border-top: 2px dotted $blue;
    border-bottom: 2px dotted $blue;
    opacity: 0.8;
  }

  .helpful {
    margin-top: 14px;
    font-size: 0.82em;
    color: $grey;
  }

  .actions {
    margin-top: 15px;
    align-items: center;

    .btn {
      border-radius: 5px;
    }

    .btn-helpful {
      margin-right: 7px;
    }
  }
}
</style>
