const fs = require('fs')
const path = require('path')

let p = path.join(__dirname, '../public/img/b.jpg')
fs.readFile(p, (err, data)=> {
  if(err) throw err

  console.log(1)
  console.log(data)
})