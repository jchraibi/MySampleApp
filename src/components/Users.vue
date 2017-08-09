<template>
  <el-table
      :if="tableData.size > 0"
      :data="tableData"
      style="width: 540">
      <el-table-column
        prop="firstname"
        label="First Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastname"
        label="Last Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="180">
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getAllUsers () {
      this.$http.get('/users').then((res) => {
        this.tableData = res.data
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
  width: 540px;
}
</style>
