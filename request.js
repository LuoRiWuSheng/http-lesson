/**
 * descption: 这个案例用来模拟，发送GET请求，POST请求，批量发送请求
 */

const http = require('http')
const querystring = require('querystring')
const mock = require('mockjs')

class Requset {
  options = {
    hostname: '127.0.0.1',
    port: 3002
  }

  get () {
    let opt = {
      ...this.options,
      path: '/getAllLiuYan',
      method: 'GET'
    }

    let req = http.get(opt, (res) => {
      var data = ''
      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        console.log(data)
      })
    })

    req.on('error', error => {
      console.log(error)
    })

    req.end()
  }

  post (content) {
    let post_data = {
      content: content
    }

    let body = querystring.stringify(post_data)

    let opt = {
      ...this.options,
      method: 'POST',
      path: '/say',
      headers: {
        "Content-Length": body.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }

    let req = http.request(opt, (res) => {
      console.log('状态码: ' + res.statusCode);
      console.log('请求头: ' + JSON.stringify(res.headers));

      res.setEncoding('utf8');
      let data = ''
      res.on("data", (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        console.log('结束')
        console.log(data)
      })
    })

    req.on('error', (err) => {
      console.log('发生错误')
      console.log(err)
    })

    // 写入请求体数据
    req.write(body)

    req.end();
  }
}

let r = new Requset()

// r.get()

// 批量留言
function manyLiuYan() {
  for(let i=0; i< 10; i++) {
    let content = mock.Random.cparagraph(1,2)

    setTimeout(() => {
      r.post(content)
    }, 2000);
  }
 
}

manyLiuYan()
