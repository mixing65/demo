<template>
  <div class="home">
    <!-- 头部 -->
    <mt-header title="哈哈哈哈" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <!-- 首页轮播图 -->
    <mt-swipe :auto="4000" >
      <mt-swipe-item v-for="(item,index) in imglist" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 小图标列表 -->
    <div class="logolist"> 
      <div class="logobox" v-for="(imgsrc,i) in logolist" :key="i" @click="toselect(i)">
        <img :src="imgsrc.img">
        <span>{{imgsrc.text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      imglist: [
        {img: require('../assets/img/index1.jpg')},
        {img: require('../assets/img/index2.jpg')},
        {img: require('../assets/img/index3.jpg')}
      ],
      logolist: [
        {img:require('../assets/img/logo1.jpg'), text:'图片1'},
        {img:require('../assets/img/logo1.jpg'), text:'图片2'},
        {img:require('../assets/img/logo2.jpg'), text:'图片3'},
        {img:require('../assets/img/logo2.jpg'), text:'图片4'}
      ]
    }
  },
  methods: {
    toselect(e) {
      switch(e) {
        case 0:
          console.log('点击第1个')
          let obj = {
            id: e,
            value: '111',
            text: "222"
          }
          this.$router.push({path:'/arr',query:{obj:obj}})
        break;
        case 1:
          console.log('点击第2个')
        break;
        case 2:
          console.log('点击第3个')
        break;
        case 3:
          console.log('点击第4个')
        break;
      }
    }
  },
  mouted () {}
}
</script>

<style scoped>
.mint-swipe {
  height: 200px;
  margin-top: -20px
}
.mint-swipe-item {
  background: pink;
}
.logolist {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logobox {
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logobox img {
  width: 50px;
  height: 50px;
}
</style>
