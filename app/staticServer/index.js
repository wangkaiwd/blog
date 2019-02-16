/**
 * @author wangkaiwd
 * http静态服务器
 */
const path = require('path');
const fs = require('fs');
const getPath = dir => path.resolve(process.cwd(), `public${dir}`);
const staticFunc = (ctx) => {
  const {url} = ctx.req;
  const {reqCtx} = ctx;
  const html = {
    '/': '/index.html',
    '/about': '/about.html',
    '/list': '/list.html'
  };
  // 这里的路径是相对于process.cwd(): 当前进程执行目录来进行获取的
  // 即相对于app/index.js
  return new Promise((resolve, reject) => {
    if (url === '/favicon.ico') return resolve('NOT FOUND');
    const path = getPath(html[url] || url);
    fs.readFile(path, (err, data) => {
      if (err) {
        reqCtx.body = err;
        return reject(err);
      }
      reqCtx.body = data;
      resolve();
    });
  }).catch(err => reqCtx.body = `NOT FOUND ${err.message}`);
};
module.exports = staticFunc;
