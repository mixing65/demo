<template>
  <div class="home">
    <div class="loginBox">
      <!-- 图像区域 -->
      <div class="avatar">
        <img src="../../assets/img/index/logo.png" alt="">
      </div>
      <!-- 表单区域 -->
      <el-form ref="formRef" :model="form" class="loginForm" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input placeholder="用户名" prefix-icon="el-icon-user-solid" v-model="form.name"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="密码" prefix-icon="el-icon-unlock" show-password v-model="form.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="define">确定</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: 'home',
  data() {
    return {
      // 表单数据绑定
      form: {
        name: '',
        password: ''
      },
      // 表单验证规则
      rules: {
        name: [
          // require:true必填项 trigger 触发时机
          {required: true,message: '请输入用户名',trigger:"blur" },
          {min:3,max:10,message: '长度在3-10个字符',trigger: "blur"}
        ],
        password: [
          {required: true,message: '请输入密码',trigger:"blur" },
          {min:3,max:10,message: '长度在3-10个字符',trigger: "blur"}
        ]
      }
    }
  },
  method: {},
  mouted() {
  },
  created() {
  },
  methods: {
    // 重置表单
    cancle() {
      this.$refs.formRef.resetFields()
      // this.form = {name: '',password: ''}
    },
    // 确定提交
    define() {
      // valid 验证结果布尔值
      // this.$refs.formRef.validate(async valid=> {
      //   if(!valid) return;
      //  const result = await this.$http.post('/login',this.form)
      //  console.log(result)
      // })
      this.$refs.formRef.validate( valid=> {
        if(!valid) return;
        window.sessionStorage.setItem('login','testlogin')
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  position: relative;
  background: rgba(51, 57, 109, 0.377);
}
.loginBox {
  background: #fff;
  width: 450px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    border: 1px solid burlywood;
    padding: 10px;
    box-shadow: 0 0 10px gray;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
     
      
    }
  }
  .loginForm {
    padding: 0 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    .btn {
      display: flex;
      justify-content: flex-end;
      // margin-right: 10px;
    }
  }
}
</style>
