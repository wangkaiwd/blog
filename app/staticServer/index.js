/**
 * @author wangkaiwd
 * http静态服务器
 */
const path = require('path');
const fs = require('fs');
const getPath = dir => path.resolve(process.cwd(), `public${dir}`);
const staticFunc = (url) => {
  if (url === '/favicon.ico') return;
  if (url === '/') {
    url = '/index.html';
  }
  // 这里的路径是相对于process.cwd(): 当前进程执行目录来进行获取的
  // 即相对于app/index.js
  let body;
  try {
    body = fs.readFileSync(getPath(url));
  } catch (e) {
    body = `NOT FOUND ${e.message}`;
  }
  return body;
};
module.exports = staticFunc;
