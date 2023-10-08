<template>
  <el-row class="tac">
    <el-col :span="6">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <!-- <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-coin"></i>
            <span>全部</span>
          </template>
        </el-menu-item> -->
        <div @click="bigNav">
          <el-menu-item index="1" data-mtype="all">
            <i class="el-icon-coin"></i>
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item index="2" data-mtype="festival">
            <i class="el-icon-burger"></i>
            <span slot="title">节日</span>
          </el-menu-item>
          <el-menu-item index="3" data-mtype="birthday">
            <i class="el-icon-lollipop"></i>
            <span slot="title">生日</span>
          </el-menu-item>
          <el-menu-item index="4" data-mtype="anniversary">
            <i class="el-icon-dessert"></i>
            <span slot="title">周年庆</span>
          </el-menu-item>
        </div>
        <el-menu-item index="0" class="btn-alert" @click="show()">
          <i class="el-icon-circle-plus-outline"></i>
          <span slot="title">添加</span>
        </el-menu-item>
      </el-menu>
    </el-col>

    <!-- 组件1 -->
    <keep-alive>
      <Mybody :dataList="retList" @itemDeleted="refreshData"></Mybody>
    </keep-alive>
    <!-- 组件1 -->

    <div class="alert" @click="backHide">
      <div class=" alert-body">
        <div class="alert-title">添加贺卡<div class="close" @click="hide()">x</div>
        </div>
        <form action="" @submit="submit">
          <div class="alert-content">
            <!-- 内容 -->
            <!-- 贺卡名字 -->
            <div class="mybox">
              <span class="myborder">输入图片名称</span><br>
              <input type="text" name="imageName" @blur="blurChange" @focus="focusChange"><br>
              <div class="signs" v-if="!nameSign">&nbsp;!图片名称不能为空</div>
            </div>
            <!-- 图片分类 -->
            <div class="mybox">
              <span class="myborder" @click="typeChange">选择图片分类:</span><br>
              <span><label><input name="type" type="checkbox" value="carousel" />轮播图&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="festival" />节日&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="couple" />情侣&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="birthday" />生日&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="newYear" />新年&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="parents" />亲情&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="teacher" />老师&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="camaraderie" />友情&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="anniversary" />周年庆&nbsp;&nbsp;</label></span>
              <br>
              <div class="signs" v-if="!typeSign">&nbsp;!图片分类不能为空</div>
            </div>
            <!-- 上传正面 -->
            <div class="mybox">
              <label for="image01" class="myborder" @click="fileChange">选择贺卡正面照片:</label><br>
              <input type="file" name="image01">
              <div class="signs" v-if="!fileSign">&nbsp;!贺卡正面不能为空</div>
            </div>
            <!-- 上传背面 -->
            <div class="mybox">
              <label for="image02" class="myborder">选择贺卡背面照片:</label><br>
              <input type="file" name="image02">
            </div>
          </div>
          <div class="sub-father">
            <button type="submit" class="submit">上传</button>
            <input type="reset" class="reset">
          </div>
        </form>
      </div>
    </div>
  </el-row>
</template>

