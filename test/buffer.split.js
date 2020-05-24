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

/* let  buf  = Buffer.from('1,2,3,4,5');

let arr = buf.split(',')

console.log(arr)
console.log("第一段buffer，转成字符串--》",arr[0].toString())
console.log("第2段buffer，转成字符串--》",arr[1].toString())
console.log("第3段buffer，转成字符串--》",arr[2].toString()) */

let buf2 = Buffer.from('I brush my teeth with a toothbrush in the morning')


let arr2 = buf2.split(' ')
console.log(arr2)
console.log("第一段buffer，转成字符串--》",arr2[0].toString(), '-----原始Buffer-->',arr2[0])
console.log("第2段buffer，转成字符串--》",arr2[1].toString())
console.log("第3段buffer，转成字符串--》",arr2[2].toString())
