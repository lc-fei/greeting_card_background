<template>
  <div id="app">
    <!-- <router-link to="/data">data</router-link>
    <br><router-link to="/login">login</router-link> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  // import MyBody from './components/body.vue';

  export default {
    name: 'App',

  }
</script>

<style lang="less" scoped>
</style>
