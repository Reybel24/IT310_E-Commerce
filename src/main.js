import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Axios
// import axios from 'axios';

Vue.config.productionTip = false

// Styles
import "@/styles/main.scss";

// Use Font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Scrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(PerfectScrollbar)

// Cookies
Vue.use(require('vue-cookies'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
