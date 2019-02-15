let count = 0;

// 语法：new Promise((resolve,reject) =>{...} /*executor*/)
// executor:带有resolve,reject俩个参数的函数。
// Promise构造函数执行时立即调用executor函数：所以下边的p1,p2里传入的函数会立即执行，执行时间是4s
// 并不是在前一个完成的时候才会执行下一个Promise
const p1 = new Promise((resolve, reject) => {
  console.time('time');
  console.log('p1');
  setTimeout(resolve, 4000, 'done1');
});

const p2 = new Promise((resolve => {
  console.log('p2');
  setTimeout(resolve, 1000, 'done2');
}));

// 链式调用：模拟的情况，当前一个请求完成后，继续进行下一个请求
p1.then(result1 => {
  count++;
  console.log(result1);
  return p2;
}).then(result2 => {
  console.log(result2);
  console.log(count);
  console.timeEnd('time');
});
setTimeout(() => {
  console.log(p2);
}, 200);
