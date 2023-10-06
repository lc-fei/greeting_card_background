<template>
  <div class="myf">
    <div class="mys">
      <div class="img"></div>
      <div class="login">
        <h1 class="font">LogIn</h1>
        <div class="username mydiv">
          <span class="sp">用户名：</span>
          <input type="text" v-model="userName" class="inp" placeholder=" 请输入用户名">
        </div>
        <div class="password mydiv">
          <span class="sp">密&nbsp;&nbsp;&nbsp;码：</span>
          <input type="password" v-model="password" class="inp" placeholder=" 请输入密码">
        </div>
        <button class="submit" @mousedown="keycolor=true" @mouseup="keycolor=false" :class="{'keycolor': keycolor}" @click="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        userName: '',
        password: '',
        keycolor: false
      }
    },
    methods: {
      async submit() {
        // console.log(this.$store.state.sign)
        // console.log(this.password)
        await axios({
          url: 'http://8.137.98.54:8080/admin/login',
          method: 'POST',
          data: {
            userName: this.userName,
            password: this.password
          }
        }).then(ret => {
          if (this.$store.state.token) {
            alert('您已登录，不需再次登录')
            this.$router.push({ name: 'data' })
            return
          }
          const token = ret.data.data
          localStorage.setItem('token', token)
          this.$router.push({ name: 'data' })
          alert('登录成功')
        }).catch(err => {
          console.log(err)
          alert('登录失败')
        })
      },
    }
  }
</script>

<style scoped>
  .font {
    font-family: 'FZShuTi';
    font-size: 45px;
  }
  .myf {
    height: 100vh;
    /* vh是视窗高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url(@/assets/login-bgc.png); */
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
    top: 0;
    left: 48%;
    /* background-color: pink; */
    height: 60%;
    width: 50%;
  }

  .sp {
    font-size: 23px;
    vertical-align: middle; /* 使用 middle 将基线垂直居中对齐 */
    flex: 33%;
  }
  .inp {
    outline: none;
    background-color: rgb(234, 234, 234);
    border: none;
    height: 23px;
    flex: 67%;
    font-size: 15px;
  }

  .mydiv {
    display: flex;
    align-items: center;
    height: 50px;
  }
  .submit {
    position: absolute;
    left: 32%;
    margin-top: 10px;
    height: 36px;
    width: 120px;
    border-radius: 36px;
    border: 1px solid rgb(0, 0, 0);
    cursor: pointer;
  }
  .keycolor {
    background-color: rgb(184, 184, 184);
  }
</style>

<!-- 上244,249,255 -->
<!-- 下236,245,255 -->