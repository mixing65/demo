<template>
  <div class="hello">
   <mt-header fixed title="列表"></mt-header>
   <div class="add" @click="add">新增</div>
   <div class="inputText" v-for="(item ,index) in lists" :key="index">
     <input type="text" class="input" placeholder="请输入姓名" v-model="item.value">
     <input type="text" class="input" placeholder="请输入手机号" v-model="item.phone">
     <div class="remove" @click="remove(index)" v-show="lists.length > 1">删除</div>
   </div>
   <div @click="total">合计</div>

  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      lists:[
        {value: '',phone: ''}
      ]
    }
  },
  methods: {
    add() {
      this.lists.push({ value: '',phone: '' })
      console.log(this.lists.value)
    },
    remove(index) {
      this.lists.splice(index, 1)
      console.log(this.lists.value)
    },
    total() {
      console.log('total')
      console.log(this.lists)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  border: 1px solid black;
  display: block;
  width: 80%;
  height: 30px;
  margin: 0 auto;
  margin-top: 10px;
}
.inputText {
  margin: 0 auto;
}
.add {
  border: 1px solid black;
  width: 50px;
  height: 20px;
  margin: 0 auto;
}
.remove {
  border: 1px solid black;
  width: 50px;
  height: 20px;
  margin: 0 auto
}
</style>
