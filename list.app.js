const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const moment = require('moment')
const logger = require('morgan')
const { v4 } = require("uuid")

const uuidv4 = v4

const app = express()
const router = express.Router()

// 连接数据库
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'liuyan'
})

connection.connect((err) => {
  if (err) throw err

  console.log(`数据库连接成功`)
})

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)
// 新增留言
app.post('/say', (req, res) => {
  let { content } = req.body
  if (!content) {

    res.json({
      code: -1,
      msg: '内容不能为空'
    })
    return
  }
  let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const uuid = uuidv4()
  let insertSql = `insert into content_tb (uuid, content , createtime ) values ("${uuid}","${content}", "${time}")`
  connection.query(insertSql, (err, data) => {
    if (err) {
      res.status(500)

      res.json({
        code: -1,
        msg: err
      })
      return
    }

    console.log(data)
    res.json({
      code: 0,
      data
    })
  })

})

function queryLiuYan (sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const count = data.length
        data.map(p => {
          p.createTime = moment(p.createTime).format('YYYY-MM-DD HH:mm:ss')
          return p
        })

        resolve({
          data,
          count
        })
      }
    })
  })
}


// 获取所有留言
router.get('/getAllLiuYan', async (req, res) => {
  let querySql = `select content, createTime, uuid from content_tb order by createtime desc`
  try {
    let result = await queryLiuYan(querySql)
    res.json({
      code: 0,
      msg: 'ok',
      list: result.data,
      count: result.count
    })
  } catch (err) {
    res.status(500)
    res.json({
      code: -1,
      msg: err
    })
    return
  }
})

router.delete('/delLiuYan', async (req, res) => {
  const {uuid} = req.query

  console.log('uuid-->', uuid)

  if(!uuid) {
    res.json({
      code: -1,
      msg: '要删除的id不存在'
    })
    return
  }

  let delSql = `DELETE FROM content_tb where uuid="${uuid}"`

  let result = await delOneLiuYan(delSql)

  console.log(result)

  res.json({
    code: 0,
    msg: result
  })
})

function delOneLiuYan(sql) {
  return new Promise((resolve, reject)=> {
    connection.query(sql, (err, data)=> {
      if(err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
 
  
}

app.listen(3002, () => {
  console.log(`htpp://localhost:3002`)
})

