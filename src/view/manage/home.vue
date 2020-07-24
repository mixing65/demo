<template>
  <el-container class="homeBox">
    <el-header>
      <el-row class="headerLine">
        <el-col :span="6">
          <img src="../../assets/img/index/logo.png" alt="" class="img">
        </el-col>
        <el-col :span="14">
          <div class="headerText">后台管理系统</div>
        </el-col>
        <el-col :span="4">
          <el-button @click="layOut">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>

export default {
  name: 'home',
  data() {
    return {
    }
  },
  method: {},
  mouted() {
  },
  created() {
  },
  methods: {
    layOut() {
      window.sessionStorage.removeItem('login')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.homeBox {
  height: 100%;
  .headerLine {
    height: 80px;
    line-height: 80px;
    .img {
      vertical-align: middle;
    }
    .headerText {
      font-weight: bold;
      font-size: 20px;
    }
  }
  
}
.el-header {
  background: burlywood;
  min-height: 80px;
}
.el-aside {
  background: chocolate;
}
.el-main {
  background: cornflowerblue;
}
</style>
