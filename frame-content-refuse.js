// 拒绝在内容被嵌入ifrma中展示
const express = require('express')
const path = require("path")
const logger = require('morgan')
const chalk = require('chalk')
const app = express()

const router = express.Router()

app.use(logger('dev'))

app.use((req, res, next)=> {
  // res.set('X-Frame-Options', 'DENY')
  // 同源内容，才会被访问
  res.set('X-Frame-Options', 'SAMEORIGIN')
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

app.listen(3010, () => {
  console.log(`http://localhost:3010`, chalk.red('演示内容不让在iframe中显示'))
})
