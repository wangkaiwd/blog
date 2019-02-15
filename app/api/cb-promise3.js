// const p1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, a);
// });
//
// p1.catch(err => {
//   console.log('catch', err);
//   throw err;
// }).then(result => {
//   console.log('then', result);
// });
const fn = require('./cb-promise2');
fn().then(result => console.log('result', result));
