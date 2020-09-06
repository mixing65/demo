<template>
    <div>
      <!-- 头部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item><a>商品列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 内容区 -->
        <!-- 顶部提示 -->
        <el-alert
          title="添加商品信息！" type="info" center show-icon>
        </el-alert>
        <!-- 顶部进度条 -->
        <el-steps :space="200" :active="active -0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- 侧边导航 -->
        <el-form ref="formAddRef" :model="formAdd" label-width="80px" :rules="formAddRules" label-position="top">
            <el-tabs tab-position="left" v-model="active" :before-leave="checkTabs" @tab-click="tabChange">
              <el-tab-pane label="基本信息" name="0">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="formAdd.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input v-model="formAdd.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input v-model="formAdd.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input v-model="formAdd.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="email">
                  <el-cascader
                    style="width:40%" v-model="formAdd.goods_cat"
                    :options="categoriesList"
                    :props="{ expandTrigger: 'hover',value: 'cat_id',label: 'cat_name',children: 'children' }"
                    @change="handleChange"
                    :clearable="true"
                    >
                    </el-cascader>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品参数" name="1">
                <!-- 商品参数列表 -->
                <el-form-item :label="item.attr_name" v-for="item in manyTabData" :key="item.attr_id">
                  <el-checkbox-group v-model="item.attr_vals" >
                    <el-checkbox :label="cb" v-for="(cb ,i) in item.attr_vals" :key="i"  border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品属性" name="2">
                <!-- 商品属性 -->
                <el-form-item :label="item.attr_name" v-for="item in onlyTabData" :key="item.attr_id">
                  <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品图片" name="3">
                <!-- 图片上传 -->
                <el-upload
                  class="upload-demo"
                  :headers="headersObj"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>
<script>
export default {
  name: 'users',
  data () {
    return {
      // 查询条件
      active: '0',
      // 三级连选数据
      categoriesList: [],
      formAdd: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      // 三级连选绑定值
      selectValue: [],
      // 表单校验
      formAddRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]

      },
      // 商品参数
      manyTabData: [],
      // 商品列表
      onlyTabData: [],
      uploadUrl: 'http://timemeetyou.com:8889/api/private/v1/upload',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      }

    }
  },
  mouted () {
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 三级连选
    handleChange () {
      this.getGoodsList()
    },
    // 三级连选数据来源
    getGoodsList () {
      this.$http.get('/categories').then(res => {
        this.categoriesList = res.data.data
      }).catch(err => {

      })
    },
    checkTabs (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.formAdd.goods_cat.length === 0) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // 标签页切换
    tabChange () {
      switch (this.active) {
        case '1':
          this.$http.get(`/categories/${this.formAdd.goods_cat[this.formAdd.goods_cat.length - 1]}/attributes`, {params: {sel: 'many'}}).then(res => {
            res.data.data.forEach(element => {
              element.attr_vals = element.attr_vals.length === 0 ? [] : element.attr_vals.split(' ')
            })
            this.manyTabData = res.data.data
          }).catch(err => {
            this.$message.error(err)
          })
          break
        case '2':
          this.$http.get(`/categories/${this.formAdd.goods_cat[this.formAdd.goods_cat.length - 1]}/attributes`, {params: {sel: 'only'}}).then(res => {
            console.log('11111', res.data.data)
            this.onlyTabData = res.data.data
          }).catch(err => {
            this.$message.error(err)
          })
          break
        default:
          break
      }
    },
    // 图片预览
    handlePreview () {

    },
    // 移除图片
    handleRemove () {

    }

  }
}
</script>
<style lang="less" scoped>
  /deep/ .el-alert--info.is-light {
    margin-top: 20px;
  }

</style>
