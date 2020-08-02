<template>
  <el-container class="homeBox">
    <!-- 头部 -->
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
      <!-- 左侧导航 -->
      <el-aside :width="collapse? '64px':'200px'">
        <div @click="collapse =!collapse" class="collapse">|||</div>
        <el-menu :collapse="collapse" :collapse-transition="false" router unique-opened :default-active="checked" background-color="#545c64" text-color="#fff" active-text-color="#409eff" @open="handleOpen" @close="handleClose">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in meunList" :key="item.id">
          <!-- 一级菜单模板区域 -->
          <template slot="title">
            <i :class="iconList[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="items.path" v-for="items in item.children" :key="items.id" @click="saveNavState(items.path)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{items.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

export default {
  name: 'home',
  data() {
    return {
      //菜单
      meunList:[],
      iconList:{'125': 'el-icon-user-solid','103': 'el-icon-s-tools','101': 'el-icon-s-goods',
        '102': 'el-icon-s-order','145': 'el-icon-s-data'
      },
      collapse: false,
      checked: '' // 选中项路由
    }
  },
  watch: {
    checked(val) {
      console.log(val,'111')
    }
  },
  mouted() {
  },
  created() {
    this.$http.get('menus').then(
      res => {
        this.meunList = res.data.data
        console.log(this.meunList)
      }
    )
    .catch(err => {
      console.log(err)
    })
    // this.checked = window.sessionStorage.getItem('checkedPath')
  },
  methods: {
    layOut() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    handleOpen(){

    },
    handleClose(){

    },
    saveNavState(data){
      window.sessionStorage.setItem('checkedPath',data)
      this.checked = data
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
  background: #555352;
  .el-menu {
    border-right: none;
    // background: #6b6a69;
  }
  .collapse {
    letter-spacing: 0.2em;
    color: #fff;
    text-align: center;
    padding: 10px;
    cursor: pointer;
  }
}
.el-main {
  // background: cornflowerblue;
}
</style>
