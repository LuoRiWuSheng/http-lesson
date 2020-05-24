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
  $.ajax({
    url: 'http://localhost:4000/cors',
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    headers: {
      age: 12
    },
    dataType: 'json',
    data: JSON.stringify({
      a: '张三',
      b: 'node'
    }),
    success (res) {
      console.log(res)
    },
    error (err) {
      console.log('发生错误')
      console.log(err)
    }
  })
})

function sendMsg (type, data) {
  let url = 'http://localhost:4000/cors'

  let config = {
    method: type,
    contentType: 'application/json;charset=utf-8',
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

$('#put-btn').on("click", () => {

  $.ajax({
    url: 'http://localhost:4000/cors?a=1&b=2',
    method: 'put',
    headers: {
      age: 12
    },
    success (res) {
      console.log(res)
    },
    error (err) {
      console.log(err)
    }
  })
})

$('#delete-btn').on('click', () => {
  sendMsg('delete', "id=1")
})