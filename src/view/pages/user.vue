<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 内容区 -->
      <div class="contentBox">
        <el-input placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="username" label="姓名">
          </el-table-column>
          <el-table-column prop="email" label="邮箱">
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
          </el-table-column>
          <el-table-column prop="role_name" label="角色">
          </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template v-slot:default="scope">
              <el-switch v-model="scope.row.mg_state"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="200">
            <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totals">
        </el-pagination>
      </div>
    </div>
</template>
<script>
export default {
  name: 'users',
  data() {
    return {
      query: '',
      //当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize:10,
      // 分页
      pagination:{
        totals: 1,
      },
      tableData: [
        {
          username: '王小虎',
          mobile: '',
          email: '',
          role_name: '',
          mg_state: false
        }, 
        {
          username: '王小虎',
          mobile: '',
          email: '',
          role_name: '',
          mg_state: false
        }, 
        {
          username: '王小虎',
          mobile: '',
          email: '',
          role_name: '',
          mg_state: false
        }, 
        {
          username: '王小虎',
          mobile: '',
          email: '',
          role_name: '',
          mg_state: false
        }, 
      ]
    }
  },
  method: {},
  mouted() {
  },
  created() {
    this.toSearch()
  },
  methods: {
    toSearch() {
      let sendObj = {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      console.log('sendObj',sendObj)
      this.$http.get('users',{params:sendObj})
      .then(res => {
        if(res.data.meta.status != 200){
          return
        }else {
          this.tableData = res.data.data.users
          this.pagination.totals = res.data.data.total
          console.log('res',res.data.data.users)
          console.log('data.total',)
        }
        
      })
      .catch(err => {
        console.log('err',err)
      })
    },
    handleSizeChange(newSize) {
      this.pagesize =newSize
      this.toSearch()

    },
    handleCurrentChange(newCurrent) {
      this.pagenum =newCurrent
      this.toSearch()
    }
  }
}
</script>
<style lang="less" scoped>
.contentBox {
  border: 1px solid black;
  margin-top: 20px;
}

</style>