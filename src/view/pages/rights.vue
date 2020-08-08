<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="authName" label="权限名称">
          </el-table-column>
          <el-table-column prop="path" label="路径">
          </el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template v-slot:default="scope">
              <el-tag v-if="scope.row.level === '0'">标签一</el-tag>
              <el-tag type="success" v-else-if="scope.row.level === '1'">标签二</el-tag>
              <el-tag type="warning" v-else>标签三</el-tag>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'rights',
  data () {
    return {
      // 表格数据
      tableData: [
        {
          authName: '王小虎',
          path: '',
          level: ''
        },
        {
          authName: '王小虎',
          path: '',
          level: ''
        },
        {
          authName: '王小虎',
          path: '',
          level: ''
        },
        {
          authName: '王小虎',
          path: '',
          level: ''
        }
      ]
    }
  },
  method: {},
  mouted () {
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.$http.get('rights/list').then(res => {
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data
        } else {
          this.$message.error('获取列表信息失败')
        }

        // console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
