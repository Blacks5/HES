<template>
  <div class="login">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card class="login-body" shadow="hover">
          <div slot="header">HSE调查管理系统</div>
          <div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="loginForm.phone" focus clearable></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input v-model="loginForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { login } from '@/api/login';
@Component
export default class HelloWorld extends Vue {
  loginForm: object = {
    phone: '',
    password: ''
  };

  rules: object = {
    phone: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { pattern: '^[1][3,4,5,7,8,9][0-9]{9}$', message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  };

  onSubmit () :void {
    this.$refs['loginForm'].validate((valid:boolean) => {
      if (!valid) return false;
      login(this.loginForm).then(res => {
        console.log(res);
        sessionStorage.setItem('user', JSON.stringify(res));
        sessionStorage.setItem('token', res.token);

        this.$router.push({path: '/'});
      })
      
    });
  }
}
</script>


<style scoped>
.login {
  background-image: url('../assets/banner.png');
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.login-body {
  width: 500px;
  margin-top: 40%;
}
</style>
