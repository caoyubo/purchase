// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/base.css';
import Http from './config/axios';
Vue.prototype.$request = Http;

import 'babel-polyfill'

import API_ from './config/api';
Vue.prototype.API = API_;

import  utiljs  from './util.js';
import global_ from './config/Global';
import constatnt_ from './config/constant';

Vue.prototype.CONSTANT = constatnt_;
Vue.prototype.GLOBAL = global_;
import store from './stote';
Vue.use(utiljs);
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
});
