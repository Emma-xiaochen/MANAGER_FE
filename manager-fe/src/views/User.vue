<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID"/>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
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
        <el-button type="danger" @click="handleBatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
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
            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
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
        pageSize: 10,
        total: 0
      })
      // 选中用户列表对象
      const checkedUserIds = ref([]);
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
        let params = {...user, ...pager}
        try {
          const { list, page } = await proxy.$api.getUserList(params);
          userList.value = list;
          pager.total = page.total;
        } catch (error) {}
      }

      // 查询事件，获取用户列表
      const handleQuery = () => {
        getUserList();
      }

      // 重置查询表单
      const handleReset = () => {
        proxy.$refs.form.resetFields();
      }

      // 分页事件处理
      const handleCurrentChange = (current) => {
        pager.pageNum = current;
        getUserList();
      }

      // 用户单个删除
      const handleDel = async(row) => {
        await proxy.$api.userDel({
          userIds: [row.userId]
        })
        proxy.$message.success('删除成功')
        getUserList();
      }

      // 用户批量删除
      const handleBatchDel = async() => {
        if(checkedUserIds.value.length == 0) {
          proxy.$message.error('请选择要删除的对象')
          return
        }
        await proxy.$api.userDel({
          userIds: checkedUserIds.value
        })
        proxy.$message.success('删除成功')
        getUserList();
      }

      //
      const handleSelectionChange = (list) => {
        console.log('list:', list);
        let arr = [];
        list.map((item) => {
          arr.push(item.userId);
        })
        checkedUserIds.value = arr;
      }

      return {
        user,
        userList,
        columns,
        pager,
        checkedUserIds,
        getUserList,
        handleQuery,
        handleReset,
        handleCurrentChange,
        handleDel,
        handleBatchDel,
        handleSelectionChange
      }
    }
  }
</script>

<style lang="scss">
  
</style>
