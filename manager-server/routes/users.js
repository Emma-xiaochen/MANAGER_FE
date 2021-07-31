/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const jwt = require('jsonwebtoken')
const util = require('./../utils/util')

router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
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

    console.log('data=>', data);

    const token = jwt.sign({
      data
    }, 'secret', { expiresIn: '1h' })
    console.log('token=>', token);
    
    if (res) {
      data.token = token;
      ctx.body = util.success({...res, token})
    } else {
      ctx.body = util.fail('账号或密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
