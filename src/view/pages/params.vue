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
            <el-tab-pane label="动态参数" name="first">
              <el-button type="primary" :disabled="selectValue.length < 1">添加参数</el-button>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="second">
              <el-button type="primary" :disabled="selectValue.length < 1">添加属性</el-button>
            </el-tab-pane>
          </el-tabs>
        <!-- 添加分类对话框 -->
          <!-- <el-dialog title="添加分类" :visible.sync="dialogVisible" width="80%" @close="closeDialog">
              <el-form ref="formAddRef" :model="formAdd" label-width="80px" :rules="formAddRules">
                <el-form-item label="分类名称" prop="name">
                  <el-input v-model="formAdd.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
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
          </el-dialog> -->
         <!-- 修改分类对话框 -->
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
      activeName: 'first'
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
    // 重置表单
    closeDialog () {
      this.$refs.formAddRef.resetFields()
      this.formAdd = {}
      this.selectValue = []
    },
    // 标签页切换
    handleClick () {

    },
    handleChange () {

    }

  }
}
</script>
<style lang="less" scoped>
.el-alert {
  margin: 20px 0;
}

</style>
