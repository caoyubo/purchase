/*
* success : 请求成功执行的函数
* fail：请求失败执行的函数
*
* */

import http from './http';
import qs from 'qs';
import global_ from '../config/Global.js';
//import { Message } from 'element-ui';

//有的请求需要用户认证，视情况而定
const getConfig = function (auth) {
  let config = {}
  if(auth){
    config.headers={
      "Authorizatsystemion": auth
    }
  }
  return config;
}
let _this=this;
var request = {
  loginGet:function (url,param,success,fail) {
    return http.get(url,{
      params:param
    }).then((res) => {
      console.log(url)
        localStorage.setItem('isLogin',0);
        success(res.data);
    })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
        console.log(error);
      })
  },
  loginPost:function (url,param,success,fail) {
    return http.post(url,qs.stringify(param))
      .then((res) => {
          localStorage.setItem('isLogin',0);
          success(res.data);
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
        console.log(error);
      })
  },

  get:function (url,param,success,fail) {
    return http.get(url,{
      params:param
    }).then((res) => {
        console.log(url)
        if('-101' == res.data.code ){
         /* Message({
            customClass: 'global-message',
            message: '操作员未登录，请先登录！',
            type: 'error',
            onClose:function () {
              window.location.href='/'+global_.config.index
            }
          });*/
          success(res.data);
        }else if('-102' == res.data.code ){
         /* Message({
            customClass: 'global-message',
            message: '登录超时，请重新登录！',
            type: 'error',
            onClose:function () {
              console.log(global_.config.index)
              window.location.href='/'+global_.config.index
            }
          });*/
          success(res.data);
        }else{
          localStorage.setItem('isLogin',0);
          success(res.data);
        }
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
        console.log(error);
      })
  },
  exportDataByPost:function(url,param,auth){
    return http.post(url,qs.stringify(param),auth);
  },
  post:function (url,param,success,fail) {
    return http.post(url,qs.stringify(param))
      .then((res) => {

        if('-101' == res.data.code ){
         /* Message({
            customClass: 'global-message',
            message: '操作员未登录，请先登录！',
            type: 'error',
            onClose:function () {
              window.location.href='/'
            }
          });*/
          success(res.data);
        }else if('-102' == res.data.code ){
         /* Message({
            customClass: 'global-message',
            message: '登录超时，请重新登录！',
            type: 'error',
            onClose:function () {
              window.location.href='/'
            }
          });*/
          success(res.data);
        }else{
          localStorage.setItem('isLogin',0);
          success(res.data);
        }
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
        console.log(error);
      })
  },
  put:function (url,data,auth,success,fail) {
    return http.put(url,{
      params:data
    },getConfig(auth))
      .then((res)=> {
        success(res);
      })
      .catch(function (error) {
        if(fail){
          fail(error);
        }
        console.log(error);
      })
  }
}

// 用法
// this.$request.get(`${basis.userListUrl}`, false,
// function (res) {
//   // console.log(res.data);
// }
// )
export default  request;
