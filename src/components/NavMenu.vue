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
              <span class="myborder">输入图片名字</span><br>
              <input type="text" name="imageName">
            </div>
            <!-- 图片分类 -->
            <div class="mybox">
              <span class="myborder">选择图片分类:</span><br>
              <span><label><input name="type" type="checkbox" value="carousel" />轮播图&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="festival" />节日&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="couple" />情侣&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="birthday" />生日&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="newYear" />新年&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="parents" />亲情&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="teacher" />老师&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="camaraderie" />友情&nbsp;&nbsp;</label></span>
              <span><label><input name="type" type="checkbox" value="anniversary" />周年庆&nbsp;&nbsp;</label></span>
            </div>
            <!-- 上传正面 -->
            <div class="mybox">
              <label for="image01" class="myborder">选择贺卡正面照片:</label><br>
              <input type="file" name="image01">
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
        retList: []
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      show() {
        document.querySelector('.alert').style.display = 'flex'
      },
      hide() {
        document.querySelector('.alert').style.display = 'none'
      },


      //增加贺卡
      backHide(e) {     //这里注意，传参要不是 backHide($event),要不就不写括号，直接是backHide
        const alert = document.querySelector('.alert')
        if (e.target == alert) {
          alert.style.display = 'none'
        }
      },
      async submit(e) {
        e.preventDefault()
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
        await axios({
          url: 'http://localhost:8080/admin/upLoadImage',
          method: 'POST',
          data: formData,
          headers: {
            "token": this.token
          }
        }).then(ret => {
          console.log(ret)
          alert('上传成功')
          document.querySelector('.reset').click()    //触发reset的点击事件，重置表单
          document.querySelector('.el-menu-item.is-active').click()    //重新点击本标签，重新加载数据
        }).catch(err => {
          alert('增加贺卡失败了')
          console.log(err)
          document.querySelector('.reset').click()
        })
        document.querySelector('.alert').style.display = 'none'
      },



      //发类型，接受贺卡数组
      async bigNav(e) {
        this.type = e.target.dataset.mtype
        console.log(JSON.stringify(
          {
            type: this.type
          }
        ))
        await axios({
          url: 'http://localhost:8080/admin/getMessage',
          method: 'POST',
          data: JSON.stringify({
            type: this.type
          }),
          headers: {
            'Content-Type': 'application/json', // 指定请求头为JSON类型
            "token": this.token,
          }
        }).then(ret => {
          this.retList = ret.data.data
          console.log(this.retList)
        }).catch(err => {
          console.log(err)
          alert('获取信息出错')
        })
      },
    },
    components: {
      Mybody
    },
    computed: {
      token() {
        return this.$store.state.token
      }
    },

    async created() {
      await axios({
        url: 'http://localhost:8080/admin/getMessage',
        method: 'POST',
        data: JSON.stringify({
          type: 'all'
        }),
        headers: {
          'Content-Type': 'application/json', // 指定请求头为JSON类型
          'token': this.token
        }

      }).then(ret => {
        this.retList = ret.data.data
        console.log(this.retList)
      }).catch(err => {
        console.log(err)
        alert('获取信息出错')
      })
    }
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
</style>