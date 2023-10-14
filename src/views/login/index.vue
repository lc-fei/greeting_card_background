<template>
  <div class="myf">
    <div class="mys">
      <div class="img"></div>
      <div class="login">
        <h1 class="font">LogIn</h1>
        <div class="username mydiv">
          <span class="sp" style="font-family: '宋体'">用户名：</span>
          <input type="text" style="font-family: '宋体'" v-model="userName" class="inp" placeholder=" 请输入用户名" @keydown.enter="enterChange">
        </div>
        <div class="password mydiv">
          <span class="sp" style="font-family: '宋体'">密&nbsp;码：</span>
          <input type="password" style="font-family: '宋体'" v-model="password" class="inp change" placeholder=" 请输入密码" @keydown.enter="enterLogin">
        </div>
        <button class="submit" style="font-family: '宋体'" @mousedown="keycolor=true" @mouseup="keycolor=false" :class="{'keycolor': keycolor}" @click="submit">登录</button>
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

      //请求拦截器
      async sendRequest(config) {
        if (JSON.parse(config.data).userName.length != '12') {
          // throw new Error(response.message || '请求出错');
          throw new Error('账号格式错误，请重新输入')
        }
        const responce = await axios(config)       //发送请求的时候，因为数据不是直接加到axios中的，所以要转成JSON以及加请求头
        return responce
      },

      //响应拦截器
      handleResponse(responce) {
        // console.log('ret:')
        // console.log(ret)
        // console.log(typeof ret)    //对象
        if (responce.data.code === 0) {
          throw new Error(responce.data.msg || '登录出错')
        }
        console.log('我要返回token了')
        const token = responce.data.data
        return token          //返回token
      },


      async submit() {
        // console.log(this.$store.state.sign)
        // console.log(this.password)
        try {
          const ret = await this.sendRequest({       //这里直接await解析promise对象
            url: '/admin/login',
            method: 'POST',
            data: JSON.stringify({
              userName: this.userName,
              password: this.password
            }),
            headers: {
              'Content-Type': 'application/json'         //别忘了
            }
          })
          let retToken = this.handleResponse(ret)
          console.log(retToken)
          localStorage.setItem('token', retToken)
          this.$store.commit('addtoken', retToken)

          //跳转
          this.$router.push({ name: 'data' })
          alert('登录成功')
        }
        catch (err) {
          console.log(err.message)
          alert(err.message)
        }
      },
      enterLogin() {
        document.querySelector('.submit').click()
      },
      enterChange() {
        document.querySelector('.change').focus()
      }
    },
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
    height: 330px;
    width: 650px;
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