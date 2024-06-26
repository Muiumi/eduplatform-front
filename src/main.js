'use strict';
import Vue from 'vue';
import {BootstrapVue} from "bootstrap-vue";
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/global-styles.css'
import VueCookies from 'vue-cookies';
import {globalStorage} from "@/globalStorage";

const eduPlatformApi = process.env.VUE_APP_EDU_PLATFORM_API_URL;
const minioApi = process.env.VUE_APP_EDU_PLATFORM_MINIO_API_URL;
Vue.prototype.$eduPlatformApi = eduPlatformApi;
Vue.prototype.$minioApi = minioApi;
Vue.prototype.$globalStorage = globalStorage;

Vue.use(BootstrapVue, {
    BToast: {
        noCloseButton: true,
        toaster: "b-toaster-bottom-right",
        autoHideDelay: 3000,
    },
});
Vue.use(VueCookies);

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');