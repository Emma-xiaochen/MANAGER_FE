<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user">
        <el-form-item>
          <el-input v-model="user.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="4" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action"></div>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, ref } from 'vue'
  
  export default {
    name: 'user',

  }
</script>

<style lang="scss">
  
</style>
