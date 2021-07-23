/*
 * 环境配置封装
 * @author Emma
 */

const env = import.meta.env.MODE || 'prod';

const EnvConfig = {
  // 视频中 import.meta.env.MODE 是 dev，现在已经更新为 development
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/0c6a518a94f948c5adad9279a60772dc/api'
  },
  test: {
    baseApi: '//test.feturefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/0c6a518a94f948c5adad9279a60772dc/api'
  },
  prod: {
    baseApi: '//feturefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/0c6a518a94f948c5adad9279a60772dc/api'
  },
}

export default {
  env,
  // 当前接口执行mock
  mock: false,
  namespace: 'manager',
  ...EnvConfig[env]
}