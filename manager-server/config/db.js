/**
 * 数据库连接
 * @author Emma
 */

const mongoose = require('mongoose')
const config = require('./index')
const log4js = require('./../utils/log4j')

mongoose.connect(config.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 监听数据库连接情况
const db = mongoose.connection;

// 数据库连接失败
db.on('error', () => {
  log4js.error('***数据库连接失败***')
})

// 数据库连接成功
db.on('open', () => {
  log4js.info('***数据库连接成功***')
})