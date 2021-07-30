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
    const res = await User.findOne({
      userName,
      userPwd
    }, 'userId userName userEmail state role deptId roleList')
    const data = res._doc;

    console.log('data=>', data);

    const token = jwt.sign({
      data: data
    }, 'secret', { expiresIn: 30 })
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
