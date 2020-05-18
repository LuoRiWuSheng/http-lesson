/* 
反防盗链

防盗链的服务 referer.js这个起在 localhost:3004

对 lisi.com这个域名是在白名单的，是被允许的，端口是 3004，下面构造成一样的请求头，即可
*/
const fs = require('fs')
const http = require('http')
const path = require('path')

const opt = {
  hostname: 'zhangsan.com',
  host: 'zhangsan.com',
  port: 3004,
  headers: {
    // 请求头伪造成能通过的 referer和host，这2个一定要要趴取的网站的一样
    Host: 'lisi.com:3004',
    Referer: 'lisi.com',
  },
  path: '/img/a.jpg',
  method: 'GET'
}

let req = http.request(opt, (res) => {
  let data = ''
  // 一定要设置response的编码为binary否则会下载下来的图片打不开
  res.setEncoding("binary");
  res.on('data', chunk => {
    data += chunk
  })

  res.on('end', () => {
    let p = path.join(__dirname, 'public/img/pa.jpg')

    fs.writeFile(p, data, "binary",err => {
      if (err) {
        console.log('这里发生错误')
        throw err
      }
      console.log('趴取图片成功')
    })
  })
})

req.on('error', (err) => {
  console.log('发送请求，发生错误')
  console.log(err)
})

req.end()