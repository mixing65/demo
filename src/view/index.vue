<template>
  <div class="home">
    <div class="banner">
      <headerbar></headerbar>
      <img src="../assets/img/index/index.jpg" alt />
    </div>
    <div class="newslist">
      <h1>新闻中心</h1>
      <!-- <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item,index) in newslist" :key="index">
          <div class="listbox">
            <img :src=item.img>
            <div>{{item.title}}</div>
            <div>{{item.time}}</div>
            <div>{{item.content}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>-->
      <el-carousel indicator-position="outside" class="carousel">
        <el-carousel-item class="listbox">
          <div class="list" v-for="(item,index) in newslist1" :key="index">
            <img :src="item.img" />
            <div>{{item.title}}</div>
            <div>{{item.time}}</div>
            <div>{{item.content}}</div>
          </div>
        </el-carousel-item>
        <el-carousel-item class="listbox">
          <div class="list" v-for="(item,index) in newslist2" :key="index">
            <img :src="item.img" />
            <div>{{item.title}}</div>
            <div>{{item.time}}</div>
            <div>{{item.content}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="selectlist">
      <h1>精选主题</h1>
      <el-carousel indicator-position="outside" class="carousel">
        <el-carousel-item class="listbox">
          <div class="list" v-for="(item,index) in selectlist1" :key="index" @click="toselect(item)">
            <img :src="item.img" />
            <div>{{item.title}}</div>
            <div>{{item.content}}</div>
          </div>
        </el-carousel-item>
        <el-carousel-item class="listbox">
          <div class="list" v-for="(item,index) in selectlist2" :key="index" @click="toselect(item)">
            <img :src="item.img" />
            <div>{{item.title}}</div>
            <div>{{item.content}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="plan">
      <h1>应用方案精选</h1>
      <div class="planlist">
        <img src="../assets/img/index/plan1.jpg" alt />
        <img src="../assets/img/index/plan2.jpg" alt />
        <img src="../assets/img/index/plan3.jpg" alt />
        <img src="../assets/img/index/plan4.jpg" alt />
        <img src="../assets/img/index/plan5.jpg" alt />
        <img src="../assets/img/index/plan6.jpg" alt />
        <img src="../assets/img/index/plan7.jpg" alt />
      </div>
    </div>
    <div class="design">
      <h1>设计支持</h1>
      <div class="designlist" v-for="(item,index) in designlist" :key="index">
        <img :src="item.img" alt />
        <div>{{item.title}}</div>
      </div>
    </div>
    <div>
      <h1>合作企业</h1>
    </div>
    <footerbar></footerbar>
  </div>
</template>

<script>
import headerbar from "../components/headerbar";
import footerbar from "../components/footerbar";
export default {
  name: "home",
  components: {
    headerbar,
    footerbar
  },
  data() {
    return {
      newslist1: [
        {
          img: require("../assets/img/index/new1.jpg"),
          title: "111",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/new2.png"),
          title: "222",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/new3.jpg"),
          title: "333",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/new4.jpg"),
          title: "444",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        }
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // },
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // },
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // }
      ],
      newslist2: [
        {
          img: require("../assets/img/index/new5.jpg"),
          title: "555",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/new6.jpg"),
          title: "666",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/new7.jpg"),
          title: "777",
          time: "2020-04-02",
          content: "华盛顿还是你看看哈"
        }
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // },
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // },
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // },
        // {
        //   img: require("../assets/img/index/new1.jpg"),
        //   title: "111",
        //   time: "2020-04-02",
        //   content: "华盛顿还是你看看哈"
        // }
      ],
      selectlist1: [
        {
          img: require("../assets/img/index/select1.png"),
          title: "111",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/select2.png"),
          title: "222",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/select3.png"),
          title: "333",
          content: "华盛顿还是你看看哈"
        }
      ],
      selectlist2: [
        {
          img: require("../assets/img/index/select4.jpg"),
          title: "111",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/select5.png"),
          title: "222",
          content: "华盛顿还是你看看哈"
        },
        {
          img: require("../assets/img/index/select6.png"),
          title: "333",
          content: "华盛顿还是你看看哈"
        }
      ],
      designlist: [
        {
          img: require("../assets/img/index/design1.png"),
          title: "111"
        },
        {
          img: require("../assets/img/index/design2.png"),
          title: "111"
        },
        {
          img: require("../assets/img/index/design3.png"),
          title: "111"
        },
        {
          img: require("../assets/img/index/design3.png"),
          title: "111"
        }
      ]
    };
  },
  methods: {
    toselect(item) {
      let obj={
        img:item.img,
        title:item.title
      }
      this.$router.push({path:'news',query:obj})
      // console.log(item.title);
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  margin-top: -90px;
  img {
    width: 100%;
  }
}
.newslist {
  display: flex;
  flex-direction: row;
}
/* .itemflex {
    display: flex;
    flex-direction: row;
  } */
.carousel {
  width: 100%;
}
.listbox {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 1px solid black;
  width: 300px;
  img {
    width: 200px;
  }
  img:hover {
    transform: scale(1.5, 1.5);
  }
}
.plan {
  width: 100%;
}
.planlist {
  width: 100%;
  img:nth-child(1) {
    width: 45%;
    height: 200px;
  }
  img:nth-child(2) {
    width: 25%;
    height: 200px;
  }
  img:nth-child(3) {
    width: 25%;
    height: 200px;
  }
  img:nth-child(4) {
    width: 23%;
    height: 200px;
  }
  img:nth-child(5) {
    width: 23%;
    height: 200px;
  }
  img:nth-child(6) {
    width: 23%;
    height: 200px;
  }
  img:nth-child(7) {
    width: 23%;
    height: 200px;
  }
}
</style>