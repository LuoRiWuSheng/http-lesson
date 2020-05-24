// 多文件上传
let files;

let headBtn = $('#head-btn')
let getBtn = $('#get-btn')
let postBtn = $('#post-btn')

headBtn.on('click', () => {
  sendMsg('head', "a=1&b=2")
})

getBtn.on('click', () => {
  sendMsg('get', "a=2&b=3")
})

postBtn.on('click', () => {
  sendMsg('post', {
    a: 3,
    b: 4
  })
})

function sendMsg (type, data) {
  // 同域
  let url = '/cors'

  let config = {
    method: type,
    contentType: 'application/json',
    success (res) {
      console.log(res)
    },
    error (err) {
      console.log('发生错误')
      console.log(err)
    }
  }

  if (typeof data === 'string') {
    config.url = url + '?' + data
  } else {
    config.url = url
    config.data = JSON.stringify(data)
  }

  config.beforeSend = (xhr, c) => {
    $('.address').text(config.url)
    $('.request-method').text(config.method)
    $('.request-content-type').text(c.contentType)
  }

  $.ajax(config)
}