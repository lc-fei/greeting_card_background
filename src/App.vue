<template>
  <div id="app">
    <MyHeader></MyHeader>
    <span>
      <NavMenu class="sp"></NavMenu>
    </span>
  </div>
</template>

<script>
  // import MyBody from './components/body.vue';
  import MyHeader from './components/header.vue';
  import NavMenu from './components/NavMenu.vue';
  export default {
    name: 'App',
    components: {
      // MyBody,
      MyHeader,
      NavMenu,
    }
  }
</script>

<style lang="less" scoped>
</style>
