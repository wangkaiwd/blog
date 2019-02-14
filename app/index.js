// 主要核心逻辑入口
const fs = require('fs');
const path = require('path');
const staticFunc = require('./staticServer');
const apiServer = require('./api');

class App {
  initServer () {
    return (req, res) => {
      // 例： url = /css/reset.css,这里的'/'代表服务器根路径: localhost:3000
      const {url} = req;
      let body;
      if (path.extname(url) === '.action') {
        body = JSON.stringify(apiServer(url));
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, 'resolve OK');
        res.end(body);
      } else {
        // console.log(staticFunc(url));
        staticFunc(url).then(
          body => {
            res.writeHead(200, 'resolve OK');
            res.end(body);
          },
          err => {
            console.log('err', err);
          }
        );
      }
    };
  }
}

module.exports = App;
