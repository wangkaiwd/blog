const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, a);
});

p1.catch(err => {
  console.log('catch', err);
  throw err;
}).then(result => {
  console.log('then', result);
});
