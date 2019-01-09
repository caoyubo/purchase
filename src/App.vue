<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
  }
</script>
<style type="text/scss"  lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    #app {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
  @font-face {
    font-family: 'pingFangSC-Medium';
    //src:url('assets/PingFangSC/PingFangBold.ttf');
    font-weight: normal;
    font-style: normal;
  }

</style>

