<template>
  <h1>欢迎来到主界面~{{msg}}</h1>
  <router-link to="/login">去登录</router-link>
</template>

<script>
  export default {
    name: 'Welcome',
    props: ['msg']
  }
</script>

<style scoped>

</style>
