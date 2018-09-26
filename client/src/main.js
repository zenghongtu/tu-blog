import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ajax from './http/config';
import Loading from './components/common/loading'
import './assets/style/iconfont.css';
import './util/rem'

Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.$loading = Loading;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
