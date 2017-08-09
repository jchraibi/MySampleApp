<template>
  <el-table
      :if="tableData.size > 0"
      :data="tableData"
      style="width: 540">
      <el-table-column
        prop="firstname"
        label="First Name">
      </el-table-column>
      <el-table-column
        prop="lastname"
        label="Last Name">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
  </el-table>
</template>

<script>
import userMgr from '../api/users'

export default {
  name: 'user-list',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getAllUsers () {
      userMgr.getAllUsers((userList) => {
        this.tableData = userList
      }, (error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getAllUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.el-table {
  margin: 10px 10px 10px 10px;
  width: 640px;
}
</style>
