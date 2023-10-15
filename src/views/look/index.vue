<template>
  <div>
    <div class="name">贺卡名称：{{ imageName }}</div>
    <div class="bg bg1">
      <i>正面：</i>
    <img :src="image01Url"><br>
    </div><br>
    <div class="back">反面：</div>
    <div class="bg bg2">
    <img :src="image02Url" v-if="image02Url.length != 0">
    <i v-else>该贺卡不存在反面</i>
    </div>
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
    width: 50%;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  }
  
  .bg {
    height: 300px;
    width: 500px;
  }
  img {
    height: 100%;
    width: 100%;
  }
  i {
    font-style: normal;
  }
  .back {
    width: 61.8%;
    margin-top: 20px;
  }
</style>