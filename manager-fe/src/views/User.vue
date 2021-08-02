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
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

  export default {
    name: 'user',
    setup() {
      // 获取Composition Api 上下文对象
      const { proxy } = getCurrentInstance();
      // 初始化用户表单对象
      const user = reactive({
        state: 0
      });
      // 初始化用户列表数据
      const userList = ref([]);
      // 初始化分页对象
      const pager = reactive({
        pageNum: 1,
        pageSize: 10
      })
      // 定义动态表格-格式
      const columns = reactive([
        {
          label: '用户ID',
          prop: 'userId'
        },
        {
          label: '用户名称',
          prop: 'userName'
        },
        {
          label: '用户邮箱',
          prop: 'userEmail'
        },
        {
          label: '用户角色',
          prop: 'role'
        },
        {
          label: '用户状态',
          prop: 'state'
        },
        {
          label: '注册时间',
          prop: 'createTime'
        },
        {
          label: '最后登录时间',
          prop: 'lastLoginTime'
        }
      ])
      
      // 初始化接口调用
      onMounted(() => {
        getUserList()
      }) 

      // 获取用户列表
      const getUserList = async() => {
        try {
          const { list, page } = await proxy.$api.getUserList();
          userList.value = list;
          pager.total = page.total;
        } catch (error) {

        }
      }

      // 查询事件，获取用户列表
      const handleQuery = () => {
        getUserList();
      }

      // 重置查询表单
      const handleReset = () => {

      }

      return {
        user,
        userList,
        columns,
        pager,
        getUserList,
        handleQuery,
        handleReset
      }
    }
  }
</script>

<style lang="scss">
  
</style>
