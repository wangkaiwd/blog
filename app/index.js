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
        apiServer(req).then(data => {
          data = JSON.stringify(data);
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, 'resolve OK');
          res.end(data);
        });
      } else {
        staticFunc(url).then(
          body => {
            res.writeHead(200, 'resolve OK');
            res.end(body);
          }
        );
      }
    };
  }
}

module.exports = App;
