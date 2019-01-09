<template>
  <div class="footer" @click="clickFooter">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="choose">
        选购
      </mt-tab-item>
      <mt-tab-item id="collect">
        收藏
      </mt-tab-item>
      <mt-tab-item id="member">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "footerButton",
    data() {
      return {
        selected: "",
      }
    },
    methods:{
      clickFooter(){
         console.log(this.selected);
      }
    }
  }
</script>

<style scoped>

</style>
