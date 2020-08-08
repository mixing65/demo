<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <div class="contentBox">
      <el-button slot="append" @click="toSearch" >添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">

        <el-table-column type="expand">
          <template  v-slot:default="scope">
          <el-row v-for="list1 in scope.row.children" :key="list1.id">
            <!-- 一级 -->
            <el-col :span="6">
              <el-tag>{{list1.authName}}</el-tag><i class="el-icon-caret-right"></i>
            </el-col>

            <el-col :span="18">
              <el-row  v-for="list2 in list1.children" :key="list2.id">
                <!-- 二级 -->
                <el-col :span="6">
                  <el-tag type="success">{{list2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="12" >
                  <!-- 三级 -->
                    <el-tag type="warning" v-for="list3 in list2.children" :key="list3.id">{{list3.authName}}</el-tag>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInfo(scope.row.id)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteInfo(scope.row.id)">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      tableData: [
        {
          roleDesc: '王小虎',
          roleName: ''
        }
      ]
    }
  },
  mouted () {
  },
  created () {
    this.getRolesList()
  },
  methods: {
    getRolesList () {
      this.$http.get('roles')
        .then(res => {
          if (res.data.meta.status !== 200) {

          } else {
            console.log('res', res.data)
            this.tableData = res.data.data
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.contentBox {
  border: 1px solid black;
  margin-top: 20px;
  .el-input {
    width: 50%;
  }
}
</style>
