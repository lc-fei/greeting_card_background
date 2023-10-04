<template>
  <el-table :data="dataList" height="500" border style="width: 70%">
    <el-table-column label="序号" type="index" width="100">
    </el-table-column>
    <el-table-column prop="imageName" label="名称" width="240">
    </el-table-column>
    <!-- <el-table-column prop="address" label="地址">
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- @click="handleEdit(scope.$index, scope.row)" -->
        <!-- @click="handleDelete(scope.$index, scope.row)" -->
        <!-- <el-button size="mini" @click="show1()">查看</el-button> -->
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

      //删除数据方法
      handleDelete(index, row) {
        const formData = new FormData()
        console.log(row)
        const id = row.imageId
        formData.append('imageId', parseInt(id, 10))
        console.log(formData.get('imageId'))
        axios({
          url: 'http://8.137.98.54:8080/delMessage',
          method: 'POST',
          data: formData
        }).then(ret => {
          console.log(ret)
          alert('删除成功')
          this.$emit('itemDeleted')
        }).catch(err => {
          console.log(err)
          alert('删除失败')
        })
      }

    },
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