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
      <el-input placeholder="请输入内容"
                v-model="query"
                clearable
                @clear="toSearch">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="toSearch"></el-button>
      </el-input>
      <el-button type="primary"
                 @click="dialogVisible=true">添加用户</el-button>
      <!-- 表格 -->
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column type="index"
                         label="#"
                         align="center">
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名"
                         align="center">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         align="center">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话"
                         align="center">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色"
                         align="center">
        </el-table-column>
        <el-table-column prop="mg_state"
                         label="状态"
                         align="center">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="changeUserStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         label="操作"
                         min-width="200"
                         align="center">
          <template v-slot:default="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="editInfo(scope.row.id)"></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="deleteInfo(scope.row.id)"></el-button>
            <el-button type="warning"
                       icon="el-icon-setting"
                       size="mini"
                       @click="setRoles(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagenum"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pagination.totals">
      </el-pagination>
    </div>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户"
               :visible.sync="dialogVisible"
               width="80%">
      <el-form ref="formAddRef"
               :model="formAdd"
               label-width="80px"
               :rules="formAddRules">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="formAdd.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="formAdd.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="formAdd.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="formAdd.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary"
                   @click="define">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户表单 -->
    <el-dialog title="修改用户信息"
               :visible.sync="updatedialog"
               width="80%">
      <el-form ref="formUpdateRef"
               :model="formUpdate"
               label-width="80px"
               :rules="formUpdateRules">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="formUpdate.username"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="formUpdate.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="formUpdate.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancle2">取 消</el-button>
        <el-button type="primary"
                   @click="define2">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色表单 -->
    <el-dialog title="分配角色"
               :visible.sync="setRolesDialog"
               width="80%"
               @close="closeDialog">
      <el-form ref="formUpdateRef"
               :model="userInfo"
               label-width="120px"
               :rules="formUpdateRules">
        <el-form-item label="当前用户">
          <el-input v-model="userInfo.username"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="当前角色">
          <el-input v-model="userInfo.role_name"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model="newsRoles"
                     placeholder="请选择">
            <el-option v-for="item in roleList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancle3">取 消</el-button>
        <el-button type="primary"
                   @click="resetRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    // 自定义规则
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入正确邮箱'))
        } else {
          callback()
        }
      }, 500)
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      let reg = /^1[3456789]\d{9}$/
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入正确手机号'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 10,
      // 分页
      pagination: {
        totals: 1
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
        }
      ],
      // 添加用户表单
      dialogVisible: false,
      // 表单数据绑定
      formAdd: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单规则
      formAddRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入是手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      formUpdateRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入是手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      // 修改用户信息弹框
      updatedialog: false,
      formUpdate: {
        username: '',
        email: '',
        mobile: ''
      },
      updateId: '',
      // 分配角色
      setRolesDialog: false,
      userInfo: {},
      roleList: [],
      newsRoles: ''

    }
  },
  mouted () {
  },
  created () {
    this.toSearch()
  },
  methods: {
    toSearch () {
      let sendObj = {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      console.log('sendObj', sendObj)
      this.$http.get('users', { params: sendObj })
        .then(res => {
          if (res.data.meta.status != 200) {

          } else {
            this.tableData = res.data.data.users
            this.pagination.totals = res.data.data.total
            console.log('res', res.data.data.users)
            console.log('data.total')
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 显示条数改变
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.toSearch()
    },
    // 页码改变
    handleCurrentChange (newCurrent) {
      this.pagenum = newCurrent
      this.toSearch()
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
    },
    // 取消
    cancle () {
      this.dialogVisible = false
      // 重置表单数据及验证
      this.$refs.formAddRef.resetFields()
      // this.$refs.formUpdateRef.resetFields()
    },
    cancle2 () {
      this.updatedialog = false
      // 重置表单数据及验证
      this.$refs.formUpdateRef.resetFields()
    },
    cancle3 () {
      this.setRolesDialog = false
    },
    // 确定
    define () {
      this.$refs.formAddRef.validate(valid => {
        if (valid) {
          this.$http.post('users', this.formAdd)
            .then(res => {
              this.$message.success('添加用户成功')
              this.toSearch()
              this.dialogVisible = false
            })
            .catch(err => {
              this.$message.error('添加用户失败')
            })
        }
      })
      // this.dialogVisible = false
    },
    // 修改用户信息
    editInfo (id) {
      this.updateId = id
      this.$http.get(`users/${id}`)
        .then(res => {
          console.log('res--', res.data.meta)
          if (res.data.meta.status == '200') {
            this.formUpdate = res.data.data
            this.updatedialog = true
          }

          console.log('res--', res.data.data)
        })
        .catch(err => {
          console.log('res--', err)
        })
    },
    define2 () {
      this.$refs.formUpdateRef.validate(valid => {
        if (valid) {
          this.$http.put('users/' + this.formUpdate.id, this.formUpdate)
            .then(res => {
              this.$message.success('修改用户成功')
              this.toSearch()
              this.updatedialog = false
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              this.$message.error('修改用户失败')
            })
        }
      })
      // this.dialogVisible = false
    },
    // 删除用户信息
    deleteInfo (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('users/' + id)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.toSearch()
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
    // 分配角色
    setRoles (userInfo) {
      this.userId = userInfo.id
      this.$http.get('roles').then(res => {
        console.log('userInfores---', res.data.data)
        this.roleList = res.data.data
      }).catch(err => {
        console.log('userInfoerr---', res)
      })
      this.userInfo = userInfo
      this.setRolesDialog = true
    },
    // 保存修改角色
    resetRoles () {
      this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.newsRoles }).then(res => {
        this.$message.success('修改角色成功')
        this.setRolesDialog = false
        this.toSearch()
      }).catch(err => {
        this.$message.error('修改角色失败')
      })
    },
    closeDialog () {
      this.newsRoles = ''
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
