/**
 * Mutations 业务数据提交
 * @author Emma
 */

import storage from './../utils/storage'

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  }
}