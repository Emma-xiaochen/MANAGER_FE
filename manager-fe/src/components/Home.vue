<template>
    <div class="basic-layout">
      <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
        <!-- 系统LOGO -->
        <div class="logo">
          <img src="./../assets/images/logo.png" alt="logo" />
          <span>Manager</span>
        </div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="activeMenu"
          background-color="#001529"
          text-color="#ffffff"
          router
          :collapse="isCollapse"
          class="nav-menu">
          <tree-menu :userMenu="userMenu"></tree-menu>
        </el-menu>
      </div>
      <div :class="['content-right', isCollapse ? 'fold' : 'unflod']" >
        <div class="nav-top">
          <div class="nav-left">
            <div class="menu-fold" @click="toggle"><i class="el-icon-s-fold"></i></div>
            <div class="bread">
              <bread-crumb />
            </div>
          </div>
          <div class="user-info">
             <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" type="danger">
               <i class="el-icon-bell"></i>
             </el-badge>
             <el-dropdown @command="handleLogout">
              <span class="user-link">
                {{userInfo?.userName}}
                <i class="el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email">邮箱：{{userInfo?.userEmail}}</el-dropdown-item>
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
  import TreeMenu from './TreeMenu.vue'
  import BreadCrumb from './BreadCrumb.vue'

  export default {
    name: 'Home',
    components: {
      TreeMenu,
      BreadCrumb
    },
    data() {
     return {
        isCollapse: false,
        userInfo: this.$store.state.userInfo,
        noticeCount: 0,
        userMenu: [],
        activeMenu: location.hash.slice(1)
      }
    },
    mounted() {
      this.getNoticeCount();
      this.getMenuList();
    },
    methods: {
      toggle() {
        this.isCollapse = !this.isCollapse;
      },
      handleLogout(key) {
        if(key == 'email') return;
        this.$store.commit('saveUserInfo', '');
        this.userInfo = null;
        this.$router.push('/login');
      },
      async getNoticeCount() {
        try {
          const count = await this.$api.noticeCount();
          this.noticeCount = count;
        } catch(error) {
          console.error(error)
        }
      },
      async getMenuList() {
        try {
          const list = await this.$api.getMenuList();
          this.userMenu = list;
        } catch(error) {
          console.error(error)
        }
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
      // height: 100vh;
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

      // 合并
      &.fold {
        width: 65px;
      }

      // 展开
      &.unfold {
        width: 200px;
      }
    }

    .content-right {
      margin-left: 200px;

      // 合并
      &.fold {
        margin-left: 64px;
      }

      // 展开
      &.unfold {
        margin-left: 200px;
      }

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
            cursor: pointer;
          }

          .user-link {
            color: #409eff;
            cursor: pointer;
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
