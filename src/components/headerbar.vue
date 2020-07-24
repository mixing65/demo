<template>
  <div class="headerbar">
    <div>
        <img src="../../src/assets/img/index/logo.png">
    </div>
    <div class="headerbar-main">
      <div>首页</div>
      <div>产品</div>
      <div>应用方案</div>
      <div>开发工具</div>
      <div>关于合泰</div>
    </div>
    <div class="headerbar-right">
        <div>搜素</div>
        <div>简体中文</div>
        <div>登录</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "headerbar"
};
</script>
<style lang="scss" scoped>
.headerbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    border: 1px solid #8f8f8f;
    color: #8f8f8f;
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .headerbar-main {
        /* border: 1px solid black; */
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div {
          padding-bottom: 5px;
        }
        div:hover{
          border-bottom: 1px solid black;
        }
    }
    .headerbar-right {
        border: 1px solid black;
        width: 25%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>
