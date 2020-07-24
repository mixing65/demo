<template>
  <div class="home">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- <mt-button type="primary" @click="add">新增</mt-button>
    <div v-for="(name, index) in form" :key="index">
        <div>列表:{{index + 1}}</div>
      <input v-model="name.text" type="text" class="Input" placeholder="请输入姓名">
      <input v-model="name.text" type="text" class="Input" placeholder="请输入手机号">
      <mt-button type="danger" @click="deleteItem(index)">删除</mt-button>
    </div> -->
    <!-- <div class="top">
      <label for="id">序号</label>
      <input type="text" name="" id="id">
      <label for="name">名字</label>
      <input type="text" name="" id="name">
      <div @click="toadd">新增</div>
      <input type="text">
      <div @click="tosearch">搜索</div>
    </div>
    <div class="main">
      <div></div>
    </div> -->
    <div class="bs-example" data-example-id="contextual-table">
    <table class="table">
      <thead >
        <tr>
          <th>
            <label for="id">id</label>
            <input type="text" name="" id="id" v-model="id">
          </th>
          <th>
            <label for="id">name</label>
            <input type="text" name="" id="name" v-model="name">
          </th>
          <th>
            <div class="btn btn-default" @click="toadd">新增</div>
          </th>
          <th>
            <input type="text" name="" id="search" v-model="keywords">
            <div class="btn btn-default" @click="tosearch(keywords)">搜索</div>
            <div class="btn btn-default" @click="tocancle()">重置</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="active">
          <th>序号</th>
          <th>名称</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        <tr class="active" v-for="(item,index) in showlist" :key="index"> 
          <th scope="row">{{item.id}}</th>
          <td>{{item.name}}</td>
          <td>{{item.times}}</td>
          <td @click="todel(index)">删除</td>
        </tr>
        <!-- <tr>
          <th scope="row">2</th>
          <td>Column content</td>
          <td>Column content</td>
          <td>删除</td>
        </tr> -->
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>

export default {
  name: 'arr',
  data () {
    return {
      form: [
        // { text: '111', type: 'sdfas' },
        // { text: '222', type: 'sdfas' },
        // { text: '333', type: 'sdfas' },
        // { text: '444', type: 'sdfas' }
      ],
      showlist: [
        {id: 1,name: '123',times: new Date()}
      ],
      id: '',
      name: '',
      keywords: '',
      oldlist: []
    }
  },
  method: {},
  mouted () {
  },
  created () {
    // this.hello()
  },
  methods: {
    // add () {
    //   console.log('add')
    //   this.form.push({ text: '', type: 'sdfas' })
    // },
    // deleteItem (index) {
    //   this.form.splice(index, 1)
    //   console.log(index)
    // },
    toadd() {
      let content = {
        id: this.id,name: this.name,times: new Date()
      }
      this.showlist.push(content)
      this.id = this.name = ''
      //新增数组内容后，保存在新的数组中，重置搜索结果后，取出来展示
      if(this.oldlist) {
        this.oldlist = []
        for (var i = 0; i < this.showlist.length; i++) {
          this.oldlist.push(this.showlist[i]);
      } 
      }
        
      
      console.log(this.showlist)
      
    },
    todel(i) {
      this.showlist.splice(i,1)
    },
    tosearch(e) {
      console.log(e)
      // 定义搜索后展示的数组列表
      let newlist = []
      this.showlist.forEach((item) => {
        if(item.name.indexOf(e) != -1) {
          newlist.push(item)
        }
        return this.showlist = newlist
      })
      this.keywords = ''
      console.log('search')
    },
    tocancle() {
      this.showlist = this.oldlist
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   this.$destroy()
  //   next()
  // }
}
</script>

<style scoped>

/* .Input {
    border: 1px solid black;
    width: 200px;

} */
.top {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
