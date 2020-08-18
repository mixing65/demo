<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="addSort">添加分类</el-button>
      <!-- 表格区域 -->
        <zk-table :data="categoriesList" :columns="columsList" :selection-type="false">
          <!-- 是否有效 -->
          <template slot="isOk" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:green"></i>
            <i class="el-icon-error" v-else style="color:red"></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag type="warning" size="mini" v-else>三级</el-tag>
          </template>
          <!-- 操作 -->
          <template slot="opt" slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editSort(scope.row.cat_id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSort(scope.row.cat_id)">搜索</el-button>
          </template>
        </zk-table>
       <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 添加分类对话框 -->
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
          <el-form ref="formAddRef" :model="formAdd" label-width="80px" :rules="formAddRules">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="formAdd.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
              <!-- 连级选择 -->
                <el-cascader
                style="width:100%"
                  v-model="selectValue"
                  :options="parentList"
                  :props="{ expandTrigger: 'hover',checkStrictly: true,value: 'cat_id',label: 'cat_name',children: 'children' }"
                  @change="handleChange"
                  :clearable="true"
                 >
                </el-cascader>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="define">确 定</el-button>
          </span>
        </el-dialog>
         <!-- 修改分类对话框 -->
        <el-dialog title="修改分类" :visible.sync="editDialogVisible" width="80%" @close="closeDialog">
          <el-form ref="formAddRef" :model="formUpdate" label-width="80px">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="formUpdate.cat_name"></el-input>
            </el-form-item>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
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
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      columsList: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          // 这一列模板
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          // 这一列模板
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          // 这一列模板
          template: 'opt'
        }
      ],
      // 总数据条数
      total: 0,
      // 添加分类对话框
      dialogVisible: false,
      formAddRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formAdd: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      parentList: [],
      selectValue: [],
      formUpdate: {cat_name: ''},
      editDialogVisible: false,
      saveId: ''
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
    },
    // 监听pagesize变化
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getcategoriesList()
    },
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getcategoriesList()
    },
    addSort () {
      this.getParent()
      this.dialogVisible = true
    },
    cancle () {
      this.dialogVisible = false
    },
    define () {
      this.dialogVisible = false
      console.log('this.formAdd', this.formAdd)
      this.$http.post('categories', this.formAdd).then(res => {
        this.$message.success('添加分类成功')
        this.getcategoriesList()
      }).catch(err => {
        console.log(err)
        this.$message.error('添加分类失败')
      })
    },
    // 获取父级分类数据列表
    getParent () {
      this.$http.get('categories', {params: {type: 2}}).then(res => {
        // console.log(res.data.data)
        this.parentList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange (nes) {
      console.log('nes', nes)
      if (this.selectValue.length > 0) {
        // 父级分类id
        this.formAdd.cat_pid = this.selectValue[this.selectValue.length - 1]
        // level值
        this.formAdd.cat_level = this.selectValue.length
      } else {
        this.formAdd.cat_pid = 0
        this.formAdd.cat_level = 0
      }
    },
    // 重置表单
    closeDialog () {
      this.$refs.formAddRef.resetFields()
      this.formAdd = {}
      this.selectValue = []
    },
    editSort (catId) {
      this.saveId = catId
      console.log('catId', catId)
      this.editDialogVisible = true
      this.$http.get('categories/' + catId).then(res => {
        this.$message.success('查询分类成功')
        this.formUpdate.cat_name = res.data.data.cat_name
      }).catch(err => {
        console.log(err)
        this.$message.error('查询分类失败')
      })
    },
    deleteSort (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('categories/' + id)
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getcategoriesList()
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
    define2 () {
      this.$http.put('categories/' + this.saveId, this.formUpdate).then(res => {
        this.$message.success('修改分类成功')
        this.getcategoriesList()
      }).catch(err => {
        console.log(err)
        this.$message.error('修改分类失败')
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
