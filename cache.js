// 这里的案例，主要演示HTTP中的缓存
const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()
const router = express.Router()
app.use(logger('dev'))

// 测试缓存 no-cache no-store
app.use((req ,res, next)=>{
  res.set('Cache-Control', 'no-cache')
  next()
})

// 去掉缓存，总是拉取最新资源
/* app.use((req, res, next)=> {
  res.set('Cache-Control', 'no-store')
  next()
}) */

// 只要资源没变动过，就不过期，使用客户端缓存
/* app.use((req, res, next)=> {
  res.set('Cache-Control', 'public, max-age=0')
  next()
}) */

// must-revalidate -- 这个只针对存在缓存服务器的情况适用， 单体服务没有效果
/* app.use((req, res, next)=> {
  res.set('Cache-Control', ' must-revalidate')
  next()
}) */

// max-age
/* app.use((req, res, next)=> {
  const t = 10*24*3600
  const t2 = 100
  res.set('Cache-Control', 'public, max-age='+t)
  next()
})
 */

app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(3007, ()=> {
  console.log(`http://localhost:3007`)
})


