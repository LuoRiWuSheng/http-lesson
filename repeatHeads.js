const express = require('express')
const logger = require('morgan')
const path = require('path')

const app = express()
const router = express.Router()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// 演示请求头或者响应头重复，客户端和服务端接收内容的差异
router.get('/api/repeatHeads', (req, res) => {
  console.log(req.get('age'))

  res.set('hi', 'javascrpit')
  res.set('hi', 'node')

  res.json({
    msg: 'ok'
  })
})

app.use(router)

app.listen(3009, () => {
  console.log('http://localhost:3009')
})
