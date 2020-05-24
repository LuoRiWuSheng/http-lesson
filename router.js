const fs = require('fs')
const path = require('path')

module.exports = router => {

  router.post('/api/307', (req, res) => {
    let { lesson } = req.body

    // res.redirect("/api/307-2") // 默认302临时重定向 HTTP 1.0的标准

    // res.redirect(301,"/api/307-2") // 永久重定向

    // res.redirect(303, "/api/307-2") // 跟302一样，临时重定向 HTTP 1.1的标准

    // res.redirect(307, "/api/307-2")
  })

  // 通过a连接进行重定向操作
  router.get('/api/passToPageRedirect', (req, res) => {
    res.redirect(302, 'http://localhost:3000/liuyan.html')
    res.end()
  })

  // 通过调用接口，进行重定向操作
  router.get('/api/passToAPIRedirect', (req, res) => {
    res.location('http://localhost:3000/liuyan.html')
    res.end()
  })

  router.post('/api/307-2', (req, res) => {
    let { lesson } = req.body

    res.json({
      msg: 'ok',
      lesson
    })
  })

  // 演示PUT请求
  router.put("/api/test-put", (req, res) => {
    let { name, age } = req.body
    let p = path.join(__dirname, '/public/temp/1.txt')
    fs.writeFile(p, JSON.stringify({ name, age }), err => {
      if (err) throw err

      console.log('内容写入成功')
      res.json({
        name,
        age
      })
    })

  })

  // 演示 204 响应，只能返回响应头，不能返回响应体内容
  router.get('/api/test-204', (req, res) => {
    res.set('Token', '12346546546')
    res.set('age', 24)
    res.set('hi', 'good')
    res.status(204)

    res.json({
      msg: 'ok'
    })

  })

  // 演示同域下调用接口 -- 查看请求头状态
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
    console.log(req.body)
    console.log(req.query)
    res.json({
      msg: 'ok',
      ...req.body
    })
  })

  router.post('/cors/multy-upload', (req, res) => {
    resoveFile(req, res)
  })
}


Buffer.prototype.split = Buffer.prototype.split || function (seq) {
  // 存储最终切割的内容
  let arr = [];

  // 当前位置--
  let current = 0;

  // pos--在buffer中找到某个符合seq条件片段的索引位置
  let position = 0;

  while (this.indexOf(seq, current) !== -1) {
    // 在这个位置找到符合条件的内容
    position = this.indexOf(seq, current)

    // 将符合条件的前面一段buffer切出来
    let prevBuffer = this.slice(current, position)

    arr.push(prevBuffer);

    // 现在从新的位置开始继续找
    current = position + seq.length;
  }

  // 上面while结束，表示再也找不到符合seq的buffer了，现在需要将最后一段buffer装进数组
  arr.push(this.slice(current));

  return arr;
}

function resoveFile (req, res) {
  let chunks = []
  let num = 0;

  req.on('data', (chunk) => {
    chunks.push(chunk)
    num += chunk.length
  })

  req.on('end', (err) => {
    
    console.log('内容体长度--》', num)

    // 最终流的内容体
    let buffer = Buffer.concat(chunks)

    console.log(buffer)

    // 第一个阶段的buffer--log
    writeTempBufferData(buffer, 1, '原始请求体')

    // 解析字符串数据
    let post = {}
    let files = {}

    if (req.headers['content-type']) {
      //  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryNDLBdEgBhssBJUQd',
      // 获取到后面需要用到的解析二进制数据的分隔符
      let str = req.headers['content-type'].split('; ')[1]
      // ------WebKitFormBoundaryIvpVAvwvkcjmd139
      if (str) {
        let boundary = '--' + str.split('=')[1]

        // 1、使用分隔符去切割整个请求体数据
        let arr = buffer.split(boundary)

        // 第2个阶段的buffer--log
        writeTempBufferData(arr, 2)

        // 2、丢掉头部和尾部， 因为切割后的数组，头部和剩下的就是一个 \r\n 没内容的，直接删除
        arr.shift()
        arr.pop()

        writeTempBufferData(arr, 3)

        // 3、丢弃掉每个buffer片段前后的\r\n
        arr = arr.map(buffer => buffer.slice(2, buffer.length - 2))

        // 第2个阶段的buffer--log
        writeTempBufferData(arr, 4)

        console.log("arr-->",arr.length)
        // 4、每个数据在第一个 \r\n\r\n 处切割
        arr.forEach(bufferItem => {
          let n = bufferItem.indexOf('\r\n\r\n')
          // 拿到有属性的数据-- Content-Disposition: form-data; name="age"
          let disposition = bufferItem.slice(0, n)

          // 实体内容与 表单的key 之间存在一行空行\r\n，表单的属性name结束行会有\r\n, 所以n+4就可以截取到内容
          let content = bufferItem.slice(n + 4)

          writeTempBufferData(content, 5, '内容体')

          console.log('disposition',disposition, disposition.indexOf('\r\n'))
          writeTempBufferData(disposition, 7, 'disposition')

          if (disposition.indexOf('\r\n') == -1) {
            // 转化成普通数据 Content-Disposition: form-data; name="age"
            content = content.toString()

            let name = disposition.split("; ")[1].split("=")[1]
            // 去掉key的前后引号
            name = name.substring(1, name.length - 1);

            post[name] = content
          
          } else {
            // 文件类型的数据
            /* 
            Content-Disposition: form-data; name="img"; filename="error-stack.png"  \r\n
            Content-Type: image/png
            */
            // 文件类型，会有2行的描述， 第一行有文件名filename，前端传过来的name
            // 第二行是文件类型的描述
            let [line1, line2] = disposition.split('\r\n')

            // 抽出name,filename
            let [, name, filename] = line1.split('; ')
            let type = line2.split(': ')[1]


            name = name.split('=')[1]
            // 去掉引号
            name = name.substring(1, name.length - 1)

            filename = filename.split('=')[1]
            // 去掉引号-- error-stack.png
            filename = filename.substring(1, filename.length - 1)


            // 文件内容的实体，我们在上面已经切出啦了 content

            fs.writeFile('./public/temp/' + filename, content, err => {
              if (err) throw err
              console.log(`写入的文件的数据`)
              console.log('type-->', type)
              console.log('filename-->', filename)
              files[name] = {
                filename,
                type,
                path: './public/temp/' + filename
              }
            })
          }

        })

        // 上面读写文件 都是异步的，下面直接响应前端，断开HTTP连接
        res.json({
          msg: 'ok'
        })
      }
    }
  })
}

// 写入每个阶段，截取出来的Buffer数据，并查看是什么样子的
function writeTempBufferData (data, type, desc = '') {
  let basePath = './public/temp/' + type + '--' + desc + '.txt'

  fs.writeFile(basePath, data, (err) => {
    console.log('写入成功')
  })
}