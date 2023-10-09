<template>
  <div>
    <div class="name">贺卡名称：{{ imageName }}</div>
    <img :src="image01Url"><br>
    <img :src="image02Url" v-if="image02Url.length != 0">
  </div>
</template>

<script>
  export default {
    computed: {
      image01Url() {
        return this.$store.state.image01Url
      },
      image02Url() {
        return this.$store.state.image02Url
      },
      imageName() {
        return this.$store.state.imageName
      }
    }
  }
</script>

<style scoped>
  .name {
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  }
</style>