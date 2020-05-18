const express = require('express')
const compression = require('compression')
const path = require('path')

const app = express()

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3006, ()=> {
  console.log(`http://localhost:3006`)
})
