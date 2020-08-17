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
          <template slot="opt">
            <el-button type="primary" icon="el-icon-edit" size="mini">搜索</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">搜索</el-button>
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
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="80%">
          <el-form ref="formAddRef" :model="formAdd" label-width="80px" :rules="formAddRules">
            <el-form-item label="分类名称" prop="catName">
              <el-input v-model="formAdd.name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
              <!-- 连级选择 -->
                <el-cascader
                style="width:100%"
                  v-model="selectValue"
                  :options="parentList"
                  :props="{ expandTrigger: 'hover',value: 'cat_id',label: 'cat_name',children: 'children' }"
                  @change="handleChange"
                  :clearable="true">
                </el-cascader>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="define">确 定</el-button>
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
        catName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formAdd: {
        name: '',
        catPid: 0,
        catLevel: 0

      },
      parentList: [],
      selectValue: []
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
    handleChange () {

    }

  }
}
</script>
<style lang="less" scoped>
// .el-button {
//   margin-top: 10px;
// }

</style>
