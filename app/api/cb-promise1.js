const timeout = (ms) => {
  return new Promise((resolve, reject) => {
    console.log('Promise');
    // setTimeout(() => resolve('done'),ms)
    /**
     * 指定时间后执行一个函数或指定的一段代码
     *  接收三个参数：
     *    1. function: delay毫秒后执行的函数
     *    2. delay: 可选，延迟的毫秒数(1秒等于1000毫秒)，函数的调用会在延迟之后发生。如果省略该参数，delay取默认值0。
     *    3. param1,...,paramN: 可选，附加参数，一旦定时器到期，它们会作为参数传递给function
     */
    setTimeout(resolve, ms, 'done');
    // return 的内容将会被忽略
    return 'I am return value';
  });
};
// then方法返回一个Promise,而它的行为与then中的回调函数的返回值有关：
timeout(100).then(result => {
  console.log(result);
  // 代码报错或者执行Promise.reject才会执行下一个.then函数的错误回调
  //    1. 如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数
  // return 1
  //    2. 如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数
  // const y = x + 1
  //    3. 如果then中的回调函数返回的是一个已经接受状态的Promise,那么then返回的Promise也会成为接受状态，并且将那个Promise
  //       的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值
  return Promise.resolve(1);
  //  Promise.resolve(1) ====>> new Promise((resolve) => resolve(1))
  //    4. 拒绝状态同3，如果then中的回调函数返回的是一个已经拒绝状态的Promise,那么then返回的Promise也会成为拒绝状态，并且将那个Promise
  //       的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值
  // return Promise.reject(1);
  //  Promise.reject(1) ====>> new Promise((resolve,reject) => reject(1))
  //    5. 如果then中的回调函数返回一个未定状态(Pending)的Promise,那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；
  //       同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的
  //       return new Promise((resolve,reject) => {setTimeout(resolve,1000,'done')})
}).then(
  result2 => {
    console.log(result2);
  },
  err => {
    console.log('err2', err);
  }
);
console.log('Hi');
// Promise新建后就会立即执行
// 'Promise'
// 'Hi'
// 'done'

