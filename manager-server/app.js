const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const users = require('./routes/users')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const util = require('./utils/util')


// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (proxy, next) => {
  log4js.info(`get params: ${JSON.stringify(proxy.request.query)}`)
  log4js.info(`post params: ${JSON.stringify(proxy.request.body)}`)
  await next().catch((err) => {
    console.log('err:', err)
    if (err.status == '401') {
      proxy.status = 200;
      proxy.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err;
    }
  })
})

app.use(koajwt({ secret: 'secret' }).unless({
  path: [/^\/api\/users\/login/]
}))

router.prefix('/api')

router.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, proxy) => {
  log4js.error(`${err.stack}`)
});

module.exports = app
