<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <div class="contentBox">
      <el-input placeholder="请输入内容"
                v-model="queryObj.query"
                clearable
                @clear="toSearch">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="toSearch"></el-button>
      </el-input>
      <el-button type="primary"
                 @click="addGoods">添加商品</el-button>
      <!-- 表格 -->
      <el-table :data="goodsData"
                style="width: 100%">
        <el-table-column type="index"
                         label="#"
                         align="center">
        </el-table-column>
        <el-table-column prop="goods_name"
                         label="商品名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="goods_price"
                         label="商品价格（元）"
                         align="center">
        </el-table-column>
        <el-table-column prop="goods_weight"
                         label="商品重量"
                         align="center">
        </el-table-column>
        <el-table-column prop="add_time"
                         label="创建时间"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         label="操作"
                         align="center"
                         min-width="200">
          <template v-slot:default="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="editInfo(scope.row.id)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="deleteInfo(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryObj.pagenum"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="queryObj.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.totals">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      // 查询条件
      searchInfo: '',
      queryObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 表格数据
      goodsData: [],
      // 分页
      pagination: {
        totals: 10
      }

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
      this.$http.get('goods', { params: this.queryObj })
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
      this.$router.push('/home/addGoods')
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
.contentBox {
  margin-top: 20px;
  .el-input {
    width: 50%;
  }
}
</style>
