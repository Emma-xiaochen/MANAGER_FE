<template>
    <div class="basic-layout">
      <div class="nav-side">
        <!-- 系统LOGO -->
        <div class="logo">
          <img src="./../assets/logo.png" alt="">
          <span>Manager</span>
        </div>
        <!-- 导航菜单 -->
        <el-menu
          default-active="2"
          background-color="#001529"
          text-color="#ffffff"
          router
          :collapse="false"
          class="nav-menu">
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">菜单管理</el-menu-item>
          </el-submenu>
           <el-submenu index="2">
            <template #title>
              <i class="el-icon-setting"></i>
              <span>审批管理</span>
            </template>
            <el-menu-item index="2-1">休假申请</el-menu-item>
            <el-menu-item index="2-2">待我审批</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content-right">
        <div class="nav-top">
          <div class="nav-left">
            <div class="menu-fold"><i class="el-icon-s-fold"></i></div>
            <div class="bread">面包屑</div>
          </div>
          <div class="user-info">
             <el-badge is-dot="true" class="notice" type="danger">
               <i class="el-icon-bell"></i>
             </el-badge>
             <el-dropdown @command="handleLogout">
              <span class="user-link">
                {{userInfo.userName}}
                <i class="el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email">邮箱：{{userInfo.userEmail}}</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
             </el-dropdown>
          </div>
        </div>
        <div class="wrapper">
          <div class="main-page">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
     return {
        userInfo: {
          userName: 'Emma',
          userEmail: '736202625@qq.com'
        }
      }
    },
    methods: {
      handleLogout(key) {
        if(key == 'email') return;
        this.$store.commit('saveUserInfo', '');
        this.userInfo = null;
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="scss">
  .basic-layout {
    position: relative;

    .nav-side {
      position: fixed;
      width: 200px;
      height: 100vh;
      background: #001529;
      color: #ffffff;
      overflow-y: auto;
      transition: width .5s;

      .logo {
        display: flex;
        height: 50px;
        font-size: 18px;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
          margin: 0 16px;
        }
      }

      .nav-menu {
        height: calc(100vh - 50px);
        border-right: none;
      }
    }

    .content-right {
      margin-left: 200px;

      .nav-top {
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dddddd;
        padding: 0 20px;

        .nav-left {
          display: flex;
          align-items: center;

          .menu-fold {
            font-size: 18px;
            margin-right: 15px;
          }
        }

        .user-info {

          .notice {
            line-height: 30px;
            margin-right: 15px;
          }

          .user-link {
            cursor: pointer;
            color: #409eff;
          }
        }
      }

      .wrapper {
        background: #eef0f3;
        padding: 20px;
        height: calc(100vh - 50px);

        .main-page {
          background: #ffffff;
          height: 100%;
        }
      }
    }
  }

</style>
