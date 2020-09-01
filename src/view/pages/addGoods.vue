<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item><a>商品列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 内容区 -->
        <!-- 顶部提示 -->
        <el-alert
          title="添加商品信息！" type="info" center show-icon>
        </el-alert>
        <!-- 顶部进度条 -->
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="已完成"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <!-- 侧边导航 -->
        <el-tabs tab-position="left" style="height: 200px;">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      // 查询条件
      active: 1

    }
  },
  filters: {
    dateFormat (val) {
      const dt = new Date(val)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  },
  mouted () {
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('goods', {params: this.queryObj})
        .then(res => {
          console.log('goods---', res.data.data.total)
          this.goodsData = res.data.data.goods
          this.pagination.totals = res.data.data.total
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 查询表格
    toSearch () {
      this.getGoodsList()
    },
    // 添加商品
    addGoods () {
      this.$router.push('/goods/addGoods')
    },
    // 表格编辑
    editInfo () {

    },
    // 表格删除
    deleteInfo (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('goods/' + id)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getGoodsList()
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 显示条数改变
    handleSizeChange (newSize) {
      this.queryObj.pagesize = newSize
      this.getGoodsList()
    },
    // 页码改变
    handleCurrentChange (newCurrent) {
      this.queryObj.pagenum = newCurrent
      this.getGoodsList()
    },
    // 改变用户状态
    changeUserStatus (val) {
      console.log('val--', val)
      // val.mg_state = !val.mg_state
      this.$http.put(`users/${val.id}/state/${val.mg_state}`)
        .then(res => {
          this.$message.success('修改用户状态成功')
        })
        .catch(err => {
          val.mg_state = !val.mg_state
          this.$message.error('修改用户状态失败')
        })
    }

  }
}
</script>
<style lang="less" scoped>
  /deep/ .el-alert--info.is-light {
    margin-top: 20px;
  }

</style>
