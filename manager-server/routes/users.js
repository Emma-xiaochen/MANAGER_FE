/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const Counter = require('./../models/counterSchema')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const util = require('./../utils/util')

router.prefix('/users')

// 用户登录
router.post('/login', async (proxy) => {
  try {
    const { userName, userPwd } = proxy.request.body;
    /**
     * 返回数据库指定字段，有三种方式
     * 1. 'userId userName userEmail state role deptId roleList'
     * 2. {userId: 1, _id: 0}
     * 3. select('userId')
     */
    const res = await User.findOne({
      userName,
      userPwd
    }, 'userId userName userEmail state role deptId roleList')
    const data = res._doc;

    // console.log('data=>', data);

    const token = jwt.sign({
      data
    }, 'secret', { expiresIn: '1h' })
    // console.log('token=>', token);
    
    if (res) {
      data.token = token;
      proxy.body = util.success({...res, token})
    } else {
      proxy.body = util.fail('账号或密码不正确')
    }
  } catch (error) {
    proxy.body = util.fail(error.msg)
  }
})

// 用户列表
router.get('/list', async (proxy) => {
  const { userId, userName, state } = proxy.request.query;
  const { page, skipIndex } = util.pager(proxy.request.query);
  let params = {};
  if (userId) params.userId = userId;
  if (userName) params.userName = userName;
  if (state && state != '0') params.state = state;
  try {
    // 根据条件查询所有用户列表
    const query = User.find(params, { _id: 0, userPwd: 0 });
    const list = await query.skip(skipIndex).limit(page.pageSize);
    const total = await User.countDocuments(params);
    
    proxy.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    proxy.body = util.fail(`查询异常:${error.stack}`);
  }
})

// 用户删除/批量删除
router.post('/delete', async (proxy) => {
  // 待删除的用户id数据
  const { userIds } = proxy.request.body;
  // User.updateMany({ $or: [{ userId: 10001}, { userId: 10002 }] })
  const res = await User.updateMany({ userId: { $in: userIds } }, { state: 2 })
  if (res.nModified) {
    proxy.body = util.success(res, `共删除成功${res.nModified}条`);
    return;
  }
  proxy.body = util.fail('删除失败');
})

// 用户新增/编辑
router.post('/operate', async (proxy) => {
  const { userId, userName, userEmail, mobile, job, state, roleList, deptId, action } = proxy.request.body;
  if (action == 'add') {
    if (!userName || !userEmail || !deptId) {
      proxy.body = util.fail('参数错误', util.CODE.PARAM_ERROR);
      return;
    }
    const res = await User.findOne({ $or: [{ userName }, { userEmail }] }, '_id userName userEmail');
    if (res) {
      proxy.body = util.fail(`系统监测到有重复的用户，信息如下: ${res.userNmae} - ${res.userEmail}`);
    } else {
      const doc = await Counter.findOneAndUpdate({ userId }, { $inc: { sequence_value: 1 } }, { new: true });
      try {
        const user = new User({
          userId: doc.sequence_value,
          userName,
          userPwd: md5('123456'),
          userEmail,
          role: 1,
          roleList,
          job,
          state,
          deptId,
          mobile
        })
        user.save();
        proxy.body = util.success('', '用户创建成功');
      } catch (error) {
        proxy.body = util.fail(error.stack, '用户创建失败');
      }
    }
  } else {
    if (!deptId) {
      proxy.body = util.fail('部门不能为空', util.CODE.PARAM_ERROR);
      return;
    }

    try {
      const res = await User.findOneAndUpdate({ userId }, { mobile, job, state, roleList, deptId });
      proxy.body = util.success({}, '更新成功');
    } catch (error) {
      proxy.body = util.fail(error.stack, '更新失败');
    }
  }
})

module.exports = router
