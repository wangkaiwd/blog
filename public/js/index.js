console.log('hello world');
$.ajax('/user.action', {
  success: function (data) {
    console.log('success');
    console.log(data);
  },
  error: function (err) {
    console.log('err', err);
  }
});
