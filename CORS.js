// 演示简单请求和非简单请求
// app.js 是3000端口, 本服务是4000 端口
const express = require('express')
const router = express.Router()
const chalk = require('chalk')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(cors())

app.use((req, res, next)=> {
  // 允许所有的请求源，都可以访问，这种写法，就不能携带cookie
  res.set('Access-Control-Allow-Origin', '*')
  // 允许请求的字段
  res.set('Access-control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, age')
  // 允许请求的方法
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.set("Content-Type", "application/json;charset=utf-8");
  res.set("X-Powered-By", "3.2.1");

  if(req.method === 'OPTIONS') {
    res.status(200).end()
  } else{
    next()
  }
})

// 简单请求
router.get('/cors', (req, res) => {
  console.log(req.query)
  res.json({
    msg: 'ok',
    ...req.query
  })
})

router.head('/cors', (req, res) => {
  console.log(req.query)
  
  res.end()
})

router.post('/cors', (req, res) => {
  console.log('post-->',req.body)
  console.log(req.query)
  res.json({
    msg: 'ok',
    ...req.body
  })
})

router.put('/cors', (req, res)=> {
  let age = req.get('age')
  res.json({
    msg:'ok',
    ...req.query,
    age
  })
})

router.delete('/cors', (req, res)=> {
  let {id} = req.query
  res.json({
    msg: 'ok',
    id
  })
})

app.use(router)

app.listen(4000, () => {
  console.log(`http://localhost:4000`, chalk.bgBlue('被跨域访问的服务'))
})
