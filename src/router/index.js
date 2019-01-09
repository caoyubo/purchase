import Vue from 'vue';
import Router from 'vue-router';

const login = resolve => require(['../login/index.vue'], resolve);
const home = resolve => require(['../home/home.vue'], resolve);

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
     {
       //登录
       path: '/login',
       component: login
     },
    {
      //直播媒资
      path: '/index',
      component: home,

    },
  ]
});
