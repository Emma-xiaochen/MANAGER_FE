<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">通用后台管理系统</div>
      <div class="desc">- Vue3.0+ElementPlus+Node+Mongo打造通用后管理系统</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    props: ['msg']
  }
</script>

<style lang="scss">
  .welcome {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .content {
      position: relative;
      bottom: 40px;
      
      .sub-title {
        line-height: 42px;
        font-size: 30px;
        color: #333333;
      }

      .title {
        line-height: 62px;
        font-size: 40px;
        color: #409eff;
      }

      .desc {
        text-align: right;
        font-size: 14px;
        color: #999999;
      }
    }

    .img {
      width: 371px;
      height: 438px;
      background-image: url('./../assets/images/welcome.png');
      margin-left: 105px;
    }
  }
</style>
