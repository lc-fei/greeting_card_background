<template>
  <div>
    <MyHeader></MyHeader>
    <span>
      <NavMenu class="sp"></NavMenu>
    </span>
  </div>
</template>

<script>
  import MyHeader from '@/components/header.vue';
  import NavMenu from '@/components/NavMenu.vue';
  export default {
    components: {
      // MyBody,
      MyHeader,
      NavMenu,
    }
  }
</script>

<style>
</style>