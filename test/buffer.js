let arr = [1,2,3]

// 字符串
let n = Buffer.from('1,2,3,4')

console.log('buffer调用toString', n.toString())
// buffer转ArrayBuffer
console.log(n.buffer)

let m = Buffer.from(["张三"])

console.log("数组--》",m)

// 将Buffer转成数组

// let c = Buffer.concat(n, m)
// console.log('合并buffer-->', c)
console.log(n.slice(0,2))

// 对buffer进行切割，不影响原buffer
console.log(n)


