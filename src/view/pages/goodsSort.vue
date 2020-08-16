<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary">添加分类</el-button>
      <!-- 表格区域 -->
        <zk-table :data="categoriesList" :columns="columsList"></zk-table>
       <!-- 分页 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totals">
        </el-pagination> -->
    </div>
</template>
<script>
export default {
  name: 'rights',
  data () {
    return {
      // 表格数据
      categoriesList: [],
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      columsList: [
        {
          label: '分类名称',
          prop: 'cat_name'
        }
      ],
      // 总数据条数
      total: 0
    }
  },
  method: {},
  mouted () {
  },
  created () {
    this.getcategoriesList()
  },
  methods: {
    getcategoriesList () {
      this.$http.get('categories', {params: this.queryInfo}).then(res => {
        this.categoriesList = res.data.data.result
        this.total = res.data.data.total
        console.log(res.data)
        console.log('this.categoriesList', this.categoriesList)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
// .el-button {
//   margin-top: 10px;
// }

</style>
