<template>
  <div class="myf">
    <div class="mys">
      <div class="img"></div>
      <div class="login">
        <div class="username mydiv">
          <span class="sp">用户名：</span>
          <input type="text" v-model="userName" class="inp" @focus="light">
        </div>
        <div class="password mydiv">
          <span class="sp">密码：</span>
          <input type="text" v-model="password" class="inp" @focus="light">
        </div>
        <div class="submit">
          <button>登录</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      light(e) {
        console.log(e.target)
        // e.target.style.background - color = 'pink'
      }
    }
  }
</script>

<style scoped>
  .myf {
    height: 100vh;
    /* vh是视窗高度 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mys {
    height: 40%;
    width: 50%;
    background-color: rgba(0, 0, 0, 0.21);
    border-radius: 35px;
    box-shadow: 13px 13px rgba(0, 0, 0, 0.28);
    overflow: hidden;
    position: relative;
  }
  .img {
    display: inline-block;
    background: url(@/assets/cat.jpg) no-repeat;
    background-size: 100% 100%;
    height: 105%;
    width: 45%;
    box-shadow: none;
  }
  .login {
    position: absolute;
    top: 12%;
    left: 48%;
    /* background-color: pink; */
    height: 60%;
    width: 50%;
  }

  .sp {
    font-size: 23px;
    vertical-align: middle; /* 使用 middle 将基线垂直居中对齐 */
  }
  .inp {
    outline: none;
    background-color: rgb(234, 234, 234);
    border: none;
    height: 23px;
  }

  .mydiv {
    height: 50px;
  }
</style>

<!-- 上244,249,255 -->
<!-- 下236,245,255 -->