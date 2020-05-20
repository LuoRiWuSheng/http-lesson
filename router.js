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
}
