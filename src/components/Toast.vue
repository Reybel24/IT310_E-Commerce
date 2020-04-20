<template>
  <div class="toast" v-show="this.active" :class="{ hide: this.beginDismiss }">
    <div class="head">
      <font-awesome-icon :icon="['fa', 'shopping-cart']" class="icon" />
      <div class="img" v-if="this.img">
        <img :src="getImg(this.img)" />
      </div>
      {{ title }}
    </div>
    <div class="msg" v-if="this.msg != ''">{{ title }}</div>

    <div class="dismiss" v-on:click="dismiss">
      <font-awesome-icon :icon="['fa', 'times']" class="icon" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: "toast",
  props: {
    title: {
      type: String,
      default: "Toast Header",
      required: false
    },
    msg: {
      type: String,
      default: "",
      required: false
    },
    img: {
      type: String,
      default: null,
      required: false
    }
  },
  components: {},
  data() {
    return {
      active: true,
      duration: 3000,
      animDuration: 400,
      beginDismiss: false
    };
  },
  methods: {
    dismiss() {
      this.beginDismiss = true;
      var timer2 = setTimeout(() => {
        this.active = false;
      }, this.animDuration);
    },
    getImg(img) {
      return require("@/assets/products/" + img);
    }
  },
  mounted() {
    // Remove after x miliseconds
    var timer = setTimeout(() => {
      this.dismiss();
    }, this.duration);
  }
};
</script>

<style lang="scss" scoped>
.toast {
  width: 400px;
  padding: 20px 15px 20px 20px;
  background-color: white;
  box-shadow: 0px 5px 7px 0px rgba(134, 134, 134, 0.25);
  border: 1px solid rgb(245, 245, 245);
  border-radius: 3px;
  right: 40px;
  bottom: 30px;
  z-index: 100;
  cursor: default !important;
  border-left: 4px solid $purple;
  justify-content: space-between;
  align-items: center;
  animation-name: show;
  animation-duration: 0.5s;
  transition: 0.2s;
  margin-top: 0px;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.hide {
  animation-name: hide;
  animation-duration: 0.5s;
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.head {
  font-size: 1em;
  color: $grey;
  align-items: center;
  .icon {
    margin-right: 9px;
    font-size: 0.9em;
  }
}
.msg {
}

.active {
  display: flex;
}

.dismiss {
  cursor: pointer;
  padding: 5px;
  font-size: 1em;
  color: $light-grey;
  opacity: 0.8;
  transition: 0.2s;
}
.dismiss:hover {
  opacity: 1;
  color: $grey;
}

.img {
  width: 5%;
  padding: 0px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  img {
    width: 95%;
    height: 95%;
    object-fit: contain;
    transition: 0.2s;
  }
}
</style>
