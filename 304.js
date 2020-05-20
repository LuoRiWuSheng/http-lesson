// 这里的案例，主要演示HTTP中的缓存
const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()
const router = express.Router()

app.use(logger('dev'))
// 直接干掉304，不在向服务端发送请求，服务端也不处理304
app.use((req, res, next)=> {
  res.set('Cache-Control', "max-age=300, immutable")
  next()
})


app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(3008, ()=> {
  console.log(`http://localhost:3008`)
})


