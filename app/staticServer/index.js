/**
 * @author wangkaiwd
 * http静态服务器
 */
const path = require('path');
const fs = require('fs');
const getPath = dir => path.resolve(process.cwd(), `public${dir}`);
const staticFunc = (url) => {
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
        if (err) return reject(err);
        resolve(data);
    });
  }).catch(err => {
    return `NOT FOUND ${err.message}`;
  });
};
module.exports = staticFunc;
