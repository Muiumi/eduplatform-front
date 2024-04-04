'use strict';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app');
