<template>
  <el-table :data="dataList" height="620" border style="width: 70%">
    <el-table-column label="序号" type="index" width="100">
    </el-table-column>
    <el-table-column prop="imageName" label="名称" width="300">
    </el-table-column>
    <!-- <el-table-column prop="address" label="地址">
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- @click="handleEdit(scope.$index, scope.row)" -->
        <!-- @click="handleDelete(scope.$index, scope.row)" -->
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>



  import axios from 'axios'
  export default {
    props: ['dataList'],
    data() {
      return {
        // here
      }
    },
    methods: {
      // handleEdit(index, data) {
      //   console.log(data)
      // },
      // show1() {

      // },
      // hide1() {

      // },
      // show2() {
      //   document.querySelector('#alert_delete').style.display = 'flex'
      // },
      // hide2() {

      // },

      delCatchResponce(responce) {
        if(responce.data.code === 0)
        throw new Error(responce.data.msg)
      },
      //删除数据方法
      async handleDelete(index, row) {
        try{
        console.log(row)
        const imageId = row.id
        console.log(imageId)
        console.log(this.token)
        const responce = await axios({
          url: '/admin/delImage',
          method: 'POST',
          data: {
            imageId
          },
          headers: {
            "token": this.token,
          }
        })
        this.delCatchResponce(responce)
        console.log('成功删除了一项数据')
        this.$emit('itemDeleted')
        alert('删除成功')
        } catch(err) {
          console.log(err.message)
          alert(err.message)
        }
      },

      //点击查看事件
      handleEdit(index, row) {
        console.log(row)
        const image01Url = row.imageFrontUrl
        const image02Url = row.imageContraryUrl
        this.$store.commit('setImageName', row.imageName)
        this.$store.commit('setImage01Url', image01Url)
        this.$store.commit('setImage02Url', image02Url)
        this.$router.push({ name: 'look' })
      },

    },
    computed: {
      token() {
        return this.$store.state.token
      }
    }
  }
</script>

<style scoped>
  .btn-alert {
    display: block;
    width: 400px;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    border-radius: 10px;
    color: #000;
    font-size: 40px;
    margin: 20px auto 0;
    border: none;
    cursor: pointer;
    letter-spacing: 5px;
    box-shadow: 0 0 5px #fff;
  }
</style>