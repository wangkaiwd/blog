console.log('hello world');
setTimeout(() => {
  $.ajax('/user.action', {
    success: function (data) {
      // const info = JSON.parse(data);
      $('#root').html(data.map(item => `<li>${item}</li>`));
    },
    error: function (err) {
      console.log('err1', err);
    }
  });
  $.ajax(
    '/list.action',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      // 这里要通过JSON.stringify转换为json格式的字符串
      data: JSON.stringify({
        userName: 'wk',
        password: 'admin'
      }),
      // data: {
      //   userName: 'wk',
      //   password: 'admin'
      // },
      success: function (data) {
        // const info = JSON.parse(data);
        $('#shop').html(data.map(item => `<li>${item}</li>`));
      },
      error: function (err) {
        console.log('err2', err);
      }
    });
}, 2000);
