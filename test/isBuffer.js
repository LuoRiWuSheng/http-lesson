let b1 = Buffer.from('1')
let b2 = "2"

// true
console.log('是不是二进制数据--》',Buffer.isBuffer(b1))

// false 
console.log('跟一个字符串相加以后呢--》',Buffer.isBuffer(b1+b2))

let b3 = Buffer.from('3')
// false
console.log('2个Buffer相加呢-》',Buffer.isBuffer(b1+b3))
// string
console.log('typeof (b1+b3)', typeof (b1+b3))