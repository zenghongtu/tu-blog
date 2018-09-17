import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ajax from './http/config';
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.axios = axios;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
