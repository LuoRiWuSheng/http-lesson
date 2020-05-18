/**
 * 本案例演示node+express实现防盗链
 * 原生Node也是没问题的，就是要处理静态资源，处理页面请求路由，再判断资源请求头
 * 
 * 使用express 就可以省略对静态资源（图片），页面地址的请求处理
 */

const express = require('express')
const router = express.Router()
const app = express()

const path = require('path')
const url = require('url')
const logger = require('morgan')
const chalk = require('chalk')
const fs = require('fs')

// 白名单地址
const whiteList = ['lisi.com']
const imgExt = ['.jpg', '.jpeg', '.png', '.gif', 'bmp']

// 防盗链中间件
app.use((req, res, next) => {
  // 获取到请求头
  let headers = req.headers
  let referer = headers['referer'] || headers['referered']
  
  console.log(chalk.red("referer-->"+referer))

  if (referer) {

    // 不是图片资源，直接放行
    if (!isImg(req.url)) {
      next()
    } else {
      console.log("请求地址--》",req.url)
      // 请求资源存在referer 做防盗链处理
      let referHost = url.parse(referer).hostname
      let host = req.headers.host.split(":")[0]
      console.log(chalk.red('host-->', host, "referHost-->", referHost))

      if (referHost !== host) {
        // 请求地址在不在白名单里
        let isInWhiteList = whiteList.includes(host)
        console.log('是否在白名单里面', isInWhiteList)
        // 直接放行
        if (isInWhiteList) {
          next()
        } else {
          // 图片直接给一个其他的代替
          const errorImg = path.join(__dirname, 'public/img/b.jpg')

          fs.readFile(errorImg, (err, data) => {
            if(err) throw err

            res.end(data)
          })
        }
      } else {
        // 同一个站点
        next()
      }
    }

  } else {
    // 直接过， 是本网站的
    next()
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(router)
app.use(logger('dev'))

app.listen(3004, () => {
  console.log(`http://localhost:3004`)
})

// 判断是不是图片
function isImg (url) {
  let ext = path.parse(url).ext

  if (!ext) return false

  return imgExt.includes(ext)
}
