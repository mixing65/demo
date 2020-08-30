<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>参数列表</el-breadcrumb-item>
      </el-breadcrumb>
       <el-alert
          title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon>
        </el-alert>
        <el-row>
          <el-col>
            <span>选择商品分类:</span>
            <el-cascader
                style="width:40%"
                  v-model="selectValue"
                  :options="categoriesList"
                  :props="{ expandTrigger: 'hover',value: 'cat_id',label: 'cat_name',children: 'children' }"
                  @change="handleChange"
                  :clearable="true"
                 >
                </el-cascader>
          </el-col>
        </el-row>
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many">
              <el-button type="primary" :disabled="selectValue.length < 1" @click="adddialogVisible = true">添加参数</el-button>
                <!-- 动态参数表格 -->
              <el-table :data="manyTab">
                    <!-- 展开行 -->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="deleteTags(scope.row,i)">
                      {{item}}
                    </el-tag>
                      <!-- 输入文本框 -->
                      <el-input
                        v-if="scope.row.inputVisible"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)"
                      >
                      </el-input>
                      <el-button v-else size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </template>
                </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMethods(scope.row.attr_id)">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletedMethods(scope.row.attr_id)">删除</el-button>
                      </template>
                    </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
              <el-button type="primary" :disabled="selectValue.length < 1" @click="adddialogVisible = true">添加属性</el-button>
               <!-- 静态参数表格 -->
              <el-table :data="onlyTab">
                <!-- 展开行 -->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="deleteTags(scope.row,i)">
                      {{item}}
                    </el-tag>
                      <!-- 输入文本框 -->
                      <el-input
                        v-if="scope.row.inputVisible"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)"
                      >
                      </el-input>
                      <el-button v-else size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini"  @click="editMethods(scope.row.attr_id)">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletedMethods(scope.row.attr_id)">删除</el-button>
                 </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        <!-- 添加分类对话框 -->
          <el-dialog :title="'添加' + `${activeName === 'many'? '动态参数': '静态属性'}`" :visible.sync="adddialogVisible" width="80%" @close="closeDialog">
              <el-form ref="formAddRef" :model="formAdd" label-width="80px">
                <el-form-item :label="activeName === 'many'? '动态参数': '静态属性'" >
                  <el-input v-model="formAdd.attr_name"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button @click="cancle">取 消</el-button>
              <el-button type="primary" @click="define">确 定</el-button>
              </span>
          </el-dialog>
         <!-- 修改分类对话框 -->
          <el-dialog :title="'修改' + `${activeName === 'many'? '动态参数': '静态属性'}`" :visible.sync="editdialogVisible" width="80%" @close="closeDialog">
              <el-form ref="formAddRef" :model="formAdd" label-width="80px">
                <el-form-item :label="activeName === 'many'? '动态参数': '静态属性'" >
                  <el-input v-model="formAdd.attr_name"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button @click="cancle2">取 消</el-button>
              <el-button type="primary" @click="define2">确 定</el-button>
              </span>
          </el-dialog>
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
      selectValue: [],
      activeName: 'many',
      manyTab: [],
      onlyTab: [],
      adddialogVisible: false,
      editdialogVisible: false,
      formAdd: {
        attr_name: ''
      },
      attrId: '',
      showInp: false
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
      this.$http.get('categories').then(res => {
        this.categoriesList = res.data.data
        console.log(res.data)
        console.log('this.categoriesList', this.categoriesList)
      }).catch(err => {
        console.log(err)
      })
    },
    // 标签页切换
    handleClick () {
      console.log(this.activeName)
      this.getList()
    },
    handleChange () {
      console.log(this.selectValue)
      this.getList()
    },
    // 获取三级连选值
    getList () {
      this.$http.get(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes`, {params: {sel: this.activeName}}).then(res => {
        this.$message.success('添加分类成功')
        this.getcategoriesList()
        if (this.activeName === 'many') {
          res.data.data.forEach(element => {
            element.attr_vals = element.attr_vals ? element.attr_vals.split(' ') : []
            element.inputVisible = false
            element.inputVale = ''
            console.log('element.attr_vals---', element.attr_vals)
          })
          this.manyTab = res.data.data
          console.log('this.manyTab', this.manyTab)
        } else {
          res.data.data.forEach(element => {
            element.attr_vals = element.attr_vals ? element.attr_vals.split(' ') : []
            element.inputVisible = false
            element.inputVale = ''
            console.log('element.attr_vals---', element.attr_vals)
          })
          this.onlyTab = res.data.data
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('添加分类失败')
      })
    },
    // 关闭添加参数对话框
    closeDialog () {
      this.adddialogVisible = false
      this.editdialogVisible = false
    },
    cancle () {
      this.adddialogVisible = false
    },
    // 保存添加参数
    define () {
      // categories/:id/attributes
      this.$http.post(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes`,
        {attr_name: this.formAdd.attr_name, attr_sel: this.activeName}
      ).then(res => {
        this.$message.success('添加分类参数成功')
        this.getList()
      }).catch(err => {
        console.log(err)
        this.$message.error('添加分类参数失败')
      })
      this.adddialogVisible = false
    },
    // 修改对话框
    edit () {
      console.log('7777')
      this.editdialogVisible = true
    },
    cancle2 () {
      this.editdialogVisible = false
    },
    // 保存添加参数
    define2 () {
      // categories/:id/attributes/:attrId
      this.$http.put(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes/${this.attrId}`,
        {attr_sel: this.activeName, attr_name: this.formAdd.attr_name}
      ).then(res => {
        this.formAdd.attr_name = res.data.data.attr_name
        // this.$message.success('添加分类参数成功')
        // this.getList()
      }).catch(err => {
        console.log(err)
        // this.$message.error('添加分类参数失败')
      })
      this.editdialogVisible = false
    },
    editMethods (id) {
      // categories/:id/attributes/:attrId
      this.attrId = id
      this.$http.get(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes/${id}`,
        {attr_sel: this.activeName}
      ).then(res => {
        this.formAdd.attr_name = res.data.data.attr_name
        // this.$message.success('添加分类参数成功')
        // this.getList()
      }).catch(err => {
        console.log(err)
        // this.$message.error('添加分类参数失败')
      })
      this.editdialogVisible = true
    },
    deletedMethods (id) {
      // categories/:id/attributes/:attrid
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes/${id}`)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
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
    handleInputConfirm (row) {
      row.inputVisible = false
      console.log('scope.row.inputValue', row.inputValue)
      if (!row.inputValue) {
        return false
      } else {
        row.attr_vals.push(row.inputValue.trim())
        console.log('row.attr_vals---', row.attr_vals)
        this.$http.put(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    showInput (scope) {
      scope.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除标签属性
    deleteTags (row, i) {
      row.attr_vals.splice(i)
      this.$http.put(`categories/${this.selectValue[this.selectValue.length - 1]}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(' ')
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>
<style lang="less" scoped>
.el-alert {
  margin: 20px 0;
}
/deep/.el-input--small .el-input__inner {
  width: 100px;
}

</style>
