const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./router')(router)
app.use(router)

app.listen(3000, ()=> {
  console.log('http://localhost:3000')
})