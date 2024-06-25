import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {sendHttp} from './request/axios'


Vue.prototype.$axios = axios;
Vue.prototype.$sendHttp = sendHttp;

Vue.prototype.$upImg = "http://imageapi.duoduiduo.com.cn/file/uploadImg";
Vue.prototype.$upVideo = "http://imageapi.duoduiduo.com.cn/videos/upload";
Vue.prototype.$upload = "http://goods.duoduiduo.com.cn/image/upload/";
Vue.prototype.$upEX = "http://goods.duoduiduo.com.cn/goods/excelimport";
Vue.prototype.$poster = "http://appmall.duoduiduo.com.cn/";
Vue.prototype.$videoShowHttp = "http://img.duoduiduo.com.cn/";

import './assets/common/common.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/imgs/iconfont/iconfont.css';

Vue.directive('title', {
  inserted: function(el, binding){
    document.title = el.dataset.title
  }
});

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
