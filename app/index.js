// 主要核心逻辑入口
const fs = require('fs');
const path = require('path');

class App {
  initServer () {
    return (req, res) => {
      const { url } = req;
      const getPath = dir => path.resolve(process.cwd(), `public${dir}`);
      const staticFunc = (url) => {
        if (url === '/favicon.ico') return;
        if (url === '/') {
          url = '/index.html';
        }
        // 这里的路径是相对于process.cwd(): 当前进程执行目录来进行获取的
        // 即相对于app/index.js
        fs.readFile(getPath(url), (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      };
      staticFunc(url);
    };
  }
}

module.exports = App;
