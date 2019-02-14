console.log('hello world');
setTimeout(() => {
  $.ajax('/user.action', {
    success: function (data) {
      // const info = JSON.parse(data);
      $('#root').html(data.map(item => `<li>${item}</li>`));
    },
    error: function (err) {
      console.log('err', err);
    }
  });
  $.ajax('/list.action', {
    success: function (data) {
      // const info = JSON.parse(data);
      $('#shop').html(data.map(item => `<li>${item}</li>`));
    },
    error: function (err) {
      console.log('err', err);
    }
  });
}, 2000);
