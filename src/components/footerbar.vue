<template>
  <div class="footerbar">
    <div class="footerbar-top">
      <div>
        <a href="">设计支持</a>
        <a href="">应用笔记</a>
        <a href="">应用方案</a>
        <a href="">参考文件</a>
        <a href="">合泰频道</a>
        <a href="">出版品</a>
      </div>
      <div>
        <a href="">新闻中心</a>
        <a href="">企业讯息</a>
        <a href="">产品讯息</a>
        <a href="">活动讯息</a>
      </div>
       <div>
        <a href="">人才培育</a>
        <a href="">人力资源</a>
        <a href="">大学计划</a>
        <a href="">合泰杯</a>
        <a href="">校园招聘</a>
      </div>
       <div>
        <a href="">客户服务</a>
        <a href="">问题与建议</a>
        <a href="">工具维修申请</a>
        <a href="">企业行事历</a>
        <a href="">Flash News订阅</a>
        <a href="">企业专区</a>
      </div>
    </div>
    <div class="footerbar-bottom">
        <div>© Copyright 2017. Holtek Semiconductor Inc. All Rights Reserved</div>
        <div>
          <a href="">使用条款|</a>
          <a href="">隐私权声明|</a>
          <a href="">知识产权|</a>
          <a href="">RSS|</a>
          <a href="">网站导览</a>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footerbar"
};
</script>
<style lang="scss" scoped>
.footerbar {
  margin-top: 100px;
}
.footerbar-top {
  background: #34546d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    a {
      color: gray;
      text-decoration:none;
    }
    a:first-child {
      color: #fff;
    }
    a:hover{
        text-decoration:underline;
    }
    display: flex;
    flex-direction: column;
    border: 1px solid black;
  }
}
</style>
