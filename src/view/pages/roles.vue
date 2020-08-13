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
      <el-button slot="append" @click="addRoles" >添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">

        <el-table-column type="expand">
          <template  v-slot:default="scope">
          <el-row v-for="list1 in scope.row.children" :key="list1.id">
            <!-- 一级 -->
            <el-col :span="6">
              <el-tag closable @close="remove(scope.row,list1.id)">{{list1.authName}}</el-tag><i class="el-icon-caret-right"></i>
            </el-col>

            <el-col :span="18">
              <el-row  v-for="list2 in list1.children" :key="list2.id">
                <!-- 二级 -->
                <el-col :span="6">
                  <el-tag type="success" closable @close="remove(scope.row,list2.id)">{{list2.authName}}</el-tag><i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="12" >
                  <!-- 三级 -->
                    <el-tag type="warning" v-for="list3 in list2.children" :key="list3.id" closable @close="remove(scope.row,list3.id)">{{list3.authName}}</el-tag>
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
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="playRoles(scope.row)">分配权限</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
     <!-- 添加角色表单 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="80%" >
        <el-form ref="formAddRef" :model="formAdd" label-width="80px" :rules="formAddRules">
          <el-form-item label="角色名称" prop="username">
            <el-input v-model="formAdd.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="password">
            <el-input v-model="formAdd.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑角色表单 -->
      <el-dialog title="编辑用户" :visible.sync="updatedialogVisible" width="80%" >
        <el-form ref="formAddRef" :model="formUpdate" label-width="80px" :rules="formAddRules">
          <el-form-item label="角色名称" prop="username">
            <el-input v-model="formUpdate.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="password">
            <el-input v-model="formUpdate.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="updateDefine">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限 -->
      <el-dialog title="分配权限" :visible.sync="playdialogVisible" width="80%" @close="closeDialog">
        <el-tree :data="rightsList" show-checkbox node-key="id" default-expand-all :default-checked-keys="checkArray"
          :props="defaultProps" ref="treeRef">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancle2">取 消</el-button>
          <el-button type="primary" @click="updateRoles">确 定</el-button>
        </span>
      </el-dialog>
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
      ],
      dialogVisible: false,
      updatedialogVisible: false,
      playdialogVisible: false,
      formAdd: {
        roleName: '',
        roleDesc: ''
      },
      formUpdate: {
        roleName: '',
        roleDesc: ''
      },
      formAddRules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      rightsList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkArray: [],
      saveId: ''

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
            console.log('this.tableData---', this.tableData)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 添加角色
    addRoles () {
      this.dialogVisible = true
    },
    cancle () {
      this.$refs.formAddRef.resetFields()
      this.dialogVisible = false
      this.updatedialogVisible = false
    },
    cancle2 () {
      this.playdialogVisible = false
    },
    define () {
      this.$http.post('roles', this.formAdd).then(res => {
        this.$message.success('添加用户成功')
        this.getRolesList()
        this.dialogVisible = false
        this.updatedialogVisible = false
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('添加用户失败')
      })
    },
    // 编辑查询
    editInfo (id) {
      this.updatedialogVisible = true
      this.$http.get('roles/' + id).then(res => {
        this.$message.success('查询用户成功')
        this.formUpdate = res.data.data
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('查询用户失败')
      })
    },
    // 编辑提交
    updateDefine (id) {
      this.$http.put('roles/' + this.formUpdate.roleId, this.formUpdate).then(res => {
        this.$message.success('添加用户成功')
        this.getRolesList()
        this.dialogVisible = false
        this.updatedialogVisible = false
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('添加用户失败')
      })
    },
    // 删除用户信息
    deleteInfo (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('roles/' + id)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRolesList()
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
    // tag标签删除
    remove (row, id) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`roles/${row.id}/rights/${id}`)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            row.children = res.data.data
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
    // 分配权限
    playRoles (role) {
      this.saveId = role.id
      console.log('this.saveId----------', role.id)
      this.$http.get('rights/tree')
        .then(res => {
          this.rightsList = res.data.data
          console.log('rights/tree', res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
      this.getLefKeys(role, this.checkArray)
      this.playdialogVisible = true
    },
    // 获取三级权限id
    getLefKeys (node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach(item => {
          this.getLefKeys(item, arr)
        })
      }
    },
    closeDialog () {
      this.checkArray = []
    },
    // 修改角色权限
    updateRoles (row) {
      console.log(' this.saveId', this.saveId)
      let keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedNodes()]
      let idStr = keys.join(',')
      this.$http.post(`roles/${this.saveId}/rights`, {rids: idStr}).then(res => {
        this.$message.success('分配角色成功')
        this.getRolesList()
        this.playdialogVisible = false
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message.error('分配角色失败')
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
