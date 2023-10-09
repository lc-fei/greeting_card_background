<template>
  <div id="app">
    <!-- <router-link to="/data">data</router-link>
    <br><router-link to="/login">login</router-link> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <a href="https://beian.miit.gov.cn/" target="_blank" class="nbhh">冀ICP备2023034832号-1</a>
  </div>
</template>

<script>
  // import MyBody from './components/body.vue';

  export default {
    name: 'App',

  }
</script>

<style lang="less" scoped>
  .nbhh {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 5px;
    margin-bottom: 30px;
  }
</style>
