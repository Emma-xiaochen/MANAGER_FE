<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form>
        <div class="title">火星</div>
        <el-form-item>
          <el-input type="text" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" prefix-icon="el-icon-view" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Welcome from './Welcome.vue'

  export default {
    name: 'login',
    components: {
      Welcome
    },
    mounted() {
      /*
      // 第一种方法
      this.$request({
        method: 'get',
        url: '/login',
        data: {
          name: 'jack'
        }
      }).then((res) => {
        console.log('res:', res)
      })
      */
     this.$request.get('/login', {name: 'jack'},{mock: true, loading: true}).then((res) => {
       console.log('res:', res)
     })
    },
    methods: {
      goHome() {
        this.$router.push('/welcome')
      }
    }
  }
</script>

<style lang="scss">
  .login-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9fcff;

    .modal {
      width: 500px;
      padding: 50px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 0px 10px 3px #c7c9c4d;

      .title {
        font-size: 50px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 30px;
      }

      .btn-login {
        width: 100%;
      }
    }
  }
</style>
