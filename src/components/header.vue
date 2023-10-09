<template>
  <div class="body">
    <div class="trademark">
      <img src="../assets/logo.jpg" alt="" class="my-img">
    </div>

    <div class=" user">
      <router-link to="/login">
        <img src="../assets/user.jpg" alt="" class="my-img">
      </router-link>
    </div>

    <div class=" search">
      <i class="el-icon-search" style="font-size: 20px;"></i>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .body {
    height: 50px;
    width: 100%;
    border-bottom: 2px solid rgba(99, 187, 207, 0.8);
    position: relative;
  }
  .trademark {
    position: absolute;
    left: 80px;
    top: auto;
    height: 45px;
    width: 100px;
    /* border: 1px solid red; */
    /* background: url('../assets/logo.jpg') no-repeat center fixed; */
    cursor: pointer;
  }
  .user {
    position: absolute;
    right: 80px;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    cursor: pointer;
  }
  .search {
    position: absolute;
    right: 230px;
    top: 50%;
    margin: -11px;
    height: 22px;
    width: 22px;
    cursor: pointer;
  }
  .my-img {
    height: 100%;
    overflow: hidden;
  }
</style>s