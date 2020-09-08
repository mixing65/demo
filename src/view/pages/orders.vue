<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
        <el-breadcrumb-item><a>订单列表</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 内容区 -->
        <el-input placeholder="请输入内容" v-model="searchInfo.query" clearable @clear="toSearch">
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
         <!-- 表格 -->
        <el-table :data="ordersData" style="width: 100%" border stripe>
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="order_number" label="订单编号">
          </el-table-column>
          <el-table-column prop="order_price" label="订单价格">
          </el-table-column>
          <el-table-column prop="order_pay" label="是否付款">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.pay_status === '1'">已付款</el-tag>
              <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货">
          </el-table-column>
          <el-table-column prop="create_time" label="下单时间">
             <template slot-scope="scope">
              {{scope.row.create_time | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="200">
            <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInfo(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteInfo(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
         <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchInfo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals">
        </el-pagination>
    </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      searchInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      ordersData: [],
      totals: 0

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
    this.toSearch()
  },
  methods: {
    // 获取订单列表
    toSearch () {
      this.$http.get('orders', {params: this.searchInfo})
        .then(res => {
          console.log('goods---', res.data.data)
          this.totals = res.data.data.total
          this.ordersData = res.data.data.goods
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 显示条数改变
    handleSizeChange (newSize) {
      this.searchInfo.pagesize = newSize
      this.toSearch()
    },
    // 页码改变
    handleCurrentChange (newCurrent) {
      this.searchInfo.pagenum = newCurrent
      this.toSearch()
    }
  }
}
</script>
<style lang="less" scoped>
.el-input-group {
  margin-top: 15px;
  width: 60%;
}

</style>