<script>
  import axios from 'axios';
  import Mybody from './body.vue';
  export default {
    data() {
      return {
        retList: [],
        type: '',
        nameSign: true,
        typeSign: true,
        fileSign: true
      }
    },
    methods: {
      //增加贺卡弹窗的显示与隐藏
      show() {
        document.querySelector('.alert').style.display = 'flex'
      },
      hide() {
        document.querySelector('.alert').style.display = 'none'
      },
      backHide(e) {     //这里注意，传参要不是 backHide($event),要不就不写括号，直接是backHide
        const alert = document.querySelector('.alert')
        if (e.target == alert) {
          alert.style.display = 'none'
        }
      },

      //增加贺卡开始
      //响应拦截器
      submitHandleResponse(responce) {
        if (responce.data.code === 0) {
          throw new Error(responce.data.msg)
        }
      },
      //增加贺卡
      async submit(e) {
        try {
          e.preventDefault()
          const state = this.blurChange() & this.fileChange() & this.typeChange()
          // console.log('state:')
          // console.log(state)
          if (!state) {
            // console.log(state)
            return
          }
          // console.log(e)
          const form = e.target
          // console.log(form)
          let formData = new FormData(form)
          // console.log(formData)
          let day = Array.from(document.getElementsByName("type"))
          const isDay = day
            .filter(arr => arr.checked)
            .map(arr => arr.value)
          formData.append('types', JSON.stringify(isDay))
          const ret = await axios({
            url: 'http://localhost:8080/admin/upLoadImage',
            method: 'POST',
            data: formData,
            headers: {
              "token": localStorage.getItem('token')
            }
          })
          this.submitHandleResponse(ret)
          alert('上传成功')
          document.querySelector('.alert').style.display = 'none'
          document.querySelector('.reset').click()
          //   document.querySelector('.el-menu-item.is-active').click()    //重新点击本标签，重新加载数据
        } catch (err) {
          console.log(err.message)
          alert(err.message)
        }
      },
      //表单验证模块
      blurChange() {
        const value = document.querySelector('[name=imageName]').value
        if (!value) {
          this.nameSign = false
          return false
        }
        else this.nameSign = true
        return true
      },
      focusChange() {
        this.nameSign = true
      },
      typeChange() {
        let day = Array.from(document.getElementsByName("type"))
        const isDay = day.filter(arr => arr.checked).map(arr => arr.value)
        console.log(isDay)
        if (isDay.length === 0) {
          setTimeout(() => {
            this.typeSign = true
          }, 1000);
          this.typeSign = false
          // console.log('false')
          return false
        }
        return true
      },
      fileChange() {
        const value = document.querySelector('[name = image01]').value
        if (!value) {
          setTimeout(() => {
            this.fileSign = true
          }, 1000);
          this.fileSign = false
          return false
        }
        return true
      },
      //表单验证模块
      //增加贺卡结束


      //查询模块
      //响应拦截
      typeHandleResponce(responce) {
        if (responce.data.code === 0) {
          throw new Error(responce.data.msg || '获取信息失败')
        }
        return responce.data.data
      },
      async bigNav(e) {
        try {
          this.type = e.target.dataset.mtype
          const ret = await axios({
            url: 'http://localhost:8080/admin/getMessage',
            method: 'POST',
            data: JSON.stringify({
              type: this.type
            }),
            headers: {
              'Content-Type': 'application/json', // 指定请求头为JSON类型
              "token": localStorage.getItem('token')
            }
          })
          //把ret给响应拦截，然后直接赋值给retList
          //ret也确实是对象数组
          this.retList = this.typeHandleResponce(ret)
        } catch (err) {
          console.log(err.message)

          //如果token失效的话，特殊处理
          if (err.message === 'NOT_LOGIN') {
            //弹窗
            alert('登录信息过期，请重新登录')
            //清除token信息
            this.$store.commit('addtoken', '')
            localStorage.setItem('token', '')
            //跳转回login
            this.$router.push({ name: 'login' })
          }
          else {
            alert(err.message)
          }
        }



        // .then(ret => {
        //   this.retList = ret.data.data
        //   console.log(this.retList)
        // }).catch(err => {
        //   console.log(err)
        //   alert('获取信息出错')
        // })
      },
      //刚进入初始化数据
      //有问题 刷新后回失去localstorage的token
      async created() {
        try {
          //先从localstorage获取token
          console.log('从这开始')
          console.log(this.token)
          console.log('从这结束')
          const ret = await axios({
            url: 'http://localhost:8080/admin/getMessage',
            method: 'POST',
            data: JSON.stringify({
              type: 'all'
            }),
            headers: {
              'Content-Type': 'application/json', // 指定请求头为JSON类型
              'token': localStorage.getItem('token')
            }
          })
          this.retList = this.typeHandleResponce(ret)
        } catch (err) {
          console.log(err.message)

          //如果token失效的话，特殊处理
          if (err.message === 'NOT_LOGIN') {
            //弹窗
            alert('登录信息过期，请重新登录')
            //清除token信息
            // this.$store.commit('addtoken', '')
            localStorage.setItem('token', '')
            //跳转回login
            this.$router.push({ name: 'login' })
          }
          else {
            alert(err.message)
          }
        }
      },


      //body删除后返回新的响应数据
      async refreshData() {
        try {
          const ret = await axios({
            url: 'http://localhost:8080/admin/getMessage',
            method: 'POST',
            data: JSON.stringify({
              type: this.type
            }),
            headers: {
              'Content-Type': 'application/json', // 指定请求头为JSON类型
              "token": localStorage.getItem('token')
            }
          })
          //把ret给响应拦截，然后直接赋值给retList
          //ret也确实是对象数组
          this.retList = this.typeHandleResponce(ret)
        } catch (err) {
          console.log(err.message)

          //如果token失效的话，特殊处理
          if (err.message === 'NOT_LOGIN') {
            //弹窗
            alert('登录信息过期，请重新登录')
            //清除token信息
            this.$store.commit('addtoken', '')
            localStorage.setItem('token', '')
            //跳转回login
            this.$router.push({ name: 'login' })
          }
          else {
            alert(err.message)
          }
        }
      }
    },


    components: {
      Mybody
    },

    computed: {
      // token() {
      //   return this.$store.state.token
      // }

    },



  }
</script>
<style scoped>
  .my-body {
    position: relative;
    left: 30%;
    height: 1000px;
    width: 1000px;
    background-color: rgba(1, 1, 1, 0.3);
  }
  .alert {
    display: none;
    justify-content: center; /*就是flex的一个属性，调整对齐方式的 */
    align-items: center; /*就是flex的一个属性，调整对齐方式的 */
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed; /*不会保留原有空间 */
    top: 0;
    left: 0;
  }
  .alert-body {
    width: 600px;
    background-color: #fff;
    border-radius: 10px;
    font-size: 30px;
    color: #000000;
    text-align: center;
    animation: moveFromBottom 0.3s linear;
  }
  .alert-title {
    line-height: 100px;
    border-bottom: 2px solid #eee;
    font-size: 40px;
    position: relative;
  }
  .close {
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
  .close:hover {
    color: red;
  }
  .alert-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    height: 450px;
    font-size: 20px;
    margin: 30px 70px -20px 70px;
    /* color: #999; */
    text-align: start;
  }
  @keyframes moveFromTop {
    0% {
      margin-top: -600px;
    }
    100% {
      margin-top: 0;
    }
  }
  @keyframes moveFromBottom {
    0% {
      margin-bottom: -600px;
    }
    100% {
      margin-bottom: 0;
    }
  }
  .submit {
    height: 35px;
    width: 65px;
  }
  .sub-father {
    width: 100%;
    border-top: 2px solid rgb(238, 238, 238);
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .mybox {
    width: 100%;
    background-color: rgba(236, 245, 255, 0.6);
    box-shadow: 8px 8px rgba(236, 245, 255, 1);
    padding: 10px;
    border-radius: 20px;
    margin: -10px;
  }
  input {
    outline: none !important;
  }
  .reset {
    display: none;
  }

  /* 表单验证字体 */
  .signs {
    color: red;
    font-size: 10px;
  }
</style>