/**
 * 通用工具函数
 * @author Emma
 */

const log4js = require('./log4j');

const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001, // 参数错误
  USER_ACCOUNT_ERROR: 20001, // 账号或密码错误
  USER_LOGIN_ERROR: 30001, // 用户未登陆
  BUSINESS_ERROR: 40001, // 业务请求失败
  AUTH_ERROR: 50001, // 认证失败或者TOKEN过期
}

module.exports = {
  /**
   * 分页结构封装
   * @param {Number} pageNum
   * @param {Number} pageSize
   */
  pager({pageNum = 1, pageSize = 1}) {
    pageNum *= 1;
    pageSize *= 1;
    const skipIndex = (pageNum - 1) * pageSize;
    return {
      page: {
        pageNum,
        pageSize
      },
      skipIndex
    }
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
    log4js.debug(data);
    return {
      code,
      data,
      msg
    }
  },
  fail(msg = '', code = CODE.BUSINESS_ERROR) {
    log4js.debug(data);
    return {
      code,
      data,
      msg
    }
  }
}