const url = require('url')

let u = 'http://username:123456@localhost:3000/img/a.jpg?page=1&count=10#floor=1'

console.log(url.parse(u))

/* 
 {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: null,
  search: null,
  query: null,
  pathname: '/img/a.jpg',
  path: '/img/a.jpg',
  href: 'http://localhost:3000/img/a.jpg'
}
*/