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
  });
};
timeout(100).then(result => {
  console.log(result);
});
console.log('Hi');
// Promise新建后就会立即执行
// 'Promise'
// 'Hi'
// 'done'
