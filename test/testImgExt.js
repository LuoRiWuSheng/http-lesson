const path = require('path')

let a = 'http://localhost:3002/img/a.jpg'
let b = 'http://localhost:3002/img/b.png'

let c = 'http://localhost:3002/getList'
console.log(path.parse(a))
console.log(path.parse(c))

/* 
{
  root: '',
  dir: 'http://localhost:3002/img',
  base: 'a.jpg',
  ext: '.jpg',
  name: 'a'
}

{
  root: '',
  dir: 'http://localhost:3002',
  base: 'getList',
  ext: '',
  name: 'getList'
}

*/