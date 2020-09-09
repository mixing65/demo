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
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCity"></el-button>
              <el-button type="info" icon="el-icon-s-promotion" size="mini" @click="lookInfo"></el-button>
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
        <!-- 编辑地址对话框 -->
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
          <el-form ref="formAddRef" :model="formAdd" label-width="120px" :rules="formAddRules">
            <el-form-item label="省市区/县" prop="detailInfo1">
              <!-- 连级选择 -->
                <el-cascader
                  style="width:100%"
                  v-model="formAdd.selectValue"
                  :options="cityData"
                 >
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailInfo2">
              <el-input v-model="formAdd.detailInfo"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="define">确 定</el-button>
          </span>
        </el-dialog>
         <!-- 查看物流对话框 -->
        <el-dialog title="物流详情" :visible.sync="dialogVisible2" width="80%" @close="closeDialog">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time">
              {{activity.context}}
            </el-timeline-item>
          </el-timeline>
        </el-dialog>
    </div>
</template>
<script>
import cityData from '../../components/cityData'
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
      totals: 0,
      dialogVisible: false,
      dialogVisible2: false,
      formAdd: {
        detailInfo: '',
        selectValue: []
      },
      cityData,
      formAddRules: {
        detailInfo1: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        detailInfo2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      activities: []

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
    },
    // 地址
    editCity () {
      this.dialogVisible = true
    },
    // 物流
    lookInfo () {
      this.dialogVisible2 = true
      this.$http.get('/kuaidi/804909574412544580').then(res => {
        this.activities = res.data.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    cancle () {
      this.dialogVisible = false
    },
    define () {

    },
    closeDialog () {
      this.dialogVisible = false
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
